# Privacy, access and retention operations

The lead database contains personal information. Names, Indian mobile numbers, PIN codes, requested brands, consent version and limited page attribution are collected only after affirmative consent. A PIN code is user-supplied postal information, not proof of physical location. Unresolved locality fields must remain empty until a trusted resolver is configured.

PostgreSQL is authoritative. The configured private lead spreadsheet is an operational copy. Only the owner receives the configured WhatsApp notification; automatic customer messaging is outside scope. Give a dedicated service account access only to the selected spreadsheet. Do not broaden sharing to “anyone with the link”.

## Access and logging

Keep database credentials, Google credentials and spreadsheet identifiers, WhatsApp tokens, recipient configuration and administrative tokens in private server environment settings. Never copy them into public assets, build logs, screenshots, CI artifacts, memory or source. Logs must contain receipt/job IDs and classified errors rather than request bodies, phone numbers, provider payloads or raw provider errors. Public lead endpoints must not list or retrieve submitted data. Restrict operational SQL and retry access to authenticated operators with least privilege.

Use HTTPS, exact CORS origins, request-size limits, input validation and rate limits. Public browser config may contain only intentionally public configuration. Scan final frontend bundles as well as source. Keep dependency and lockfile review in release checks. In-process API rate limits apply per process; a multi-instance deployment requires host-level enforcement or a shared limiter.

## Retention and deletion procedure

The proposed privacy notice specifies review for deletion after 90 days unless an active enquiry or applicable obligation requires longer retention. This is a manual review policy, not an implemented automatic deletion timer; the owner must confirm operational responsibility before production capture. Use synthetic preview data until then. Do not invent a legal retention obligation.

An authorized operator should verify the requester's identity through an existing trusted contact channel, locate the receipt in PostgreSQL, suspend pending jobs for that lead, and delete or redact its PII transactionally. Remove the matching spreadsheet row by stable Lead ID without altering unrelated rows. Apply the same retention policy to provider-held notifications and backups according to each provider's supported controls and retention limits. Record only the deletion date, operator and non-identifying outcome. Never copy customer records into issue trackers as evidence.

Deletion operations require explicit authorization and reviewed SQL against the actual schema. They are deliberately not exposed as public HTTP endpoints. Schedule a periodic review of retained leads and failed jobs. Document the approved period and backup expiry in the private operations runbook.

## Credential incident

If a real credential is found in Git or a public artifact, stop using it, report the affected credential type without publishing the value, rotate it in the provider account, and remove it from current artifacts. History rewriting requires the repository owner's approved recovery process; do not force-push unilaterally.
