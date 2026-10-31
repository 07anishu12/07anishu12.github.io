import { chromium } from "playwright";

const ROUTES = [
  { name: "Homepage", url: "https://aniket.app/" },
  { name: "Projects Index", url: "https://aniket.app/projects/" },
  { name: "Work", url: "https://aniket.app/work/" },
  { name: "Project Case Study", url: "https://aniket.app/projects/finance-tools/" },
  { name: "Blog Index", url: "https://aniket.app/blog/" },
  { name: "Blog Category (Auto)", url: "https://aniket.app/blog/auto/" },
  {
    name: "Blog Article",
    url: "https://aniket.app/blog/auto/best-cars-under-5-lakh-in-india-what-your-budget-actually-buys-on-the-road/",
  },
  { name: "Research", url: "https://aniket.app/research/" },
  { name: "About", url: "https://aniket.app/about/" },
  { name: "Contact", url: "https://aniket.app/contact/" },
];

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function measurePage(browser, url, isMobile, isCold) {
  const contextOptions = isMobile
    ? {
        viewport: { width: 390, height: 844 },
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      }
    : {
        viewport: { width: 1440, height: 900 },
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        deviceScaleFactor: 2,
        isMobile: false,
        hasTouch: false,
      };

  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  // Emulate network conditions for Mobile
  const client = await context.newCDPSession(page);
  if (isMobile) {
    // Fast 4G: 10 Mbps down, 3 Mbps up, 150ms RTT
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: (10 * 1024 * 1024) / 8,
      uploadThroughput: (3 * 1024 * 1024) / 8,
      latency: 150,
    });
    // 4x CPU throttling for mobile
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  }

  // Network tracking
  let requestCount = 0;
  let totalBytes = 0;
  const resources = [];

  page.on("response", async (response) => {
    requestCount++;
    try {
      const headers = response.headers();
      const cl = headers["content-length"];
      let size = cl ? parseInt(cl, 10) : 0;
      if (!size) {
        const body = await response.body().catch(() => null);
        size = body ? body.length : 0;
      }
      totalBytes += size;
      resources.push({
        url: response.url(),
        status: response.status(),
        size,
        contentType: headers["content-type"] || "",
      });
    } catch {}
  });

  // Inject performance observer before navigation
  await page.addInitScript(() => {
    window.__perfData = {
      lcp: 0,
      cls: 0,
      longTasks: [],
      fcp: 0,
      heroImage: null,
    };

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        window.__perfData.lcp = entry.startTime;
        if (entry.element) {
          window.__perfData.heroImage = {
            tagName: entry.element.tagName,
            currentSrc: entry.element.currentSrc || entry.element.src || null,
            width: entry.element.clientWidth,
            height: entry.element.clientHeight,
          };
        }
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__perfData.cls += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        window.__perfData.longTasks.push({
          duration: entry.duration,
          startTime: entry.startTime,
        });
      }
    }).observe({ type: "longtask", buffered: true });

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          window.__perfData.fcp = entry.startTime;
        }
      }
    }).observe({ type: "paint", buffered: true });
  });

  // Navigation
  if (!isCold) {
    // Warm up cache with initial load
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    requestCount = 0;
    totalBytes = 0;
    resources.length = 0;
  }

  const t0 = Date.now();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1000); // Allow LCP and post-load shifts to settle

  const perfTiming = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const data = window.__perfData || {};
    let tbt = 0;
    if (data.longTasks) {
      for (const task of data.longTasks) {
        if (task.duration > 50) {
          tbt += task.duration - 50;
        }
      }
    }
    return {
      ttfb: nav ? nav.responseStart - nav.requestStart : 0,
      fcp: data.fcp || (nav ? nav.responseEnd : 0),
      lcp: data.lcp || 0,
      cls: data.cls || 0,
      tbt: Math.round(tbt),
      domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : 0,
      loadEvent: nav ? nav.loadEventEnd - nav.startTime : 0,
      heroImage: data.heroImage,
    };
  });

  await client.detach();
  await context.close();

  return {
    ...perfTiming,
    requestCount,
    totalBytes,
    resources,
  };
}

