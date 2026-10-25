# Repository Memory

## Objective
Continue the portfolio migration to a professional Next.js frontend and independently deployable Node API, preserve published content/URLs/tools, and capture consented bike enquiries in PostgreSQL with durable Google Sheets synchronization and owner WhatsApp notifications. Keep production GitHub Pages intact until approved cutover.

## Repository State
- Source of truth: `07anishu12/07anishu12.github.io`, workspace `/Users/anny/Desktop/Portfolio-Website`.
- Branch: `migration/portfolio-lead-platform`, based on `e780634`. Candidate `aniket.app` inspected at `71add3d`; its default homepage and small sample library did not supersede this repository's completed work.
- Entry state included436 modified tracked files and existing untracked apps/contracts/memory work. All related migration work was preserved and extended. No production branch was replaced.
- Current stack: Next.js16.4.1, React19.2.4, TypeScript5.9, Tailwind4, Hono4, PostgreSQL via pg; pnpm12.15.0 workspace.
- Final application builds, typechecks, lint, formatting, and local validation passed. Staged and committed to `migration/portfolio-lead-platform` as commit `4c6174c`. Origin main remains untouched at `e780634`.

## Architecture Decisions
- `apps/web`: App Router, server-rendered/static primary pages and326 articles, client components only for search/forms/interactions. Native eight-project catalogue and research page; legacy public HTML preserved.
- Root `data/blog` and `tools/blog` remain the validated content pipeline. Web builds reuse editorial/date/draft checks, existing Markdown renderer, and `_site` public allowlist, including published-image isolation. Generated web content/public files are ignored by Git.
- `apps/api`: Hono Node service; `packages/contracts`: Zod requests and receipts. PostgreSQL is authoritative and atomically commits leads and two outbox jobs. This supersedes the earlier email-only/no-database proposal.
- Separate persistent Node worker processes Sheets and WhatsApp independently. PostgreSQL advisory lock serializes side effects; no Redis/queue service added.
- Web deployment targets Vercel. API/worker require a persistent container host plus managed PostgreSQL; host account not yet selected/authorized. Standalone web build and non-root API Docker configuration prepared.
- Old canonical origin and GA configuration preserved pending approved production cutover. Owner selected aniket.app; domain ownership/routing remains unverified.

## Project Progress
- Implemented: homepage, About, Projects and8 case studies, Research, Blog/category/search/pagination, Contact, Privacy, bike conversion page, error/404 pages; capability-based skills; Finance Tools and Signal Desk source-grounded case studies.
- Implemented: reusable lead form, server-issued retry token, validated persistence receipt, PostgreSQL migrations/outbox, Sheets adapter, owner-only WhatsApp template adapter and signed delivery callbacks, restricted operator CLI.
- Implemented: safe environment examples, independent build/deployment docs, CI gates, route verifier, retention/security documentation. Existing customer WhatsApp destination retained; no lead created from a click.
- Remaining: authenticated hosted previews, managed database configuration, private provider setup, actual provider tests, approval for production routing. No live provider claim is made.

## Lead Pipeline
- Fields: fullName, pinCode, mobile, bikeBrand/otherBikeBrand, affirmative consent; source path/article/category and approved campaign. Phone normalized to+91; PIN is not location proof and locality/district/state remain unresolved.
- GET `/api/v1/leads/token` returns a signed24-hour token. POST `/api/v1/leads` and legacy alias return201 after new commit,200 for identical retry,409 for changed payload with same token. Names/phones/PINs do not merge inquiries; new inquiry obtains fresh token.
- Tables: leads, lead_outbox, portfolio_schema_migrations. Server UUIDs/UTC timestamps, constraints/indexes, checksum-verified additive migrations. Policy version2026-10-25.
- Sheets maps16 required headers in any order, uses RAW string values, Asia/Kolkata timestamp, reads only header/ID column, reconciles stable lead ID and preserves unrelated columns. Missing schema fails closed.
- WhatsApp sends to configured owner only, with ten approved template parameters. States distinguish queued, accepted, sent, delivered, read, failed and uncertain. Unknown send outcomes require manual reconciliation; no blind resend. Signed callbacks update known message IDs only.
- Retry:30seconds exponential to1hour, maximum8attempts; independent failures never erase leads. Operator retry requires database-role access. Public lead retrieval/admin endpoints are absent.
- Target supplied privately. Fresh browser without sign-in could open it; one worksheet tab and selected A1:P1 cells observed, with no header text returned. No customer rows read and no data/permissions changed. Anonymous access must be resolved before production data collection; service-account access/schema remain unverified.

