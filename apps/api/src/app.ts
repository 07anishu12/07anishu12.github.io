import { createHmac, timingSafeEqual } from "node:crypto";
import {
  createPool,
  PostgresLeadStore,
  issueToken,
  verifyToken,
  type LeadStore,
} from "./leads.js";
import { Hono } from "hono";
import type { ContactRequest, LeadCaptureRequest } from "@portfolio/contracts";
import {
  ContactRequestSchema,
  ContactResponseSchema,
  LeadCaptureRequestSchema,
  LeadReceiptSchema,
  ProjectListResponseSchema,
} from "@portfolio/contracts";

import { loadConfig, type AppConfig } from "./config.js";
import { createEmailProvider, type EmailProvider } from "./connectors/email.js";
import {
  createGitHubProvider,
  type GitHubMetadataProvider,
} from "./connectors/github.js";
import { AppError, errorResponse } from "./errors.js";
import { readJsonBody, readRawBody } from "./http/body.js";
import {
  corsPolicy,
  rateLimit,
  requestId,
  requestLogging,
  requestSizeLimit,
  securityHeaders,
} from "./http/middleware.js";
import "./http/context.js";
import { JsonLogger, type Logger } from "./logger.js";
import { FixedWindowRateLimiter } from "./rate-limit.js";
import { ContactService } from "./services/contact.js";

export interface AppDependencies {
  config?: AppConfig;
  emailProvider?: EmailProvider;
  githubProvider?: GitHubMetadataProvider;
  logger?: Logger;
  now?: () => number;
  leadStore?: LeadStore;
}

const validateContact = (body: unknown): ContactRequest => {
  const result = ContactRequestSchema.safeParse(body);
  if (!result.success) {
    throw new AppError(
      400,
      "VALIDATION_ERROR",
      "Please check the submitted fields.",
      {
        fields: result.error.flatten().fieldErrors,
      },
    );
  }
  return result.data;
};

const validateLead = (body: unknown): LeadCaptureRequest => {
  const result = LeadCaptureRequestSchema.safeParse(body);
  if (!result.success) {
    throw new AppError(
      400,
      "VALIDATION_ERROR",
      "Please check the submitted lead fields.",
      {
        fields: result.error.flatten().fieldErrors,
      },
    );
  }
  return result.data;
};

