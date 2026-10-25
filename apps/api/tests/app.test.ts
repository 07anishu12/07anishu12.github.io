import assert from "node:assert/strict";
import test from "node:test";

import type { ContactRequest } from "@portfolio/contracts";

import { createApp } from "../src/app.js";
import type { AppConfig } from "../src/config.js";
import type { EmailProvider } from "../src/connectors/email.js";
import type { GitHubMetadataProvider } from "../src/connectors/github.js";
import type { Logger } from "../src/logger.js";
import type { LeadCaptureMessage } from "../src/connectors/email.js";

const config: AppConfig = {
  environment: "test",
  host: "127.0.0.1",
  port: 4000,
  corsOrigins: ["http://localhost:3000"],
  trustProxy: false,
  maxBodyBytes: 1_024,
  requestTimeoutMs: 10_000,
  upstreamTimeoutMs: 50,
  contactProvider: "resend",
  resendApiKey: "test",
  contactToEmail: "owner@example.com",
  contactFromEmail: "portfolio@example.com",
  githubRepos: [{ owner: "07anishu12", name: "Finance-tools" }],
  contactRateLimitWindowMs: 60_000,
  contactRateLimitMax: 2,
  minFormAgeMs: 1_000,
};

class TestLogger implements Logger {
  info(): void {}
  warn(): void {}
  error(): void {}
}

class TestEmailProvider implements EmailProvider {
  readonly name = "test";
  sent: ContactRequest[] = [];
  leads: LeadCaptureMessage[] = [];
  shouldFail = false;

  isReady(): boolean {
    return true;
  }

  async sendContactMessage(message: ContactRequest): Promise<void> {
    if (this.shouldFail) throw new Error("provider failed");
    this.sent.push(message);
  }

  async sendLeadCaptureMessage(message: LeadCaptureMessage): Promise<void> {
    if (this.shouldFail) throw new Error("provider failed");
    this.leads.push(message);
  }
}

class TestGitHubProvider implements GitHubMetadataProvider {
  isReady(): boolean {
    return true;
  }

  async getPublicRepository(): Promise<null> {
    return null;
  }
}

const request = (
  app: ReturnType<typeof createApp>,
  path: string,
  init?: RequestInit,
) => app.request(`http://localhost${path}`, init);

test("returns liveness and a not-ready response when email is not configured", async () => {
  const notReadyProvider: EmailProvider = {
    name: "none",
    isReady: () => false,
    sendContactMessage: async () => undefined,
    sendLeadCaptureMessage: async () => undefined,
  };
  const app = createApp({
    config,
    emailProvider: notReadyProvider,
    githubProvider: new TestGitHubProvider(),
    logger: new TestLogger(),
  });

  assert.equal((await request(app, "/health/live")).status, 200);
  assert.equal((await request(app, "/health/ready")).status, 503);
});

test("validates contact input, rejects honeypots, and delivers valid messages", async () => {
  const provider = new TestEmailProvider();
  const app = createApp({
    config: { ...config, contactRateLimitMax: 10 },
    emailProvider: provider,
    githubProvider: new TestGitHubProvider(),
    logger: new TestLogger(),
    now: () => 10_000,
  });
  const base = {
    name: "A visitor",
    email: "visitor@example.com",
    message: "I would like to discuss a project opportunity.",
    formStartedAt: 8_000,
  };

  const invalid = await request(app, "/v1/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...base, email: "not-an-email" }),
  });
  assert.equal(invalid.status, 400);

  const spam = await request(app, "/v1/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...base, website: "https://spam.example" }),
  });
  assert.equal(spam.status, 422);

  const valid = await request(app, "/v1/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(base),
  });
  assert.equal(valid.status, 202);
  assert.equal(provider.sent.length, 1);
});

test("does not report success when email delivery fails", async () => {
  const provider = new TestEmailProvider();
  provider.shouldFail = true;
  const app = createApp({
    config,
    emailProvider: provider,
    githubProvider: new TestGitHubProvider(),
    logger: new TestLogger(),
    now: () => 10_000,
  });
  const response = await request(app, "/v1/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "A visitor",
      email: "visitor@example.com",
      message: "This message should fail delivery.",
      formStartedAt: 8_000,
    }),
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});

test("rate-limits contact submissions", async () => {
  const provider = new TestEmailProvider();
  const app = createApp({
    config,
    emailProvider: provider,
    githubProvider: new TestGitHubProvider(),
    logger: new TestLogger(),
    now: () => 10_000,
  });
  const init = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "A visitor",
      email: "visitor@example.com",
      message: "A message for rate limit testing.",
      formStartedAt: 8_000,
    }),
  } satisfies RequestInit;

  assert.equal((await request(app, "/v1/contact", init)).status, 202);
  assert.equal((await request(app, "/v1/contact", init)).status, 202);
  assert.equal((await request(app, "/v1/contact", init)).status, 429);
});
