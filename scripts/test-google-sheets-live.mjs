#!/usr/bin/env node
/**
 * Live Integration Test for Google Sheets Database Integration
 *
 * Usage:
 *   node scripts/test-google-sheets-live.mjs
 *   or:
 *   GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/.../exec" \
 *   GOOGLE_SHEETS_API_SECRET="your-generated-secret" \
 *   node scripts/test-google-sheets-live.mjs
 *
 * This script runs against the live deployed Google Apps Script Web App
 * and verifies all operations against the actual Google Sheet.
 */

import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Try loading environment variables from .env.local or apps/web/.env.local if not already set
function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnvFile(path.resolve(process.cwd(), ".env.local"));
loadEnvFile(path.resolve(process.cwd(), "apps/web/.env.local"));

const SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
const API_SECRET = process.env.GOOGLE_SHEETS_API_SECRET?.trim();
const SPREADSHEET_ID =
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() ||
  "1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4";

console.log("=================================================================");
console.log(" Google Sheets Live Integration Test");
console.log("=================================================================");

if (!SCRIPT_URL || !API_SECRET) {
  console.log("\n⚠️  Configuration incomplete for live testing.");
  console.log("Please supply the following environment variables:\n");
  console.log(`  GOOGLE_APPS_SCRIPT_URL    : ${SCRIPT_URL ? "✓ Configured" : "❌ Missing"}`);
  console.log(`  GOOGLE_SHEETS_API_SECRET  : ${API_SECRET ? "✓ Configured" : "❌ Missing"}`);
  console.log(`  GOOGLE_SHEETS_SPREADSHEET_ID: ${SPREADSHEET_ID}\n`);
  console.log("You can provide them in .env.local or run inline:");
  console.log("  GOOGLE_APPS_SCRIPT_URL=\"https://script.google.com/macros/s/.../exec\" \\");
  console.log("  GOOGLE_SHEETS_API_SECRET=\"your-secret\" \\");
  console.log("  node scripts/test-google-sheets-live.mjs\n");
  console.log("Refer to docs/GOOGLE_SHEETS_SETUP.md for complete step-by-step instructions.\n");
  process.exit(0);
}

console.log(`\nSpreadsheet ID : ${SPREADSHEET_ID}`);
console.log(`Apps Script URL: ${SCRIPT_URL.slice(0, 45)}...`);
console.log(`Secret Config  : ${API_SECRET.slice(0, 4)}**** (length: ${API_SECRET.length})\n`);

async function callScript(action, payload, customSecret = API_SECRET) {
  const startTime = Date.now();
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: customSecret,
      action,
      spreadsheetId: SPREADSHEET_ID,
      ...payload,
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const elapsed = Date.now() - startTime;
  let json;
  try {
    json = await res.json();
  } catch (err) {
    const raw = await res.text().catch(() => "");
    throw new Error(`Non-JSON response (status ${res.status}): ${raw.slice(0, 200)}`);
  }
  return { status: res.status, json, elapsed };
}

