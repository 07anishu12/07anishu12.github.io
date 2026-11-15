import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { validateSite } from "./validate.mjs";

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-seo-"));
  fs.mkdirSync(path.join(root, "assets"), { recursive: true });
  fs.writeFileSync(path.join(root, "assets", "portrait.png"), "fixture");
  fs.writeFileSync(path.join(root, "index.html"), `<!doctype html><html lang="en"><head><title>Home</title><meta name="description" content="Home"><link rel="canonical" href="https://aniket.app/"><meta property="og:image" content="https://aniket.app/assets/portrait.png"><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Person","@id":"https://aniket.app/#person"},{"@type":"WebSite","@id":"https://aniket.app/#website"}]}</script></head><body><h1>Home</h1></body></html>`);
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aniket.app/</loc></url></urlset>`);
  fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://aniket.app/sitemap.xml\n");
  fs.writeFileSync(path.join(root, "llms.txt"), "# Aniket Thakur\n- [Home](https://aniket.app/)\n");
  return root;
}

test("validates sitemap, robots, metadata, social image, and JSON-LD", () => {
  const root = fixture();
  assert.deepEqual(validateSite(root), { urls: 1, htmlPages: 1, schemaTypes: { Person: 1, WebSite: 1 } });
});

test("rejects a sitemap missing the canonical homepage", () => {
  const root = fixture();
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aniket.app/about/</loc></url></urlset>`);
  assert.throws(() => validateSite(root), /missing the canonical homepage/);
});

test("rejects redirecting sitemap entries and obsolete priority fields", () => {
  const root = fixture();
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aniket.app/about.html</loc><priority>1</priority></url></urlset>`);
  assert.throws(() => validateSite(root), /redirecting sitemap URL|changefreq or priority/);
});

test("rejects canonical URLs ending in index.html", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "index.html"),
    `<!doctype html><html lang="en"><head><title>Home</title><meta name="description" content="Home"><link rel="canonical" href="https://aniket.app/index.html"><meta property="og:image" content="https://aniket.app/assets/portrait.png"></head><body><h1>Home</h1></body></html>`,
  );
  assert.throws(() => validateSite(root), /canonical ends with index\.html/);
});

test("validates sitemap index and referenced child sitemaps", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://aniket.app/sitemap-pages.xml</loc>
    <lastmod>2026-10-31T22:00:00+05:30</lastmod>
  </sitemap>
</sitemapindex>`,
  );
  fs.writeFileSync(
    path.join(root, "sitemap-pages.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aniket.app/</loc>
    <lastmod>2026-10-31</lastmod>
  </url>
</urlset>`,
  );
  assert.deepEqual(validateSite(root), { urls: 1, htmlPages: 1, schemaTypes: { Person: 1, WebSite: 1 } });
});

test("rejects a sitemap index containing direct <url> tags", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://aniket.app/</loc></url>
</sitemapindex>`,
  );
  assert.throws(() => validateSite(root), /sitemap index must not contain <url> elements directly/);
});

