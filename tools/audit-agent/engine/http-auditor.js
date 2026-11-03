/**
 * High-Performance Technical SEO HTTP Auditor
 * Analyzes headers, redirect chains, canonical tags, meta robots, schema.org,
 * link architecture, and DOM elements for every discovered URL.
 */

import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';
import * as cheerio from 'cheerio';
import crypto from 'node:crypto';

export class HttpAuditor {
  constructor(options = {}) {
    this.origin = (options.origin || 'https://aniket.app').replace(/\/$/, '');
    this.concurrency = options.concurrency || 10;
    this.delayMs = options.delayMs || 50;
    this.timeoutMs = options.timeoutMs || 15000;
    this.userAgent = options.userAgent || 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
  }

  /**
   * Fetches URL with full redirect chain tracking and timing
   */
  async fetchWithRedirects(targetUrl, maxRedirects = 6) {
    const chain = [];
    let currentUrl = targetUrl;
    let redirectCount = 0;

    const overallStart = Date.now();

    while (redirectCount <= maxRedirects) {
      const stepStart = Date.now();
      const u = new URL(currentUrl);
      const client = u.protocol === 'https:' ? https : http;

      const response = await new Promise((resolve) => {
        let ttfb = 0;
        const req = client.get(currentUrl, {
          timeout: this.timeoutMs,
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        }, (res) => {
          ttfb = Date.now() - stepStart;
          let rawData = '';
          res.on('data', chunk => rawData += chunk);
          res.on('end', () => {
            resolve({
              url: currentUrl,
              statusCode: res.statusCode,
              headers: res.headers,
              ttfb,
              duration: Date.now() - stepStart,
              body: rawData,
              error: null
            });
          });
        });

        req.on('error', (err) => {
          resolve({
            url: currentUrl,
            statusCode: 500,
            headers: {},
            ttfb: Date.now() - stepStart,
            duration: Date.now() - stepStart,
            body: '',
            error: err.message
          });
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({
            url: currentUrl,
            statusCode: 504,
            headers: {},
            ttfb: Date.now() - stepStart,
            duration: Date.now() - stepStart,
            body: '',
            error: 'Request timed out'
          });
        });
      });

      chain.push({
        url: response.url,
        statusCode: response.statusCode,
        headers: response.headers,
        ttfb: response.ttfb,
        duration: response.duration,
        error: response.error
      });

      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        redirectCount++;
        const nextUrl = new URL(response.headers.location, currentUrl).toString();
        currentUrl = nextUrl;
      } else {
        return {
          initialUrl: targetUrl,
          finalUrl: currentUrl,
          finalStatus: response.statusCode,
          finalHeaders: response.headers,
          redirectCount,
          redirectChain: chain,
          totalDuration: Date.now() - overallStart,
          ttfb: chain[0].ttfb,
          body: response.body,
          error: response.error
        };
      }
    }

