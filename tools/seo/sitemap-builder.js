const fs = require('node:fs');
const path = require('node:path');

const ORIGIN = process.env.CANONICAL_ORIGIN || 'https://aniket.app';

const SITEMAP_SCHEMAS = {
  sitemapindex: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  urlset: 'http://www.sitemaps.org/schemas/sitemap/0.9'
};

const STATIC_PAGE_DATES = {
  '/': '2026-10-30',
  '/about/': '2026-10-25',
  '/work/': '2026-10-30',
  '/research/': '2026-10-25',
  '/research/graph-neural-networks-ecological-modeling.html': '2026-10-25',
  '/contact/': '2026-10-25',
  '/privacy/': '2026-10-25'
};

const PROJECT_SLUGS = [
  'fundflow-sentinel',
  'classevidence-ai',
  'finance-tools',
  'signal-desk',
  'fastcharger',
  'prompt-bi',
  'india-document-tools',
  'content-automation',
  'vehicle-catalogue-pipeline',
  'invoice-ocr',
  'seojev-laya',
  'omnichannel',
  'oist-graph-research'
];

const CATEGORY_MAP = {
  technology: 'blog-technology',
  auto: 'blog-automotive',
  product: 'blog-product',
  finance: 'blog-finance'
};

const SITEMAP_CONFIGS = [
  {
    id: 'pages',
    filename: 'sitemap-pages.xml',
    description: 'Homepage and static website pages'
  },
  {
    id: 'blog-categories',
    filename: 'sitemap-blog-categories.xml',
    description: 'Blog index and category listing pages'
  },
  {
    id: 'blog-technology',
    filename: 'sitemap-blog-technology.xml',
    description: 'Technology articles'
  },
  {
    id: 'blog-automotive',
    filename: 'sitemap-blog-automotive.xml',
    description: 'Automotive articles'
  },
  {
    id: 'blog-product',
    filename: 'sitemap-blog-product.xml',
    description: 'Product management articles'
  },
  {
    id: 'blog-finance',
    filename: 'sitemap-blog-finance.xml',
    description: 'Finance articles'
  },
  {
    id: 'projects',
    filename: 'sitemap-projects.xml',
    description: 'Portfolio projects and case studies'
  },
  {
    id: 'author',
    filename: 'sitemap-author.xml',
    description: 'Author profile pages'
  },
  {
    id: 'tools',
    filename: 'sitemap-tools.xml',
    description: 'Financial calculators and other tools'
  }
];

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function normalizeUrl(urlOrPath, origin = ORIGIN) {
  let u;
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    u = new URL(urlOrPath);
  } else {
    u = new URL(urlOrPath, origin);
  }
  let pathname = u.pathname;
  if (pathname !== '/' && !pathname.endsWith('/') && !path.extname(pathname)) {
    pathname += '/';
  }
  return `${origin}${pathname}`;
}

function formatIsoTimestamp(dateStr) {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T00:00:00+05:30`;
  }
  return dateStr;
}

function buildUrlsetXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${SITEMAP_SCHEMAS.urlset}">`
  ];
  for (const entry of entries) {
    if (entry.lastmod) {
      lines.push(`  <url>`);
      lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
      lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
      lines.push(`  </url>`);
    } else {
      lines.push(`  <url>`);
      lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
      lines.push(`  </url>`);
    }
  }
  lines.push('</urlset>');
  return lines.join('\n') + '\n';
}

