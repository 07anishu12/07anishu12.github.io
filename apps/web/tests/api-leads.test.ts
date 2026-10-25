import assert from "node:assert/strict";
import test from "node:test";
import { GET as getToken } from "../app/api/v1/leads/token/route";
import { POST as postLead } from "../app/api/v1/leads/route";

test("GET /api/v1/leads/token issues valid signed tokens", async () => {
  const req = new Request("http://localhost:3000/api/v1/leads/token", {
    method: "GET",
    headers: { "x-forwarded-for": "127.0.0.1" },
  });

  const res = await getToken(req);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Cache-Control"), "no-store");

  const json = await res.json();
  assert.ok(json.submissionToken);
  assert.equal(typeof json.submissionToken, "string");
  const parts = json.submissionToken.split(".");
  assert.equal(parts.length, 3);
});

test("POST /api/v1/leads rejects requests with invalid or missing tokens", async () => {
  const req = new Request("http://localhost:3000/api/v1/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      enquiryType: "general",
      submissionToken: "invalid.token.signature",
      fullName: "Aniket Thakur",
      mobile: "9876543210",
      service: "Website development",
      consent: true,
      website: "",
      formStartedAt: Date.now() - 5000,
    }),
  });

  const res = await postLead(req);
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.equal(json.ok, false);
  assert.equal(json.error.code, "INVALID_SUBMISSION_TOKEN");
});

test("POST /api/v1/leads rejects honeypot submissions", async () => {
  // First obtain token
  const tokenReq = new Request("http://localhost:3000/api/v1/leads/token", {
    method: "GET",
  });
  const tokenRes = await getToken(tokenReq);
  const { submissionToken } = await tokenRes.json();

  const req = new Request("http://localhost:3000/api/v1/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      enquiryType: "general",
      submissionToken,
      fullName: "Spam Bot",
      mobile: "9876543210",
      service: "Website development",
      consent: true,
      website: "https://spam.com", // Honeypot filled!
      formStartedAt: Date.now() - 5000,
    }),
  });

  const res = await postLead(req);
  assert.equal(res.status, 422);
  const json = await res.json();
  assert.equal(json.ok, false);
  assert.equal(json.error.code, "SPAM_DETECTED");
});

test("POST /api/v1/leads accepts valid General Enquiry", async () => {
  const tokenReq = new Request("http://localhost:3000/api/v1/leads/token", {
    method: "GET",
  });
  const tokenRes = await getToken(tokenReq);
  const { submissionToken } = await tokenRes.json();

  const req = new Request("http://localhost:3000/api/v1/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      enquiryType: "general",
      submissionToken,
      sourcePath: "/contact",
      pageCategory: "general",
      fullName: "Alex Rivera",
      mobile: "9876543210",
      service: "App development",
      consent: true,
      website: "",
      formStartedAt: Date.now() - 3000,
    }),
  });

  const res = await postLead(req);
  assert.equal(res.status, 201);
  const json = await res.json();
  assert.equal(json.ok, true);
  assert.ok(json.leadId);
  assert.equal(json.duplicate, false);
});

