/**
 * Sitemap Index & Child Sitemap Recursive Extractor
 * Traverses sitemapindex and nested xml files, parses URLs, and validates syntax.
 */

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';

export class SitemapExtractor {
  constructor(origin = 'https://aniket.app', localRoot = process.cwd()) {
    this.origin = origin.replace(/\/$/, '');
    this.localRoot = localRoot;
    this.sitemapIndexUrl = `${this.origin}/sitemap.xml`;
    this.discoveredSitemaps = new Map(); // url -> { count, urls, lastmods, errors }
    this.allUrls = new Map(); // url -> { sitemapSource, lastmod }
  }

  async fetchText(url) {
    return new Promise((resolve, reject) => {
      const u = new URL(url);
      const client = u.protocol === 'https:' ? https : http;

      const req = client.get(url, {
        timeout: 12000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'application/xml,text/xml,*/*;q=0.9'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).toString();
          return this.fetchText(redirectUrl).then(resolve).catch(reject);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
        }

        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      });

      req.on('error', (err) => {
        // Fallback to local copy if live fails
        try {
          const parsed = new URL(url);
          const localPath = path.join(this.localRoot, path.basename(parsed.pathname));
          if (fs.existsSync(localPath)) {
            const data = fs.readFileSync(localPath, 'utf8');
            return resolve(data);
          }
        } catch {
          // ignore
        }
        reject(err);
      });
    });
  }

  parseXmlUrls(xmlContent, sitemapUrl) {
    const isIndex = xmlContent.includes('<sitemapindex');
    const childSitemaps = [];
    const entries = [];
    const errors = [];

    if (isIndex) {
      const sitemapBlocks = xmlContent.match(/<sitemap>[\s\S]*?<\/sitemap>/g) || [];
      for (const block of sitemapBlocks) {
        const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/);
        const lastmodMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/);
        if (locMatch) {
          childSitemaps.push({
            loc: locMatch[1].trim(),
            lastmod: lastmodMatch ? lastmodMatch[1].trim() : null
          });
        }
      }
    } else {
      const urlBlocks = xmlContent.match(/<url>[\s\S]*?<\/url>/g) || [];
      for (const block of urlBlocks) {
        const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/);
        const lastmodMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/);
        if (locMatch) {
          const loc = locMatch[1].trim();
          const lastmod = lastmodMatch ? lastmodMatch[1].trim() : null;
          entries.push({ loc, lastmod });
        } else {
          errors.push('Malformed <url> block missing <loc>');
        }
      }
    }

    return { isIndex, childSitemaps, entries, errors };
  }

  async extractAll(rootSitemapUrl = this.sitemapIndexUrl) {
    const queue = [rootSitemapUrl];
    const processed = new Set();

    while (queue.length > 0) {
      const currentUrl = queue.shift();
      if (processed.has(currentUrl)) continue;
      processed.add(currentUrl);

      try {
        const xml = await this.fetchText(currentUrl);
        const { isIndex, childSitemaps, entries, errors } = this.parseXmlUrls(xml, currentUrl);

        if (isIndex) {
          this.discoveredSitemaps.set(currentUrl, {
            type: 'index',
            childrenCount: childSitemaps.length,
            children: childSitemaps.map(c => c.loc),
            errors
          });
          for (const child of childSitemaps) {
            queue.push(child.loc);
          }
        } else {
          this.discoveredSitemaps.set(currentUrl, {
            type: 'urlset',
            urlsCount: entries.length,
            errors
          });
          for (const entry of entries) {
            this.allUrls.set(entry.loc, {
              sitemapSource: currentUrl,
              lastmod: entry.lastmod
            });
          }
        }
      } catch (err) {
        this.discoveredSitemaps.set(currentUrl, {
          type: 'error',
          error: err.message
        });
      }
    }

    return {
      totalSitemaps: this.discoveredSitemaps.size,
      totalUrls: this.allUrls.size,
      sitemaps: Object.fromEntries(this.discoveredSitemaps),
      urls: Array.from(this.allUrls.entries()).map(([url, meta]) => ({ url, ...meta }))
    };
  }
}
