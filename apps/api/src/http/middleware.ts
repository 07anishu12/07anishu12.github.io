import { randomUUID } from "node:crypto";

import { cors } from "hono/cors";
import type { MiddlewareHandler } from "hono";
import { getConnInfo } from "@hono/node-server/conninfo";

import type { AppConfig } from "../config.js";
import { AppError } from "../errors.js";
import { FixedWindowRateLimiter } from "../rate-limit.js";
import type { Logger } from "../logger.js";

import "./context.js";

export const requestId = (): MiddlewareHandler => async (context, next) => {
  const supplied = context.req.header("x-request-id");
  const id =
    supplied && /^[0-9a-f-]{36}$/i.test(supplied) ? supplied : randomUUID();
  context.set("requestId", id);
  context.header("X-Request-ID", id);
  await next();
};

export const requestLogging =
  (logger: Logger): MiddlewareHandler =>
  async (context, next) => {
    const startedAt = Date.now();
    await next();
    logger.info("http.request", {
      requestId: context.get("requestId"),
      method: context.req.method,
      path: [
        "/v1/contact",
        "/v1/projects",
        "/v1/leads",
        "/v1/leads/token",
        "/api/v1/leads",
        "/api/v1/leads/token",
        "/api/v1/webhooks/whatsapp",
        "/health/live",
        "/health/ready",
      ].includes(context.req.path)
        ? context.req.path
        : "[unmatched]",
      status: context.res.status,
      durationMs: Date.now() - startedAt,
    });
  };

export const securityHeaders =
  (production: boolean): MiddlewareHandler =>
  async (context, next) => {
    context.header("X-Content-Type-Options", "nosniff");
    context.header("X-Frame-Options", "DENY");
    context.header("Referrer-Policy", "no-referrer");
    context.header(
      "Permissions-Policy",
      "camera=(), geolocation=(), microphone=()",
    );
    context.header(
      "Content-Security-Policy",
      "default-src 'none'; frame-ancestors 'none'",
    );
    if (production)
      context.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains",
      );
    await next();
  };

export const corsPolicy = (config: AppConfig): MiddlewareHandler =>
  cors({
    origin: (origin) =>
      origin && config.corsOrigins.includes(origin) ? origin : undefined,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "X-Request-ID"],
    maxAge: 600,
  });

export const requestSizeLimit =
  (maxBodyBytes: number): MiddlewareHandler =>
  async (context, next) => {
    const contentLength = context.req.header("content-length");
    if (contentLength && Number(contentLength) > maxBodyBytes) {
      throw new AppError(
        413,
        "PAYLOAD_TOO_LARGE",
        "Request body is too large.",
      );
    }
    await next();
  };

export const rateLimit =
  (limiter: FixedWindowRateLimiter, trustProxy: boolean): MiddlewareHandler =>
  async (context, next) => {
    const forwarded = context.req.header("x-forwarded-for");
    let clientKey =
      trustProxy && forwarded ? forwarded.split(",")[0].trim() : "";
    if (!clientKey) {
      try {
        clientKey = getConnInfo(context).remote.address ?? "";
      } catch {
        clientKey = "test-client";
      }
    }
    const result = limiter.check(clientKey || "direct-client");
    if (!result.allowed) {
      throw new AppError(
        429,
        "RATE_LIMITED",
        "Too many requests. Please try again later.",
        undefined,
        result.retryAfterSeconds,
      );
    }
    await next();
  };