test("rejects duplicate URLs across child sitemaps in index", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://aniket.app/sitemap-1.xml</loc></sitemap>
  <sitemap><loc>https://aniket.app/sitemap-2.xml</loc></sitemap>
</sitemapindex>`,
  );
  fs.writeFileSync(
    path.join(root, "sitemap-1.xml"),
    `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aniket.app/</loc></url></urlset>`,
  );
  fs.writeFileSync(
    path.join(root, "sitemap-2.xml"),
    `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aniket.app/</loc></url></urlset>`,
  );
  assert.throws(() => validateSite(root), /contains duplicate URLs/);
});

test("routing keeps known legacy redirects permanent", async () => {
  const { default: config } = await import("../../apps/web/next.config.mjs?seo-test");
  const redirects = await config.redirects();
  assert.deepEqual(redirects.map(({ source, destination, permanent }) => ({ source, destination, permanent })), [
    { source: "/index.html", destination: "/", permanent: true },
    { source: "/:path*", destination: "https://aniket.app/:path*", permanent: true },
    { source: "/about.html", destination: "/about/", permanent: true },
    { source: "/contact.html", destination: "/contact/", permanent: true },
    { source: "/privacy.html", destination: "/privacy/", permanent: true },
    { source: "/work.html", destination: "/work/", permanent: true },
    { source: "/learnings.html", destination: "/learnings/", permanent: true },
    { source: "/topics/index.html", destination: "/topics/", permanent: true },
    { source: "/author/aniket-thakur.html", destination: "/author/aniket-thakur/", permanent: true },
    { source: "/blog/page/1/", destination: "/blog/", permanent: true },
    { source: "/blog/:category/page/1/", destination: "/blog/:category/", permanent: true },
    { source: "/writing", destination: "/blog/", permanent: true },
    { source: "/writing/", destination: "/blog/", permanent: true },
    { source: "/writing/page/1/", destination: "/blog/", permanent: true },
    { source: "/writing/:slug/", destination: "/blog/technology/:slug/", permanent: true },
    { source: "/blog/automotive/", destination: "/blog/auto/", permanent: true },
    { source: "/blog/automotive/:slug/", destination: "/blog/auto/:slug/", permanent: true },
    { source: "/topics/artificial-intelligence.html", destination: "/topics/ai-engineering/", permanent: true },
    { source: "/topics/data-science.html", destination: "/topics/data-engineering/", permanent: true },
    { source: "/topics/fintech.html", destination: "/topics/fintech-product/", permanent: true },
    { source: "/topics/graph-neural-networks.html", destination: "/topics/ai-research/", permanent: true },
    { source: "/topics/seo-automation.html", destination: "/topics/ai-engineering/", permanent: true },
  ]);
});

test("sitemap and content inventory parity: all published articles exist in sitemaps", async () => {
  const { readArticles } = await import("../blog/content.js");
  const { generateAllSitemaps } = await import("./sitemap-builder.js");
  const posts = readArticles();
  const { totalUrls, files } = generateAllSitemaps({ posts });
  assert.equal(posts.length, 1001, "Expected 1001 published markdown articles in data/blog");
  assert.equal(totalUrls, 1047, "Expected 1047 total URLs across sitemaps");

  const sitemapIndex = files.get("sitemap.xml");
  assert.ok(sitemapIndex.includes("sitemap-blog-technology.xml"));
  assert.ok(sitemapIndex.includes("sitemap-blog-automotive.xml"));
  assert.ok(sitemapIndex.includes("sitemap-blog-product.xml"));
  assert.ok(sitemapIndex.includes("sitemap-blog-finance.xml"));
  assert.ok(sitemapIndex.includes("sitemap-blog-cfa.xml"));

  const autoXml = files.get("sitemap-blog-automotive.xml");
  const techXml = files.get("sitemap-blog-technology.xml");
  const finXml = files.get("sitemap-blog-finance.xml");
  const prodXml = files.get("sitemap-blog-product.xml");
  const cfaXml = files.get("sitemap-blog-cfa.xml");

  for (const post of posts) {
    const expectedLoc = `<loc>https://aniket.app/blog/${post.category}/${post.slug}/</loc>`;
    if (post.category === "auto") assert.ok(autoXml.includes(expectedLoc), `Missing auto post in sitemap: ${post.slug}`);
    else if (post.category === "technology") assert.ok(techXml.includes(expectedLoc), `Missing tech post in sitemap: ${post.slug}`);
    else if (post.category === "finance") assert.ok(finXml.includes(expectedLoc), `Missing finance post in sitemap: ${post.slug}`);
    else if (post.category === "product") assert.ok(prodXml.includes(expectedLoc), `Missing product post in sitemap: ${post.slug}`);
    else if (post.category === "cfa") assert.ok(cfaXml.includes(expectedLoc), `Missing cfa post in sitemap: ${post.slug}`);
  }
});

test("robots.txt behavior: declares sitemap and allows public crawler access", () => {
  const robots = fs.readFileSync(path.resolve("robots.txt"), "utf8");
  assert.ok(/^User-agent:\s*\*$/m.test(robots), "Must declare wildcard user agent");
  assert.ok(robots.includes("Sitemap: https://aniket.app/sitemap.xml"), "Must declare canonical sitemap");
  assert.ok(robots.includes("Disallow: /admin/"), "Admin must be disallowed");
  assert.ok(robots.includes("Disallow: /api/"), "API must be disallowed");
  assert.ok(!robots.includes("Disallow: /blog/auto"), "Automotive articles must never be disallowed");
  assert.ok(!robots.includes("Disallow: /topics/"), "Topic hubs must never be disallowed");
});

test("noindex detection: rejects pages marked with noindex in production build", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "article.html"),
    `<!doctype html><html lang="en"><head><title>Title</title><meta name="description" content="Desc"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="https://aniket.app/article/"></head><body><h1>Title</h1></body></html>`,
  );
  assert.throws(() => validateSite(root), /published noindex/);
});

test("metadata completeness: requires title, description, and exactly one H1", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "missing-h1.html"),
    `<!doctype html><html lang="en"><head><title>Title</title><meta name="description" content="Desc"><link rel="canonical" href="https://aniket.app/missing-h1/"></head><body><h2>Subheading</h2></body></html>`,
  );
  assert.throws(() => validateSite(root), /expected exactly one H1/);
});

test("structured data validity: requires valid JSON-LD and Person/WebSite entities", () => {
  const root = fixture();
  fs.writeFileSync(
    path.join(root, "bad-jsonld.html"),
    `<!doctype html><html lang="en"><head><title>Title</title><meta name="description" content="Desc"><script type="application/ld+json">{ broken json </script><link rel="canonical" href="https://aniket.app/bad-jsonld/"></head><body><h1>Title</h1></body></html>`,
  );
  assert.throws(() => validateSite(root), /invalid JSON-LD/);
});
