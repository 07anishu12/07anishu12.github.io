# Portfolio API

Independently deployable Node.js/TypeScript API for the portfolio migration.
The API provides durable PostgreSQL lead capture, an independent outbox worker, health probes, server-side contact delivery, and an allowlisted GitHub connector.

## Local development

From the repository root:

```sh
pnpm install --frozen-lockfile
cp apps/api/.env.example apps/api/.env
pnpm --filter @portfolio/api dev
```

The default local listener is `http://127.0.0.1:4000`. The API does not serve
the web application. Lead capture requires migrated PostgreSQL; provider delivery requires the separate worker. Redis is not required.

## Production configuration

Set `NODE_ENV=production`, `DATABASE_URL`, `LEAD_TOKEN_SECRET`, an explicit `CORS_ORIGINS` allowlist, and (only for contact-email delivery) Resend settings (`CONTACT_PROVIDER=resend`, `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`). Keep all provider keys in the
hosting provider's secret store. `GITHUB_PUBLIC_REPOS` is a server-side,
comma-separated allowlist such as `07anishu12/Finance-tools`; arbitrary
repository paths are not accepted by the public API.

## Checks and build

```sh
pnpm --filter @portfolio/api typecheck
pnpm --filter @portfolio/api test
pnpm --filter @portfolio/api build
pnpm --filter @portfolio/api start
```

The Dockerfile builds the contracts package and API independently and starts
only the API process. A platform should route `/health/live` to a liveness
probe and `/health/ready` to readiness/traffic admission. Production DNS and
the existing GitHub Pages deployment are unchanged.

## PostgreSQL lead pipeline

The lead capture endpoint now persists independently of contact email. See `docs/architecture/api-contracts.md` and `docs/integrations/`. Production requires `DATABASE_URL`, `LEAD_TOKEN_SECRET` (at least 32 random characters) and explicit `CORS_ORIGINS`. Resend is required only when `CONTACT_PROVIDER=resend`.

- `pnpm --filter @portfolio/api migrate`: additive lead/outbox schema migration.
- `pnpm --filter @portfolio/api worker`: durable outbox polling process.
- `pnpm --filter @portfolio/api worker:once`: one bounded batch.
- `TEST_DATABASE_URL=<dedicated-test-database> pnpm --filter @portfolio/api test`: unit, mocked provider and real PostgreSQL tests. Integration tests create/drop only a unique synthetic schema. Without the variable that test is explicitly skipped.
- Build artifacts: `node apps/api/dist/migrate.js`, `node apps/api/dist/worker.js`, `node apps/api/dist/outbox-admin.js status` from the root.

Readiness checks the migrated lead database and token configuration. Contact provider readiness is separately reported. Do not treat API readiness as evidence that provider secrets are configured or delivered. Keep the worker running independently of HTTP request lifetimes. The in-memory request limiter is per API instance; deploy one API replica or add trusted ingress limits before scaling. Set `TRUST_PROXY=true` only behind an ingress that replaces client-supplied forwarded headers.
