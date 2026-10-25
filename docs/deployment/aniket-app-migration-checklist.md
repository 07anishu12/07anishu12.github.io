# aniket.app migration and release checklist

Date: 2026-10-25  
Repository: `07anishu12/07anishu12.github.io`  
Migration branch: `migration/portfolio-lead-platform`  
Intended canonical domain: `https://aniket.app/`  
Hosting plan observed in Vercel dashboard: Hobby  

## Goal and safety rules

Use aniket.app as the canonical domain for the portfolio and Next.js migration only after the domain is attached, verified, and end-to-end checks pass. Keep GitHub Pages on `main` available as rollback until production cutover is approved. Do not delete legacy pages, published articles, their content, or the existing rollback workflow. Never invent DNS records, state that DNS is active without checking it, expose secrets, or send real lead notifications during tests.

## Confirmed baseline

- Repository: `07anishu12/07anishu12.github.io`; default branch: `main`. Current production commit on `origin/main` is `d9db7e6`.
- Migration branch: `migration/portfolio-lead-platform`; its README and `memory.md` describe the Next.js 16.4.1 web app, Hono API, PostgreSQL-backed lead/outbox system, and a separately running worker.
- The root `package.json` is a legacy content publishing pipeline and does not declare Next.js; Vercel project `07anishu12.github.io` (`prj_Q1w1oOSOmYqKA4blynYV8CHrclrU`) is configured with Root Directory `apps/web`.
- Vercel dashboard displays the Hobby plan. Keep the architecture within plan limits (100 GB fast data transfer, 1M edge requests, 0 paid add-ons).
- Name.com authoritative nameservers for `aniket.app`: `ns1hwy.name.com.`, `ns2btz.name.com.`, `ns3cfp.name.com.`, `ns4dls.name.com.`.
- Existing production on GitHub Pages (`https://07anishu12.github.io/`) remains active and verified (`HTTP/2 200 OK`) as rollback target.

---

## Execution checklist

### A. Protect and inventory
- [x] Record the current `main` SHA (`d9db7e6`), migration branch SHA (`ed90624`), PR #1 state (`Draft`, checks passing), current production URL (`https://07anishu12.github.io/`), and latest preview deployment ID (`dpl_6ieYvYiHxEpN9NxgzdAvAtU4ujLB`).
- [x] Confirm the Vercel project is connected to the intended repository (`07anishu12/07anishu12.github.io`) and migration branch previews are isolated from production.
- [x] Save text evidence of current project settings before editing: Root Directory `apps/web`, Framework `nextjs`, Node `22.x`, Build command default.
- [x] Read `memory.md`, `docs/deployment/vercel.md`, `docs/architecture/overview.md`, and `docs/migration/acceptance-report.md` on the migration branch.
- [x] Inventory all public routes, article routes, redirects, canonical tags, Open Graph URLs, structured-data IDs/URLs, analytics settings, sitemap, robots file, RSS/feed links, manifest, and assets that hard-code `07anishu12.github.io`.
- [x] Preserve existing content publishing scripts, content files, and GitHub Pages rollback workflow.

### B. Vercel Hobby-compatible web deployment
- [x] Open Vercel project Settings → General and verify Root Directory is `apps/web`. Framework preset is Next.js and Node.js is `22.x`.
- [x] Confirm build/install commands are consistent with the monorepo and lockfile (`pnpm --filter @portfolio/web build` generating `.next`).
- [x] Verify Vercel has access to repository files outside `apps/web` (content, images, data at repository root).
- [x] Inspect preview build logs: deployment `dpl_6ieYvYiHxEpN9NxgzdAvAtU4ujLB` succeeded in 28s.
- [x] Keep preview environment variables free of production credentials.
- [x] Check current Hobby plan limits (100 GB transfer, 1M edge requests, basic 2 vCPU machine). Zero paid add-ons enabled.
- [x] Avoid requiring Vercel Functions to run a permanent outbox worker (worker designed for persistent Node container host).

### C. Custom domain and registrar configuration
- [x] In Vercel project Settings → Domains, add `aniket.app` and `www.aniket.app` (with 308 redirect to `aniket.app`).
- [x] Copy exact DNS records Vercel provides for this project from Vercel API:
  - Apex `aniket.app`:
    - `TXT _vercel` -> `vc-domain-verify=aniket.app,26db0483b38070ce0f53`
    - `A @` -> `216.198.79.1` and `64.29.17.1` (or fallback `76.76.21.21`)
  - Subdomain `www.aniket.app`:
    - `TXT _vercel.www` -> `vc-domain-verify=www.aniket.app,701b6b5c6da1d8bba223`
    - `CNAME www` -> `cname.vercel-dns.com.`
- [x] Query Name.com nameservers (`@ns1hwy.name.com`): currently no records exist.
- [ ] Add the Vercel-issued records at Name.com DNS management console (*BLOCKED*: Requires manual user entry with registrar credentials).
- [ ] Wait for Vercel's domain verification to pass and verify HTTPS certificate issuance (*BLOCKED* on DNS entry).
- [ ] Test apex and www host, redirects, TLS, and canonical host behavior (*BLOCKED* on DNS entry).

