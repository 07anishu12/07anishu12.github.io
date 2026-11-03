/**
 * Autonomous Playwright Browser Rendering Agent
 * Renders pages with Googlebot Smartphone emulation and desktop viewport,
 * detecting JavaScript execution errors, hydration issues, network failures,
 * and mobile viewport layout overflows.
 */

import { chromium } from 'playwright';

export const GOOGLEBOT_SMARTPHONE_UA =
  'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

export const GOOGLEBOT_DESKTOP_UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

export class BrowserAgent {
  constructor(options = {}) {
    this.timeoutMs = options.timeoutMs || 20000;
    this.browser = null;
  }

  async init() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
    }
    return this;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Renders a page using Googlebot Smartphone emulation
   */
  async renderGooglebotMobile(url) {
    if (!this.browser) await this.init();

    const context = await this.browser.newContext({
      userAgent: GOOGLEBOT_SMARTPHONE_UA,
      viewport: { width: 393, height: 851 },
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true
    });

    const page = await context.newPage();

    const consoleErrors = [];
    const jsExceptions = [];
    const failedRequests = [];
    let loadTiming = {};

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      jsExceptions.push(err.message || String(err));
    });

    page.on('requestfailed', req => {
      const failure = req.failure();
      failedRequests.push({
        url: req.url(),
        method: req.method(),
        resourceType: req.resourceType(),
        errorText: failure ? failure.errorText : 'Unknown failure'
      });
    });

    const startTime = Date.now();
    let status = null;
    let finalUrl = url;

    try {
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: this.timeoutMs
      }).catch(async () => {
        // Fallback to load state if networkidle times out
        return page.goto(url, { waitUntil: 'load', timeout: 8000 }).catch(() => null);
      });

      if (response) {
        status = response.status();
        finalUrl = response.url();
      }

      const totalRenderTime = Date.now() - startTime;

      // Extract DOM properties after JavaScript rendering
      const renderedData = await page.evaluate(() => {
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
        const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || null;
        const googlebot = document.querySelector('meta[name="googlebot"]')?.getAttribute('content') || null;
        const title = document.title || null;
        const h1 = document.querySelector('h1')?.innerText?.trim() || null;
        const h1Count = document.querySelectorAll('h1').length;
        const hasHorizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;

        // Structured data in rendered DOM
        const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(el => {
          try {
            return JSON.parse(el.textContent || '');
          } catch {
            return null;
          }
        }).filter(Boolean);

        return {
          canonical,
          robots,
          googlebot,
          title,
          h1,
          h1Count,
          hasHorizontalOverflow,
          scrollWidth,
          innerWidth,
          renderedSchemasCount: schemas.length
        };
      }).catch(err => ({ evalError: err.message }));

      await context.close();

      return {
        url,
        finalUrl,
        status,
        userAgent: 'Googlebot Smartphone',
        totalRenderTime,
        consoleErrors,
        jsExceptions,
        failedRequests,
        mobileViewport: {
          width: 393,
          height: 851,
          hasHorizontalOverflow: renderedData.hasHorizontalOverflow || false,
          scrollWidth: renderedData.scrollWidth,
          innerWidth: renderedData.innerWidth
        },
        renderedDom: {
          title: renderedData.title,
          h1: renderedData.h1,
          h1Count: renderedData.h1Count,
          canonical: renderedData.canonical,
          robots: renderedData.robots,
          googlebot: renderedData.googlebot,
          schemasCount: renderedData.renderedSchemasCount
        },
        renderSuccess: true
      };
    } catch (err) {
      await context.close().catch(() => {});
      return {
        url,
        finalUrl,
        status: status || 500,
        userAgent: 'Googlebot Smartphone',
        totalRenderTime: Date.now() - startTime,
        consoleErrors,
        jsExceptions: [...jsExceptions, err.message],
        failedRequests,
        renderSuccess: false,
        error: err.message
      };
    }
  }

  /**
   * Diagnostic comparison: Renders page in Googlebot Smartphone vs Desktop Chrome
   */
  async compareSmartphoneVsDesktop(url) {
    const mobileResult = await this.renderGooglebotMobile(url);

    // Desktop render
    if (!this.browser) await this.init();
    const context = await this.browser.newContext({
      userAgent: GOOGLEBOT_DESKTOP_UA,
      viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();

    let desktopData = {};
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });
      desktopData = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.innerText?.trim() || null,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null
      }));
    } catch (err) {
      desktopData = { error: err.message };
    }
    await context.close().catch(() => {});

    const differences = [];
    if (mobileResult.renderedDom?.title !== desktopData.title) {
      differences.push(`Title mismatch: Mobile='${mobileResult.renderedDom?.title}' vs Desktop='${desktopData.title}'`);
    }
    if (mobileResult.renderedDom?.canonical !== desktopData.canonical) {
      differences.push(`Canonical mismatch: Mobile='${mobileResult.renderedDom?.canonical}' vs Desktop='${desktopData.canonical}'`);
    }

    return {
      mobile: mobileResult,
      desktop: desktopData,
      isParity: differences.length === 0,
      differences
    };
  }
}
