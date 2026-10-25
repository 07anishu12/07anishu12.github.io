# Portfolio web migration surface

This is the first independently buildable Next.js surface in the migration. It
does not replace the GitHub Pages site yet. Existing static routes and the
Markdown publishing workflow remain live while the Next.js routes are checked.

## Run locally

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter @portfolio/web dev
```

The web app runs on `http://localhost:3000`. Set `NEXT_PUBLIC_API_URL` to the
API origin when the API is not same-origin, for example
`http://127.0.0.1:4000`. This is a public URL only; never put provider keys in
`NEXT_PUBLIC_*` variables.

## Build and deploy

```sh
pnpm --filter @portfolio/web build
pnpm --filter @portfolio/web typecheck
pnpm --filter @portfolio/web start
```

The app builds the existing Markdown article sources into Next.js blog routes
and uses the shared backend contract through `GET /api/v1/leads/token` and `POST /api/v1/leads`. The API must be
configured separately for a successful submission. A form failure is shown to
the visitor; the UI only claims database capture after a `201` (new) or `200` (duplicate) response with a lead reference. Provider delivery remains separately pending.
