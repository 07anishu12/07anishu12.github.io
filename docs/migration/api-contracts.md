# Portfolio API Contracts

Base path: `/v1`. The API is independently deployed from the web application.

## `GET /health/live`

Process-only liveness probe. Returns `200` with `{ "status": "ok" }` when the
Node process is accepting requests.

## `GET /health/ready`

Traffic-readiness probe. Returns `200` when the configured contact provider is
ready, or `503` with provider statuses when required configuration is missing.
GitHub metadata is read-only and does not make the API unready if its public
allowlist is empty.

## `POST /v1/contact`

JSON body:

```json
{
  "name": "A visitor",
  "email": "visitor@example.com",
  "company": "Optional",
  "message": "A message of at least ten characters.",
  "website": "",
  "formStartedAt": 1730000000000
}
```

`website` is a honeypot and must be empty or omitted. `formStartedAt` is an
optional client timestamp used only for minimum-age spam screening. The API
does not store the submission. A successful provider delivery returns `202`;
provider failure returns `503`, never a false success.

## `POST /v1/leads`

The bike/vehicle enquiry form uses this endpoint. The client sends no page or
campaign attribution fields; the API derives attribution from the HTTP
`Referer` header and includes it in the server-side delivery message when
available.

```json
{
  "fullName": "A visitor",
  "pinCode": "110001",
  "mobile": "+91 9876543210",
  "bikeBrand": "Honda",
  "clientContext": { "source": "bike-finance", "campaign": "diwali" },
  "consent": true,
  "formStartedAt": 1730000000000
}
```

`pinCode` must be six digits, `mobile` must be an Indian mobile number, and
`consent` must be `true`. `website` remains an optional honeypot field.
`clientContext` is optional and explicitly untrusted; the API's referrer-derived
attribution remains the server-side source of truth. The
timestamp is only a spam-screening heuristic; it is not an authoritative event
time. The API does not persist the lead. It returns `202` only after the email
provider accepts delivery and returns `503` on provider failure.

## `GET /v1/projects`

Returns metadata only for repositories listed in server-side
`GITHUB_PUBLIC_REPOS`. It does not accept an arbitrary repository path and does
not expose private repository data. Provider failures return `503`.

## Error envelope

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted fields.",
    "requestId": "00000000-0000-4000-8000-000000000000"
  }
}
```

Clients should log the `X-Request-ID` header and show the public `message`, but
must not depend on provider-specific error details.
