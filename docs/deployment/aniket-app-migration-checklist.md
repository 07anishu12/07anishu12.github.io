# aniket.app migration and release checklist

Date: 2026-10-25  
Repository: `07anishu12/07anishu12.github.io`  
Migration branch: `migration/portfolio-lead-platform`  
Intended canonical domain: `https://aniket.app/`  
Hosting plan observed in Vercel dashboard: Hobby

## Goal and safety rules

Use aniket.app as the canonical domain for the portfolio and Next.js migration only after the domain is attached, verified, and end-to-end checks pass. Keep GitHub Pages on `main` available as rollback until production cutover is approved. Do not delete legacy pages, published articles, their content, or the existing rollback workflow. Never invent DNS records, state that DNS is active without checking it, expose secrets, or send real lead notifications during tests.

## Confirmed baseline

- Repository: `07anishu12/07anishu12.github.io`; default branch: `main`.
- Migration branch: `migration/portfolio-lead-platform`; its README and `memory.md` describe the Next.js 16.4.1 web app, Hono API, PostgreSQL-backed lead/outbox system, and a separately running worker.
- The root `package.json` is a legacy content publishing pipeline and does not declare Next.js; Vercel must use the correct `apps/web` root directory or an explicitly validated root build configuration, never a mixture of both.
- Vercel dashboard displays the Hobby plan. Keep the architecture within plan limits and check current plan quotas before enabling metered features.
- Name.com account displays `aniket.app`, with displayed expiry date 7 April 2027.
- Existing production on GitHub Pages is intended to remain the rollback target. Do not change `main` or production routes until the release gate passes.
- Previous repository acceptance notes report local/CI checks, but also list hosted frontend/API, managed database, real provider integration, and domain routing as pending. Re-run checks on the current branch and current commit instead of treating old reports as current proof.

## Execution checklist

### A. Protect and inventory
- [ ] Record the current `main` SHA, migration branch SHA, PR state, current production URL, and successful/failed Vercel deployment IDs.
- [ ] Confirm the Vercel project is connected to the intended repository and migration branch previews are isolated from production.
- [ ] Save screenshots or text evidence of current project settings before editing.
- [ ] Read `memory.md`, `docs/deployment/vercel.md`, `docs/architecture/overview.md`, and `docs/migration/acceptance-report.md` on the migration branch.
- [ ] Inventory all public routes, article routes, redirects, canonical tags, Open Graph URLs, structured-data IDs/URLs, analytics settings, sitemap, robots file, RSS/feed links, manifest, and assets that hard-code `07anishu12.github.io`.
- [ ] Preserve existing content publishing scripts, content files, and GitHub Pages rollback workflow.

### B. Vercel Hobby-compatible web deployment
- [ ] Open Vercel project Settings → General and verify Root Directory is `apps/web`. Verify the selected framework is Next.js and Node.js is `22.x` only if supported by current project settings.
- [ ] Confirm build/install commands are consistent with the monorepo and lockfile. Do not force an output directory unless the current Next.js build configuration explicitly requires it; standard Next.js deployments should use the framework defaults.
- [ ] Verify Vercel has permission to read repository files outside `apps/web` because published Markdown/content/assets may be rooted at the repository root.
- [ ] Inspect the latest migration-branch preview build logs. Fix the actual failing step, not just the dashboard label.
- [ ] Keep preview environment variables free of production credentials. Only configure `NEXT_PUBLIC_API_URL` to the preview API origin when that API exists.
- [ ] Check the current Hobby plan limits, included usage, commercial-use applicability, build and deployment quotas, function limits, bandwidth, and any metered services. Disable optional paid services unless explicitly approved.
- [ ] Avoid requiring Vercel Functions to run a permanent outbox worker or long-lived process.

### C. Custom domain and registrar configuration
- [ ] In Vercel project Settings → Domains, add `aniket.app` and, if desired, `www.aniket.app` as a separate host with an explicit redirect policy.
- [ ] Copy the exact DNS records Vercel provides for this project; do not use generic or guessed IP/CNAME values.
- [ ] In Name.com → Domain Details → DNS, inspect current records and existing email-related records before editing.
- [ ] Add only the Vercel-issued records needed for the web app; preserve MX, SPF, DKIM, DMARC, and any unrelated verification records.
- [ ] If the current DNS provider is not Name.com, inspect nameservers first; make changes at the authoritative DNS provider, not a non-authoritative panel.
- [ ] Wait for Vercel's domain verification to pass and verify HTTPS certificate issuance.
- [ ] Test apex and optional www host, IPv4/IPv6 where applicable, redirects, TLS, and canonical host behavior.
- [ ] Do not cut over unless DNS ownership is verified and rollback records are documented.

### D. URL, routing, SEO, and schema migration
- [ ] Define `https://aniket.app/` as the canonical production origin after domain verification.
- [ ] Change canonical tags, Open Graph `og:url`, Open Graph image URLs, Twitter image URLs, Schema.org `@id`, `url`, publisher/person IDs, SearchAction target, breadcrumbs, and other absolute URLs to the new origin.
- [ ] Update `sitemap.xml` to contain only canonical public URLs on `aniket.app`; do not include preview URLs, private/admin endpoints, drafts, or old duplicate origin URLs.
- [ ] Update `robots.txt` Sitemap reference to `https://aniket.app/sitemap.xml`. Keep valid crawl restrictions for private/admin paths.
- [ ] Audit every existing article and public route for stable path preservation. Use permanent redirects for renamed URLs only when a true one-to-one equivalent exists; avoid broad rules that create redirect loops.
- [ ] Preserve existing published routes wherever possible; record any intentional URL changes and their mappings.
- [ ] Verify status codes for homepage, About, projects, research, contact, blog index, all category/pagination pages, articles, feeds, search, sitemap, 404, and legacy `.html` pages.
- [ ] Check internal links for stale `07anishu12.github.io` origins and prevent links to preview deployments.
- [ ] Update repository README badges and live-site references after the canonical domain is actually live.
- [ ] Update analytics and Search Console settings only during the approved release. Preserve existing verification records and monitor the new property; a domain migration does not guarantee instant search transfer.

