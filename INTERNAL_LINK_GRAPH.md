# INTERNAL LINK GRAPH & CRAWL DISCOVERY AUDIT

**Audit Date:** November 6, 2026  
**Audited Target:** `https://aniket.app`  
**Total Crawled URLs:** 977  
**Crawl Depth Evaluated:** Complete breadth-first search from root (`https://aniket.app/`)  
**Audit Status:** COMPLETE — Structural Crawl Blockers & Broken Link Clusters Identified  

---

## 1. Executive Summary & Graph Metrics

Search engine indexing depends fundamentally on internal link equity and discoverability. If pages are buried too deep in the click architecture, Googlebot exhausts its crawl budget long before reaching them.

### Key Graph Topology Metrics:
- **Total Discovered URLs:** 977
- **Total Crawlable Pages:** 977
- **Sitemap Orphan Pages (0 HTML In-Links):** **0** (All 724 sitemap URLs have at least 1 internal HTML in-link from taxonomy or pagination).
- **Average Click Depth:** **18.4 clicks** from homepage.
- **Maximum Click Depth:** **130 clicks** (Extreme outlier depth).
- **Broken Internal Links (404s):** **14** distinct broken URL destinations.
- **Redirecting Internal Links:** **8** distinct redirecting anchor targets.

---

## 2. Click Depth Distribution & The "Pagination Abyss"

Breadth-first crawl from the homepage revealed an alarming structural bottleneck:

| Click Depth Range | URL Count | Typical Pages at This Depth | Googlebot Crawl Likelihood |
|:---:|:---:|---|:---:|
| **Depth 0** | 1 | Homepage (`/`) | 100% Guaranteed |
| **Depth 1** | 15 | Primary Navigation (About, Work, Projects, Research, Blog, Contact, Privacy) | > 95% High |
| **Depth 2** | 48 | Category Hubs, Featured Projects, Page 1 Articles | > 85% High |
| **Depth 3** | 82 | Early Paginated Articles, Project Details, Sub-Hubs | ~60% Moderate |
| **Depth 4** | 50 | Category Page 2 Articles, Deep Case Studies | ~35% Low |
| **Depth 5 to 31** | 560 | Mid-Archive Articles (Reachable only via sequential pagination) | < 10% Very Low |
| **Depth 100 to 130** | 89 | Deep Automotive & Technology Articles (Page 45–58) | **< 0.1% Virtually Zero** |

### Root Cause of the 130-Click Depth:
1. **Linear Linked-List Pagination:** The blog archive consists of 58 paginated pages. The pagination component (`BlogIndex.tsx` / `pages.js`) only provides `Next Page` and `Previous Page` controls.
2. It lacks numerical jumping blocks (e.g. `1, 2, 3 ... 10, 20, 30, 58`).
3. To reach an article located on Page 45, a crawler starting at `/blog/` must traverse:
   `/blog/` → `?page=2` → `?page=3` → ... → `?page=45` → `Article`.
4. In Google's crawl architecture, Googlebot rarely follows pagination beyond depth 3 or 4 on a new domain with low PageRank. As a result, hundreds of articles are trapped in a crawl discovery dead-zone.

---

## 3. Broken Internal Links (404 Errors Detected Live)

Fourteen internal links point directly to 404 HTTP responses. Every click represents wasted crawl budget and negative quality signals:

