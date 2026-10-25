# Configured lead spreadsheet

Status: server adapter implemented and mock-tested. The owner supplied the target privately. A fresh unauthenticated browser could open it; one worksheet tab was observed and selected header cells A1:P1 returned no text. No customer rows were inspected and no data or sharing settings were changed. This is not proof the entire sheet is empty. Service-account credentials, private sharing, and compatible headers remain unverified. Restrict anonymous access before accepting personal data; permission changes require owner approval.

## Configuration and authorization

Set `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_SHEET_NAME`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` in the API worker's secret manager only. The private key supports actual newlines or escaped `\n`. Enable the Google Sheets API for the service account's project. Share only the confirmed spreadsheet with the confirmed dedicated service account as editor; do not make the sheet public or grant domain-wide delegation. The owner must confirm the target and approve any required schema additions after inspection of its header row.

The worker exchanges an RS256 service-account JWT for a short-lived OAuth token using the Sheets scope. Credentials never go to the frontend. References: [Google service-account OAuth](https://developers.google.com/identity/protocols/oauth2/service-account), [Sheets values](https://developers.google.com/workspace/sheets/api/guides/values).

## Header mapping

Headers may appear in any order. Every listed header must occur exactly once. Missing or duplicated required headers fail closed without modifying the sheet. Extra columns are retained on updates; new rows leave extra columns blank. Existing compatible aliases must be mapped after the real header row has been inspected; no unverified worksheet names are assumed.

| Sheet header | PostgreSQL field / formatting |
| --- | --- |
| Lead ID | id |
| Submission date and time | submitted_at, formatted Asia/Kolkata |
| Customer name | full_name |
| Mobile number | phone_normalized |
| PIN code | pincode (string) |
| Locality | locality, empty when unresolved |
| District | district, empty when unresolved |
| State | state, empty when unresolved |
| Bike brand | bike_brand |
| Source page | source_path, path only |
| Article slug | article_slug |
| Campaign attribution | campaign_source, approved enum only |
| Consent status | consent_given and consent_policy_version |
| Lead status | lead_status |
| Sheets synchronization status | synced upon confirmed write |
| WhatsApp notification status | current database status |

## Durability and reconciliation

PostgreSQL commits lead and two outbox intents atomically. A separate worker obtains a PostgreSQL session advisory lock to serialize provider calls across replicas. It reads only row 1 and the stable Lead ID column; it never retrieves the existing customer register to verify access. A matching ID updates only mapped cells, while an absent ID appends once. More than one matching ID is a permanent failure requiring operator reconciliation. Writes use `RAW`, so formula-like input is text and phone/PIN values retain their string representation.

A confirmed append or update marks the job succeeded. Timeout and transient failures retry with exponential backoff (30 seconds to 1 hour, at most 8 attempts). ID reconciliation before every retry mitigates an append whose response was lost. Google Sheets has no cross-system transaction with PostgreSQL: only this worker should write the lead-ID column; manual or third-party concurrent edits can defeat this guarantee. Do not sort/delete IDs while processing. If delivery status changes, the successful Sheets job is queued again to refresh that row. Permanent failures remain in the outbox; they do not remove the lead.

## Operations and verification

Run `pnpm --filter @portfolio/api migrate`, then `pnpm --filter @portfolio/api worker` on an always-on Node runtime. For production build artifacts use `node apps/api/dist/migrate.js` and `node apps/api/dist/worker.js` from the repository root.

Authorized operators with the database role can run `node apps/api/dist/outbox-admin.js status` for aggregate job states without PII and `node apps/api/dist/outbox-admin.js retry JOB_ID` after resolving a failed job's cause. No public administrative endpoints exist. Database credentials are the operator authentication boundary; restrict role access and do not expose this CLI through a web shell.

Remaining real-provider test: inspect only target worksheet names/header schema and existing sharing metadata, approve compatible missing headers, submit one explicitly synthetic lead, confirm its exact ID once, simulate retry, and verify no duplicate row. Do not export the existing register. Mock tests cover RAW writes, reordered headers, extra-column preservation, append reconciliation and provider errors; local PostgreSQL tests cover outbox recovery.
