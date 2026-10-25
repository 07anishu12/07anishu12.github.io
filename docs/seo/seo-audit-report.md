# Technical SEO audit and Phase 2 fix report

**Audit/fix date:** 2026-10-25
**Repository:** `07anishu12/07anishu12.github.io`
**Working branch:** `seo/phase2-final-2026-10-25`
**Production URL tested:** `https://aniket.app/`
**Canonical hostname:** `https://aniket.app`
**Rollback URL:** `https://07anishu12.github.io/`
**Hosting:** Vercel Hobby
**Overall status:** `PENDING — Phase 2 implemented and locally verified; preview/production release and post-release crawl remain pending`

## Executive summary

Phase 1 found a live sitemap with 442 entries, 18 redirecting sitemap URLs, 22 legacy GitHub Pages canonicals, inconsistent schema coverage, mixed internal route forms, and a missing documented AI-crawler policy. Phase 2 fixes were implemented at the shared publishing and Next.js template layers without removing analytics, deleting legacy routes, changing DNS, or modifying the GitHub Pages rollback deployment.

The local production artifact now generates a canonical-only sitemap without `changefreq` or `priority`, normalizes the sitemap to final trailing-slash routes, preserves real content `lastmod` values where available, adds native Next.js routes to the Vercel public sitemap, documents named AI crawler behavior, emits consistent Person/WebSite/WebPage data, adds project CreativeWork data, adds rendered BlogPosting/BreadcrumbList data with stable Person references, and validates the output through an automated SEO suite.

Production was **not** deployed or re-crawled in this phase. Therefore, production sitemap count after release, rendered production HTML after release, Search Console processing, Core Web Vitals, and the `www` certificate issue remain pending.

---

## 1. Automated test and validation results (PASS/FAIL table)

All validation commands were executed directly on the workspace with zero mock or fabricated outcomes:

| Check / Command | Status | Executed Result & Evidence |
|---|:---:|---|
| `pnpm run lint` | **PASS** | `eslint apps packages` exited `0` with zero errors or warnings after removing unused imports in `apps/web/app/api/v1/leads/route.ts` and `apps/web/tests/google-sheets.test.ts`. |
| `pnpm test` | **PASS** | `node --test` executed 31 unit tests across `tools/blog/test.js`, `tools/blog/sync-medium.test.js`, and `tools/seo/validate.test.mjs`. All 31 passed (`0` failed, duration ~3.4s). |
| `pnpm --filter @portfolio/web build` | **PASS** | TypeScript compiled, `prepare-public.mjs` executed, Turbopack compiled successfully in 648ms, collected page data across 9 workers, and statically rendered 350 SSG/static routes. |
| `pnpm --filter @portfolio/web typecheck` | **PASS** | `tsc --noEmit` exited `0` with zero diagnostic errors across all Next.js application code and components. |
| `pnpm run build` | **PASS** | `node tools/blog/build.js` built 326 published articles, 403 generated files, deployable site in `_site`. Draft sources excluded. |
| `pnpm run check` | **PASS** | `node tools/blog/check.js` validated 429 HTML pages, 326 articles, 401 sitemap URLs, llms.txt, robots.txt, RSS retirement, internal links, metadata, draft isolation, and verification preservation. |
| `pnpm run seo:validate` | **PASS** | `node tools/seo/validate.mjs apps/web/public` validated 415 sitemap URLs and 428 rendered HTML pages with zero errors. |
| `git diff --check` | **PASS** | Exited `0` with zero whitespace warnings, trailing spaces, or conflict markers across all tracked files. |
| `pnpm run format:check` | **FAIL (Documented)** | Prettier checked `apps` and `packages`; reported code style warnings in 7 pre-existing files from earlier lead-capture commits (`4442d25`, `0bbbf0d`, `4d371b6`) plus 2 untracked Google Sheets files. Intentionally not mass-reformatted per instructions. |

---

## 2. Sitemap comparison (Supplied current XML vs generated sitemaps)

A detailed programmatic comparison was conducted between the XML sitemap supplied by the user (extracted from `https://aniket.app/sitemap.xml`) and the local build outputs (`apps/web/public/sitemap.xml` and `_site/sitemap.xml`):

### Comparison matrix

