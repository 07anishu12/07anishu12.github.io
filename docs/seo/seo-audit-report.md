# Technical SEO audit — Phase 1 baseline

**Audit date:** 2026-10-25  
**Repository:** `07anishu12/07anishu12.github.io`  
**Audit branch:** `seo/baseline-audit-2026-10-25` (baseline branch created from `migration/portfolio-lead-platform`)  
**Production URL tested:** `https://aniket.app/`  
**Rollback URL preserved:** `https://07anishu12.github.io/`  
**Status:** `PENDING — Phase 1 baseline only; no SEO implementation fixes started`

## Scope and method

This document records the live-site baseline before Phase 2 changes. The repository was inspected for the framework, routing, metadata, sitemap, robots, schema, content, analytics, and deployment conventions. The application is a Next.js 16 App Router migration in `apps/web`, backed by the existing root static publishing pipeline in `tools/blog/`; the GitHub Pages site remains a rollback deployment.

The production crawl fetched the live sitemap, parsed every sitemap `<loc>`, followed redirects, rendered HTML responses as returned by the server, extracted canonical/robots/title/description/H1/JSON-LD/HTML language/social image metadata, and collected internal `<a>` targets. It then crawled every canonical-host URL discovered from the sitemap or canonical-host HTML links. A rollback-host link was retained in `url-audit.csv` as `UNTESTED` rather than treating the rollback deployment as production content.

## Coverage observed

| Measure | Result |
|---|---:|
| Live sitemap HTTP status | 200 |
| Live sitemap content type | `application/xml` |
| Sitemap `<loc>` entries | 442 |
| Duplicate sitemap `<loc>` values | 0 |
| Malformed sitemap locations | 0 |
| Unique final URLs after resolving sitemap redirects | 438 |
| Sitemap entries that redirect | 18 |
| Sitemap entries with a `noindex` directive | 0 |
| Production URLs requested in crawl | 458 |
| Additional canonical-host URLs found from internal links | 16 |
| Final 2xx responses in production crawl | 458 |
| Final 4xx responses | 0 |
| Final 5xx/fetch errors | 0 |
| Sitemap URLs with zero internal inbound links | 1 |
| URL rows in `url-audit.csv` | 459 |
| Non-canonical rollback-host target recorded | 1, marked `UNTESTED` |

The sitemap contains four duplicate final targets caused by multiple URL forms resolving to the same destination: `/about/`, `/contact/`, `/privacy/`, and `/projects/`. The 18 redirecting sitemap entries include slash-normalization routes and legacy `.html` routes such as `/about.html` and `/work.html`.

## Verified baseline findings

### P1 — Sitemap includes redirecting and duplicate-final URLs

The live sitemap is valid XML and returns HTTP 200, but 18 of 442 entries redirect before serving their final page. The sitemap therefore does not yet contain only final canonical URLs. Four final destinations are represented more than once after redirect resolution. The live XML also still contains `changefreq` and `priority` fields.

**Evidence:** live crawl and `https://aniket.app/sitemap.xml`; URL-level evidence is in `docs/seo/url-audit.csv`.

### P1 — Legacy pages retain GitHub Pages canonicals on the new host

Twenty-two sitemap pages were served from `aniket.app` with canonicals pointing to `https://07anishu12.github.io/...`, including the author page, preserved learnings/research/topic pages, and preserved project HTML pages. These pages are indexable candidates and therefore split the canonical signal between the production hostname and the rollback hostname.

### P1 — `www` TLS/redirect behavior is not clean

`https://www.aniket.app/` failed normal certificate verification in `curl` with a certificate-name mismatch. With certificate verification disabled, it returned a Vercel `307` to `https://aniket.app/`. `http://www.aniket.app/` first returned `308` to `https://www.aniket.app/`, then the `307` to the apex host. The apex HTTP URL returned a `308` to HTTPS and the HTTPS apex returned HTTP 200. The apex is reachable, but the `www` alias has a certificate/chain issue that must be resolved before release verification can be considered complete.

### P1 — Internal content uses mixed route forms

The sitemap and `llms.txt` use legacy `.html` and `index.html` paths for several portfolio, research, learnings, author, and contact links. The final pages often render correctly, but the link graph and discovery files point at redirecting or legacy route forms. The single rollback-host link discovered in canonical production HTML is recorded as `UNTESTED` in the CSV to avoid claiming that rollback content was part of this production crawl.

