import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID, generateKeyPairSync, createHmac } from "node:crypto";
import { applyMigrations } from "../src/migrations.js";
import { LeadCaptureRequestSchema } from "@portfolio/contracts";
import {
  issueToken,
  verifyToken,
  normalizePhone,
  createPool,
  PostgresLeadStore,
} from "../src/leads.js";
import {
  SHEET_HEADERS,
  mapSheetRow,
  whatsappPayload,
  retryDelay,
  classifyStatus,
  IntegrationError,
  syncSheet,
  notifyOwner,
} from "../src/connectors/lead-integrations.js";
import { processOutbox } from "../src/outbox.js";
import { createApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
const secret = "synthetic-test-secret-not-a-production-key";
const body = {
  fullName: "Synthetic Test Visitor",
  pinCode: "110001",
  mobile: "9876543210",
  bikeBrand: "Honda",
  consent: true as const,
  submissionToken: issueToken(secret),
  sourcePath: "/finance/bikes",
  formStartedAt: Date.now() - 3000,
};
const lead = {
  id: randomUUID(),
  full_name: body.fullName,
  phone_normalized: "+919876543210",
  pincode: body.pinCode,
  bike_brand: "Honda",
  source_path: "/finance/bikes",
  submitted_at: new Date(),
  consent_policy_version: "2026-10-25",
  lead_status: "new",
  sheets_sync_status: "queued",
  whatsapp_notification_status: "queued",
};
test("validates consent, PIN, phone, Other brand and approved attribution", () => {
  assert.ok(LeadCaptureRequestSchema.safeParse(body).success);
  for (const changed of [
    { consent: false },
    { pinCode: "000000" },
    { mobile: "123" },
    { bikeBrand: "Other" },
    { sourcePath: "/page?phone=123" },
    { clientContext: { campaign: "personal-details" } },
  ])
    assert.equal(
      LeadCaptureRequestSchema.safeParse({ ...body, ...changed }).success,
      false,
    );
  assert.equal(normalizePhone("+91 9876543210"), "+919876543210");
});
test("server token integrity and expiration", () => {
  const token = issueToken(secret, 1000);
  assert.match(verifyToken(token, secret, 2000), /^[a-f0-9-]{36}$/);
  assert.throws(() => verifyToken(token + "x", secret, 2000));
  assert.throws(() => verifyToken(token, secret, 86402000));
});
test("spreadsheet mapping preserves PIN strings and requires compatible headers", () => {
  const headers = [...SHEET_HEADERS].reverse();
  const row = mapSheetRow(headers, { ...lead, full_name: "=SYNTHETIC" });
  assert.equal(row[headers.indexOf("PIN code")], "110001");
  assert.equal(row[headers.indexOf("Customer name")], "=SYNTHETIC");
  assert.throws(() => mapSheetRow(["Lead ID"], lead));
});
test("owner template contains configured recipient and bounded retries", () => {
  const payload = whatsappPayload(lead, {
    WHATSAPP_OWNER_RECIPIENT: "synthetic-owner",
    WHATSAPP_TEMPLATE_NAME: "test",
  });
  assert.equal(payload.to, "synthetic-owner");
  assert.equal(payload.template.components[0].parameters.length, 10);
  assert.equal(classifyStatus(429), "transient");
  assert.equal(classifyStatus(403), "permanent");
  assert.equal(retryDelay(99), 3600000);
});
test("Sheets retry reconciles ID and uses RAW without overwriting unknown columns", async () => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const env = {
    GOOGLE_SHEETS_SPREADSHEET_ID: "synthetic",
    GOOGLE_SHEETS_SHEET_NAME: "Synthetic",
    GOOGLE_SERVICE_ACCOUNT_EMAIL: "synthetic@example.com",
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKey
      .export({ type: "pkcs8", format: "pem" })
      .toString(),
  };
  let written = false,
    appendCount = 0;
  const fetcher = (async (url: any, init: any) => {
    const path = String(url);
    if (path.includes("oauth2")) return Response.json({ access_token: "mock" });
    if (path.includes(":append")) {
      appendCount++;
      written = true;
      assert.match(path, /valueInputOption=RAW/);
      return Response.json({ updates: { updatedRows: 1 } });
    }
    if (path.includes(":batchUpdate")) {
      const payload = JSON.parse(init.body);
      assert.equal(payload.valueInputOption, "RAW");
      assert.equal(payload.data.length, SHEET_HEADERS.length);
      return Response.json({});
    }
    if (decodeURIComponent(path).endsWith("!1:1"))
      return Response.json({
        values: [[...SHEET_HEADERS, "Existing private notes"]],
      });
    return Response.json({ values: written ? [[lead.id]] : [] });
  }) as typeof fetch;
  await syncSheet(lead, env, fetcher);
  await syncSheet(lead, env, fetcher);
  assert.equal(appendCount, 1);
});
test("WhatsApp disabled configuration and ambiguous network results never imply delivered", async () => {
  await assert.rejects(
    () => notifyOwner(lead, {}),
    (error: any) => error.classification === "unconfigured",
  );
  const env = {
    WHATSAPP_ACCESS_TOKEN: "mock",
    WHATSAPP_PHONE_NUMBER_ID: "123",
    WHATSAPP_OWNER_RECIPIENT: "919999999999",
    WHATSAPP_TEMPLATE_NAME: "test",
    WHATSAPP_API_VERSION: "v1.0",
    WHATSAPP_NOTIFICATIONS_ENABLED: "true",
  };
  await assert.rejects(
    () =>
      notifyOwner(lead, env, (async () => {
        throw new Error("timeout");
      }) as typeof fetch),
    (error: any) => error.classification === "uncertain",
  );
  assert.equal(
    await notifyOwner(lead, env, (async () =>
      Response.json({ messages: [{ id: "mock-message" }] })) as typeof fetch),
    "mock-message",
  );
});
test(
  "PostgreSQL atomic persistence, concurrent idempotency, API access and independent outbox recovery",
  { skip: !process.env.TEST_DATABASE_URL },
  async () => {
    const pool = createPool(process.env.TEST_DATABASE_URL!);
    const schema = `synthetic_${randomUUID().replaceAll("-", "")}`;
    // Dedicated schema prevents touching any existing application or customer tables.
    const isolated = createPool(
      `${process.env.TEST_DATABASE_URL}${process.env.TEST_DATABASE_URL!.includes("?") ? "&" : "?"}options=${encodeURIComponent(`-c search_path=${schema}`)}`,
    );
    try {
      await pool.query(`CREATE SCHEMA ${schema}`);
      assert.equal(await applyMigrations(isolated), 1);
      assert.equal(await applyMigrations(isolated), 0);
      const store = new PostgresLeadStore(isolated),
        submissionId = verifyToken(body.submissionToken, secret);
      const [a, b] = await Promise.all([
        store.save(body, submissionId),
        store.save(body, submissionId),
      ]);
      assert.equal(a.leadId, b.leadId);
      assert.notEqual(a.duplicate, b.duplicate);
      assert.equal(
        (await isolated.query("SELECT count(*) FROM leads")).rows[0].count,
        "1",
      );
      assert.equal(
        (await isolated.query("SELECT count(*) FROM lead_outbox")).rows[0]
          .count,
        "2",
      );
      await assert.rejects(() =>
        store.save({ ...body, bikeBrand: "TVS" }, submissionId),
      );
      let sheetCalls = 0,
        whatsappCalls = 0;
      const failSheets = {
        sheets: async () => {
          sheetCalls++;
          throw new IntegrationError("transient");
        },
        whatsapp: async () => {
          whatsappCalls++;
          return "mock-id";
        },
      };
      await processOutbox(isolated, failSheets);
      let row = (await isolated.query("SELECT * FROM leads")).rows[0];
      assert.equal(row.whatsapp_notification_status, "accepted");
      assert.equal(row.sheets_sync_status, "queued");
      await isolated.query(
        "UPDATE lead_outbox SET available_at=now() WHERE status='queued'",
      );
      await processOutbox(isolated, {
        sheets: async () => {
          sheetCalls++;
        },
        whatsapp: failSheets.whatsapp,
      });
      await processOutbox(isolated, {
        sheets: async () => {
          sheetCalls++;
        },
        whatsapp: failSheets.whatsapp,
      });
      assert.equal(whatsappCalls, 1);
      assert.equal(sheetCalls, 2);
      row = (await isolated.query("SELECT * FROM leads")).rows[0];
      assert.equal(row.sheets_sync_status, "synced");
      const config = {
        ...loadConfig({ NODE_ENV: "test" }),
        leadTokenSecret: secret,
        whatsappAppSecret: "synthetic-webhook-key",
        contactRateLimitMax: 20,
      };
      const app = createApp({
        config,
        leadStore: store,
        logger: { info() {}, warn() {}, error() {} },
      });
      const webhookBody = JSON.stringify({
        entry: [
          {
            changes: [
              { value: { statuses: [{ id: "mock-id", status: "delivered" }] } },
            ],
          },
        ],
      });
      const signature = `sha256=${createHmac("sha256", config.whatsappAppSecret).update(webhookBody).digest("hex")}`;
      assert.equal(
        (
          await app.request("/api/v1/webhooks/whatsapp", {
            method: "POST",
            body: webhookBody,
          })
        ).status,
        403,
      );
      assert.equal(
        (
          await app.request("/api/v1/webhooks/whatsapp", {
            method: "POST",
            headers: { "x-hub-signature-256": signature },
            body: webhookBody,
          })
        ).status,
        200,
      );
      assert.equal(
        (await isolated.query("SELECT whatsapp_notification_status FROM leads"))
          .rows[0].whatsapp_notification_status,
        "delivered",
      );
      await store.recordWhatsappStatus("mock-id", "sent");
      assert.equal(
        (await isolated.query("SELECT whatsapp_notification_status FROM leads"))
          .rows[0].whatsapp_notification_status,
        "delivered",
      );
      const tokenResponse = await app.request("/api/v1/leads/token");
      assert.equal(tokenResponse.status, 200);
      const token = (await tokenResponse.json()).submissionToken;
      const init = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, submissionToken: token }),
      };
      const response = await app.request("/api/v1/leads", init);
      assert.equal(response.status, 201);
      assert.ok((await response.json()).leadId);
      assert.equal((await app.request("/api/v1/leads", init)).status, 200);
      assert.equal((await app.request("/api/v1/leads")).status, 404);
      assert.equal(
        (
          await app.request("/api/v1/leads", {
            ...init,
            headers: { ...init.headers, origin: "https://untrusted.example" },
          })
        ).status,
        403,
      );
      await processOutbox(isolated, {
        sheets: async () => {},
        whatsapp: async () => {
          throw new IntegrationError("uncertain");
        },
      });
      const uncertain = (
        await isolated.query(
          "SELECT count(*) FROM lead_outbox WHERE status='uncertain'",
        )
      ).rows[0].count;
      assert.equal(uncertain, "1");
      await processOutbox(isolated, {
        sheets: async () => {},
        whatsapp: async () => {
          throw new Error("must not resend");
        },
      });
      assert.equal(
        (await isolated.query("SELECT count(*) FROM leads")).rows[0].count,
        "2",
      );
      // Force an outbox failure to prove lead insertion rolls back with its intents.
      await isolated.query(
        "CREATE FUNCTION reject_synthetic_outbox() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'synthetic outbox failure'; END $$",
      );
      await isolated.query(
        "CREATE TRIGGER reject_synthetic_outbox BEFORE INSERT ON lead_outbox FOR EACH ROW EXECUTE FUNCTION reject_synthetic_outbox()",
      );
      await assert.rejects(() => store.save(body, randomUUID()));
      assert.equal(
        (await isolated.query("SELECT count(*) FROM leads")).rows[0].count,
        "2",
      );
      await isolated.query(
        "UPDATE portfolio_schema_migrations SET checksum='synthetic-invalid-checksum'",
      );
      await assert.rejects(() => applyMigrations(isolated), /checksum changed/);
    } finally {
      await isolated.end();
      await pool.query(`DROP SCHEMA ${schema} CASCADE`);
      await pool.end();
    }
  },
);
