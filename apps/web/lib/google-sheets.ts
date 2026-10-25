/**
 * Google Sheets Database Storage Adapter
 *
 * Implements server-side integration between Next.js API route handlers
 * and Google Sheets via Google Apps Script Web App.
 *
 * Architecture:
 *   Next.js Frontend -> Next.js Server API -> Apps Script Web API -> Google Sheets
 */

export interface LeadRecord {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  enquiryType: "automotive" | "general" | string;
  fullName: string;
  mobile: string;
  pinCode?: string;
  bikeBrand?: string;
  otherBikeBrand?: string;
  vehicleModel?: string;
  vehicleType?: string;
  service?: string;
  otherService?: string;
  sourcePath?: string;
  articleSlug?: string;
  pageCategory?: string;
  campaignSource?: string;
  consent: boolean;
  leadStatus?:
    | "new"
    | "contacted"
    | "in_progress"
    | "converted"
    | "closed"
    | "deleted"
    | string;
  notes?: string;
  [key: string]: unknown;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  scriptUrl: string;
  apiSecret: string;
  timeoutMs: number;
  maxRetries: number;
}

export interface GoogleSheetsSuccessResponse<T = unknown> {
  ok: true;
  data: T;
  duplicate?: boolean;
}

export interface GoogleSheetsErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type GoogleSheetsResponse<T = unknown> =
  GoogleSheetsSuccessResponse<T> | GoogleSheetsErrorResponse;

export interface LeadStorageService {
  isConfigured(): boolean;
  createLead(
    lead: LeadRecord,
  ): Promise<GoogleSheetsResponse<{ record: LeadRecord; duplicate: boolean }>>;
  getLeadById(
    id: string,
  ): Promise<GoogleSheetsResponse<{ record: LeadRecord }>>;
  listLeads(params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<
    GoogleSheetsResponse<{
      records: LeadRecord[];
      total: number;
      limit: number;
      offset: number;
    }>
  >;
  updateLead(
    id: string,
    updates: Partial<LeadRecord>,
  ): Promise<GoogleSheetsResponse<{ record: LeadRecord }>>;
  deleteLead(
    id: string,
    hard?: boolean,
  ): Promise<GoogleSheetsResponse<{ id: string; deleted: boolean }>>;
}

export const DEFAULT_SPREADSHEET_ID =
  "1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4";
const DANGEROUS_FORMULA_REGEX = /^[\s]*[=+\-@\t\r]/;

/**
 * Sanitize strings against formula injection (CWE-1236 / CSV Injection)
 * Defense-in-depth on the server before transmitting to Google Apps Script
 */
export function sanitizeForSheets<T>(value: T): T {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof value === "string") {
    if (DANGEROUS_FORMULA_REGEX.test(value)) {
      // Prefix with a single quote to force spreadsheet to treat as plain string
      return `'${value}` as unknown as T;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForSheets(item)) as unknown as T;
  }
  if (typeof value === "object") {
    const copy: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      copy[key] = sanitizeForSheets(val);
    }
    return copy as T;
  }
  return value;
}

/**
 * Retrieve configuration from process.env with sensible validation
 */
export function getGoogleSheetsConfig(
  env = process.env,
): GoogleSheetsConfig | null {
  const scriptUrl = env.GOOGLE_APPS_SCRIPT_URL?.trim();
  const apiSecret = env.GOOGLE_SHEETS_API_SECRET?.trim();
  const spreadsheetId =
    env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || DEFAULT_SPREADSHEET_ID;

  if (!scriptUrl || !apiSecret) {
    return null;
  }

  const timeoutMs = Number(env.GOOGLE_SHEETS_TIMEOUT_MS) || 8000;
  const maxRetries = Math.min(
    Math.max(Number(env.GOOGLE_SHEETS_MAX_RETRIES) || 2, 0),
    4,
  );

  return {
    spreadsheetId,
    scriptUrl,
    apiSecret,
    timeoutMs,
    maxRetries,
  };
}

/**
 * Sleep helper for exponential backoff
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes a call to Google Apps Script Web App with timeouts, authentication, and bounded retry
 */
