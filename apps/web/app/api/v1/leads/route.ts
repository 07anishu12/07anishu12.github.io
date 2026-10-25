import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { Pool } from "pg";
import {
  AutomotiveEnquiryRequestSchema,
  GeneralEnquiryRequestSchema,
} from "@portfolio/contracts";
import {
  googleSheetsAdapter,
  DEFAULT_SPREADSHEET_ID,
  sanitizeForSheets,
  type LeadRecord,
} from "../../../../lib/google-sheets";

const SECRET =
  process.env.LEAD_TOKEN_SECRET ||
  process.env.VERCEL_OIDC_TOKEN?.slice(0, 64) ||
  "aniket-portfolio-secure-lead-token-secret-2026-v1";

const POLICY_VERSION = "2026-10-25";

// Shared connection pool if DATABASE_URL is provided
let pool: Pool | null = null;
function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      statement_timeout: 10000,
    });
  }
  return pool;
}

// In-memory rate limiting and deduplication store
const leadIpMap = new Map<string, { count: number; resetAt: number }>();
const recentSubmissions = new Map<
  string,
  { leadId: string; expiresAt: number }
>();

async function syncToGoogleSheets(
  lead: {
    id: string;
    submittedAt: string;
    enquiryType: string;
    fullName: string;
    mobile: string;
    pinCode?: string;
    bikeBrand?: string;
    vehicleModel?: string;
    vehicleType?: string;
    service?: string;
    otherService?: string;
    sourcePath?: string;
    articleSlug?: string;
    consent: boolean;
  },
  env = process.env,
): Promise<{ ok: boolean; error?: string }> {
  // Option 1: Google Apps Script Webhook
  if (env.GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      const res = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) {
        return { ok: true };
      }
      const errText = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Webhook returned status ${res.status}: ${errText.slice(0, 100)}`,
      };
    } catch (e: any) {
      return { ok: false, error: e?.message || "Webhook fetch failed" };
    }
  }

  // Option 2: Google Sheets API v4 using Service Account
  if (
    env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  ) {
    const spreadsheetId =
      env.GOOGLE_SHEETS_SPREADSHEET_ID ||
      "1p-3XWQpo84ddBruI1LnU5dRTvJOetxThVKj2vxET3bA";
    const sheetName = env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1";
    try {
      const nowSec = Math.floor(Date.now() / 1000);
      const encode = (v: unknown) =>
        Buffer.from(JSON.stringify(v)).toString("base64url");
      const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
        iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: "https://oauth2.googleapis.com/token",
        iat: nowSec,
        exp: nowSec + 3600,
      })}`;

      const { createSign } = await import("node:crypto");
      const signature = createSign("RSA-SHA256")
        .update(unsigned)
        .sign(
          env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
          "base64url",
        );

      const authRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: `${unsigned}.${signature}`,
        }),
      });

      const authData = await authRes.json();
      if (!authRes.ok || !authData.access_token) {
        return {
          ok: false,
          error: `Google OAuth failed: ${authData?.error_description || authRes.status}`,
        };
      }

      const row = [
        lead.id,
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        lead.enquiryType,
        lead.fullName,
        lead.mobile,
        lead.pinCode || "",
        lead.bikeBrand || "",
        lead.vehicleModel || "",
        lead.vehicleType || "",
        lead.service || "",
        lead.otherService || "",
        lead.sourcePath || "",
        lead.articleSlug || "",
        lead.consent ? "Yes" : "No",
      ];

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
        spreadsheetId,
      )}/values/${encodeURIComponent(
        `${sheetName}!A:N`,
      )}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      });

      if (!appendRes.ok) {
        const errText = await appendRes.text().catch(() => "");
        return {
          ok: false,
          error: `Sheets append failed (${appendRes.status}): ${errText.slice(
            0,
            100,
          )}`,
        };
      }

      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || "Service account sync failed" };
    }
  }

  // Option 3: Google Sheets API v4 using OAuth 2.0 Refresh Token
  if (
    env.GOOGLE_REFRESH_TOKEN &&
    env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET
  ) {
    const spreadsheetId =
      env.GOOGLE_SHEETS_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;
    const sheetName = env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1";
    try {
      const authRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          refresh_token: env.GOOGLE_REFRESH_TOKEN,
          grant_type: "refresh_token",
        }),
      });

      const authData = await authRes.json();
      if (!authRes.ok || !authData.access_token) {
        return {
          ok: false,
          error: `Google OAuth refresh failed: ${authData?.error_description || authRes.status}`,
        };
      }

      const row = [
        sanitizeForSheets(lead.id),
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        sanitizeForSheets(lead.enquiryType),
        sanitizeForSheets(lead.fullName),
        sanitizeForSheets(lead.mobile),
        sanitizeForSheets(lead.pinCode || ""),
        sanitizeForSheets(lead.bikeBrand || ""),
        sanitizeForSheets(lead.vehicleModel || ""),
        sanitizeForSheets(lead.vehicleType || ""),
        sanitizeForSheets(lead.service || ""),
        sanitizeForSheets(lead.otherService || ""),
        sanitizeForSheets(lead.sourcePath || ""),
        sanitizeForSheets(lead.articleSlug || ""),
        lead.consent ? "Yes" : "No",
      ];

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
        spreadsheetId,
      )}/values/${encodeURIComponent(
        `${sheetName}!A:N`,
      )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      });

      if (!appendRes.ok) {
        const errText = await appendRes.text().catch(() => "");
        return {
          ok: false,
          error: `Sheets append failed (${appendRes.status}): ${errText.slice(
            0,
            100,
          )}`,
        };
      }

      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || "OAuth refresh sync failed" };
    }
  }

  return { ok: false, error: "NOT_CONFIGURED" };
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = leadIpMap.get(ip);
  if (!record || record.resetAt <= now) {
    leadIpMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (record.count >= 15) {
    return true;
  }
  record.count++;
  return false;
}

