const fs = require('node:fs');
const path = require('node:path');
const { ROOT, CATEGORIES, assert } = require('./content');
try {
  const [category, slug] = process.argv.slice(2);
  assert(CATEGORIES[category] && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '') && !['page', 'index', 'formatting-example'].includes(slug), 'Usage: npm run blog:new -- technology|auto|finance article-slug');
  const target = path.join(ROOT, 'data/blog', category, `${slug}.md`);
  const template = fs.readFileSync(path.join(__dirname, 'templates', `${category}.md`), 'utf8').replaceAll('ARTICLE_SLUG', slug).replaceAll('YYYY-MM-DD', new Date().toISOString().slice(0, 10));
  fs.writeFileSync(target, template, { flag: 'wx' });
  fs.mkdirSync(path.join(ROOT, 'assets/images/blog', slug), { recursive: true });
  console.log(`Created ${target}\nCopy your cover into assets/images/blog/${slug}/, then edit coverImage and coverImageAlt. Keep draft: true until ready.`);
} catch (e) { console.error(e.message); process.exitCode = 1; }
