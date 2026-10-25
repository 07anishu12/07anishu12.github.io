const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');
const MarkdownIt = require('markdown-it');
const footnote = require('markdown-it-footnote');
const { imageSize } = require('image-size');
const { assertApproved } = require('./editorial');

const ROOT = path.resolve(__dirname, '../..');
const ORIGIN = process.env.CANONICAL_ORIGIN || 'https://aniket.app';
const AUTHOR = { '@type': 'Person', '@id': `${ORIGIN}/#person`, name: 'Aniket Thakur', url: `${ORIGIN}/author/aniket-thakur.html` };
const CATEGORIES = {
  technology: { name: 'Technology', description: 'AI, software, gadgets, tutorials, comparisons, and explainers.' },
  product: { name: 'Product', description: 'Product discovery, experimentation, AI product execution, and product operations.' },
  auto: { name: 'Auto', description: 'Cars, bikes, EVs, ownership costs, and automotive technology.' },
  finance: { name: 'Finance', description: 'Personal finance, markets, fintech, and financial explainers.' }
};
const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const httpUrl = s => { try { const u = new URL(s); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password; } catch { return false; } };
const personEntity = () => ({ '@type': 'Person', '@id': `${ORIGIN}/#person`, name: 'Aniket Thakur', url: `${ORIGIN}/author/aniket-thakur.html`, image: `${ORIGIN}/assets/img/aniket-portrait.png`, description: 'AI engineering, backend systems, product development and financial engineering.' });
const websiteEntity = () => ({ '@type': 'WebSite', '@id': `${ORIGIN}/#website`, url: `${ORIGIN}/`, name: 'Aniket Thakur', description: 'Personal portfolio, projects, research, learnings, and articles by Aniket Thakur.', publisher: { '@id': `${ORIGIN}/#person` }, inLanguage: 'en' });
const siteGraph = ({ url, title, description }) => ({ '@context': 'https://schema.org', '@graph': [personEntity(), websiteEntity(), { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'en', isPartOf: { '@id': `${ORIGIN}/#website` }, about: { '@id': `${ORIGIN}/#person` } }] });

