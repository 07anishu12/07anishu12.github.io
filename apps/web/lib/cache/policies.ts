/**
 * Cache TTL policies and stampede prevention mechanisms.
 * TTL values defined in seconds.
 */

export const CachePolicies = {
  /** Site configuration: 1 hour */
  SITE_CONFIG: 3600,

  /** Blog catalog metadata: 15 minutes */
  BLOG_CATALOG: 900,

  /** Blog category pagination results: 10 minutes */
  BLOG_CATEGORY: 600,

  /** Individual article content: 1 hour */
  ARTICLE_CONTENT: 3600,

  /** Search query results: 5 minutes */
  SEARCH_RESULTS: 300,

  /** Project catalog metadata: 30 minutes */
  PROJECT_CATALOG: 1800,

  /** Sitemap metadata: 1 hour */
  SITEMAP_METADATA: 3600,
} as const;

/**
 * Calculates a jittered TTL to prevent cache stampedes (dogpiling).
 * Adds up to `maxJitterPercent` (default 10%) random variance to the base TTL.
 *
 * Example: Base 900s -> Random TTL between 900s and 990s.
 */
export function getJitteredTtl(
  baseTtlSeconds: number,
  maxJitterPercent: number = 10,
): number {
  if (baseTtlSeconds <= 0) return baseTtlSeconds;
  const jitterRange = Math.floor(baseTtlSeconds * (maxJitterPercent / 100));
  const jitter = Math.floor(Math.random() * (jitterRange + 1));
  return baseTtlSeconds + jitter;
}
