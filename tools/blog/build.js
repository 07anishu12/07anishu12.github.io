const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ROOT, ORIGIN, CATEGORIES, escape: e, readArticles, parseArticle, assert } = require('./content');
const { enhancePortfolio, latest, listing, article } = require('./pages');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]) : [];
const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };

function outputs(posts, { preview = false, root = ROOT } = {}) {
  const files = new Map();
  for (const p of posts) files.set(`${p.url.slice(1)}index.html`, article(p, posts, { preview, root }));
  for (const category of ['', ...Object.keys(CATEGORIES)]) {
    const selected = category ? posts.filter(p => p.category === category) : posts;
    for (let n = 1; n <= Math.max(1, Math.ceil(selected.length / 9)); n++) {
      files.set(`blog/${category ? `${category}/` : ''}${n > 1 ? `page/${n}/` : ''}index.html`, listing(selected, { category, number: n, preview, root }));
    }
  }
  files.set('blog/search.json', JSON.stringify(posts.map(p => ({ url: p.url, title: p.title, description: p.description, category: p.category, categoryName: CATEGORIES[p.category].name, tags: p.tags, datePublished: p.datePublished, coverImage: p.coverImage, coverImageAlt: p.coverImageAlt, width: p.width, height: p.height, readingTime: p.readingTime, text: p.text })), null, 2) + '\n');
  files.set('blog/feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Aniket Thakur — Blog</title><link>${ORIGIN}/blog/</link><description>Technology, Auto, and Finance articles by Aniket Thakur.</description><language>en</language><atom:link href="${ORIGIN}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(p => `<item><title>${e(p.title)}</title><link>${ORIGIN}${p.url}</link><guid isPermaLink="true">${ORIGIN}${p.url}</guid><description>${e(p.description)}</description><pubDate>${new Date(`${p.datePublished}T00:00:00Z`).toUTCString()}</pubDate><category>${CATEGORIES[p.category].name}</category></item>`).join('\n')}
</channel></rss>\n`);
  return files;
}

function sitemap(posts, root = ROOT) {
  // Preserve existing portfolio entries (and their lastmod), replacing only blog entries.
  const current = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const preserved = (current.match(/<url>[\s\S]*?<\/url>/g) || []).filter(item => !/<loc>https:\/\/07anishu12\.github\.io\/blog\//.test(item));
  const listingUrls = [...outputs(posts, { root }).keys()].filter(f => f.endsWith('index.html') && !posts.some(p => f === `${p.url.slice(1)}index.html`));
  const rows = listingUrls.map(file => {
    const url = '/' + file.replace(/index\.html$/, '');
    const category = url.match(/^\/blog\/(technology|auto|finance)\//)?.[1];
    const dates = posts.filter(p => !category || p.category === category).map(p => p.dateModified || p.datePublished).sort();
    return `<url><loc>${ORIGIN}${url}</loc>${dates.length ? `<lastmod>${dates.at(-1)}</lastmod>` : ''}</url>`;
  });
  for (const p of posts) rows.push(`<url><loc>${ORIGIN}${p.url}</loc><lastmod>${p.dateModified || p.datePublished}</lastmod></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...preserved, ...rows].map(row => '  ' + row).join('\n')}\n</urlset>\n`;
}

function updateHome(html, posts) {
  const section = latest(posts);
  return html.includes('<!-- BLOG:LATEST:START -->') ? html.replace(/<!-- BLOG:LATEST:START -->[\s\S]*?<!-- BLOG:LATEST:END -->/, section) : html.replace('</main>', `  ${section}\n  </main>`);
}

function buildBlog({ root = ROOT } = {}) {
  const posts = readArticles({ root });
  const files = outputs(posts, { root });
  const manifest = path.join(root, '.blog-generated.json');
  const old = fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest, 'utf8')) : {};
  // Validate all ownership and stale-file deletions before writing anything.
  for (const [relative, content] of files) {
    const file = path.join(root, relative);
    assert(!fs.existsSync(file) || old[relative] === hash(fs.readFileSync(file)) || fs.readFileSync(file, 'utf8') === content, `Refusing to overwrite an unowned or manually modified generated file: ${relative}`);
  }
  for (const [relative, digest] of Object.entries(old)) {
    assert(/^blog\/(?:[a-z0-9-]+\/)*(?:index\.html|search\.json|feed\.xml)$/.test(relative), 'Invalid generated manifest path.');
    const file = path.join(root, relative);
    if (!files.has(relative) && fs.existsSync(file)) assert(hash(fs.readFileSync(file)) === digest, `Stale generated file was manually edited; preserve or move it before rebuilding: ${relative}`);
  }
  for (const [relative, content] of files) write(path.join(root, relative), content);
  for (const relative of Object.keys(old)) if (!files.has(relative) && fs.existsSync(path.join(root, relative))) fs.unlinkSync(path.join(root, relative));
  write(manifest, JSON.stringify(Object.fromEntries([...files].map(([f, content]) => [f, hash(content)])), null, 2) + '\n');
  for (const dir of ['', 'learnings', 'projects', 'research', 'topics', 'author']) {
    const folder = path.join(root, dir);
    for (const name of fs.readdirSync(folder).filter(f => f.endsWith('.html') && !/^google.*\.html$/.test(f))) {
      const file = path.join(folder, name);
      let html = enhancePortfolio(fs.readFileSync(file, 'utf8'), root);
      if (!dir && name === 'index.html') html = updateHome(html, posts);
      write(file, html);
    }
  }
  write(path.join(root, 'sitemap.xml'), sitemap(posts, root));
  console.log(`Blog: ${posts.length} published article(s); ${files.size} generated files. Draft sources excluded.`);
  return posts;
}

function prepareOutput(dir) {
  if (fs.existsSync(dir)) {
    assert(fs.existsSync(path.join(dir, '.portfolio-output')), `Refusing to clear unowned output directory: ${dir}`);
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir, { recursive: true });
  write(path.join(dir, '.portfolio-output'), 'Generated static artifact; safe to rebuild.\n');
}
function copyPublic(root, dest, posts) {
  for (const name of fs.readdirSync(root)) {
    if (name.endsWith('.html') || ['robots.txt', 'sitemap.xml', '.nojekyll', 'CNAME'].includes(name)) fs.copyFileSync(path.join(root, name), path.join(dest, name));
  }
  for (const dir of ['learnings', 'projects', 'research', 'topics', 'author', 'blog']) {
    for (const file of walk(path.join(root, dir))) {
      if (!/\.(html|xml|json)$/.test(file)) continue;
      const relative = path.relative(root, file);
      write(path.join(dest, relative), fs.readFileSync(file));
    }
  }
  for (const file of walk(path.join(root, 'assets'))) {
    const relative = path.relative(root, file);
    if (relative.startsWith('assets/images/blog/')) continue;
    write(path.join(dest, relative), fs.readFileSync(file));
  }
  for (const p of posts) for (const image of new Set([p.coverImage, p.socialImage].filter(Boolean))) write(path.join(dest, image), fs.readFileSync(path.join(root, image)));
  for (const name of ['contact.json', 'assistant.json']) write(path.join(dest, 'data', name), fs.readFileSync(path.join(root, 'data', name)));
}
function buildSite({ root = ROOT, preview = false } = {}) {
  const published = buildBlog({ root });
  const dest = path.join(root, preview ? '_preview' : '_site');
  prepareOutput(dest);
  copyPublic(root, dest, published);
  if (preview) {
    const image = '/assets/images/blog/formatting-example/cover.svg';
    write(path.join(dest, image), fs.readFileSync(path.join(__dirname, 'examples/cover.svg')));
    const posts = readArticles({ root, preview: true });
    for (const p of posts) for (const image of new Set([p.coverImage, p.socialImage].filter(Boolean))) write(path.join(dest, image), fs.readFileSync(path.join(root, image)));
    const example = parseArticle(fs.readFileSync(path.join(__dirname, 'examples/formatting.md'), 'utf8'), 'technology', { root, preview: true, imageRoot: dest });
    assert(!posts.some(p => p.url === example.url), 'formatting-example is reserved for the local example.');
    posts.push(example);
    // The preview starts from a fresh public artifact, then replaces blog pages.
    for (const [file, content] of outputs(posts, { preview: true, root })) write(path.join(dest, file), content);
    let home = updateHome(fs.readFileSync(path.join(dest, 'index.html'), 'utf8'), posts);
    home = home.replace('<html lang="en">', '<html lang="en" data-preview="true">').replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
    write(path.join(dest, 'index.html'), home);
    // Preview feeds and sitemap never advertise draft URLs.
    write(path.join(dest, 'blog/feed.xml'), outputs(published, { root }).get('blog/feed.xml'));
    write(path.join(dest, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  }
  console.log(`${preview ? 'Local preview' : 'Deployable site'}: ${dest}`);
  return dest;
}
if (require.main === module) { try { buildSite({ preview: process.argv.includes('--preview') }); } catch (e) { console.error(e.message); process.exitCode = 1; } }
module.exports = { buildBlog, buildSite, outputs, sitemap, walk };
