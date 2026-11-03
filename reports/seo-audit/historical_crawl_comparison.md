# Historical Crawl Comparison: 24 Oct 2026 vs Current Crawl

## Comparison Metrics
| Metric | Historical Baseline (24 Oct 2026) | Current Audit (2026-11-03) | Delta | Growth |
|---|---|---|---|---|
| **Host** | `https://07anishu12.github.io` | `https://aniket.app` | Domain Migration | Custom Domain |
| **Total URLs** | 243 | 752 | +509 | +209.5% |
| **Average TTFB** | 20 ms | 481 ms | +461 ms | Fastly -> Vercel Edge |
| **Total Word Count** | 276539 words | 911242 words | +634703 words | Catalog Expansion |

## Key Migration Observations
- Domain migration successfully re-hosted site from GitHub Pages (07anishu12.github.io) to custom domain (aniket.app) on Vercel.
- Catalog expanded by +509 URLs with massive additions in Automotive and Technology AI knowledge libraries.
- New architecture introduced Vercel edge trailing slash redirects (HTTP 308) and uncovered root static file bypass (/index.html returning HTTP 200).
- WWW subdomain currently issues HTTP 307 temporary redirect instead of 301/308 permanent redirect.
