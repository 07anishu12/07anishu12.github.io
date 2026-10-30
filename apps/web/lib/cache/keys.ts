/**
 * Versioned, namespaced cache key builder.
 * Guarantees key collision safety, consistent naming conventions,
 * and simplified wildcard pattern invalidation.
 */

const KEY_PREFIX = "aniket:v1:";

function sanitizeKeyPart(part: string | number): string {
  return String(part)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_");
}

export const CacheKeys = {
  prefix: KEY_PREFIX,

  /** Key for site configuration object */
  siteConfig: (): string => `${KEY_PREFIX}config:site`,

  /** Key for lightweight blog catalog */
  blogCatalog: (): string => `${KEY_PREFIX}blog:catalog`,

  /** Key for category listing page summaries */
  blogCategory: (category: string, page: number = 1): string =>
    `${KEY_PREFIX}blog:cat:${sanitizeKeyPart(category)}:p:${page}`,

  /** Key for individual article body and parsed content */
  article: (category: string, slug: string): string =>
    `${KEY_PREFIX}article:${sanitizeKeyPart(category)}:${sanitizeKeyPart(slug)}`,

  /** Key for search index and query result caches */
  searchIndex: (): string => `${KEY_PREFIX}search:index`,
  searchQuery: (query: string): string =>
    `${KEY_PREFIX}search:q:${sanitizeKeyPart(query)}`,

  /** Key for project catalog metadata */
  projectCatalog: (): string => `${KEY_PREFIX}projects:catalog`,

  /** Key for sitemap metadata */
  sitemap: (): string => `${KEY_PREFIX}sitemap:meta`,

  /** Pattern to match all keys for a specific category */
  categoryPattern: (category: string): string =>
    `${KEY_PREFIX}blog:cat:${sanitizeKeyPart(category)}:*`,

  /** Pattern to match all article keys */
  articlePattern: (): string => `${KEY_PREFIX}article:*`,
};
