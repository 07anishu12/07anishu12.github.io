# WhatsApp owner notifications

Status: official Cloud API template adapter and signature-verified status webhook implemented and tested with mocks. No real provider request or message was sent. Existing customer-facing WhatsApp links are independent and do not create lead records.

## Owner-only configuration

Set server-only `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_OWNER_RECIPIENT`, `WHATSAPP_API_VERSION`, `WHATSAPP_TEMPLATE_NAME`, and `WHATSAPP_TEMPLATE_LANGUAGE`. The API version must be a currently supported version confirmed in the owner's Meta app; no version is assumed. Leave `WHATSAPP_NOTIFICATIONS_ENABLED=false` until the account, owner recipient, approved template and authorized synthetic test have been confirmed. The adapter never uses the submitted customer's phone as the recipient.

The approved template needs these ten body parameters, in order: lead ID, customer name, normalized mobile, bike brand, PIN, locality (or Unresolved), state (or Unresolved), UTC submission time, source path, Sheets status. Only necessary follow-up data is sent. Do not enable customer broadcasts or unsolicited messages.

Use the official [Meta messages reference](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages) when configuring the account. It returned rate limiting during this session, so no account/version-specific live behavior has been asserted. Meta's [webhook SDK documentation](https://whatsapp.github.io/WhatsApp-Nodejs-SDK/api-reference/webhooks/start/) describes signature validation.

## Persistence and delivery states

The lead and notification intent are committed before any send. A separate durable outbox job operates independently of Google Sheets. Successful API acceptance stores the returned message ID and marks `accepted`, never `delivered`. HTTP 429 and confirmed retryable failures use bounded backoff; permanent failures require operator review. Missing configuration retries at most eight attempts, then remains failed for an authorized retry after setup.

A network timeout, ambiguous 5xx response, missing message ID or interrupted worker can mean Meta accepted a send. Those jobs become `uncertain` and are **not automatically resent**. This avoids claiming exactly-once delivery when the provider supplies no send idempotency key. Investigate provider evidence before `node apps/api/dist/outbox-admin.js retry JOB_ID --confirmed-not-sent`. If accepted delivery is confirmed after a crash but the response ID was lost, reconcile through a restricted database operator; the webhook cannot match an ID that was never persisted. No automatic second message is sent in this situation.

## Delivery webhook

Configure `WHATSAPP_APP_SECRET` and a separate `WHATSAPP_WEBHOOK_VERIFY_TOKEN`, then register `/api/v1/webhooks/whatsapp` on the public API host. GET performs the verify-token handshake; POST requires `X-Hub-Signature-256` over the exact bounded request body. The handler updates only a known stored message ID using `sent`, `delivered`, `read`, or `failed` from the verified provider event. Out-of-order `sent` cannot downgrade delivered/read. Delivery failure marks the job failed for operator investigation; it does not retry indefinitely. Unknown message IDs and inbound customer messages are ignored. No inbound message content is logged or stored.

Webhook status changes queue an existing successful Sheets sync for row reconciliation. The callback is idempotent for repeated final states. Configure Meta webhook subscriptions and verify real callback delivery using authorized synthetic data before production; mocks do not prove provider connectivity.

## Remaining setup

Owner must supply the account credentials through deployment secrets, approved template, designated recipient, supported API version and callback setup. Confirm minimal access and test messaging permission. No customer communication or production DNS changes are enabled by this implementation.
