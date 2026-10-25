# SEO fix log — 2026-10-25

## P1 — Redirecting and duplicate sitemap URLs

- **Issue:** Live sitemap had 442 entries; 18 redirected and four final destinations were duplicated after redirect resolution.
- **Root cause:** The publisher preserved legacy aliases and emitted route forms before final redirect normalization.
- **Files:** `tools/blog/build.js`, `apps/web/scripts/prepare-public.mjs`, `tools/blog/check.js`.
- **Fix:** Normalize sitemap locations to canonical HTTPS trailing-slash paths, remove legacy aliases and duplicate final targets, omit `changefreq`/`priority`, preserve real lastmod values, and add native routes during Next public preparation.
- **Test:** `pnpm run build`; `pnpm run check`; `pnpm run seo:validate`; `tools/seo/validate.test.mjs`.
- **Result:** Local root sitemap: 401 URLs; local Next public sitemap: 415 URLs; zero duplicates, redirect paths, obsolete priority/changefreq fields, or invalid lastmod values.
- **Production verification:** `PENDING` — no production deployment/re-crawl performed.

## P1 — Legacy GitHub Pages canonicals and references

- **Issue:** Baseline crawl found 22 pages served on `aniket.app` with `07anishu12.github.io` canonicals, plus hardcoded `07anishu12.github.io` references in LinkedIn share URLs and about links across `learnings/*.html`.
- **Root cause:** Preserved static HTML templates carried historic origin values into the new deployment surface.
- **Files:** `tools/blog/content.js`, `apps/web/scripts/prepare-public.mjs`, `learnings/*.html`, `data/learnings.json`.
- **Fix:** Use canonical origin `https://aniket.app` across all metadata and schema; updated LinkedIn share links in `learnings/*.html` to `https%3A%2F%2Faniket.app`; updated about link to `../about.html`; added public-preparation normalization.
- **Test:** `grep -rn "07anishu12.github.io" apps/web/public`; local rendered HTML smoke check.
- **Result:** Zero legacy GitHub Pages hostname references in public HTML.
- **Production verification:** `PENDING`.

## P1 — Canonicals ending in `/index.html`

- **Issue:** `projects/index.html`, `research/index.html`, and `topics/index.html` defined `<link rel="canonical" href="https://aniket.app/.../index.html">` and matching `og:url` values.
- **Root cause:** Static HTML hub templates contained explicit `/index.html` references.
- **Files:** `projects/index.html`, `research/index.html`, `topics/index.html`, `apps/web/scripts/prepare-public.mjs`, `tools/seo/validate.mjs`.
- **Fix:** Normalized canonical URLs and `og:url` to clean trailing-slash forms (`/projects/`, `/research/`, `/topics/`). Added validator assertion and unit test rejecting canonical URLs ending in `index.html`.
- **Test:** `pnpm run seo:validate`; `node --test tools/seo/validate.test.mjs`.
- **Result:** Passed.
- **Production verification:** `PENDING`.

## P1 — Inconsistent site schema and missing breadcrumbs

- **Issue:** Baseline had many BlogPosting/BreadcrumbList blocks but no consistent site-wide Person/WebSite/WebPage graph, and project detail routes / category routes lacked breadcrumbs.
- **Root cause:** Static and Next.js templates generated independent partial schema blocks without hierarchical breadcrumb coverage on dynamic routes.
- **Files:** `apps/web/components/StructuredData.tsx`, `apps/web/app/layout.tsx`, `apps/web/app/projects/[slug]/page.tsx`, `apps/web/app/blog/[category]/page.tsx`, `apps/web/app/blog/[category]/[slug]/page.tsx`, `tools/blog/pages.js`.
- **Fix:** Added reusable stable-identifier schema helpers (`Person`, `WebSite`, `WebPage`, `BlogPosting`, `CreativeWork`, `BreadcrumbStructuredData`). Added visible breadcrumbs `<nav aria-label="Breadcrumb">` matching `BreadcrumbList` on all article, category, and project pages.
- **Test:** `pnpm test`; `pnpm run seo:validate`.
- **Result:** Passed locally; 428 HTML pages and JSON-LD blocks validated.
- **Production verification:** `PENDING`.

## P2 — Robots AI crawler policy

- **Issue:** Robots allowed public crawling but did not document search/retrieval versus training behavior.
- **Root cause:** Only wildcard rules existed.
- **Files:** `robots.txt`.
- **Fix:** Added explicit Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, and GPTBot groups plus a documented public allow policy and robots limitation. Preserved private/search/feed disallow rules.
- **Test:** `pnpm run check`; `pnpm run seo:validate`.
- **Result:** Passed locally.
- **Production verification:** `PENDING`.

## P2 — Internal links and llms.txt route forms

- **Issue:** Baseline `llms.txt` and copied static HTML used redirecting `.html`/`index.html` paths.
- **Root cause:** Rollback static content and new Vercel route conventions shared one artifact without a final-host normalization pass.
- **Files:** `apps/web/scripts/prepare-public.mjs`; native navigation/page templates; generated public artifact.
- **Fix:** Keep rollback source compatibility while rewriting the Vercel public artifact's internal links and `llms.txt` links to final routes.
- **Test:** Local Next build, local rendered route checks, `pnpm run seo:validate`.
- **Result:** Passed locally.
- **Production verification:** `PENDING`.

## P2 — Lint blocker fix

- **Issue:** `eslint apps packages` failed on unused imports (`apps/web/app/api/v1/leads/route.ts` and `apps/web/tests/google-sheets.test.ts`).
- **Root cause:** Unused symbols left over from previous lead capture feature development.
- **Files:** `apps/web/app/api/v1/leads/route.ts`, `apps/web/tests/google-sheets.test.ts`.
- **Fix:** Removed unused imports.
- **Test:** `pnpm run lint`.
- **Result:** `pnpm run lint` passes cleanly with zero errors.

## Phase 3 validation coverage added during Phase 2

- **Files:** `tools/seo/validate.mjs`, `tools/seo/validate.test.mjs`, `package.json`, `tools/blog/check.js`.
- **Coverage:** sitemap origin/HTTPS/duplicates/redirect paths/lastmod, robots sitemap declaration, title/description/H1/noindex, canonical origin, non-index.html canonical assertion, JSON-LD parsing, social image resolution, llms.txt links, and legacy redirect definitions.
- **Result:** `pnpm test` passed with 31 tests; `pnpm run seo:validate` passed on the local public artifact (415 URLs, 428 HTML pages).

## Release state

- **Preview deployment:** `PENDING` — not run in this turn.
- **Production deployment:** `PENDING` — not authorized/performed.
- **Production re-crawl:** `PENDING`.
- **GitHub Pages rollback:** Preserved.
- **Analytics:** Preserved (`G-JB7DKFEC0Q`).
- **DNS changes:** None.
