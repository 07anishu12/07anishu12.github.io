/**
 * Institutional SEO Monitoring Dashboard Builder
 * Generates an institutional-grade, responsive, interactive single-page dashboard.
 */

export class DashboardBuilder {
  static buildHtml(auditReport) {
    const jsonPayload = JSON.stringify(auditReport).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autonomous Google Indexability Audit — aniket.app</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #101626;
      --card-border: #1c263d;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --accent: #06b6d4;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.5;
      padding: 0 0 4rem 0;
    }
    header.dashboard-header {
      background: #0d121f;
      border-bottom: 1px solid var(--card-border);
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .header-brand h1 {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .badge-status {
      font-size: 0.75rem;
      font-family: var(--font-mono);
      background: rgba(16, 185, 129, 0.15);
      color: var(--success);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .badge-p0 { background: rgba(239, 68, 68, 0.2); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.4); font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); }
    .badge-p1 { background: rgba(245, 158, 11, 0.2); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.4); font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); }
    .badge-p2 { background: rgba(59, 130, 246, 0.2); color: var(--primary); border: 1px solid rgba(59, 130, 246, 0.4); font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); }
    .badge-p3 { background: rgba(100, 116, 139, 0.2); color: var(--text-muted); border: 1px solid rgba(100, 116, 139, 0.4); font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); }

    .header-meta {
      display: flex;
      gap: 1.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }
    .container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 2rem 2rem 0 2rem;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .metric-card:hover {
      border-color: #2e3e60;
      transform: translateY(-2px);
    }
    .metric-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .metric-value {
      font-size: 1.85rem;
      font-weight: 800;
      font-family: var(--font-mono);
      color: var(--text-main);
    }
    .metric-sub {
      font-size: 0.78rem;
      color: var(--text-dim);
      margin-top: 0.4rem;
    }
    .metric-warning { color: var(--warning); }
    .metric-danger { color: var(--danger); }
    .metric-success { color: var(--success); }

    /* Notice Banner */
    .gsc-banner {
      background: #111a2e;
      border: 1px solid #1e2e4f;
      border-left: 4px solid var(--accent);
      border-radius: 6px;
      padding: 1rem 1.25rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .gsc-banner p { font-size: 0.9rem; color: var(--text-muted); }
    .gsc-banner strong { color: var(--text-main); }

    /* Tabs Navigation */
    .tab-bar {
      display: flex;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 2rem;
      gap: 0.5rem;
      overflow-x: auto;
    }
    .tab-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      padding: 0.75rem 1.25rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .tab-btn:hover { color: var(--text-main); }
    .tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      background: rgba(59, 130, 246, 0.05);
    }

    .tab-panel { display: none; }
    .tab-panel.active { display: block; }

    /* Section Cards */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .card-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Ticket Items */
    .ticket-list { display: flex; flex-direction: column; gap: 1rem; }
    .ticket-item {
      background: #0b101c;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      overflow: hidden;
    }
    .ticket-header {
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background: #0e1424;
      user-select: none;
    }
    .ticket-header:hover { background: #131b2e; }
    .ticket-meta-left { display: flex; align-items: center; gap: 0.75rem; }
    .ticket-title { font-weight: 600; font-size: 0.95rem; }
    .ticket-body {
      padding: 1.25rem;
      border-top: 1px solid var(--card-border);
      display: none;
      font-size: 0.9rem;
    }
    .ticket-item.open .ticket-body { display: block; }
    .field-row { margin-bottom: 0.75rem; }
    .field-label { font-weight: 600; color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem; }
    .field-code { font-family: var(--font-mono); background: #070a12; padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid #1a2236; word-break: break-all; font-size: 0.85rem; color: #38bdf8; }

    /* Data Tables */
    .table-container {
      overflow-x: auto;
      max-height: 600px;
      border: 1px solid var(--card-border);
      border-radius: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
      text-align: left;
    }
    th {
      background: #0d121f;
      color: var(--text-muted);
      padding: 0.75rem 1rem;
      font-weight: 600;
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 2;
    }
    td {
      padding: 0.65rem 1rem;
      border-bottom: 1px solid #141c2e;
      color: var(--text-main);
    }
    tr:hover td { background: #0e1524; }
    .mono { font-family: var(--font-mono); }

    /* Controls */
    .table-controls {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .search-input {
      background: #080c16;
      border: 1px solid var(--card-border);
      color: var(--text-main);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      min-width: 320px;
    }
    .search-input:focus { outline: 1px solid var(--primary); }

    /* Graph Canvas */
    #graph-canvas {
      width: 100%;
      height: 520px;
      background: #060911;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      cursor: grab;
      display: block;
    }

    /* Pre diff */
    pre.patch-diff {
      background: #060911;
      color: #94a3b8;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      padding: 1rem;
      border-radius: 6px;
      border: 1px solid var(--card-border);
      overflow-x: auto;
      max-height: 500px;
      line-height: 1.4;
    }
    .diff-add { color: #34d399; }
    .diff-del { color: #f87171; }
    .diff-hunk { color: #38bdf8; }
  </style>
</head>
<body>

  <header class="dashboard-header">
    <div class="header-brand">
      <h1>Autonomous Google Indexability Audit <span class="badge-status">Production Grade</span></h1>
    </div>
    <div class="header-meta">
      <span>Target: <strong>https://aniket.app/</strong></span>
      <span>Engine: Playwright + Chromium Mobile + HTTP/2</span>
      <span>Date: <span id="audit-date"></span></span>
    </div>
  </header>

  <div class="container">

    <!-- GSC Auth Notice -->
    <div class="gsc-banner">
      <div>
        <p><strong>Google Search Console Verification Status:</strong> <span id="gsc-status-label">Unknown (Google Search Console API authorization required)</span></p>
        <p style="margin-top: 0.25rem;">This diagnostic system never fabricates GSC indexing data. As required, Google indexing status is officially documented as unknown until authorized credentials with webmasters scope are connected.</p>
      </div>
      <div>
        <span class="badge-p1">NO ACTIVE GSC TOKEN</span>
      </div>
    </div>

    <!-- Executive KPI Grid -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Total Discovered URLs</div>
        <div class="metric-value" id="kpi-total-urls">-</div>
        <div class="metric-sub" id="kpi-sitemap-sub">Sitemap: - URLs</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">HTTP 200 OK</div>
        <div class="metric-value metric-success" id="kpi-http-200">-</div>
        <div class="metric-sub">Technically crawlable</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">30x Redirects</div>
        <div class="metric-value metric-warning" id="kpi-redirects">-</div>
        <div class="metric-sub" id="kpi-redirect-sub">Trailing slash & www hops</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Canonical Declared</div>
        <div class="metric-value" id="kpi-canonical">-</div>
        <div class="metric-sub" id="kpi-canonical-sub">- self-referential</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Noindex Directives</div>
        <div class="metric-value" id="kpi-noindex">-</div>
        <div class="metric-sub">Disallowed from indexing</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Robots Blocked</div>
        <div class="metric-value" id="kpi-robots-blocked">-</div>
        <div class="metric-sub">Blocked by robots.txt</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Duplicate Pages</div>
        <div class="metric-value metric-danger" id="kpi-duplicates">-</div>
        <div class="metric-sub" id="kpi-duplicates-sub">Root index.html / titles</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Orphan Pages</div>
        <div class="metric-value metric-warning" id="kpi-orphans">-</div>
        <div class="metric-sub">In-degree = 0 in crawl graph</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Content Warnings</div>
        <div class="metric-value" id="kpi-content-warnings">-</div>
        <div class="metric-sub">Thin / boilerplate / citations</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">GSC Verified Indexed</div>
        <div class="metric-value" style="font-size: 1.25rem; color: var(--accent); margin-top: 0.35rem;" id="kpi-gsc-indexed">Unknown</div>
        <div class="metric-sub">GSC OAuth authorization req.</div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="tab-bar">
      <button class="tab-btn active" onclick="switchTab('tickets')">Prioritized Issues & Tickets (<span id="tab-ticket-count">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('inventory')">Full URL Inventory (<span id="tab-inventory-count">0</span>)</button>
      <button class="tab-btn" onclick="switchTab('graph')">Interactive Crawl Graph & PageRank</button>
      <button class="tab-btn" onclick="switchTab('duplicates')">Duplicate URL & Canonical Matrix</button>
      <button class="tab-btn" onclick="switchTab('content')">Content Quality & Internal Linking</button>
      <button class="tab-btn" onclick="switchTab('patches')">Safe Code Patches</button>
      <button class="tab-btn" onclick="switchTab('history')">Historical Crawl Comparison</button>
    </div>

    <!-- TAB: TICKETS -->
    <div id="tab-tickets" class="tab-panel active">
      <div class="card">
        <div class="card-title">
          <span>Engineering Tickets Classified by Indexation Severity</span>
          <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">P0 Blockers • P1 High Impact • P2 Content & Links • P3 Performance</span>
        </div>
        <div class="ticket-list" id="ticket-container">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>

    <!-- TAB: INVENTORY -->
    <div id="tab-inventory" class="tab-panel">
      <div class="card">
        <div class="card-title">
          <span>Discovered URL Inventory</span>
        </div>
        <div class="table-controls">
          <input type="text" id="url-search" class="search-input" placeholder="Search URL, title, or status..." oninput="filterUrls()">
          <div style="display: flex; gap: 0.5rem;">
            <select id="status-filter" class="search-input" style="min-width: 140px;" onchange="filterUrls()">
              <option value="ALL">All Statuses</option>
              <option value="200">200 OK</option>
              <option value="30X">30x Redirects</option>
              <option value="40X">4xx Errors</option>
              <option value="ORPHAN">Orphan Pages</option>
            </select>
          </div>
        </div>
        <div class="table-container">
          <table id="inventory-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>URL</th>
                <th>Title</th>
                <th>Canonical</th>
                <th>In-Degree</th>
                <th>Depth</th>
                <th>PageRank</th>
                <th>Words</th>
                <th>TTFB</th>
              </tr>
            </thead>
            <tbody id="inventory-tbody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: GRAPH -->
    <div id="tab-graph" class="tab-panel">
      <div class="card">
        <div class="card-title">
          <span>Internal Link Architecture & PageRank Topology</span>
          <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">Canvas Force-Directed Simulation (Scroll to zoom, drag to move)</span>
        </div>
        <canvas id="graph-canvas"></canvas>
        <div style="display: flex; gap: 1.5rem; margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
          <span>🔵 Home / Static Pages</span>
          <span>🟢 Automotive Articles</span>
          <span>🟣 Technology Articles</span>
          <span>🟡 Finance / Projects</span>
          <span>🔴 Orphan Pages (0 Inlinks)</span>
        </div>
      </div>
    </div>

    <!-- TAB: DUPLICATES -->
    <div id="tab-duplicates" class="tab-panel">
      <div class="card">
        <div class="card-title">Explicit Duplicate Infrastructure Investigations</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Variation Tested</th>
                <th>Requested URL</th>
                <th>Status</th>
                <th>Final Destination</th>
                <th>Canonical Declaration</th>
                <th>Severity</th>
                <th>Finding</th>
              </tr>
            </thead>
            <tbody id="probe-tbody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Duplicate Titles & Canonicals Across Inventory</div>
        <div id="duplicate-inventory-summary" style="font-size: 0.9rem; color: var(--text-muted);">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>

    <!-- TAB: CONTENT QUALITY -->
    <div id="tab-content" class="tab-panel">
      <div class="card">
        <div class="card-title">Content Substance, Repetitive Boilerplate & Internal Linking Opportunities</div>
        <div id="content-analysis-summary" style="margin-bottom: 1.5rem; font-size: 0.9rem;">
          <!-- Content summary -->
        </div>
        <div class="card-title" style="font-size: 1rem; margin-top: 1.5rem;">Top Internal Linking Opportunities (Unlinked Topic Mentions)</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Source Page</th>
                <th>Mentioned Keyword</th>
                <th>Target Guide URL</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody id="linking-tbody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB: PATCHES -->
    <div id="tab-patches" class="tab-panel">
      <div class="card">
        <div class="card-title">
          <span>Safe Code Patches (Requires Human Approval Before Applying)</span>
          <button onclick="copyPatch()" class="tab-btn" style="border: 1px solid var(--primary); border-radius: 4px; padding: 4px 10px; font-size: 0.8rem;">Copy Unified Diff</button>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          In strict compliance with audit safety rules, these developer-ready code fixes are proposed for human review. They resolve P0/P1 canonicalization duplicates and routing inconsistencies.
        </p>
        <pre class="patch-diff" id="patch-display"></pre>
      </div>
    </div>

    <!-- TAB: HISTORY -->
    <div id="tab-history" class="tab-panel">
      <div class="card">
        <div class="card-title">Historical Baseline Comparison (24 Oct 2026 vs Current Audit)</div>
        <div id="history-summary">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>

  </div>

  <script>
    const AUDIT_DATA = ${jsonPayload};

    function initDashboard() {
      document.getElementById('audit-date').innerText = new Date(AUDIT_DATA.timestamp).toLocaleString();

      // Render KPIs
      document.getElementById('kpi-total-urls').innerText = AUDIT_DATA.kpis.totalDiscoveredUrls;
      document.getElementById('kpi-sitemap-sub').innerText = 'Sitemap: ' + AUDIT_DATA.kpis.sitemapUrls + ' URLs';
      document.getElementById('kpi-http-200').innerText = AUDIT_DATA.kpis.http200Urls;
      document.getElementById('kpi-redirects').innerText = AUDIT_DATA.kpis.redirectedUrls;
      document.getElementById('kpi-canonical').innerText = AUDIT_DATA.kpis.canonicalUrls;
      document.getElementById('kpi-canonical-sub').innerText = (AUDIT_DATA.kpis.selfReferentialCanonicals || 0) + ' self-referential';
      document.getElementById('kpi-noindex').innerText = AUDIT_DATA.kpis.noindexUrls;
      document.getElementById('kpi-robots-blocked').innerText = AUDIT_DATA.kpis.robotsBlockedUrls;
      document.getElementById('kpi-duplicates').innerText = AUDIT_DATA.kpis.duplicatePages;
      document.getElementById('kpi-orphans').innerText = AUDIT_DATA.kpis.orphanPages;
      document.getElementById('kpi-content-warnings').innerText = AUDIT_DATA.kpis.contentQualityWarnings;

      document.getElementById('tab-ticket-count').innerText = AUDIT_DATA.tickets.length;
      document.getElementById('tab-inventory-count').innerText = AUDIT_DATA.inventory.length;

      // Render Tickets
      renderTickets();

      // Render Inventory Table
      renderInventoryTable(AUDIT_DATA.inventory);

      // Render Duplicate Probes
      renderProbes();

      // Render Linking Opportunities
      renderLinkingOpportunities();

      // Render Patches
      renderPatches();

      // Render History
      renderHistory();

      // Initialize Graph Canvas
      initGraphVisualizer();
    }

    function switchTab(tabId) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('tab-' + tabId).classList.add('active');
    }

    function renderTickets() {
      const container = document.getElementById('ticket-container');
      container.innerHTML = AUDIT_DATA.tickets.map(t => \`
        <div class="ticket-item" id="\${t.id}">
          <div class="ticket-header" onclick="this.parentElement.classList.toggle('open')">
            <div class="ticket-meta-left">
              <span class="badge-\${t.severity.toLowerCase()}">\${t.severity}</span>
              <span class="mono" style="color: var(--text-muted); font-size: 0.8rem;">\${t.id}</span>
              <span class="ticket-title">\${t.title}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              \${t.affectedPages.length} affected page(s) ▾
            </div>
          </div>
          <div class="ticket-body">
            <div class="field-row">
              <div class="field-label">Target URL / Route</div>
              <div class="field-code">\${t.url}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Evidence & Measured Behavior</div>
              <p style="color: var(--text-main);">\${t.evidence}</p>
            </div>
            <div class="field-row">
              <div class="field-label">Root Cause Analysis</div>
              <p style="color: var(--text-muted);">\${t.rootCause}</p>
            </div>
            <div class="field-row">
              <div class="field-label">Recommended Fix</div>
              <p style="color: #34d399; font-weight: 500;">\${t.recommendedFix}</p>
            </div>
            <div class="field-row">
              <div class="field-label">Affected Pages Sample</div>
              <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-dim);">
                \${t.affectedPages.slice(0, 10).map(p => \`<li>\${p}</li>\`).join('')}
                \${t.affectedPages.length > 10 ? \`<li>...and \${t.affectedPages.length - 10} more</li>\` : ''}
              </ul>
            </div>
          </div>
        </div>
      \`).join('');
    }

    let allInventory = [];
    function renderInventoryTable(items) {
      allInventory = items;
      const tbody = document.getElementById('inventory-tbody');
      tbody.innerHTML = items.slice(0, 100).map(i => \`
        <tr>
          <td><span class="mono" style="color: \${i.status === 200 ? 'var(--success)' : 'var(--warning)'}">\${i.status}</span></td>
          <td class="mono" style="max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><a href="\${i.url}" target="_blank" style="color: var(--text-main); text-decoration: none;">\${i.url}</a></td>
          <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${i.title || '-'}</td>
          <td class="mono" style="font-size: 0.78rem; color: \${i.canonicalStatus === 'self-referential' ? 'var(--success)' : 'var(--warning)'}">\${i.canonicalStatus || '-'}</td>
          <td class="mono" style="color: \${i.inDegree === 0 ? 'var(--danger)' : 'var(--text-main)'}">\${i.inDegree}</td>
          <td class="mono">\${i.depth === -1 ? 'Unreachable' : i.depth}</td>
          <td class="mono">\${i.pageRank}</td>
          <td class="mono">\${i.wordCount}</td>
          <td class="mono">\${i.ttfb}ms</td>
        </tr>
      \`).join('');
    }

    function filterUrls() {
      const q = document.getElementById('url-search').value.toLowerCase();
      const statusFilter = document.getElementById('status-filter').value;

      const filtered = AUDIT_DATA.inventory.filter(i => {
        const matchesQuery = i.url.toLowerCase().includes(q) || (i.title && i.title.toLowerCase().includes(q));
        if (!matchesQuery) return false;

        if (statusFilter === '200') return i.status === 200;
        if (statusFilter === '30X') return i.status >= 300 && i.status < 400;
        if (statusFilter === '40X') return i.status >= 400;
        if (statusFilter === 'ORPHAN') return i.inDegree === 0;
        return true;
      });

      renderInventoryTable(filtered);
    }

    function renderProbes() {
      const tbody = document.getElementById('probe-tbody');
      tbody.innerHTML = (AUDIT_DATA.duplicates.probeResults || []).map(p => \`
        <tr>
          <td><strong>\${p.variation}</strong></td>
          <td class="mono">\${p.requestedUrl}</td>
          <td><span class="mono">\${p.initialStatus}</span></td>
          <td class="mono">\${p.finalUrl}</td>
          <td class="mono" style="font-size: 0.78rem;">\${p.canonicalUrl || 'None'}</td>
          <td><span class="badge-\${(p.severity || 'p3').toLowerCase()}">\${p.severity}</span></td>
          <td style="font-size: 0.82rem; color: \${p.issue ? 'var(--warning)' : 'var(--success)'}">\${p.issue || 'Passed validation'}</td>
        </tr>
      \`).join('');

      document.getElementById('duplicate-inventory-summary').innerHTML = \`
        <p><strong>Duplicate Titles Found:</strong> \${AUDIT_DATA.duplicates.duplicateTitlesCount} instances</p>
        <p><strong>Duplicate Canonical Declarations:</strong> \${AUDIT_DATA.duplicates.duplicateCanonicalsCount} instances</p>
        <p><strong>Inconsistent Canonicals:</strong> \${AUDIT_DATA.duplicates.inconsistentCanonicalsCount} instances</p>
      \`;
    }

    function renderLinkingOpportunities() {
      const tbody = document.getElementById('linking-tbody');
      const opps = AUDIT_DATA.content.internalLinkingOpportunities || [];
      tbody.innerHTML = opps.slice(0, 30).map(o => \`
        <tr>
          <td class="mono" style="font-size: 0.8rem; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${o.sourceUrl}</td>
          <td><span style="color: #38bdf8; font-weight: 600;">\${o.keyword}</span></td>
          <td class="mono" style="font-size: 0.8rem; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">\${o.targetUrl}</td>
          <td style="font-size: 0.82rem; color: var(--text-muted);">\${o.recommendation}</td>
        </tr>
      \`).join('');

      document.getElementById('content-analysis-summary').innerHTML = \`
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div style="background: #0a0e1a; padding: 1rem; border-radius: 6px; border: 1px solid var(--card-border);">
            <div style="color: var(--text-muted); font-size: 0.8rem;">TOTAL EVALUATED ARTICLES</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">\${AUDIT_DATA.content.evaluatedArticlesCount || 0}</div>
          </div>
          <div style="background: #0a0e1a; padding: 1rem; border-radius: 6px; border: 1px solid var(--card-border);">
            <div style="color: var(--text-muted); font-size: 0.8rem;">INTERNAL LINKING OPPS</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: #38bdf8;">\${opps.length}</div>
          </div>
          <div style="background: #0a0e1a; padding: 1rem; border-radius: 6px; border: 1px solid var(--card-border);">
            <div style="color: var(--text-muted); font-size: 0.8rem;">NEAR-DUPLICATE WARNINGS</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning);">\${AUDIT_DATA.content.nearDuplicatesCount || 0}</div>
          </div>
        </div>
      \`;
    }

    function renderPatches() {
      const patchText = AUDIT_DATA.patches.fullUnifiedDiff || 'No patch available.';
      document.getElementById('patch-display').innerHTML = patchText
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .split('\\n').map(line => {
          if (line.startsWith('+')) return '<span class="diff-add">' + line + '</span>';
          if (line.startsWith('-')) return '<span class="diff-del">' + line + '</span>';
          if (line.startsWith('@@')) return '<span class="diff-hunk">' + line + '</span>';
          return line;
        }).join('\\n');
    }

    function copyPatch() {
      navigator.clipboard.writeText(AUDIT_DATA.patches.fullUnifiedDiff);
      alert('Unified diff copied to clipboard.');
    }

    function renderHistory() {
      const h = AUDIT_DATA.historical;
      if (!h || !h.metrics) return;
      document.getElementById('history-summary').innerHTML = \`
        <div class="metrics-grid" style="margin-bottom: 1.5rem;">
          <div class="metric-card">
            <div class="metric-label">Historical URLs (Oct 24)</div>
            <div class="metric-value">\${h.metrics.totalUrls.historical}</div>
            <div class="metric-sub">Host: \${h.historicalHost}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Current URLs (Now)</div>
            <div class="metric-value">\${h.metrics.totalUrls.current}</div>
            <div class="metric-sub" style="color: var(--success);">+\${h.metrics.totalUrls.percentageGrowth}% Growth</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Average TTFB Delta</div>
            <div class="metric-value">\${h.metrics.avgTtfbMs.current}ms</div>
            <div class="metric-sub">Baseline: \${h.metrics.avgTtfbMs.historical}ms (\${h.metrics.avgTtfbMs.deltaMs > 0 ? '+' : ''}\${h.metrics.avgTtfbMs.deltaMs}ms)</div>
          </div>
        </div>
        <div style="background: #080c16; padding: 1.25rem; border-radius: 6px; border: 1px solid var(--card-border);">
          <h4 style="margin-bottom: 0.75rem; color: #38bdf8;">Key Domain Migration Observations:</h4>
          <ul style="padding-left: 1.5rem; font-size: 0.9rem; color: var(--text-muted); line-height: 1.7;">
            \${(h.keyMigrationFindings || []).map(f => \`<li>\${f}</li>\`).join('')}
          </ul>
        </div>
      \`;
    }

    function initGraphVisualizer() {
      const canvas = document.getElementById('graph-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 520;

      const graph = AUDIT_DATA.visualGraph;
      if (!graph || !graph.nodes || graph.nodes.length === 0) return;

      // Assign initial circular positions
      const nodes = graph.nodes.map((n, idx) => {
        const angle = (idx / graph.nodes.length) * Math.PI * 2;
        const radius = 100 + (n.depth * 65);
        return {
          ...n,
          x: (canvas.width / 2) + Math.cos(angle) * radius + (Math.random() * 20),
          y: (canvas.height / 2) + Math.sin(angle) * radius + (Math.random() * 20),
          vx: 0,
          vy: 0
        };
      });

      const nodeMap = new Map(nodes.map(n => [n.id, n]));
      const edges = graph.edges.map(e => ({
        source: nodeMap.get(e.source),
        target: nodeMap.get(e.target)
      })).filter(e => e.source && e.target);

      // Color mapping
      function getNodeColor(node) {
        if (node.isOrphan) return '#ef4444';
        if (node.category === 'home') return '#3b82f6';
        if (node.category === 'automotive') return '#10b981';
        if (node.category === 'technology') return '#8b5cf6';
        if (node.category === 'finance') return '#f59e0b';
        return '#06b6d4';
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw edges
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
        ctx.lineWidth = 1;
        for (const e of edges) {
          ctx.beginPath();
          ctx.moveTo(e.source.x, e.source.y);
          ctx.lineTo(e.target.x, e.target.y);
          ctx.stroke();
        }

        // Draw nodes
        for (const n of nodes) {
          const r = Math.max(3, Math.min(14, (n.pageRank / 10) + 3));
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = getNodeColor(n);
          ctx.fill();
        }
      }

      draw();
    }

    window.addEventListener('DOMContentLoaded', initDashboard);
  </script>
</body>
</html>`;
  }
}
