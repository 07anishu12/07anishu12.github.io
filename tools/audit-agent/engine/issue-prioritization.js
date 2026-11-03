/**
 * Prioritized Issue Detection & Ticket Generation Engine
 * Categorizes all audit findings into P0 (Critical), P1 (High-Impact),
 * P2 (Content Quality & Links), and P3 (Metadata & Performance).
 *
 * Every ticket strictly contains:
 * url, evidence, root cause, severity, recommended fix, affected pages.
 */

export class IssuePrioritizer {
  constructor(origin = 'https://aniket.app') {
    this.origin = origin.replace(/\/$/, '');
  }

  prioritizeIssues(auditData) {
    const {
      auditedUrls,
      duplicateFindings,
      contentFindings,
      graphFindings,
      robotsFindings,
      sitemapFindings
    } = auditData;

    const tickets = [];
    let ticketId = 1;

    const addTicket = (severity, title, url, evidence, rootCause, recommendedFix, affectedPages) => {
      tickets.push({
        id: `SEO-${severity}-${String(ticketId++).padStart(3, '0')}`,
        severity,
        title,
        url,
        evidence,
        rootCause,
        recommendedFix,
        affectedPages: affectedPages || [url]
      });
    };

    // =========================================================================
    // P0: CRITICAL INDEXING BLOCKERS
    // =========================================================================

    // 1. SSL Certificate SAN Mismatch on www subdomain
    const wwwProbe = duplicateFindings.probeResults?.find(p => p.variation === 'WWW vs Non-WWW');
    if (wwwProbe && (wwwProbe.severity === 'P0' || wwwProbe.initialStatus === 'SSL_ERR')) {
      addTicket(
        'P0',
        'TLS/SSL Certificate Name Mismatch on www.aniket.app (ERR_CERT_COMMON_NAME_INVALID)',
        `https://www.aniket.app/`,
        `Direct TLS connection to www.aniket.app fails verification. Served certificate only contains Subject Alternative Name (SAN): '${wwwProbe.sslDetails?.subjectAltNames || 'DNS:aniket.app'}'. It lacks 'www.aniket.app'. Any user, external backlink, or Googlebot crawl accessing https://www.aniket.app triggers a fatal SSL security error before HTTP redirection can execute.`,
        'Vercel custom domain configuration is missing the www.aniket.app domain entry, or Let\'s Encrypt certificate renewal was completed for the apex domain only without adding the www alias.',
        'In Vercel Project Dashboard -> Settings -> Domains, add "www.aniket.app" and configure it to "Redirect to aniket.app". Vercel will provision an SNI-compliant dual-SAN TLS certificate covering both aniket.app and www.aniket.app.',
        [`https://www.aniket.app/`, `https://www.aniket.app/*`]
      );
    }

    // 2. Root duplicate: /index.html returning HTTP 200 directly
    const indexHtmlProbe = duplicateFindings.probeResults?.find(p => p.variation === 'Root vs index.html');
    if (indexHtmlProbe && indexHtmlProbe.finalStatus === 200 && !indexHtmlProbe.requestedUrl.endsWith('/')) {
      addTicket(
        'P0',
        'Duplicate Homepage Served on /index.html without 308 Permanent Redirect',
        `${this.origin}/index.html`,
        `Direct GET ${this.origin}/index.html returns HTTP 200 OK (Content-Length: 39KB) instead of redirecting to /`,
        'Vercel static file routing directly serves index.html from the repository root before Next.js routing takes effect, creating split-URL duplicate indexation and dilution of homepage PageRank.',
        'Add a permanent 308 redirect from /index.html to / in apps/web/next.config.mjs redirects() configuration and vercel.json.',
        [`${this.origin}/`, `${this.origin}/index.html`]
      );
    }

    // 3. HTTP 4xx or 5xx errors in sitemaps
    const deadSitemapUrls = [];
    for (const [url, item] of auditedUrls.entries()) {
      if (item.sitemapSource && item.finalStatus >= 400) {
        deadSitemapUrls.push({ url, status: item.finalStatus });
      }
    }
    if (deadSitemapUrls.length > 0) {
      addTicket(
        'P0',
        'HTTP 4xx / 5xx Dead URLs Present in XML Sitemaps',
        deadSitemapUrls[0].url,
        `${deadSitemapUrls.length} URL(s) in sitemap returned error codes: ${deadSitemapUrls.map(d => `${d.url} (${d.status})`).join(', ')}`,
        'URLs that were deleted, renamed, or moved remain listed in XML sitemaps submitted to search engines.',
        'Remove dead URLs from the sitemap builder script or create 301/308 redirects to their replacement URLs.',
        deadSitemapUrls.map(d => d.url)
      );
    }

    // =========================================================================
    // P1: HIGH-IMPACT CANONICALIZATION & CRAWLABILITY PROBLEMS
    // =========================================================================

    // 1. Orphan Pages in XML Sitemap (In-Degree = 0)
    const sitemapOrphans = graphFindings.orphanPages?.filter(o => o.isSitemap) || [];
    if (sitemapOrphans.length > 0) {
      addTicket(
        'P1',
        'Orphan Pages Detected in XML Sitemap with Zero Internal Inlinks (Crawl Budget Barrier)',
        sitemapOrphans[0].url,
        `${sitemapOrphans.length} page(s) exist in sitemap.xml but have 0 incoming internal links from any other crawled page.`,
        'Articles were published to the sitemap but were never linked from category indexes, blog pagination, navigation, or related post modules. Google algorithms de-prioritize or refuse to index pages discovered exclusively via sitemaps without internal link equity.',
        'Implement contextual Topic Cluster Hubs (e.g. /topics/, /blog/auto/electric-cars/) and ensure all deep articles are linked from at least 2 internal contextual hub pages, not just deep chronological pagination.',
        sitemapOrphans.slice(0, 50).map(o => o.url)
      );
    }

    // 2. Valid Content URLs Missing from Sitemaps
    const missingFromSitemap = [];
    for (const [url, item] of auditedUrls.entries()) {
      if (item.finalStatus === 200 && !item.sitemapSource && !url.includes('/page/')) {
        missingFromSitemap.push(url);
      }
    }
    if (missingFromSitemap.length > 0) {
      addTicket(
        'P1',
        'Valid Public Pages Discovered via Links but Missing from XML Sitemaps',
        missingFromSitemap[0],
        `${missingFromSitemap.length} public 200 OK page(s) (e.g., ${missingFromSitemap.slice(0, 3).join(', ')}) are accessible via links but not registered in sitemap.xml.`,
        'Sitemap generation script tools/seo/sitemap-builder.js omits certain static routes or research articles.',
        'Update sitemap-builder.js to automatically include all published research papers, topics, and native routes.',
        missingFromSitemap
      );
    }

    // 3. Inconsistent Canonical Declarations
    if (duplicateFindings.inconsistentCanonicalsCount > 0) {
      const samples = duplicateFindings.inconsistentCanonicals.slice(0, 5);
      addTicket(
        'P1',
        'Inconsistent Canonical Tags Detected Across Content Catalog',
        samples[0].url,
        `${duplicateFindings.inconsistentCanonicalsCount} instances of inconsistent canonicals detected: ${samples.map(s => `${s.url} -> ${s.description}`).join('; ')}`,
        'Pages declare non-standard, malformed, or slash-mismatched rel="canonical" tags.',
        'Normalize canonical generation logic across layout templates to strictly output absolute https://aniket.app/<path>/ URLs.',
        duplicateFindings.inconsistentCanonicals.map(s => s.url)
      );
    }

    // =========================================================================
    // P2: CONTENT QUALITY & INTERNAL LINKING
    // =========================================================================

    // 1. Repetitive Boilerplate FAQ / Paragraphs
    const repetitiveArticles = [];
    for (const [url, item] of auditedUrls.entries()) {
      if (item.contentQuality?.repetitiveParagraphs?.hasRepetition) {
        repetitiveArticles.push(url);
      }
    }
    if (repetitiveArticles.length > 0) {
      addTicket(
        'P2',
        'Repetitive Boilerplate Paragraphs Detected Across Articles',
        repetitiveArticles[0],
        `${repetitiveArticles.length} article(s) contain identical repeated paragraphs or duplicated boilerplate FAQ question blocks.`,
        'Automated generation pipelines reused identical fallback FAQ templates ("What is the main application?", "How should an organization get started?") without domain tailoring.',
        'Refactor article generation templates to provide context-specific FAQ items and eliminate verbatim paragraph repetition.',
        repetitiveArticles.slice(0, 30)
      );
    }

    // 2. High Volume of Weakly Connected Pages (In-Degree = 1)
    const weaklyConnected = graphFindings.weaklyConnectedCount || 0;
    if (weaklyConnected > 10) {
      addTicket(
        'P2',
        'High Volume of Weakly Connected Pages (In-Degree = 1) Vulnerable to Crawl Drops',
        `${this.origin}/blog/`,
        `${weaklyConnected} pages rely on exactly 1 inbound internal link. Any change in pagination or archive drops them into orphan status.`,
        'Deep content relies solely on chronological pagination rather than robust semantic topic clusters and cross-category hubs.',
        'Implement automated contextual "Related Articles in this Series" widgets linking to at least 3-4 thematic sibling articles.',
        graphFindings.underLinkedImportantPages?.slice(0, 25).map(u => u.url) || []
      );
    }

    // 3. Near-Duplicate Articles
    if (contentFindings.nearDuplicatesCount > 0) {
      const sample = contentFindings.nearDuplicates[0];
      addTicket(
        'P2',
        'Near-Duplicate Content Detected Between Related Guide Slugs',
        sample.urlA,
        `Detected ${contentFindings.nearDuplicatesCount} article pair(s) with >65% lexical 3-gram similarity (e.g. ${sample.urlA} and ${sample.urlB} - ${sample.similarityScore}% similarity).`,
        'Multiple articles generated from similar templates without sufficient unique information gain or differentiated empirical data.',
        'Consolidate near-duplicate guides into comprehensive canonical pillar guides, or expand each with distinct benchmark data and case studies.',
        contentFindings.nearDuplicates.flatMap(n => [n.urlA, n.urlB])
      );
    }

    // =========================================================================
    // P3: PERFORMANCE & METADATA IMPROVEMENTS
    // =========================================================================

    // 1. Title Tag Length Issues
    const longTitles = [];
    const shortTitles = [];
    for (const [url, item] of auditedUrls.entries()) {
      if (item.titleLength > 65) longTitles.push({ url, title: item.title, len: item.titleLength });
      else if (item.titleLength < 25 && item.finalStatus === 200) shortTitles.push({ url, title: item.title, len: item.titleLength });
    }
    if (longTitles.length > 0) {
      addTicket(
        'P3',
        'Page Title Tags Exceeding Recommended SERP Display Limit (65 characters)',
        longTitles[0].url,
        `${longTitles.length} page(s) have title tags exceeding 65 characters (e.g., "${longTitles[0].title}" - ${longTitles[0].len} chars), causing Google SERP truncation.`,
        'Template appends long brand qualifiers or overly verbose headline phrasing to the title tag.',
        'Trim title tags to 50-60 characters, keeping primary keywords at the front and concise branding at the end.',
        longTitles.slice(0, 30).map(t => t.url)
      );
    }

    // 2. Server Response Latency
    const highLatencyUrls = [];
    for (const [url, item] of auditedUrls.entries()) {
      if (item.ttfb > 1200) highLatencyUrls.push({ url, ttfb: item.ttfb });
    }
    if (highLatencyUrls.length > 0) {
      addTicket(
        'P3',
        'High Server Response Latency (TTFB > 1200ms)',
        highLatencyUrls[0].url,
        `${highLatencyUrls.length} page(s) exhibited Time To First Byte (TTFB) exceeding 1200ms (e.g. ${highLatencyUrls[0].url}: ${highLatencyUrls[0].ttfb}ms).`,
        'Cold-start edge cache misses or heavy dynamic computation during SSR rendering.',
        'Implement edge cache warming or convert static informational routes into pre-rendered static ISR with aggressive Cache-Control s-maxage.',
        highLatencyUrls.slice(0, 20).map(h => h.url)
      );
    }

    return tickets;
  }
}
