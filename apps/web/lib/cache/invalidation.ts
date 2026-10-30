import { getRedisClient } from "./redis";
import { CacheKeys } from "./keys";
import { clearMemoryCache } from "./cache-aside";
import { CacheObservability } from "./observability";

/**
 * Coordinated cache invalidation service.
 * Invalidate both L1 in-memory caches and L2 Redis distributed entries.
 */

export interface InvalidationResult {
  success: boolean;
  keysCleared: number;
  error?: string;
}

export const CacheInvalidation = {
  /**
   * Invalidate a specific article and all dependent archives.
   */
  async invalidateArticle(
    category: string,
    slug: string,
  ): Promise<InvalidationResult> {
    const redis = getRedisClient();
    const articleKey = CacheKeys.article(category, slug);
    const catalogKey = CacheKeys.blogCatalog();
    const sitemapKey = CacheKeys.sitemap();

    // 1. Clear in-memory L1 cache
    clearMemoryCache(slug);
    clearMemoryCache(category);
    clearMemoryCache("blog:catalog");

    let keysCleared = 3;

    // 2. Clear Redis L2 keys
    if (redis) {
      try {
        const pipeline = redis.pipeline();
        pipeline.del(articleKey);
        pipeline.del(catalogKey);
        pipeline.del(sitemapKey);

        // Find and delete matching category pages
        const categoryPattern = CacheKeys.categoryPattern(category);
        const matchedKeys = await redis.keys(categoryPattern);
        for (const k of matchedKeys) {
          pipeline.del(k);
          keysCleared++;
        }

        await pipeline.exec();
        CacheObservability.recordInvalidation(keysCleared);
      } catch (error) {
        CacheObservability.recordError(error);
        return {
          success: false,
          keysCleared,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    return { success: true, keysCleared };
  },

  /**
   * Invalidate all category listing keys.
   */
  async invalidateCategory(category: string): Promise<InvalidationResult> {
    const redis = getRedisClient();
    clearMemoryCache(`blog:cat:${category}`);

    let keysCleared = 1;
    if (redis) {
      try {
        const pattern = CacheKeys.categoryPattern(category);
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
          await redis.del(...keys);
          keysCleared += keys.length;
        }
        CacheObservability.recordInvalidation(keysCleared);
      } catch (error) {
        CacheObservability.recordError(error);
        return {
          success: false,
          keysCleared,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    return { success: true, keysCleared };
  },

  /**
   * Complete flush of all application cache keys.
   */
  async invalidateAll(): Promise<InvalidationResult> {
    clearMemoryCache();

    const redis = getRedisClient();
    let keysCleared = 0;

    if (redis) {
      try {
        const allKeys = await redis.keys(`${CacheKeys.prefix}*`);
        if (allKeys.length > 0) {
          await redis.del(...allKeys);
          keysCleared = allKeys.length;
        }
        CacheObservability.recordInvalidation(keysCleared);
      } catch (error) {
        CacheObservability.recordError(error);
        return {
          success: false,
          keysCleared,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    return { success: true, keysCleared };
  },
};