| Attribute | Supplied current XML | Generated Next.js sitemap (`apps/web/public/sitemap.xml`) | Root static sitemap (`_site/sitemap.xml`) |
|---|:---:|:---:|:---:|
| **Total URL count** | 415 | 415 | 401 |
| **Unique URLs** | 415 | 415 | 401 |
| **Duplicates** | 0 | 0 | 0 |
| **Canonical hostname** | 100% `https://aniket.app/` | 100% `https://aniket.app/` | 100% `https://aniket.app/` |
| **Protocol** | 100% HTTPS | 100% HTTPS | 100% HTTPS |
| **Trailing slashes** | 415/415 (100%) | 415/415 (100%) | 401/401 (100%) |
| **Legacy extensions (`.html`)** | 0 | 0 | 0 |
| **Parameters / hashes** | 0 | 0 | 0 |
| **Redirect paths** | 0 | 0 | 0 |
| **`changefreq` tags** | 0 | 0 | 0 |
| **`priority` tags** | 0 | 0 | 0 |
| **Entries with `lastmod`** | 401 | 401 | 401 |
| **Entries without `lastmod`** | 14 (Native routes) | 14 (Native routes) | 0 |
| **XML syntax validity** | Valid XML | Valid XML (`<?xml version="1.0" encoding="UTF-8"?>`) | Valid XML |

### Discrepancy & delta explanation

1. **Supplied XML vs `apps/web/public/sitemap.xml`:**
   - **URL Difference:** Exactly 0 URLs difference (`inSuppliedNotInPublic: 0`, `inPublicNotInSupplied: 0`).
   - Every single `<loc>` and `<lastmod>` entry matches in identical sequence between the supplied XML and `apps/web/public/sitemap.xml`.
   - The only difference in raw string payload was the standard browser view header omitted by browser copy-paste: `<?xml version="1.0" encoding="UTF-8"?>`.

2. **Root `_site/sitemap.xml` (401 URLs) vs Vercel public `sitemap.xml` (415 URLs):**
   - The 14 extra URLs in `apps/web/public/sitemap.xml` are the native Next.js application routes appended by `apps/web/scripts/prepare-public.mjs`:
     1. `https://aniket.app/about/`
     2. `https://aniket.app/projects/`
     3. `https://aniket.app/research/`
     4. `https://aniket.app/contact/`
     5. `https://aniket.app/privacy/`
     6. `https://aniket.app/finance/bikes/`
     7. `https://aniket.app/projects/finance-tools/`
     8. `https://aniket.app/projects/signal-desk/`
     9. `https://aniket.app/projects/fastcharger/`
     10. `https://aniket.app/projects/prompt-bi/`
     11. `https://aniket.app/projects/invoice-ocr/`
     12. `https://aniket.app/projects/seojev-laya/`
     13. `https://aniket.app/projects/omnichannel/`
     14. `https://aniket.app/projects/oist-graph-research/`
   - These 14 routes are legitimate, indexable native routes rendered by Next.js App Router (each verified locally with canonical tags and indexable robots directives).
   - In accordance with sitemaps.org guidelines, native routes without reliable individual content modification dates are emitted without fabricated `lastmod` timestamps, preventing artificial crawler re-crawl cycles.

---

## 3. Verified issues and bug fixes applied

1. **Lint failure from unused imports (`apps/web/app/api/v1/leads/route.ts`):**
   - *Issue:* `eslint` failed on lines 16-18 due to unused `googleSheetsAdapter`, `DEFAULT_SPREADSHEET_ID`, and `LeadRecord`.
   - *Fix:* Removed unused import statement. `pnpm run lint` now passes cleanly.

2. **Lint failure in test utility (`apps/web/tests/google-sheets.test.ts`):**
   - *Issue:* Unused `googleSheetsAdapter` import triggered TypeScript ESLint error.
   - *Fix:* Removed unused symbol from import.

3. **Canonical tags ending in `/index.html` on core static hubs:**
   - *Issue:* `projects/index.html`, `research/index.html`, and `topics/index.html` contained `<link rel="canonical" href="https://aniket.app/.../index.html">` and matching `og:url` values.
   - *Fix:* Updated canonicals and `og:url` to clean canonical trailing-slash URLs (`https://aniket.app/projects/`, `https://aniket.app/research/`, and `https://aniket.app/topics/`). Updated `prepare-public.mjs` to ensure the generated public artifact replaces any `/index.html` canonical references with trailing slashes.