### P1 — Structured data is uneven across page families

The crawl observed 335 `BlogPosting` and 70 `BreadcrumbList` schema types in sitemap pages. Thirty-seven sitemap HTML pages had no JSON-LD detected, including native portfolio/project/research pages. The native Next.js blog template emits a `BlogPosting` block, while the native project template currently has no project structured data. A consistent site-wide `Person`/`WebSite`/`WebPage` graph was not observed in the rendered native pages.

### P2 — Duplicate titles are present across route aliases and two distinct articles

Duplicate titles were observed for route aliases such as `/about`, `/about.html`, and `/about/`, and for `/projects` and `/work.html`. Two distinct sports-bike article URLs also rendered the same title and description: `best-sports-bikes-under-2-lakh-design-performance` and `best-sports-bikes-under-rs-2-lakh-in-india`. The route-alias duplicates should be addressed by final-URL sitemap/internal-link cleanup; the two article pages require content-intent review before deciding whether to retain, consolidate, or distinguish them.

### P2 — Robots policy is crawlable but has no explicit AI-bot policy

`https://aniket.app/robots.txt` returned HTTP 200 as plain text, allows `/`, disallows `/admin/`, `/tools/`, retired search/feed paths, and declares `Sitemap: https://aniket.app/sitemap.xml`. No accidental site-wide block or `noindex` directive was observed. There are no explicit search-vs-training AI crawler rules yet, so the policy decision requested in Phase 2 is still undocumented.

### P2 — `llms.txt` exists, but its navigation links include redirecting legacy paths

`https://aniket.app/llms.txt` returned HTTP 200 as plain text and contains the portfolio overview, categories, published article links, crawler-file links, and content caveats. Its portfolio section still links to paths such as `/about.html`, `/work.html`, `/research/index.html`, and `/learnings.html`, which are not the final preferred route forms observed by the crawl. This is a maintenance/link-quality issue, not evidence that the file improves rankings or AI citations.

### P2 — One sitemap URL is orphaned in the observed internal graph

`https://aniket.app/finance/bikes` appeared in the sitemap but had zero internal inbound links in the crawl. It should either receive a contextual link from an appropriate page or be reviewed as a separate conversion route before sitemap eligibility is decided. No deletion or `noindex` action is recommended from this baseline alone.

## Repository implementation observations

- `apps/web/next.config.mjs` defines permanent redirects for `.html` routes and uses trailing-slash routing; the live sitemap still lists several redirecting forms.
- `apps/web/app/layout.tsx` supplies `metadataBase`, language `en`, shared navigation, and analytics scripts. Native route files supply titles/descriptions/canonicals, but the native layout does not currently emit a shared JSON-LD graph.
- `apps/web/app/blog/[category]/[slug]/page.tsx` emits `BlogPosting` JSON-LD, but the native page's author object lacks the stable `https://aniket.app/#person` identifier used by the root publishing pipeline.
- `apps/web/app/projects/[slug]/page.tsx` emits title/description/canonical metadata but no `CreativeWork` JSON-LD.
- `tools/blog/pages.js` generates `BlogPosting` and visible breadcrumbs for published static articles. `tools/blog/build.js` preserves existing non-blog sitemap blocks, which is the likely source of legacy route entries and retained `changefreq`/`priority` values.
- Existing analytics files and the GitHub Pages publishing/rollback workflow were not removed or disabled.

## Not measured in Phase 1

The following were intentionally deferred until after the baseline is accepted: Lighthouse mobile/desktop metrics, LCP/CLS/INP lab or field data, browser accessibility automation, image byte/alt/dimension inventory beyond the URL-level metadata crawl, Search Console/GA4 account data, Rich Results Test, Schema.org validator, Vercel preview deployment, production release, and post-fix re-crawl. These are `UNTESTED` for Phase 1.

## Phase 1 artifacts

- `docs/seo/url-audit.csv` — URL-level baseline for 442 sitemap URLs plus 16 canonical-host internal-link discoveries and one recorded rollback-host target.
- `.validation/phase1-baseline.json` — ignored local crawl evidence used to derive the CSV and counts.

The Phase 1 crawl helper was intentionally temporary and removed after generating the artifacts. A maintained repository SEO crawler/validation script is part of Phase 3 and is therefore still `UNTESTED`/pending.

No Phase 2 SEO code, content, routing, sitemap, robots, schema, analytics, DNS, or deployment changes were made in this baseline step.
