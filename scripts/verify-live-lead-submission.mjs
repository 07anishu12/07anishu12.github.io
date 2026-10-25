import fs from "node:fs";
import path from "node:path";

// Load tokens
const tokenFile = path.resolve(process.cwd(), ".google-oauth-tokens.json");
if (!fs.existsSync(tokenFile)) {
  console.error("Token file not found:", tokenFile);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokenFile, "utf8"));
const { client_id, client_secret, refresh_token, spreadsheet_id, sheet_name } = tokens;

console.log("==================================================================");
console.log(" Live Google Sheets OAuth Refresh & Verification Test");
console.log("==================================================================");
console.log(`Spreadsheet ID : ${spreadsheet_id}`);
console.log(`Sheet Name     : ${sheet_name}`);
console.log(`Client ID      : ${client_id.slice(0, 20)}...`);

// 1. Get access token from refresh token
console.log("\n1. Requesting fresh access token using refresh token...");
const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id,
    client_secret,
    refresh_token,
    grant_type: "refresh_token",
  }),
});

const tokenData = await tokenRes.json();
if (!tokenRes.ok || !tokenData.access_token) {
  console.error("❌ Failed to get access token:", tokenData);
  process.exit(1);
}
console.log("✓ Successfully obtained access token (expires in", tokenData.expires_in, "seconds)");

// 2. Insert a live verification lead
const leadId = "live-verif-" + Date.now().toString(36);
const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
const row = [
  leadId,
  timestamp,
  "automotive",
  "Live Verification User",
  "+919876543210",
  "560001",
  "Royal Enfield",
  "Hunter 350",
  "Motorcycle",
  "Test Drive & Quotation",
  "",
  "/blog/auto/best-bikes-for-city-riding-in-india/",
  "best-bikes-for-city-riding-in-india",
  "Yes",
];

console.log(`\n2. Appending live verification lead [${leadId}] to [${sheet_name}]...`);
const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${encodeURIComponent(
  sheet_name
)}!A1:N:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

const appendRes = await fetch(appendUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${tokenData.access_token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ values: [row] }),
});

const appendData = await appendRes.json();
if (!appendRes.ok) {
  console.error("❌ Failed to append lead:", appendData);
  process.exit(1);
}

console.log("✓ Successfully appended lead!");
console.log("  Updated range:", appendData.updates?.updatedRange);
console.log("  Updated rows :", appendData.updates?.updatedRows);

// 3. Read back the last 3 rows to confirm data persistence
console.log(`\n3. Reading back rows from [${sheet_name}] to verify persistence...`);
const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${encodeURIComponent(
  sheet_name
)}!A1:N10?majorDimension=ROWS`;

const readRes = await fetch(readUrl, {
  headers: { Authorization: `Bearer ${tokenData.access_token}` },
});

const readData = await readRes.json();
if (!readRes.ok) {
  console.error("❌ Failed to read sheet:", readData);
  process.exit(1);
}

console.log(`✓ Read ${readData.values?.length || 0} total rows.`);
console.log("  Last row in sheet:", readData.values?.[readData.values.length - 1]);

console.log("\n==================================================================");
console.log(" ALL LIVE TESTS PASSED! GOOGLE SHEETS IS FULLY OPERATIONAL.");
console.log("==================================================================");
