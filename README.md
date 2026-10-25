# Aniket Thakur · AI Researcher & Associate Product Manager

[![Live site](https://img.shields.io/badge/live%20site-07anishu12.github.io-1D4ED8?style=flat-square)](https://07anishu12.github.io) [![License: MIT](https://img.shields.io/badge/license-MIT-FAF9F6?style=flat-square)](LICENSE)

> **Building AI systems, products, and intelligent workflows.**
> Applied AI engineer who ships product — and a PM who can build the model.

![Aniket Thakur Portfolio](assets/img/aniket-portrait.png)

## About

This is the personal portfolio website of **Aniket Thakur**, based in New Delhi, India. It represents work across the convergence of **AI Engineering × Product Ownership × Financial Engineering**: Generative AI, Graph Neural Networks, fintech lending workflows, and the product ownership required to translate machine learning into real-world business outcomes.

Aniket is an Associate Product Manager at Drivio Technologies (previously Business Analyst), conducted AI research on Graph Neural Networks and multi-LLM data synthesis at Okinawa Institute of Science and Technology (OIST) in Japan, and consulted on startup GTM and financial analysis at Analy Assist. He is an M.Sc. Financial Engineering candidate at WorldQuant University and graduated with a B.Sc. in Data Analytics from DSEU Shakarpur-2 (GPA 3.82/4.0, Rank 2).

## Next.js migration and lead platform

The migration continues in this repository on `migration/portfolio-lead-platform`.
Read [memory.md](memory.md) before making changes. The current GitHub Pages site
remains the rollback deployment; this branch does not authorize production cutover.

- `apps/web`: Next.js frontend, independently deployable to Vercel.
- `apps/api`: Hono API and PostgreSQL-backed lead processing worker.
- `packages/contracts`: shared validation and response contracts.
- `data/blog` and `tools/blog`: preserved Markdown publishing workflow.

Use Node.js 22 or newer and the pinned pnpm version in `package.json`:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm check
pnpm --filter @portfolio/api typecheck
pnpm --filter @portfolio/api test
pnpm --filter @portfolio/api build
pnpm --filter @portfolio/web build
```

Copy each application's `.env.example` into an ignored local environment file and
supply credentials through the hosting provider for deployment. Never expose database,
Google, or WhatsApp credentials through `NEXT_PUBLIC_*` variables. See the API README
for migrations and worker commands, [architecture](docs/architecture/overview.md),
[deployment](docs/deployment/vercel.md), and the
[acceptance report](docs/migration/acceptance-report.md) for executed checks and blockers.
Provider code is not proof of live delivery.

## Live Site

**[https://07anishu12.github.io](https://07anishu12.github.io)**

Source pages remain at the repository root. The new Pages workflow builds and deploys only `_site/`; see the Blog publishing and deployment instructions below.

## Architecture

- **Home (`index.html`)** — Asymmetric editorial hero with full-resolution portrait, clean proof statistics, 3-pillar focus (AI, Product, Finance), featured Laya case study, secondary systems, career progression, OIST research monograph, education, and direct contact.
- **About (`about.html`)** — Comprehensive personal profile, current focus at Drivio, trajectory from New Delhi to Okinawa, categorized technical toolkit, and academic background.
- **Work (`work.html`)** — Case-study index highlighting Laya (historical outcome claims require supporting evidence), Prompt-Based Business Intelligence, osTicket AI automation, and Multi-LLM Orchestration with structured problem, approach, tech, and verified outcome cells.
- **Learnings (`learnings.html`)** — Clean editorial state with categorized topics (AI Engineering, Fintech, Product, Research) and dynamic data rendering.
- **Contact (`contact.html`)** — Direct contact information (email, phone, international WhatsApp, socials) paired with a static WhatsApp enquiry workflow and prefilled email fallback.

## Design System

- **Light-First Editorial Palette:** Warm ivory canvas (`#FAF9F6`), crisp surface cards (`#FFFFFF`), deep charcoal typography (`#121316`), and sophisticated sapphire accent (`#1D4ED8`).
- **Typography:** `Plus Jakarta Sans` for modern geometric clarity, `Newsreader` (italic serif) for editorial nuance, and `JetBrains Mono` for select metadata and code tags.
- **Whitespace & Rhythm:** Large intentional negative space, fine hairline dividers, and asymmetric editorial balance rather than repetitive dashboard boxes.
- **Accessibility:** Semantic HTML5 landmarks, single H1 per page, high WCAG contrast, visible focus rings, skip link, and `prefers-reduced-motion` compliance.

## Directory Structure

```text
Portfolio-Website/
├── index.html
├── about.html
├── work.html
├── learnings.html
├── contact.html
├── assets/
│   ├── Aniket_Thakur_Resume.pdf
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── aniket-portrait.png
├── data/
│   ├── assistant.json
│   ├── contact.json
│   ├── experience.json
│   ├── learnings.json
│   ├── projects.json
│   └── skills.json
├── sitemap.xml
├── robots.txt
├── README.md
├── LICENSE
└── .nojekyll
```

## Contact

- **Email:** [kumaraniketn@gmail.com](mailto:kumaraniketn@gmail.com)
- **Phone (India):** [+91 8448769791](tel:+918448769791)
- **WhatsApp (International):** [+81 70-1290-5081](https://wa.me/817012905081)
- **GitHub:** [github.com/07anishu12](https://github.com/07anishu12)
- **LinkedIn:** [aniket-thakur-a23a9b372](https://www.linkedin.com/in/aniket-thakur-a23a9b372)
- **X:** [@07anni04](https://x.com/07anni04)

## License

MIT. See [LICENSE](LICENSE).

## Blog publishing

The Blog extends the existing static site. Learnings, topic hubs, projects, research, the author profile, contact tools, and portfolio content remain in place. The build reuses the homepage header/footer and existing design tokens. There is no browser-side article loading, framework, or production backend.

Use Node.js 22 or newer (CI uses Node 24):

```sh
npm ci
npm test
npm run build
npm run check
```

`npm run build` creates real article `index.html` files, main/category listings (9 articles per page), static pagination links, homepage Latest Articles, related articles, `/blog/search.json`, `/llms.txt`, and the combined sitemap. Production output is `_site/`. Root `blog/` files are also generated for inspection and version control. The blog/category pages show an honest empty state when there are no articles in that category. The first Auto article is `/blog/auto/tata-aeris-review/`. No demonstration articles are published.

### 1. Create an article

```sh
npm run blog:new -- technology my-article-slug
# Or:
npm run blog:new -- auto my-car-guide
npm run blog:new -- finance my-finance-explainer
```

This copies the appropriate draft template to `data/blog/{category}/{slug}.md` without overwriting an existing file. Edit that Markdown file. Reusable templates live in `tools/blog/templates/`. Categories are `technology`, `auto`, and `finance`; the metadata category must match its directory. `author` is the existing identity, `Aniket Thakur`.

The permanent URL comes from category + slug, for example `/blog/auto/my-car-guide/`. Keep both stable after publishing. Changing a slug removes the old generated page; add an intentional redirect separately if you need to preserve an established URL. `page`, `index`, and the local `formatting-example` slug are reserved.

### 2–3. Add the single cover image

Copy your own licensed image to `assets/images/blog/{article-slug}/`. For example, after exporting your selected image as WebP:

```sh
cp /absolute/path/to/your-selected-cover.webp assets/images/blog/my-car-guide/cover.webp
```

In `data/blog/auto/my-car-guide.md`, set:

```yaml
coverImage: "/assets/images/blog/my-car-guide/cover.webp"
coverImageAlt: "Describe the actual subject and useful visual details."
imageCaption: ""        # Optional visible caption
imageCredit: ""         # Optional genuine credit; never invent one
imageSourceUrl: ""      # Optional original HTTP(S) source URL
```

One file supplies the article cover, listing image, related thumbnail, and social metadata. No thumbnail upload is needed. The article shows the full image at up to its natural size; cards use a consistent crop. Image dimensions are read during the build. PNG, JPEG, WebP, AVIF, and SVG dimensions are supported. Prefer an appropriately compressed WebP/AVIF, usually at no more than the resolution needed for your cover; inspect important subjects in the card crop. Do not enlarge a small source merely to meet a suggested size. SVG uploads must be trusted files you authored or reviewed.

If you explicitly choose separate sharing artwork, place it in the same article image folder and add both optional fields:

```yaml
socialImage: "/assets/images/blog/my-car-guide/sharing-poster.webp"
socialImageAlt: "Describe the poster and its important text."
```

This changes Open Graph and Twitter sharing metadata only. The article still has one main image; listings, search cards and visible-image structured data continue to use `coverImage`. Without these fields, sharing uses the cover. The build validates and deploys the selected social asset, and excludes it while the article is a draft. Sharing services control their own crop and may cache older previews.

To replace it, copy the new image into that folder and change `coverImage` and `coverImageAlt` in the Markdown. Replacing a file at the same URL may be cached by browsers, GitHub Pages, and social platforms. Use a new descriptive filename (for example, `front-view-2026.webp`) when the changed image needs a new URL. Rebuild and redeploy.

### 4. Format the body

The `title` generates the only H1. Optional `seoTitle` supplies a separate exact HTML/social title when you want different wording; otherwise the page uses the article title with the portfolio name. Begin body headings at `##`; `###` and `####` are also supported. The build rejects extra H1s, H5/H6, body images, missing covers/alt text, invalid dates, and duplicate output paths. Raw HTML is escaped; scripts and dangerous Markdown links cannot become executable article HTML. See [Markdown-it safety guidance](https://github.com/markdown-it/markdown-it/blob/master/docs/safety.md).

```markdown
## A heading

Ordinary paragraph with **bold**, *italic*, ***bold italic***,
~~strikethrough~~, and `inline code`.

**Introductory label:** The requested “sub-bold” style is ordinary bold text.

- **A bold label:** A bullet point.
  - A nested bullet.

1. First step.
2. Second step.
   1. A nested step.

| Comparison | Detail |
| --- | --- |
| One option | A sourced statement |

> An ordinary blockquote.

> [!NOTE]
> Supporting context.

> [!TIP]
> A practical suggestion.

> [!IMPORTANT]
> Essential information.

[Descriptive link label](/learnings.html)

A footnote reference.[^detail]

[^detail]: A supporting explanation.

---
```

Use fenced code blocks with a language immediately after the opening three backticks (`javascript`, `python`, `text`, etc.). A visible language label is generated; no heavy syntax-highlighting library is downloaded. Tables receive semantic column headers and a keyboard-focusable horizontal scroll region on small screens. H2/H3 headings receive stable unique anchors; three or more generate a table of contents. The author chooses the sequence and mix of sections.

For source references, use this front matter shape:

```yaml
sources:
  - title: "The actual title of the source you consulted"
    url: "https://github.com/markdown-it/markdown-it/blob/master/docs/safety.md"
```

The URL above is a real example of the required structure. Replace both fields with the actual reference for your article. The visible Sources section is generated from this list. Inline reference links are also supported. Link to evidence for prices, specifications, figures, and claims; distinguish sourced facts, manufacturer statements, your analysis, and personal opinion. Do not invent testing, ownership experience, qualifications, ratings, or returns. Auto templates prompt for model year, market, dated prices and running-cost assumptions; Technology templates prompt for compatibility and limitations; Finance templates prompt for dates, assumptions, formulas and risks. Finance pages automatically include an educational-content disclaimer.

### 5. Topic tags

```yaml
tags: ["Electric Vehicles", "Ownership Costs", "India"]
```

Tags describe topics; H1–H4 headings organise the body. Topic links open the blog's tag filter, and search covers title, description, tags, and body text across all pagination pages. No thin tag archive pages are generated. Category links and pagination work with JavaScript disabled; search is an optional enhancement. `featured: true` adds a visible featured badge. Latest Articles remains ordered by publication date.

### 6. Preview drafts locally

After adding the cover and completing required metadata:

```sh
npm run preview
```

Open `http://127.0.0.1:4173/blog/`. This builds `_preview/` with drafts and the comprehensive synthetic formatting example at `http://127.0.0.1:4173/blog/technology/formatting-example/`. It demonstrates cover metadata, tags, H2/H3/H4, emphasis, lists, nested lists, tables, quotes, code, callouts, footnotes, and references. Preview pages are noindex, responses carry `X-Robots-Tag`, the server binds only to localhost, and Analytics is disabled. Preview feeds and sitemap list published URLs only. Stop with Ctrl+C and rerun after edits. Set `PORT=4174 npm run preview` if needed.

`npm run serve` previews the production artifact without drafts. Never deploy `_preview/` or serve the repository root as a production website. Drafts in a **public GitHub repository are still visible as repository source**, even though they are excluded from the website artifact; keep sensitive unpublished text outside a public repository.

### 7–8. Publish and update

Set `draft: false` only after review. `datePublished` must be the genuine publication date in quoted `YYYY-MM-DD` format. Leave `dateModified` empty initially; set it to a genuine substantive update date when updating text, data, or the main image. Do not reset dates on unchanged rebuilds. Future dates and invalid calendar dates are rejected; scheduling is manual.

```sh
npm test
npm run build
npm run check
```

All derived blog output is updated automatically. Drafts are excluded from production HTML, cards, related articles, homepage, search, llms.txt, sitemap, and uploaded image assets. Deleting an article, changing its slug, or setting `draft: true` removes its old **owned** generated files on the next build. `.blog-generated.json` records file ownership and hashes. Keep it under version control. Do not hand-edit generated blog pages; edit Markdown instead. If an owned page was manually changed, the build stops rather than deleting/overwriting it. Move your manual work out of the generated path and restore the generated version before rebuilding. Unrelated manually maintained files are preserved.

The existing Learnings Studio (`npm run admin`) remains available. If you edit Learnings JSON directly, run `npm run build:content`, then `npm run build`. The Learnings generator now reapplies the shared integration and combined sitemap after rebuilding its pages.

### 9. Deploy through GitHub Pages

The previous Pages configuration served `main` at `/` directly. **This implementation requires repository Settings → Pages → Build and deployment → Source to be GitHub Actions.** This is necessary to deploy `_site/` alone and keep draft Markdown, templates, local examples, and admin tools out of the public website. See [GitHub's custom workflow instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The equivalent one-time authenticated CLI setting is documented by the [Pages REST API](https://docs.github.com/en/rest/pages/pages):

```sh
gh api --method PUT repos/07anishu12/07anishu12.github.io/pages -f build_type=workflow
```

Then review and commit the changes, including generated root blog pages, the ownership manifest, source files, assets and lockfile:

```sh
npm ci
npm test
npm run build
npm run check
git diff --check
git status --short
# After reviewing git status and the diff, stage the intended implementation.
git add .
git commit -m "Add static blog publishing and Google integrations"
git push origin main
```

`.github/workflows/pages.yml` installs locked dependencies, runs tests, builds, validates, and uploads **only `_site/`** before deployment. Pull requests validate without deploying. Check the Actions run and deployment URL. `_site/`, `_preview/`, and `node_modules/` are ignored by Git. Existing root HTML and portfolio URLs are preserved. Nested blog URLs resolve to physical `index.html` files, including on refresh. The genuine `404.html` is returned for missing paths; there is no SPA redirect. `robots.txt` keeps the production sitemap directive and allows public crawling. Sitemap portfolio entries retain existing lastmod values; article/category entries derive dates from content metadata and do not change every build.

### 10. Configure GA4

GA4 is configured with the owner-supplied Measurement ID in **one location**, `assets/js/site-config.js`:

```javascript
measurementId: 'G-JB7DKFEC0Q' // Empty string disables the Google tag.
```

Find it in Google Analytics → Admin → Data streams → select the website stream → Measurement ID. Check that the stream Website URL is `https://07anishu12.github.io/`. Rebuild and deploy after changing it. Never add a second gtag/GTM snippet. No service-account key or private credential is needed.

In the web stream's Enhanced measurement settings:

- Keep **Page views on**; disable advanced history-change page views for this ordinary static site.
- Keep **File downloads on**. Resume downloads use the built-in `file_download` event; no duplicate custom download event is emitted. Filter the file name for `Aniket_Thakur_Resume.pdf`.
- Turn **Outbound clicks, Site search, and Form interactions off**. The code sends privacy-limited custom reference/contact/share events instead. This avoids duplicated interactions and prevents enhanced measurement from collecting contact destinations, search terms, or form-related data.
- Other options such as scroll measurement are optional. Review any future measurement changes for unintended personal data.

One GA4 config sends the normal page view; there is no second manual page-view event. `share` records the method and article canonical URL; `contact_click` records only `email`, `phone`, or `whatsapp`; `outbound_reference` records only the destination domain for external body/source links. Blog events include `article_category` and `article_slug`. Link text, contact addresses/numbers, query strings, fragments, and form contents are not sent by the integration. Page location uses the static canonical; referrer is limited to its origin. Google signals and ad-personalisation signals are disabled. Resume `file_download` is provided by enhanced measurement. Register event-scoped custom dimensions for `article_category`, `article_slug`, `contact_method`, and `reference_domain` if you want them in report breakdowns.

Tracking runs only on the exact production origin, never localhost, file previews, another host, or the marked draft preview. No consent mechanism existed. If your site adds one, set `requireAnalyticsConsent: true`; have its explicit grant set `window.portfolioAnalyticsConsent = true` and dispatch `new Event('portfolio:analytics-consent')`. Set it to false and dispatch the same event on withdrawal. The Analytics loader waits for the grant; do not treat the config flag as a consent UI.

### 11. Search Console verification and sitemap

Use the **URL-prefix property** `https://07anishu12.github.io/`, not DNS verification for the parent `github.io` domain. The supplied file `google983893da26c421d4.html` is preserved at the repository root with the exact downloaded contents. It verifies Search Console ownership; it does not enable Analytics tracking.

To reimport the same original file and build:

```sh
npm run search-console -- import /Users/anny/Downloads/google983893da26c421d4.html
npm run build
npm run check
```

The importer validates the verification document and copies its bytes unchanged into the root alongside `index.html`. Every production build copies root `google*.html` files without rewriting them; validation checks their exact bytes. Keep the actual verification file under version control permanently. Commit and deploy it through the workflow.

After deployment:

```sh
npm run search-console -- check google983893da26c421d4.html
```

This requests `https://07anishu12.github.io/google983893da26c421d4.html`, requires HTTP 200 with no redirect, and compares the response bytes to the local original. **Only after this passes, click Verify in Search Console.** Then open Sitemaps and submit `https://07anishu12.github.io/sitemap.xml`. See [Google's ownership verification instructions](https://support.google.com/webmasters/answer/9008080?cq_net=g&hl=en). An Analytics tag does not perform HTML-file verification.

### 12. Link Search Console with GA4

Once the URL-prefix property is verified, use GA4 Admin → Product links → Search Console Links → Link → Choose accounts → select the verified `https://07anishu12.github.io/` property → Confirm → Next → choose its matching web stream → Next → review and Submit. This requires verified Search Console ownership and Editor access to GA4. Follow [Google's linking instructions](https://support.google.com/analytics/answer/10737381?hl=en). No account link was created or claimed during local implementation.

### 13. Check visits and indexing

After deploying a real Measurement ID, open the production site through Google Tag Assistant and GA4 Realtime. Confirm one page view per page load; click an article share, resume download, contact link, and reference, and inspect the expected events. Confirm no personal fields are present. Use a separate clean browser session if filters/ad blockers suppress your test. The local test suite verifies loader gates, one initialization, event payloads, and no custom duplicate download event; **it does not prove Google received real traffic**. See Google's [page-view documentation](https://developers.google.com/analytics/devguides/collection/ga4/views?technology=websites) and [enhanced measurement documentation](https://support.google.com/analytics/answer/9216061?hl=en).

In Search Console URL Inspection, enter an actual published canonical article URL, run Test live URL, inspect rendered text/canonical/crawl access, then request indexing when appropriate. Check Pages indexing and sitemap processing over time. Search Console reporting may lag publication. These tools do not guarantee indexing, rankings, or rich results.

### Validation and implementation status

`npm test` exercises formatting, unsafe content, required metadata, dates, path collisions, pagination, related cards, publishing/unpublishing/deletion/slug changes, safe stale-output removal, draft isolation, deterministic sitemap dates, verification bytes, and Analytics gates/events using explicitly synthetic fixtures in temporary workspaces. `npm run check` validates the deployable portfolio/blog HTML, internal links and fragments, canonicals, JSON-LD, single covers and dimensions, sitemap/search/llms.txt inclusion, robots rules, RSS retirement, draft/source exclusion, and shared Analytics script counts. `npm run preview` supports a desktop/mobile visual check of the comprehensive local example.

Implementation delivery includes the Blog generator/templates (`tools/blog/`), source directories (`data/blog/`), generated routes (`blog/`), blog CSS/JS and central Analytics config (`assets/`), navigation/head integration across portfolio HTML, Latest Articles on `index.html`, combined `sitemap.xml`, Pages workflow, package scripts/lockfile, and these instructions. The root `robots.txt` already had the correct crawl policy/sitemap and was preserved. The genuine verification file was deployed and checked for HTTP 200 with exact bytes. The owner-supplied GA4 ID is configured centrally. GA4 Realtime confirmation, stream Enhanced measurement settings, Search Console account verification/sitemap submission, and account linking still require Google account access or user confirmation. The Pages workflow handles website deployment independently of those Google account steps.


Local validation performed on 21 October 2026: all 7 test groups passed, including the original `build:content` command in an isolated copy; `npm ci`, the production build, `npm run check`, `npm audit` (0 vulnerabilities), and `git diff --check` passed. The initial production validator inspected 31 HTML pages and 30 sitemap URLs before the first article was added. The Tata Aeris publication adds one full article page and sitemap entry. The synthetic article passed axe WCAG 2 A/AA and WCAG 2.1 AA checks at 1440px and 390px with **0 detected violations** after fixes; this automated check is not a complete accessibility certification. Neither viewport had document overflow; the mobile table scrolled within 358px while its content remained 480px wide. The mobile Blog link, full-text search, topic filter, and real HTTP 404 response were verified in the browser. Home, About, Contact, Learnings, an existing note, and Blog returned HTTP 200 at both widths with no JavaScript errors. Local article navigation samples recorded DOMContentLoaded at 24ms (desktop) and 90ms (mobile); these are local browser timings, not production Core Web Vitals or a Lighthouse score. No Google Analytics requests occurred during draft preview. These local checks do not confirm a real verification-file response, GA4 collection, or Google account verification/link.

Article-image follow-up: listing, category, and filtered-search image previews were confirmed loaded at both 1440px and 390px. Cards reuse `coverImage` with `coverImageAlt`; initial listing images load eagerly, and validation now rejects missing/mismatched card previews. The Auto article uses its selected cover on the article, blog/category/search cards and homepage card; the synthetic formatting example remains local-only. Optional separate sharing artwork is documented above.


Tata Aeris publication checks (21 October 2026): the research-supported article is `data/blog/auto/tata-aeris-review.md`, initially published with a 20,436-byte sourced WebP cover. The current user-supplied artwork is described below. The exact `seoTitle` is separate from the visible H1. The rewrite includes dated launch-price references, explicit mileage limitations, a concise FAQ, linked sources, and an educational buying comparison without claiming an independent road test. Seven test groups passed; the production validator checked 32 HTML pages and 31 sitemap URLs. Browser checks at 1440px and 390px found no document overflow and zero detected axe WCAG 2 A/AA or WCAG 2.1 AA violations on the article. The cover, blog/search thumbnails, mobile menu, collapsible contents and heading links worked. Comparison cells retained a 150px minimum width on mobile and scrolled inside their container. These checks establish the tested behaviour, not perfect accessibility, search rankings, or inclusion in search/AI answers.

### Answer panels and enquiry links

New article templates include a `quickAnswer` block. Write its reader question and direct answer first, then add 1–4 factual `label`/`value` pairs, 1–3 `goodFor` points and 1–3 `watchFor` points. Optional `note` supplies the date or scope of the facts. The builder places this visible, server-rendered panel before the cover and includes the same answer in `BlogPosting.abstract`. Blue identifies the answer, green identifies a good fit, and amber identifies checks/limitations; visible labels convey the meaning without relying on colour alone. These colours do not certify a claim or assign a rating.

Use `> [!TIP]` for a green practical takeaway, `> [!IMPORTANT]` for an amber decision or limitation, and `> [!NOTE]` for blue context. Keep each highlight short. Lead body sections with a question and a direct answer, then supply detail for readers who want it.

`showSources: false` removes the separate bibliography from an article while retaining research references in its source metadata. Keep useful contextual links beside the facts readers may want to check; do not remove image attribution. Other articles can use `showSources: true` for the original Sources section.

`enquiry: true` adds a bottom WhatsApp/contact block. It reads the existing number from `data/contact.json` and pre-fills only the public article URL and a generic question. Clicking opens WhatsApp; it does not send a message automatically. The portfolio assistant remains accessible after the footer on phones so it cannot cover the article text.

For AI search, the useful changes are clear visible answers, distinct headings, dated facts, contextual evidence, author attribution, internal links and matching structured data. The sitemap, canonicals and crawl access continue to work; RSS has been retired at the owner’s request. There is no special schema or AI text file required for Google's AI features, and neither an optimization score nor inclusion in an AI answer is guaranteed. See [Google's guidance for AI search features](https://developers.google.com/search/docs/appearance/ai-features).

Answer-first mobile update (21 October 2026): the article now starts with a visible question/answer panel, two dated launch-price facts and labelled good-fit/check-first guidance before its single cover image. The body is approximately 1,072 rendered words, organised into short questions, bullets and coloured notes. The separate bibliography is removed from this article; contextual links and image credit remain. All 8 test groups passed, along with production validation of 32 HTML pages and 31 sitemap URLs. Browser checks at 320px, 390px and 1440px found no document overflow and zero detected axe WCAG 2 A/AA or WCAG 2.1 AA violations. At 390 × 844, the complete answer panel fitted in the initial viewport. The full-guide anchor, WhatsApp destination/prefill and full-width mobile enquiry actions were checked; no WhatsApp message was sent.

Blog stylesheets use a content hash in their URL. Each CSS change produces a new asset URL in generated and portfolio pages, avoiding stale styling from the GitHub Pages browser cache without changing article URLs.

Artwork update (21 October 2026): the user-supplied landscape is the full article cover and listing image at `assets/images/blog/tata-aeris-review/tata-aeris-golden-hour-cover.webp` (1672 × 941; 255,406 bytes). The supplied portrait poster is separate sharing artwork at `assets/images/blog/tata-aeris-review/tata-aeris-review-poster.webp` (1122 × 1402; 330,766 bytes). Both are compressed from the supplied PNGs without resizing. The visible caption identifies illustrative artwork and removes the earlier manufacturer attribution. All 9 test groups and the production validator passed. Article and blog browser checks at 390px and 1440px found loaded images, no document overflow, and zero detected axe WCAG 2 A/AA or WCAG 2.1 AA violations. There is still only one main article image; sharing services control their preview crop.

### Crawler files and RSS removal

RSS was retired at the owner's request on 21 October 2026. The build removes the old **owned** `blog/feed.xml`, excludes the feed from production and local preview, and removes its visible navigation and HTML discovery links. Its production URL returns the site's normal HTTP 404 after deployment. The raw XML display was normal browser behaviour for RSS, not a publishing error.

`robots.txt` allows public HTML and assets, keeps the canonical sitemap directive, and disallows `/admin/`, `/tools/`, `/blog/feed.xml`, and `/blog/search.json`. Search still uses the JSON index in the browser. Robots rules control cooperative crawling; they do not provide access control or guarantee removal of a URL already known to a search engine. No unsupported `noindex` directive is placed in robots.txt. See [Google's robots guidance](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec).

The build generates the conventional `/llms.txt` file (plural) with a concise portfolio overview, verified internal routes, category links, all published article URLs and their dates, and content context. Drafts, source files, search/filter URLs, and the retired feed are omitted. Edit its generator in `tools/blog/build.js` when changing the site overview; article entries update from Markdown automatically. Its role is a navigation aid for systems that choose to use it, following the [llms.txt proposal](https://llmstxt.org/). It does not grant permissions, override robots.txt, or make ranking/citation claims.

The validator checks every llms.txt link, published article inclusion, RSS absence, feed/search crawl restrictions, public-page/image/verification crawl access, and unchanged verification-file bytes. Google does not require an AI text file for its AI search features; preserve useful content, evidence, author information, accessible HTML, and canonical internal links as described in [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features). No directory submissions or external messages are performed by the build.

### GA4 activation

The owner supplied `G-JB7DKFEC0Q` on 25 October 2026. The shared loader initialises this ID once on the exact production origin and sends the default page view. All 32 public HTML pages include one versioned configuration script followed by one Analytics loader. Configuration URLs use a content hash so an older cached empty ID does not delay activation after deployment. Local and draft-preview tracking stays disabled.

The implementation includes `share`, `contact_click`, and `outbound_reference` events and article category/slug context. Resume downloads rely on Enhanced measurement `file_download`. Complete the stream settings described above: Page views/File downloads on, Outbound clicks/Site search/Form interactions off. Those Google account settings and actual event collection must be confirmed in Tag Assistant or Realtime; installed code and passing local tests alone do not prove receipt. Chrome computer-use access was unavailable during implementation, so no account setting, Search Console link, custom dimension, or Realtime result is claimed as configured or confirmed.
