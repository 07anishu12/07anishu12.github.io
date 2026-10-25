import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const progressFile = path.resolve("data/blog-60-progress.json");
const progress = JSON.parse(fs.readFileSync(progressFile, "utf8"));
const sitemapXml = fs.readFileSync("_site/sitemap.xml", "utf8");
const sitemap$ = cheerio.load(sitemapXml, { xmlMode: true });
const sitemapUrls = new Set(sitemap$("url > loc").map((_, el) => sitemap$(el).text()).get());

const sourceFile = "/Users/anny/Downloads/aniket_ai_technology_60_articles.md";
const sourceContent = fs.readFileSync(sourceFile, "utf8");
const manifestMatch = sourceContent.match(/## 3\. Complete 60-Article Manifest([\s\S]*?)## 4\. Complete Articles/);
const lines = manifestMatch[1].trim().split("\n").filter((l) => l.startsWith("| `article-"));

console.log("==================================================================");
console.log(" 60-Article Verification Audit");
console.log("==================================================================");

const results = [];
let passedCount = 0;

for (const line of lines) {
  const parts = line.split("|").map((p) => p.trim());
  const id = parts[1].replace(/`/g, "");
  const title = parts[3];
  const slug = parts[5].replace(/`/g, "");
  const expectedUrl = `https://aniket.app/blog/technology/${slug}/`;
  const relativeHtml = path.join("_site/blog/technology", slug, "index.html");
  const markdownPath = path.join("data/blog/technology", `${slug}.md`);

  const mdExists = fs.existsSync(markdownPath);
  const htmlExists = fs.existsSync(relativeHtml);
  const inSitemap = sitemapUrls.has(expectedUrl);

  let hasH1 = false;
  let canonicalOk = false;
  let jsonLdOk = false;

  if (htmlExists) {
    const $ = cheerio.load(fs.readFileSync(relativeHtml, "utf8"));
    hasH1 = $("h1").length === 1 && $("h1").text().trim().length > 0;
    const canonical = $('link[rel="canonical"]').attr("href");
    canonicalOk = canonical === expectedUrl;
    const jsonLd = $('script[type="application/ld+json"]').text();
    jsonLdOk = Boolean(jsonLd && jsonLd.includes("BlogPosting"));
  }

  const passed = mdExists && htmlExists && inSitemap && hasH1 && canonicalOk && jsonLdOk;
  if (passed) passedCount++;

  results.push({
    id,
    slug,
    title,
    url: expectedUrl,
    passed,
    mdExists,
    htmlExists,
    inSitemap,
    hasH1,
    canonicalOk,
    jsonLdOk,
  });
}

console.log(`Verified ${passedCount} / 60 articles 100% passed!`);
if (passedCount !== 60) {
  console.error("FAILURES DETECTED:");
  for (const r of results.filter((r) => !r.passed)) {
    console.error(`- ${r.id} (${r.slug}): md=${r.mdExists}, html=${r.htmlExists}, sitemap=${r.inSitemap}, h1=${r.hasH1}, canonical=${r.canonicalOk}`);
  }
  process.exit(1);
} else {
  console.log("All 60 articles verified successfully!");
}
