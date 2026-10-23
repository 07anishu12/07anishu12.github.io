#!/usr/bin/env node

/**
 * Medium Migration Dashboard Server
 *
 * Provides a local management studio and REST API for migrating portfolio
 * articles to Medium, tracking import progress, managing publication links,
 * and resuming interrupted migrations.
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {
  ROOT,
  ORIGIN,
  KNOWN_PROFILE,
  MEDIUM_IMPORT_URL,
  DEFAULT_STATE_FILE,
  DEFAULT_QUEUE_DOC,
  discoverArticles,
  generateInventory,
  updateArticleState,
  getNextPendingArticle,
  validateMediumToken,
  loadSyncState,
  checkCanonicalUrlLive
} = require('../blog/medium-sync');

const PORT = parseInt(process.env.MIGRATION_PORT || process.env.PORT || '3333', 10);
const HOST = process.env.HOST || '127.0.0.1';

function getDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Medium Migration &amp; Auto-Sync Studio</title>
  <style>
    :root {
      --bg: #0d1117;
      --card-bg: #161b22;
      --border: #30363d;
      --text: #c9d1d9;
      --text-muted: #8b949e;
      --accent: #58a6ff;
      --accent-hover: #1f6feb;
      --green: #3fb950;
      --green-bg: rgba(63, 185, 80, 0.15);
      --amber: #d29922;
      --amber-bg: rgba(210, 153, 34, 0.15);
      --red: #f85149;
      --red-bg: rgba(248, 81, 73, 0.15);
      --blue-bg: rgba(88, 166, 255, 0.15);
      --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.5;
      padding-bottom: 60px;
    }
    header {
      background: #010409;
      border-bottom: 1px solid var(--border);
      padding: 16px 24px;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-content {
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .brand h1 { font-size: 1.25rem; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 8px; }
    .brand p { font-size: 0.85rem; color: var(--text-muted); }
    .actions-bar { display: flex; gap: 8px; flex-wrap: wrap; }
    button, .btn {
      background: #21262d;
      color: var(--text);
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      transition: background 0.15s, border-color 0.15s;
    }
    button:hover, .btn:hover { background: #30363d; border-color: #8b949e; }
    .btn-primary { background: #238636; color: #fff; border-color: rgba(240,246,252,0.1); }
    .btn-primary:hover { background: #2ea043; border-color: rgba(240,246,252,0.1); }
    .btn-accent { background: #1f6feb; color: #fff; border-color: rgba(240,246,252,0.1); }
    .btn-accent:hover { background: #388bfd; }
    .container { max-width: 1300px; margin: 24px auto; padding: 0 20px; }
    
    /* Stats grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px 16px;
    }
    .stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); font-weight: 600; }
    .stat-value { font-size: 1.6rem; font-weight: 700; color: #fff; margin-top: 4px; }
    
    /* Progress */
    .progress-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .progress-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem; }
    .progress-bar-bg { background: #21262d; border-radius: 6px; height: 10px; overflow: hidden; }
    .progress-bar-fill { background: var(--green); height: 100%; width: 0%; transition: width 0.3s ease; }

    /* Filters */
    .filter-panel {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .search-row { display: flex; gap: 12px; }
    .search-input {
      flex: 1;
      background: #0d1117;
      border: 1px solid var(--border);
      color: #fff;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.9rem;
    }
    .search-input:focus { outline: none; border-color: var(--accent); }
    .pill-group { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .pill-title { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-right: 4px; }
    .pill {
      background: #21262d;
      color: var(--text-muted);
      border: 1px solid var(--border);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      cursor: pointer;
      user-select: none;
    }
    .pill:hover { background: #30363d; color: var(--text); }
    .pill.active { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* Article Cards */
    .article-list { display: flex; flex-direction: column; gap: 12px; }
    .article-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      transition: border-color 0.15s;
    }
    .article-card:hover { border-color: #58a6ff; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 8px; }
    .card-title { font-size: 1.05rem; font-weight: 600; color: #fff; text-decoration: none; }
    .card-title:hover { color: var(--accent); }
    .badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
    .badge {
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 500;
    }
    .badge-category { background: #21262d; color: var(--text); border: 1px solid var(--border); text-transform: uppercase; }
    .badge-date { background: #21262d; color: var(--text-muted); }
    .badge-status { font-weight: 600; }
    .badge-queued { background: var(--blue-bg); color: var(--accent); border: 1px solid rgba(88,166,255,0.4); }
    .badge-published { background: var(--green-bg); color: var(--green); border: 1px solid rgba(63,185,80,0.4); }
    .badge-modified { background: var(--amber-bg); color: var(--amber); border: 1px solid rgba(210,153,34,0.4); }
    .badge-failed { background: var(--red-bg); color: var(--red); border: 1px solid rgba(248,81,73,0.4); }
    .badge-skipped { background: #21262d; color: var(--text-muted); }

    .card-body-info {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 12px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .canonical-link { color: var(--accent); text-decoration: none; word-break: break-all; }
    .canonical-link:hover { text-decoration: underline; }

    /* Actions and inline form */
    .card-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .inline-edit-box {
      background: #0d1117;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 10px 12px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    .inline-input {
      background: #161b22;
      border: 1px solid var(--border);
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 0.85rem;
    }
    .inline-input:focus { outline: none; border-color: var(--accent); }
    .input-medium-url { flex: 2; min-width: 240px; }
    .input-notes { flex: 2; min-width: 200px; }
    .select-status { background: #161b22; color: #fff; border: 1px solid var(--border); padding: 6px 10px; border-radius: 4px; font-size: 0.85rem; }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #238636;
      color: #fff;
      padding: 10px 18px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      transform: translateY(10px);
      z-index: 1000;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <div class="brand">
        <h1><span>Medium Migration Studio</span></h1>
        <p>Aniket Thakur Portfolio (<a href="https://07anishu12.github.io/" target="_blank" style="color:var(--accent);">07anishu12.github.io</a>) → Medium (<a href="${KNOWN_PROFILE}" target="_blank" style="color:var(--accent);">@kumaraniketn</a>)</p>
      </div>
      <div class="actions-bar">
        <button id="btnResume" class="btn-primary">▶ Resume Migration</button>
        <button id="btnRescan">🔄 Refresh Inventory</button>
        <a href="${MEDIUM_IMPORT_URL}" target="_blank" class="btn btn-accent">↗ Medium Importer</a>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Stats Row -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Articles</div>
        <div class="stat-value" id="statTotal">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Published on Medium</div>
        <div class="stat-value" style="color:var(--green);" id="statPublished">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Queued / Pending</div>
        <div class="stat-value" style="color:var(--accent);" id="statQueued">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Modified (Review Needed)</div>
        <div class="stat-value" style="color:var(--amber);" id="statModified">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Failed / Errors</div>
        <div class="stat-value" style="color:var(--red);" id="statFailed">-</div>
      </div>
    </div>

    <!-- Progress -->
    <div class="progress-box">
      <div class="progress-header">
        <span>Migration Progress</span>
        <span id="progressText">0% Completed</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="progressBar"></div>
      </div>
    </div>

    <!-- Filter Panel -->
    <div class="filter-panel">
      <div class="search-row">
        <input type="text" id="searchInput" class="search-input" placeholder="Search by article title, slug, or tags (e.g. 'cng', 'mcp', 'valuation')...">
      </div>
      <div class="pill-group">
        <span class="pill-title">Category:</span>
        <div class="pill active" data-filter-type="cat" data-val="all">All</div>
        <div class="pill" data-filter-type="cat" data-val="finance">Finance</div>
        <div class="pill" data-filter-type="cat" data-val="technology">Technology</div>
        <div class="pill" data-filter-type="cat" data-val="auto">Auto</div>
      </div>
      <div class="pill-group">
        <span class="pill-title">Status:</span>
        <div class="pill active" data-filter-type="status" data-val="all">All</div>
        <div class="pill" data-filter-type="status" data-val="queued">Queued</div>
        <div class="pill" data-filter-type="status" data-val="published">Published</div>
        <div class="pill" data-filter-type="status" data-val="modified_requires_review">Modified</div>
        <div class="pill" data-filter-type="status" data-val="failed">Failed</div>
      </div>
    </div>

    <!-- Article List -->
    <div class="article-list" id="articleList">
      <p style="color:var(--text-muted); text-align:center; padding: 40px;">Loading article inventory...</p>
    </div>
  </main>

  <div id="toast" class="toast">Action completed</div>

  <script>
    let articles = [];
    let selectedCat = 'all';
    let selectedStatus = 'all';
    let searchQuery = '';

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }

    async function loadData() {
      try {
        const res = await fetch('/api/inventory');
        const data = await res.json();
        articles = data.items || [];
        updateStats(data);
        render();
      } catch (err) {
        showToast('Error loading inventory: ' + err.message);
      }
    }

    function updateStats(data) {
      const total = data.total || articles.length;
      const pub = data.byStatus?.published || articles.filter(a => a.status === 'published').length;
      const q = data.byStatus?.queued || articles.filter(a => a.status === 'queued').length;
      const mod = data.byStatus?.modified_requires_review || articles.filter(a => a.status === 'modified_requires_review').length;
      const f = data.byStatus?.failed || articles.filter(a => a.status === 'failed').length;

      document.getElementById('statTotal').textContent = total;
      document.getElementById('statPublished').textContent = pub;
      document.getElementById('statQueued').textContent = q;
      document.getElementById('statModified').textContent = mod;
      document.getElementById('statFailed').textContent = f;

      const pct = total > 0 ? Math.round((pub / total) * 100) : 0;
      document.getElementById('progressText').textContent = \`\${pub} of \${total} published (\${pct}%)\`;
      document.getElementById('progressBar').style.width = \`\${pct}%\`;
    }

    function render() {
      const list = document.getElementById('articleList');
      const filtered = articles.filter(a => {
        if (selectedCat !== 'all' && a.category !== selectedCat) return false;
        if (selectedStatus !== 'all' && a.status !== selectedStatus) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (a.title || '').toLowerCase().includes(q);
          const matchSlug = (a.slug || '').toLowerCase().includes(q);
          const matchTags = (a.tags || []).some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchSlug && !matchTags) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding: 40px;">No articles match the selected filters.</p>';
        return;
      }

      list.innerHTML = filtered.map(a => {
        let badgeClass = 'badge-queued';
        let statusLabel = 'Queued';
        if (a.status === 'published') { badgeClass = 'badge-published'; statusLabel = 'Published'; }
        else if (a.status === 'modified_requires_review') { badgeClass = 'badge-modified'; statusLabel = 'Modified (Review)'; }
        else if (a.status === 'failed') { badgeClass = 'badge-failed'; statusLabel = 'Failed'; }
        else if (a.status === 'skipped') { badgeClass = 'badge-skipped'; statusLabel = 'Skipped'; }

        return \`
          <div class="article-card" id="card-\${a.id.replace('/', '-')}">
            <div class="card-top">
              <a href="\${a.canonicalUrl}" target="_blank" class="card-title">\${escapeHtml(a.title)}</a>
              <span class="badge badge-status \${badgeClass}">\${statusLabel}</span>
            </div>
            <div class="badges">
              <span class="badge badge-category">\${a.category}</span>
              <span class="badge badge-date">\${a.datePublished}</span>
              \${(a.tags || []).slice(0, 3).map(t => \`<span class="badge" style="background:#21262d;color:#8b949e;">#\${escapeHtml(t)}</span>\`).join('')}
            </div>
            <div class="card-body-info">
              <span>Canonical: <a href="\${a.canonicalUrl}" target="_blank" class="canonical-link">\${a.canonicalUrl}</a></span>
              <span>Source: <code>\${a.sourcePath}</code></span>
            </div>
            <div class="card-actions">
              <a href="\${a.canonicalUrl}" target="_blank" class="btn">👁 View Live</a>
              <button onclick="copyToClipboard('\${a.canonicalUrl}')">📋 Copy Canonical URL</button>
              <button class="btn-primary" onclick="openMediumImport('\${a.canonicalUrl}')">↗ Import on Medium</button>
            </div>
            <div class="inline-edit-box">
              <input type="text" class="inline-input input-medium-url" placeholder="Medium Story URL (e.g. https://medium.com/@kumaraniketn/...)" value="\${escapeHtml(a.mediumUrl || '')}" id="url-\${a.id.replace('/', '-')}">
              <select class="select-status" id="status-\${a.id.replace('/', '-')}">
                <option value="queued" \${a.status === 'queued' ? 'selected' : ''}>Queued</option>
                <option value="published" \${a.status === 'published' ? 'selected' : ''}>Published</option>
                <option value="modified_requires_review" \${a.status === 'modified_requires_review' ? 'selected' : ''}>Modified (Review)</option>
                <option value="skipped" \${a.status === 'skipped' ? 'selected' : ''}>Skipped</option>
                <option value="failed" \${a.status === 'failed' ? 'selected' : ''}>Failed</option>
              </select>
              <input type="text" class="inline-input input-notes" placeholder="Notes..." value="\${escapeHtml(a.notes || '')}" id="notes-\${a.id.replace('/', '-')}">
              <button class="btn-accent" onclick="saveArticle('\${a.id}')">💾 Save</button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function escapeHtml(str) {
      return String(str || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Canonical URL copied to clipboard!');
      });
    }

    function openMediumImport(canonicalUrl) {
      navigator.clipboard.writeText(canonicalUrl).then(() => {
        showToast('Copied canonical URL! Opening Medium Importer...');
        window.open('${MEDIUM_IMPORT_URL}', '_blank');
      });
    }

    async function saveArticle(id) {
      const domId = id.replace('/', '-');
      const mediumUrl = document.getElementById('url-' + domId).value.trim();
      const status = document.getElementById('status-' + domId).value;
      const notes = document.getElementById('notes-' + domId).value.trim();

      try {
        const res = await fetch('/api/article/' + encodeURIComponent(id), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mediumUrl, status, notes })
        });
        if (res.ok) {
          showToast('Article record updated!');
          loadData();
        } else {
          const err = await res.json();
          showToast('Failed: ' + (err.error || 'Server error'));
        }
      } catch (err) {
        showToast('Save failed: ' + err.message);
      }
    }

    async function resumeMigration() {
      try {
        const res = await fetch('/api/next-pending');
        const data = await res.json();
        if (!data || !data.item) {
          showToast('All articles have been processed!');
          return;
        }
        const item = data.item;
        selectedStatus = 'all';
        searchQuery = item.slug;
        document.getElementById('searchInput').value = item.slug;
        render();

        const card = document.getElementById('card-' + item.id.replace('/', '-'));
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.borderColor = 'var(--green)';
        }
        openMediumImport(item.canonicalUrl);
      } catch (err) {
        showToast('Error resuming: ' + err.message);
      }
    }

    // Event listeners
    document.getElementById('searchInput').addEventListener('input', e => {
      searchQuery = e.target.value.trim();
      render();
    });

    document.querySelectorAll('.pill[data-filter-type="cat"]').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.pill[data-filter-type="cat"]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedCat = pill.dataset.val;
        render();
      });
    });

    document.querySelectorAll('.pill[data-filter-type="status"]').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.pill[data-filter-type="status"]').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedStatus = pill.dataset.val;
        render();
      });
    });

    document.getElementById('btnResume').addEventListener('click', resumeMigration);
    document.getElementById('btnRescan').addEventListener('click', () => {
      showToast('Refreshing inventory...');
      loadData();
    });

    loadData();
  </script>
</body>
</html>`;
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function createServer(root = ROOT) {
  const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
    const pathname = parsedUrl.pathname;

    // CORS & options
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      // 1. Dashboard UI
      if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(getDashboardHtml());
        return;
      }

      // 2. GET /api/inventory
      if (req.method === 'GET' && pathname === '/api/inventory') {
        const inventory = generateInventory(root);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(inventory));
        return;
      }

      // 3. GET /api/stats
      if (req.method === 'GET' && pathname === '/api/stats') {
        const state = loadSyncState(root);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(state.stats));
        return;
      }

      // 4. GET /api/next-pending
      if (req.method === 'GET' && pathname === '/api/next-pending') {
        const item = getNextPendingArticle(root);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ item }));
        return;
      }

      // 5. POST /api/article/:id
      if (req.method === 'POST' && pathname.startsWith('/api/article/')) {
        const articleId = decodeURIComponent(pathname.replace('/api/article/', ''));
        const body = await parseJsonBody(req);
        const updated = updateArticleState(root, articleId, body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, item: updated }));
        return;
      }

      // 6. POST /api/verify-token
      if (req.method === 'POST' && pathname === '/api/verify-token') {
        const token = process.env.MEDIUM_INTEGRATION_TOKEN;
        const result = await validateMediumToken(token);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        return;
      }

      // 404
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint not found' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });

  return server;
}

if (require.main === module) {
  const server = createServer(ROOT);
  server.listen(PORT, HOST, () => {
    console.log(`\n======================================================`);
    console.log(`Medium Migration Dashboard running at:`);
    console.log(`http://${HOST}:${PORT}`);
    console.log(`======================================================\n`);
  });
}

module.exports = { createServer, PORT, HOST };
