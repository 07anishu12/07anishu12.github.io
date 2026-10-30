import { getRedisClient } from "./redis";
import { getJitteredTtl } from "./policies";
import { CacheObservability } from "./observability";

interface MemoryCacheEntry<T> {
  value: T;
  expiresAt: number; // unix ms
}

/**
 * L1 in-process memory cache fallback.
 * Prevents repeat disk reads and provides seamless zero-downtime operation
 * if Redis is unconfigured, unreachable, or timing out.
 */
const memoryCache = new Map<string, MemoryCacheEntry<unknown>>();
const MAX_MEMORY_ENTRIES = 1000;

/**
 * In-flight promise tracker for SingleFlight (cache stampede prevention).
 */
const inFlightRequests = new Map<string, Promise<unknown>>();

function getFromMemory<T>(key: string): T | null {
  const entry = memoryCache.get(key) as MemoryCacheEntry<T> | undefined;
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value;
}

function setToMemory<T>(key: string, value: T, ttlSeconds: number): void {
  // Simple LRU-style eviction if cache grows too large
  if (memoryCache.size >= MAX_MEMORY_ENTRIES) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }

  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export function clearMemoryCache(keyPattern?: string): void {
  if (!keyPattern) {
    memoryCache.clear();
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.includes(keyPattern)) {
      memoryCache.delete(key);
    }
  }
}

export interface CacheAsideOptions {
  ttlSeconds: number;
  /** Maximum milliseconds to wait for Redis before falling back to source. Default: 600ms */
  timeoutMs?: number;
  /** Skip Redis and use only L1 memory cache (useful for dev/tests) */
  skipRedis?: boolean;
}

/**
 * Executes a resilient Cache-Aside retrieval pattern:
 * 1. Check L1 In-Memory Cache (0ms latency).
 * 2. Check L2 Redis Cache (network bounded by timeoutMs).
 * 3. On cache miss: Run single-flight fetcher, write back to L1 and L2 with jittered TTL.
 * 4. On any Redis failure/timeout: Gracefully fall back to fetcher and L1 memory cache.
 */
export async function cacheAside<T>(
  key: string,
  fetcher: () => Promise<T> | T,
  options: CacheAsideOptions,
): Promise<T> {
  const { ttlSeconds, timeoutMs = 600, skipRedis = false } = options;

  // 1. Check L1 Memory Cache
  const memoryHit = getFromMemory<T>(key);
  if (memoryHit !== null) {
    CacheObservability.recordHit();
    return memoryHit;
  }

  // 2. Check L2 Redis Cache (if available and not skipped)
  const redis = skipRedis ? null : getRedisClient();
  if (redis) {
    try {
      const redisPromise = redis.get<T>(key);
      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), timeoutMs),
      );

      const redisResult = await Promise.race([redisPromise, timeoutPromise]);
      if (redisResult !== null && redisResult !== undefined) {
        CacheObservability.recordHit();
        // Warm L1 memory cache from L2 hit
        setToMemory(key, redisResult, ttlSeconds);
        return redisResult;
      }
    } catch (error) {
      CacheObservability.recordError(error);
      CacheObservability.recordFallback();
      // Silently proceed to fetcher on Redis failure
    }
  }

  // 3. Cache Miss - Deduplicate concurrent requests (SingleFlight pattern)
  CacheObservability.recordMiss();

  const existingInFlight = inFlightRequests.get(key) as Promise<T> | undefined;
  if (existingInFlight) {
    return existingInFlight;
  }

  const executionPromise = (async () => {
    try {
      const freshData = await fetcher();

      // Guard against caching undefined or error nulls
      if (freshData !== undefined && freshData !== null) {
        const jitteredTtl = getJitteredTtl(ttlSeconds);

        // Save to L1 memory cache immediately
        setToMemory(key, freshData, jitteredTtl);

        // Save to L2 Redis asynchronously (non-blocking fire-and-forget)
        if (redis) {
          redis
            .set(key, JSON.stringify(freshData), { ex: jitteredTtl })
            .then(() => CacheObservability.recordWrite())
            .catch((err) => CacheObservability.recordError(err));
        }
      }

      return freshData;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, executionPromise);
  return executionPromise;
}
