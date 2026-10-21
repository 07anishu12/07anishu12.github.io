const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const cheerio = require('cheerio');
const { ROOT, ORIGIN, parseArticle, readArticles, renderMarkdown } = require('./content');
const { buildBlog, buildSite, outputs } = require('./build');
const { checkSite } = require('./check');
const example = fs.readFileSync(path.join(__dirname, 'examples/formatting.md'), 'utf8');

function fixture() {
  // Synthetic test workspace; production sources and Google files are never mutated.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-blog-test-'));
  for (const name of [...fs.readdirSync(ROOT).filter(f => f.endsWith('.html')), 'sitemap.xml', 'robots.txt', '.nojekyll']) if (fs.existsSync(path.join(ROOT, name))) fs.copyFileSync(path.join(ROOT, name), path.join(root, name));
  for (const dir of ['learnings', 'projects', 'research', 'topics', 'author', 'assets', 'data']) fs.cpSync(path.join(ROOT, dir), path.join(root, dir), { recursive: true });
  // Isolate real articles from synthetic test content.
  fs.rmSync(path.join(root, 'data/blog'), { recursive: true, force: true });
  for (const category of ['technology', 'auto', 'finance']) fs.mkdirSync(path.join(root, 'data/blog', category), { recursive: true });
  const imageDir = path.join(root, 'assets/images/blog/formatting-example');
  fs.mkdirSync(imageDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'examples/cover.svg'), path.join(imageDir, 'cover.svg'));
  const file = path.join(root, 'data/blog/technology/example.md');
  return { root, file, clean: () => fs.rmSync(root, { recursive: true, force: true }) };
}

test('Rich formatting, safe links, headings, and accessible single-cover HTML', () => {
  const f = fixture();
  try {
    const post = parseArticle(example.replace('slug: \"formatting-example\"', 'seoTitle: \"Synthetic SEO title\"\nslug: \"formatting-example\"'), 'technology', { root: f.root, preview: true });
    const $ = cheerio.load(outputs([post], { root: f.root, preview: true }).get('blog/technology/formatting-example/index.html'));
    for (const selector of ['.blog-body h2', '.blog-body h3', '.blog-body h4', '.blog-body strong', '.blog-body em', '.blog-body s', '.blog-body ul ul', '.blog-body ol ol', '.blog-body table thead th[scope="col"]', '.blog-body blockquote', '.blog-body hr', '.blog-body pre code.language-javascript', '.footnotes', '.blog-callout-note', '.blog-callout-tip', '.blog-callout-important']) assert.ok($(selector).length, selector);
    assert.equal($('h1').length, 1);
    assert.equal($('h1').text(), post.title);
    assert.equal($('title').text(), 'Synthetic SEO title');
    assert.equal($('.blog-cover img').length, 1);
    assert.equal($('.blog-body img').length, 0);
    assert.equal($('.blog-table[tabindex="0"]').length, 1);
    assert.equal($('.blog-toc a').length, post.headings.length);
    assert.equal(new Set(post.headings.map(h => h.id)).size, post.headings.length);
    const safe = renderMarkdown('## Safe\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))\n\n[x](data:text/html,danger)\n\n[x](vbscript:evil)');
    const unsafeDOM = cheerio.load(safe.html);
    assert.equal(unsafeDOM('script, a').length, 0);
    assert.throws(() => renderMarkdown('# Second title'), /H2/);
    assert.throws(() => renderMarkdown('![extra](/image.png)'), /Body images/);
  } finally { f.clean(); }
});