function verifyToken(token: string, now = Date.now()): string {
  const [id, issued, signature, extra] = token.split(".");
  if (!id || !issued || !signature || extra) {
    throw new Error("Invalid submission token format.");
  }
  const expected = createHmac("sha256", SECRET)
    .update(`${id}.${issued}`)
    .digest("base64url");
  if (
    signature.length !== expected.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    throw new Error("Invalid token signature.");
  }
  const issuedTime = Number(issued);
  if (
    !Number.isFinite(issuedTime) ||
    issuedTime > now + 5000 ||
    now - issuedTime > 24 * 60 * 60 * 1000
  ) {
    throw new Error(
      "Submission token has expired. Please reload and try again.",
    );
  }
  return id;
}

const normalizePhone = (phone: string): string =>
  `+91${phone.replace(/\D/g, "").slice(-10)}`;

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message:
            "Too many submissions. Please wait 15 minutes before retrying.",
        },
      },
      { status: 429 },
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "INVALID_JSON", message: "Malformed JSON payload." },
      },
      { status: 400 },
    );
  }

  // Anti-spam honeypot
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "SPAM_DETECTED", message: "Submission rejected." },
      },
      { status: 422 },
    );
  }

  // Anti-spam minimum form interaction time
  const now = Date.now();
  if (body.formStartedAt) {
    const elapsed = now - Number(body.formStartedAt);
    if (elapsed < 1200) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "SPAM_DETECTED",
            message:
              "Submission completed too quickly. Please take a moment and try again.",
          },
        },
        { status: 422 },
      );
    }
  }

  // Verify submission token
  let submissionId: string;
  try {
    if (!body.submissionToken || typeof body.submissionToken !== "string") {
      throw new Error("Missing submission token.");
    }
    submissionId = verifyToken(body.submissionToken, now);
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_SUBMISSION_TOKEN",
          message:
            err?.message || "Invalid or expired session token. Please reload.",
        },
      },
      { status: 400 },
    );
  }

  // Determine enquiry category & validate schema
  const isAuto =
    body.enquiryType === "automotive" ||
    Boolean(body.pinCode) ||
    body.pageCategory === "auto" ||
    Boolean(body.bikeBrand);

  let validatedData: any;
  if (isAuto) {
    const result = AutomotiveEnquiryRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Please correct the highlighted fields.",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 },
      );
    }
    validatedData = result.data;
  } else {
    const result = GeneralEnquiryRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Please correct the highlighted fields.",
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 },
      );
    }
    validatedData = result.data;
  }

  // Compute deduplication / payload hash
  const hashKey = [
    isAuto ? "auto" : "general",
    validatedData.fullName,
    normalizePhone(validatedData.mobile),
    isAuto ? validatedData.pinCode : validatedData.service,
    isAuto ? validatedData.bikeBrand || "" : validatedData.otherService || "",
    validatedData.sourcePath || "/",
  ].join("|");

  const payloadHash = createHash("sha256").update(hashKey).digest("hex");

  // In-memory deduplication check
  const cached =
    recentSubmissions.get(submissionId) || recentSubmissions.get(payloadHash);
  if (cached && cached.expiresAt > now) {
    return NextResponse.json(
      {
        ok: true,
        leadId: cached.leadId,
        duplicate: true,
        integrations: { sheets: "queued", whatsapp: "queued" },
      },
      { status: 200 },
    );
  }

  // Attempt database persistence if configured
  const db = getPool();
  if (db) {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN");
        // Ensure table support
        await client.query(`
          CREATE TABLE IF NOT EXISTS leads (
            id uuid PRIMARY KEY, submission_id uuid NOT NULL UNIQUE, payload_hash text NOT NULL,
            full_name text NOT NULL, phone_normalized text NOT NULL,
            pincode text, locality text, district text, state text,
            location_status text NOT NULL DEFAULT 'unresolved', bike_brand text,
            source_path text NOT NULL, article_slug text, page_category text, campaign_source text,
            consent_given boolean NOT NULL CHECK(consent_given), consent_policy_version text NOT NULL,
            submitted_at timestamptz NOT NULL DEFAULT now(), lead_status text NOT NULL DEFAULT 'new',
            sheets_sync_status text NOT NULL DEFAULT 'queued', sheets_synced_at timestamptz,
            whatsapp_notification_status text NOT NULL DEFAULT 'queued', whatsapp_notified_at timestamptz,
            whatsapp_message_id text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
            enquiry_type text DEFAULT 'automotive', service_required text, other_service text,
            vehicle_model text, vehicle_type text
          )
        `);
        await client.query(`
          CREATE TABLE IF NOT EXISTS lead_outbox (
            id bigserial PRIMARY KEY, lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
            channel text NOT NULL, status text NOT NULL DEFAULT 'queued',
            attempts integer NOT NULL DEFAULT 0, available_at timestamptz NOT NULL DEFAULT now(),
            last_error_class text, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(lead_id,channel)
          )
        `);

        const leadId = randomUUID();
        const brand = isAuto
          ? validatedData.bikeBrand === "Other"
            ? validatedData.otherBikeBrand || "Other"
            : validatedData.bikeBrand || "Not specified"
          : null;

        const inserted = await client.query(
          `INSERT INTO leads (
            id, submission_id, payload_hash, full_name, phone_normalized, pincode, bike_brand,
            source_path, article_slug, page_category, campaign_source, consent_policy_version,
            consent_given, enquiry_type, service_required, other_service, vehicle_model, vehicle_type
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true,$13,$14,$15,$16,$17)
          ON CONFLICT(submission_id) DO NOTHING RETURNING *`,
          [
            leadId,
            submissionId,
            payloadHash,
            validatedData.fullName,
            normalizePhone(validatedData.mobile),
            isAuto ? validatedData.pinCode : null,
            brand,
            validatedData.sourcePath ?? "/",
            isAuto ? (validatedData.articleSlug ?? null) : null,
            validatedData.pageCategory ?? (isAuto ? "auto" : "general"),
            isAuto ? (validatedData.clientContext?.campaign ?? null) : null,
            POLICY_VERSION,
            isAuto ? "automotive" : "general",
            !isAuto ? validatedData.service : null,
            !isAuto ? (validatedData.otherService ?? null) : null,
            isAuto ? (validatedData.vehicleModel ?? null) : null,
            isAuto ? (validatedData.vehicleType ?? null) : null,
          ],
        );

        const row =
          inserted.rows[0] ??
          (
            await client.query("SELECT * FROM leads WHERE submission_id=$1", [
              submissionId,
            ])
          ).rows[0];

        if (inserted.rowCount) {
          await client.query(
            "INSERT INTO lead_outbox(lead_id,channel) VALUES($1,'sheets'),($1,'whatsapp') ON CONFLICT DO NOTHING",
            [row.id],
          );
        }

        await client.query("COMMIT");

        // Record in recent deduplication cache
        recentSubmissions.set(submissionId, {
          leadId: row.id,
          expiresAt: now + 24 * 3600 * 1000,
        });
        recentSubmissions.set(payloadHash, {
          leadId: row.id,
          expiresAt: now + 24 * 3600 * 1000,
        });

        return NextResponse.json(
          {
            ok: true,
            leadId: row.id,
            duplicate: !inserted.rowCount,
            integrations: {
              sheets: row.sheets_sync_status,
              whatsapp: row.whatsapp_notification_status,
            },
          },
          { status: inserted.rowCount ? 201 : 200 },
        );
      } catch (dbError) {
        await client.query("ROLLBACK");
        throw dbError;
      } finally {
        client.release();
      }
    } catch (err: any) {
      console.error("Database persistence error:", err);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "DATABASE_ERROR",
            message:
              "A database error occurred while saving your enquiry. Please retry or contact directly via WhatsApp.",
          },
        },
        { status: 500 },
      );
    }
  }

  // 1. Attempt Google Sheets Web API persistence via Apps Script adapter (Primary configured integration)
  if (googleSheetsAdapter.isConfigured()) {
    const recordId = randomUUID();
    const sheetLead: LeadRecord = {
      id: recordId,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
      enquiryType: isAuto ? "automotive" : "general",
      fullName: validatedData.fullName,
      mobile: normalizePhone(validatedData.mobile),
      pinCode: isAuto ? validatedData.pinCode : undefined,
      bikeBrand: isAuto
        ? (validatedData.bikeBrand === "Other"
            ? validatedData.otherBikeBrand
            : validatedData.bikeBrand) || undefined
        : undefined,
      vehicleModel: isAuto
        ? validatedData.vehicleModel || undefined
        : undefined,
      vehicleType: isAuto ? validatedData.vehicleType || undefined : undefined,
      service: isAuto ? undefined : validatedData.service,
      otherService: isAuto
        ? undefined
        : validatedData.otherService || undefined,
      sourcePath: validatedData.sourcePath || "/",
      articleSlug: validatedData.articleSlug || undefined,
      pageCategory: validatedData.pageCategory ?? (isAuto ? "auto" : "general"),
      campaignSource: isAuto
        ? (validatedData.clientContext?.campaign ?? undefined)
        : undefined,
      consent: validatedData.consent,
      leadStatus: "new",
    };

    const sheetsResult = await googleSheetsAdapter.createLead(sheetLead);
    if (sheetsResult.ok) {
      recentSubmissions.set(submissionId, {
        leadId: recordId,
        expiresAt: now + 24 * 3600 * 1000,
      });
      recentSubmissions.set(payloadHash, {
        leadId: recordId,
        expiresAt: now + 24 * 3600 * 1000,
      });

      return NextResponse.json(
        {
          ok: true,
          leadId: recordId,
          duplicate: Boolean(sheetsResult.duplicate),
          integrations: { sheets: "synced", whatsapp: "queued" },
          persistence: "google_sheets",
        },
        { status: sheetsResult.duplicate ? 200 : 201 },
      );
    } else {
      console.error("Google Sheets sync failed:", sheetsResult.error);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: sheetsResult.error.code || "SHEETS_SYNC_ERROR",
            message:
              "Unable to save your enquiry to Google Sheets. Please retry or contact directly via WhatsApp.",
            details: sheetsResult.error.message,
          },
        },
        { status: 502 },
      );
    }
  }

  // 2. Attempt Google Sheets persistence if configured (OAuth2 Refresh Token, Service Account, or Webhook)
  const isDirectGoogleSheetsConfigured = Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) ||
      (process.env.GOOGLE_REFRESH_TOKEN &&
        process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET),
  );

  if (isDirectGoogleSheetsConfigured) {
    const recordId = randomUUID();
    const sheetLead = {
      id: recordId,
      submittedAt: new Date(now).toISOString(),
      enquiryType: isAuto ? "automotive" : "general",
      fullName: validatedData.fullName,
      mobile: validatedData.mobile,
      pinCode: isAuto ? validatedData.pinCode : undefined,
      bikeBrand: isAuto
        ? (validatedData.bikeBrand === "Other"
            ? validatedData.otherBikeBrand
            : validatedData.bikeBrand) || undefined
        : undefined,
      vehicleModel: isAuto
        ? validatedData.vehicleModel || undefined
        : undefined,
      vehicleType: isAuto ? validatedData.vehicleType || undefined : undefined,
      service: isAuto ? undefined : validatedData.service,
      otherService: isAuto
        ? undefined
        : validatedData.otherService || undefined,
      sourcePath: validatedData.sourcePath || "/",
      articleSlug: validatedData.articleSlug || undefined,
      consent: validatedData.consent,
    };

    const sheetsResult = await syncToGoogleSheets(sheetLead);
    if (sheetsResult.ok) {
      recentSubmissions.set(submissionId, {
        leadId: recordId,
        expiresAt: now + 24 * 3600 * 1000,
      });
      recentSubmissions.set(payloadHash, {
        leadId: recordId,
        expiresAt: now + 24 * 3600 * 1000,
      });

      return NextResponse.json(
        {
          ok: true,
          leadId: recordId,
          duplicate: false,
          integrations: { sheets: "synced", whatsapp: "queued" },
          persistence: "google_sheets",
        },
        { status: 201 },
      );
    } else {
      console.error("Google Sheets sync failed:", sheetsResult.error);
    }
  }

  // 3. If no DATABASE_URL or Google Sheets is configured, check if we can persist to local file storage (dev/standalone)
  const isVercelProduction = Boolean(process.env.VERCEL);
  if (!isVercelProduction) {
    try {
      const dataDir = path.resolve(process.cwd(), ".data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const recordId = randomUUID();
      const record = {
        id: recordId,
        submissionId,
        payloadHash,
        type: isAuto ? "automotive" : "general",
        data: validatedData,
        submittedAt: new Date(now).toISOString(),
        phoneNormalized: normalizePhone(validatedData.mobile),
      };
      fs.appendFileSync(
        path.join(dataDir, "enquiries.jsonl"),
        JSON.stringify(record) + "\n",
        "utf8",
      );

      recentSubmissions.set(submissionId, {
        leadId: recordId,
        expiresAt: now + 24 * 3600 * 1000,
      });
      recentSubmissions.set(payloadHash, {
        leadId: recordId,
        expiresAt: now + 24 * 3600 * 1000,
      });

      return NextResponse.json(
        {
          ok: true,
          leadId: recordId,
          duplicate: false,
          integrations: { sheets: "queued", whatsapp: "queued" },
          persistence: "local_store",
        },
        { status: 201 },
      );
    } catch (fsErr) {
      console.error("Local file storage fallback failed:", fsErr);
    }
  }

  // 4. When on Vercel and no storage backend is configured, inform the user honestly
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;

  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "STORAGE_NOT_CONFIGURED",
        message: `The enquiry storage service is linked to Google Spreadsheet (${spreadsheetId}), but write authorization (GOOGLE_APPS_SCRIPT_URL, GOOGLE_SHEETS_WEBHOOK_URL, or Database) is awaiting setup. Please connect directly via WhatsApp in the meantime.`,
        spreadsheetId,
        missingConfiguration: ["GOOGLE_APPS_SCRIPT_URL", "DATABASE_URL"],
      },
    },
    { status: 503 },
  );
}

