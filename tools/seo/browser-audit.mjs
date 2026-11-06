import fs from "node:fs/promises";
import path from "node:path";
import playwright from "/Users/anny/node_modules/playwright/index.js";

const { chromium } = playwright;
const origin = process.argv[2] || "https://aniket.app";
const outputFile = process.argv[3] || "reports/seo-recovery/full-site-browser-audit.json";

// Read URL inventory
const crawlData = JSON.parse(await fs.readFile("reports/seo-recovery/production-crawl.json", "utf8"));
const allPaths = [...new Set(
  crawlData.results
    .map(r => r.path)
    .filter(p => !p.includes("sitemap") && !p.endsWith(".xml") && !p.endsWith(".json"))
)];

console.log(`Starting headless Chrome browser audit for ${allPaths.length} pages on ${origin}...`);

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
});

const CONCURRENCY = 6;
const results = [];
let completed = 0;
const startTime = Date.now();

// Chunk queue
const queue = [...allPaths];

async function worker(workerId) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 AuditBot/1.0"
  });

  const page = await context.newPage();

  while (queue.length > 0) {
    const pagePath = queue.shift();
    if (!pagePath) break;

    const url = origin + pagePath;
    const errors = [];
    const consoleErrors = [];
    const failedResources = [];

    const onPageError = (err) => errors.push(err.message);
    const onConsole = (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    };
    const onRequestFailed = (req) => {
      failedResources.push({ url: req.url(), failure: req.failure()?.errorText || "failed" });
    };

    page.on("pageerror", onPageError);
    page.on("console", onConsole);
    page.on("requestfailed", onRequestFailed);

    let status = 0;
    let finalUrl = "";
    let timing = 0;

    try {
      const t0 = Date.now();
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35000 });
      timing = Date.now() - t0;
      status = response ? response.status() : 0;
      finalUrl = page.url();

      // Simulate real user interaction: scroll smoothly down to bottom to trigger lazy loading
      await page.evaluate(async () => {
        const distance = window.innerHeight;
        const totalHeight = document.body.scrollHeight;
        let scrolled = 0;
        while (scrolled < totalHeight) {
          window.scrollBy(0, distance);
          scrolled += distance;
          await new Promise((r) => setTimeout(r, 60));
        }
        await new Promise((r) => setTimeout(r, 100));
        window.scrollTo({ top: 0, behavior: "instant" });
      });

      // Extract comprehensive page metadata and layout health metrics
      const data = await page.evaluate(() => {
        const title = document.title || "";
        const description = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
        const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content") || "";

        const h1Elements = Array.from(document.querySelectorAll("h1")).map((h) => h.innerText.trim());
        const h2Count = document.querySelectorAll("h2").length;
        const h3Count = document.querySelectorAll("h3").length;

        const images = Array.from(document.querySelectorAll("img"));
        const brokenImages = images.filter((img) => img.naturalWidth === 0 && !img.src.startsWith("data:")).map((img) => img.src);
        const imagesMissingAlt = images.filter((img) => !img.hasAttribute("alt") || img.getAttribute("alt").trim() === "").map((img) => img.src);

        const internalLinks = Array.from(document.querySelectorAll("a[href]"))
          .map((a) => a.getAttribute("href"))
          .filter((href) => href && (href.startsWith("/") || href.includes("aniket.app")));

        const mainContent = document.querySelector("main") || document.body;
        const text = mainContent ? mainContent.innerText : "";
        const wordCount = text.split(/\s+/).filter(Boolean).length;

        const hasHeader = !!document.querySelector("header.site-header");
        const hasFooter = !!document.querySelector("footer");
        const hasBreadcrumbs = !!document.querySelector("nav[aria-label*='readcrumb' i], .article-breadcrumb, .breadcrumbs");
        const hasInquiryTrigger = !!document.querySelector("[data-inquiry-nav-trigger], [data-inquiry-trigger], button.nav-cta");

        return {
          title,
          description,
          canonical,
          robots,
          h1Elements,
          h2Count,
          h3Count,
          imagesCount: images.length,
          brokenImagesCount: brokenImages.length,
          brokenImagesList: brokenImages.slice(0, 5),
          missingAltCount: imagesMissingAlt.length,
          internalLinksCount: internalLinks.length,
          wordCount,
          hasHeader,
          hasFooter,
          hasBreadcrumbs,
          hasInquiryTrigger
        };
      });

      results.push({
        path: pagePath,
        url,
        finalUrl,
        status,
        timing,
        ...data,
        jsErrors: errors,
        consoleErrors: consoleErrors.slice(0, 5),
        failedResources: failedResources.slice(0, 5),
        ok: status < 400 && errors.length === 0 && data.brokenImagesCount === 0
      });

    } catch (err) {
      results.push({
        path: pagePath,
        url,
        status: status || 500,
        error: err.message,
        ok: false
      });
    } finally {
      page.off("pageerror", onPageError);
      page.off("console", onConsole);
      page.off("requestfailed", onRequestFailed);

      completed++;
      if (completed % 50 === 0 || completed === allPaths.length) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = (completed / elapsed).toFixed(1);
        console.log(`[${completed}/${allPaths.length}] audited (${rate} pages/s, ${elapsed}s elapsed)`);
      }
    }
  }

  await context.close();
}

// Run workers
const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i));
await Promise.all(workers);
await browser.close();

// Save audit results
await fs.writeFile(outputFile, JSON.stringify({
  origin,
  auditedPages: results.length,
  timestamp: new Date().toISOString(),
  durationMs: Date.now() - startTime,
  results
}, null, 2));

console.log(`Audit complete: ${results.length} pages audited and saved to ${outputFile}`);
