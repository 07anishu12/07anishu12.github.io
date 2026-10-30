#!/usr/bin/env node

/**
 * ============================================================================
 * Aniket.app Forceful Web Crawler & Live Visual Spectator Studio
 * ============================================================================
 * Systematically crawls all 589+ live pages on https://aniket.app with
 * multi-worker concurrency, edge-cache warming, SEO metadata verification,
 * and a real-time Visual Spectator Studio where viewers can watch every page
 * being crawled in an interactive browser mockup in real time.
 *
 * Usage:
 *   node tools/crawler/server.js
 *   Options via environment:
 *     PORT=4000 (default)
 *     HOST=0.0.0.0 (default)
 *     ORIGIN=https://aniket.app
 * ============================================================================
 */

const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const ORIGIN = (process.env.ORIGIN || 'https://aniket.app').replace(/\/$/, '');

// ---------------------------------------------------------------------------
// Global Crawler State
// ---------------------------------------------------------------------------
let crawlerState = {
  running: false,
  paused: false,
  concurrency: 4,
  delayMs: 250,
  filter: 'all',
  autoTour: true,
  urls: [],
  queue: [],
  visited: new Map(), // url -> { status, ttfb, title, schema, time }
  currentArticle: null,
  stats: {
    total: 0,
    crawled: 0,
    success: 0,
    failed: 0,
    avgLatency: 0,
    totalBytes: 0,
    startTime: null,
    endTime: null
  }
};

const sseClients = new Set();

