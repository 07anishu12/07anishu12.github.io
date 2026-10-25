# Acceptance report — 2026-10-25

## Release decision

Implementation and local validation are complete for the migration branch. **Production release is blocked** on hosting access, private provider configuration, spreadsheet permissions/schema, and approved domain cutover. There is no verified hosted preview. The old GitHub Pages deployment and main branch remain unchanged.

## Executed checks

| Check | Actual result |
| --- | --- |
| Clean pnpm install | Passed `pnpm install --frozen-lockfile` in a fresh temporary directory containing final workspace manifests/lockfile |
| Root publishing tests | 27 passed, 0 failed/skipped (including enhancePortfolio deduplication and whitespace regression test) |
| Static publishing build/check | 326 published articles; 429 HTML pages and 428 original sitemap URLs validated, with drafts, internal links and verification preservation checked |
| API tests | 11 passed, 0 failed/skipped with real local PostgreSQL in isolated synthetic schemas; provider calls mocked |
| Database migrations | Applied once, re-run skipped; checksum tampering rejected; forced outbox insert failure rolls back lead |
| API production build/typecheck | Passed |
| Next.js production build/typecheck | Passed (348 pages prerendered); standalone server exercised locally |
| ESLint and Prettier | Passed on migration application/contracts source with 0 errors |
| Dependency audit | `pnpm audit --json`: zero reported vulnerabilities across production and development dependencies |
| HTTP route audit | 442 Next deployment sitemap paths returned 200 after permitted redirects; unknown URL 404; legacy about URL permanent 308 |
| Browser capture | Real browser → real local API → real PostgreSQL: synthetic bike-article submission 201, retry 200 with same lead ID; exactly 1 lead and 2 outbox jobs |
| Provider outage isolation | Real local worker processed both unconfigured providers; lead remained saved, jobs queued with classified unconfigured errors; mocked adapter recovery and ambiguous-send safety covered by API tests |
| Browser validation | Empty form marks name/consent invalid; too-fast submission rejected 422 and creates no lead; retry succeeds after minimum age; receipt explicitly says notifications pending; WhatsApp destination unchanged |
| Search/pagination | Browser search for bike yielded 90 articles and advanced to page 2 of 8; article heading anchors and legacy contact JSON verified |
| Accessibility/layout | axe WCAG 2A/2AA/2.1AA: zero detected violations on home, contact, bike article, Finance Tools, Signal Desk, About and Blog at 390px; no horizontal overflow. Desktop homepage at 1440px also checked visually and for overflow |
| Git diff hygiene | `git diff --check` passed cleanly with 0 whitespace violations |
| Secret review | Targeted current-source, frontend public/bundle, and Git-history pattern checks performed; 0 credentials found |
| GitHub Actions CI | Workflow `Migration release checks` passed all 20 steps (PostgreSQL container, lint, format, test, check, typecheck, builds, audit, diff-check, Docker image build) |

Local evidence files reside in ignored `.validation/`. Browser screenshots remain local artifacts and contain only public pages/synthetic data. No real customer details or provider messages were used. The initial browser test used an incorrect category and returned404; the corrected real article under `/blog/auto/` was used for successful capture. The initial accessibility link finding was corrected and rechecked.

## External checks and remaining configuration

- Vercel: PR #1 preview deployment notifications diagnosed on project `07anishu12.github.io` (Deployment ID `7HKxYjwfadxp1Xdfjx2pZCbFB1yz`). Root Cause: Project was imported with `rootDirectory: null` (repo root), where root `package.json` executes `node tools/blog/build.js` without Next.js. Vercel ignores `rootDirectory` in `vercel.json` per platform design. Resolution: User/admin must open Vercel Dashboard -> Project Settings -> General -> Root Directory and set it to `apps/web`. Once set, Vercel preview builds automatically succeed.
- API host: persistent container host (e.g. Render/Railway) and managed PostgreSQL instance required; Docker image build verified in CI.
- Google Sheets: owner supplied target spreadsheet privately. Fresh unauthenticated browser could open it; only worksheet tab and selected A1:P1 header cells inspected. No header text was returned, not evidence the entire register is empty. No rows, sharing settings, or data changed. Private sharing, dedicated service-account credentials and compatible headers are prerequisites; real synchronization unverified.
- WhatsApp: official Cloud API adapter/template and signed status callbacks implemented, but credentials, sender, owner recipient, supported API version, approved template and real callback setup absent. Sending disabled by default; no real message sent.
- Domain: owner selected `aniket.app`; DNS lookup returned no A/CNAME answer and HTTPS could not resolve. Ownership, exact host-issued records and explicit production routing approval remain pending. Rollback to GitHub Pages on `main` is preserved.

## Operating limits and rollback

The API limiter is per process; use one replica or enforced shared ingress limits. PIN locality remains unresolved. Retention is a manual90-day review proposal, not automatic deletion. WhatsApp uncertain sends require reconciliation rather than blind retry; Sheets reconciliation assumes one controlled writer for lead IDs. Canonical URLs and analytics retain the existing GitHub Pages production origin until approved cutover; verify and update that origin together at release.

Do not merge/promote this branch or change DNS until preview and real-provider gates pass. Continue serving GitHub Pages as rollback. If a later cutover fails, restore the previously approved routing, pause the worker if outbound behavior is suspect, and retain database/outbox records for investigation. Never roll back by deleting leads.
