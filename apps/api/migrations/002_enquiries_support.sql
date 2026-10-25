ALTER TABLE leads ALTER COLUMN pincode DROP NOT NULL;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_pincode_check;
ALTER TABLE leads ADD CONSTRAINT leads_pincode_check CHECK (pincode IS NULL OR pincode ~ '^[1-9][0-9]{5}$');

ALTER TABLE leads ALTER COLUMN bike_brand DROP NOT NULL;

ALTER TABLE leads ADD COLUMN IF NOT EXISTS enquiry_type text DEFAULT 'automotive';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_required text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS other_service text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS vehicle_model text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS vehicle_type text;