## Environment Configuration
Names only; actual credentials/identifiers/private URLs must never appear here.
- Web: NEXT_PUBLIC_API_URL.
- API/runtime: NODE_ENV, HOST, PORT, CORS_ORIGINS, TRUST_PROXY, MAX_BODY_BYTES, REQUEST_TIMEOUT_MS, UPSTREAM_TIMEOUT_MS, DATABASE_URL, LEAD_TOKEN_SECRET, CONTACT_RATE_LIMIT_WINDOW_MS, CONTACT_RATE_LIMIT_MAX, MIN_FORM_AGE_MS.
- Sheets: GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_SHEET_NAME, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.
- WhatsApp: WHATSAPP_NOTIFICATIONS_ENABLED, WHATSAPP_API_VERSION, WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_OWNER_RECIPIENT, WHATSAPP_TEMPLATE_NAME, WHATSAPP_TEMPLATE_LANGUAGE, WHATSAPP_APP_SECRET, WHATSAPP_WEBHOOK_VERIFY_TOKEN.
- Existing contact/projects/publishing: CONTACT_PROVIDER, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, GITHUB_PUBLIC_REPOS, GITHUB_TOKEN, MEDIUM_INTEGRATION_TOKEN, MEDIUM_PUBLISH_STATUS.
- Tests: TEST_DATABASE_URL. Use synthetic isolated schemas only.

## Tests and Evidence
Executed2026-10-25; detailed results in `docs/migration/acceptance-report.md`, local logs in ignored `.validation/`.
- Clean frozen pnpm dependency installation in fresh temporary directory passed; npm package lock updated without install scripts.
- `pnpm test`:26passed,0failed/skipped. Static build/check:326articles,429HTML pages,428original sitemap URLs; metadata/internal links/drafts/verification passed.
- API tests with real local PostgreSQL:11passed,0failed/skipped. Covered validation, token integrity, concurrent idempotency, atomic rollback, migration checksum/re-run, independent outages/recovery, signature authorization, delivery-state non-downgrade, uncertain-send protection, mocked Sheets/WhatsApp adapters.
- API and Next production builds/typechecks passed. `pnpm lint`, `pnpm format:check`, `git diff --check` passed.
- `pnpm audit --json`:0reported vulnerabilities across production/development dependencies. Targeted source/frontend-bundle/Git-history secret-pattern scans:0findings. Pattern scans are not exhaustive secret guarantees.
- Local standalone HTTP audit:442sitemap routes successful, unknown404, legacy permanent308. Browser desktop1440px/mobile390px had no horizontal overflow.
- Browser axe WCAG2A/2AA/2.1AA final checks:0detected violations across7key pages. Initial indistinct privacy link fixed and rechecked. Search/pagination and7article heading anchors verified.
- Real browser synthetic article submission201, identical retry200/same lead reference. SQL confirmed exactly1lead and2outbox jobs. Worker ran with providers unconfigured: lead retained, both jobs queued with classified errors. No real messages sent.
- Initial rapid automated submission rejected422/no lead; normal delayed retry succeeded. This validates minimum-age behavior, not a failed persistence claim.
- Docker daemon unavailable: image execution blocked. Hosted previews, actual Google/Meta delivery, production DNS and cutover not executed.

## Known Risks
- Production blocked on Vercel/API host access, managed database, provider credentials/templates/callbacks, private Sheet sharing and compatible header mapping. None of the expected provider/hosting credential environment variables was present during the final check.
- aniket.app had no A/CNAME answer and HTTPS failed hostname resolution. No ownership verification or DNS edits performed.
- Per-instance API limiter: deploy one replica or enforce shared ingress limits. TRUST_PROXY requires an ingress that replaces untrusted forwarding headers.
- Sheets requires a controlled writer for lead IDs. External services do not offer a shared transaction; uncertain WhatsApp sends require reconciliation.
- Retention is a proposed manual90-day deletion review, not an automatic timer. Owner must confirm operational responsibility before accepting real leads.
- Canonical/analytics origin must be changed as part of the approved production release, not silently during preview. Legacy pages retain their historic copy/styles.

## Next Actions
1. Obtain authenticated hosting access; deploy isolated frontend/API/worker previews and managed PostgreSQL, then run the full hosted capture test.
2. Resolve anonymous Sheet access with owner approval, configure dedicated service account/header mapping and approved WhatsApp sender/template; verify one authorized synthetic end-to-end provider event.
3. Confirm retention operations and domain ownership, obtain production routing approval, then cut over with GitHub Pages preserved for rollback.

