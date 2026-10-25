import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const tokenFile = path.resolve(process.cwd(), ".google-oauth-tokens.json");
const tokens = JSON.parse(fs.readFileSync(tokenFile, "utf8"));

const envs = [
  { name: "GOOGLE_SHEETS_SPREADSHEET_ID", value: tokens.spreadsheet_id, sensitive: false },
  { name: "GOOGLE_SHEETS_SHEET_NAME", value: tokens.sheet_name || "Sheet1", sensitive: false },
  { name: "GOOGLE_CLIENT_ID", value: tokens.client_id, sensitive: false },
  { name: "GOOGLE_CLIENT_SECRET", value: tokens.client_secret, sensitive: true },
  { name: "GOOGLE_REFRESH_TOKEN", value: tokens.refresh_token, sensitive: true },
];

console.log("Configuring Vercel Environment Variables for project 07anishu12.github.io...");

for (const env of envs) {
  const sensitiveFlag = env.sensitive ? "--sensitive" : "--no-sensitive";
  console.log(`Setting ${env.name}...`);
  try {
    execSync(
      `vercel env add ${env.name} --environment production,preview,development --force --value "${env.value}" ${sensitiveFlag} --yes`,
      { stdio: "pipe" }
    );
    console.log(`✓ ${env.name} set successfully`);
  } catch (err) {
    console.error(`Failed to set ${env.name}:`, err.stderr?.toString() || err.message);
  }
}
