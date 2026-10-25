import { createSign } from "node:crypto";
export type LeadRow = Record<string, any>;
export class IntegrationError extends Error {
  constructor(
    readonly classification:
      "transient" | "permanent" | "unconfigured" | "uncertain",
  ) {
    super(classification);
  }
}
export const retryDelay = (attempt: number): number =>
  Math.min(3600000, 30000 * 2 ** Math.max(0, attempt - 1));
export function classifyStatus(status: number): "transient" | "permanent" {
  return status === 429 || status >= 500 ? "transient" : "permanent";
}
const envRequired = (env: NodeJS.ProcessEnv, names: string[]) => {
  if (names.some((name) => !env[name]))
    throw new IntegrationError("unconfigured");
};
async function requestJson(
  url: string,
  init: RequestInit,
  fetcher: typeof fetch,
  ambiguous = false,
): Promise<any> {
  let response: Response;
  try {
    response = await fetcher(url, {
      ...init,
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new IntegrationError(ambiguous ? "uncertain" : "transient");
  }
  if (!response.ok)
    throw new IntegrationError(
      ambiguous && response.status >= 500
        ? "uncertain"
        : classifyStatus(response.status),
    );
  try {
    return await response.json();
  } catch {
    throw new IntegrationError(ambiguous ? "uncertain" : "transient");
  }
}
export const SHEET_HEADERS = [
  "Lead ID",
  "Submission date and time",
  "Customer name",
  "Mobile number",
  "PIN code",
  "Locality",
  "District",
  "State",
  "Bike brand",
  "Source page",
  "Article slug",
  "Campaign attribution",
  "Consent status",
  "Lead status",
  "Sheets synchronization status",
  "WhatsApp notification status",
];
export function sheetValues(lead: LeadRow): string[] {
  return [
    lead.id,
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: "Asia/Kolkata",
    }).format(new Date(lead.submitted_at)),
    lead.full_name,
    lead.phone_normalized,
    lead.pincode,
    lead.locality ?? "",
    lead.district ?? "",
    lead.state ?? "",
    lead.bike_brand,
    lead.source_path,
    lead.article_slug ?? "",
    lead.campaign_source ?? "",
    `yes (${lead.consent_policy_version})`,
    lead.lead_status,
    "synced",
    lead.whatsapp_notification_status,
  ].map(String);
}
export function mapSheetRow(headers: string[], lead: LeadRow): string[] {
  if (
    SHEET_HEADERS.some(
      (name) => headers.filter((header) => header === name).length !== 1,
    )
  )
    throw new IntegrationError("permanent");
  const values = sheetValues(lead);
  return headers.map((header) => {
    const index = SHEET_HEADERS.indexOf(header);
    return index < 0 ? "" : values[index];
  });
}
const columnName = (index: number): string => {
  let result = "";
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26))
    result = String.fromCharCode(65 + ((n - 1) % 26)) + result;
  return result;
};
export async function syncSheet(
  lead: LeadRow,
  env = process.env,
  fetcher = fetch,
): Promise<void> {
  envRequired(env, [
    "GOOGLE_SHEETS_SPREADSHEET_ID",
    "GOOGLE_SHEETS_SHEET_NAME",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
  ]);
  const now = Math.floor(Date.now() / 1000);
  const encode = (value: unknown) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
  let signature: string;
  try {
    signature = createSign("RSA-SHA256")
      .update(unsigned)
      .sign(
        env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        "base64url",
      );
  } catch {
    throw new IntegrationError("permanent");
  }
  const auth = await requestJson(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${unsigned}.${signature}`,
      }),
    },
    fetcher,
  );
  if (!auth.access_token) throw new IntegrationError("permanent");
  const headers = {
    Authorization: `Bearer ${auth.access_token}`,
    "content-type": "application/json",
  };
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEETS_SPREADSHEET_ID!)}/values`;
  const sheet = `'${env.GOOGLE_SHEETS_SHEET_NAME!.replace(/'/g, "''")}'`;
  const schema = await requestJson(
    `${base}/${encodeURIComponent(`${sheet}!1:1`)}`,
    { headers },
    fetcher,
  );
  const columns: string[] = schema.values?.[0] ?? [];
  const row = mapSheetRow(columns, lead);
  const idColumn = columnName(columns.indexOf("Lead ID"));
  // Read only the stable ID column, never the existing customer register.
  const ids = await requestJson(
    `${base}/${encodeURIComponent(`${sheet}!${idColumn}2:${idColumn}`)}`,
    { headers },
    fetcher,
  );
  const matches = (ids.values ?? [])
    .map((value: string[], index: number) =>
      value[0] === lead.id ? index + 2 : 0,
    )
    .filter(Boolean);
  if (matches.length > 1) throw new IntegrationError("permanent");
  if (matches.length) {
    const data = columns.flatMap((header, index) =>
      SHEET_HEADERS.includes(header)
        ? [
            {
              range: `${sheet}!${columnName(index)}${matches[0]}`,
              values: [[row[index]]],
            },
          ]
        : [],
    );
    await requestJson(
      `${base}:batchUpdate`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ valueInputOption: "RAW", data }),
      },
      fetcher,
    );
  } else {
    const result = await requestJson(
      `${base}/${encodeURIComponent(`${sheet}!A:${columnName(columns.length - 1)}`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      { method: "POST", headers, body: JSON.stringify({ values: [row] }) },
      fetcher,
    );
    if (result.updates?.updatedRows !== 1)
      throw new IntegrationError("transient");
  }
}
export function whatsappPayload(lead: LeadRow, env = process.env) {
  return {
    messaging_product: "whatsapp",
    to: env.WHATSAPP_OWNER_RECIPIENT,
    type: "template",
    template: {
      name: env.WHATSAPP_TEMPLATE_NAME,
      language: { code: env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en" },
      components: [
        {
          type: "body",
          parameters: [
            lead.id,
            lead.full_name,
            lead.phone_normalized,
            lead.bike_brand,
            lead.pincode,
            lead.locality ?? "Unresolved",
            lead.state ?? "Unresolved",
            new Date(lead.submitted_at).toISOString(),
            lead.source_path,
            lead.sheets_sync_status,
          ].map((value) => ({ type: "text", text: String(value) })),
        },
      ],
    },
  };
}
export async function notifyOwner(
  lead: LeadRow,
  env = process.env,
  fetcher = fetch,
): Promise<string> {
  envRequired(env, [
    "WHATSAPP_ACCESS_TOKEN",
    "WHATSAPP_PHONE_NUMBER_ID",
    "WHATSAPP_OWNER_RECIPIENT",
    "WHATSAPP_TEMPLATE_NAME",
    "WHATSAPP_API_VERSION",
  ]);
  if (env.WHATSAPP_NOTIFICATIONS_ENABLED !== "true")
    throw new IntegrationError("unconfigured");
  if (
    !/^v\d+\.\d+$/.test(env.WHATSAPP_API_VERSION!) ||
    !/^\d+$/.test(env.WHATSAPP_PHONE_NUMBER_ID!) ||
    !/^\d{8,15}$/.test(env.WHATSAPP_OWNER_RECIPIENT!)
  )
    throw new IntegrationError("permanent");
  const response = await requestJson(
    `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(whatsappPayload(lead, env)),
    },
    fetcher,
    true,
  );
  const id = response.messages?.[0]?.id;
  if (typeof id !== "string") throw new IntegrationError("uncertain");
  return id;
}