export async function callAppsScript<T = unknown>(
  action: string,
  payload: Record<string, unknown> = {},
  customConfig?: GoogleSheetsConfig,
  fetcher: typeof fetch = globalThis.fetch,
): Promise<GoogleSheetsResponse<T>> {
  const config = customConfig || getGoogleSheetsConfig();
  if (!config) {
    return {
      ok: false,
      error: {
        code: "STORAGE_NOT_CONFIGURED",
        message:
          "Google Sheets integration is unconfigured. Set GOOGLE_APPS_SCRIPT_URL and GOOGLE_SHEETS_API_SECRET.",
      },
    };
  }

  const sanitizedPayload = sanitizeForSheets(payload);
  const requestBody = JSON.stringify({
    secret: config.apiSecret,
    action,
    spreadsheetId: config.spreadsheetId,
    ...sanitizedPayload,
  });

  let lastError: Error | null = null;
  const maxAttempts = config.maxRetries + 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetcher(config.scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: requestBody,
        signal: AbortSignal.timeout(config.timeoutMs),
        redirect: "follow",
      });

      // Handle HTTP status
      if (response.status === 401 || response.status === 403) {
        let errJson: any;
        try {
          errJson = await response.json();
        } catch {
          errJson = null;
        }
        return {
          ok: false,
          error: {
            code: "UNAUTHORIZED",
            message:
              errJson?.error?.message ||
              "Google Sheets authentication failed. Verify GOOGLE_SHEETS_API_SECRET.",
          },
        };
      }

      if (
        response.status === 400 ||
        response.status === 404 ||
        response.status === 422
      ) {
        let errJson: any;
        try {
          errJson = await response.json();
        } catch {
          errJson = null;
        }
        return {
          ok: false,
          error: {
            code: errJson?.error?.code || `HTTP_${response.status}`,
            message:
              errJson?.error?.message ||
              `Request rejected with status ${response.status}`,
            details: errJson?.error?.details,
          },
        };
      }

      // If server error or rate limited, retry if attempts remain
      if (response.status === 429 || response.status >= 500) {
        if (attempt < maxAttempts) {
          const delay = 300 * 2 ** (attempt - 1) + Math.random() * 100;
          await sleep(delay);
          continue;
        }
        let errJson: any;
        try {
          errJson = await response.json();
        } catch {
          errJson = null;
        }
        return {
          ok: false,
          error: {
            code: errJson?.error?.code || "UPSTREAM_ERROR",
            message:
              errJson?.error?.message ||
              `Google Apps Script returned upstream status ${response.status}`,
          },
        };
      }

      // Success (HTTP 200/201)
      const data = (await response.json()) as any;
      if (data && typeof data === "object") {
        if (data.ok === true) {
          return {
            ok: true,
            data: data.data as T,
            duplicate: Boolean(data.data?.duplicate),
          };
        }
        if (data.ok === false && data.error) {
          return {
            ok: false,
            error: data.error,
          };
        }
      }

      return {
        ok: true,
        data: data as T,
      };
    } catch (err: any) {
      lastError = err;
      const isAbort =
        err?.name === "TimeoutError" || err?.name === "AbortError";
      if (attempt < maxAttempts) {
        const delay = 300 * 2 ** (attempt - 1) + Math.random() * 100;
        await sleep(delay);
        continue;
      }

      return {
        ok: false,
        error: {
          code: isAbort ? "TIMEOUT" : "NETWORK_ERROR",
          message: isAbort
            ? `Google Sheets request timed out after ${config.timeoutMs}ms.`
            : `Failed to connect to Google Sheets Web API: ${err?.message || "Unknown error"}`,
        },
      };
    }
  }

  return {
    ok: false,
    error: {
      code: "RETRY_LIMIT_EXCEEDED",
      message:
        lastError?.message || "All retry attempts to Google Sheets failed.",
    },
  };
}

/**
 * Concrete implementation of LeadStorageService backed by Google Sheets via Apps Script
 */
export class GoogleSheetsStorageAdapter implements LeadStorageService {
  constructor(private config?: GoogleSheetsConfig) {}

  isConfigured(): boolean {
    return Boolean(this.config || getGoogleSheetsConfig());
  }

  async ping(): Promise<GoogleSheetsResponse<any>> {
    return callAppsScript("ping", {}, this.config);
  }

  async createLead(
    lead: LeadRecord,
  ): Promise<GoogleSheetsResponse<{ record: LeadRecord; duplicate: boolean }>> {
    return callAppsScript<{ record: LeadRecord; duplicate: boolean }>(
      "create",
      { record: lead },
      this.config,
    );
  }

  async getLeadById(
    id: string,
  ): Promise<GoogleSheetsResponse<{ record: LeadRecord }>> {
    return callAppsScript<{ record: LeadRecord }>("read", { id }, this.config);
  }

  async listLeads(params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<
    GoogleSheetsResponse<{
      records: LeadRecord[];
      total: number;
      limit: number;
      offset: number;
    }>
  > {
    return callAppsScript<{
      records: LeadRecord[];
      total: number;
      limit: number;
      offset: number;
    }>("read", params || {}, this.config);
  }

  async updateLead(
    id: string,
    updates: Partial<LeadRecord>,
  ): Promise<GoogleSheetsResponse<{ record: LeadRecord; updated: boolean }>> {
    return callAppsScript<{ record: LeadRecord; updated: boolean }>(
      "update",
      { id, updates },
      this.config,
    );
  }

  async deleteLead(
    id: string,
    hard = false,
  ): Promise<GoogleSheetsResponse<{ id: string; deleted: boolean }>> {
    return callAppsScript<{ id: string; deleted: boolean }>(
      "delete",
      { id, hard },
      this.config,
    );
  }
}

/**
 * Shared singleton storage adapter instance
 */
export const googleSheetsAdapter = new GoogleSheetsStorageAdapter();