async function runBenchmark() {
  console.log("===============================================================================");
  console.log(" ANIKET.APP REAL BROWSER PRODUCTION BENCHMARK (PLAYWRIGHT CHROMIUM)");
  console.log("===============================================================================");

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const route of ROUTES) {
    console.log(`\nAuditing: ${route.name} (${route.url})`);

    // 1. Mobile Cold (3 runs)
    const mobileColdRuns = [];
    for (let i = 0; i < 3; i++) {
      process.stdout.write(`  [Run ${i + 1}/3] Mobile Cold... `);
      const res = await measurePage(browser, route.url, true, true);
      mobileColdRuns.push(res);
      console.log(`LCP: ${(res.lcp / 1000).toFixed(2)}s | FCP: ${(res.fcp / 1000).toFixed(2)}s | TBT: ${res.tbt}ms | Size: ${(res.totalBytes / 1024).toFixed(1)} KB`);
    }

    // 2. Desktop Cold (3 runs)
    const desktopColdRuns = [];
    for (let i = 0; i < 3; i++) {
      process.stdout.write(`  [Run ${i + 1}/3] Desktop Cold... `);
      const res = await measurePage(browser, route.url, false, true);
      desktopColdRuns.push(res);
      console.log(`LCP: ${(res.lcp / 1000).toFixed(2)}s | FCP: ${(res.fcp / 1000).toFixed(2)}s | TBT: ${res.tbt}ms | Size: ${(res.totalBytes / 1024).toFixed(1)} KB`);
    }

    // 3. Desktop Warm (1 run)
    process.stdout.write(`  Desktop Warm... `);
    const desktopWarm = await measurePage(browser, route.url, false, false);
    console.log(`LCP: ${(desktopWarm.lcp / 1000).toFixed(2)}s | TTFB: ${desktopWarm.ttfb.toFixed(0)}ms`);

    results.push({
      route: route.name,
      url: route.url,
      mobileCold: {
        ttfb: median(mobileColdRuns.map((r) => r.ttfb)),
        fcp: median(mobileColdRuns.map((r) => r.fcp)),
        lcp: median(mobileColdRuns.map((r) => r.lcp)),
        cls: median(mobileColdRuns.map((r) => r.cls)),
        tbt: median(mobileColdRuns.map((r) => r.tbt)),
        domContentLoaded: median(mobileColdRuns.map((r) => r.domContentLoaded)),
        loadEvent: median(mobileColdRuns.map((r) => r.loadEvent)),
        totalBytes: median(mobileColdRuns.map((r) => r.totalBytes)),
        requestCount: median(mobileColdRuns.map((r) => r.requestCount)),
        heroImage: mobileColdRuns[0].heroImage,
      },
      desktopCold: {
        ttfb: median(desktopColdRuns.map((r) => r.ttfb)),
        fcp: median(desktopColdRuns.map((r) => r.fcp)),
        lcp: median(desktopColdRuns.map((r) => r.lcp)),
        cls: median(desktopColdRuns.map((r) => r.cls)),
        tbt: median(desktopColdRuns.map((r) => r.tbt)),
        totalBytes: median(desktopColdRuns.map((r) => r.totalBytes)),
        requestCount: median(desktopColdRuns.map((r) => r.requestCount)),
      },
      desktopWarm: {
        ttfb: desktopWarm.ttfb,
        fcp: desktopWarm.fcp,
        lcp: desktopWarm.lcp,
        cls: desktopWarm.cls,
      },
    });
  }

  await browser.close();

  console.log("\n\n" + "=".repeat(110));
  console.log(" FINAL PRODUCTION ROUTE PERFORMANCE MATRIX (MEDIAN RESULTS)");
  console.log("=".repeat(110));
  console.log(
    `${"Route".padEnd(22)} | ${"Mob LCP".padEnd(9)} | ${"Mob FCP".padEnd(9)} | ${"Mob TBT".padEnd(8)} | ${"CLS".padEnd(7)} | ${"Mob Size".padEnd(10)} | ${"Desk LCP".padEnd(9)} | Desk TTFB`
  );
  console.log("-".repeat(110));

  for (const r of results) {
    console.log(
      `${r.route.padEnd(22)} | ${(r.mobileCold.lcp / 1000).toFixed(2).padEnd(6)}s   | ${(r.mobileCold.fcp / 1000).toFixed(2).padEnd(6)}s   | ${String(r.mobileCold.tbt).padEnd(5)}ms | ${r.mobileCold.cls.toFixed(3).padEnd(7)} | ${(r.mobileCold.totalBytes / 1024).toFixed(1).padEnd(7)} KB | ${(r.desktopCold.lcp / 1000).toFixed(2).padEnd(6)}s   | ${r.desktopCold.ttfb.toFixed(0)}ms`
    );
  }

  import("fs").then(fs => {
    fs.writeFileSync("scripts/benchmark-results.json", JSON.stringify(results, null, 2));
    console.log("\nSaved benchmark results to scripts/benchmark-results.json");
  });

  return results;
}

runBenchmark().catch(console.error);
