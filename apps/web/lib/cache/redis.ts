import { Redis } from "@upstash/redis";

/**
 * Production-grade Redis client initialization for Vercel Edge / Serverless runtimes.
 * Automatically checks for Upstash REST credentials (UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN).
 * If unconfigured or unavailable, returns null to trigger graceful fallback to in-memory caching.
 */

let redisInstance: Redis | null = null;
let isInitialized = false;

export function getRedisClient(): Redis | null {
  if (isInitialized) return redisInstance;

  isInitialized = true;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_URL;

  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV !== "production") {
      // In dev or tests without credentials, log once and fall back silently
      // console.info("[Cache] Redis credentials not configured. Using high-performance in-memory fallback.");
    }
    return null;
  }

  try {
    redisInstance = new Redis({
      url,
      token,
      // Automatic retry with exponential backoff for transient network glitches
      retry: {
        retries: 2,
        backoff: (retryCount) => Math.min(retryCount * 50, 200),
      },
    });
    return redisInstance;
  } catch (error) {
    console.error("[Cache] Failed to initialize Redis client:", error);
    return null;
  }
}

/**
 * Health check with bounded timeout (500ms).
 * Returns true if Redis is reachable, false otherwise.
 */
export async function checkRedisHealth(): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Redis ping timeout")), 500),
    );
    const pingPromise = client.ping();
    const result = await Promise.race([pingPromise, timeoutPromise]);
    return result === "PONG";
  } catch {
    return false;
  }
}
