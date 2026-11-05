# CANONICALIZATION, REDIRECT & DOMAIN VARIANT AUDIT

**Audit Date:** November 6, 2026  
**Audited Target:** `https://aniket.app` and associated hosts  
**Test Suite:** 35 Empirical Live Network Probes (HTTP/HTTPS, Apex/WWW, Slashing, Extensions, Cases, Queries)  
**Audit Status:** COMPLETE — 2 Critical P0 Infrastructure Vulnerabilities Identified  

---

## 1. Executive Summary & Critical Root Causes Found

This investigation uncovered two critical infrastructure defects that directly explain Google Search Console crawl drop-offs, canonical confusion, and split indexation:

1. **[P0 CRITICAL] TLS/SSL Certificate Name Mismatch on `www.aniket.app`:**
   Direct HTTPS requests to `https://www.aniket.app/` fail during the TLS handshake with `ERR_CERT_COMMON_NAME_INVALID` (`curl: (60) SSL: no alternative certificate subject name matches target host name 'www.aniket.app'`).
   - The TLS certificate served by Vercel only contains Subject Alternative Name (SAN): `DNS:aniket.app`. It omits `www.aniket.app`.
   - Furthermore, `http://www.aniket.app/` 308-redirects to `https://www.aniket.app/`, sending all plain HTTP traffic directly into the fatal SSL security wall!
   - Any external backlink, crawler, or user accessing `www.aniket.app` is blocked before HTTP redirects can execute.

2. **[P0 CRITICAL] Active Ghost Domain on GitHub Pages (`07anishu12.github.io`):**
   The legacy domain `https://07anishu12.github.io/` is **STILL LIVE** (returning `HTTP/2 200 OK`).
   - It is actively serving 549 pages.
   - It publishes self-referential canonical tags (`<link rel="canonical" href="https://07anishu12.github.io/">`).
   - It has `<meta name="robots" content="index, follow">`.
   - It does **not** 301/308 redirect to `https://aniket.app/`.
   - **Google Search Impact:** Google crawled and indexed `07anishu12.github.io` first. When `aniket.app` launched with near-identical content, Google detected duplicate content across two separate domains with competing canonical tags. Without 301 redirect consolidation or cross-domain canonicals, Google refuses to index the new domain.

3. **[P1 HIGH] Pagination Canonical Self-Conflicting Signals:**
   All paginated blog archive views (`https://aniket.app/blog/?page=2` through `?page=58`) declare:
   `<link rel="canonical" href="https://aniket.app/blog/">`.
   - This explicitly instructs Google that paginated archives are duplicate copies of page 1.
   - Google classifies them as *"Alternate page with proper canonical tag"* and deprioritizes crawling internal links found on pages 2 through 58.

---

## 2. Infrastructure Variation Test Matrix (35 Empirical Probes)

The following matrix records the exact network behavior observed across all tested URL permutations:

| Variation Tested | Requested URL | Status Code | Redirect Hop(s) | Final Destination | Canonical Tag Received | Verdict / Severity |
|---|---|:---:|---|---|---|:---:|
| **Apex HTTP Root** | `http://aniket.app/` | 308 | `http://aniket.app/` → `https://aniket.app/` | `https://aniket.app/` | `https://aniket.app/` | **PASS** |
| **WWW HTTP Root** | `http://www.aniket.app/` | 308 → FAIL | `http://www.aniket.app/` → `https://www.aniket.app/` | `https://www.aniket.app/` | *None (TLS Error)* | **P0 FATAL** |
| **Apex HTTPS Root** | `https://aniket.app/` | 200 | *Direct* | `https://aniket.app/` | `https://aniket.app/` | **PASS** |
| **WWW HTTPS Root** | `https://www.aniket.app/` | 0 (SSL) | *Handshake failed* | `https://www.aniket.app/` | *None (ERR_CERT)* | **P0 FATAL** |
| **Duplicate Root /index.html** | `https://aniket.app/index.html` | 308 | `/index.html` → `/` | `https://aniket.app/` | `https://aniket.app/` | **PASS** |
| **Trailing Slash: /about** | `https://aniket.app/about` | 308 | `/about` → `/about/` | `https://aniket.app/about/` | `https://aniket.app/about/` | **PASS** |
| **Trailing Slash: /about/** | `https://aniket.app/about/` | 200 | *Direct* | `https://aniket.app/about/` | `https://aniket.app/about/` | **PASS** |
| **Legacy HTML: /about.html** | `https://aniket.app/about.html` | 308 | `/about.html` → `/about/` | `https://aniket.app/about/` | `https://aniket.app/about/` | **PASS** |
| **Legacy HTML: /work.html** | `https://aniket.app/work.html` | 308 | `/work.html` → `/projects/` | `https://aniket.app/projects/` | `https://aniket.app/projects/` | **PASS** |
| **Native Route: /work/** | `https://aniket.app/work/` | 200 | *Direct* | `https://aniket.app/work/` | `https://aniket.app/work/` | **PASS** |
| **Trailing Slash: /projects** | `https://aniket.app/projects` | 308 | `/projects` → `/projects/` | `https://aniket.app/projects/` | `https://aniket.app/projects/` | **PASS** |
| **Trailing Slash: /projects/** | `https://aniket.app/projects/` | 200 | *Direct* | `https://aniket.app/projects/` | `https://aniket.app/projects/` | **PASS** |
| **Detail: /projects/signal-desk** | `https://aniket.app/projects/signal-desk` | 308 | `...signal-desk` → `...signal-desk/` | `...signal-desk/` | `...signal-desk/` | **PASS** |
| **Detail: /projects/signal-desk/** | `https://aniket.app/projects/signal-desk/` | 200 | *Direct* | `...signal-desk/` | `...signal-desk/` | **PASS** |
| **Trailing Slash: /blog** | `https://aniket.app/blog` | 308 | `/blog` → `/blog/` | `https://aniket.app/blog/` | `https://aniket.app/blog/` | **PASS** |
| **Trailing Slash: /blog/** | `https://aniket.app/blog/` | 200 | *Direct* | `https://aniket.app/blog/` | `https://aniket.app/blog/` | **PASS** |
| **Taxonomy: /blog/auto** | `https://aniket.app/blog/auto` | 308 | `/blog/auto` → `/blog/auto/` | `https://aniket.app/blog/auto/` | `https://aniket.app/blog/auto/` | **PASS** |
| **Taxonomy: /blog/auto/** | `https://aniket.app/blog/auto/` | 200 | *Direct* | `https://aniket.app/blog/auto/` | `https://aniket.app/blog/auto/` | **PASS** |
| **Article: Non-slash** | `https://aniket.app/blog/auto/10-global-...-2026` | 308 | `...2026` → `...2026/` | `...2026/` | `...2026/` | **PASS** |
| **Article: Canonical** | `https://aniket.app/blog/auto/10-global-...-2026/` | 200 | *Direct* | `...2026/` | `...2026/` | **PASS** |
| **Article: Spurious .html** | `https://aniket.app/blog/auto/10-global-...-2026.html` | 404 | *Direct* | `...2026.html` | `https://aniket.app/` | **PASS** (Correct 404) |
| **Author: Non-slash** | `https://aniket.app/author/aniket-thakur` | 308 | `...thakur` → `...thakur/` | `...thakur/` | `...thakur/` | **PASS** |
| **Author: Canonical** | `https://aniket.app/author/aniket-thakur/` | 200 | *Direct* | `...thakur/` | `...thakur/` | **PASS** |
| **Author: Legacy .html** | `https://aniket.app/author/aniket-thakur.html` | 308 | `...thakur.html` → `...thakur/` | `...thakur/` | `...thakur/` | **PASS** |
| **Research: Static Paper** | `https://aniket.app/research/graph-neural-...html` | 200 | *Direct* | `...modeling.html` | `...modeling.html` | **PASS** |
| **Research: Directory** | `https://aniket.app/research` | 308 | `/research` → `/research/` | `https://aniket.app/research/` | `https://aniket.app/research/` | **PASS** |
| **Tool: /finance/bikes** | `https://aniket.app/finance/bikes` | 308 | `...bikes` → `...bikes/` | `...bikes/` | `...bikes/` | **PASS** |
| **Tool: /finance/bikes/** | `https://aniket.app/finance/bikes/` | 200 | *Direct* | `...bikes/` | `...bikes/` | **PASS** |
| **Uppercase: /About/** | `https://aniket.app/About/` | 404 | *Direct* | `https://aniket.app/About/` | `https://aniket.app/` | **PASS** (No loop) |
| **Uppercase: /BLOG/** | `https://aniket.app/BLOG/` | 404 | *Direct* | `https://aniket.app/BLOG/` | `https://aniket.app/` | **PASS** (No loop) |
| **Query Parameter: UTM** | `https://aniket.app/?utm_source=google` | 200 | *Direct* | `https://aniket.app/?utm_source=google` | `https://aniket.app/` | **PASS** (Strips query) |
| **Query Parameter: Blog Search** | `https://aniket.app/blog/?q=ai` | 200 | *Direct* | `https://aniket.app/blog/?q=ai` | `https://aniket.app/blog/` | **PASS** (Strips query) |
| **Pagination: Page 1** | `https://aniket.app/blog/page/1/` | 404 | *Direct* | `https://aniket.app/blog/page/1/` | `https://aniket.app/` | **P3 DEFECT** (Should 308 to /blog/) |
| **Pagination: Page 2 (Path)** | `https://aniket.app/blog/page/2/` | 200 | *Direct* | `https://aniket.app/blog/page/2/` | `https://aniket.app/blog/page/2/` | **PASS** |
| **Pagination: Page 2 (Query)** | `https://aniket.app/blog/?page=2` | 200 | *Direct* | `https://aniket.app/blog/?page=2` | `https://aniket.app/blog/` | **P1 CONFLICT** |

---

## 3. Deep-Dive on Confirmed Issues

### A. The WWW TLS Failure Mechanism
1. DNS resolution for `www.aniket.app` points to Vercel's Anycast proxy: `cname.vercel-dns.com` (`76.76.21.123`).
2. When a TLS client initiates the ClientHello with SNI `www.aniket.app`, Vercel's edge presents a certificate issued by Let's Encrypt with Subject: `CN=aniket.app` and SAN: `aniket.app`.
3. Because `www.aniket.app` is not in the SAN list, browser and crawler TLS validation aborts immediately.
4. **Vercel Configuration Cause:** `www.aniket.app` was entered into `vercel.json` as a redirect target, but was not fully verified with a dedicated certificate in the Vercel Project Dashboard (Settings → Domains).

### B. The GitHub Pages Split-Domain Collision
1. Host `07anishu12.github.io` is actively maintained by GitHub Pages on branch `main`.
2. GSC Performance report shows 3,050 impressions and 8 clicks. These metrics likely reflect historical rankings accumulated by the GitHub Pages property.
3. Because `07anishu12.github.io` was not 301-redirected to `https://aniket.app`, Googlebot treats `aniket.app` as an unverified mirror domain attempting to scrape or duplicate `07anishu12.github.io`.
4. In Google's deduplication algorithm, when two identical pages exist on different domains without cross-domain canonicals or 301 redirects, Google chooses the older, more authoritative domain (`07anishu12.github.io`) as the canonical version and drops the newer domain (`aniket.app`) from the search index.

---

## 4. Recommended Remediations

1. **[P0] In Vercel Project Settings → Domains:**
   - Add `www.aniket.app`.
   - Set redirect to `aniket.app`.
   - Complete DNS verification at Name.com so Vercel generates a dual-SAN TLS certificate.
2. **[P0] On GitHub Pages (`07anishu12.github.io`):**
   - Configure a client-side HTTP/meta refresh or repository CNAME redirect to `https://aniket.app/`.
   - Alternatively, add cross-domain canonical tags on `07anishu12.github.io` pointing to `https://aniket.app/` to transfer indexing authority.
3. **[P1] In `apps/web/app/blog/page.tsx`:**
   - Update `generateMetadata` to declare self-referential canonicals for paginated views (e.g. `/blog/?page=${page}` canonicalizing to itself or using clean path `/blog/page/${page}/`), or adopt Google's recommended rel="next"/rel="prev" or unified archive pattern.
4. **[P3] In `apps/web/next.config.mjs`:**
   - Add redirect: `/blog/page/1/` → `/blog/` (308 permanent redirect).