export const createApp = (dependencies: AppDependencies = {}): Hono => {
  const config = dependencies.config ?? loadConfig();
  const logger = dependencies.logger ?? new JsonLogger();
  const emailProvider =
    dependencies.emailProvider ?? createEmailProvider(config);
  const githubProvider =
    dependencies.githubProvider ?? createGitHubProvider(config);
  const contactService = new ContactService(emailProvider, logger);
  const contactLimiter = new FixedWindowRateLimiter(
    config.contactRateLimitWindowMs,
    config.contactRateLimitMax,
    dependencies.now,
  );
  const leadLimiter = new FixedWindowRateLimiter(
    config.contactRateLimitWindowMs,
    config.contactRateLimitMax,
    dependencies.now,
  );
  const leadStore =
    dependencies.leadStore ??
    (config.databaseUrl
      ? new PostgresLeadStore(createPool(config.databaseUrl))
      : undefined);
  const app = new Hono();

  app.use("*", requestId());
  app.use("*", securityHeaders(config.environment === "production"));
  app.use("*", corsPolicy(config));
  app.use("*", requestSizeLimit(config.maxBodyBytes));
  app.use("*", requestLogging(logger));

  app.get("/health/live", (context) => context.json({ status: "ok" }));

  app.get("/health/ready", async (context) => {
    const emailReady = emailProvider.isReady();
    const databaseReady = (await leadStore?.ready()) ?? false;
    const ready =
      databaseReady &&
      Boolean(config.leadTokenSecret && config.leadTokenSecret.length >= 32);
    return context.json(
      {
        status: ready ? "ready" : "not_ready",
        checks: {
          database: { status: databaseReady ? "ok" : "not_ready" },
          email: {
            status: emailReady ? "ok" : "not_configured",
            provider: emailProvider.name,
          },
          github: { status: githubProvider.isReady() ? "ok" : "not_ready" },
        },
      },
      ready ? 200 : 503,
    );
  });

  app.get("/v1/projects", async (context) => {
    const projects = await Promise.all(
      config.githubRepos.map((repository) =>
        githubProvider.getPublicRepository(repository),
      ),
    );
    return context.json(
      ProjectListResponseSchema.parse({
        projects: projects.filter(
          (project): project is NonNullable<typeof project> => project !== null,
        ),
      }),
    );
  });

  app.post(
    "/v1/contact",
    rateLimit(contactLimiter, config.trustProxy),
    async (context) => {
      const requestId = context.get("requestId");
      const body = validateContact(
        await readJsonBody(context, config.maxBodyBytes),
      );
      const now = dependencies.now?.() ?? Date.now();
      if (
        body.website ||
        (body.formStartedAt !== undefined &&
          now - body.formStartedAt < config.minFormAgeMs)
      ) {
        throw new AppError(
          422,
          "SPAM_CHECK_FAILED",
          "The submission could not be accepted.",
        );
      }
      if (
        body.formStartedAt !== undefined &&
        body.formStartedAt > now + 5_000
      ) {
        throw new AppError(
          422,
          "SPAM_CHECK_FAILED",
          "The submission could not be accepted.",
        );
      }

      await contactService.submit(body, requestId);
      return context.json(
        ContactResponseSchema.parse({
          ok: true,
          message: "Your message has been sent.",
          requestId,
        }),
        202,
      );
    },
  );

  app.on(
    "GET",
    ["/api/v1/leads/token", "/v1/leads/token"],
    rateLimit(leadLimiter, config.trustProxy),
    (context) => {
      if (
        !config.leadTokenSecret ||
        config.leadTokenSecret.length < 32 ||
        !leadStore
      )
        throw new AppError(
          503,
          "LEADS_UNAVAILABLE",
          "Enquiries are temporarily unavailable.",
        );
      context.header("Cache-Control", "no-store");
      return context.json({
        submissionToken: issueToken(
          config.leadTokenSecret,
          dependencies.now?.() ?? Date.now(),
        ),
      });
    },
  );

  app.on(
    "POST",
    ["/api/v1/leads", "/v1/leads"],
    rateLimit(leadLimiter, config.trustProxy),
    async (context) => {
      const origin = context.req.header("origin");
      if (origin && !config.corsOrigins.includes(origin))
        throw new AppError(403, "ORIGIN_DENIED", "This origin is not allowed.");
      const body = validateLead(
        await readJsonBody(context, config.maxBodyBytes),
      );
      const now = dependencies.now?.() ?? Date.now();
      if (
        body.website ||
        (body.formStartedAt !== undefined &&
          now - body.formStartedAt < config.minFormAgeMs)
      ) {
        throw new AppError(
          422,
          "SPAM_CHECK_FAILED",
          "The submission could not be accepted.",
        );
      }
      if (
        body.formStartedAt !== undefined &&
        body.formStartedAt > now + 5_000
      ) {
        throw new AppError(
          422,
          "SPAM_CHECK_FAILED",
          "The submission could not be accepted.",
        );
      }

      if (!leadStore || !config.leadTokenSecret)
        throw new AppError(
          503,
          "LEADS_UNAVAILABLE",
          "Enquiries are temporarily unavailable.",
        );
      const submissionId = verifyToken(
        body.submissionToken,
        config.leadTokenSecret,
        now,
      );
      const receipt = await leadStore.save(body, submissionId);
      context.header("Cache-Control", "no-store");
      return context.json(
        LeadReceiptSchema.parse(receipt),
        receipt.duplicate ? 200 : 201,
      );
    },
  );

  app.get("/api/v1/webhooks/whatsapp", (context) => {
    if (
      !config.whatsappVerifyToken ||
      context.req.query("hub.verify_token") !== config.whatsappVerifyToken ||
      context.req.query("hub.mode") !== "subscribe"
    )
      throw new AppError(403, "WEBHOOK_DENIED", "Verification failed.");
    return context.text(context.req.query("hub.challenge") ?? "");
  });
  app.post("/api/v1/webhooks/whatsapp", async (context) => {
    if (!config.whatsappAppSecret || !leadStore?.recordWhatsappStatus)
      throw new AppError(503, "WEBHOOK_UNAVAILABLE", "Webhook unavailable.");
    const raw = await readRawBody(context, config.maxBodyBytes);
    const signature = context.req.header("x-hub-signature-256") ?? "";
    const expected = `sha256=${createHmac("sha256", config.whatsappAppSecret).update(raw).digest("hex")}`;
    if (
      !/^sha256=[a-f0-9]{64}$/.test(signature) ||
      signature.length !== expected.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    )
      throw new AppError(403, "WEBHOOK_DENIED", "Verification failed.");
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      throw new AppError(400, "INVALID_JSON", "Invalid webhook.");
    }
    if (!Array.isArray(payload.entry))
      throw new AppError(400, "INVALID_WEBHOOK", "Invalid webhook.");
    for (const entry of payload.entry) {
      for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
        for (const status of Array.isArray(change.value?.statuses)
          ? change.value.statuses
          : []) {
          if (
            typeof status.id === "string" &&
            ["sent", "delivered", "read", "failed"].includes(status.status)
          )
            await leadStore.recordWhatsappStatus(status.id, status.status);
        }
      }
    }
    return context.json({ ok: true });
  });

  app.notFound((context) =>
    errorResponse(
      context,
      new AppError(404, "NOT_FOUND", "The requested resource was not found."),
    ),
  );

  app.onError((error, context) => {
    if (error instanceof AppError) return errorResponse(context, error);
    logger.error("http.unhandled_error", {
      requestId: context.get("requestId"),
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return errorResponse(
      context,
      new AppError(500, "INTERNAL_ERROR", "An unexpected error occurred."),
    );
  });

  return app;
};
