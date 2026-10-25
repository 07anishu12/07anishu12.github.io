# Independent preview and release deployment

## Status

No hosting deployment or production DNS change has been performed by this migration. GitHub authentication was verified locally; a Vercel CLI, linked project, and standard local Vercel authentication were not found. Docker's daemon was unavailable. Provider credentials must be supplied through private host configuration. The intended domain is aniket.app; private provider values must not appear in this document.

## Frontend: Vercel

Create a separate Vercel project from the migration branch and select `apps/web` as Root Directory. Enable access to files outside the Root Directory because content and assets live at repository root. Use the Next.js framework preset, Node.js 22, the committed pnpm package-manager version, `pnpm install --frozen-lockfile`, and the package's `pnpm build` command. Keep the Next.js default output directory.

Set `NEXT_PUBLIC_API_URL` only to the independently deployed preview API origin, with no path or credentials. Confirm the actual variable name against `apps/web/.env.example` before deployment. The API origin is public routing configuration; spreadsheet IDs, provider tokens, private keys, database URLs and owner notification details must never be frontend environment variables.

Preview environments must use a separate database and test-only provider setup. Do not attach production credentials to untrusted preview branches. Verify frontend routes, preserved article URLs, assets, canonical metadata, form errors, and keyboard/mobile layouts against the deployed URL before promoting anything.

Reference: [Vercel monorepos](https://vercel.com/docs/monorepos), [build configuration](https://vercel.com/docs/builds/configure-a-build).

## API and worker: persistent Node host

Use a persistent container host that supports a web service and a background worker, such as Render. The API's indefinite outbox loop is not suitable for a standard Vercel request function. Build both services from the repository root with `apps/api/Dockerfile`. Start the API using the Dockerfile command and the worker with `node apps/api/dist/worker.js`. Run `node apps/api/dist/migrate.js` as a one-off release command before starting the new API/worker; never run destructive schema changes automatically.

Use a private managed PostgreSQL database, encrypted connections as required by its provider, backups and separate preview/production databases. Provide API and worker server-side secrets from `apps/api/.env.example`. Worker integration credentials need not be exposed to the frontend. Configure API `HOST=0.0.0.0`, the host-assigned port, and an exact `CORS_ORIGINS` list. Keep one API instance unless the hosting layer enforces a shared rate limit. Set `TRUST_PROXY=true` only if the trusted ingress overwrites incoming forwarding headers; otherwise clients could spoof limiter identities.

Verify `/health/live`, `/health/ready`, database persistence, independent worker retries, safe error responses and unauthorized endpoint rejection. Verify the image itself on a Docker-capable runner before release; a TypeScript build is not an image test.

Reference: [Render Docker](https://render.com/docs/docker), [background workers](https://render.com/docs/background-workers).

## Custom domain and production approval

The owner has selected `aniket.app`; ownership has not yet been verified. On October 25, 2026, a read-only DNS check returned no A or CNAME answer and HTTPS could not resolve the hostname. The custom domain is not verified live. Exact DNS records cannot be stated safely before the domain is attached to the chosen projects: copy the project-specific records returned by Vercel and the API host into the private release ticket. Verify ownership and obtain explicit approval before changing DNS or replacing the live deployment. No fabricated record targets or domain claims are supplied here.

## Release and rollback

1. Deploy API and worker preview with a dedicated database; apply migrations and verify readiness.
2. Deploy frontend preview with the preview API origin and matching CORS.
3. Run one authorized synthetic end-to-end enquiry. Confirm one PostgreSQL lead, one Sheets row when configured, and accurate owner-notification state. Do not send to real customers.
4. Verify outages and retries, route preservation, secrets, accessibility, and provider permissions; record evidence in the acceptance report.
5. Obtain approval for production promotion and routing changes.
6. Retain GitHub Pages and its workflow as rollback. If cutover fails, restore the previously approved DNS/project alias to the existing deployment. Pause the new worker if duplicate or incorrect outbound delivery is suspected. Preserve the database and job state for diagnosis; do not roll back by deleting leads or spreadsheet rows.