test("POST /api/v1/leads accepts valid Automotive Enquiry and enforces deduplication", async () => {
  const tokenReq = new Request("http://localhost:3000/api/v1/leads/token", {
    method: "GET",
  });
  const tokenRes = await getToken(tokenReq);
  const { submissionToken } = await tokenRes.json();

  const payload = {
    enquiryType: "automotive",
    submissionToken,
    sourcePath: "/finance/bikes",
    articleSlug: "bike-finance",
    pageCategory: "auto",
    fullName: "Priya Sharma",
    mobile: "+91 9811223344",
    pinCode: "110001",
    bikeBrand: "Hero",
    vehicleModel: "Splendor Plus XTEC",
    vehicleType: "Commuter Motorcycle",
    consent: true,
    website: "",
    formStartedAt: Date.now() - 4000,
  };

  const req1 = new Request("http://localhost:3000/api/v1/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const res1 = await postLead(req1);
  assert.equal(res1.status, 201);
  const json1 = await res1.json();
  assert.equal(json1.ok, true);
  assert.ok(json1.leadId);
  assert.equal(json1.duplicate, false);

  // Duplicate submission with same token or payload
  const req2 = new Request("http://localhost:3000/api/v1/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const res2 = await postLead(req2);
  assert.equal(res2.status, 200);
  const json2 = await res2.json();
  assert.equal(json2.ok, true);
  assert.equal(json2.leadId, json1.leadId);
  assert.equal(json2.duplicate, true);
});

test("POST /api/v1/leads returns transparent 503 in Vercel production if DATABASE_URL is not set", async () => {
  const origVercel = process.env.VERCEL;
  const origDb = process.env.DATABASE_URL;
  try {
    process.env.VERCEL = "1";
    delete process.env.DATABASE_URL;

    const tokenReq = new Request("http://localhost:3000/api/v1/leads/token", {
      method: "GET",
    });
    const tokenRes = await getToken(tokenReq);
    const { submissionToken } = await tokenRes.json();

    const req = new Request("http://localhost:3000/api/v1/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        enquiryType: "general",
        submissionToken,
        fullName: "Test User",
        mobile: "9876543210",
        service: "AI development and automation",
        consent: true,
        website: "",
        formStartedAt: Date.now() - 3000,
      }),
    });

    const res = await postLead(req);
    assert.equal(res.status, 503);
    const json = await res.json();
    assert.equal(json.ok, false);
    assert.equal(json.error.code, "STORAGE_NOT_CONFIGURED");
  } finally {
    process.env.VERCEL = origVercel;
    process.env.DATABASE_URL = origDb;
  }
});

test("POST /api/v1/leads persists via Google Sheets Webhook when GOOGLE_SHEETS_WEBHOOK_URL is set", async () => {
  const origWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const origDb = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;

  // Mock global fetch for webhook
  const origFetch = globalThis.fetch;
  let receivedWebhookPayload: any = null;
  globalThis.fetch = async (url: any, init: any) => {
    if (String(url) === "https://script.google.com/macros/s/test-script/exec") {
      receivedWebhookPayload = JSON.parse(init.body);
      return new Response(JSON.stringify({ ok: true, leadId: receivedWebhookPayload.id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return origFetch(url, init);
  };

  try {
    process.env.GOOGLE_SHEETS_WEBHOOK_URL =
      "https://script.google.com/macros/s/test-script/exec";

    const tokenReq = new Request("http://localhost:3000/api/v1/leads/token", {
      method: "GET",
    });
    const tokenRes = await getToken(tokenReq);
    const { submissionToken } = await tokenRes.json();

    const req = new Request("http://localhost:3000/api/v1/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        enquiryType: "automotive",
        submissionToken,
        sourcePath: "/blog/auto/best-150cc-bikes",
        articleSlug: "best-150cc-bikes",
        pageCategory: "auto",
        fullName: "Sheets Test Customer",
        mobile: "+91 9876543210",
        pinCode: "110001",
        bikeBrand: "Yamaha",
        vehicleModel: "FZS-FI V4",
        vehicleType: "Commuter Motorcycle",
        consent: true,
        website: "",
        formStartedAt: Date.now() - 3000,
      }),
    });

    const res = await postLead(req);
    assert.equal(res.status, 201);
    const json = await res.json();
    assert.equal(json.ok, true);
    assert.equal(json.persistence, "google_sheets");
    assert.ok(receivedWebhookPayload);
    assert.equal(receivedWebhookPayload.fullName, "Sheets Test Customer");
    assert.equal(receivedWebhookPayload.vehicleModel, "FZS-FI V4");
  } finally {
    globalThis.fetch = origFetch;
    process.env.GOOGLE_SHEETS_WEBHOOK_URL = origWebhook;
    process.env.DATABASE_URL = origDb;
  }
});

test.after(() => {
  setTimeout(() => process.exit(0), 100);
});
