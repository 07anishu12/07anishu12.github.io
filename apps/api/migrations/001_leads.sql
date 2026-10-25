CREATE TABLE IF NOT EXISTS leads (
 id uuid PRIMARY KEY, submission_id uuid NOT NULL UNIQUE, payload_hash text NOT NULL,
 full_name text NOT NULL CHECK(length(full_name) BETWEEN 2 AND 120),
 phone_normalized text NOT NULL CHECK(phone_normalized ~ '^\+91[6-9][0-9]{9}$'),
 pincode text NOT NULL CHECK(pincode ~ '^[1-9][0-9]{5}$'), locality text, district text, state text,
 location_status text NOT NULL DEFAULT 'unresolved', bike_brand text NOT NULL,
 source_path text NOT NULL, article_slug text, page_category text, campaign_source text,
 consent_given boolean NOT NULL CHECK(consent_given), consent_policy_version text NOT NULL,
 submitted_at timestamptz NOT NULL DEFAULT now(), lead_status text NOT NULL DEFAULT 'new',
 sheets_sync_status text NOT NULL DEFAULT 'queued', sheets_synced_at timestamptz,
 whatsapp_notification_status text NOT NULL DEFAULT 'queued', whatsapp_notified_at timestamptz,
 whatsapp_message_id text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_submitted_at_idx ON leads(submitted_at);
CREATE TABLE IF NOT EXISTS lead_outbox (
 id bigserial PRIMARY KEY, lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
 channel text NOT NULL CHECK(channel IN ('sheets','whatsapp')),
 status text NOT NULL DEFAULT 'queued' CHECK(status IN ('queued','processing','succeeded','failed','uncertain')),
 attempts integer NOT NULL DEFAULT 0, available_at timestamptz NOT NULL DEFAULT now(),
 last_error_class text, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(lead_id,channel)
);
CREATE INDEX IF NOT EXISTS outbox_pending_idx ON lead_outbox(available_at) WHERE status='queued';
