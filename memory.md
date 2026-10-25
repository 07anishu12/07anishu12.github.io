# Repository Memory

## Objective
Continue the portfolio migration to a professional Next.js frontend and independently deployable Node API, preserve published content/URLs/tools, and capture consented bike enquiries in PostgreSQL with durable Google Sheets synchronization and owner WhatsApp notifications. Keep production GitHub Pages intact until approved cutover.

## Repository State
- Source of truth: `07anishu12/07anishu12.github.io`, workspace `/Users/anny/Desktop/Portfolio-Website`.
- Branch: `migration/portfolio-lead-platform`, based on `e780634`. Candidate `aniket.app` inspected at `71add3d`; its default homepage and small sample library did not supersede this repository's completed work.
- Entry state included436 modified tracked files and existing untracked apps/contracts/memory work. All related migration work was preserved and extended. No production branch was replaced.
- Current stack: Next.js16.4.1, React19.2.4, TypeScript5.9, Tailwind4, Hono4, PostgreSQL via pg; pnpm12.15.0 workspace.
- Final application builds, typechecks, lint, formatting, and local validation passed. Git commits/push are recorded in Session Log below after execution.

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
- External mutations: none to production deployment, DNS, spreadsheet data/sharing, or provider messaging. Branch publication/commit evidence follows after execution.
