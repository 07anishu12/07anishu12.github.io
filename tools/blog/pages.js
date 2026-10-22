const fs = require('node:fs');
const { createHash } = require('node:crypto');
const { ROOT, ORIGIN, AUTHOR, CATEGORIES, escape: e, json, assert } = require('./content');
const date = value => new Date(`${value}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function versionedAsset(root, file) {
  const version = createHash('sha256').update(fs.readFileSync(`${root}/${file}`)).digest('hex').slice(0, 12);
  return `/${file}?v=${version}`;
}
const stylesheet = root => versionedAsset(root, 'assets/css/blog.css');

function enhancePortfolio(html, root = ROOT) {
  const style = stylesheet(root);
  const config = versionedAsset(root, 'assets/js/site-config.js');
  html = html.replace(/\s*<link\b[^>]*type="application\/rss\+xml"[^>]*>/g, '');
  html = html.replace(/href="\/assets\/css\/blog\.css(?:\?[^\"]*)?"/g, `href="${style}"`);
  html = html.replace(/src="\/assets\/js\/site-config\.js(?:\?[^\"]*)?"/g, `src="${config}"`);
  html = html.replace(/(<nav\b[^>]*class="(?:desktop-nav|mobile-nav[^\"]*)"[^>]*>)([\s\S]*?)(<\/nav>)/g, (_, open, body, close) => {
    if (!body.includes('href="/blog/"')) body = body.replace(/(<a\b[^>]*>Contact<\/a>)/, '<a href="/blog/">Blog</a>\n      $1');
    return open + body + close;
  });
  html = html.replace(/<a(?![^>]*data-share=)([^>]*href="https:\/\/www\.linkedin\.com\/sharing\/share-offsite[^>]*>)/g, '<a data-share="linkedin"$1');
  const additions = [
    [`href="${style}"`, `<link rel="stylesheet" href="${style}">`],
    [`src="${config}"`, `<script src="${config}" defer></script>`],
    ['src="/assets/js/analytics.js"', '<script src="/assets/js/analytics.js" defer></script>'],
    ['name="robots"', '<meta name="robots" content="index, follow, max-image-preview:large">']
  ];
  for (const [marker, tag] of additions) if (!html.includes(marker)) html = html.replace('</head>', `  ${tag}\n</head>`);
  return html;
}

function chrome(root = ROOT) {
  const home = enhancePortfolio(fs.readFileSync(`${root}/index.html`, 'utf8'), root);
  const absolute = html => html.replace(/(href|src)="(?![a-z]+:|\/|#)([^\"]+)"/g, '$1="/$2"');
  return {
    header: absolute(home.match(/<header class="site-header">[\s\S]*?<\/header>/)[0]).replaceAll('href="/blog/"', 'href="/blog/" aria-current="page"'),
    footer: absolute(home.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0])
  };
}

function page({ title, description, url, content, post, breadcrumbs = [], preview = false, root = ROOT }) {
  const canonical = `${ORIGIN}${url}`, image = post ? `${ORIGIN}${post.coverImage}` : `${ORIGIN}/assets/img/aniket-portrait.png`;
  const socialImage = post?.socialImage ? `${ORIGIN}${post.socialImage}` : image;
  const socialAlt = post?.socialImageAlt || post?.coverImageAlt || 'Portrait of Aniket Thakur';
  const graph = [];
  if (post) graph.push({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, ...(post.quickAnswer ? { abstract: post.quickAnswer.answer } : {}), url: canonical, mainEntityOfPage: canonical, author: AUTHOR, image: { '@type': 'ImageObject', url: image, width: post.width, height: post.height, caption: post.coverImageAlt }, datePublished: post.datePublished, dateModified: post.dateModified || post.datePublished, articleSection: CATEGORIES[post.category].name, keywords: post.tags.join(', '), inLanguage: 'en', wordCount: post.body.trim().split(/\s+/).length });
  if (breadcrumbs.length) graph.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `${ORIGIN}${b.url}` })) });
  const { header, footer } = chrome(root);
  return `<!doctype html>
<html lang="en"${preview ? ' data-preview="true"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#FAF9F6">
<title>${e(title)}${post?.seoTitle ? '' : ' — Aniket Thakur'}</title>
<meta name="description" content="${e(description)}">
${preview ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${e(canonical)}">
<meta property="og:type" content="${post ? 'article' : 'website'}">
<meta property="og:site_name" content="Aniket Thakur">
<meta property="og:title" content="${e(title)}">
<meta property="og:description" content="${e(description)}">
<meta property="og:url" content="${e(canonical)}">
<meta property="og:image" content="${e(socialImage)}">
<meta property="og:image:alt" content="${e(socialAlt)}">
${post ? `<meta property="og:image:width" content="${post.socialWidth}">\n<meta property="og:image:height" content="${post.socialHeight}">` : ''}
${post ? `<meta property="article:published_time" content="${post.datePublished}">\n<meta property="article:modified_time" content="${post.dateModified || post.datePublished}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${e(title)}">
<meta name="twitter:description" content="${e(description)}">
<meta name="twitter:image" content="${e(socialImage)}">
<meta name="twitter:image:alt" content="${e(socialAlt)}">
<link rel="stylesheet" href="/assets/css/style.css?v=2.1.1">
<link rel="stylesheet" href="${stylesheet(root)}">
<script src="${versionedAsset(root, 'assets/js/site-config.js')}" defer></script>
<script src="/assets/js/analytics.js" defer></script>
${graph.map(s => `<script type="application/ld+json">${json(s)}</script>`).join('\n')}
</head>
<body data-page="blog${post ? '-article' : ''}">
<a class="skip-link" href="#main-content">Skip to content</a>
${header}
${preview ? '<aside class="blog-preview-banner">Local draft preview · Excluded from publication · Analytics disabled</aside>' : ''}
<main id="main-content" class="container blog-layout">${content}</main>
${footer}
<script src="/assets/js/main.js?v=2.1.0" defer></script>
<script src="/assets/js/blog.js" defer></script>
</body>
</html>\n`;
}

function card(post, heading = 'h2', eager = false) {
  return `<article class="blog-card">
<a class="blog-card-image" href="${post.url}" aria-label="Read ${e(post.title)}"><img src="${e(post.coverImage)}" alt="${e(post.coverImageAlt)}" width="${post.width}" height="${post.height}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></a>
<div class="blog-card-labels"><a class="eyebrow" href="/blog/${post.category}/">${CATEGORIES[post.category].name}</a>${post.featured ? '<span class="tag">Featured</span>' : ''}</div>
<${heading}><a href="${post.url}">${e(post.title)}</a></${heading}>
<p>${e(post.description)}</p>
<div class="blog-meta"><time datetime="${post.datePublished}">${date(post.datePublished)}</time><span>${post.readingTime} min read</span>${post.draft ? '<strong>Draft preview</strong>' : ''}</div>
</article>`;
}
const empty = '<div class="blog-empty"><p>No articles published here yet. Explore the <a class="meta-link" href="/learnings.html">Learnings library →</a></p></div>';
function latest(posts) {
  return `<!-- BLOG:LATEST:START -->\n<section class="blog-latest" aria-labelledby="latest-articles"><div class="container"><p class="eyebrow">From the blog</p><h2 id="latest-articles">Latest <span class="serif-accent">Articles.</span></h2><p>Technology, Auto, and Finance.</p>${posts.length ? `<div class="blog-grid">${posts.slice(0, 3).map(p => card(p, 'h3')).join('\n')}</div>` : empty}<a class="meta-link" href="/blog/">Browse all articles →</a></div></section>\n<!-- BLOG:LATEST:END -->`;
}
function listing(posts, { category = '', number = 1, size = 9, ...options } = {}) {
  const base = `/blog/${category ? `${category}/` : ''}`, url = number === 1 ? base : `${base}page/${number}/`;
  const total = Math.max(1, Math.ceil(posts.length / size)), selected = posts.slice((number - 1) * size, number * size);
  const title = category ? `${CATEGORIES[category].name} Articles` : 'Blog';
  const description = category ? CATEGORIES[category].description : 'Articles by Aniket Thakur on Technology, Auto, and Finance.';
  return page({ ...options, title: `${title}${number > 1 ? ` — Page ${number}` : ''}`, description, url,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }, ...(category ? [{ name: CATEGORIES[category].name, url: base }] : [])],
    content: `<header class="blog-heading"><p class="eyebrow">Writing &amp; explainers</p><h1>${e(title)}<span class="serif-accent">.</span></h1><p class="lead">${e(description)}</p></header>
<nav class="blog-categories" aria-label="Article categories"><a href="/blog/"${!category ? ' aria-current="page"' : ''}>All articles</a>${Object.entries(CATEGORIES).map(([key, c]) => `<a href="/blog/${key}/"${category === key ? ' aria-current="page"' : ''}>${c.name}</a>`).join('')}</nav>
<form class="blog-search" data-blog-search data-category="${category}" role="search" hidden><label>Search articles<input type="search" name="q" autocomplete="off" placeholder="Title, topic, or phrase"></label><label>Topic tag<select name="tag"><option value="">All topics</option></select></label></form>
<p class="blog-status" data-search-status role="status"></p><div class="blog-grid" data-search-results hidden></div>
<div data-static-listing>${selected.length ? `<div class="blog-grid">${selected.map((p, i) => card(p, 'h2', i < 3)).join('\n')}</div>` : empty}
${total > 1 ? `<nav class="blog-pagination" aria-label="Article pages">${Array.from({ length: total }, (_, i) => `<a href="${i === 0 ? base : `${base}page/${i + 1}/`}"${i + 1 === number ? ' aria-current="page"' : ''}>${i + 1}</a>`).join('')}</nav>` : ''}</div>` });
}

function quickAnswer(post) {
  const q = post.quickAnswer;
  if (!q) return '';
  const ctaText = post.category === 'auto' ? 'Read the full buying guide' : (post.category === 'finance' ? 'Read the full financial guide' : 'Read the full technical guide');
  return `<section class="blog-answer" aria-labelledby="article-answer">
<p class="blog-answer-kicker">The 30-second answer</p><h2 id="article-answer">${e(q.question)}</h2>
<p class="blog-answer-verdict">${e(q.answer)}</p>
<dl class="blog-answer-facts"${q.note ? ' aria-describedby="article-answer-note"' : ''}>${q.facts.map(f => `<div><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}</dl>
${q.note ? `<p class="blog-answer-note" id="article-answer-note">${e(q.note)}</p>` : ''}
<div class="blog-answer-decisions"><div class="blog-answer-good"><h3>Good fit</h3><ul>${q.goodFor.map(s => `<li>${e(s)}</li>`).join('')}</ul></div><div class="blog-answer-watch"><h3>Check first</h3><ul>${q.watchFor.map(s => `<li>${e(s)}</li>`).join('')}</ul></div></div>
<a class="blog-answer-read" href="#article-details">${ctaText} <span aria-hidden="true">↓</span></a>
</section>`;
}

function enquiry(post, root) {
  if (!post.enquiry) return '';
  const contact = JSON.parse(fs.readFileSync(`${root}/data/contact.json`, 'utf8'));
  assert(/^\d{7,15}$/.test(contact.whatsapp), 'The enquiry WhatsApp number must be configured in data/contact.json.');
  const message = `Hi Aniket, I have a question about this car. I read your guide: ${ORIGIN}${post.url}`;
  return `<section class="blog-enquiry" aria-labelledby="article-enquiry"><p class="eyebrow">Ask Aniket</p><h2 id="article-enquiry">Questions about this car?</h2><p>Leave a message or start a WhatsApp conversation about a feature, variant, or something in this guide.</p><div class="blog-enquiry-actions"><a class="btn blog-whatsapp" data-article-enquiry="whatsapp" href="https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener">Ask on WhatsApp ↗</a><a class="btn btn-secondary" href="/contact.html">Leave a message</a></div></section>`;
}

function article(post, posts, options = {}) {
  const category = CATEGORIES[post.category];
  const related = posts.filter(p => p.url !== post.url).map(p => ({ p, score: (p.category === post.category ? 3 : 0) + p.tags.filter(t => post.tags.includes(t)).length })).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(x => x.p);
  const crumbs = [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog/' }, { name: category.name, url: `/blog/${post.category}/` }, { name: post.title, url: post.url }];
  return page({ ...options, title: post.seoTitle || post.title, description: post.description, url: post.url, post, breadcrumbs: crumbs, content: `
<article class="blog-article" data-article-category="${post.category}" data-article-slug="${post.slug}">
<div class="reading-progress-track" aria-hidden="true"><div class="reading-progress-bar" id="reading-progress"></div></div>
<nav class="blog-breadcrumb" aria-label="Breadcrumb">${crumbs.slice(0, -1).map(c => `<a href="${c.url}">${e(c.name)}</a>`).join('<span aria-hidden="true">/</span>')}<span aria-current="page">Article</span></nav>
<header class="blog-article-header"><div class="blog-header-badge"><a class="eyebrow" href="/blog/${post.category}/">${category.name}</a></div>
<h1 id="article-title">${e(post.title)}</h1>
<p class="blog-description">${e(post.description)}</p>
<div class="blog-meta"><a rel="author" href="/author/aniket-thakur.html">${e(post.author)}</a><span>Published <time datetime="${post.datePublished}">${date(post.datePublished)}</time></span>${post.dateModified && post.dateModified !== post.datePublished ? `<span>Updated <time datetime="${post.dateModified}">${date(post.dateModified)}</time></span>` : ''}<span>${post.readingTime} min read</span></div></header>
${quickAnswer(post)}
<figure class="blog-cover"><img src="${e(post.coverImage)}" alt="${e(post.coverImageAlt)}" width="${post.width}" height="${post.height}" fetchpriority="high" decoding="async">${post.imageCaption || post.imageCredit || post.imageSourceUrl ? `<figcaption>${e(post.imageCaption || '')}${post.imageCredit ? ` · Credit: ${e(post.imageCredit)}` : ''}${post.imageSourceUrl ? ` · <a href="${e(post.imageSourceUrl)}" rel="noopener">Image source</a>` : ''}</figcaption>` : ''}</figure>
<nav class="blog-tags" aria-label="Article topics">${post.tags.map(t => `<a href="/blog/?tag=${encodeURIComponent(t)}">${e(t)}</a>`).join('')}</nav>
${post.headings.length >= 3 ? `<nav class="blog-toc" aria-labelledby="article-toc"><details><summary><h2 id="article-toc">On this page</h2><span>${post.headings.length} sections</span></summary><ol>${post.headings.map(h => `<li class="toc-${h.level}"><a href="#${h.id}">${e(h.text)}</a></li>`).join('')}</ol></details></nav>` : ''}
<div class="blog-body" id="article-details">${post.html}</div>
${post.category === 'finance' ? '<aside class="blog-disclaimer"><strong>Educational content:</strong> This article provides general information, not personalised financial, tax, or investment advice. Check the dates, sources, assumptions, and risks before making decisions.</aside>' : ''}
${post.sources.length && post.showSources !== false ? `<section class="blog-sources" aria-labelledby="article-sources"><h2 id="article-sources">Sources &amp; references</h2><ol>${post.sources.map(s => `<li><a href="${e(s.url)}" rel="noopener">${e(s.title)}</a></li>`).join('')}</ol></section>` : ''}
${enquiry(post, options.root || ROOT)}
<div class="blog-sharing"><span>Share this article</span><button type="button" class="btn btn-secondary btn-sm" data-share="copy" data-url="${ORIGIN}${post.url}">Copy link</button><a class="btn btn-secondary btn-sm" data-share="linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ORIGIN + post.url)}" target="_blank" rel="noopener">LinkedIn ↗</a><span data-share-status role="status"></span></div>
${related.length ? `<section class="blog-related" aria-labelledby="article-related"><h2 id="article-related">Related articles</h2><div class="blog-grid">${related.map(p => card(p, 'h3')).join('')}</div></section>` : ''}
</article>` });
}
module.exports = { enhancePortfolio, latest, listing, article, card };
