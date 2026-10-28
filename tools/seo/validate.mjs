import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

export const ORIGIN = "https://aniket.app";
const redirectPaths = new Set([
  "/about",
  "/about.html",
  "/contact",
  "/contact.html",
  "/privacy",
  "/privacy.html",
  "/work.html",
  "/index.html",
]);

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});

function localFile(root, url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const candidates = pathname.endsWith("/")
    ? [path.join(root, pathname, "index.html")]
    : [path.join(root, pathname), path.join(root, pathname, "index.html")];
  return candidates.find((file) => fs.existsSync(file));
}

function isKnownNativeRoute(pathname) {
  return pathname === "/" ||
    /^\/(about|projects|research|contact|privacy|finance\/bikes)\/$/.test(pathname) ||
    /^\/projects\/[a-z0-9-]+\/$/.test(pathname) ||
    /^\/blog(?:\/[a-z0-9-]+)?\/$/.test(pathname);
}

function schemaTypes(value) {
  const values = Array.isArray(value) ? value : [value];
  return values.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
    const graphTypes = Array.isArray(item["@graph"]) ? schemaTypes(item["@graph"]) : [];
    return [...types.filter(Boolean).map(String), ...graphTypes];
  });
}

export function validateSite(root) {
  const failures = [];
  const check = (condition, message) => { if (!condition) failures.push(message); };
  const sitemapPath = path.join(root, "sitemap.xml");
  const robotsPath = path.join(root, "robots.txt");
  const llmsPath = path.join(root, "llms.txt");
  check(fs.existsSync(sitemapPath), "sitemap.xml is missing");
  check(fs.existsSync(robotsPath), "robots.txt is missing");
  check(fs.existsSync(llmsPath), "llms.txt is missing");
  if (failures.length) throw new Error(failures.join("\n"));

  const sitemap = load(fs.readFileSync(sitemapPath, "utf8"), { xmlMode: true });
  const urls = sitemap("url > loc").map((_, element) => sitemap(element).text()).get();
  check(urls.length > 0, "sitemap.xml contains no URLs");
  check(urls.includes(`${ORIGIN}/`), "sitemap.xml is missing the canonical homepage");
  check(new Set(urls).size === urls.length, "sitemap.xml contains duplicate URLs");
  check(!sitemap("changefreq").length && !sitemap("priority").length, "sitemap.xml contains changefreq or priority");
  for (const url of urls) {
    let parsed;
    try { parsed = new URL(url); } catch { failures.push(`invalid sitemap URL: ${url}`); continue; }
    check(parsed.origin === ORIGIN, `noncanonical sitemap origin: ${url}`);
    check(parsed.protocol === "https:", `non-HTTPS sitemap URL: ${url}`);
    check(!parsed.search && !parsed.hash, `parameterized sitemap URL: ${url}`);
    check(!redirectPaths.has(parsed.pathname), `redirecting sitemap URL: ${url}`);
  }
  sitemap("url").each((_, element) => {
    const lastmod = sitemap(element).find("lastmod").text();
    check(!lastmod || /^\d{4}-\d{2}-\d{2}$/.test(lastmod), `invalid sitemap lastmod: ${lastmod}`);
  });

  const robots = fs.readFileSync(robotsPath, "utf8");
  check(robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`), "robots.txt sitemap declaration is missing");
  check(/^User-agent:\s*\*$/m.test(robots), "robots.txt wildcard user-agent group is missing");

  const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
  let htmlPages = 0;
  const schemaTypeCounts = new Map();
  for (const file of htmlFiles) {
    const relative = `/${path.relative(root, file)}`;
    if (relative === "/404.html" || /^\/google.*\.html$/i.test(relative)) continue;
    const $ = load(fs.readFileSync(file, "utf8"));
    htmlPages += 1;
    check(Boolean($("title").text().trim()), `${relative}: missing title`);
    check(Boolean($("meta[name='description']").attr("content")?.trim()), `${relative}: missing description`);
    check($("h1").length === 1, `${relative}: expected exactly one H1`);
    check(!$("meta[name='robots']").attr("content")?.match(/noindex/i), `${relative}: published noindex`);
    const canonical = $("link[rel='canonical']").attr("href");
    if (canonical) {
      check(canonical.startsWith(`${ORIGIN}/`), `${relative}: canonical origin mismatch`);
      check(!canonical.endsWith("index.html"), `${relative}: canonical ends with index.html: ${canonical}`);
    }
    for (const element of $("script[type='application/ld+json']").toArray()) {
      try {
        const parsed = JSON.parse($(element).text());
        for (const type of schemaTypes(parsed)) schemaTypeCounts.set(type, (schemaTypeCounts.get(type) || 0) + 1);
      } catch {
        failures.push(`${relative}: invalid JSON-LD`);
      }
    }
    for (const meta of $("meta[property='og:image'], meta[name='twitter:image']").toArray()) {
      const image = $(meta).attr("content");
      if (!image) continue;
      try {
        const parsed = new URL(image);
        check(parsed.origin === ORIGIN, `${relative}: social image origin mismatch`);
        if (parsed.origin === ORIGIN) check(Boolean(localFile(root, image)), `${relative}: social image missing: ${image}`);
      } catch {
        failures.push(`${relative}: invalid social image URL: ${image}`);
      }
    }
  }

  const llms = fs.readFileSync(llmsPath, "utf8");
  for (const match of llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)) {
    const url = match[1];
    let parsed;
    try { parsed = new URL(url); } catch { failures.push(`llms.txt invalid URL: ${url}`); continue; }
    check(parsed.origin === ORIGIN, `llms.txt noncanonical URL: ${url}`);
    if (parsed.origin === ORIGIN) check(Boolean(localFile(root, url)) || isKnownNativeRoute(parsed.pathname) || parsed.pathname === "/sitemap.xml" || parsed.pathname === "/robots.txt" || parsed.pathname === "/llms.txt", `llms.txt unresolved URL: ${url}`);
  }

  if (failures.length) throw new Error(failures.join("\n"));
  return { urls: urls.length, htmlPages, schemaTypes: Object.fromEntries(schemaTypeCounts) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = path.resolve(process.argv[2] || "apps/web/public");
  try {
    const result = validateSite(root);
    console.log(`SEO validation passed: ${result.urls} sitemap URLs, ${result.htmlPages} HTML pages.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
