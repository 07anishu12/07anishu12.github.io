# Article reading redesign

## Audit and implementation scope

- Canonical content: `data/blog/**/*.md`; `tools/blog/content.js` validates front matter and renders Markdown (H2–H4, stable IDs, scoped table headers, footnotes and callouts).
- `apps/web/scripts/prepare-public.mjs` emits the lightweight catalog and full article JSON. `apps/web/lib/blog.ts` loads these server-side.
- Public reading routes: `apps/web/app/blog/[category]/[slug]/page.tsx` (all four categories) and `apps/web/app/writing/[slug]/page.tsx` (AI series with separate metadata and previous/next links).
- Shared UI: Breadcrumbs, ArticleCardImage, ArticleTableOfContents. Site styling is plain CSS with Tailwind available in `app/globals.css`.
- Metadata is generated in each route; `components/StructuredData.tsx` emits BlogPosting, WebPage and BreadcrumbList, with site-wide Person/WebSite entities.
- Summary data: quickAnswer question, answer, facts, goodFor, watchFor, note. Sources supply title and URL only. Many FAQ items already exist verbatim in the Markdown body. No invented publisher, source classification, reviewer or summary fields.
- Static publisher `tools/blog/pages.js` remains the legacy export; this redesign targets the live Next.js reading routes, including the writing series. No source Markdown, URLs, metadata or generator output is rewritten.

## Design

Read mode: warm paper, white summary surface, forest-green navigation and links, subtle neutral rules, existing Jakarta Sans. A 740px text column with a 240px desktop navigation rail; a single column below 1100px. Body text 18px desktop / 17px mobile with 1.75 line height. Native details for navigation and FAQs keep content available without JavaScript. Only active-section navigation needs client enhancement.

## Delivered changes

- Both article route templates consume shared `ArticleHeader`, `ArticleHero`, `ArticleOverview`, `ArticleBody`, and `ArticleAuthorInformation` components.
- `ArticleEditorial.tsx`: semantic header, linked author, UTC-formatted machine-readable dates, original image/caption/credit, source-backed executive summary/fact grid, and the renamed two-column audience/considerations lists. Optional fields are omitted.
- `ArticleTableOfContents.tsx`: native collapsible navigation, nested H2/H3 lists, active location, existing anchors, and reopening collapsed FAQs on deep links. Desktop uses a sticky rail; narrow screens use a bounded inline list.
- `ArticleBody.tsx` and `lib/article-presentation.ts`: server-rendered body; native FAQ disclosures use existing questions and preserve heading IDs. Missing front-matter FAQs render only when absent from body text. Unambiguously numeric table cells gain right alignment without value reformatting; code regions gain keyboard focus.
- `app/globals.css`: scoped editorial system, reading rhythm, responsive tables, callouts, code/diagram labels, references, related-reading rows, author/disclaimer treatment, series navigation, focus and reduced-motion rules. The article-only overflow fix allows sticky navigation without changing other pages.
- Blog related links now include existing category, publication date, and description. Writing series retains its previous/next links and all contextual project links.
- `tests/article-presentation.test.ts`: corpus-wide preservation and focused FAQ/numeric/optional-data regressions.

## SEO and machine readability

The original metadata generators and JSON-LD component are unchanged. No canonical URL, title, date, author, image source, or structured-data entity was replaced. Browser checks parse the initial HTML response and verify one H1, matching BlogPosting headline/date, canonical URLs, body content, and working TOC targets. Existing scoped table headers and footnotes remain intact. No new CMS, package or separate crawler version was introduced.

No FAQ rich-result schema was added to the Next.js routes. Google retired FAQ rich results in May 2026 and removed the guidance in June; see [Google Search documentation updates](https://developers.google.com/search/updates). Existing legacy-export structured data is untouched.

Source entries contain title/URL only; publisher, date, primary/secondary classification, and review approvals were not inferred or invented. Summaries are omitted where quickAnswer is absent.

## Executed validation

- `pnpm --filter @portfolio/web build`: production build passed, 784 static pages generated; standalone server started locally on port 3001.
- `pnpm test`: 35 tests passed.
- `pnpm --filter @portfolio/web test`: 41 tests passed. The new corpus test compares all 720 published article bodies before/after presentation for normalized text, IDs, links and table values.
- `pnpm --filter @portfolio/web typecheck`: passed.
- Targeted ESLint on both route templates and all added/changed TypeScript components, helper and test: passed.
- `git diff --check`: passed.
- Playwright on the production standalone server: six routes (four categories, a real AI series entry, and an article without quickAnswer), each at 1440, 1280, 768, 390 and 360 pixels: 30 layout checks, no article overflow.
- Axe-core WCAG 2 A/AA, 2.1 AA and 2.2 AA rules in the article region at 360px: zero violations on all six routes. This is automated sampling, not a full WCAG certification.
- Keyboard: TOC collapse/expand, active-section navigation, FAQ collapse, reopening FAQ via its original anchor, and horizontal table scrolling passed.
- JavaScript disabled: article body, FAQ answers and all 22 TOC links were available on the sampled technology article.
- The sampled 360px auto article reported initial CLS 0 after load/fonts settled. This is a local lab observation, not a field-performance guarantee.

Detailed measurements and URLs: [qa-results.json](qa-results.json).

## Visual evidence

The supplied screenshots were not attached to this conversation. The current local page was inspected as the baseline, followed by desktop/mobile inspection and defect correction. Saved captures:

- [1440px](screenshots/article-finance-1440.png), [1280px](screenshots/article-finance-1280.png), [768px](screenshots/article-finance-768.png), [390px](screenshots/article-finance-390.png), [360px](screenshots/article-finance-360.png)
- [Executive summary and audience panels](screenshots/article-audience-desktop.png)
- [FAQ presentation](screenshots/article-faq-desktop.png)

## Limits and remaining work

No known blocking article-layout defects remain in the tested routes. Changes are local and not deployed. Visual checks sample representative content, rather than screenshots of every article. Full-site accessibility, field Core Web Vitals and Google Rich Results testing were not performed. Content-authored paragraph length, facts, disclaimers, embedded diagram text, source metadata and any existing editorial repetition remain as authored. The legacy static publisher is unchanged; the redesign is shared by the Next.js blog and writing reading routes.
