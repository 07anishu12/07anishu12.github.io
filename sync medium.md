# Portfolio-to-Medium Article Synchronisation & Migration System

This document describes the design, configuration, operation, verification, and recovery procedures for migrating and synchronising articles from Aniket Thakur's personal portfolio website ([07anishu12.github.io](https://07anishu12.github.io/)) to Medium profile ([@kumaraniketn](https://medium.com/@kumaraniketn)).

---

## 1. Synchronisation Architecture

The portfolio website is the primary source of truth. Synchronisation is strictly unidirectional: articles flow from the portfolio to Medium. Content is never imported from Medium into the portfolio repository, and portfolio articles are never overwritten with Medium content.

```
┌────────────────────────────────────────────────────────┐
│             PORTFOLIO SOURCE OF TRUTH                  │
│  data/blog/{category}/{slug}.md                        │
│  - Markdown body with H2–H4 headings                   │
│  - YAML front matter (title, slug, datePublished,      │
│    coverImage, tags, sources, quickAnswer)             │
│  - Editorial approval (data/blog-editorial.json)       │
│  - Date audit verification (data/blog-date-audit.json) │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ npm run build & test
                            ▼
┌────────────────────────────────────────────────────────┐
│             GITHUB PAGES DEPLOYMENT                    │
│  .github/workflows/pages.yml                           │
│  - Generates HTML in _site                             │
│  - Validates schemas, links, sitemap.xml, llms.txt     │
│  - Deploys live canonical URL to GitHub Pages          │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ workflow_run (completed: success)
                            ▼
┌────────────────────────────────────────────────────────┐
│             MEDIUM SYNCHRONISATION ENGINE              │
│  scripts/sync-medium.mjs + tools/blog/medium-sync.js   │
│  - Discovers published, approved articles              │
│  - Computes content SHA-256 fingerprint                │
│  - Compares with durable state (data/medium-sync.json) │
│  - Formats content preserving HTML, images, callouts   │
│  - Checks canonical URL accessibility                  │
└─────────────────────┬──────────────────┬───────────────┘
                      │                  │
        If token is   │                  │ If token is
        available     ▼                  ▼ absent (default)
┌───────────────────────────┐      ┌───────────────────────────┐
│     OFFICIAL API MODE     │      │   OFFICIAL IMPORT QUEUE   │
│  POST /v1/users/{id}/posts│      │  https://medium.com/p/import│
│  - Direct automated post  │      │  - Generates durable queue│
│  - Sets canonicalUrl      │      │  - Step-by-step import UI │
│  - Records Medium story ID│      │  - Manual review & publish│
│  - Updates sync state     │      │  - --mark-imported CLI    │
└───────────────────────────┘      └───────────────────────────┘
```

### Components
1. **Source Content (`data/blog/`)**: 151 published articles across `technology` (50), `auto` (51), and `finance` (50).
2. **Synchronisation State (`data/medium-sync.json`)**: Durable local registry tracking every article's content hash, publication status, Medium story ID, Medium URL, timestamps, and error details. Not deployed to the public `_site` output.
3. **Migration Inventory (`data/medium-inventory.json`)**: Structured inventory of all 151 articles with categories, canonical URLs, publication dates, and migration statuses.
4. **Interactive Migration Studio (`tools/migration/server.js`)**: Zero-dependency local web dashboard (`npm run migration:dashboard`) with real-time progress bars, category filters (finance, technology, auto), instant search, one-click canonical URL copying, Medium import buttons, inline status/URL editing, and migration resume capability.
5. **Queue Document (`docs/medium-import-queue.md`)**: Human-readable import queue with direct links, article details, and instructions for manual import when API tokens are unavailable.
6. **Synchronisation Script (`scripts/sync-medium.mjs`)**: CLI tool providing dry-run inspections, single-article runs, controlled batch sizes, token verification, inventory exports, URL validation, and import tracking.
7. **Sync Engine Module (`tools/blog/medium-sync.js`)**: Reusable library containing discovery logic, HTML transformations, API handlers, and idempotency guarantees.
8. **Automation Workflow (`.github/workflows/sync-medium.yml`)**: GitHub Actions workflow triggered after portfolio deployments, on a daily schedule, or manually on demand.

---

## 2. Article Detection & Eligibility