## Session Log
- Earlier2026-10-25 session: partial Hono/contact and workspace migration existed;26/11current test counts supersede earlier24/4records.
- Current orchestrator: audited both repositories, created migration branch, preserved existing work, defined contracts/ownership and maintained this file.
- Frontend/content agent: primary pages, project source inspection, legacy route strategy, shared form implementation. Backend/integrations agent: PostgreSQL/outbox/providers/tests/migrations. QA/release agent: capability checks, dependency findings, CI/deployment/security draft. Frontend/QA agents stopped at usage limits; orchestrator completed their remaining verification and fixes.
- Orchestrator final fixes: frontend campaign contract, existing publishing pipeline reuse, article anchors/credits/quick answers, precise pagination rewrites, generated public allowlist, standalone assets, metadata, eighth research case study, static token retry test, genuine lint/format gates, dependency remediation, privacy/access disclosure and final local QA.
- External mutations: none to production deployment, DNS, spreadsheet data/sharing, or provider messaging. Migration branch `migration/portfolio-lead-platform` committed at `4c6174c` (527 files changed). CI workflow `.github/workflows/migration-checks.yml` established for pull requests and branch pushes.


## Follow-up fix — 2026-10-25
- Fixed duplicate lead-capture script tags across the 28 legacy HTML pages identified during PR review. Updated `tools/blog/pages.js` to remove existing lead-capture script tags before injecting the current versioned script, preventing duplicates on regenerated legacy pages.
- These changes are committed on `migration/portfolio-lead-platform`. Re-run CI after the final update and verify the generated output before merge.
- Production is still not cut over: hosted preview, managed PostgreSQL, Google Sheets service-account access/header alignment, WhatsApp provider credentials/template/webhook, and custom-domain configuration remain pending.

## End-to-End Audit & Clean Re-build Verification — 2026-10-25
- Resolved CI runner failure (`git diff --check` whitespace violation): `tools/blog/pages.js` updated to update `leadScript` in-place and cleanly deduplicate duplicate tags without leaving orphaned indentation spaces (`  \n`).
- Added regression test `enhancePortfolio idempotency, single-tag injection, and whitespace hygiene` to `tools/blog/test.js`.
- All 27 root publishing tests passed (`pnpm test`), 11 API/database integration tests passed with real PostgreSQL (`TEST_DATABASE_URL=postgresql:///postgres pnpm api:test`), Next.js 16.4.1 web build (348 pages) and API build succeeded, ESLint, Prettier, and TypeScript strict checks passed.
- `git diff --check` now exits with code 0 on clean and post-build working directories.

## Vercel Preview Deployment Diagnosis & Configuration — 2026-10-25
- Diagnosed repeated Vercel preview deployment failures on PR #1 (deployment ID `52eFMeQ73QA6iSo677cYdkzJBGJA`, target project `07anishu12.github.io`):
  1. Root Cause: Vercel project was imported from the pre-migration static repository with `rootDirectory: null`. In this mode, Vercel ran root `package.json`'s `"build": "node tools/blog/build.js"`, generating static files into `_site/` without running Next.js build or creating `.next`. Vercel's Next.js preset expected `.next` output at the root and failed.
  2. Fix: Added root-level `vercel.json` configuring `buildCommand: "pnpm --filter @portfolio/web build"`, `outputDirectory: "apps/web/.next"`, and `framework: "nextjs"`. Added `apps/web/vercel.json` to support direct dashboard rootDirectory setting.
  3. Symlink & Hygiene: Updated `apps/web/scripts/prepare-standalone.mjs` to create a root `.next` junction/symlink on build, and updated `.gitignore` to ignore `.next` as a symlink or directory.
  4. CI Verification: GitHub Actions workflow `Migration release checks` passed all 20 steps (including PostgreSQL container and Docker image build). Root publishing tests passed (27/27), API tests passed (11/11), Next.js build prerendered 348 pages. Standalone route verification confirmed 442 routes returning HTTP 200.
  5. Vercel Onboarding & Resolution: Followed `https://vercel.com/get-started.md`. Installed Vercel CLI 65.2.0, completed authentication, installed Vercel agent plugin across clients, configured Vercel MCP servers in `~/.gemini/settings.json`, and updated project `07anishu12.github.io` settings directly via CLI:
     - `rootDirectory` set to `apps/web`
     - `framework` preset set to `nextjs`
     - `nodeVersion` set to `22.x`
     - Auto-detected build and output directories
  6. Verified Live Deployment: Vercel preview deployment `CJDxK5ZRxN8xWjFwo77W8YCJPKjk` succeeded in 54s. Pull request #1 status check rollup reported SUCCESS on all jobs. Live preview URL: `https://07anishu12githubio-git-migrati-194ed3-anikets-projects-b2dd8089.vercel.app`.
