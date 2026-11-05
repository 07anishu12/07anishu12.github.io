# REMEDIATION & IMPLEMENTATION PLAN — PHASE 2

**Target Platform:** `https://aniket.app`  
**Execution Phase:** Phase 2 (Awaiting Owner Review & Approval of Phase 1 Forensic Audit)  
**Safety Protocol:** Strict Read-Only enforced during Phase 1. Zero code or infrastructure modifications will occur until this plan is formally approved.  

---

## 1. Remediation Sequence & Priority Matrix

| Priority | Ticket ID | Remediation Objective | Target Files / Services | Expected SEO Impact | Risk Level |
|:---:|---|---|---|---|:---:|
| **P0** | **SEO-P0-01** | Provision Valid Dual-SAN SSL Certificate for `www.aniket.app` | Vercel Project Dashboard & Name.com DNS | Restores access for crawlers/users on www; eliminates fatal TLS errors | Low |
| **P0** | **SEO-P0-02** | Deconflict Legacy GitHub Pages Mirror (`07anishu12.github.io`) | GitHub Pages / `07anishu12.github.io` `main` branch | Transfers accumulated indexing authority to aniket.app; halts duplicate penalization | Low |
| **P1** | **SEO-P1-03** | Resolve Blog Pagination Self-Canonicalization Conflict | `apps/web/app/blog/page.tsx`, `components/BlogIndex.tsx` | Enables Googlebot to follow and index article links on pages 2–58 | Low |
| **P1** | **SEO-P1-04** | Fix 14 Broken Internal Links (Author page & Project pages) | `tools/blog/templates/`, `apps/web/app/work/page.tsx` | Eliminates crawl budget waste and soft/hard 404 penalties | Very Low |
| **P2** | **SEO-P2-05** | Flatten Crawl Depth from 130 to ≤ 4 (Thematic Clustering) | `components/BlogIndex.tsx`, `components/Pagination.tsx` | Allows Googlebot to reach deep articles without exhausting crawl budget | Low |
| **P2** | **SEO-P2-06** | Fix Redirecting Internal Links & Schema Hardcoded .html | `tools/blog/content.js`, navigation components | Removes 308 redirect overhead for Googlebot and aligns JSON-LD schema | Very Low |
| **P3** | **SEO-P3-07** | Permanent 308 Redirect for `/blog/page/1/` → `/blog/` | `apps/web/next.config.mjs` | Eliminates 404 error on initial pagination path | Zero |

---

## 2. Detailed Technical Ticket Specifications

---

### [P0] SEO-P0-01: Fix `www.aniket.app` TLS Certificate Mismatch

#### Exact Root Cause:
`www.aniket.app` resolves to Vercel IP `76.76.21.123` via CNAME `cname.vercel-dns.com`. However, Vercel's edge serves a certificate whose Subject Alternative Name (SAN) only contains `aniket.app`. Browsers and search crawlers abort the connection with `ERR_CERT_COMMON_NAME_INVALID` before HTTP redirects can execute.

#### Proposed Changes:
1. **Name.com Registrar DNS Management:**
   - Add/verify `TXT` record: `_vercel.www` → `vc-domain-verify=www.aniket.app,701b6b5c6da1d8bba223`.
   - Verify `CNAME` record: `www` → `cname.vercel-dns.com.`.
2. **Vercel Project Dashboard (`07anishu12.github.io`):**
   - Under Settings → Domains, ensure `www.aniket.app` is added with status "Valid Configuration".
   - Set redirect target: "Redirect to aniket.app" with HTTP 308.
   - Trigger certificate generation to produce a dual-SAN certificate (`aniket.app` and `www.aniket.app`).

#### Verification:
```bash
curl -Iv https://www.aniket.app/ 2>&1 | grep -E "Server certificate|SSL connection|HTTP/"
# Expected: TLS 1.3 handshake success with SAN containing www.aniket.app, followed by HTTP/2 308 to https://aniket.app/
```

#### Rollback Strategy:
Remove `www.aniket.app` entry from Vercel dashboard and revert DNS CNAME if errors persist.