function buildSitemapIndexXml(sitemaps) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<sitemapindex xmlns="${SITEMAP_SCHEMAS.sitemapindex}">`
  ];
  for (const sm of sitemaps) {
    lines.push('  <sitemap>');
    lines.push(`    <loc>${escapeXml(sm.loc)}</loc>`);
    if (sm.lastmod) {
      lines.push(`    <lastmod>${escapeXml(sm.lastmod)}</lastmod>`);
    }
    lines.push('  </sitemap>');
  }
  lines.push('</sitemapindex>');
  return lines.join('\n') + '\n';
}

/**
 * Collect and categorize all eligible public URLs from application sources.
 */
function collectSitemapData({ posts = [], projects = PROJECT_SLUGS, origin = ORIGIN } = {}) {
  const groups = new Map();
  for (const config of SITEMAP_CONFIGS) {
    groups.set(config.id, []);
  }

  // 1. Pages
  for (const [pathname, lastmod] of Object.entries(STATIC_PAGE_DATES)) {
    groups.get('pages').push({
      loc: normalizeUrl(pathname, origin),
      lastmod
    });
  }

  // Calculate latest dates per blog category
  const categoryDates = {};
  for (const p of posts) {
    const cat = p.category;
    const date = p.dateModified || p.datePublished;
    if (date) {
      if (!categoryDates[cat] || date > categoryDates[cat]) {
        categoryDates[cat] = date;
      }
      if (!categoryDates.all || date > categoryDates.all) {
        categoryDates.all = date;
      }
    }
  }

  // 2. Blog category index & category listings
  groups.get('blog-categories').push({
    loc: normalizeUrl('/blog/', origin),
    lastmod: categoryDates.all || '2026-10-31'
  });
  for (const cat of ['technology', 'auto', 'product', 'finance']) {
    const catPosts = posts.filter(p => p.category === cat);
    if (catPosts.length > 0) {
      groups.get('blog-categories').push({
        loc: normalizeUrl(`/blog/${cat}/`, origin),
        lastmod: categoryDates[cat] || categoryDates.all || '2026-10-31'
      });
    }
  }

  // 3-6. Individual blog articles
  for (const p of posts) {
    const groupId = CATEGORY_MAP[p.category];
    if (groupId && groups.has(groupId)) {
      const url = p.url ? normalizeUrl(p.url, origin) : normalizeUrl(`/blog/${p.category}/${p.slug}/`, origin);
      groups.get(groupId).push({
        loc: url,
        lastmod: p.dateModified || p.datePublished
      });
    }
  }

  // 7. Projects
  groups.get('projects').push({
    loc: normalizeUrl('/projects/', origin),
    lastmod: '2026-10-30'
  });
  const projectSlugs = Array.isArray(projects)
    ? projects.map(p => typeof p === 'string' ? p : p.slug)
    : PROJECT_SLUGS;
  for (const slug of projectSlugs) {
    groups.get('projects').push({
      loc: normalizeUrl(`/projects/${slug}/`, origin),
      lastmod: '2026-10-30'
    });
  }

  // 8. Author
  groups.get('author').push({
    loc: normalizeUrl('/author/aniket-thakur/', origin),
    lastmod: '2026-10-25'
  });

  // 9. Financial tools
  groups.get('tools').push({
    loc: normalizeUrl('/finance/bikes/', origin),
    lastmod: '2026-10-25'
  });

  return groups;
}

/**
 * Generate parent index and all child sitemaps.
 */
function generateAllSitemaps({ posts = [], projects = PROJECT_SLUGS, origin = ORIGIN } = {}) {
  const groups = collectSitemapData({ posts, projects, origin });
  const files = new Map();
  const indexEntries = [];
  const allUrls = new Set();
  const urlToGroup = new Map();

  for (const config of SITEMAP_CONFIGS) {
    const entries = groups.get(config.id) || [];
    if (entries.length === 0) continue; // Omit empty child sitemaps

    // Verify uniqueness within group and globally
    for (const entry of entries) {
      if (allUrls.has(entry.loc)) {
        throw new Error(`Duplicate URL across sitemaps: ${entry.loc} (in ${config.filename} and ${urlToGroup.get(entry.loc)})`);
      }
      allUrls.add(entry.loc);
      urlToGroup.set(entry.loc, config.filename);
    }

    // Determine latest lastmod for child sitemap
    const dates = entries.map(e => e.lastmod).filter(Boolean).sort();
    const latestDate = dates.length ? dates[dates.length - 1] : '';

    const xml = buildUrlsetXml(entries);
    files.set(config.filename, xml);

    indexEntries.push({
      loc: `${origin}/${config.filename}`,
      lastmod: formatIsoTimestamp(latestDate)
    });
  }

  const indexXml = buildSitemapIndexXml(indexEntries);
  files.set('sitemap.xml', indexXml);

  return {
    files,
    indexEntries,
    totalUrls: allUrls.size,
    groups: Object.fromEntries(
      [...groups.entries()].map(([id, entries]) => [
        SITEMAP_CONFIGS.find(c => c.id === id)?.filename || id,
        entries.length
      ])
    )
  };
}

/**
 * Write generated sitemaps to a directory.
 */
function writeSitemapsToDirectory(directory, sitemaps) {
  fs.mkdirSync(directory, { recursive: true });
  for (const [filename, content] of sitemaps.entries()) {
    fs.writeFileSync(path.join(directory, filename), content, 'utf8');
  }
}

module.exports = {
  ORIGIN,
  SITEMAP_SCHEMAS,
  STATIC_PAGE_DATES,
  PROJECT_SLUGS,
  SITEMAP_CONFIGS,
  CATEGORY_MAP,
  escapeXml,
  normalizeUrl,
  formatIsoTimestamp,
  buildUrlsetXml,
  buildSitemapIndexXml,
  collectSitemapData,
  generateAllSitemaps,
  writeSitemapsToDirectory
};