function broadcastEvent(type, data) {
  const payload = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// ---------------------------------------------------------------------------
// Sitemap Fetcher
// ---------------------------------------------------------------------------
async function fetchSitemapUrls(sitemapUrl = `${ORIGIN}/sitemap.xml`) {
  return new Promise((resolve) => {
    https.get(sitemapUrl, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/<loc>([\s\S]*?)<\/loc>/g)];
        let urls = matches.map(m => m[1].trim());
        if (!urls.length) {
          // Fallback to local sitemap
          try {
            const localXml = fs.readFileSync(path.resolve(__dirname, '../../sitemap.xml'), 'utf8');
            urls = [...localXml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(m => m[1].trim());
          } catch {
            urls = [`${ORIGIN}/`];
          }
        }
        resolve(urls);
      });
    }).on('error', () => {
      // Fallback to local
      try {
        const localXml = fs.readFileSync(path.resolve(__dirname, '../../sitemap.xml'), 'utf8');
        const urls = [...localXml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(m => m[1].trim());
        resolve(urls);
      } catch {
        resolve([`${ORIGIN}/`]);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Page Fetcher & Parser
// ---------------------------------------------------------------------------
function crawlUrl(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'AniketApp-SpectatorBot/2.0 (+https://aniket.app/crawler.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'identity'
      }
    }, (res) => {
      const ttfb = Date.now() - start;
      let body = '';
      let bytes = 0;
      
      res.on('data', chunk => {
        body += chunk;
        bytes += chunk.length;
      });
      
      res.on('end', () => {
        const titleMatch = body.match(/<title>([\s\S]*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace(/—\s*Aniket Thakur/i, '').trim() : url;
        
        const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : title;
        
        const descMatch = body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
        const description = descMatch ? descMatch[1].trim() : '';
        
        const hasFaqSchema = body.includes('"FAQPage"');
        const hasBlogPosting = body.includes('"BlogPosting"');
        const hasTable = body.includes('<table');
        
        resolve({
          url,
          status: res.statusCode,
          ttfb,
          bytes,
          title: h1 || title,
          description,
          hasFaqSchema,
          hasBlogPosting,
          hasTable,
          timestamp: new Date().toISOString()
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 500,
        ttfb: Date.now() - start,
        bytes: 0,
        title: url,
        description: err.message,
        hasFaqSchema: false,
        hasBlogPosting: false,
        hasTable: false,
        timestamp: new Date().toISOString()
      });
    });
  });
}

// ---------------------------------------------------------------------------
// Concurrent Crawler Engine
// ---------------------------------------------------------------------------
let activeWorkers = 0;

async function runWorker(workerId) {
  while (crawlerState.running && !crawlerState.paused && crawlerState.queue.length > 0) {
    const url = crawlerState.queue.shift();
    if (!url) break;

    broadcastEvent('active', { workerId, url });
    
    try {
      const result = await crawlUrl(url);
      crawlerState.visited.set(url, result);
      
      // Update statistics
      crawlerState.stats.crawled++;
      if (result.status === 200) crawlerState.stats.success++;
      else crawlerState.stats.failed++;
      
      crawlerState.stats.totalBytes += result.bytes;
      const totalCrawled = crawlerState.stats.crawled;
      crawlerState.stats.avgLatency = Math.round(
        (crawlerState.stats.avgLatency * (totalCrawled - 1) + result.ttfb) / totalCrawled
      );
      
      crawlerState.currentArticle = result;
      
      // Broadcast update to all live spectators
      broadcastEvent('page', {
        result,
        stats: crawlerState.stats,
        remaining: crawlerState.queue.length
      });
      
    } catch (err) {
      console.error(`Worker ${workerId} error on ${url}:`, err.message);
    }
    
    if (crawlerState.delayMs > 0) {
      await new Promise(r => setTimeout(r, crawlerState.delayMs));
    }
  }
}

async function startCrawler() {
  if (crawlerState.running) return;
  
  crawlerState.running = true;
  crawlerState.paused = false;
  crawlerState.visited.clear();
  crawlerState.stats = {
    total: 0,
    crawled: 0,
    success: 0,
    failed: 0,
    avgLatency: 0,
    totalBytes: 0,
    startTime: Date.now(),
    endTime: null
  };
  
  // Fetch fresh sitemap
  let allUrls = await fetchSitemapUrls();
  
  // Apply category filtering if requested
  if (crawlerState.filter !== 'all') {
    allUrls = allUrls.filter(u => u.includes(`/blog/${crawlerState.filter}/`));
  }
  
  crawlerState.urls = allUrls;
  crawlerState.queue = [...allUrls];
  crawlerState.stats.total = allUrls.length;
  
  broadcastEvent('start', {
    total: allUrls.length,
    concurrency: crawlerState.concurrency,
    filter: crawlerState.filter
  });
  
  // Launch concurrent workers
  activeWorkers = crawlerState.concurrency;
  const workers = [];
  for (let i = 0; i < crawlerState.concurrency; i++) {
    workers.push(runWorker(i + 1));
  }
  
  await Promise.all(workers);
  crawlerState.running = false;
  crawlerState.stats.endTime = Date.now();
  
  broadcastEvent('complete', {
    stats: crawlerState.stats
  });
}

// ---------------------------------------------------------------------------
// HTML Spectator Dashboard
// ---------------------------------------------------------------------------
function getDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aniket.app Forceful Web Crawler &amp; Live Spectator Studio</title>
  <style>
    :root {
      --bg: #090d16;
      --card: #111726;
      --card-hover: #182238;
      --border: #232d42;
      --text: #e2e8f0;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --accent: #f97316;
      --emerald: #10b981;
      --red: #ef4444;
      --font-mono: "JetBrains Mono", "Fira Code", monospace;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    header {
      background: #060910;
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      z-index: 50;
    }
    .brand { display: flex; align-items: center; gap: 12px; }
    .pulse-dot {
      width: 10px; height: 10px; border-radius: 50%; background: var(--emerald);
      box-shadow: 0 0 12px var(--emerald);
      animation: pulse 1.8s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
      100% { opacity: 1; transform: scale(1); }
    }
    .brand h1 { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.3px; color: #fff; }
    .brand span { font-size: 0.8rem; color: var(--muted); }
    
    .metrics-bar {
      display: flex; gap: 20px; align-items: center;
    }
    .metric-pill {
      background: var(--card); border: 1px solid var(--border);
      padding: 6px 14px; border-radius: 6px; font-size: 0.8rem;
      display: flex; gap: 8px; align-items: center;
    }
    .metric-pill strong { color: #fff; font-family: var(--font-mono); }
    
    .actions { display: flex; gap: 8px; align-items: center; }
    button {
      background: #1e293b; color: #fff; border: 1px solid var(--border);
      padding: 7px 14px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;
      cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;
    }
    button:hover { background: #334155; border-color: var(--primary); }
    button.btn-primary { background: #0284c7; border-color: #38bdf8; }
    button.btn-primary:hover { background: #0369a1; }
    button.btn-danger { background: #991b1b; border-color: #ef4444; }
    
    /* Layout */
    .main-grid {
      display: grid;
      grid-template-columns: 460px 1fr;
      flex: 1;
      height: calc(100vh - 65px);
      overflow: hidden;
    }
    
    /* Left Stream Panel */
    .stream-panel {
      background: #0c111c;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .panel-header {
      padding: 12px 16px; border-bottom: 1px solid var(--border);
      font-size: 0.8rem; font-weight: 700; color: var(--muted); text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; justify-content: space-between; align-items: center;
    }
    .progress-bar-container {
      background: #1e293b; height: 6px; width: 100%; overflow: hidden;
    }
    .progress-bar-fill {
      background: linear-gradient(90deg, #0284c7, #38bdf8);
      height: 100%; width: 0%; transition: width 0.3s;
    }
    
    .terminal-feed {
      flex: 1; overflow-y: auto; padding: 12px; font-family: var(--font-mono);
      font-size: 0.78rem; display: flex; flex-direction: column-reverse; gap: 8px;
    }
    .log-entry {
      background: var(--card); border: 1px solid var(--border);
      padding: 10px 12px; border-radius: 6px; display: flex; flex-direction: column;
      gap: 4px; transition: transform 0.15s, border-color 0.15s; cursor: pointer;
    }
    .log-entry:hover {
      border-color: var(--primary); transform: translateX(3px);
    }
    .log-top { display: flex; justify-content: space-between; align-items: center; }
    .badge-200 { background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }
    .badge-err { background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }
    .ttfb-pill { color: var(--muted); font-size: 0.75rem; }
    .log-title { font-weight: 600; color: #fff; font-size: 0.85rem; line-height: 1.3; font-family: var(--font-sans); }
    .log-url { color: #38bdf8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.72rem; }
    
    /* Right Spectator Viewport */
    .viewport-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #060910;
    }
    .mockup-header {
      background: #0f172a; border-bottom: 1px solid var(--border);
      padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; gap: 16px;
    }
    .mockup-address {
      background: #020617; border: 1px solid var(--border); padding: 6px 16px;
      border-radius: 20px; flex: 1; max-width: 650px; display: flex; align-items: center;
      gap: 10px; font-family: var(--font-mono); font-size: 0.8rem; color: #cbd5e1;
    }
    .mockup-actions { display: flex; gap: 8px; align-items: center; }
    .toggle-pill {
      font-size: 0.8rem; display: flex; align-items: center; gap: 6px; cursor: pointer;
      user-select: none; color: var(--muted);
    }
    .toggle-pill input { accent-color: var(--primary); }
    
    .frame-container {
      flex: 1; position: relative; background: #fff;
    }
    iframe {
      width: 100%; height: 100%; border: none;
    }
    .loading-overlay {
      position: absolute; inset: 0; background: rgba(9, 13, 22, 0.85);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 16px; color: #fff; z-index: 10;
    }
    .spinner {
      width: 40px; height: 40px; border: 4px solid var(--border);
      border-top-color: var(--primary); border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <div class="pulse-dot"></div>
      <div>
        <h1>Aniket.app Forceful Crawler &amp; Spectator Studio</h1>
        <span>Live Web Crawling &amp; Verification Environment · ${ORIGIN}</span>
      </div>
    </div>

    <div class="metrics-bar">
      <div class="metric-pill">
        <span>Crawled:</span>
        <strong id="statCrawled">0 / 0</strong>
      </div>
      <div class="metric-pill">
        <span>Avg Latency:</span>
        <strong id="statLatency">0 ms</strong>
      </div>
      <div class="metric-pill">
        <span>200 OK:</span>
        <strong id="statSuccess">100%</strong>
      </div>
    </div>

    <div class="actions">
      <select id="selCategory" style="background:#1e293b; color:#fff; border:1px solid var(--border); padding:7px 12px; border-radius:6px; font-size:0.85rem;">
        <option value="all">Category: All Pages (589)</option>
        <option value="auto">Auto &amp; Cars (400+)</option>
        <option value="technology">Technology &amp; AI (60)</option>
        <option value="product">Product &amp; Systems</option>
        <option value="finance">Finance &amp; Markets</option>
      </select>
      <button class="btn-primary" id="btnStart">⚡ Force Crawl All</button>
      <button id="btnPause">⏸ Pause</button>
    </div>
  </header>

  <div class="main-grid">
    <!-- Left Feed -->
    <div class="stream-panel">
      <div class="panel-header">
        <span>Live Crawl Telemetry Stream</span>
        <span id="workerCount">Idle</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" id="progressFill"></div>
      </div>
      <div class="terminal-feed" id="terminalFeed">
        <div style="color: var(--muted); text-align: center; margin: 40px 0;">
          Click "⚡ Force Crawl All" above to crawl all 589+ pages across the internet.<br>
          Spectators can watch each page being verified live in the viewport.
        </div>
      </div>
    </div>

    <!-- Right Spectator Viewport -->
    <div class="viewport-panel">
      <div class="mockup-header">
        <div class="mockup-address">
          <span style="color: var(--emerald);">🔒</span>
          <span id="viewportUrl">${ORIGIN}/</span>
        </div>
        <div class="mockup-actions">
          <label class="toggle-pill">
            <input type="checkbox" id="chkAutoTour" checked>
            <span>Auto-Tour Viewport</span>
          </label>
          <a id="btnExternalLink" href="${ORIGIN}/" target="_blank" style="color: var(--primary); text-decoration: none; font-size: 0.85rem; font-weight: 600;">
            Open Live ↗
          </a>
        </div>
      </div>
      <div class="frame-container">
        <iframe id="previewFrame" src="/view?url=${encodeURIComponent(ORIGIN + '/')}"></iframe>
      </div>
    </div>
  </div>

  <script>
    let autoTour = true;
    let sse = null;
    let totalUrls = 0;

    const statCrawled = document.getElementById('statCrawled');
    const statLatency = document.getElementById('statLatency');
    const statSuccess = document.getElementById('statSuccess');
    const progressFill = document.getElementById('progressFill');
    const terminalFeed = document.getElementById('terminalFeed');
    const workerCount = document.getElementById('workerCount');
    const previewFrame = document.getElementById('previewFrame');
    const viewportUrl = document.getElementById('viewportUrl');
    const btnExternalLink = document.getElementById('btnExternalLink');
    const chkAutoTour = document.getElementById('chkAutoTour');
    const btnStart = document.getElementById('btnStart');
    const btnPause = document.getElementById('btnPause');
    const selCategory = document.getElementById('selCategory');

    chkAutoTour.addEventListener('change', (e) => {
      autoTour = e.target.checked;
    });

    function showPageInViewport(url, title) {
      viewportUrl.innerText = url;
      btnExternalLink.href = url;
      previewFrame.src = '/view?url=' + encodeURIComponent(url);
    }

    function addLogEntry(data) {
      const { result, stats, remaining } = data;
      
      statCrawled.innerText = \`\${stats.crawled} / \${stats.total}\`;
      statLatency.innerText = \`\${result.ttfb} ms (avg \${stats.avgLatency}ms)\`;
      
      const successPct = stats.crawled ? Math.round((stats.success / stats.crawled) * 100) : 100;
      statSuccess.innerText = \`\${successPct}%\`;
      
      const pct = stats.total ? Math.round((stats.crawled / stats.total) * 100) : 0;
      progressFill.style.width = pct + '%';

      const entry = document.createElement('div');
      entry.className = 'log-entry';
      const badgeClass = result.status === 200 ? 'badge-200' : 'badge-err';
      
      entry.innerHTML = \`
        <div class="log-top">
          <span class="\${badgeClass}">HTTP \${result.status}</span>
          <span class="ttfb-pill">\${result.ttfb}ms · \${(result.bytes / 1024).toFixed(1)} KB</span>
        </div>
        <div class="log-title">\${result.title}</div>
        <div class="log-url">\${result.url}</div>
      \`;
      
      entry.addEventListener('click', () => {
        showPageInViewport(result.url, result.title);
      });
      
      terminalFeed.prepend(entry);
      
      // Keep feed trim
      if (terminalFeed.children.length > 150) {
        terminalFeed.removeChild(terminalFeed.lastChild);
      }
      
      // Auto-tour to watch pages live
      if (autoTour) {
        showPageInViewport(result.url, result.title);
      }
    }

    function connectSSE() {
      if (sse) sse.close();
      sse = new EventSource('/api/stream');
      
      sse.addEventListener('start', (e) => {
        const d = JSON.parse(e.data);
        totalUrls = d.total;
        workerCount.innerText = \`CRAWLING (4 Bots) · \${d.total} URLs\`;
        terminalFeed.innerHTML = '';
      });

      sse.addEventListener('page', (e) => {
        const d = JSON.parse(e.data);
        addLogEntry(d);
      });

      sse.addEventListener('complete', (e) => {
        workerCount.innerText = 'CRAWL FINISHED (100% COMPLETE)';
      });
    }

    btnStart.addEventListener('click', async () => {
      connectSSE();
      const cat = selCategory.value;
      await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter: cat, concurrency: 4 })
      });
    });

    btnPause.addEventListener('click', async () => {
      await fetch('/api/pause', { method: 'POST' });
      workerCount.innerText = 'PAUSED';
    });

    connectSSE();
  </script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// HTTP Server & Proxy Router
// ---------------------------------------------------------------------------
function createServer() {
  const server = http.createServer(async (req, res) => {
    const parsed = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
    const pathname = parsed.pathname;

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // 1. Dashboard View
    if (pathname === '/' || pathname === '/index.html' || pathname === '/crawler.html') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(getDashboardHtml());
      return;
    }

    // 2. SSE Telemetry Stream
    if (pathname === '/api/stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      res.write(': connected\n\n');
      sseClients.add(res);
      req.on('close', () => sseClients.delete(res));
      return;
    }

    // 3. API Start Crawler
    if (req.method === 'POST' && pathname === '/api/start') {
      let body = '';
      req.on('data', c => body += c);
      req.on('end', () => {
        try {
          const params = body ? JSON.parse(body) : {};
          crawlerState.filter = params.filter || 'all';
          crawlerState.concurrency = params.concurrency || 4;
          startCrawler();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Crawler simulation started' }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    // 4. API Pause
    if (req.method === 'POST' && pathname === '/api/pause') {
      crawlerState.paused = true;
      crawlerState.running = false;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, paused: true }));
      return;
    }

    // 5. Spectator Viewport Proxy (Stripping X-Frame-Options for Live Watching)
    if (pathname === '/view') {
      const targetUrl = parsed.searchParams.get('url');
      if (!targetUrl) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing url parameter');
        return;
      }

      https.get(targetUrl, {
        headers: { 'User-Agent': 'AniketApp-SpectatorViewer/1.0' }
      }, (proxyRes) => {
        // Strip X-Frame-Options and Frame-Ancestors CSP
        const headers = { ...proxyRes.headers };
        delete headers['x-frame-options'];
        delete headers['content-security-policy'];
        headers['access-control-allow-origin'] = '*';
        headers['content-type'] = 'text/html; charset=utf-8';

        res.writeHead(proxyRes.statusCode, headers);
        proxyRes.pipe(res);
      }).on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Proxy error: ${err.message}`);
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  });

  return server;
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log('='.repeat(75));
    console.log(` ANIKET.APP FORCEFUL CRAWLER & LIVE SPECTATOR STUDIO`);
    console.log('='.repeat(75));
    console.log(`  🚀 Live Studio Dashboard : http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
    console.log(`  🌐 Target Origin         : ${ORIGIN}`);
    console.log(`  📺 Spectator Viewport    : Real-time browser mockup with unblocked iframe stream`);
    console.log('='.repeat(75));
  });
}

module.exports = { createServer, startCrawler, crawlUrl, fetchSitemapUrls };
