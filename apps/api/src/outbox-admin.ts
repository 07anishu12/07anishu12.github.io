import { createPool } from "./leads.js";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const pool = createPool(process.env.DATABASE_URL);
try {
  const [action, id, confirmation] = process.argv.slice(2);
  if (action === "status") {
    console.log(
      JSON.stringify(
        (
          await pool.query(
            "SELECT channel,status,last_error_class,count(*)::integer AS count FROM lead_outbox GROUP BY channel,status,last_error_class ORDER BY channel,status",
          )
        ).rows,
      ),
    );
  } else if (action === "retry" && /^\d+$/.test(id ?? "")) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(731205)");
      const job = (
        await client.query("SELECT * FROM lead_outbox WHERE id=$1 FOR UPDATE", [
          id,
        ])
      ).rows[0];
      if (!job || !["failed", "uncertain"].includes(job.status))
        throw new Error("Job must be failed or uncertain");
      if (job.status === "uncertain" && confirmation !== "--confirmed-not-sent")
        throw new Error(
          "Verify provider evidence before retrying uncertain delivery; use --confirmed-not-sent only after reconciliation",
        );
      await client.query(
        "UPDATE lead_outbox SET status='queued',attempts=0,last_error_class=NULL,available_at=now(),updated_at=now() WHERE id=$1",
        [id],
      );
      const field =
        job.channel === "sheets"
          ? "sheets_sync_status"
          : "whatsapp_notification_status";
      await client.query(
        `UPDATE leads SET ${field}='queued',updated_at=now() WHERE id=$1`,
        [job.lead_id],
      );
      await client.query("COMMIT");
      console.log("Job queued");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } else
    throw new Error(
      "Usage: outbox-admin status | retry JOB_ID [--confirmed-not-sent]",
    );
} finally {
  await pool.end();
}