function renderMarkdown(body) {
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false }).use(footnote);
  // Articles have exactly one image, supplied by metadata. Never expand inline images.
  md.renderer.rules.image = () => { throw new Error('Body images are disabled; use coverImage for the single main image.'); };
  const env = {};
  const tokens = md.parse(body, env);
  const headings = [], ids = new Set(['main-content', 'blog-title', 'article-title', 'article-sources', 'article-related', 'article-toc', 'article-answer', 'article-details', 'article-enquiry', 'article-answer-note']);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'heading_open') {
      assert(['h2', 'h3', 'h4'].includes(token.tag), 'Body headings must use H2–H4; the title supplies H1.');
      const text = tokens[i + 1].children.filter(t => t.type === 'text' || t.type === 'code_inline').map(t => t.content).join('');
      const base = `section-${text.normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'heading'}`;
      let id = base, n = 2;
      while (ids.has(id)) id = `${base}-${n++}`;
      ids.add(id); token.attrSet('id', id);
      if (token.tag !== 'h4') headings.push({ id, text, level: token.tag });
    }
    if (token.type === 'th_open') token.attrSet('scope', 'col');
    // GitHub-style callouts stay ordinary Markdown blockquotes.
    if (token.type === 'blockquote_open' && tokens[i + 2]?.type === 'inline') {
      const inline = tokens[i + 2], marker = inline.content.match(/^\[!(NOTE|TIP|IMPORTANT)\](?:\n|$)/);
      if (marker) {
        token.attrSet('class', `blog-callout blog-callout-${marker[1].toLowerCase()}`);
        inline.content = `**${marker[1][0]}${marker[1].slice(1).toLowerCase()}:** ${inline.content.slice(marker[0].length)}`;
        inline.children = md.parseInline(inline.content, {})[0].children;
      }
    }
  }
  md.renderer.rules.table_open = () => '<div class="blog-table" role="region" aria-label="Article table" tabindex="0"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (ts, i, options, env, renderer) => {
    const label = ts[i].info.trim().split(/\s+/)[0] || 'text';
    if (label.toLowerCase() === 'mermaid') {
      return `<div class="blog-diagram" role="region" aria-label="Visual workflow diagram" tabindex="0"><div class="blog-diagram-header"><span class="blog-diagram-badge">Visual Workflow</span><span class="blog-diagram-label">Architecture Diagram</span></div><pre class="mermaid">${escape(ts[i].content.trim())}</pre></div>\n`;
    }
    return `<div class="blog-code"><div class="blog-code-label">${escape(label)}</div>${fence(ts, i, options, env, renderer).replace('<pre>', `<pre tabindex="0" aria-label="${escape(label)} code block">`)}</div>`;
  };
  const html = md.renderer.render(tokens, md.options, env);
  return { html, headings, text: body.replace(/[`*#_~|>]/g, ''), readingTime: Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200)) };
}

function parseArticle(source, category, { root = ROOT, preview = false, imageRoot = root } = {}) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert(match, 'Expected YAML front matter between --- delimiters.');
  const data = YAML.parse(match[1], { uniqueKeys: true, maxAliasCount: 0 });
  assert(data && typeof data === 'object', 'Invalid front matter.');
  assert(typeof data.draft === 'boolean', 'draft must be true or false.');
  // Drafts may be incomplete while writing; publication and preview validate fully.
  if (data.draft && !preview) return null;
  for (const key of ['title', 'slug', 'description', 'category', 'author', 'datePublished', 'coverImage', 'coverImageAlt']) {
    assert(typeof data[key] === 'string' && data[key].trim(), `${key} is required and must be a nonempty string.`);
  }
  assert(CATEGORIES[category] && data.category.toLowerCase() === category, 'category must match its directory.');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) && !['page', 'index'].includes(data.slug), 'Use a lowercase hyphenated slug (page and index are reserved).');
  assert(data.seoTitle === undefined || (typeof data.seoTitle === 'string' && data.seoTitle.trim()), 'seoTitle must be a nonempty string when supplied.');
  for (const key of ['showSources', 'enquiry']) assert(data[key] === undefined || typeof data[key] === 'boolean', `${key} must be a boolean.`);
  if (data.quickAnswer !== undefined) {
    const q = data.quickAnswer;
    const text = value => typeof value === 'string' && value.trim();
    assert(q && typeof q === 'object' && text(q.question) && text(q.answer), 'quickAnswer needs question and answer strings.');
    assert(Array.isArray(q.facts) && q.facts.length > 0 && q.facts.length <= 4 && q.facts.every(f => f && text(f.label) && text(f.value)), 'quickAnswer.facts needs 1–4 label/value pairs.');
    for (const key of ['goodFor', 'watchFor']) assert(Array.isArray(q[key]) && q[key].length > 0 && q[key].length <= 3 && q[key].every(text), `quickAnswer.${key} needs 1–3 short strings.`);
    assert(q.note === undefined || text(q.note), 'quickAnswer.note must be a nonempty string when supplied.');
  }
  assert(data.author === AUTHOR.name, `author must be ${AUTHOR.name}.`);
  assert(data.featured === undefined || typeof data.featured === 'boolean', 'featured must be a boolean.');
  for (const key of ['datePublished', 'dateModified']) {
    const value = data[key];
    if (key === 'dateModified' && !value) continue;
    assert(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value, `${key} must be a real YYYY-MM-DD date.`);
    assert(value <= new Date(Date.now() + 14 * 3600 * 1000).toISOString().slice(0, 10), `${key} cannot be in the future.`);
  }
  assert(!data.dateModified || data.dateModified >= data.datePublished, 'dateModified precedes datePublished.');
  assert(Array.isArray(data.tags) && data.tags.every(t => typeof t === 'string' && t.trim()), 'tags must be an array of nonempty strings.');
  for (const key of ['imageCaption', 'imageCredit', 'imageSourceUrl']) assert(data[key] === undefined || typeof data[key] === 'string', `${key} must be a string.`);
  assert(!data.imageSourceUrl || httpUrl(data.imageSourceUrl), 'imageSourceUrl must be an HTTP(S) URL.');
  const readImage = key => {
    assert(typeof data[key] === 'string' && /^\/assets\/images\/blog\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(webp|avif|png|jpe?g|svg)$/i.test(data[key]), `${key} must be a local file under /assets/images/blog/.`);
    const imageFile = path.join(imageRoot, data[key]);
    assert(fs.existsSync(imageFile), `Missing ${key === 'coverImage' ? 'cover image' : 'social image'}: ${data[key]}`);
    const size = imageSize(fs.readFileSync(imageFile));
    assert(size.width > 0 && size.height > 0, `${key} dimensions could not be read.`);
    return size;
  };
  const size = readImage('coverImage');
  let socialSize = size;
  if (data.socialImage !== undefined) {
    assert(typeof data.socialImageAlt === 'string' && data.socialImageAlt.trim(), 'socialImageAlt is required with socialImage.');
    socialSize = readImage('socialImage');
  } else assert(data.socialImageAlt === undefined, 'socialImageAlt needs a socialImage.');
  const sources = data.sources || [];
  assert(Array.isArray(sources) && sources.every(s => s && typeof s.title === 'string' && s.title.trim() && httpUrl(s.url)), 'sources must be an array of {title, url} HTTP(S) references.');
  assert(match[2].trim(), 'Article body cannot be empty.');
  return { ...data, category, sources, width: size.width, height: size.height, socialWidth: socialSize.width, socialHeight: socialSize.height, url: `/blog/${category}/${data.slug}/`, body: match[2], ...renderMarkdown(match[2]) };
}

function readArticles(options = {}) {
  const root = options.root || ROOT, posts = [], paths = new Set();
  for (const category of Object.keys(CATEGORIES)) {
    const dir = path.join(root, 'data/blog', category);
    for (const file of fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort() : []) {
      try {
        const post = parseArticle(fs.readFileSync(path.join(dir, file), 'utf8'), category, options);
        if (!post) continue;
        if (!options.preview && !post.draft) assertApproved(root, post);
        assert(!paths.has(post.url), `Duplicate output path: ${post.url}`);
        paths.add(post.url); posts.push(post);
      } catch (e) { throw new Error(`data/blog/${category}/${file}: ${e.message}`); }
    }
  }
  return posts.sort((a, b) => b.datePublished.localeCompare(a.datePublished) || a.slug.localeCompare(b.slug));
}
module.exports = { ROOT, ORIGIN, AUTHOR, CATEGORIES, escape, json, assert, renderMarkdown, parseArticle, readArticles, siteGraph };
