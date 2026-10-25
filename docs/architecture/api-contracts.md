# Lead API contract

Shared source: `packages/contracts/src/index.ts` (`LeadCaptureRequestSchema`, `LeadReceiptSchema`). JSON errors use `{error:{code,message,requestId}}`; provider internals and personal details are excluded.

## Public endpoints

- `GET /api/v1/leads/token`: no-store signed submission token, limited to 24 hours. Response `{submissionToken}`. Token issuance is rate-limited.
- `POST /api/v1/leads`: accepts `submissionToken`, `fullName` (2–120 characters), `pinCode` (six digits, nonzero first digit), `mobile` (Indian mobile, optional +91), `bikeBrand`, `otherBikeBrand` when Other, and literal `consent: true`. Optional `website` honeypot and `formStartedAt` support spam screening. `sourcePath` accepts a relative path without query/hash; `articleSlug` and `pageCategory` are restricted slugs; optional `clientContext.campaign` is organic, portfolio, or bike-finance. Attribution is user-supplied context, not verified identity/location.
- Response after transaction commit: `{ok:true,leadId,duplicate,integrations:{sheets,whatsapp}}`. New lead: 201; identical retry: 200. Same token with changed fields: 409. External integrations may remain queued. Legacy `/v1/leads` and `/v1/leads/token` aliases use the same contract.
- `/health/live`: process liveness. `/health/ready`: migrated database and token readiness; contact-email readiness separately reported.
- Existing `/v1/contact` sends contact email, and `/v1/projects` returns only allowlisted public GitHub metadata.

The browser retains a token during retries and only clears it for a confirmed new enquiry. A fresh server-issued token permits a genuine repeat inquiry. Matching name/phone/PIN never merges unrelated inquiries. Token possession can recover the receipt but exposes no personal lead details. No public lead read/list/retry endpoint exists.

## Provider callbacks and operations

WhatsApp webhook verification uses the configured verification token; POST callback bodies require an HMAC signature from the configured app secret. Accepted/sent/delivered/read are separate states. Only provider evidence advances delivery status. The admin CLI requires database-role access and supports aggregate status and controlled retries. Uncertain notification sends require provider reconciliation before an explicit retry.

## Deployment boundaries

The frontend receives only the public API origin. API/worker environment secrets stay server-side. Exact CORS allowlists, size limits, safe errors, PIN/phone validation and per-instance rate limits apply. Run one API instance or add an enforced shared ingress limiter before scaling. Background delivery runs in the persistent worker, never as an unawaited request task.