    return {
      initialUrl: targetUrl,
      finalUrl: currentUrl,
      finalStatus: 310, // Too many redirects
      finalHeaders: {},
      redirectCount,
      redirectChain: chain,
      totalDuration: Date.now() - overallStart,
      ttfb: chain[0].ttfb,
      body: '',
      error: 'Exceeded maximum redirects (Redirect Loop)'
    };
  }

  /**
   * Deep technical audit of the parsed HTML DOM
   */
  auditHtml(html, requestedUrl, finalUrl, finalStatus, finalHeaders, ttfb, totalLatency, redirectChain) {
    const $ = cheerio.load(html || '');

    // Canonical tag
    const canonicalLink = $('link[rel="canonical"]').attr('href');
    const canonicalUrl = canonicalLink ? canonicalLink.trim() : null;

    // Robots meta tag
    const metaRobotsTag = $('meta[name="robots"]').attr('content');
    const metaGooglebotTag = $('meta[name="googlebot"]').attr('content');
    const xRobotsTag = finalHeaders['x-robots-tag'] || null;

    const robotsDirectives = [metaRobotsTag, metaGooglebotTag, xRobotsTag]
      .filter(Boolean)
      .join(', ')
      .toLowerCase();

    const isNoindex = robotsDirectives.includes('noindex');
    const isNofollow = robotsDirectives.includes('nofollow');

    // Title tag
    const titleTag = $('title').text().trim();
    const titleLength = titleTag.length;

    // Meta description
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const descLength = metaDesc.trim().length;

    // H1 tags
    const h1Elements = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const h1Count = h1Elements.length;
    const primaryH1 = h1Elements[0] || null;

    // HTML Language
    const htmlLang = $('html').attr('lang') || null;

    // Structured Data (JSON-LD)
    const jsonLdBlocks = [];
    const schemaTypes = [];
    const schemaErrors = [];

    $('script[type="application/ld+json"]').each((_, el) => {
      const rawText = $(el).html();
      if (!rawText) return;
      try {
        const parsed = JSON.parse(rawText.trim());
        jsonLdBlocks.push(parsed);

        const extractTypes = (item) => {
          if (!item || typeof item !== 'object') return;
          if (item['@type']) {
            if (Array.isArray(item['@type'])) schemaTypes.push(...item['@type']);
            else schemaTypes.push(item['@type']);
          }
          if (Array.isArray(item['@graph'])) {
            item['@graph'].forEach(extractTypes);
          }
        };
        extractTypes(parsed);
      } catch (err) {
        schemaErrors.push(`JSON-LD parse error: ${err.message}`);
      }
    });

    // Extract Textual Content
    // Strip scripts, styles, nav, footer for body text
    const $clean = cheerio.load(html || '');
    $clean('script, style, noscript, svg, nav, footer, header, .nav, .site-header, .site-footer').remove();
    const bodyText = $clean('body').text().replace(/\s+/g, ' ').trim();
    const words = bodyText.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));
    const contentHash = crypto.createHash('md5').update(bodyText).digest('hex');

    // Internal and External Link Extraction
    const internalLinks = new Set();
    const externalLinks = new Set();
    const inPageAnchors = [];

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;
      const anchorText = $(el).text().replace(/\s+/g, ' ').trim();

      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }

      if (href.startsWith('#')) {
        inPageAnchors.push({ href, text: anchorText });
        return;
      }

      try {
        const resolved = new URL(href, finalUrl);
        if (resolved.origin === this.origin) {
          // Normalize internal URL
          const norm = `${resolved.origin}${resolved.pathname}${resolved.search}`;
          internalLinks.add(norm);
        } else {
          externalLinks.add({
            url: resolved.toString(),
            rel: $(el).attr('rel') || null,
            text: anchorText
          });
        }
      } catch {
        // invalid URL
      }
    });

    // OpenGraph & Twitter
    const ogTitle = $('meta[property="og:title"]').attr('content') || null;
    const ogDescription = $('meta[property="og:description"]').attr('content') || null;
    const ogImage = $('meta[property="og:image"]').attr('content') || null;

    // Canonicalization evaluation
    let canonicalStatus = 'missing';
    if (canonicalUrl) {
      if (canonicalUrl === finalUrl || canonicalUrl === requestedUrl) {
        canonicalStatus = 'self-referential';
      } else {
        canonicalStatus = 'points-to-other';
      }
    }

    return {
      requestedUrl,
      finalUrl,
      finalStatus,
      isRedirect: redirectChain.length > 1,
      redirectHops: redirectChain.length - 1,
      redirectChain: redirectChain.map(h => ({ url: h.url, status: h.statusCode })),
      ttfb,
      totalLatency,
      canonicalUrl,
      canonicalStatus,
      metaRobots: metaRobotsTag || null,
      metaGooglebot: metaGooglebotTag || null,
      xRobotsTag,
      isNoindex,
      isNofollow,
      title: titleTag || null,
      titleLength,
      metaDescription: metaDesc || null,
      descLength,
      h1Count,
      primaryH1,
      h1Elements,
      htmlLang,
      wordCount,
      readingTimeMinutes,
      contentHash,
      schemaCount: jsonLdBlocks.length,
      schemaTypes: Array.from(new Set(schemaTypes)),
      schemaErrors,
      internalLinks: Array.from(internalLinks),
      internalLinksCount: internalLinks.size,
      externalLinks: Array.from(externalLinks),
      externalLinksCount: externalLinks.size,
      ogTitle,
      ogDescription,
      ogImage,
      hasTable: (html || '').includes('<table'),
      hasCode: (html || '').includes('<pre') || (html || '').includes('<code'),
      bodySnippet: bodyText.slice(0, 300)
    };
  }

  /**
   * Audits a single URL end-to-end
   */
  async auditUrl(url) {
    const res = await this.fetchWithRedirects(url);
    const audited = this.auditHtml(
      res.body,
      url,
      res.finalUrl,
      res.finalStatus,
      res.finalHeaders,
      res.ttfb,
      res.totalDuration,
      res.redirectChain
    );
    if (res.error) {
      audited.fetchError = res.error;
    }
    return audited;
  }

  /**
   * Concurrently audits an array of URLs with worker pool
   */
  async auditUrls(urls, onProgress = null) {
    const queue = [...urls];
    const results = new Map();
    let completed = 0;
    const total = urls.length;

    const worker = async () => {
      while (queue.length > 0) {
        const url = queue.shift();
        if (!url) break;
        try {
          const res = await this.auditUrl(url);
          results.set(url, res);
        } catch (err) {
          results.set(url, {
            requestedUrl: url,
            finalUrl: url,
            finalStatus: 500,
            fetchError: err.message,
            redirectHops: 0,
            redirectChain: [],
            isNoindex: false,
            isNofollow: false,
            canonicalUrl: null,
            canonicalStatus: 'error',
            internalLinks: [],
            externalLinks: []
          });
        }
        completed++;
        if (onProgress) onProgress(completed, total, url);
        if (this.delayMs > 0) {
          await new Promise(r => setTimeout(r, this.delayMs));
        }
      }
    };

    const workers = Array.from({ length: this.concurrency }, () => worker());
    await Promise.all(workers);

    return results;
  }
}
