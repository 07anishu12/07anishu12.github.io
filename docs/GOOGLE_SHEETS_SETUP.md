# Live Google Sheets Database Setup & Operations Guide

This guide provides step-by-step instructions to connect your deployed Next.js application on Vercel to your existing Google Sheet using Google Apps Script as a serverless database backend.

---

## Architecture Overview

```
┌─────────────────────────────────┐
│ Next.js Frontend (React/Client) │
│ - LeadCaptureForm               │
│ - InquiryModal                  │
└────────────────┬────────────────┘
                 │ 1. POST /api/v1/leads/ (Client token + validation)
                 ▼
┌─────────────────────────────────┐
│ Next.js Server-Side Route       │
│ apps/web/app/api/v1/leads/      │
│ - Rate limit & Honeypot guard   │
│ - Token signature check         │
│ - Formula injection defense     │
│ - Bounded retry & error handling│
└────────────────┬────────────────┘
                 │ 2. Server-to-server POST with GOOGLE_SHEETS_API_SECRET
                 ▼
┌─────────────────────────────────┐
│ Google Apps Script Web App      │
│ scripts/google-sheets/Code.gs   │
│ - Constant-time secret check    │
│ - LockService concurrency lock  │
│ - Duplicate check by ID         │
│ - Formula protection            │
└────────────────┬────────────────┘
                 │ 3. SpreadsheetApp batch read / append / update
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Existing Google Sheet: "Database of the leads"             │
│ ID: 1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4            │
└─────────────────────────────────────────────────────────────┘
```

---

## 12-Step Setup Walkthrough

