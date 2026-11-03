import assert from "node:assert/strict";
import test from "node:test";
import {
  ORIGIN,
  SITEMAP_CONFIGS,
  SITEMAP_SCHEMAS,
  getSitemapGroups,
  getSitemapIndexXml,
  getSitemapXml,
  SitemapGroupId,
} from "../lib/sitemap";

import { GET as getIndexHandler } from "../app/sitemap.xml/route";
import { GET as getPagesHandler } from "../app/sitemap-pages.xml/route";
import { GET as getBlogCategoriesHandler } from "../app/sitemap-blog-categories.xml/route";
import { GET as getBlogTechHandler } from "../app/sitemap-blog-technology.xml/route";
import { GET as getBlogAutoHandler } from "../app/sitemap-blog-automotive.xml/route";
import { GET as getBlogProductHandler } from "../app/sitemap-blog-product.xml/route";
import { GET as getBlogFinanceHandler } from "../app/sitemap-blog-finance.xml/route";
import { GET as getProjectsHandler } from "../app/sitemap-projects.xml/route";
import { GET as getAuthorHandler } from "../app/sitemap-author.xml/route";
import { GET as getToolsHandler } from "../app/sitemap-tools.xml/route";

test("Parent sitemap index returns valid XML and correct schema", () => {
  const xml = getSitemapIndexXml();
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes(`<sitemapindex xmlns="${SITEMAP_SCHEMAS.sitemapindex}">`));
  assert.ok(!xml.includes("<url>"), "Parent index must never contain individual <url> tags");

  const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locMatches.length, 9, "Expected 9 child sitemaps in index");
  assert.equal(new Set(locMatches).size, 9, "Child sitemaps in index must be unique");

  for (const config of SITEMAP_CONFIGS) {
    const expectedLoc = `${ORIGIN}/${config.filename}`;
    assert.ok(locMatches.includes(expectedLoc), `Index missing ${expectedLoc}`);
  }

  const lastmodMatches = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  assert.equal(lastmodMatches.length, 9, "All child sitemaps must have lastmod");
  for (const lm of lastmodMatches) {
    assert.ok(
      /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(lm),
      `Invalid ISO timestamp format: ${lm}`,
    );
  }
});

test("Child sitemaps return valid URL sets with exact classification counts", () => {
  const expectedCounts: Record<SitemapGroupId, number> = {
    pages: 7,
    "blog-categories": 5,
    "blog-technology": 156,
    "blog-automotive": 393,
    "blog-product": 25,
    "blog-finance": 42,
    projects: 14,
    author: 1,
    tools: 1,
  };

  const groups = getSitemapGroups();
  let totalUrls = 0;
  const allUrls = new Set<string>();

  for (const config of SITEMAP_CONFIGS) {
    const xml = getSitemapXml(config.id);
    assert.ok(xml, `XML for ${config.id} should not be null`);
    assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
    assert.ok(xml.includes(`<urlset xmlns="${SITEMAP_SCHEMAS.urlset}">`));
    assert.ok(!xml.includes("<sitemap>"), `Child sitemap ${config.id} must not contain nested <sitemap>`);

    const entries = groups.get(config.id) || [];
    assert.equal(entries.length, expectedCounts[config.id], `Count mismatch for ${config.id}`);
    totalUrls += entries.length;

    for (const entry of entries) {
      assert.ok(!allUrls.has(entry.loc), `Duplicate URL detected: ${entry.loc}`);
      allUrls.add(entry.loc);
      assert.ok(entry.loc.startsWith(ORIGIN), `URL must use canonical origin: ${entry.loc}`);
      assert.ok(!entry.loc.includes("www."), `Legacy www found in URL: ${entry.loc}`);
      assert.ok(!entry.loc.includes("github.io"), `Legacy github.io found in URL: ${entry.loc}`);
      assert.ok(entry.loc.endsWith("/") || entry.loc.endsWith(".html"), `URL must preserve trailing slash or .html: ${entry.loc}`);
      if (entry.lastmod) {
        assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod), `Invalid lastmod date: ${entry.lastmod}`);
      }
    }
  }

  assert.equal(totalUrls, 644, "Total eligible URLs must be exactly 644");
  assert.equal(allUrls.size, 644, "All 644 URLs must be unique");
});

test("Route handlers return HTTP 200 with application/xml Content-Type", async () => {
  const handlers = [
    { name: "index", handler: getIndexHandler },
    { name: "pages", handler: getPagesHandler },
    { name: "blog-categories", handler: getBlogCategoriesHandler },
    { name: "blog-technology", handler: getBlogTechHandler },
    { name: "blog-automotive", handler: getBlogAutoHandler },
    { name: "blog-product", handler: getBlogProductHandler },
    { name: "blog-finance", handler: getBlogFinanceHandler },
    { name: "projects", handler: getProjectsHandler },
    { name: "author", handler: getAuthorHandler },
    { name: "tools", handler: getToolsHandler },
  ];

  for (const { name, handler } of handlers) {
    const res = await handler();
    assert.equal(res.status, 200, `${name} handler status`);
    const contentType = res.headers.get("Content-Type");
    assert.ok(contentType?.includes("application/xml"), `${name} Content-Type was ${contentType}`);
    const cacheControl = res.headers.get("Cache-Control");
    assert.ok(cacheControl?.includes("public"), `${name} Cache-Control`);
    const text = await res.text();
    assert.ok(text.includes('<?xml version="1.0" encoding="UTF-8"?>'), `${name} XML declaration`);
  }
});