Articles are discovered using the portfolio's native `readArticles({ preview: false })` parser from `tools/blog/content.js`.

### Eligibility Requirements
To be eligible for Medium synchronisation, an article must satisfy all of the following criteria:
- **Location**: Located in `data/blog/<category>/<slug>.md` where category is one of `technology`, `product`, `auto`, or `finance`.
- **Draft Status**: `draft: false`. Any file with `draft: true` is completely excluded from publication.
- **Editorial Approval**: Listed in `data/blog-editorial.json` with `status: "approved"`, reviewer name (`Aniket Thakur`), and approval date.
- **Date Audit**: Listed in `data/blog-date-audit.json` with status in `["verified", "owner-confirmed"]` and evidentiary rationale.
- **Metadata Fields**: Must contain nonempty `title`, `slug`, `description`, `category`, `author`, `datePublished`, `coverImage`, and `coverImageAlt`.
- **Public Accessibility**: Before external publication, the engine performs an HTTP check to ensure the portfolio canonical URL (`https://07anishu12.github.io/blog/<category>/<slug>/`) responds with HTTP 200.

Drafts, template files, local previews, search pages, and category indexes are ignored.

---

## 3. Supported Publishing Methods

### Platform Capabilities & Official Status
Medium's official integration policies govern how articles can be published:
- **API Status**: Medium states: *"We do not currently issue new API integration tokens or allow new applications to be created on our developer platform."*
- **Previously Issued Tokens**: Accounts that obtained a self-issued integration token prior to Medium's restriction can still use Medium's REST API (`https://api.medium.com/v1`).
- **Webpage Importer**: Medium provides an official, publicly supported URL importer at [`https://medium.com/p/import`](https://medium.com/p/import). It imports webpage content, generates a Medium story draft, and automatically assigns the source URL as the story's canonical link.

Because of these platform realities, the synchronisation system implements a dual-mode strategy:

### Mode A: Automated Official API Publishing (When Token Is Available)
When an authorized integration token is supplied via the `MEDIUM_INTEGRATION_TOKEN` environment variable or repository secret:
1. The engine calls `GET https://api.medium.com/v1/me` with `Authorization: Bearer <token>` to retrieve the authenticated user profile (`authorId`, `username`, `name`).
2. The user ID is dynamically resolved rather than hardcoded or guessed.
3. Posts are created via `POST https://api.medium.com/v1/users/{authorId}/posts`.
4. Payload format:
   ```json
   {
     "title": "Tata Aeris 2026: Should you buy it?",
     "contentFormat": "html",
     "content": "<h1>Tata Aeris 2026: Should you buy it?</h1>...",
     "canonicalUrl": "https://07anishu12.github.io/blog/auto/tata-aeris-review/",
     "tags": ["Tata Aeris", "Compact Sedans", "CNG", "Car Comparisons", "India"],
     "publishStatus": "public"
   }
   ```
5. Medium returns `HTTP 201 Created` with `data.id` and `data.url`.
6. State is recorded durably with timestamp, Medium URL, and content fingerprint.

### Mode B: Semi-Automated Import Queue (Official Fallback)
If `MEDIUM_INTEGRATION_TOKEN` is not configured or rejected by Medium:
1. The engine detects all newly published portfolio articles.
2. It registers each article in `data/medium-sync.json` with status `queued`.
3. It generates an updated Markdown queue in `docs/medium-import-queue.md`.
4. Each entry provides:
   - Article title and publication date.
   - Canonical portfolio link.
   - Direct link to Medium's importer (`https://medium.com/p/import`).
   - Step-by-step instructions for importing, reviewing canonical settings, and publishing.
5. Once imported and published on Medium, the user marks the article completed via:
   ```bash
   npm run sync:medium -- --mark-imported <slug> <mediumUrl>
   ```
6. The state transitions to `published`, and subsequent runs recognize the article as up to date.

> [!NOTE]
> In Mode B, detection, formatting, queue generation, and state management are 100% automated. The single manual step is clicking "Import" and "Publish" on Medium's webpage importer.

---

## 4. Required Configuration & Security

### Environment Variables & Secrets
| Variable / Secret Name | Required | Default | Purpose |
| :--- | :--- | :--- | :--- |
| `MEDIUM_INTEGRATION_TOKEN` | Optional | *Unset* | Pre-existing integration token issued by Medium. If absent, engine activates fallback import queue. |
| `MEDIUM_PUBLISH_STATUS` | Optional | `public` | Publication visibility on Medium: `public`, `draft`, or `unlisted`. |

### Security Measures
- **Never In Code**: Credentials must never be committed to Git. `.env` and `.env.local` are explicitly excluded in `.gitignore`.
- **GitHub Secrets**: Add `MEDIUM_INTEGRATION_TOKEN` in GitHub Repository Settings -> **Secrets and variables** -> **Actions**.
- **No Token Leaks**: Loggers, error handlers, and state files sanitize all outputs. Tokens are never logged or stored in `data/medium-sync.json`.
- **Public Build Isolation**: `tools/blog/build.js` only copies public assets into `_site`. `data/medium-sync.json`, `docs/`, `scripts/`, and `.env` files are verified by automated tests to never leak into the deployable site.

---

## 5. GitHub Actions Workflow

The workflow file is located at [`.github/workflows/sync-medium.yml`](.github/workflows/sync-medium.yml).

### Triggers
1. **Event-driven (`workflow_run`)**:
   Runs automatically whenever the website deployment workflow (`Build and deploy portfolio`) completes with conclusion `success` on `main`.
2. **Scheduled (`cron: '0 6 * * *'`)**:
   Runs daily at 06:00 UTC as an incremental sanity scan to detect newly approved articles.
3. **Manual (`workflow_dispatch`)**:
   Allows running synchronisation on demand from GitHub's UI with options for:
   - `dry_run`: `true` / `false`
   - `slug`: Specific article slug
   - `limit`: Batch limit (default `2`)
   - `skip_url_check`: Skip live HTTP check

### Concurrency & Loop Prevention
- **Concurrency Group**:
  ```yaml
  concurrency:
    group: medium-sync
    cancel-in-progress: false
  ```
  Prevents two synchronisation runs from executing concurrently or racing on state updates.
- **Loop Prevention**:
  When committing updated `data/medium-sync.json` and `docs/medium-import-queue.md`, the commit message includes `[skip ci]`. In addition, `.github/workflows/pages.yml` includes `paths-ignore` for synchronisation files, ensuring that synchronisation state commits never trigger a recursive deployment loop.
- **Separation of Concerns**:
  Synchronisation runs in an isolated workflow *after* website deployment succeeds. A transient Medium failure will never break or roll back a live website deployment.

---

## 6. Article Preservation & Formatting

The synchronisation engine formats each article into high-fidelity HTML conforming to Medium's publishing standards:

- **H1 & Headings**: Title is rendered as `<h1>`, while section headings retain their exact hierarchy (`<h2>`, `<h3>`, `<h4>`).
- **Cover Image & Artwork**: Preserves the single featured cover image in `<figure><img src="https://07anishu12.github.io/assets/images/blog/..."><figcaption>...</figcaption></figure>`.
- **Callouts & Quotes**: GitHub-style `[!NOTE]`, `[!TIP]`, and `[!IMPORTANT]` callouts are converted to semantic `<blockquote>` elements.
- **Tables & Comparisons**: Converted to clean `<table>`, `<tr>`, `<th>`, `<td>` structures.
- **Code Blocks**: Preserved in `<pre><code>` blocks with syntax language labels.
- **Lists & Numbered Steps**: Converted into standard `<ol>` and `<ul>` list items.
- **Quick Answers**: Formatted into an answer summary block at the beginning of the story.
- **Relative URL Qualification**: All root-relative links (`href="/..."`) and asset paths are converted into absolute URLs (`https://07anishu12.github.io/...`), preventing broken links on Medium.
- **Sources & References**: Sourced citation lists are appended in a dedicated references section.
- **Attribution Footer**: Concludes with a verified attribution:
  `<p><em>Originally published at <a href="CANONICAL_URL">CANONICAL_URL</a> on YYYY-MM-DD.</em></p>`.

---

## 7. Canonical URLs & SEO

Canonical URLs ensure that search engines recognize your portfolio website as the original source of every story:
- **Format**: `https://07anishu12.github.io/blog/<category>/<slug>/` (with trailing slash).
- **API Mode**: Passed explicitly in the `canonicalUrl` field of `POST /v1/users/{authorId}/posts`. Medium confirms this canonical URL in the `201 Created` response.
- **Import Queue Mode**: Medium's URL importer automatically sets the source URL as the story's canonical link. Instructions in `docs/medium-import-queue.md` prompt the author to verify this in Story Settings -> Advanced Settings -> Canonical Link before hitting publish.
- **Duplicate Prevention**: Canonical URLs are validated against existing portfolio records to prevent collisions.

---

## 8. Duplicate Prevention & State Management

Synchronisation is strictly idempotent.

### Durable State Schema (`data/medium-sync.json`)
```json
{
  "version": 1,
  "lastSyncedAt": "2026-10-23T03:28:55.330Z",
  "mode": "import_queue",
  "account": {
    "profile": "https://medium.com/@kumaraniketn",
    "username": "kumaraniketn",
    "authorId": null,
    "authenticated": false
  },
  "stats": {
    "discovered": 151,
    "eligible": 151,
    "published": 0,
    "queued": 151,
    "failed": 0,
    "modifiedRequiresReview": 0
  },
  "articles": {
    "auto/tata-aeris-review": {
      "id": "auto/tata-aeris-review",
      "category": "auto",
      "slug": "tata-aeris-review",
      "title": "Tata Aeris 2026: Should you buy it?",
      "url": "/blog/auto/tata-aeris-review/",
      "canonicalUrl": "https://07anishu12.github.io/blog/auto/tata-aeris-review/",
      "datePublished": "2026-10-21",
      "dateModified": "2026-10-21",
      "contentHash": "54807490a61fa7ad89498a3fdb3de70a1a8dfbb801ca45464521f3750058b872",
      "status": "queued",
      "mediumStoryId": null,
      "mediumUrl": null,
      "lastAttemptedAt": null,
      "lastSuccessAt": null,
      "retryCount": 0,
      "error": null,
      "importUrl": "https://medium.com/p/import"
    }
  }
}
```

### Edge Cases & Resolution Matrix
| Scenario | Detection | Action | Duplicate Risk |
| :--- | :--- | :--- | :--- |
| **New article published** | Not present in `state.articles` | Queued or published; state saved | Zero (unique ID) |
| **Unchanged article** | `existing.contentHash === currentHash` and status is `published` | Skipped automatically | Zero |
| **Article edited on portfolio** | `existing.contentHash !== currentHash` and status is `published` | **Never republish**. Medium API does not support updates. Flagged as `modified_requires_review` with alert to edit Medium story manually. | Zero |
| **API Rate Limit (HTTP 429)** | Response 429 | Increments retry count, preserves state, pauses queue | Zero |
| **Server / Network Error** | Response 5xx or fetch rejection | Records error details, increments retry count, leaves article queued | Zero |
| **Partial Failure** | Article 1 succeeds, Article 2 fails | State saved after each item; successful article marked published, failing article marked failed | Zero |

---

## 9. Initial Archive Synchronisation

The repository currently contains 151 published articles. To avoid flood-publishing or rate-limit penalties, the initial archive synchronisation is handled in a controlled, phased rollout:

### Dry Run Report
Run the dry-run inspection to see the exact state:
```bash
npm run sync:medium:report
```
Expected output:
```
----------------------------------------------------
Total Discovered Articles:              151
Eligible for Synchronisation:           151
Already Synchronised (Unchanged):       0
Modified (Review Required):             0
Ready for Publication / Import:         151
Missing or Invalid Metadata Records:    0
Duplicate Canonical / Risk Conflicts:   0
Current Operating Mode:                 import_queue
----------------------------------------------------
```

### Controlled Pilot Test
To test synchronisation with a single article without touching the remaining 150 articles:
```bash
npm run sync:medium -- --slug tata-aeris-review --dry-run
```
To run it live with a batch limit of 1:
```bash
npm run sync:medium -- --slug tata-aeris-review --limit 1
```

Once verified on Medium, mark it as imported:
```bash
npm run sync:medium -- --mark-imported tata-aeris-review https://medium.com/@kumaraniketn/tata-aeris-2026-should-you-buy-it-e6f36a
```

---

## 10. CLI Reference, Dashboard & Recovery Procedures

### Interactive Migration Dashboard
Start the zero-dependency local migration studio:
```bash
npm run migration:dashboard
```
Open [http://localhost:3333](http://localhost:3333) in your browser to access:
- **Real-Time Progress Counts**: Total (151), Published, Queued, Modified, Failed.
- **Search & Filters**: Search across titles, slugs, and tags. Filter by category (`finance`, `technology`, `auto`) and status.
- **Direct Actions**: "View Live Article", "Copy Canonical URL" (with clipboard feedback), and "Import on Medium" (copies canonical link and launches `https://medium.com/p/import`).
- **Inline Editing**: Update live Medium URLs, statuses, and migration notes with atomic persistence.
- **Resume Migration**: Automatically locates the next pending article and prepares the import flow.

### Command-Line Usage
```bash
# Start the local interactive migration dashboard
npm run migration:dashboard

# Run status inspection report
npm run sync:medium:report

# Export full migration inventory to JSON
npm run sync:medium -- --inventory data/medium-inventory.json

# Resume migration (finds next pending article and prints import details)
npm run sync:medium -- --resume

# Verify live accessibility of all portfolio canonical URLs
npm run sync:medium -- --verify-urls

# Run synchronisation in dry-run mode (no writes)
npm run sync:medium:dry-run

# Run ongoing synchronisation (processes next 2 articles)
npm run sync:medium

# Process specific batch size
npm run sync:medium -- --limit 5

# Synchronise a single article
npm run sync:medium -- --slug <article-slug>

# Test token validity
npm run sync:medium -- --verify-token

# Mark article manually imported from Medium webpage importer
npm run sync:medium -- --mark-imported <slug> <mediumUrl> [mediumStoryId]

# Re-export markdown queue
npm run sync:medium -- --export-queue
```

### Recovery Procedures

#### 1. If an article fails during API publishing
- Inspect the error in `data/medium-sync.json` under `articles[id].error`.
- Re-run for the specific article:
  ```bash
  npm run sync:medium -- --slug <failed-slug>
  ```
- If Medium API continues to fail, use the manual import fallback:
  1. Open `https://medium.com/p/import`.
  2. Paste the article's canonical URL.
  3. Publish and run `npm run sync:medium -- --mark-imported <failed-slug> <mediumUrl>`.

#### 2. If a Medium story was published but state failed to record
- Retrieve the published Medium story URL from your Medium profile.
- Execute:
  ```bash
  npm run sync:medium -- --mark-imported <slug> <mediumUrl>
  ```
- This updates `data/medium-sync.json` and `docs/medium-import-queue.md` immediately.

#### 3. If a published article was updated on the portfolio
- The sync engine flags it with status `modified_requires_review`.
- View flagged articles:
  ```bash
  npm run sync:medium:report
  ```
- Open the story on Medium, make the corresponding edits, and update the state note if necessary. The engine will never publish a duplicate story.

---

## 11. Feature Status Summary

| Capability | Status | Notes |
| :--- | :--- | :--- |
| **Article Discovery & Parsing** | Operational | Native integration with `tools/blog/content.js`. Extracts all 151 articles. |
| **Content & Image Formatting** | Operational | Generates semantic HTML, qualified URLs, single cover image, callouts, and code blocks. |
| **Canonical URL Protection** | Operational | Strict portfolio URL matching with trailing slash. SEO source attribution verified. |
| **Duplicate Prevention** | Operational | SHA-256 fingerprinting. Updates flagged for review; 0 duplicate stories created. |
| **Semi-Automated Import Queue** | Operational | Fully automated detection and durable queue in `docs/medium-import-queue.md`. |
| **CLI & State Management** | Operational | `scripts/sync-medium.mjs` supports `--dry-run`, `--limit`, `--slug`, `--mark-imported`. |
| **GitHub Actions Pipeline** | Operational | `.github/workflows/sync-medium.yml` configured with `concurrency` and `[skip ci]`. |
| **Direct API Automatic Publishing** | Supported, Awaiting Token | Functional via `/v1/users/{authorId}/posts`. Activated whenever a valid token is provided. Medium currently restricts new token generation. |
| **Manual Action Required** | Medium Web Import (Fallback) | When token is absent, clicking "Import" on `https://medium.com/p/import` and publishing draft. |
