# Architecture

`apps/web` is the independently deployed Next.js App Router frontend. `apps/api` is a Hono Node.js service; `packages/contracts` defines validation contracts. Root Markdown sources and publishing tools remain authoritative for articles. The static GitHub Pages release remains the rollback deployment.

Lead submissions validate at both boundaries. A server-issued signed submission token identifies one inquiry; retrying that inquiry returns the same receipt. PostgreSQL atomically stores the lead and two independent outbox intents. The public response confirms database persistence, not external delivery. A fresh token permits a genuine repeat inquiry without merging people by name, PIN, or phone.

A separately running Node worker processes Google Sheets and owner WhatsApp jobs from PostgreSQL. Sheets reconciles stable lead IDs before writing. WhatsApp acceptance is distinct from delivery; ambiguous network outcomes require operator reconciliation to avoid duplicate messages. PostgreSQL remains authoritative through provider outages. No Redis or remote CMS is required.

Only the API/worker receives database and provider secrets. Browser configuration may contain the public API origin only. PIN codes remain unresolved unless a trusted lookup is configured. Attribution is restricted and never accepts personal details in query strings.

Run web on Vercel and API/worker on a persistent Node-capable host with managed PostgreSQL. Do not place an indefinite worker in a request-only serverless handler. See deployment and integration documents for environment names and operational limitations.
