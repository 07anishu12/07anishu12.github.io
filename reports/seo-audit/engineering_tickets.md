# Prioritized Technical SEO Engineering Tickets

### [P0] SEO-P0-001: TLS/SSL Certificate Name Mismatch on www.aniket.app (ERR_CERT_COMMON_NAME_INVALID)

- **URL:** `https://www.aniket.app/`
- **Severity:** **P0**
- **Evidence:** Direct TLS connection to www.aniket.app fails verification. Served certificate only contains Subject Alternative Name (SAN): 'DNS:aniket.app'. It lacks 'www.aniket.app'. Any user, external backlink, or Googlebot crawl accessing https://www.aniket.app triggers a fatal SSL security error before HTTP redirection can execute.
- **Root Cause:** Vercel custom domain configuration is missing the www.aniket.app domain entry, or Let's Encrypt certificate renewal was completed for the apex domain only without adding the www alias.
- **Recommended Fix:** In Vercel Project Dashboard -> Settings -> Domains, add "www.aniket.app" and configure it to "Redirect to aniket.app". Vercel will provision an SNI-compliant dual-SAN TLS certificate covering both aniket.app and www.aniket.app.
- **Affected Pages (2):**
  - `https://www.aniket.app/`
  - `https://www.aniket.app/*`

---

### [P0] SEO-P0-002: Duplicate Homepage Served on /index.html without 308 Permanent Redirect

- **URL:** `https://aniket.app/index.html`
- **Severity:** **P0**
- **Evidence:** Direct GET https://aniket.app/index.html returns HTTP 200 OK (Content-Length: 39KB) instead of redirecting to /
- **Root Cause:** Vercel static file routing directly serves index.html from the repository root before Next.js routing takes effect, creating split-URL duplicate indexation and dilution of homepage PageRank.
- **Recommended Fix:** Add a permanent 308 redirect from /index.html to / in apps/web/next.config.mjs redirects() configuration and vercel.json.
- **Affected Pages (2):**
  - `https://aniket.app/`
  - `https://aniket.app/index.html`

---

### [P1] SEO-P1-003: Valid Public Pages Discovered via Links but Missing from XML Sitemaps

- **URL:** `https://aniket.app/author/aniket-thakur.html`
- **Severity:** **P1**
- **Evidence:** 22 public 200 OK page(s) (e.g., https://aniket.app/author/aniket-thakur.html, https://aniket.app/contact.html, https://aniket.app/work.html) are accessible via links but not registered in sitemap.xml.
- **Root Cause:** Sitemap generation script tools/seo/sitemap-builder.js omits certain static routes or research articles.
- **Recommended Fix:** Update sitemap-builder.js to automatically include all published research papers, topics, and native routes.
- **Affected Pages (22):**
  - `https://aniket.app/author/aniket-thakur.html`
  - `https://aniket.app/contact.html`
  - `https://aniket.app/work.html`
  - `https://aniket.app/index.html`
  - `https://aniket.app/about.html`
  - *...and 17 more*

---

### [P2] SEO-P2-004: High Volume of Weakly Connected Pages (In-Degree = 1) Vulnerable to Crawl Drops

- **URL:** `https://aniket.app/blog/`
- **Severity:** **P2**
- **Evidence:** 308 pages rely on exactly 1 inbound internal link. Any change in pagination or archive drops them into orphan status.
- **Root Cause:** Deep content relies solely on chronological pagination rather than robust semantic topic clusters and cross-category hubs.
- **Recommended Fix:** Implement automated contextual "Related Articles in this Series" widgets linking to at least 3-4 thematic sibling articles.
- **Affected Pages (25):**
  - `https://aniket.app/blog/technology/how-to-build-an-ai-powered-saas-product-from-scratch/`
  - `https://aniket.app/blog/technology/how-to-build-an-ai-customer-support-system/`
  - `https://aniket.app/blog/technology/how-to-evaluate-monitor-and-debug-llm-applications/`
  - `https://aniket.app/blog/technology/applications-of-artificial-intelligence-in-healthcare/`
  - `https://aniket.app/blog/technology/how-to-build-an-ai-chatbot-using-python-and-llm-apis/`
  - *...and 20 more*

---

### [P3] SEO-P3-005: Page Title Tags Exceeding Recommended SERP Display Limit (65 characters)

- **URL:** `https://aniket.app/research/graph-neural-networks-ecological-modeling.html`
- **Severity:** **P3**
- **Evidence:** 150 page(s) have title tags exceeding 65 characters (e.g., "Graph Neural Networks for Ecological Trophic Dynamics — Aniket Thakur" - 69 chars), causing Google SERP truncation.
- **Root Cause:** Template appends long brand qualifiers or overly verbose headline phrasing to the title tag.
- **Recommended Fix:** Trim title tags to 50-60 characters, keeping primary keywords at the front and concise branding at the end.
- **Affected Pages (30):**
  - `https://aniket.app/research/graph-neural-networks-ecological-modeling.html`
  - `https://aniket.app/research/`
  - `https://aniket.app/blog/technology/ai-inference-bottleneck-serve-llms-faster-cheaper/`
  - `https://aniket.app/blog/technology/deepseek-new-inference-approaches-deepinfer-explained/`
  - `https://aniket.app/blog/auto/best-150cc-bikes-in-india-for-city-riding/`
  - *...and 25 more*

---

### [P3] SEO-P3-006: High Server Response Latency (TTFB > 1200ms)

- **URL:** `https://aniket.app/blog/auto/access-125-vs-activa-125-daily-scooter-comparison/`
- **Severity:** **P3**
- **Evidence:** 1 page(s) exhibited Time To First Byte (TTFB) exceeding 1200ms (e.g. https://aniket.app/blog/auto/access-125-vs-activa-125-daily-scooter-comparison/: 1229ms).
- **Root Cause:** Cold-start edge cache misses or heavy dynamic computation during SSR rendering.
- **Recommended Fix:** Implement edge cache warming or convert static informational routes into pre-rendered static ISR with aggressive Cache-Control s-maxage.
- **Affected Pages (1):**
  - `https://aniket.app/blog/auto/access-125-vs-activa-125-daily-scooter-comparison/`

---

