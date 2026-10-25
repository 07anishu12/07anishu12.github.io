import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { Pool } from "pg";
import type { LeadCaptureRequest, LeadReceipt } from "@portfolio/contracts";
import { AppError } from "./errors.js";

export const POLICY_VERSION = "2026-10-25";
export function issueToken(secret: string, now = Date.now()): string {
  const data = `${randomUUID()}.${now}`;
  return `${data}.${createHmac("sha256", secret).update(data).digest("base64url")}`;
}
export function verifyToken(
  token: string,
  secret: string,
  now = Date.now(),
): string {
  const [id, issued, signature, extra] = token.split(".");
  const expected = createHmac("sha256", secret)
    .update(`${id}.${issued}`)
    .digest("base64url");
  if (
    extra ||
    !/^[a-f0-9-]{36}$/.test(id ?? "") ||
    !signature ||
    signature.length !== expected.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ||
    !Number.isFinite(Number(issued)) ||
    Number(issued) > now ||
    now - Number(issued) > 86400000
  ) {
    throw new AppError(
      400,
      "INVALID_SUBMISSION_TOKEN",
      "Please reload the form and try again.",
    );
  }
  return id;
}
export const normalizePhone = (phone: string): string =>
  `+91${phone.replace(/\D/g, "").slice(-10)}`;

export interface LeadStore {
  recordWhatsappStatus?(messageId: string, status: string): Promise<void>;
  ready(): Promise<boolean>;
  save(body: LeadCaptureRequest, submissionId: string): Promise<LeadReceipt>;
}
export const createPool = (connectionString: string) =>
  new Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 5000,
    statement_timeout: 10000,
  });
export class PostgresLeadStore implements LeadStore {
  constructor(readonly pool: Pool) {}
  async ready(): Promise<boolean> {
    try {
      await this.pool.query("SELECT 1 FROM leads LIMIT 0");
      return true;
    } catch {
      return false;
    }
  }
  async recordWhatsappStatus(messageId: string, status: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(731205)");
      const result = await client.query(
        `UPDATE leads SET whatsapp_notification_status=$2,updated_at=now()
        WHERE whatsapp_message_id=$1 AND (
          (whatsapp_notification_status NOT IN ('delivered','read','failed')) OR
          ($2='read' AND whatsapp_notification_status='delivered') OR
          ($2 IN ('delivered','read') AND whatsapp_notification_status='failed')
        ) RETURNING id`,
        [messageId, status],
      );
      for (const row of result.rows) {
        await client.query(
          "UPDATE lead_outbox SET status='queued',attempts=0,available_at=now(),updated_at=now() WHERE lead_id=$1 AND channel='sheets' AND status='succeeded'",
          [row.id],
        );
        if (status === "failed")
          await client.query(
            "UPDATE lead_outbox SET status='failed',last_error_class='provider_delivery_failed',updated_at=now() WHERE lead_id=$1 AND channel='whatsapp'",
            [row.id],
          );
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
  async save(
    body: LeadCaptureRequest,
    submissionId: string,
  ): Promise<LeadReceipt> {
    const fields = [
      body.fullName,
      normalizePhone(body.mobile),
      body.pinCode,
      body.bikeBrand === "Other" ? body.otherBikeBrand! : body.bikeBrand,
      body.sourcePath ?? "/",
      body.articleSlug ?? null,
      body.pageCategory ?? null,
      body.clientContext?.campaign ?? null,
      POLICY_VERSION,
    ];
    const hash = createHash("sha256")
      .update(JSON.stringify(fields))
      .digest("hex");
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const inserted = await client.query(
        `INSERT INTO leads (id,submission_id,payload_hash,full_name,phone_normalized,pincode,bike_brand,source_path,article_slug,page_category,campaign_source,consent_policy_version,consent_given)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true) ON CONFLICT(submission_id) DO NOTHING RETURNING *`,
        [randomUUID(), submissionId, hash, ...fields],
      );
      const row =
        inserted.rows[0] ??
        (
          await client.query("SELECT * FROM leads WHERE submission_id=$1", [
            submissionId,
          ])
        ).rows[0];
      if (row.payload_hash !== hash)
        throw new AppError(
          409,
          "SUBMISSION_CONFLICT",
          "This receipt belongs to a different enquiry. Start a new submission.",
        );
      if (inserted.rowCount)
        await client.query(
          "INSERT INTO lead_outbox(lead_id,channel) VALUES($1,'sheets'),($1,'whatsapp')",
          [row.id],
        );
      await client.query("COMMIT");
      return {
        ok: true,
        leadId: row.id,
        duplicate: !inserted.rowCount,
        integrations: {
          sheets: row.sheets_sync_status,
          whatsapp: row.whatsapp_notification_status,
        },
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
