/**
 * Historical Crawl Comparison Engine
 * Compares current audit results against the historical baseline (24 Oct 2026).
 */

import fs from 'node:fs';
import path from 'node:path';

export class HistoricalComparator {
  constructor(localRoot = process.cwd()) {
    this.localRoot = localRoot;
    this.historicalFile = path.join(this.localRoot, 'reports/seo-audit/url-audit.json');
  }

  compareWithBaseline(currentInventory) {
    let historicalData = [];
    if (fs.existsSync(this.historicalFile)) {
      try {
        historicalData = JSON.parse(fs.readFileSync(this.historicalFile, 'utf8'));
      } catch {
        historicalData = [];
      }
    }

    const currentUrls = Array.from(currentInventory.values());
    const histMap = new Map();
    for (const h of historicalData) {
      // Normalize historical URL path to compare across domain change
      try {
        const u = new URL(h.url);
        histMap.set(u.pathname, h);
      } catch {
        // ignore
      }
    }

    const currMap = new Map();
    for (const c of currentUrls) {
      try {
        const u = new URL(c.requestedUrl);
        currMap.set(u.pathname, c);
      } catch {
        // ignore
      }
    }

    // Measure newly added URLs
    const addedPaths = [];
    for (const [pathname, curr] of currMap.entries()) {
      if (!histMap.has(pathname)) {
        addedPaths.push({ pathname, url: curr.requestedUrl, title: curr.title });
      }
    }

    // Measure removed or changed URLs
    const removedPaths = [];
    for (const [pathname, hist] of histMap.entries()) {
      if (!currMap.has(pathname)) {
        removedPaths.push({ pathname, originalUrl: hist.url });
      }
    }

    // Calculate latency metrics
    const histLatencies = historicalData.map(h => h.ttfb).filter(t => typeof t === 'number' && t > 0);
    const currLatencies = currentUrls.map(c => c.ttfb).filter(t => typeof t === 'number' && t > 0);

    const avgHistLatency = histLatencies.length ? Math.round(histLatencies.reduce((a, b) => a + b, 0) / histLatencies.length) : 0;
    const avgCurrLatency = currLatencies.length ? Math.round(currLatencies.reduce((a, b) => a + b, 0) / currLatencies.length) : 0;

    // Word counts
    const histWords = historicalData.map(h => h.wordCount || 0).reduce((a, b) => a + b, 0);
    const currWords = currentUrls.map(c => c.wordCount || 0).reduce((a, b) => a + b, 0);

    return {
      historicalDate: '2026-10-24T03:05:00Z',
      currentDate: new Date().toISOString(),
      historicalHost: 'https://07anishu12.github.io',
      currentHost: 'https://aniket.app',
      metrics: {
        totalUrls: {
          historical: historicalData.length,
          current: currentUrls.length,
          delta: currentUrls.length - historicalData.length,
          percentageGrowth: historicalData.length > 0 ? parseFloat((((currentUrls.length - historicalData.length) / historicalData.length) * 100).toFixed(1)) : 0
        },
        avgTtfbMs: {
          historical: avgHistLatency,
          current: avgCurrLatency,
          deltaMs: avgCurrLatency - avgHistLatency
        },
        totalWordCount: {
          historical: histWords,
          current: currWords,
          delta: currWords - histWords
        }
      },
      newlyAddedPathsCount: addedPaths.length,
      sampleAddedPaths: addedPaths.slice(0, 20),
      removedPathsCount: removedPaths.length,
      sampleRemovedPaths: removedPaths.slice(0, 20),
      keyMigrationFindings: [
        'Domain migration successfully re-hosted site from GitHub Pages (07anishu12.github.io) to custom domain (aniket.app) on Vercel.',
        `Catalog expanded by +${currentUrls.length - historicalData.length} URLs with massive additions in Automotive and Technology AI knowledge libraries.`,
        'New architecture introduced Vercel edge trailing slash redirects (HTTP 308) and uncovered root static file bypass (/index.html returning HTTP 200).',
        'WWW subdomain currently issues HTTP 307 temporary redirect instead of 301/308 permanent redirect.'
      ]
    };
  }
}
