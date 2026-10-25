# Acceptance report — 2026-10-25

## Release decision

Implementation and local validation are complete for the migration branch. **Production release is blocked** on hosting access, private provider configuration, spreadsheet permissions/schema, and approved domain cutover. There is no verified hosted preview. The old GitHub Pages deployment and main branch remain unchanged.

## Executed checks

| Check | Actual result |
| --- | --- |
| Clean pnpm install | Passed `pnpm install --frozen-lockfile` in a fresh temporary directory containing final workspace manifests/lockfile |
| Root publishing tests | 26 passed, 0 failed/skipped |
| Static publishing build/check | 326 published articles; 429 HTML pages and 428 original sitemap URLs validated, with drafts, internal links and verification preservation checked |
| API tests | 11 passed, 0 failed/skipped with real local PostgreSQL in isolated synthetic schemas; provider calls mocked |
| Database migrations | Applied once, re-run skipped; checksum tampering rejected; forced outbox insert failure rolls back lead |
| API production build/typecheck | Passed |
| Next.js production build/typecheck | Passed; standalone server exercised locally |
| ESLint and Prettier | Passed on migration application/contracts source |
| Dependency audit | `pnpm audit --json`: zero reported vulnerabilities across production and development dependencies |
| HTTP route audit | 442 Next deployment sitemap paths returned 200 after permitted redirects; unknown URL 404; legacy about URL permanent308 |
| Browser capture | Real browser → real local API → real PostgreSQL: synthetic bike-article submission201, retry200 with same lead ID; exactly1 lead and2 outbox jobs |
| Provider outage isolation | Real local worker processed both unconfigured providers; lead remained saved, jobs queued with classified unconfigured errors; mocked adapter recovery and ambiguous-send safety covered by API tests |
| Browser validation | Empty form marks name/consent invalid; too-fast submission rejected422 and creates no lead; retry succeeds after minimum age; receipt explicitly says notifications pending; WhatsApp destination unchanged |
| Search/pagination | Browser search for bike yielded90 articles and advanced to page2 of8; article heading anchors and legacy contact JSON verified |
| Accessibility/layout | axe WCAG2A/2AA/2.1AA: zero detected violations on home, contact, bike article, Finance Tools, Signal Desk, About and Blog at390px; no horizontal overflow. Desktop homepage at1440px also checked visually and for overflow |
| Git diff hygiene | `git diff --check` passed |
| Secret review | Targeted current-source, frontend public/bundle, and Git-history pattern checks performed; see memory for final result. This is not a guarantee against every possible secret format |

Local evidence files reside in ignored `.validation/`. Browser screenshots remain local artifacts and contain only public pages/synthetic data. No real customer details or provider messages were used. The initial browser test used an incorrect category and returned404; the corrected real article under `/blog/auto/` was used for successful capture. The initial accessibility link finding was corrected and rechecked.

## External checks and remaining configuration

- Vercel: no authenticated account/project available; no hosted frontend preview deployed.
- API host: no selected authorized account/managed PostgreSQL instance; Docker daemon unavailable locally, so container execution is unverified. CI includes an image build gate.
- Google Sheets: owner supplied target privately. Fresh unauthenticated browser could open it; only worksheet tab and selected A1:P1 header cells inspected. No header text was returned, not evidence the entire register is empty. No rows, sharing settings, or data changed. Private sharing, dedicated service-account credentials and compatible headers are prerequisites; real synchronization unverified.
- WhatsApp: official Cloud API adapter/template and signed status callbacks implemented, but credentials, sender, owner recipient, supported API version, approved template and real callback setup absent. Sending disabled by default; no real message sent.
- Domain: owner selected `aniket.app`; DNS lookup returned no A/CNAME answer and HTTPS could not resolve. Ownership, exact host-issued records and explicit production routing approval remain pending.

## Operating limits and rollback

The API limiter is per process; use one replica or enforced shared ingress limits. PIN locality remains unresolved. Retention is a manual90-day review proposal, not automatic deletion. WhatsApp uncertain sends require reconciliation rather than blind retry; Sheets reconciliation assumes one controlled writer for lead IDs. Canonical URLs and analytics retain the existing GitHub Pages production origin until approved cutover; verify and update that origin together at release.

Do not merge/promote this branch or change DNS until preview and real-provider gates pass. Continue serving GitHub Pages as rollback. If a later cutover fails, restore the previously approved routing, pause the worker if outbound behavior is suspect, and retain database/outbox records for investigation. Never roll back by deleting leads.
