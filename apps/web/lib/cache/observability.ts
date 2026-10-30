/**
 * In-memory cache telemetry and observability tracker.
 * Records hit, miss, error, and latency metrics without blocking critical paths.
 */

export interface CacheTelemetry {
  hits: number;
  misses: number;
  redisErrors: number;
  fallbacksToMemory: number;
  writes: number;
  invalidations: number;
  lastError: string | null;
  lastErrorTimestamp: string | null;
}

const metrics: CacheTelemetry = {
  hits: 0,
  misses: 0,
  redisErrors: 0,
  fallbacksToMemory: 0,
  writes: 0,
  invalidations: 0,
  lastError: null,
  lastErrorTimestamp: null,
};

export const CacheObservability = {
  recordHit(): void {
    metrics.hits++;
  },

  recordMiss(): void {
    metrics.misses++;
  },

  recordError(error: unknown): void {
    metrics.redisErrors++;
    metrics.lastError = error instanceof Error ? error.message : String(error);
    metrics.lastErrorTimestamp = new Date().toISOString();
  },

  recordFallback(): void {
    metrics.fallbacksToMemory++;
  },

  recordWrite(): void {
    metrics.writes++;
  },

  recordInvalidation(count: number = 1): void {
    metrics.invalidations += count;
  },

  getMetrics(): Readonly<CacheTelemetry> {
    return { ...metrics };
  },

  reset(): void {
    metrics.hits = 0;
    metrics.misses = 0;
    metrics.redisErrors = 0;
    metrics.fallbacksToMemory = 0;
    metrics.writes = 0;
    metrics.invalidations = 0;
    metrics.lastError = null;
    metrics.lastErrorTimestamp = null;
  },
};
