#!/usr/bin/env node

/**
 * ============================================================================
 * Autonomous Google Indexability Audit Agent for aniket.app
 * ============================================================================
 * Orchestrates full discovery, HTTP audit, Playwright browser rendering,
 * duplicate analysis, content quality evaluation, crawl graph modeling,
 * GSC integration, prioritized ticket compilation, and patch generation.
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { RobotsParser } from './engine/robots-parser.js';
import { SitemapExtractor } from './engine/sitemap-extractor.js';
import { HttpAuditor } from './engine/http-auditor.js';
import { BrowserAgent } from './engine/browser-agent.js';
import { DuplicateDetector } from './engine/duplicate-detector.js';
import { ContentAnalyzer } from './engine/content-analyzer.js';
import { CrawlGraph } from './engine/crawl-graph.js';
import { GscIntegration } from './engine/gsc-integration.js';
import { IssuePrioritizer } from './engine/issue-prioritization.js';
import { PatchGenerator } from './engine/patch-generator.js';
import { HistoricalComparator } from './engine/historical-comparator.js';
import { DashboardBuilder } from './engine/dashboard-builder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');
const OUTPUT_DIR = path.resolve(ROOT, 'reports/seo-audit');

const ORIGIN = (process.env.TARGET_ORIGIN || 'https://aniket.app').replace(/\/$/, '');

async function runAudit() {
  console.log('='.repeat(80));
  console.log(' AUTONOMOUS GOOGLE INDEXABILITY AUDIT AGENT');
  console.log(` Target Origin: ${ORIGIN}`);
  console.log(` Timestamp:     ${new Date().toISOString()}`);
  console.log('='.repeat(80));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ---------------------------------------------------------------------------
  // STEP 1: Robots.txt Discovery & Rules Parsing
  // ---------------------------------------------------------------------------
  console.log('\n[1/8] Fetching and parsing robots.txt...');
  const robotsParser = new RobotsParser(ORIGIN);
  const robotsSummary = await robotsParser.fetchAndParse();
  console.log(`  ✓ Robots.txt Status: HTTP ${robotsSummary.statusCode}`);
  console.log(`  ✓ Sitemaps declared in robots.txt: ${robotsSummary.sitemapsFound.length}`);
  console.log(`  ✓ Googlebot rules parsed: ${robotsSummary.rulesParsed.googlebot.allowsCount} allow(s), ${robotsSummary.rulesParsed.googlebot.disallowsCount} disallow(s)`);

  // ---------------------------------------------------------------------------
  // STEP 2: Sitemap Extraction & Validation
  // ---------------------------------------------------------------------------
  console.log('\n[2/8] Extracting and validating all XML sitemaps...');
  const sitemapExtractor = new SitemapExtractor(ORIGIN, ROOT);
  const sitemapResult = await sitemapExtractor.extractAll();
  console.log(`  ✓ Discovered ${sitemapResult.totalSitemaps} sitemaps containing ${sitemapResult.totalUrls} unique URLs`);

  // ---------------------------------------------------------------------------
  // STEP 3: Multi-Worker HTTP Technical SEO Audit
  // ---------------------------------------------------------------------------
  console.log('\n[3/8] Executing multi-worker HTTP audit across URL inventory...');
  const httpAuditor = new HttpAuditor({ origin: ORIGIN, concurrency: 12, delayMs: 40 });

  const urlsToAudit = sitemapResult.urls.map(u => u.url);
  // Ensure homepage is audited
  if (!urlsToAudit.includes(`${ORIGIN}/`)) urlsToAudit.unshift(`${ORIGIN}/`);

  console.log(`  Auditing ${urlsToAudit.length} URLs with concurrency=12...`);
  let lastReported = 0;
  const auditedResults = await httpAuditor.auditUrls(urlsToAudit, (done, total, currentUrl) => {
    const pct = Math.floor((done / total) * 100);
    if (pct >= lastReported + 20 || done === total) {
      console.log(`    Progress: ${done}/${total} URLs (${pct}%)`);
      lastReported = pct;
    }
  });

  // Attach sitemap metadata to audited results
  for (const sItem of sitemapResult.urls) {
    if (auditedResults.has(sItem.url)) {
      auditedResults.get(sItem.url).sitemapSource = sItem.sitemapSource;
      auditedResults.get(sItem.url).sitemapLastmod = sItem.lastmod;
    }
  }

  // Multi-pass internal link discovery (crawl pagination & unlisted content)
  const discoveredLinks = new Set();
  for (const [_, item] of auditedResults.entries()) {
    for (const link of (item.internalLinks || [])) {
      if (link.startsWith(ORIGIN) && !auditedResults.has(link) && !link.includes('#') && !link.match(/\.(png|jpg|jpeg|svg|pdf|webp|ico|xml|json|txt)$/i)) {
        discoveredLinks.add(link);
      }
    }
  }

  if (discoveredLinks.size > 0) {
    console.log(`  Discovered ${discoveredLinks.size} additional internal URLs via links (pagination, category hubs). Auditing...`);
    const additionalResults = await httpAuditor.auditUrls(Array.from(discoveredLinks));
    for (const [url, item] of additionalResults.entries()) {
      auditedResults.set(url, item);
    }
    console.log(`  ✓ Total active inventory after link discovery: ${auditedResults.size} URLs`);
  }

  // ---------------------------------------------------------------------------
  // STEP 4: Playwright Headless Browser Rendering (Googlebot Smartphone)
  // ---------------------------------------------------------------------------
  console.log('\n[4/8] Executing Playwright Chromium rendering with Googlebot Smartphone emulation...');
  const browserAgent = new BrowserAgent();
  await browserAgent.init();

  // Select representative pages across all archetypes for deep browser rendering
  const browserSampleUrls = [
    `${ORIGIN}/`,
    `${ORIGIN}/about/`,
    `${ORIGIN}/work/`,
    `${ORIGIN}/projects/`,
    `${ORIGIN}/research/`,
    `${ORIGIN}/contact/`,
    `${ORIGIN}/blog/`,
    `${ORIGIN}/blog/technology/`,
    `${ORIGIN}/blog/auto/`,
    `${ORIGIN}/blog/technology/ai-agents-what-are-they-and-how-do-they-work/`,
    `${ORIGIN}/blog/technology/how-to-build-a-multi-agent-ai-system-from-scratch/`,
    `${ORIGIN}/blog/auto/best-cars-for-a-50-km-daily-commute-in-india-per-day-cost-seat-comfort-90000-km-math/`,
    `${ORIGIN}/projects/finance-tools/`,
    `${ORIGIN}/finance/bikes/`
  ];

  const browserAuditResults = new Map();
  console.log(`  Deep rendering ${browserSampleUrls.length} representative archetype pages...`);

  for (const bUrl of browserSampleUrls) {
    try {
      const renderResult = await browserAgent.renderGooglebotMobile(bUrl);
      browserAuditResults.set(bUrl, renderResult);

      if (auditedResults.has(bUrl)) {
        auditedResults.get(bUrl).browserRender = renderResult;
      }
    } catch (err) {
      console.error(`  Browser render error on ${bUrl}:`, err.message);
    }
  }

  // Run parity check on homepage (Googlebot Smartphone vs Desktop)
  console.log('  Running Smartphone vs Desktop parity audit on homepage...');
  const parityAudit = await browserAgent.compareSmartphoneVsDesktop(`${ORIGIN}/`);
  await browserAgent.close();
  console.log(`  ✓ Parity audit result: ${parityAudit.isParity ? '100% PARITY' : parityAudit.differences.join(', ')}`);

  // ---------------------------------------------------------------------------
  // STEP 5: Duplicate URL & Canonicalization Detection
  // ---------------------------------------------------------------------------
  console.log('\n[5/8] Running duplicate URL & canonicalization matrix...');
  const duplicateDetector = new DuplicateDetector(ORIGIN, httpAuditor);
  const probeResults = await duplicateDetector.probeInfrastructureVariations();
  const duplicateInventoryFindings = duplicateDetector.analyzeCrawlInventory(auditedResults);
  console.log(`  ✓ Probed ${probeResults.length} infrastructure variations`);
  console.log(`  ✓ Duplicate titles detected: ${duplicateInventoryFindings.duplicateTitlesCount}`);
  console.log(`  ✓ Inconsistent canonicals: ${duplicateInventoryFindings.inconsistentCanonicalsCount}`);

  // ---------------------------------------------------------------------------
  // STEP 6: Content Quality & Intent Analysis
  // ---------------------------------------------------------------------------
  console.log('\n[6/8] Analyzing content quality, topical relevance, and internal linking...');
  const contentAnalyzer = new ContentAnalyzer(ORIGIN);
  const contentAuditList = [];

  for (const [url, item] of auditedResults.entries()) {
    if (url.includes('/blog/') || url.includes('/learnings/')) {
      const quality = contentAnalyzer.auditArticle(
        url,
        item.title,
        item.primaryH1,
        item.bodySnippet,
        item.wordCount,
        item.hasTable,
        item.hasCode,
        item.externalLinksCount,
        item.internalLinks
      );
      item.contentQuality = quality;
      contentAuditList.push({ ...item, url });
    }
  }

  const nearDuplicates = contentAnalyzer.detectCrossArticleNearDuplicates(contentAuditList);
  const internalLinkingOpportunities = contentAnalyzer.findInternalLinkingOpportunities(Array.from(auditedResults.values()));
  console.log(`  ✓ Evaluated ${contentAuditList.length} longform articles for search intent & quality`);
  console.log(`  ✓ Near-duplicate article pairs: ${nearDuplicates.length}`);
  console.log(`  ✓ Discovered ${internalLinkingOpportunities.length} high-value internal linking opportunities`);

  // ---------------------------------------------------------------------------
  // STEP 7: Crawl Graph Analysis (PageRank, Depth, In-Degree, Orphans)
  // ---------------------------------------------------------------------------
  console.log('\n[7/8] Constructing directed crawl graph & computing PageRank...');
  const crawlGraph = new CrawlGraph(ORIGIN);
  const graphSummary = crawlGraph.buildGraph(auditedResults);

  // Update audited results with graph metrics
  for (const [url, node] of crawlGraph.nodes.entries()) {
    if (auditedResults.has(url)) {
      const item = auditedResults.get(url);
      item.inDegree = node.inDegree;
      item.outDegree = node.outDegree;
      item.depth = node.depth;
      item.pageRank = node.pageRank;
      item.isOrphan = node.isOrphan;
      item.category = node.category;
    }
  }

  console.log(`  ✓ Graph constructed: ${graphSummary.totalNodes} Nodes, ${graphSummary.totalEdges} Edges`);
  console.log(`  ✓ Orphan pages detected (in-degree=0): ${graphSummary.orphanPagesCount}`);
  console.log(`  ✓ Weakly connected pages (in-degree=1): ${graphSummary.weaklyConnectedCount}`);

  // ---------------------------------------------------------------------------
  // STEP 8: Google Search Console Integration & Status
  // ---------------------------------------------------------------------------
  console.log('\n[8/8] Verifying Google Search Console API authorization status...');
  const gsc = new GscIntegration({ origin: ORIGIN });
  const gscStatus = await gsc.authenticate();
  console.log(`  ✓ GSC Auth Status: ${gscStatus.authStatus}`);
  console.log(`  ✓ Indexing Status Label: ${gscStatus.indexingStatusLabel}`);
  if (gscStatus.authError) {
    console.log(`  ! Note: ${gscStatus.authError}`);
  }

  // Compile Prioritized Tickets
  console.log('\nCompiling prioritized engineering tickets...');
  const prioritizer = new IssuePrioritizer(ORIGIN);
  const tickets = prioritizer.prioritizeIssues({
    auditedUrls: auditedResults,
    duplicateFindings: { probeResults, ...duplicateInventoryFindings },
    contentFindings: {
      nearDuplicates,
      internalLinkingOpportunities
    },
    graphFindings: graphSummary,
    robotsFindings: robotsSummary,
    sitemapFindings: sitemapResult
  });

  const p0Count = tickets.filter(t => t.severity === 'P0').length;
  const p1Count = tickets.filter(t => t.severity === 'P1').length;
  const p2Count = tickets.filter(t => t.severity === 'P2').length;
  const p3Count = tickets.filter(t => t.severity === 'P3').length;
  console.log(`  ✓ Generated ${tickets.length} tickets (P0: ${p0Count}, P1: ${p1Count}, P2: ${p2Count}, P3: ${p3Count})`);

  // Generate Safe Patches
  const patchGenerator = new PatchGenerator(ROOT);
  const patchesData = patchGenerator.generateProposedPatches(tickets);

  // Compare with Historical Baseline
  const historicalComp = new HistoricalComparator(ROOT);
  const historyComparison = historicalComp.compareWithBaseline(auditedResults);

  // Compile KPIs
  const allAudited = Array.from(auditedResults.values());
  const kpis = {
    totalDiscoveredUrls: allAudited.length,
    sitemapUrls: sitemapResult.totalUrls,
    http200Urls: allAudited.filter(a => a.finalStatus === 200).length,
    redirectedUrls: allAudited.filter(a => a.isRedirect).length,
    canonicalUrls: allAudited.filter(a => !!a.canonicalUrl).length,
    selfReferentialCanonicals: allAudited.filter(a => a.canonicalStatus === 'self-referential').length,
    noindexUrls: allAudited.filter(a => a.isNoindex).length,
    robotsBlockedUrls: allAudited.filter(a => !robotsParser.isAllowed(new URL(a.requestedUrl).pathname)).length,
    duplicatePages: duplicateInventoryFindings.duplicateTitlesCount + (probeResults.find(p => p.variation === 'Root vs index.html')?.finalStatus === 200 ? 1 : 0),
    orphanPages: graphSummary.orphanPagesCount,
    contentQualityWarnings: allAudited.filter(a => a.contentQuality?.qualityWarnings?.length > 0).length,
    gscIndexedUrls: gscStatus.connected ? 'Verified' : 'Unknown (GSC auth required)'
  };

  // Compile Master Audit Payload
  const fullAuditReport = {
    timestamp: new Date().toISOString(),
    origin: ORIGIN,
    kpis,
    gsc: gscStatus,
    robots: robotsSummary,
    sitemaps: sitemapResult,
    duplicates: {
      probeResults,
      ...duplicateInventoryFindings
    },
    content: {
      evaluatedArticlesCount: contentAuditList.length,
      nearDuplicatesCount: nearDuplicates.length,
      nearDuplicates,
      internalLinkingOpportunities
    },
    graph: graphSummary,
    visualGraph: crawlGraph.exportVisualGraph(250),
    tickets,
    patches: patchesData,
    historical: historyComparison,
    inventory: allAudited.map(a => ({
      url: a.requestedUrl,
      finalUrl: a.finalUrl,
      status: a.finalStatus,
      title: a.title,
      canonicalUrl: a.canonicalUrl,
      canonicalStatus: a.canonicalStatus,
      inDegree: a.inDegree || 0,
      outDegree: a.outDegree || 0,
      depth: a.depth !== undefined ? a.depth : -1,
      pageRank: a.pageRank || 0,
      wordCount: a.wordCount || 0,
      ttfb: a.ttfb || 0,
      sitemapSource: a.sitemapSource || null,
      isNoindex: a.isNoindex || false,
      isOrphan: a.isOrphan || false,
      schemaCount: a.schemaCount || 0
    }))
  };

  // ---------------------------------------------------------------------------
  // EXPORT FINAL DELIVERABLES
  // ---------------------------------------------------------------------------
  console.log('\nExporting all 9 deliverables to reports/seo-audit/ ...');

  // 1. Full URL inventory in CSV
  const csvHeaders = ['url', 'status', 'title', 'canonicalUrl', 'canonicalStatus', 'inDegree', 'outDegree', 'depth', 'pageRank', 'wordCount', 'ttfb', 'sitemapSource', 'isNoindex', 'isOrphan'];
  const csvRows = [csvHeaders.join(',')];
  for (const item of fullAuditReport.inventory) {
    const row = [
      `"${item.url}"`,
      item.status,
      `"${(item.title || '').replace(/"/g, '""')}"`,
      `"${(item.canonicalUrl || '')}"`,
      item.canonicalStatus,
      item.inDegree,
      item.outDegree,
      item.depth,
      item.pageRank,
      item.wordCount,
      item.ttfb,
      `"${item.sitemapSource || ''}"`,
      item.isNoindex,
      item.isOrphan
    ];
    csvRows.push(row.join(','));
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.csv'), csvRows.join('\n'));
  console.log('  1. url_inventory.csv exported');

  // 2. Technical SEO audit in HTML (Institutional Dashboard)
  const dashboardHtml = DashboardBuilder.buildHtml(fullAuditReport);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'technical_seo_audit.html'), dashboardHtml);
  console.log('  2. technical_seo_audit.html exported');

  // 3. Sitemap validation report (JSON & MD)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap_validation.json'), JSON.stringify(sitemapResult, null, 2));
  const sitemapMd = `# Sitemap Validation & Coverage Report

**Audited Origin:** ${ORIGIN}  
**Date:** ${new Date().toISOString()}  
**Total Sitemaps:** ${sitemapResult.totalSitemaps}  
**Total Unique Sitemap URLs:** ${sitemapResult.totalUrls}  

## Sitemap Indexes & Child Files
${Object.entries(sitemapResult.sitemaps).map(([url, data]) => `- **${url}**: ${data.type === 'index' ? `${data.childrenCount} child sitemaps` : `${data.urlsCount} URLs`} (Errors: ${data.errors?.length || 0})`).join('\n')}

## Sitemap HTTP Health Check
- All ${sitemapResult.totalUrls} URLs in XML sitemaps were inspected via HTTP.
- Dead (4xx/5xx) URLs in sitemap: ${allAudited.filter(a => a.sitemapSource && a.finalStatus >= 400).length}
- URLs with canonical mismatch: ${allAudited.filter(a => a.sitemapSource && a.canonicalStatus !== 'self-referential').length}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap_validation.md'), sitemapMd);
  console.log('  3. sitemap_validation.json & .md exported');

  // 4. Canonicalization report (JSON & MD)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'canonicalization_report.json'), JSON.stringify(fullAuditReport.duplicates, null, 2));
  const canonicalMd = `# Canonicalization & Duplicate URL Audit Report

## Infrastructure Variation Test Matrix
| Variation | Requested URL | Initial Status | Final Destination | Canonical Status | Severity |
|---|---|---|---|---|---|
${probeResults.map(p => `| ${p.variation} | \`${p.requestedUrl}\` | ${p.initialStatus} | \`${p.finalUrl}\` | ${p.canonicalStatus} | ${p.severity} |`).join('\n')}

## Summary Findings
- **Duplicate Homepage (/index.html):** ${probeResults.find(p => p.variation === 'Root vs index.html')?.issue || 'PASS'}
- **WWW Domain Forwarding:** ${probeResults.find(p => p.variation === 'WWW vs Non-WWW')?.issue || 'PASS'}
- **Duplicate Titles:** ${duplicateInventoryFindings.duplicateTitlesCount} normalized title clusters
- **Inconsistent Canonicals:** ${duplicateInventoryFindings.inconsistentCanonicalsCount} occurrences
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'canonicalization_report.md'), canonicalMd);
  console.log('  4. canonicalization_report.json & .md exported');

  // 5. Crawl graph visualization dataset
  fs.writeFileSync(path.join(OUTPUT_DIR, 'crawl_graph.json'), JSON.stringify(graphSummary, null, 2));
  console.log('  5. crawl_graph.json exported');

  // 6. Content quality report (JSON & MD)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'content_quality_report.json'), JSON.stringify(fullAuditReport.content, null, 2));
  const contentMd = `# Content Quality & Semantic Relevance Report

## Article Corpus Overview
- **Total Articles Evaluated:** ${contentAuditList.length}
- **Thin Content Articles (< 300 words):** ${contentAuditList.filter(c => c.wordCount < 300).length}
- **Near-Duplicate Article Clusters:** ${nearDuplicates.length}
- **Internal Linking Opportunities:** ${internalLinkingOpportunities.length}

## Internal Linking Recommendations (Top Sample)
${internalLinkingOpportunities.slice(0, 15).map(o => `- **Source:** \`${o.sourceUrl}\`  
  **Keyword Mentioned:** \`${o.keyword}\`  
  **Target URL:** \`${o.targetUrl}\` (${o.targetTitle})`).join('\n\n')}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'content_quality_report.md'), contentMd);
  console.log('  6. content_quality_report.json & .md exported');

  // 7. Prioritized engineering tickets (JSON & MD)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'engineering_tickets.json'), JSON.stringify(tickets, null, 2));
  const ticketsMd = `# Prioritized Technical SEO Engineering Tickets

${tickets.map(t => `### [${t.severity}] ${t.id}: ${t.title}

- **URL:** \`${t.url}\`
- **Severity:** **${t.severity}**
- **Evidence:** ${t.evidence}
- **Root Cause:** ${t.rootCause}
- **Recommended Fix:** ${t.recommendedFix}
- **Affected Pages (${t.affectedPages.length}):**
${t.affectedPages.slice(0, 5).map(p => `  - \`${p}\``).join('\n')}
${t.affectedPages.length > 5 ? `  - *...and ${t.affectedPages.length - 5} more*\n` : ''}
---
`).join('\n')}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'engineering_tickets.md'), ticketsMd);
  console.log('  7. engineering_tickets.json & .md exported');

  // 8. Safe code patches (diff & MD)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'proposed_patches.diff'), patchesData.fullUnifiedDiff);
  const patchesMd = `# Safe Code Patches for Indexability Improvements

> **CRITICAL SAFETY NOTICE:**
> As specified in the autonomous audit requirements, production files are NOT modified automatically.
> These patches are developer-ready proposals that require human review and approval.

\`\`\`diff
${patchesData.fullUnifiedDiff}
\`\`\`
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'proposed_patches.md'), patchesMd);
  console.log('  8. proposed_patches.diff & .md exported');

  // 9. Historical crawl comparison (JSON & MD)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'historical_crawl_comparison.json'), JSON.stringify(historyComparison, null, 2));
  const historyMd = `# Historical Crawl Comparison: 24 Oct 2026 vs Current Crawl

## Comparison Metrics
| Metric | Historical Baseline (24 Oct 2026) | Current Audit (${new Date().toISOString().slice(0, 10)}) | Delta | Growth |
|---|---|---|---|---|
| **Host** | \`${historyComparison.historicalHost}\` | \`${historyComparison.currentHost}\` | Domain Migration | Custom Domain |
| **Total URLs** | ${historyComparison.metrics.totalUrls.historical} | ${historyComparison.metrics.totalUrls.current} | +${historyComparison.metrics.totalUrls.delta} | +${historyComparison.metrics.totalUrls.percentageGrowth}% |
| **Average TTFB** | ${historyComparison.metrics.avgTtfbMs.historical} ms | ${historyComparison.metrics.avgTtfbMs.current} ms | ${historyComparison.metrics.avgTtfbMs.deltaMs > 0 ? '+' : ''}${historyComparison.metrics.avgTtfbMs.deltaMs} ms | Fastly -> Vercel Edge |
| **Total Word Count** | ${historyComparison.metrics.totalWordCount.historical} words | ${historyComparison.metrics.totalWordCount.current} words | +${historyComparison.metrics.totalWordCount.delta} words | Catalog Expansion |

## Key Migration Observations
${historyComparison.keyMigrationFindings.map(f => `- ${f}`).join('\n')}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'historical_crawl_comparison.md'), historyMd);
  console.log('  9. historical_crawl_comparison.json & .md exported');

  console.log('\n' + '='.repeat(80));
  console.log(' AUDIT COMPLETE: ALL 9 DELIVERABLES GENERATED SUCCESSFULLY');
  console.log(` Output Directory: ${OUTPUT_DIR}`);
  console.log('='.repeat(80));
}

runAudit().catch(err => {
  console.error('\nFatal audit execution failure:', err);
  process.exit(1);
});
