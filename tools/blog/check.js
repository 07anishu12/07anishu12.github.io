const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const { ROOT, ORIGIN, CATEGORIES, assert, readArticles } = require('./content');
const { walk } = require('./build');

function checkSite(dir = path.join(ROOT, '_site'), root = ROOT) {
  const posts = readArticles({ root });
  const files = walk(dir), failures = [], warnings = [];
  const check = (ok, message) => { if (!ok) failures.push(message); };
  const resolveUrl = (url, base) => {
    const u = new URL(url, ORIGIN + base);
    if (u.origin !== ORIGIN) return null;
    let file = path.join(dir, decodeURIComponent(u.pathname));
    if (u.pathname.endsWith('/')) file = path.join(file, 'index.html');
    return { file, fragment: decodeURIComponent(u.hash.slice(1)) };
  };
  const dom = new Map();
  for (const file of files.filter(f => f.endsWith('.html') && !/^google.*\.html$/.test(path.basename(f)))) dom.set(file, cheerio.load(fs.readFileSync(file, 'utf8')));
  for (const [file, $] of dom) {
    const relative = '/' + path.relative(dir, file), label = relative;
    check($('h1').length === 1, `${label}: expected one H1`);
    const ids = $('[id]').map((_, el) => $(el).attr('id')).get();
    check(new Set(ids).size === ids.length, `${label}: duplicate IDs`);
    check($('script[src^="/assets/js/site-config.js"]').length === 1 && $('script[src="/assets/js/analytics.js"]').length === 1, `${label}: Analytics shared scripts missing or duplicated`);
    check(!$('script[src*="googletagmanager.com"]').length && !/gtag\s*\(\s*['"]config/.test($('script:not([src])').text()), `${label}: duplicate or inline Analytics initialization`);
    check($('.desktop-nav a[href="/blog/"]').length === 1, `${label}: Blog desktop link missing`);
    if ($('.mobile-nav').length) check($('.mobile-nav a[href="/blog/"]').length === 1, `${label}: Blog mobile link missing`);
    check(!$('meta[name="robots"][content*="noindex"]').length || relative === '/404.html', `${label}: published noindex`);
    check(!$('a[href="/blog/feed.xml"], link[type="application/rss+xml"]').length, `${label}: retired RSS link remains`);
    for (const el of $('[href], [src]').toArray()) {
      const value = $(el).attr('href') || $(el).attr('src');
      if (!value || /^(mailto:|tel:|data:)/i.test(value)) continue;
      try {
        const resolved = resolveUrl(value, relative);
        if (!resolved) continue;
        check(fs.existsSync(resolved.file), `${label}: missing internal target ${value}`);
        if (resolved.fragment && dom.has(resolved.file)) check(dom.get(resolved.file)(`[id]`).toArray().some(n => dom.get(resolved.file)(n).attr('id') === resolved.fragment), `${label}: missing fragment ${value}`);
      } catch (e) { failures.push(`${label}: invalid link ${value}: ${e.message}`); }
    }
    for (const el of $('.blog-card').toArray()) {
      const card = $(el), image = card.find('.blog-card-image img');
      const post = posts.find(p => card.find('.blog-card-image').attr('href') === p.url);
      check(Boolean(post), `${label}: thumbnail has no matching published article`);
      if (post) check(image.length === 1 && image.attr('src') === post.coverImage && image.attr('alt') === post.coverImageAlt, `${label}: missing or mismatched article image preview`);
    }
    for (const el of $('script[type="application/ld+json"]').toArray()) {
      try { JSON.parse($(el).text()); } catch { failures.push(`${label}: invalid JSON-LD`); }
    }
    if (relative.startsWith('/blog/')) {
      check($('link[rel="canonical"]').length === 1, `${label}: canonical count`);
      check($('link[rel="canonical"]').attr('href') === ORIGIN + relative.replace(/index\.html$/, ''), `${label}: canonical mismatch`);
    }
  }
  const sitemap = cheerio.load(fs.readFileSync(path.join(dir, 'sitemap.xml'), 'utf8'), { xmlMode: true });
  const urls = sitemap('url > loc').map((_, el) => sitemap(el).text()).get();
  check(new Set(urls).size === urls.length, 'Duplicate sitemap URLs');
  urls.forEach(url => {
    check(url.startsWith(ORIGIN + '/'), `Wrong sitemap origin: ${url}`);
    check(!new URL(url).search, `Search URL in sitemap: ${url}`);
    const target = resolveUrl(url, '/');
    check(target && fs.existsSync(target.file), `Sitemap target missing: ${url}`);
  });
  sitemap('url').each((_, el) => {
    const loc = sitemap(el).find('loc').text();
    const lastmod = sitemap(el).find('lastmod').text();
    check(/^\d{4}-\d{2}-\d{2}$/.test(lastmod), `Sitemap entry missing or invalid lastmod date: ${loc} (${lastmod})`);
  });
  for (const cat of Object.keys(CATEGORIES)) {
    const catUrl = `${ORIGIN}/blog/${cat}/`;
    const hasPosts = posts.some(p => p.category === cat);
    if (!hasPosts) {
      check(!urls.includes(catUrl), `Empty category listing ${catUrl} must not be in sitemap`);
    } else {
      check(urls.includes(catUrl), `Populated category listing ${catUrl} must be in sitemap`);
    }
  }
  check(!fs.existsSync(path.join(dir, 'blog/feed.xml')), 'Retired RSS feed must not deploy');
  const llms = fs.readFileSync(path.join(dir, 'llms.txt'), 'utf8');
  check(llms.startsWith('# Aniket Thakur\n') && llms.includes('## Published articles'), 'llms.txt structure missing');
  for (const match of llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)) {
    const target = resolveUrl(match[1], '/');
    check(target && fs.existsSync(target.file), `llms.txt target missing or external: ${match[1]}`);
  }
  const robots = fs.readFileSync(path.join(dir, 'robots.txt'), 'utf8');
  const blocked = [...robots.matchAll(/^Disallow:\s*(\S+)/gm)].map(m => m[1]);
  check(/^User-agent: \*$/m.test(robots) && robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`), 'robots.txt wildcard group or sitemap missing');
  check(blocked.includes('/blog/feed.xml') && blocked.includes('/blog/search.json') && blocked.includes('/blog/search-text.json'), 'robots.txt feed/search restrictions missing');
  const publicPaths = [...urls.map(url => new URL(url).pathname), '/llms.txt', '/sitemap.xml', ...posts.map(p => p.coverImage), ...posts.map(p => p.socialImage).filter(Boolean), ...fs.readdirSync(root).filter(f => /^google.*\.html$/.test(f)).map(f => '/' + f)];
  for (const pathname of publicPaths) check(!blocked.some(rule => pathname.startsWith(rule)), `Public page or asset blocked in robots.txt: ${pathname}`);
  const search = JSON.parse(fs.readFileSync(path.join(dir, 'blog/search.json'), 'utf8'));
  check(search.length === posts.length, 'Search published count mismatch');
  for (const post of posts) {
    const file = path.join(dir, post.url, 'index.html'), $ = dom.get(file);
    check(Boolean($), `Article page missing: ${post.url}`);
    if (!$) continue;
    check($('.blog-body').html().trim() === cheerio.load(`<div>${post.html}</div>`)('div').first().html().trim(), `${post.url}: complete static body differs`);
    check($('.blog-cover img').length === 1 && !$('.blog-body img').length, `${post.url}: single main image violation`);
    check($('.blog-cover img').attr('src') === post.coverImage && $('.blog-cover img').attr('alt') === post.coverImageAlt, `${post.url}: image metadata mismatch`);
    check($('.blog-cover img').attr('width') === String(post.width) && $('.blog-cover img').attr('height') === String(post.height), `${post.url}: image dimensions missing`);
    const socialImage = post.socialImage || post.coverImage, socialAlt = post.socialImageAlt || post.coverImageAlt;
    check(fs.existsSync(path.join(dir, socialImage)), `${post.url}: missing deployed social image`);
    check($('meta[property="og:image"]').attr('content') === ORIGIN + socialImage && $('meta[name="twitter:image"]').attr('content') === ORIGIN + socialImage, `${post.url}: social image mismatch`);
    check($('meta[property="og:image:alt"]').attr('content') === socialAlt && $('meta[name="twitter:image:alt"]').attr('content') === socialAlt, `${post.url}: social image alt mismatch`);
    check($('meta[property="og:image:width"]').attr('content') === String(post.socialWidth) && $('meta[property="og:image:height"]').attr('content') === String(post.socialHeight), `${post.url}: social dimensions mismatch`);
    const schemas = $('script[type="application/ld+json"]').map((_, el) => JSON.parse($(el).text())).get();
    const schema = schemas.find(s => s['@type'] === 'BlogPosting');
    check(schema && schema.headline === post.title && schema.datePublished === post.datePublished && schema.dateModified === (post.dateModified || post.datePublished) && schema.author.name === post.author && schema.image.url === ORIGIN + post.coverImage, `${post.url}: BlogPosting mismatch`);
    check(schemas.some(s => s['@type'] === 'BreadcrumbList'), `${post.url}: breadcrumbs missing`);
    if (post.quickAnswer) {
      check($('.blog-answer-verdict').text() === post.quickAnswer.answer && schema.abstract === post.quickAnswer.answer, `${post.url}: visible answer and structured abstract differ`);
      check($('.blog-answer h2').text() === post.quickAnswer.question, `${post.url}: reader question missing`);
      check($('.blog-answer-read').attr('href') === '#article-details', `${post.url}: full-guide link missing`);
    }
    if (post.showSources === false) check(!$('.blog-sources').length, `${post.url}: unwanted sources list`);
    if (post.enquiry) check($('.blog-enquiry [data-article-enquiry="whatsapp"]').length === 1 && $('.blog-enquiry a[href="/contact.html"]').length === 1, `${post.url}: enquiry actions missing`);

    check(urls.includes(ORIGIN + post.url) && search.some(p => p.url === post.url) && llms.includes(`](${ORIGIN}${post.url})`), `${post.url}: discovery output missing`);
  }
  for (const file of fs.readdirSync(root).filter(f => /^google.*\.html$/.test(f))) check(fs.existsSync(path.join(dir, file)) && fs.readFileSync(path.join(root, file)).equals(fs.readFileSync(path.join(dir, file))), `Verification bytes changed or missing: ${file}`);
  for (const name of ['tools', 'data/blog', '_preview', 'node_modules', '__agent__', 'PROMPT.md']) check(!fs.existsSync(path.join(dir, name)), `Private/source content leaked: ${name}`);
  const blogPages = [...dom.keys()].filter(file => file.includes('/blog/') && /data-article-slug=/.test(fs.readFileSync(file, 'utf8')));
  check(blogPages.length === posts.length, 'Unexpected article output (possibly obsolete or draft)');
  if (!posts.length) warnings.push('No published blog articles yet; templates and the formatting example remain private.');
  const config = fs.readFileSync(path.join(root, 'assets/js/site-config.js'), 'utf8');
  if (/measurementId:\s*''/.test(config)) warnings.push('GA4 is inactive: Measurement ID has not been supplied.');
  assert(!failures.length, failures.join('\n'));
  console.log(`Validated ${dom.size} HTML pages, ${posts.length} articles, ${urls.length} sitemap URLs, llms.txt, robots.txt, RSS retirement, internal links, metadata, draft isolation, and verification preservation.`);
  warnings.forEach(w => console.log(`Note: ${w}`));
  return { pages: dom.size, articles: posts.length, sitemap: urls.length };
}
if (require.main === module) { try { checkSite(); } catch (e) { console.error(e.message); process.exitCode = 1; } }
module.exports = { checkSite };
