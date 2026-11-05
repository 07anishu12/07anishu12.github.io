# GOOGLE SEARCH CONSOLE & INFRASTRUCTURE EVIDENCE REQUIRED FROM SITE OWNER

**Document Purpose:** Specific data points, exports, and manual verifications required from the website owner to finalize root-cause certainty and execute Phase 2 remediation.  
**Target Domain:** `https://aniket.app`  

---

## 1. Google Search Console: Page Indexing Exclusion Data

In Google Search Console under **Indexing → Pages**, two exclusion reasons are reported with 3 affected pages:

1. **Exact Reason Names:**
   - What are the exact names of the 2 indexing exclusion reasons displayed in the table below the chart?
     *(Examples: "Discovered - currently not indexed", "Crawled - currently not indexed", "Alternate page with proper canonical tag", "Page with redirect", "Duplicate without user-selected canonical", "Soft 404", "Not found (404)")*
2. **Specific Affected URLs:**
   - Click into each of the 2 reasons and export or copy the exact 3 URLs listed in the table.
3. **Sitemap Filter State:**
   - Above the Page Indexing chart, look at the dropdown filter in the top left:
     - Is it set to **"All known pages"**?
     - Or is it filtered to **"All submitted pages"** or an individual child sitemap (e.g. `sitemap-tools.xml`, `sitemap-author.xml`)?
     *(Note: If filtered to a child sitemap containing only 3 pages, this explains why only 3 pages appear).*

---

## 2. Google Search Console: Live URL Inspection Results

Using the **URL Inspection tool** (top search bar in Search Console), please inspect the following 4 URLs and copy/export the full inspection verdict for each:

1. **Homepage:** `https://aniket.app/`
2. **Automotive Article:** `https://aniket.app/blog/auto/10-global-motorcycles-that-indian-buyers-should-watch-after-eicma-2026/`
3. **Technology Article:** `https://aniket.app/blog/technology/ai-agents-what-are-they-and-how-do-they-work/`
4. **Category Hub:** `https://aniket.app/blog/auto/`

### For each of the 4 URLs, record:
- **Presence on Google:** Is the URL on Google? ("URL is on Google" vs "URL is not on Google")
- **Coverage / Page Indexing:** Exact status string.
- **Last Crawl Date & Time:** (e.g. `Nov 2, 2026, 3:14:22 PM`)
- **Crawled As:** (Googlebot Smartphone or Googlebot Desktop)
- **Crawl Allowed?:** (Yes)
- **Page Fetch:** (Successful / Failed / Redirect)
- **Indexing Allowed?:** (Yes)
- **User-Declared Canonical:** What URL did Google detect?
- **Google-Selected Canonical:** Crucial: Did Google select the user canonical, or did Google choose an alternate URL (e.g. `https://07anishu12.github.io/...` or `https://aniket.app/index.html`)?
- **Discovery Source:** Was the URL discovered via "Sitemaps" (and which sitemap URL is listed) or via "Referring page"?

---

## 3. Search Console: Property Configuration & Scope

1. **Property Type:**
   - In the top-left property switcher, what is the exact property name?
     - Is it a **Domain Property** (prefixed with `sc-domain:aniket.app`)?
     - Or a **URL-prefix Property** (e.g. `https://aniket.app/`)?
2. **Sibling Properties:**
   - Are there separate properties registered for:
     - `http://aniket.app/`
     - `https://www.aniket.app/`
     - `https://07anishu12.github.io/`
3. **Performance Report Export by Page:**
   - Under **Performance → Search results**, click the **Pages** tab.
   - Filter by the last 28 days.
   - Export the CSV showing which specific URLs generated the **3,050 impressions** and **8 clicks**.
   *(This confirms whether search traffic was earned by `aniket.app` URLs or legacy GitHub Pages URLs).*

---

## 4. Search Console: Crawl Stats & Security Status

1. **Crawl Stats Report:**
   - Go to **Settings → Crawl stats → Open report**.
   - What is the total crawl requests graph trend over the last 90 days?
   - In the breakdown tables:
     - By response: What % are 200 OK vs 301/308 vs 404 vs 5xx?
     - By purpose: What % is Discovery vs Refresh?
     - By bot type: Googlebot Smartphone % vs Googlebot Desktop %?
2. **Security & Manual Actions:**
   - Check **Security & Manual Actions → Manual actions**: Is it "No issues detected"?
   - Check **Security & Manual Actions → Security issues**: Is it "No issues detected"?

---

## 5. Vercel & Registrar (Name.com) Verification

1. **Vercel Project Dashboard (Settings → Domains):**
   - Log into Vercel and inspect the domains list for project `07anishu12.github.io`:
     - Is `www.aniket.app` present in the list?
     - What is its status badge? ("Valid Configuration", "Invalid Configuration", or "Cert Generating")?
     - Is it configured to "Redirect to aniket.app" (HTTP 308)?
2. **Name.com DNS Records for `www.aniket.app`:**
   - At Name.com DNS console, verify the following records exist:
     - `CNAME www` → `cname.vercel-dns.com.`
     - `TXT _vercel.www` → `vc-domain-verify=www.aniket.app,701b6b5c6da1d8bba223`
   *(Without this, Vercel cannot generate a dual-SAN TLS certificate for `www.aniket.app`).*

---

## 6. GitHub Pages Repository Settings (`07anishu12/07anishu12.github.io`)

1. **GitHub Pages Deployment Policy:**
   - Under GitHub repo Settings → Pages:
     - Is GitHub Pages still actively building from branch `main`?
     - Can `07anishu12.github.io` be configured to permanently redirect to `https://aniket.app/` (via HTML meta/JS redirect on `main` or repository CNAME change)?