async function run() {
  let passed = 0;
  let failed = 0;
  const testLeadId = `synthetic-test-${randomUUID()}`;

  // Test 1: Ping / Health Check
  try {
    process.stdout.write("1. Testing Health / Ping ... ");
    const { status, json, elapsed } = await callScript("ping", {});
    if (status === 200 && json.ok && json.data) {
      console.log(`✓ Passed (${elapsed}ms)`);
      console.log(`   Spreadsheet: "${json.data.spreadsheetName}" | Sheet: "${json.data.sheetName}" | Rows: ${json.data.rowCount} | Cols: ${json.data.columnCount}`);
      passed++;
    } else {
      console.log(`❌ Failed:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 2: Unauthorized Access Rejection (Negative test)
  try {
    process.stdout.write("2. Testing Unauthorized Rejection (wrong secret) ... ");
    const { status, json, elapsed } = await callScript("ping", {}, "deliberately-wrong-secret-999");
    if (status === 401 && json.ok === false && json.error?.code === "UNAUTHORIZED") {
      console.log(`✓ Passed (${elapsed}ms) - rejected with 401 UNAUTHORIZED`);
      passed++;
    } else {
      console.log(`❌ Failed: Expected 401 UNAUTHORIZED, got:`, status, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 3: Create Synthetic Lead Record (with formula injection test string)
  try {
    process.stdout.write("3. Creating Synthetic Lead Record with Formula Protection ... ");
    const syntheticRecord = {
      id: testLeadId,
      enquiry_type: "automotive",
      full_name: "Automated Live Test Lead",
      mobile: "+919876543210",
      pin_code: "110001",
      bike_brand: "Yamaha",
      vehicle_model: "MT-15 Version 2.0",
      vehicle_type: "Sports / Naked Motorcycle",
      source_path: "/finance/bikes",
      consent: "Yes",
      lead_status: "test_pending",
      notes: "=HYPERLINK(\"https://aniket.app\", \"Test Formula Injection\")", // Formula test
    };

    const { status, json, elapsed } = await callScript("create", { record: syntheticRecord });
    if ((status === 200 || status === 201) && json.ok && json.data?.record) {
      console.log(`✓ Passed (${elapsed}ms) - Created at row ${json.data.rowIndex}`);
      passed++;
    } else {
      console.log(`❌ Failed:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 4: Read Record Back by ID
  try {
    process.stdout.write("4. Reading Synthetic Record by ID ... ");
    const { status, json, elapsed } = await callScript("read", { id: testLeadId });
    if (status === 200 && json.ok && json.data?.record?.id === testLeadId) {
      console.log(`✓ Passed (${elapsed}ms) - Name: "${json.data.record.full_name || json.data.record.CustomerName}"`);
      passed++;
    } else {
      console.log(`❌ Failed:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 5: Idempotency / Duplicate Submission Prevention
  try {
    process.stdout.write("5. Testing Duplicate Submission Idempotency ... ");
    const duplicateRecord = {
      id: testLeadId, // Same ID
      full_name: "Automated Live Test Lead (Duplicate Retry)",
      mobile: "+919876543210",
      enquiry_type: "automotive",
    };
    const { status, json, elapsed } = await callScript("create", { record: duplicateRecord });
    if (status === 200 && json.ok && json.data?.duplicate === true) {
      console.log(`✓ Passed (${elapsed}ms) - Successfully detected existing record; no duplicate row created`);
      passed++;
    } else {
      console.log(`❌ Failed: Expected duplicate: true, got:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 6: Update Record by ID
  try {
    process.stdout.write("6. Updating Synthetic Record Status ... ");
    const { status, json, elapsed } = await callScript("update", {
      id: testLeadId,
      updates: {
        lead_status: "verified_test",
        notes: `Live integration verified on ${new Date().toISOString()}`,
      },
    });
    if (status === 200 && json.ok && json.data?.updated) {
      console.log(`✓ Passed (${elapsed}ms) - Status updated to verified_test`);
      passed++;
    } else {
      console.log(`❌ Failed:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 7: Paginated Read / List
  try {
    process.stdout.write("7. Testing Bounded Paginated Query ... ");
    const { status, json, elapsed } = await callScript("read", { limit: 5, offset: 0 });
    if (status === 200 && json.ok && Array.isArray(json.data?.records)) {
      console.log(`✓ Passed (${elapsed}ms) - Total records in sheet: ${json.data.total}`);
      passed++;
    } else {
      console.log(`❌ Failed:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  // Test 8: Soft Delete Cleanup
  try {
    process.stdout.write("8. Cleaning up Synthetic Record (Soft Delete) ... ");
    const { status, json, elapsed } = await callScript("delete", { id: testLeadId, hard: false });
    if (status === 200 && json.ok && json.data?.deleted) {
      console.log(`✓ Passed (${elapsed}ms) - Marked as deleted`);
      passed++;
    } else {
      console.log(`❌ Failed:`, json);
      failed++;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    failed++;
  }

  console.log("\n=================================================================");
  console.log(` Results: ${passed} passed, ${failed} failed`);
  console.log("=================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
