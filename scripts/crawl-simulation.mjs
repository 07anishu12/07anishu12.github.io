#!/usr/bin/env node

/**
 * ============================================================================
 * Forceful Terminal Crawler & Edge-Cache Warmer
 * ============================================================================
 * Concurrently hits every page in https://aniket.app/sitemap.xml over HTTPS,
 * verifies HTTP 200 responses, warms the Vercel Edge Cache, and reports
 * latency percentiles.
 * ============================================================================
 */

import https from "node:https";
import fs from "node:fs";
import path from "node:path";

const ORIGIN = (process.env.ORIGIN || "https://aniket.app").replace(/\/$/, "");
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "6", 10);
const SITEMAP_URL = `${ORIGIN}/sitemap.xml`;

async function getUrls() {
  return new Promise((resolve) => {
    https.get(SITEMAP_URL, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        const matches = [...data.matchAll(/<loc>([\s\S]*?)<\/loc>/g)];
        let urls = matches.map((m) => m[1].trim());
        if (!urls.length) {
          try {
            const local = fs.readFileSync(path.resolve("sitemap.xml"), "utf8");
            urls = [...local.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].trim());
          } catch {
            urls = [`${ORIGIN}/`];
          }
        }
        resolve(urls);
      });
    }).on("error", () => {
      try {
        const local = fs.readFileSync(path.resolve("sitemap.xml"), "utf8");
        resolve([...local.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].trim()));
      } catch {
        resolve([`${ORIGIN}/`]);
      }
    });
  });
}

function fetchPage(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent": "AniketApp-ForcefulCrawler/1.0 (+https://aniket.app)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    }, (res) => {
      let bytes = 0;
      res.on("data", (chunk) => bytes += chunk.length);
      res.on("end", () => {
        resolve({
          url,
          status: res.statusCode,
          ttfb: Date.now() - start,
          bytes,
          cache: res.headers["x-vercel-cache"] || "MISS"
        });
      });
    });
    req.on("error", (e) => {
      resolve({ url, status: 500, ttfb: Date.now() - start, bytes: 0, cache: "ERR", err: e.message });
    });
  });
}

async function main() {
  console.log("=".repeat(75));
  console.log(" FORCEFUL WEB CRAWLER & EDGE CACHE WARMER");
  console.log("=".repeat(75));
  console.log(` Target Origin : ${ORIGIN}`);
  console.log(` Concurrency   : ${CONCURRENCY} parallel workers`);
  console.log("=".repeat(75));

  const urls = await getUrls();
  console.log(`\nDiscovered ${urls.length} live pages in sitemap.`);
  console.log("Starting forceful crawl across the internet...\n");

  const queue = [...urls];
  let completed = 0;
  let successes = 0;
  const latencies = [];

  async function worker(id) {
    while (queue.length > 0) {
      const url = queue.shift();
      if (!url) break;
      const res = await fetchPage(url);
      completed++;
      if (res.status === 200) successes++;
      latencies.push(res.ttfb);

      const pathStr = url.replace(ORIGIN, "") || "/";
      const statusStr = res.status === 200 ? "\x1b[32m200 OK\x1b[0m" : `\x1b[31m${res.status}\x1b[0m`;
      const cacheStr = res.cache === "HIT" ? "\x1b[36mHIT\x1b[0m" : res.cache;
      
      console.log(`[${String(completed).padStart(3, " ")}/${urls.length}] ${statusStr} (${String(res.ttfb).padStart(3, " ")}ms) [${cacheStr}] ${pathStr.slice(0, 55)}`);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  latencies.sort((a, b) => a - b);
  const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
  const p50 = latencies[Math.floor(latencies.length * 0.5)];
  const p95 = latencies[Math.floor(latencies.length * 0.95)];

  console.log("\n" + "=".repeat(75));
  console.log(" CRAWL COMPLETED");
  console.log("=".repeat(75));
  console.log(` Total Pages Crawled : ${completed} / ${urls.length}`);
  console.log(` Success Rate        : ${Math.round((successes / completed) * 100)}% (${successes} OK)`);
  console.log(` Latency Profile     : Avg: ${avg}ms | p50: ${p50}ms | p95: ${p95}ms`);
  console.log("=".repeat(75));
}

main();
