import { test } from "node:test";
import assert from "node:assert/strict";

import {
  CacheKeys,
  CachePolicies,
  getJitteredTtl,
  cacheAside,
  clearMemoryCache,
  CacheInvalidation,
  CacheObservability,
} from "../lib/cache";

test("CacheKeys produces consistent versioned namespaced keys", () => {
  assert.equal(CacheKeys.siteConfig(), "aniket:v1:config:site");
  assert.equal(CacheKeys.blogCatalog(), "aniket:v1:blog:catalog");
  assert.equal(CacheKeys.blogCategory("Auto", 2), "aniket:v1:blog:cat:auto:p:2");
  assert.equal(
    CacheKeys.article("Auto", "best-cars-under-5-lakh"),
    "aniket:v1:article:auto:best-cars-under-5-lakh",
  );
  assert.equal(CacheKeys.searchQuery("EV range"), "aniket:v1:search:q:ev_range");
});

test("CachePolicies defines correct TTL ceilings and applies positive jitter", () => {
  assert.equal(CachePolicies.SITE_CONFIG, 3600);
  assert.equal(CachePolicies.BLOG_CATALOG, 900);
  assert.equal(CachePolicies.BLOG_CATEGORY, 600);
  assert.equal(CachePolicies.ARTICLE_CONTENT, 3600);
  assert.equal(CachePolicies.SEARCH_RESULTS, 300);

  // Jitter test: base TTL 600 with 10% max jitter must be between 600 and 660
  for (let i = 0; i < 20; i++) {
    const jittered = getJitteredTtl(600, 10);
    assert.ok(
      jittered >= 600 && jittered <= 660,
      `Jittered TTL ${jittered} outside bounds [600, 660]`,
    );
  }
});

test("cacheAside gracefully returns fetched data on cache miss and caches to L1 memory", async () => {
  clearMemoryCache();
  CacheObservability.reset();

  const testKey = "aniket:v1:test:sample";
  let fetchCount = 0;

  const fetcher = async () => {
    fetchCount++;
    return { id: 123, title: "Test Article" };
  };

  // Run 1: Cache Miss
  const res1 = await cacheAside(testKey, fetcher, {
    ttlSeconds: 60,
    skipRedis: true,
  });
  assert.deepEqual(res1, { id: 123, title: "Test Article" });
  assert.equal(fetchCount, 1);

  // Run 2: Cache Hit from L1 Memory
  const res2 = await cacheAside(testKey, fetcher, {
    ttlSeconds: 60,
    skipRedis: true,
  });
  assert.deepEqual(res2, { id: 123, title: "Test Article" });
  assert.equal(fetchCount, 1, "Fetcher should not have been called again on hit");

  const metrics = CacheObservability.getMetrics();
  assert.equal(metrics.misses, 1);
  assert.equal(metrics.hits, 1);
});

test("cacheAside single-flight dedupes concurrent requests for identical key", async () => {
  clearMemoryCache();
  const testKey = "aniket:v1:test:singleflight";
  let slowFetchCount = 0;

  const slowFetcher = async () => {
    slowFetchCount++;
    await new Promise((r) => setTimeout(r, 25));
    return { data: "singleflight-success" };
  };

  // Dispatch 5 concurrent requests simultaneously
  const results = await Promise.all([
    cacheAside(testKey, slowFetcher, { ttlSeconds: 60, skipRedis: true }),
    cacheAside(testKey, slowFetcher, { ttlSeconds: 60, skipRedis: true }),
    cacheAside(testKey, slowFetcher, { ttlSeconds: 60, skipRedis: true }),
    cacheAside(testKey, slowFetcher, { ttlSeconds: 60, skipRedis: true }),
    cacheAside(testKey, slowFetcher, { ttlSeconds: 60, skipRedis: true }),
  ]);

  for (const r of results) {
    assert.deepEqual(r, { data: "singleflight-success" });
  }
  assert.equal(
    slowFetchCount,
    1,
    "Concurrent in-flight requests must execute fetcher exactly once",
  );
});

test("CacheInvalidation invalidates memory entries cleanly", async () => {
  clearMemoryCache();
  const articleKey = CacheKeys.article("auto", "car-model-x");

  await cacheAside(articleKey, () => ({ name: "Model X" }), {
    ttlSeconds: 60,
    skipRedis: true,
  });

  const invRes = await CacheInvalidation.invalidateArticle("auto", "car-model-x");
  assert.equal(invRes.success, true);

  // Subsequent fetch must be a miss and call fetcher again
  let called = false;
  await cacheAside(
    articleKey,
    () => {
      called = true;
      return { name: "Model X Fresh" };
    },
    { ttlSeconds: 60, skipRedis: true },
  );

  assert.equal(called, true, "Fetcher must execute after invalidation");
});
