# Verified SEO, Crawlability & Rendering Issues

**Audit Date:** 24 October 2026  
**Audited Target:** https://07anishu12.github.io  
**Total Sitemap URLs Audited:** 243  

---


### [P2] SEC-02: 19 page titles exceed 65 characters (potential SERP truncation)

- **Severity:** P2
- **Affected URLs:** 19 URLs (e.g., https://07anishu12.github.io/projects/seo-agent-laya.html, https://07anishu12.github.io/about.html, https://07anishu12.github.io/research/graph-neural-networks-ecological-modeling.html)
- **Observed Result:** Page titles range up to 92 characters.
- **Expected Result:** Optimal desktop/mobile search titles should remain between 50 and 65 characters to avoid truncation by Google.
- **Root Cause:** Article titles appended with " — Aniket Thakur" brand suffix.
- **Recommended Remediation:** Fine-tune seoTitle in metadata for articles exceeding 65 chars.

---

### [P2] SEC-05: 17 orphaned URLs discovered in sitemap with 0 incoming internal links

- **Severity:** P2
- **Affected URLs:** https://07anishu12.github.io/research/graph-neural-networks-ecological-modeling.html, https://07anishu12.github.io/projects/seo-agent-laya.html, https://07anishu12.github.io/projects/prompt-based-bi.html, https://07anishu12.github.io/topics/graph-neural-networks.html, https://07anishu12.github.io/topics/seo-automation.html, https://07anishu12.github.io/topics/artificial-intelligence.html, https://07anishu12.github.io/topics/fintech.html, https://07anishu12.github.io/topics/data-science.html, https://07anishu12.github.io/learnings/tata-sons-vs-tata-trusts-ownership-and-control.html, https://07anishu12.github.io/learnings/what-nsfr-actually-tells-you-about-a-bank.html (+7 more)
- **Observed Result:** URL is listed in sitemap.xml but has no incoming internal link discovered from other site pages.
- **Expected Result:** All content in sitemap should be reachable via category hubs, pagination, or cross-links.
- **Root Cause:** Recently added content or missing category pagination link.
- **Recommended Remediation:** Verify category index pagination reaches all articles.