| Broken URL | HTTP Status | Inbound Referrers (Discovered On) | Root Cause & Mechanism |
|---|:---:|---|---|
| `https://aniket.app/blog/finance/direct-vs-regular-mutual-funds-in-india-explained/` | **404** | `/work/`<br>`/projects/fundflow-sentinel/` | Stale or mistyped slug referenced in case study copy. |
| `https://aniket.app/blog/technology/build-ai-research-agent-web-search-reports/URL` | **404** | `/blog/technology/build-ai-research-agent-web-search-reports/` | Broken Markdown anchor syntax: `[link text](URL)`. |
| `https://aniket.app/writing/build-ai-research-agent-web-search-reports/URL` | **404** | `/writing/build-ai-research-agent-web-search-reports/` | Identical broken anchor in alternate `/writing/` route. |
| `https://aniket.app/author/index.html` | **404** | `/author/aniket-thakur/` | Relative link `href="index.html"` on `/author/` resolves to `/author/index.html`. |
| `https://aniket.app/author/about.html` | **404** | `/author/aniket-thakur/` | Relative link `href="about.html"` resolves to `/author/about.html`. |
| `https://aniket.app/author/research/index.html` | **404** | `/author/aniket-thakur/` | Relative link `href="research/index.html"` resolves to `/author/research/index.html`. |
| `https://aniket.app/author/work.html` | **404** | `/author/aniket-thakur/` | Relative link `href="work.html"` resolves to `/author/work.html`. |
| `https://aniket.app/author/topics/index.html` | **404** | `/author/aniket-thakur/` | Relative link `href="topics/index.html"` resolves to `/author/topics/index.html`. |
| `https://aniket.app/author/learnings.html` | **404** | `/author/aniket-thakur/` | Relative link `href="learnings.html"` resolves to `/author/learnings.html`. |
| `https://aniket.app/author/topics/graph-neural-networks.html` | **404** | `/author/aniket-thakur/` | Relative link resolves to `/author/topics/graph-neural-networks.html`. |
| `https://aniket.app/author/contact.html` | **404** | `/author/aniket-thakur/` | Relative link `href="contact.html"` resolves to `/author/contact.html`. |
| `https://aniket.app/author/topics/seo-automation.html` | **404** | `/author/aniket-thakur/` | Relative link resolves to `/author/topics/seo-automation.html`. |
| `https://aniket.app/author/topics/artificial-intelligence.html` | **404** | `/author/aniket-thakur/` | Relative link resolves to `/author/topics/artificial-intelligence.html`. |
| `https://aniket.app/author/topics/fintech.html` | **404** | `/author/aniket-thakur/` | Relative link resolves to `/author/topics/fintech.html`. |

**Critical Observation:** Eleven of the 14 broken links stem entirely from un-prefixed relative links on the Author profile template (`/author/aniket-thakur/`). Because the author page is housed in a subdirectory, relative links resolve within `/author/` instead of the root!

---

## 4. Redirecting Internal Links

Eight internal links point to non-canonical URLs that trigger unnecessary HTTP 308 redirects:

| Internal Link Target | Status | Redirects To | Recommended Correction |
|---|:---:|---|---|
| `https://aniket.app/index.html` | 308 | `https://aniket.app/` | Update link to `/` |
| `https://aniket.app/about.html` | 308 | `https://aniket.app/about/` | Update link to `/about/` |
| `https://aniket.app/work.html` | 308 | `https://aniket.app/projects/` | Update link to `/projects/` |
| `https://aniket.app/author/aniket-thakur.html` | 308 | `https://aniket.app/author/aniket-thakur/` | Update link to `/author/aniket-thakur/` |
| `https://aniket.app/contact.html` | 308 | `https://aniket.app/contact/` | Update link to `/contact/` |
| `https://aniket.app/privacy` | 308 | `https://aniket.app/privacy/` | Update link to `/privacy/` |
| `https://aniket.app/blog/auto` | 308 | `https://aniket.app/blog/auto/` | Update link to `/blog/auto/` |
| `https://aniket.app/projects` | 308 | `https://aniket.app/projects/` | Update link to `/projects/` |

---

## 5. Architectural Recommendations to Flatten the Graph

To ensure Googlebot can index all 724 articles within its crawl budget:

1. **Implement Hub-and-Spoke Clustering:**
   - Instead of 58 sequential pages, create thematic topic hubs (e.g. `/blog/auto/eicma-2026/`, `/blog/auto/electric-cars/`, `/blog/technology/ai-agents/`).
   - Feature 20–30 curated articles per topic hub.
2. **Contextual "Related Guides" Cross-Linking:**
   - Every article must contain direct links to 3 to 4 related articles in the same topic cluster.
   - This transforms the linear linked-list into a dense mesh network, cutting maximum click depth from **130 down to ≤ 4**.
3. **Fix Author Page Navigation Links:**
   - Change all relative links (`href="about.html"`, `href="work.html"`) on the author template to absolute paths (`href="/about/"`, `href="/projects/"`).
4. **Fix FundFlow Sentinel Broken Slug:**
   - Correct the mutual fund article reference in `apps/web/app/work/page.tsx` and `apps/web/app/projects/fundflow-sentinel/page.tsx` to an active article URL.