### Step 1: Open Your Existing Spreadsheet
1. Open your target spreadsheet in your browser:
   [https://docs.google.com/spreadsheets/d/1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4/edit](https://docs.google.com/spreadsheets/d/1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4/edit)
2. Verify you are signed in with the Google account that owns or has **Editor** access to this sheet.
3. Note the Spreadsheet ID: `1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4`.
   *(Do not create another spreadsheet; your existing rows and headers will be preserved.)*

---

### Step 2: Open Google Apps Script
You can open Apps Script in either of two ways:
- **Recommended**: Inside your spreadsheet, click **Extensions** in the top menu bar → select **Apps Script**. This binds the script project directly to your spreadsheet.
- Or visit [https://script.google.com/home/start](https://script.google.com/home/start) and click **New Project**.

Name your project: `Portfolio-Leads-Database-API`.

---

### Step 3: Add the Apps Script Code
1. In the Apps Script code editor, delete any starter template code in `Code.gs`.
2. Open the file `scripts/google-sheets/Code.gs` in this repository.
3. Copy its entire contents and paste it into `Code.gs` in the Apps Script editor.
4. Click the **Save** icon (disk icon or `Cmd + S` / `Ctrl + S`).

---

### Step 4: Generate Integration Secret & Configure Script Properties

1. **Generate a strong secret locally**:
   Open your terminal and run:
   ```bash
   openssl rand -hex 32
   ```
   *Example output:* `9f2b84a1e4c7309d57a2b91c0683ea19f4d71520e58c9735d648b201a73ef890`
   Keep this terminal tab open. Never commit this secret to Git.

2. **Configure Script Properties in Apps Script**:
   - In the Apps Script left sidebar, click the **Project Settings** icon (gear icon ⚙️).
   - Scroll down to the **Script Properties** section.
   - Click **Add script property**.
   - Add Property 1:
     - **Property**: `GOOGLE_SHEETS_API_SECRET`
     - **Value**: *(paste the 64-character random secret generated above)*
   - Add Property 2:
     - **Property**: `GOOGLE_SHEETS_SPREADSHEET_ID`
     - **Value**: `1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4`
   - Click **Save script properties**.

---

### Step 5: Deploy the Script as a Web App

1. In the upper-right corner of Apps Script, click the blue **Deploy** button → select **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**.
3. Fill in the deployment settings:
   - **Description**: `Production Vercel Leads Web API v1`
   - **Execute as**: **Me (your-email@gmail.com)**
     *(This ensures the script runs with your authorized permission to edit your spreadsheet.)*
   - **Who has access**: **Anyone**
     *(This allows Vercel's serverless functions to send HTTP requests to the Web App. Access is securely protected by your shared `GOOGLE_SHEETS_API_SECRET` which is validated on every single request.)*
4. Click **Deploy**.

---

### Step 6: Authorize Access and Copy the `/exec` URL

1. When deploying for the first time, Google will prompt: **Authorization required**.
   - Click **Authorize access**.
   - Select your Google account.
   - If Google shows *"Google hasn’t verified this app"*, click **Advanced** (bottom left) → click **Go to Portfolio-Leads-Database-API (unsafe)**.
   - Review permissions (*"See, edit, create, and delete all your Google Sheets spreadsheets"*).
   - Click **Allow**.
2. Once authorized, Apps Script displays your **Web app URL**:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Click **Copy** next to the Web app URL.
   *(Make sure the URL ends with `/exec`, not `/dev`.)*

---

### Step 7: Configure Environment Variables in Vercel

1. Open your [Vercel Dashboard](https://vercel.com/dashboard) and navigate to your project (`07anishu12.github.io`).
2. Go to **Settings** → **Environment Variables**.
3. Add the following three server-side variables for **Production**, **Preview**, and **Development**:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | `1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4` | Target spreadsheet ID |
| `GOOGLE_APPS_SCRIPT_URL` | `https://script.google.com/macros/s/.../exec` | Deployed Web App exec URL |
| `GOOGLE_SHEETS_API_SECRET` | `your_generated_random_secret` | Shared secret matching Script Properties |

> [!IMPORTANT]
> Never prefix these variables with `NEXT_PUBLIC_`. These are server-only credentials that must never be exposed to the browser.

---

### Step 8: Configure Local Development Environment

In your local workspace root, create or update `.env.local` (this file is already in `.gitignore`):

```bash
# In /Users/anny/Desktop/Portfolio-Website/.env.local
GOOGLE_SHEETS_SPREADSHEET_ID=1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_EXEC_ID/exec"
GOOGLE_SHEETS_API_SECRET="your_generated_random_secret"
```

---

### Step 9: Run the Live Integration Test

Run the preconfigured live integration test to verify the entire pipeline against the live spreadsheet:

```bash
node scripts/test-google-sheets-live.mjs
```

The script will execute 8 automated verification checks:
1. **Health / Ping**: Verifies spreadsheet connectivity and reads row/column count.
2. **Unauthorized Rejection**: Sends an invalid secret and verifies HTTP 401 rejection.
3. **Synthetic Record Creation**: Inserts a test lead and verifies formula injection protection.
4. **Read by ID**: Fetches the synthetic record back by stable ID.
5. **Duplicate Prevention**: Re-submits the exact same record and verifies idempotency (`duplicate: true`, no second row created).
6. **Update Record**: Updates the lead status to `verified_test`.
7. **Paginated Read**: Queries bounded records.
8. **Cleanup**: Marks the synthetic record as `deleted`.

When all 8 checks pass, you will see:
```
=================================================================
 Results: 8 passed, 0 failed
=================================================================
```

---

### Step 10: Redeploy Vercel

Trigger a redeployment on Vercel so your production serverless functions receive the new environment variables:
- Either git push a commit to your branch/main, or
- Go to **Vercel Dashboard** → **Deployments** → click the three dots on the latest deployment → **Redeploy**.

---

### Step 11: End-to-End Production Verification

1. Open your live website: `/contact` or `/finance/bikes`.
2. Submit a test enquiry through the form (e.g., Name: `Test Verification`, Mobile: `9876543210`, Bike: `Honda Activa`).
3. Within 1–2 seconds, the form will display confirmation with a unique reference ID.
4. Open your Google Sheet [1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4](https://docs.google.com/spreadsheets/d/1aA0G58mRv5ursWNuIDoDWkotXbBrTqf6vTIQKno3LV4/edit).
5. Verify that your new row appears with all columns populated.

---

### Step 12: Operations, Maintenance & Secret Rotation

#### Secret Rotation
If you ever need to rotate `GOOGLE_SHEETS_API_SECRET`:
1. Generate a new secret: `openssl rand -hex 32`.
2. In Google Apps Script, update `GOOGLE_SHEETS_API_SECRET` in **Project Settings** → **Script Properties**.
3. In Vercel, update `GOOGLE_SHEETS_API_SECRET` in **Settings** → **Environment Variables**.
4. Redeploy Vercel.

#### Updating Apps Script Code
If you modify `scripts/google-sheets/Code.gs` in the future:
1. Paste the updated code into the Apps Script editor and save.
2. Click **Deploy** → **Manage deployments**.
3. Select your active deployment → click the **Edit** (pencil) icon.
4. Under **Version**, select **New version**.
5. Click **Deploy**.
   *(Creating a new version is required for changes to take effect on the existing `/exec` URL.)*

---

## Google Sheets Database Characteristics & Limits

Google Sheets + Apps Script provides a zero-cost, serverless database ideal for portfolio and lead-generation workloads within Google's free quotas.

### Free Quotas (Consumer Google Account)
- **URL Fetch calls / Web App requests**: 20,000 calls / day
- **Simultaneous executions**: Up to 30 concurrent script executions
- **Script runtime per execution**: 6 minutes maximum (our requests complete in 200–600ms)
- **Spreadsheet size limit**: 10 million cells (or 18,278 columns)
- **LockService timeout**: 15 seconds concurrency queueing

### Concurrency & Locking
The Apps Script implementation uses `LockService.getScriptLock()`:
- When a write (`create`, `update`, `delete`) arrives, the script acquires an exclusive lock.
- Concurrent requests queue up to 15 seconds.
- Once the write completes, the lock is released in a `finally` block.
- If queue exceeds 15 seconds under high burst traffic, the script returns HTTP 503 `LOCK_TIMEOUT`, which Next.js automatically retries with exponential backoff (up to 2 retries).

### Formula Injection Protection (CWE-1236)
Spreadsheet applications evaluate values starting with `=`, `+`, `-`, `@`, `\t`, or `\r` as formulas.
- Both the Next.js server adapter (`sanitizeForSheets`) and the Apps Script (`sanitizeValue`) prefix dangerous characters with a single quote (`'`).
- In Google Sheets, this forces the cell to be rendered and stored as literal text, neutralizing formula execution.
- When records are read back by the API, the leading quote is stripped automatically.

### Recommended Backup Strategy
1. In Google Sheets: Click **File** → **Version history** → **See version history** to roll back any manual changes.
2. In Google Drive: Right-click the spreadsheet periodically and select **Make a copy** or setup a scheduled Apps Script backup to a secondary spreadsheet or Google Drive folder.
