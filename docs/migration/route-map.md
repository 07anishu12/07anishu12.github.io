# Route migration map

The original GitHub Pages domain remains canonical until an approved production cutover. No DNS changes were made.

| Existing path | Next deployment behavior |
|---|---|
| `/` | Native redesigned homepage |
| `/about.html` | Permanent redirect to `/about` |
| `/contact.html` | Permanent redirect to `/contact` |
| `/privacy.html` | Permanent redirect to `/privacy` |
| `/work.html` | Permanent redirect to `/projects` |
| `/blog/` | Native searchable library |
| `/blog/:category/` | Native category library |
| `/blog/:category/:slug/` | Native Markdown article with same canonical |
| `/blog/page/:number/` and `/blog/:category/page/:number/` | Preserved generated legacy index via fallback rewrite |
| `/projects/` | Native project catalogue |
| `/projects/:slug` | New evidence-backed case study |
| `/projects/*.html` | Preserved original case study |
| `/research/` | Native research overview |
| `/research/*.html`, `/learnings/**`, `/topics/**`, `/author/**` | Preserved generated legacy page |
| `/assets/**` | Copied existing public asset |
| `/robots.txt`, `/sitemap.xml`, root verification HTML files | Preserved; sitemap adds new pages |
| Missing native article or unknown URL | Genuine 404 |

`apps/web/scripts/prepare-public.mjs` copies the existing publisher’s `_site` public allowlist, including legacy contact/assistant JSON and published-only article images. No environment files, private source directories, or integration configuration are copied. Next fallback rewrites resolve historical directory URLs to their existing `index.html`; native routes take precedence. Legacy pages retain their original styling, scripts, search and analytics. New article pages reuse the validated Markdown renderer, editorial approvals and draft rules, with heading anchors, quick answers, image credits, sources, related reading and BlogPosting JSON-LD. Explicit pagination rewrites precede dynamic article matching. Lead forms are limited to bike/scooter/motorcycle topics and the explicit bike/contact conversion pages. Drafts are excluded.

Route inventory is the existing `sitemap.xml` plus the new paths above. The old static publishing commands remain usable. Public canonical changes require a separate approved production release.
