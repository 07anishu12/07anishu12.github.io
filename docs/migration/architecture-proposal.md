# Portfolio Migration Architecture Proposal

## Status

Working architecture baseline for the backend slice implemented in Prompt 03.
The original repository did not contain `docs/migration/architecture-proposal.md`
when this task started, so this document records the decisions used for the
implementation rather than pretending that an earlier proposal was available.

## Monorepo shape

The migration uses a pnpm workspace without forcing the existing static site
tooling to move all at once:

```text
apps/
  web/       # planned Next.js/React/TypeScript/Tailwind frontend
  api/       # independently buildable Node.js/TypeScript API
packages/
  contracts/ # shared Zod schemas and inferred request/response types
  ui/        # deferred until a shared component is actually needed
```

The existing root package remains the source of truth for the current static
portfolio and Markdown publishing workflow during migration. New workspace
packages are additive and must not change production DNS or the GitHub Pages
workflow until a later, explicitly reviewed cutover.

## API framework and boundaries

`apps/api` uses Hono with `@hono/node-server`. Hono provides routing,
middleware, CORS, and testable request handling without coupling the business
logic to a large application framework. Node's built-in `fetch`, `AbortSignal`,
`crypto`, and test runner cover outbound HTTP, timeouts, request IDs, and tests.

The API separates:

- `config`: validated environment configuration.
- `http`: request middleware, errors, and route handlers.
- `services`: business use cases such as contact delivery.
- `connectors`: email and public GitHub adapters.
- `contracts`: shared validation schemas and response types.

The frontend will call versioned `/v1/*` routes. The API does not serve the
Next.js application and can be deployed independently as a long-running Node
process or a compatible container.

## Persistence decision

PostgreSQL is **not required for the portfolio itself**. Articles, projects,
learnings, and SEO artifacts remain Markdown/JSON/static build inputs. The
contact endpoint intentionally does not persist submissions; it validates and
delivers them through an email provider. Adding a database, Redis, a queue, or
a worker would create operational state without a current product requirement.

If a future feature needs durable user state, it must add an explicit data
requirement, migration plan, repository boundary, transaction tests, and a
separate architecture decision before introducing PostgreSQL.

## Current interfaces

- `EmailProvider.sendContactMessage(input)`: delivers a validated contact
  message. Provider failures are surfaced as a non-success API response.
- `GitHubMetadataProvider.getPublicRepository(repository)`: reads metadata for
  an explicitly configured public repository. The allowlist is server-side;
  no arbitrary repository lookup is exposed.
- `AiProvider`: reserved interface only. No AI endpoint or provider key is
  enabled in this slice.

All connector calls use bounded timeouts. Idempotent GitHub GET requests may be
retried once for transient failures. Contact delivery is not automatically
retried because duplicate email is worse than a visible failure.

## Runtime and security defaults

- Startup validates required production configuration.
- JSON structured logs include request IDs and never include message bodies or
  provider credentials.
- Liveness is process-only; readiness reports configuration/provider status.
- CORS is an explicit allowlist, not `*` when credentials or contact data are
  involved.
- Security headers, request-size limits, input validation, honeypot spam
  protection, per-IP rate limiting, and bounded request timeouts are enabled.
- Error responses use one JSON envelope and avoid provider internals.

## Deployment assumptions

Build and run independently from the repository root or `apps/api`:

```sh
pnpm --filter @portfolio/contracts build
pnpm --filter @portfolio/api build
pnpm --filter @portfolio/api start
```

The API requires Node.js 22 or newer. A deployment must provide `PORT`, an
explicit `CORS_ORIGINS`, contact provider settings, and the public GitHub
repository allowlist. A health monitor should probe `/health/live` and use
`/health/ready` for traffic admission. Production DNS remains unchanged by
this implementation.
