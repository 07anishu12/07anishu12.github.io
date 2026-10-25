import type { Pool, PoolClient } from "pg";
import {
  IntegrationError,
  retryDelay,
  syncSheet,
  notifyOwner,
  type LeadRow,
} from "./connectors/lead-integrations.js";
export type IntegrationAdapters = {
  sheets: (lead: LeadRow) => Promise<void>;
  whatsapp: (lead: LeadRow) => Promise<string>;
};
export async function processOutbox(
  pool: Pool,
  adapters: IntegrationAdapters = { sheets: syncSheet, whatsapp: notifyOwner },
): Promise<number> {
  const client = await pool.connect();
  let locked = false;
  try {
    // A session lock serializes provider side effects across replicas, including reconciliation.
    locked = (
      await client.query("SELECT pg_try_advisory_lock(731205) AS locked")
    ).rows[0].locked;
    if (!locked) return 0;
    // A crashed WhatsApp sender may already have delivered: never blindly resend.
    await client.query(
      "UPDATE leads SET whatsapp_notification_status='uncertain',updated_at=now() WHERE id IN (SELECT lead_id FROM lead_outbox WHERE channel='whatsapp' AND status='processing')",
    );
    await client.query(
      "UPDATE lead_outbox SET status=CASE WHEN channel='sheets' THEN 'queued' ELSE 'uncertain' END,last_error_class='interrupted',updated_at=now() WHERE status='processing'",
    );
    const jobs = (
      await client.query(
        "SELECT * FROM lead_outbox WHERE status='queued' AND available_at<=now() ORDER BY id LIMIT 20",
      )
    ).rows;
    for (const job of jobs) {
      const lead = (
        await client.query("SELECT * FROM leads WHERE id=$1", [job.lead_id])
      ).rows[0];
      if (!lead) continue;
      await client.query(
        "UPDATE lead_outbox SET status='processing',attempts=attempts+1,updated_at=now() WHERE id=$1",
        [job.id],
      );
      try {
        const messageId =
          job.channel === "sheets"
            ? (await adapters.sheets(lead), null)
            : await adapters.whatsapp(lead);
        await client.query("BEGIN");
        await client.query(
          "UPDATE lead_outbox SET status='succeeded',last_error_class=NULL,updated_at=now() WHERE id=$1",
          [job.id],
        );
        if (job.channel === "sheets")
          await client.query(
            "UPDATE leads SET sheets_sync_status='synced',sheets_synced_at=now(),updated_at=now() WHERE id=$1",
            [lead.id],
          );
        else {
          await client.query(
            "UPDATE leads SET whatsapp_notification_status='accepted',whatsapp_message_id=$2,whatsapp_notified_at=now(),updated_at=now() WHERE id=$1",
            [lead.id, messageId],
          );
          await reconcileSheet(client, lead.id);
        }
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        const kind =
          error instanceof IntegrationError
            ? error.classification
            : "uncertain";
        const attempts = job.attempts + 1;
        const status =
          kind === "uncertain"
            ? "uncertain"
            : kind === "permanent" || attempts >= 8
              ? "failed"
              : "queued";
        await client.query("BEGIN");
        await client.query(
          "UPDATE lead_outbox SET status=$2,last_error_class=$3,available_at=now()+($4::integer * interval '1 millisecond'),updated_at=now() WHERE id=$1",
          [job.id, status, kind, retryDelay(attempts)],
        );
        const field =
          job.channel === "sheets"
            ? "sheets_sync_status"
            : "whatsapp_notification_status";
        await client.query(
          `UPDATE leads SET ${field}=$2,updated_at=now() WHERE id=$1`,
          [lead.id, status],
        );
        if (job.channel === "whatsapp") await reconcileSheet(client, lead.id);
        await client.query("COMMIT");
      }
    }
    return jobs.length;
  } finally {
    if (locked) await client.query("SELECT pg_advisory_unlock(731205)");
    client.release();
  }
}
async function reconcileSheet(client: PoolClient, id: string) {
  await client.query(
    "UPDATE lead_outbox SET status='queued',attempts=0,available_at=now(),updated_at=now() WHERE lead_id=$1 AND channel='sheets' AND status='succeeded'",
    [id],
  );
}
