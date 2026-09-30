#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../');
const DATA_FILE = path.join(ROOT_DIR, 'data/learnings.json');
const OUTPUT_DIR = path.join(ROOT_DIR, 'learnings');
const INDEX_HTML = path.join(ROOT_DIR, 'learnings.html');

function formatDate(isoStr) {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return isoStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function markdownToHtml(md) {
  if (!md) return '';
  let html = md;

  // Escape HTML entities inside code blocks
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const lines = code.split('\n');
    let lang = '';
    if (lines[0] && !lines[0].includes(' ') && lines[0].length < 15) {
      lang = lines.shift().trim();
    }
    const cleanCode = lines.join('\n')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="language-${lang}">${cleanCode}</code></pre>`;
  });

  // Math blocks: $$ ... $$
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    return `<div class="formula-block"><code>${formula.trim()}</code></div>`;
  });

  // Inline code: `...`
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    return `<code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`;
  });

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="editorial-divider">');

  // Process paragraphs and unordered lists
  const blocks = html.split(/\n{2,}/);
  const renderedBlocks = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<h') || block.startsWith('<pre') || block.startsWith('<blockquote') || block.startsWith('<div class="formula') || block.startsWith('<hr')) {
      return block;
    }

    // Unordered lists
    if (block.startsWith('* ') || block.startsWith('- ')) {
      const items = block.split('\n').map(line => {
        const item = line.replace(/^[\*\-]\s+/, '').trim();
        return `<li>${item}</li>`;
      }).join('');
      return `<ul>${items}</ul>`;
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(block)) {
      const items = block.split('\n').map(line => {
        const item = line.replace(/^\d+\.\s+/, '').trim();
        return `<li>${item}</li>`;
      }).join('');
      return `<ol>${items}</ol>`;
    }

    // Normal paragraph
    const pContent = block.replace(/\n/g, '<br>');
    return `<p>${pContent}</p>`;
  });

  return renderedBlocks.join('\n\n');
}

function buildStaticPages() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Data file not found: ${DATA_FILE}`);
    return;
  }

  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  let articles = [];
  try {
    articles = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse data/learnings.json:', err.message);
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const published = articles.filter(a => a.status === 'published');
  console.log(`Building ${published.length} published articles out of ${articles.length} total entries...`);

  // Build each published article page
  published.forEach((article) => {
    const slug = article.slug || article.id;
    const filePath = path.join(OUTPUT_DIR, `${slug}.html`);
    const dateFormatted = formatDate(article.publishedDate);
    const bodyHtml = markdownToHtml(article.body);
    const readingTime = article.readingTime || '4 min read';
    const category = article.category || 'General';
    const contentType = article.contentType || 'Note';
    const title = article.title || 'Untitled';
    const description = article.shortDescription || '';
    const canonical = `https://07anishu12.github.io/learnings/${slug}.html`;
    const ogImg = article.heroImage ? (article.heroImage.startsWith('http') ? article.heroImage : `https://07anishu12.github.io/${article.heroImage}`) : 'https://07anishu12.github.io/assets/img/aniket-portrait.png';

    // Source banner
    let sourceBanner = '';
    if (article.source === 'LinkedIn') {
      const linkUrl = article.sourceUrl || 'https://www.linkedin.com/in/aniket-thakur-a23a9b372';
      sourceBanner = `
        <div class="note-source-badge">
          <span>Originally shared on LinkedIn</span>
          <a href="${linkUrl}" target="_blank" rel="noopener" class="note-source-link">View original post on LinkedIn ↗</a>
        </div>
      `;
    } else if (article.source && article.source !== 'Personal') {
      const linkUrl = article.sourceUrl || '#';
      sourceBanner = `
        <div class="note-source-badge">
          <span>Source: ${article.source}</span>
          ${article.sourceUrl ? `<a href="${linkUrl}" target="_blank" rel="noopener" class="note-source-link">View source reference ↗</a>` : ''}
        </div>
      `;
    }

    // Hero image HTML
    let heroImageHtml = '';
    if (article.heroImage) {
      const imgPath = article.heroImage.startsWith('http') ? article.heroImage : (article.heroImage.startsWith('/') ? `..${article.heroImage}` : `../${article.heroImage}`);
      heroImageHtml = `
        <figure class="article-hero-media">
          <img src="${imgPath}" alt="${article.imageAlt || title}" loading="lazy">
          ${article.imageAlt ? `<figcaption class="article-hero-caption">${article.imageAlt}</figcaption>` : ''}
        </figure>
      `;
    }

    // Tags
    const tagsHtml = (article.tags || []).map(t => `<span class="tag">${t}</span>`).join(' ');

    // Related articles
    let relatedHtml = '';
    if (article.relatedArticles && article.relatedArticles.length > 0) {
      const relatedItems = published.filter(p => p.slug !== slug && article.relatedArticles.includes(p.slug));
      if (relatedItems.length > 0) {
        const cards = relatedItems.map(item => `
          <a class="related-note-card" href="${item.slug}.html">
            <span class="eyebrow">${item.category} · ${item.contentType || 'Note'}</span>
            <h4>${item.title}</h4>
            <p>${item.shortDescription || ''}</p>
            <span class="meta-link">Read note →</span>
          </a>
        `).join('');
        relatedHtml = `
          <div class="related-notes-section">
            <h3 class="related-notes-title">Continue reading</h3>
            <div class="related-notes-grid">
              ${cards}
            </div>
          </div>
        `;
      }
    }

    const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#FAF9F6">
  <title>${title} — Aniket Thakur</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Aniket Thakur">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImg}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImg}">
  <link rel="stylesheet" href="../assets/css/style.css?v=2.1.0">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": ${JSON.stringify(title)},
    "description": ${JSON.stringify(description)},
    "author": {
      "@type": "Person",
      "name": "Aniket Thakur",
      "url": "https://07anishu12.github.io/"
    },
    "datePublished": "${article.publishedDate}",
    "dateModified": "${article.updatedDate || article.publishedDate}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${canonical}"
    }
  }
  </script>
</head>
<body data-page="learnings-article">
  <a class="skip-link" href="#main-content">Skip to content</a>

  <!-- Navigation -->
  <header class="site-header">
    <div class="container nav-inner">
      <a class="brand" href="../index.html" aria-label="Aniket Thakur homepage">
        <span class="brand-name">Aniket Thakur</span>
        <span class="brand-desc">AI × Product × Finance</span>
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="../about.html">About</a>
        <a href="../work.html">Work</a>
        <a href="../index.html#research">Research</a>
        <a href="../learnings.html" aria-current="page">Learnings</a>
        <a href="../contact.html">Contact</a>
      </nav>

      <div class="nav-actions">
        <a class="btn btn-quiet btn-sm nav-resume" href="../assets/Aniket_Thakur_Resume.pdf" download>Download Résumé ↓</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Toggle navigation menu">
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </div>

    <nav class="mobile-nav container" id="mobile-nav" aria-label="Mobile navigation" hidden>
      <a href="../about.html">About</a>
      <a href="../work.html">Work</a>
      <a href="../index.html#research">Research</a>
      <a href="../learnings.html" aria-current="page">Learnings</a>
      <a href="../contact.html">Contact</a>
      <div class="mobile-actions">
        <a class="btn btn-secondary" href="../assets/Aniket_Thakur_Resume.pdf" download>Download Résumé ↓</a>
        <a class="btn btn-primary" href="https://wa.me/817012905081" target="_blank" rel="noopener">WhatsApp Me ↗</a>
      </div>
    </nav>
  </header>

  <main id="main-content">
    <article class="article-container container">
      <!-- Article Header -->
      <header class="article-header">
        <nav class="article-breadcrumb" aria-label="Breadcrumb">
          <a href="../learnings.html">← Back to Notes</a>
          <span class="breadcrumb-separator">/</span>
          <span>${category}</span>
          <span class="breadcrumb-separator">/</span>
          <span>${contentType}</span>
        </nav>

        <h1 class="article-title">${title}</h1>
        ${description ? `<p class="article-lead">${description}</p>` : ''}

        <div class="article-meta-row">
          <div class="article-author-info">
            <span class="author-name">Aniket Thakur</span>
            <span class="meta-dot">·</span>
            <time datetime="${article.publishedDate}">${dateFormatted}</time>
            <span class="meta-dot">·</span>
            <span>${readingTime}</span>
          </div>
          ${tagsHtml ? `<div class="article-tags-wrap">${tagsHtml}</div>` : ''}
        </div>

        ${sourceBanner}
      </header>

      ${heroImageHtml}

      <!-- Article Body -->
      <div class="article-body">
        ${bodyHtml}
      </div>

      <!-- Article Footer & Attribution -->
      <footer class="article-footer">
        <div class="article-share-strip">
          <span>Written &amp; published by <strong>Aniket Thakur</strong></span>
          <div class="share-actions">
            <a class="btn btn-secondary btn-sm" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}" target="_blank" rel="noopener">Share on LinkedIn ↗</a>
            <a class="btn btn-secondary btn-sm" href="../learnings.html">← All Notes</a>
          </div>
        </div>

        ${relatedHtml}
      </footer>
    </article>

    <!-- Discussion Banner -->
    <section class="section-compact section-border-top" aria-labelledby="article-cta-title">
      <div class="container">
        <div class="cta-banner">
          <p class="eyebrow">Discussion</p>
          <h2 id="article-cta-title">Have thoughts on AI, finance, or <span class="serif-accent">product?</span></h2>
          <p>I welcome conversations around technical architectures, systemic risks, and product trade-offs.</p>
          <div class="btn-group">
            <a class="btn btn-primary" href="../contact.html">Start a conversation ↗</a>
            <a class="btn btn-secondary" href="https://www.linkedin.com/in/aniket-thakur-a23a9b372" target="_blank" rel="noopener">Follow on LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="footer-brand-title">Aniket Thakur</span>
          <p class="footer-brand-desc">
            AI Researcher &amp; Product Builder.<br>
            Bridging machine learning models, product delivery, and financial systems.
          </p>
          <p class="meta-text">New Delhi, India</p>
        </div>

        <div>
          <h4 class="footer-col-title">Navigation</h4>
          <ul class="footer-links-list">
            <li><a href="../about.html">About</a></li>
            <li><a href="../work.html">Selected Work</a></li>
            <li><a href="../index.html#research">Research at OIST</a></li>
            <li><a href="../learnings.html">Learnings &amp; Notes</a></li>
            <li><a href="../contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Direct Connect</h4>
          <ul class="footer-links-list">
            <li><a href="mailto:kumaraniketn@gmail.com">kumaraniketn@gmail.com</a></li>
            <li><a href="tel:+918448769791">+91 8448769791</a></li>
            <li><a href="https://wa.me/817012905081" target="_blank" rel="noopener">WhatsApp: +81 70-1290-5081 ↗</a></li>
            <li><a href="https://www.linkedin.com/in/aniket-thakur-a23a9b372" target="_blank" rel="noopener">LinkedIn ↗</a></li>
            <li><a href="https://github.com/07anishu12" target="_blank" rel="noopener">GitHub ↗</a></li>
            <li><a href="../assets/Aniket_Thakur_Resume.pdf" download>Download Résumé ↓</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 Aniket Thakur. All rights reserved.</span>
        <span>Built with clean HTML, CSS &amp; Vanilla JS · Hosted on GitHub Pages</span>
      </div>
    </div>
  </footer>

  <script src="../assets/js/main.js?v=2.1.0" defer></script>