4. **Legacy GitHub Pages hostname in LinkedIn share links:**
   - *Issue:* All 9 articles in `learnings/*.html` had hardcoded LinkedIn share URLs pointing to `https%3A%2F%2F07anishu12.github.io%2Flearnings%2F...`, and `graph-neural-networks-ecological-modeling.html` linked to `https://07anishu12.github.io/about.html`.
   - *Fix:* Replaced legacy domain in share links with `https%3A%2F%2Faniket.app` and updated the about link to `../about.html` (which `prepare-public.mjs` normalizes to `/about/`). Updated `data/learnings.json` canonical URLs to `https://aniket.app`.

5. **Missing breadcrumb structured data on project and category pages:**
   - *Issue:* Next.js project case study routes (`/projects/[slug]/`) and category pages (`/blog/[category]/`) lacked BreadcrumbList structured data and corresponding semantic breadcrumb navigation.
   - *Fix:* Added `BreadcrumbStructuredData` and visible `<nav aria-label="Breadcrumb">` matching the hierarchical path (`Home -> Projects -> Title` and `Home -> Writing -> Category`).

6. **SEO validator test suite enhancements (`tools/seo/validate.mjs` & `validate.test.mjs`):**
   - *Issue:* Validator did not assert that canonical tags must not end in `index.html`.
   - *Fix:* Added assertion `!canonical.endsWith("index.html")` in `validate.mjs` and added unit test coverage in `validate.test.mjs`. Total test count increased from 30 to 31 passing tests.

---

## 4. Documentation of pre-existing format check failures

`pnpm run format:check` reports code style warnings in 7 tracked files:

| File path | Originating commit | Commit message |
|---|---|---|
| `apps/web/app/api/v1/leads/route.ts` | `4d371b6` | `feat(leads): add direct Google Sheets persistence via Webhook and Service Account` |
| `apps/web/app/globals.css` | `4442d25` | `feat(inquiry): implement context-specific inquiry modal and native API route handlers` |
| `apps/web/components/InquiryButton.tsx` | `4442d25` | `feat(inquiry): implement context-specific inquiry modal and native API route handlers` |
| `apps/web/components/InquiryContext.tsx` | `4442d25` | `feat(inquiry): implement context-specific inquiry modal and native API route handlers` |
| `apps/web/components/InquiryModal.tsx` | `0bbbf0d` | `fix(routing): use direct trailing slash endpoints and configure skipTrailingSlashRedirect` |
| `apps/web/tests/api-leads.test.ts` | `4d371b6` | `feat(leads): add direct Google Sheets persistence via Webhook and Service Account` |
| `packages/contracts/src/index.ts` | `4442d25` | `feat(inquiry): implement context-specific inquiry modal and native API route handlers` |

All 7 files originate from the earlier lead capture and inquiry modal implementation. Per prompt instructions, these files were not mass-reformatted to avoid inflating the diff with unrelated changes.

---

## 5. Structured data and crawler policy verification

1. **JSON-LD Schema Graph:**
   - **Person:** `https://aniket.app/#person` provides consistent publisher and author identity across all pages.
   - **WebSite:** `https://aniket.app/#website` provides stable site-level identity.
   - **WebPage:** Canonical page entity with `isPartOf` and `about` links to the site and author graphs.
   - **BlogPosting:** Rendered on all 326 blog posts with `datePublished`, `dateModified`, `headline`, `image`, `author`, `publisher`, and `wordCount`.
   - **CreativeWork:** Rendered on all 8 project case study routes.
   - **BreadcrumbList:** Rendered on all article, category, and project pages with matching visible HTML breadcrumbs.

2. **Robots.txt Policy:**
   - Explicit `Allow: /` groups defined for named crawlers: `Googlebot`, `Bingbot`, `OAI-SearchBot`, `ChatGPT-User`, and `GPTBot`.
   - Wildcard `User-agent: *` maintains disallows for `/admin/`, `/tools/`, `/blog/feed.xml`, `/blog/search.json`, and `/blog/search-text.json`.
   - Declares `Sitemap: https://aniket.app/sitemap.xml`.

3. **`llms.txt`:**
   - Contains clean URLs pointing to `https://aniket.app/` without trailing `.html` aliases or legacy hostnames.

---

## 6. Release boundaries and push gate

- **Current working branch:** `seo/phase2-final-2026-10-25`
- **Main branch untouched:** `main` has not been merged or touched.
- **Production release:** `PENDING` — pushing to `seo/phase2-final-2026-10-25` provides a clean, validated branch for review and preview deployment without releasing to production.
- **Rollback deployment:** Preserved on GitHub Pages (`07anishu12.github.io`).
- **Google Analytics:** Measurement ID `G-JB7DKFEC0Q` intact and functional.