test('Reject invalid metadata and collisions before generating output', () => {
  const f = fixture();
  try {
    const valid = example.replace('draft: true', 'draft: false');
    for (const [from, to, error] of [
      ['title: "Local formatting example"', 'title: ""', /title/],
      ['coverImageAlt: "Synthetic sample cover with the words Local formatting preview on a blue and ivory background."', 'coverImageAlt: ""', /coverImageAlt/],
      ['datePublished: "2026-01-01"', 'datePublished: "2026-02-30"', /real YYYY/],
      ['dateModified: ""', 'dateModified: "2025-01-01"', /precedes/],
      ['dateModified: ""', 'dateModified: "2999-01-01"', /future/],
      ['slug: "formatting-example"', 'slug: "../escape"', /slug/],
      ['category: "technology"', 'category: "auto"', /directory/],
      ['author: "Aniket Thakur"', 'author: "Invented Person"', /author/],
      ['tags: ["Formatting", "Markdown", "Local Preview"]', 'tags: Formatting', /tags/],
      ['cover.svg', 'missing.webp', /Missing cover/],
      ['imageSourceUrl: ""', 'imageSourceUrl: "javascript:evil"', /HTTP/]
    ]) assert.throws(() => parseArticle(valid.replace(from, to), 'technology', { root: f.root }), error);
    fs.writeFileSync(f.file, valid);
    fs.writeFileSync(path.join(f.root, 'data/blog/technology/collision.md'), valid);
    assert.throws(() => readArticles({ root: f.root }), /Duplicate output/);
    fs.unlinkSync(path.join(f.root, 'data/blog/technology/collision.md'));
    // An unrelated manually maintained page must never be overwritten.
    const collision = path.join(f.root, 'blog/technology/formatting-example/index.html');
    fs.mkdirSync(path.dirname(collision), { recursive: true }); fs.writeFileSync(collision, 'Manually maintained');
    assert.throws(() => buildBlog({ root: f.root }), /unowned/);
    assert.equal(fs.readFileSync(collision, 'utf8'), 'Manually maintained');
  } finally { f.clean(); }
});

test('Optional social artwork preserves one cover, deploys both assets, and excludes draft assets', () => {
  const f = fixture();
  try {
    const image = '/assets/images/blog/formatting-example/poster.svg';
    fs.copyFileSync(path.join(f.root, 'assets/images/blog/formatting-example/cover.svg'), path.join(f.root, image));
    const valid = example.replace('draft: true', 'draft: false').replace('slug: "formatting-example"', 'slug: "social-example"');
    const withPoster = valid.replace('draft: false', `socialImage: "${image}"\nsocialImageAlt: "Synthetic sharing poster"\ndraft: false`);
    const post = parseArticle(withPoster, 'technology', { root: f.root });
    const $ = cheerio.load(outputs([post], { root: f.root }).get('blog/technology/social-example/index.html'));
    assert.equal($('.blog-cover img').length, 1);
    assert.equal($('.blog-cover img').attr('src'), post.coverImage);
    assert.equal($('.blog-body img').length, 0);
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) assert.equal($(selector).attr('content'), ORIGIN + image);
    const schema = $('script[type="application/ld+json"]').toArray().map(el => JSON.parse($(el).text())).find(s => s['@type'] === 'BlogPosting');
    assert.equal(schema.image.url, ORIGIN + post.coverImage, 'Structured data must describe the visible cover');
    const fallback = parseArticle(valid, 'technology', { root: f.root });
    const fallbackDOM = cheerio.load(outputs([fallback], { root: f.root }).get('blog/technology/social-example/index.html'));
    assert.equal(fallbackDOM('meta[property="og:image"]').attr('content'), ORIGIN + fallback.coverImage);
    assert.throws(() => parseArticle(withPoster.replace('socialImageAlt: "Synthetic sharing poster"', 'socialImageAlt: ""'), 'technology', { root: f.root }), /socialImageAlt/);
    assert.throws(() => parseArticle(withPoster.replace('poster.svg', 'missing.svg'), 'technology', { root: f.root }), /Missing social image/);
    fs.writeFileSync(f.file, withPoster);
    const dir = buildSite({ root: f.root });
    checkSite(dir, f.root);
    assert.deepEqual(fs.readFileSync(path.join(dir, image)), fs.readFileSync(path.join(f.root, image)));
    fs.writeFileSync(f.file, withPoster.replace('draft: false', 'draft: true'));
    buildSite({ root: f.root });
    assert.equal(fs.existsSync(path.join(dir, image)), false, 'Draft social artwork must not deploy');
    const preview = buildSite({ root: f.root, preview: true });
    assert.ok(fs.existsSync(path.join(preview, image)), 'Draft social artwork must be available in local preview');
  } finally { f.clean(); }
});

