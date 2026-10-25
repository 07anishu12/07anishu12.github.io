# Decision log

- 2026-10-25: Continue the current portfolio repository; retain candidate material only where evidence supports reuse. Avoid replacing existing publishing tools.
- 2026-10-25: Retain Hono/TypeScript and pnpm workspace; add PostgreSQL because durable lead capture is now an explicit requirement, superseding the earlier no-database proposal.
- 2026-10-25: Use PostgreSQL outbox jobs and a dedicated worker instead of adding Redis/queue infrastructure.
- 2026-10-25: Server-issued signed submission tokens distinguish retries from new inquiries. Provider status must remain separate from capture success.
- 2026-10-25: Unknown WhatsApp send outcomes require reconciliation; exactly-once external delivery cannot honestly be promised without provider support.
- 2026-10-25: Preserve public WhatsApp links. New forms must not place entered PIN codes or other personal details into URL parameters.
- 2026-10-25: Production DNS and cutover require owner approval after preview verification. No production changes in this implementation session.