---

### [P0] SEO-P0-02: Deconflict Legacy GitHub Pages Mirror (`07anishu12.github.io`)

#### Exact Root Cause:
`https://07anishu12.github.io/` remains live on branch `main`, actively returning HTTP 200 with 549 pages declaring self-referential canonical tags. Google perceives two competing websites with identical content and defaults to indexing the older, established GitHub Pages domain while withholding indexation from `aniket.app`.

#### Proposed Changes:
1. **Option A (Preferred — Full 301 Transfer):**
   - Replace root HTML files on `origin/main` of `07anishu12/07anishu12.github.io` with a universal canonical forwarding template or configure GitHub Pages custom domain / repository CNAME redirect to `aniket.app`.
   - Add `<meta http-equiv="refresh" content="0; url=https://aniket.app/">` and JavaScript `window.location.replace("https://aniket.app" + window.location.pathname);`.
2. **Option B (Cross-Domain Canonicalization):**
   - Update canonical tags on `07anishu12.github.io` to point cross-domain to `https://aniket.app/`:
     `<link rel="canonical" href="https://aniket.app/">`
   - Add `<meta name="robots" content="noindex, follow">` to GitHub Pages to gracefully sunset it from Google search results.

#### Verification:
```bash
curl -I https://07anishu12.github.io/
# Expected: Either 301/308 redirect to aniket.app or HTML header pointing cross-domain canonical to https://aniket.app/
```

#### Rollback Strategy:
Re-run git checkout on `main` to restore previous static files if needed.

---

### [P1] SEO-P1-03: Resolve Blog Pagination Self-Canonicalization Conflict

#### Exact Root Cause:
`apps/web/app/blog/page.tsx` line 17 hardcodes `alternates: { canonical: "/blog/" }`. Every paginated archive (`/blog/?page=2` to `58`) emits `<link rel="canonical" href="https://aniket.app/blog/">`. Google interprets all pages as duplicates of Page 1 and discards the internal links on pages 2–58.

#### Proposed Changes:
1. **In `apps/web/app/blog/page.tsx`:**
   Update `generateMetadata` to accept `searchParams` and dynamically generate clean self-canonical tags:
   ```typescript
   export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
     const resolvedParams = searchParams ? await searchParams : {};
     const page = Math.max(1, parseInt(resolvedParams.page || "1", 10) || 1);
     const canonicalUrl = page === 1 ? "/blog/" : `/blog/?page=${page}`;
     return {
       // ... existing metadata
       alternates: { canonical: canonicalUrl },
     };
   }
   ```
2. Update category page `apps/web/app/blog/[category]/page.tsx` with identical dynamic canonical logic.

#### Verification:
```bash
curl -s "https://aniket.app/blog/?page=2" | grep -i '<link rel="canonical"'
# Expected: <link rel="canonical" href="https://aniket.app/blog/?page=2"/>
```

#### Rollback Strategy:
Revert `generateMetadata` in `apps/web/app/blog/page.tsx`.

---

### [P1] SEO-P1-04: Fix 14 Broken Internal Links (Author Page & Case Studies)

#### Exact Root Cause:
1. Author profile page template in `tools/blog/templates/author.html` (and static artifact in `apps/web/public/author/aniket-thakur/index.html`) uses relative links (`href="about.html"`, `href="work.html"`). Because the page resides in `/author/aniket-thakur/`, the browser resolves them to `/author/about.html` (HTTP 404).
2. FundFlow Sentinel case study and `/work/` page link to `/blog/finance/direct-vs-regular-mutual-funds-in-india-explained/` which does not exist in `data/blog/finance/`.
3. An unescaped Markdown syntax `[link text](URL)` in `data/blog/technology/build-ai-research-agent-web-search-reports.md` renders an anchor pointing to `/URL`.