</body>
</html>`;

    fs.writeFileSync(filePath, htmlContent, 'utf8');
  });

  // Now update learnings.html
  updateLearningsIndex(published);
}

function updateLearningsIndex(published) {
  if (!fs.existsSync(INDEX_HTML)) return;

  const featured = published.find(a => a.featured) || published[0];
  const regularNotes = published.filter(a => a !== featured);

  // Distinct category list from published articles
  const categories = ['All Topics', ...new Set(published.map(a => a.category).filter(Boolean))];

  // Build Filter Tabs HTML
  const filterTabsHtml = categories.map((cat, idx) => {
    const filterVal = cat === 'All Topics' ? 'All' : cat;
    const isPressed = idx === 0 ? 'true' : 'false';
    return `<button class="filter-tab" type="button" data-filter="${filterVal}" aria-pressed="${isPressed}">${cat}</button>`;
  }).join('\n          ');

  // Featured Note Card HTML
  let featuredHtml = '';
  if (featured) {
    const featuredSlug = featured.slug || featured.id;
    const featuredDate = formatDate(featured.publishedDate);
    const tags = (featured.tags || []).map(t => `<span class="tag">${t}</span>`).join(' ');
    featuredHtml = `
        <!-- Featured Note -->
        <section class="featured-note-card" aria-label="Featured note">
          <div class="featured-note-content">
            <div class="featured-badge-row">
              <span class="badge badge-featured">Featured Analysis</span>
              <span class="meta-tag">${featured.category} · ${featured.contentType || 'Case Study'}</span>
              <span class="meta-dot">·</span>
              <time datetime="${featured.publishedDate}">${featuredDate}</time>
              <span class="meta-dot">·</span>
              <span>${featured.readingTime || '5 min read'}</span>
            </div>

            <h2 class="featured-note-title">
              <a href="learnings/${featuredSlug}.html">${featured.title}</a>
            </h2>

            <p class="featured-note-lead">${featured.shortDescription}</p>

            <div class="featured-note-actions">
              <a class="btn btn-primary btn-sm" href="learnings/${featuredSlug}.html">Read full analysis →</a>
              ${featured.sourceUrl ? `<a class="btn btn-secondary btn-sm" href="${featured.sourceUrl}" target="_blank" rel="noopener">Original on LinkedIn ↗</a>` : ''}
              <div class="featured-tags">${tags}</div>
            </div>
          </div>
        </section>
    `;
  }

  // Regular Cards HTML
  let cardsHtml = '';
  if (published.length > 0) {
    cardsHtml = published.map((article) => {
      const slug = article.slug || article.id;
      const dateFormatted = formatDate(article.publishedDate);
      const tags = (article.tags || []).slice(0, 3).map(t => `<span class="tag">${t}</span>`).join(' ');
      const isFeatured = article === featured;

      return `
            <article class="note-card" data-category="${article.category}" data-featured="${isFeatured ? 'true' : 'false'}">
              <div class="note-card-meta">
                <span class="eyebrow">${article.category}</span>
                <span class="meta-dot">·</span>
                <time datetime="${article.publishedDate}">${dateFormatted}</time>
                <span class="meta-dot">·</span>
                <span>${article.readingTime || '3 min read'}</span>
              </div>
              <h3 class="note-card-title">
                <a href="learnings/${slug}.html">${article.title}</a>
              </h3>
              <p class="note-card-desc">${article.shortDescription}</p>
              <div class="note-card-footer">
                <div class="note-card-tags">${tags}</div>
                <div class="note-card-links">
                  <a class="note-read-link" href="learnings/${slug}.html">Read note →</a>
                  ${article.source === 'LinkedIn' && article.sourceUrl ? `<a class="note-linkedin-link" href="${article.sourceUrl}" target="_blank" rel="noopener" aria-label="Original post on LinkedIn">LinkedIn ↗</a>` : ''}
                </div>
              </div>
            </article>
      `;
    }).join('\n');
  } else {
    cardsHtml = `
          <div class="learnings-empty-box" style="grid-column: 1 / -1;">
            <p class="eyebrow">Coming Soon</p>
            <h3>Notes from the build</h3>
            <p>Writing and technical notes are currently being prepared.</p>
          </div>
    `;
  }

  const newSectionContent = `    <section class="section" aria-labelledby="learnings-title">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Writing &amp; Reflections</p>
          <div class="section-header-row">
            <div class="section-header-content">
              <h1 id="learnings-title">Notes from <span class="serif-accent">the build.</span></h1>
              <p class="lead">
                A growing library of notes on AI engineering, financial systems, product thinking, research, and the ideas I'm exploring along the way.
              </p>
            </div>
          </div>
        </div>

${featuredHtml}

        <div class="notes-catalog-header">
          <h3 class="notes-catalog-title">Selected Notes</h3>
          <!-- Filter tabs -->
          <div class="filter-tabs" role="group" aria-label="Filter notes by topic">
          ${filterTabsHtml}
          </div>
        </div>

        <p class="sr-only" data-learning-status aria-live="polite">${published.length} notes published</p>

        <!-- Dynamic Grid -->
        <div class="notes-grid" data-learning-grid aria-live="polite">
${cardsHtml}
        </div>
      </div>
    </section>`;

  let content = fs.readFileSync(INDEX_HTML, 'utf8');

  // Replace section between <main id="main-content"> and <!-- Connect Banner -->
  const regex = /<main id="main-content">[\s\S]*?<!-- Connect Banner -->/;
  if (regex.test(content)) {
    content = content.replace(regex, `<main id="main-content">\n${newSectionContent}\n\n    <!-- Connect Banner -->`);
    fs.writeFileSync(INDEX_HTML, content, 'utf8');
    console.log(`Updated ${INDEX_HTML} successfully.`);
  } else {
    console.warn(`Could not match main content section in ${INDEX_HTML}`);
  }
}

buildStaticPages();
