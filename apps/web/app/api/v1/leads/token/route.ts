import { createHmac, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

const SECRET =
  process.env.LEAD_TOKEN_SECRET ||
  process.env.VERCEL_OIDC_TOKEN?.slice(0, 64) ||
  "aniket-portfolio-secure-lead-token-secret-2026-v1";

// Simple in-memory rate limiting for token issuance
const tokenIpMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = tokenIpMap.get(ip);
  if (!record || record.resetAt <= now) {
    tokenIpMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (record.count >= 30) {
    return true;
  }
  record.count++;
  return false;
}

export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please wait a few minutes.",
        },
      },
      {
        status: 429,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const now = Date.now();
  const id = randomUUID();
  const data = `${id}.${now}`;
  const signature = createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  const submissionToken = `${data}.${signature}`;

  return NextResponse.json(
    { submissionToken },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