#### Proposed Changes:
1. **Fix Author Page Template (`tools/blog/pages.js`):**
   Change relative links to root-relative paths:
   - `href="about.html"` → `href="/about/"`
   - `href="work.html"` → `href="/projects/"`
   - `href="contact.html"` → `href="/contact/"`
   - `href="learnings.html"` → `href="/learnings/"`
   - `href="topics/..."` → `href="/topics/..."`
2. **Fix FundFlow Sentinel Reference:**
   In `apps/web/app/work/page.tsx` and `apps/web/app/projects/fundflow-sentinel/page.tsx`, update the href to an active finance article (e.g. `/blog/finance/mutual-fund-overlap-calculator-guide/`).
3. **Fix Markdown Syntax in AI Research Agent Article:**
   In `data/blog/technology/build-ai-research-agent-web-search-reports.md`, replace placeholder `(URL)` with a valid external documentation URL.

#### Verification:
Run crawl test over `/author/aniket-thakur/` and `/work/`; confirm 0 broken links.

---

### [P2] SEO-P2-05: Flatten Crawl Depth from 130 to ≤ 4 (Thematic Clustering)

#### Exact Root Cause:
Sequential pagination requires 58 continuous hops. Googlebot stops following deep pagination after 3–4 clicks, leaving over 500 articles unreachable via normal crawl paths.

#### Proposed Changes:
1. **Implement Compact Pagination Blocks:**
   Update `components/BlogIndex.tsx` to include direct jumps:
   `[1] [2] [3] [4] [5] ... [10] [20] [30] ... [Last]`
2. **Contextual Cross-Linking (Related Guides Widget):**
   In `apps/web/app/blog/[category]/[slug]/page.tsx`, render a "Related Technical Guides" section featuring 3–4 related articles from the same category.

#### Verification:
Re-run crawl graph analyzer; confirm maximum click depth drops from 130 to ≤ 4.

---

### [P2] SEO-P2-06: Fix Redirecting Internal Links & Hardcoded Author Schema

#### Exact Root Cause:
`tools/blog/content.js` lines 11 and 22 declare:
`url: '${ORIGIN}/author/aniket-thakur.html'`
This emits a 308-redirecting URL in JSON-LD structured data on all 700+ articles instead of the canonical `/author/aniket-thakur/`.

#### Proposed Changes:
1. In `tools/blog/content.js`, change:
   `url: `${ORIGIN}/author/aniket-thakur.html`` → `url: `${ORIGIN}/author/aniket-thakur/``
2. In navigation components, replace links to `/index.html`, `/about.html`, `/work.html`, `/contact.html` with canonical trailing-slash targets.

#### Verification:
Check schema validator output; verify `Person` `@id` and `url` point directly to `https://aniket.app/author/aniket-thakur/` without triggering HTTP redirects.

---

### [P3] SEO-P3-07: Add 308 Permanent Redirect for `/blog/page/1/` → `/blog/`

#### Exact Root Cause:
`next.config.mjs` rewrites `/blog/page/:page` to `/blog/page/:page/index.html`. For page 1, this file does not exist, generating an unexpected 404 for `/blog/page/1/`.

#### Proposed Changes:
In `apps/web/next.config.mjs`, add a permanent redirect rule:
```javascript
{
  source: "/blog/page/1",
  destination: "/blog/",
  permanent: true,
},
{
  source: "/blog/page/1/",
  destination: "/blog/",
  permanent: true,
}
```

#### Verification:
`curl -I https://aniket.app/blog/page/1/` returns HTTP 308 with `Location: /blog/`.

---

## 3. End-to-End Validation Protocol

After owner approval and implementation, execute the following validation sequence before declaring Phase 2 complete:

```bash
# 1. Monorepo Quality Suite
pnpm run lint
pnpm test
pnpm --filter @portfolio/web typecheck
pnpm run seo:validate

# 2. Network Infrastructure Validation
curl -Iv https://www.aniket.app/
curl -I http://www.aniket.app/
curl -I https://aniket.app/index.html
curl -I https://07anishu12.github.io/

# 3. Post-Deployment Live Crawl
node tools/crawler/server.js
# Verify 0 broken links, 0 canonical conflicts, and 100% sitemap agreement
```