test('Publishing lifecycle, safe cleanup, draft exclusion, sitemap, RSS, and exact Google bytes', () => {
  const f = fixture();
  try {
    const valid = example.replace('draft: true', 'draft: false');
    fs.writeFileSync(f.file, valid);
    // Synthetic filename/content exclusively in the temporary test workspace.
    fs.writeFileSync(path.join(f.root, 'googleSYNTHETIC.html'), 'google-site-verification: googleSYNTHETIC.html\n');
    let dir = buildSite({ root: f.root });
    checkSite(dir, f.root);
    const originalSitemap = fs.readFileSync(path.join(f.root, 'sitemap.xml'), 'utf8');
    buildSite({ root: f.root });
    assert.equal(fs.readFileSync(path.join(f.root, 'sitemap.xml'), 'utf8'), originalSitemap, 'lastmod changes on an unchanged build');
    const oldFile = path.join(f.root, 'blog/technology/formatting-example/index.html');
    fs.writeFileSync(f.file, valid.replace('slug: "formatting-example"', 'slug: "renamed-example"'));
    dir = buildSite({ root: f.root });
    assert.equal(fs.existsSync(oldFile), false, 'old slug remains');
    const renamed = path.join(f.root, 'blog/technology/renamed-example/index.html');
    const manual = path.join(f.root, 'blog/technology/manual.html'); fs.writeFileSync(manual, 'Unrelated manual file');
    fs.writeFileSync(f.file, fs.readFileSync(f.file, 'utf8').replace('draft: false', 'draft: true'));
    dir = buildSite({ root: f.root });
    assert.equal(fs.existsSync(renamed), false, 'draft output remains');
    assert.equal(fs.readFileSync(manual, 'utf8'), 'Unrelated manual file');
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, 'blog/search.json'), 'utf8')).length, 0);
    assert.ok(!fs.readFileSync(path.join(dir, 'sitemap.xml'), 'utf8').includes('renamed-example'));
    assert.ok(!fs.readFileSync(path.join(dir, 'blog/feed.xml'), 'utf8').includes('renamed-example'));
    assert.equal(fs.existsSync(path.join(dir, 'assets/images/blog/formatting-example/cover.svg')), false);
    fs.unlinkSync(f.file);
    buildSite({ root: f.root });
    fs.writeFileSync(f.file, valid); buildSite({ root: f.root });
    fs.unlinkSync(f.file); buildSite({ root: f.root });
    assert.equal(fs.existsSync(oldFile), false, 'deleted published output remains');
    fs.writeFileSync(f.file, valid); buildSite({ root: f.root });
    fs.appendFileSync(oldFile, '\nmanual change'); fs.unlinkSync(f.file);
    assert.throws(() => buildBlog({ root: f.root }), /manually edited/);
    assert.ok(fs.readFileSync(oldFile, 'utf8').endsWith('manual change'));
  } finally { f.clean(); }
});

test('Crawlable pagination and category/related links', () => {
  const f = fixture();
  try {
    const base = parseArticle(example, 'technology', { root: f.root, preview: true });
    const posts = Array.from({ length: 11 }, (_, i) => ({ ...base, slug: `synthetic-${i}`, title: `Synthetic example ${i}`, url: `/blog/technology/synthetic-${i}/` }));
    const result = outputs(posts, { root: f.root });
    const $ = cheerio.load(result.get('blog/index.html'));
    assert.equal($('.blog-card').length, 9);
    assert.equal($('.blog-card .blog-card-image img').length, 9);
    assert.equal($('.blog-card .blog-card-image img').first().attr('src'), base.coverImage);
    assert.equal($('.blog-card .blog-card-image img').first().attr('alt'), base.coverImageAlt);
    assert.equal($('.blog-card .blog-card-image img').first().attr('loading'), 'eager');
    assert.equal($('.blog-pagination a[href="/blog/page/2/"]').length, 1);
    const second = cheerio.load(result.get('blog/page/2/index.html'));
    assert.equal(second('.blog-card').length, 2);
    assert.equal(second('link[rel="canonical"]').attr('href'), ORIGIN + '/blog/page/2/');
    assert.ok(result.has('blog/technology/page/2/index.html'));
    const article = cheerio.load(result.get('blog/technology/synthetic-0/index.html'));
    assert.equal(article('.blog-related .blog-card').length, 3);
  } finally { f.clean(); }
});

