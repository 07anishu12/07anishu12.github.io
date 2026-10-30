import { test } from "node:test";
import assert from "node:assert/strict";

import {
  listPosts,
  getPost,
  getPostCached,
  getPaginatedPosts,
  isLeadCapturePost,
} from "../lib/blog";

test("listPosts returns lightweight catalog without heavy html bodies", () => {
  const posts = listPosts();
  assert.ok(posts.length > 500, `Expected > 500 posts, found ${posts.length}`);

  const sample = posts[0];
  assert.ok(sample.title, "Post must have a title");
  assert.ok(sample.slug, "Post must have a slug");
  assert.ok(sample.category, "Post must have a category");
  assert.ok(sample.datePublished, "Post must have datePublished");

  // Crucial check: catalog must NOT contain full html or raw body strings
  // @ts-expect-error verifying body absence at runtime
  assert.equal(sample.html, undefined, "Catalog item must not contain html");
  // @ts-expect-error verifying body absence at runtime
  assert.equal(sample.body, undefined, "Catalog item must not contain body");
});

test("getPost loads individual article with full HTML and headings", () => {
  const posts = listPosts();
  const sampleSummary = posts[0];

  const fullPost = getPost(sampleSummary.category, sampleSummary.slug);
  assert.ok(fullPost, "Full post must be retrieved");
  assert.equal(fullPost.title, sampleSummary.title);
  assert.ok(typeof fullPost.html === "string", "Full post must contain html string");
  assert.ok(fullPost.html.length > 50, "Full post HTML must be non-empty");
  assert.ok(Array.isArray(fullPost.headings), "Full post must contain headings array");
});

test("getPostCached retrieves article through resilient cache-aside", async () => {
  const posts = listPosts();
  const sample = posts[1];

  const post1 = await getPostCached(sample.category, sample.slug);
  assert.ok(post1);
  assert.equal(post1.slug, sample.slug);

  // Second call must return identical cached result
  const post2 = await getPostCached(sample.category, sample.slug);
  assert.ok(post2);
  assert.equal(post2.title, post1.title);
});

test("getPaginatedPosts correctly slices page windows and computes category counts", () => {
  // Page 1
  const page1 = getPaginatedPosts({ category: "all", page: 1, pageSize: 12 });
  assert.equal(page1.posts.length, 12);
  assert.equal(page1.page, 1);
  assert.ok(page1.totalPages >= 40);
  assert.ok(page1.total > 500);

  // Category counts must reflect all categories
  assert.ok(page1.categoryCounts.technology > 0);
  assert.ok(page1.categoryCounts.auto > 0);
  assert.ok(page1.categoryCounts.finance > 0);
  assert.ok(page1.categoryCounts.product > 0);

  // Page 2
  const page2 = getPaginatedPosts({ category: "all", page: 2, pageSize: 12 });
  assert.equal(page2.posts.length, 12);
  assert.equal(page2.page, 2);
  assert.notEqual(page1.posts[0].slug, page2.posts[0].slug);

  // Category filter
  const autoPage = getPaginatedPosts({ category: "auto", page: 1, pageSize: 12 });
  assert.ok(autoPage.posts.every((p) => p.category === "auto"));
  assert.equal(autoPage.total, page1.categoryCounts.auto);
});

test("isLeadCapturePost accurately classifies high-intent financial/auto queries", () => {
  assert.equal(
    isLeadCapturePost({ category: "finance", slug: "best-electric-scooter-loan-emi-guide" }),
    true,
  );
  assert.equal(
    isLeadCapturePost({ category: "auto", slug: "commuter-bike-on-road-price-in-delhi" }),
    true,
  );
  assert.equal(
    isLeadCapturePost({ category: "technology", slug: "postgresql-pgvector-guide" }),
    false,
  );
});