### E. API, database, and worker architecture
- [ ] Deploy API and worker to a persistent host separately from the Vercel web app; confirm that this host can run a continuously running worker within a free tier, if one exists. Do not assume any third-party free tier will remain free.
- [ ] Select a managed PostgreSQL service and confirm its free-tier limits, sleep/expiry policies, backup constraints, connection limits, and data-retention policies before using it.
- [ ] Maintain separate preview and production databases. Run additive, checksum-verified migrations as an explicit release step; do not use destructive schema sync.
- [ ] Set exact API CORS origins, request/body limits, health checks, database TLS requirements, and trusted proxy settings.
- [ ] Keep API and worker secrets server-side. Never place database URLs, service-account private keys, provider tokens, webhook secrets, or owner notification targets in any `NEXT_PUBLIC_*` variable.
- [ ] Confirm one API replica or implement shared rate limiting at trusted ingress; per-process rate limiting is not shared.
- [ ] Verify `/health/live`, `/health/ready`, persistence, worker retries, outbox recovery, and safe error handling.
- [ ] Test provider-disabled mode; leads must remain stored if Sheets or WhatsApp is unavailable.
- [ ] Verify Google Sheet is not anonymously accessible, confirm exact headers and a dedicated least-privilege service account, and test with synthetic data only.
- [ ] Verify approved WhatsApp sender, template, consent requirements, callback signature, and owner recipient using test configuration. Never message real users during QA.
- [ ] Establish an actual retention/deletion process and owner before accepting real leads; a documented proposal is not an automated retention control.

### F. Acceptance tests and release
- [ ] Clean frozen dependency install on current branch.
- [ ] Run root content tests, content checks, article/static build, API tests against isolated test PostgreSQL, typechecks, lint, formatter, security/dependency audit, and `git diff --check`.
- [ ] Validate production builds and Docker image on CI or a Docker-capable runner; distinguish image build from image execution.
- [ ] Run route crawl from the generated sitemap. Record status, redirect chains, canonical URL, latency, and missing assets.
- [ ] Inspect desktop and mobile layouts, keyboard navigation, form validation, accessibility checks, and at least one representative article page.
- [ ] Run one synthetic enquiry end-to-end and verify exactly one database lead and the correct outbox jobs. Confirm retry idempotency and independent provider failure handling.
- [ ] Verify real provider delivery only after explicit owner approval and with a controlled test recipient.
- [ ] Document evidence, commit SHA, deployment ID, build logs, test results, DNS status, and outstanding risks.
- [ ] Obtain explicit production-cutover approval before merging/promoting or changing canonical production routing.
- [ ] Keep GitHub Pages live and document rollback steps before the first production cutover.
- [ ] After cutover, verify HTTPS, redirects, key routes, sitemap, robots, forms, API readiness, provider status, and error logs. Monitor search indexing and traffic without promising an immediate SEO recovery.

## Free-plan cost guardrails

- [ ] Prefer static/SSR web hosting included in Vercel Hobby quotas and avoid paid add-ons unless approved.
- [ ] Do not add a paid Vercel Pro-only feature as a required runtime dependency.
- [ ] Keep the persistent API/worker and managed PostgreSQL within confirmed free allocations; if no reliable free option meets the requirements, clearly flag it instead of silently selecting a paid plan.
- [ ] Check limits, sleep behavior, backups, outbound transfer, build minutes, and data egress. Free does not mean unlimited or production-reliable.
- [ ] Add a cost/usage review note to the deployment report and identify every component that could incur charges.
- [ ] Do not enable a credit card, paid upgrade, billing change, premium add-on, or recurring paid service without explicit approval.

## Final status table

Maintain this table in the report, and only mark an item DONE when evidence exists.

| Area | Status | Evidence / blocker |
|---|---|---|
| GitHub migration branch and rollback | PENDING RECHECK | Current SHAs and PR status |
| Vercel root/build settings | PENDING RECHECK | Settings screenshot and latest build |
| Vercel Hobby-cost review | PENDING | Current quotas and usage |
| `aniket.app` attached to Vercel | NOT VERIFIED | Domain panel status |
| Name.com authoritative DNS | NOT VERIFIED | Nameservers and DNS records |
| HTTPS and redirects | NOT VERIFIED | External request results |
| Canonical/schema/metadata | PENDING CODE AUDIT | Route and source scan report |
| Sitemap and robots | PENDING CODE AUDIT | Generated outputs |
| API hosting and PostgreSQL | BLOCKED / PENDING | Host, DB, secrets, health checks |
| Sheets/WhatsApp provider setup | BLOCKED / PENDING | Privacy, credentials, test evidence |
| Synthetic end-to-end lead test | PENDING | DB row/outbox and provider test evidence |
| Production cutover approval | NOT GRANTED | Requires owner approval |
| GitHub Pages rollback | KEEP ACTIVE | Existing main deployment |

## Required final report

Return: (1) files changed, (2) verified Vercel settings, (3) exact DNS records supplied by Vercel and whether they were added, (4) deployment URLs and deployment IDs, (5) test commands and actual results, (6) route/SEO/schema changes, (7) cost/free-plan review, (8) unresolved blockers, (9) rollback procedure. Never claim a task was executed just because it is in this checklist.