function analyticsHarness({ production = true, id = 'G-SYNTHETIC', consent = false, requireConsent = false, preview = false } = {}) {
  const handlers = {}, scripts = [];
  const window = { PORTFOLIO_CONFIG: { measurementId: id, requireAnalyticsConsent: requireConsent }, portfolioAnalyticsConsent: consent, addEventListener: (n, fn) => { handlers[n] = fn; } };
  const document = { documentElement: { dataset: { preview: String(preview) } }, referrer: 'https://example.org/private?email=SYNTHETIC', querySelector: q => q.startsWith('link') ? { href: ORIGIN + '/blog/technology/test/' } : { dataset: { articleCategory: 'technology', articleSlug: 'test' } }, head: { appendChild: s => scripts.push(s) }, createElement: () => ({}), addEventListener: (n, fn) => { handlers[n] = fn; } };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/js/analytics.js'), 'utf8'), { window, document, location: { origin: production ? ORIGIN : 'http://127.0.0.1:4173', pathname: '/', href: ORIGIN + '/?email=SYNTHETIC' }, URL, Date });
  const click = ({ href = '', dataset = {}, reference = false }) => handlers.click?.({ target: { closest: () => ({ dataset, getAttribute: () => href, closest: () => reference }) } });
  return { window, scripts, handlers, click };
}
test('Analytics gates, one config/page-view, consent, events, and personal-information exclusions', () => {
  for (const options of [{ production: false }, { id: '' }, { preview: true }]) assert.equal(analyticsHarness(options).scripts.length, 0);
  const h = analyticsHarness({ requireConsent: true });
  assert.equal(h.scripts.length, 0);
  h.window.portfolioAnalyticsConsent = true; h.handlers['portfolio:analytics-consent'](); h.handlers['portfolio:analytics-consent']();
  assert.equal(h.scripts.length, 1);
  const calls = () => Array.from(h.window.dataLayer, a => Array.from(a));
  assert.equal(calls().filter(a => a[0] === 'config').length, 1);
  assert.equal(calls().find(a => a[0] === 'config')[2].page_referrer, 'https://example.org');
  h.click({ href: 'mailto:synthetic-person@example.org?body=SECRET' });
  h.click({ href: 'tel:+000000' }); h.click({ href: 'https://wa.me/000000?text=SECRET' });
  h.click({ dataset: { share: 'copy' } });
  h.click({ href: 'https://example.org/reference?email=SECRET', reference: true });
  h.click({ href: '/assets/Aniket_Thakur_Resume.pdf' });
  assert.deepEqual(calls().filter(a => a[0] === 'event').map(a => a[1]), ['contact_click', 'contact_click', 'contact_click', 'share', 'outbound_reference']);
  const serialized = JSON.stringify(calls());
  for (const secret of ['SECRET', '+000000', 'synthetic-person', '?email=']) assert.ok(!serialized.includes(secret));
  h.window.portfolioAnalyticsConsent = false; h.handlers['portfolio:analytics-consent']();
  assert.equal(h.window['ga-disable-G-SYNTHETIC'], true);
  const before = calls().filter(a => a[0] === 'event').length;
  h.click({ href: 'mailto:synthetic@example.org' });
  assert.equal(calls().filter(a => a[0] === 'event').length, before);
});