/**
 * Verify administrative secret for read and update operations
 */
function verifyAdminSecret(request: Request): boolean {
  const authHeader = request.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  const secretFromHeader = match ? match[1].trim() : null;
  const url = new URL(request.url);
  const secretFromQuery = url.searchParams.get("secret")?.trim() || null;
  const provided = secretFromHeader || secretFromQuery;

  const expectedSecret =
    process.env.GOOGLE_SHEETS_API_SECRET?.trim() ||
    process.env.ADMIN_SECRET?.trim();

  if (!expectedSecret || !provided) {
    return false;
  }
  return (
    timingSafeEqual(
      Buffer.from(provided.padEnd(64, "0")),
      Buffer.from(expectedSecret.padEnd(64, "0")),
    ) && provided.length === expectedSecret.length
  );
}

/**
 * GET /api/v1/leads
 * Server-side authorized read endpoint for spreadsheet records
 */
export async function GET(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required to read lead records.",
        },
      },
      { status: 401 },
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const result = await googleSheetsAdapter.getLeadById(id);
    if (!result.ok) {
      return NextResponse.json(result, {
        status: result.error.code === "NOT_FOUND" ? 404 : 502,
      });
    }
    return NextResponse.json(result, { status: 200 });
  }

  const limit = Number(url.searchParams.get("limit")) || 50;
  const offset = Number(url.searchParams.get("offset")) || 0;
  const status = url.searchParams.get("status") || undefined;

  const result = await googleSheetsAdapter.listLeads({ limit, offset, status });
  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }
  return NextResponse.json(result, { status: 200 });
}

/**
 * PATCH /api/v1/leads
 * Server-side authorized update endpoint for spreadsheet records
 */
export async function PATCH(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required to update lead records.",
        },
      },
      { status: 401 },
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "INVALID_JSON", message: "Malformed JSON payload." },
      },
      { status: 400 },
    );
  }

  if (!body?.id || !body?.updates || typeof body.updates !== "object") {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_PAYLOAD",
          message: "Update requires id and updates object.",
        },
      },
      { status: 400 },
    );
  }

  const result = await googleSheetsAdapter.updateLead(body.id, body.updates);
  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.error.code === "NOT_FOUND" ? 404 : 502,
    });
  }
  return NextResponse.json(result, { status: 200 });
}