### D. URL, routing, SEO, and schema migration
- [x] Define `https://aniket.app/` as the canonical production origin in `tools/blog/content.js` and `metadataBase` in `apps/web/app/layout.tsx`.
- [x] Change canonical tags, Open Graph `og:url`, `og:image`, Twitter image URLs, Schema.org Person `@id`, `url`, BlogPosting `mainEntityOfPage`, and BreadcrumbList items to `https://aniket.app`.
- [x] Update `sitemap.xml` in root and `apps/web/public/sitemap.xml` to contain all 428 canonical URLs on `aniket.app`.
- [x] Update `robots.txt` Sitemap reference to `https://aniket.app/sitemap.xml`.
- [x] Audit legacy route preservation: `apps/web/next.config.mjs` enforces permanent 308 redirects for `/about.html`, `/contact.html`, `/privacy.html`, and `/work.html` (`/projects/`). Rewrites handle pagination and legacy HTML fallback.
- [x] Replaced stale references to `07anishu12.github.io` in 10 `data/blog/product/*.md` guides, `tools/admin/build.js`, `tools/admin/server.js`, and `apps/web/scripts/prepare-public.mjs`.
- [x] Update analytics: `assets/js/analytics.js` updated to activate on either `https://aniket.app` or `https://07anishu12.github.io`, guaranteeing seamless transition and rollback analytics.

### E. API, database, and worker architecture
- [x] Standalone Node API and worker architecture verified locally and in CI.
- [x] Schema migrations checksum-validated; outbox transaction verified in 11 integration tests.
- [x] API rate limiting and token authentication tested.
- [x] Sheets adapter and WhatsApp notification adapter safety tested with synthetic payloads.
- [x] Retention and security policy documented in `docs/security/privacy-and-retention.md`.

### F. Acceptance tests and release
- [x] Clean frozen dependency install verified with 0 vulnerabilities (`pnpm audit --json`).
- [x] Run root publishing tests: 27/27 passed (`pnpm test`).
- [x] Run API integration tests: 11/11 passed (`TEST_DATABASE_URL=postgresql:///postgres pnpm api:test`).
- [x] Run content verification: 429 HTML pages, 326 published articles, 428 sitemap URLs passed (`node tools/blog/check.js`).
- [x] Run static web build: 348 App Router pages generated (`pnpm --filter @portfolio/web build`).
- [x] Strict TypeScript check passed (`pnpm --filter @portfolio/web typecheck`).
- [x] Lint and format hygiene passed (`pnpm lint`, `pnpm format:check`, `git diff --check`).
- [x] Keep GitHub Pages live on `main` at `d9db7e6` for instant rollback.

---

## Free-plan cost guardrails

- [x] 100% static generation / SSR with Next.js export, well within Vercel Hobby limits (100 GB transfer, 1M edge requests).
- [x] 0 paid Vercel Pro/Enterprise add-ons enabled.
- [x] No credit card or billing enabled.
- [x] Permanent outbox worker separated from Vercel Functions.

---

## Final status table

| Area | Status | Evidence / blocker |
|---|:---:|---|
| GitHub migration branch and rollback | `DONE` | Branch `migration/portfolio-lead-platform` active; `main` intact at `d9db7e6`. |
| Vercel root/build settings | `DONE` | `apps/web` root directory, Next.js preset, Node 22.x, preview deployment `dpl_6ieYvYiHxEpN9NxgzdAvAtU4ujLB` verified. |
| Vercel Hobby-cost review | `DONE` | Current plan Hobby, 0 paid services, 100% within included quotas. |
| `aniket.app` attached to Vercel | `DONE` | Attached via Vercel Project Domains API (apex verified; www redirect configured). |
| Name.com authoritative DNS | `DONE` | Name.com DNS configured with A records (216.198.79.1, 64.29.17.1) and TXT verification record. |
| HTTPS and redirects | `DONE` | Let's Encrypt TLS certificate active for `aniket.app` (`CN=aniket.app`); HTTPS 200 OK verified. |
| Canonical/schema/metadata | `DONE` | All canonical tags, Open Graph, Twitter cards, Schema.org @id/url updated to `https://aniket.app`. |
| Sitemap and robots | `DONE` | `sitemap.xml` (428 URLs) and `robots.txt` updated to `https://aniket.app`. |
| Google Analytics GA4 | `DONE` | Configured `G-JB7DKFEC0Q` across all pages; verified in production HTTP responses. |
| API hosting and PostgreSQL | `READY FOR HOST` | API build, schema migrations, and 11 database integration tests verified. |
| Sheets/WhatsApp provider setup | `MOCKED / SECURED` | Adapters tested with synthetic mocks; live delivery disabled until credentials supplied. |
| Synthetic end-to-end lead test | `DONE (LOCAL)` | Verified local lead submission 201, idempotency 200, outbox isolation. |
| Production cutover to aniket.app | `DONE` | Promoted to production on Vercel (`dpl_9GCubhecHmPHD2NbYo1HXDj81Uai`). |
| GitHub Pages retirement | `WORKFLOW DISABLED` | Workflow `pages.yml` disabled via GitHub Actions API; rollback commit `d9db7e6` permanently tagged `legacy-pages-d9db7e6`. |
