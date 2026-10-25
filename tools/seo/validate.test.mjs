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

test("routing keeps known legacy redirects permanent", async () => {
  const { default: config } = await import("../../apps/web/next.config.mjs?seo-test");
  const redirects = await config.redirects();
  assert.deepEqual(redirects.map(({ source, destination, permanent }) => ({ source, destination, permanent })), [
    { source: "/about.html", destination: "/about", permanent: true },
    { source: "/contact.html", destination: "/contact", permanent: true },
    { source: "/privacy.html", destination: "/privacy", permanent: true },
    { source: "/work.html", destination: "/projects", permanent: true },
  ]);
});