test('Local preview contains noindex drafts and example; production remains isolated', () => {
  const f = fixture();
  try {
    const draft = example.replace('slug: "formatting-example"', 'slug: "synthetic-draft"');
    fs.writeFileSync(f.file, draft);
    const preview = buildSite({ root: f.root, preview: true });
    const html = fs.readFileSync(path.join(preview, 'blog/technology/synthetic-draft/index.html'), 'utf8');
    assert.ok(html.includes('data-preview="true"') && html.includes('noindex, nofollow'));
    assert.ok(fs.existsSync(path.join(preview, 'blog/technology/formatting-example/index.html')));
    assert.ok(!fs.existsSync(path.join(f.root, 'blog/technology/synthetic-draft/index.html')));
    assert.ok(!fs.readFileSync(path.join(preview, 'sitemap.xml'), 'utf8').includes('synthetic-draft'));
    assert.ok(!fs.readFileSync(path.join(preview, 'blog/feed.xml'), 'utf8').includes('synthetic-draft'));
    const production = buildSite({ root: f.root });
    assert.ok(!fs.existsSync(path.join(production, 'blog/technology/synthetic-draft/index.html')));
    assert.ok(!fs.existsSync(path.join(production, 'assets/images/blog/formatting-example/cover.svg')));
  } finally { f.clean(); }
});

test('Existing Learnings build continues to integrate Blog and combined sitemap', () => {
  const f = fixture();
  try {
    fs.cpSync(path.join(ROOT, 'tools'), path.join(f.root, 'tools'), { recursive: true });
    fs.copyFileSync(path.join(ROOT, 'package.json'), path.join(f.root, 'package.json'));
    fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(f.root, 'node_modules'));
    const { execFileSync } = require('node:child_process');
    const output = execFileSync('npm', ['run', 'build:content'], { cwd: f.root, encoding: 'utf8' });
    const expected = JSON.parse(fs.readFileSync(path.join(f.root, 'data/learnings.json'), 'utf8')).filter(p => p.status === 'published').length;
    assert.ok(output.includes(`Building ${expected} published articles`));
    checkSite(buildSite({ root: f.root }), f.root);
  } finally { f.clean(); }
});


test('Answer-first summary, contextual references, and car enquiry stay in static HTML', () => {
  const f = fixture();
  try {
    const base = parseArticle(example, 'technology', { root: f.root, preview: true });
    const post = { ...base, showSources: false, enquiry: true, quickAnswer: {
      question: 'Synthetic reader question?', answer: 'A short, explicitly synthetic answer.',
      facts: [{ label: 'Synthetic label', value: 'Synthetic value' }],
      goodFor: ['A sample use case'], watchFor: ['A sample limitation'], note: 'Synthetic test note'
    } };
    const html = outputs([post], { root: f.root }).get('blog/technology/formatting-example/index.html');
    const $ = cheerio.load(html);
    assert.equal($('.blog-answer h2').text(), post.quickAnswer.question);
    assert.equal($('.blog-answer-verdict').text(), post.quickAnswer.answer);
    assert.equal($('.blog-answer-facts dd').text(), 'Synthetic value');
    assert.ok(html.indexOf('class="blog-answer"') < html.indexOf('class="blog-cover"'));
    assert.equal($('.blog-sources').length, 0);
    assert.ok($('.blog-body a[href^="https://"]').length > 0, 'contextual references disappeared');
    assert.equal($('#article-details').length, 1);
    assert.equal($('.blog-answer-read').attr('href'), '#article-details');
    const contact = JSON.parse(fs.readFileSync(path.join(f.root, 'data/contact.json'), 'utf8'));
    const whatsapp = new URL($('.blog-enquiry [data-article-enquiry="whatsapp"]').attr('href'));
    assert.equal(whatsapp.origin, 'https://wa.me');
    assert.equal(whatsapp.pathname, '/' + contact.whatsapp);
    assert.ok(whatsapp.searchParams.get('text').includes(ORIGIN + post.url));
    assert.equal($('.blog-enquiry a[href="/contact.html"]').length, 1);
    const schema = JSON.parse($('script[type="application/ld+json"]').first().text());
    assert.equal(schema.abstract, post.quickAnswer.answer);
    const source = example.replace('draft: true', 'draft: false');
    assert.throws(() => parseArticle(source.replace('featured: false', 'showSources: "false"'), 'technology', { root: f.root }), /boolean/);
    assert.throws(() => parseArticle(source.replace('featured: false', 'quickAnswer: {answer: "incomplete"}'), 'technology', { root: f.root }), /question/);
  } finally { f.clean(); }
});
