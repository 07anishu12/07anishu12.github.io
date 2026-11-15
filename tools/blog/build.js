const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ROOT, ORIGIN, CATEGORIES, readArticles, parseArticle, assert } = require('./content');
const { enhancePortfolio, latest, listing, article } = require('./pages');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]) : [];
const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };

function outputs(posts, { preview = false, root = ROOT } = {}) {
  const files = new Map();
  for (const p of posts) files.set(`${p.url.slice(1)}index.html`, article(p, posts, { preview, root }));
  for (const category of ['', ...Object.keys(CATEGORIES)]) {
    let selected;
    if (category) {
      selected = posts.filter(p => p.category === category);
    } else {
      const nonAuto = posts.filter(p => p.category !== 'auto');
      selected = nonAuto.length > 0 ? nonAuto : posts;
    }
    for (let n = 1; n <= Math.max(1, Math.ceil(selected.length / 9)); n++) {
      files.set(`blog/${category ? `${category}/` : ''}${n > 1 ? `page/${n}/` : ''}index.html`, listing(selected, { category, number: n, preview, root }));
    }
  }
  files.set('blog/search.json', JSON.stringify(posts.map(p => ({ url: p.url, title: p.title, description: p.description, category: p.category, categoryName: CATEGORIES[p.category].name, tags: p.tags, datePublished: p.datePublished, coverImage: p.coverImage, coverImageAlt: p.coverImageAlt, width: p.width, height: p.height, readingTime: p.readingTime }))) + '\n');
  files.set('blog/search-text.json', JSON.stringify(posts.map(p => ({ url: p.url, text: p.text }))) + '\n');
  return files;
}

function llms(posts) {
  const link = (label, url, description) => `- [${label.replace(/[\[\]\r\n]/g, '')}](${ORIGIN}${url}): ${description.replace(/[\r\n]+/g, ' ')}`;
  const techPosts = posts.filter(p => p.category === 'technology');
  const financePosts = posts.filter(p => p.category === 'finance');
  const cfaPosts = posts.filter(p => p.category === 'cfa');
  const productPosts = posts.filter(p => p.category === 'product');
  const autoPosts = posts.filter(p => p.category === 'auto');
  const sortedPosts = [...techPosts, ...financePosts, ...cfaPosts, ...productPosts, ...autoPosts];

  return `# Aniket Thakur

> Personal portfolio, projects, research, learnings, and technical publications by Aniket Thakur.
> AI Engineer | AI Researcher | Associate Product Manager | Financial Engineering

This file is a navigation and discovery aid for LLMs, AI agents, and search engines. The linked HTML pages contain the full public canonical content.

## Portfolio
${[
    ['Home', '/', 'Portfolio overview, featured systems, and latest professional articles.'],
    ['About', '/about/', 'Verified background, research history, and technical profile.'],
    ['Work', '/work/', 'Selected engineering work, fintech systems, and production AI tools.'],
    ['Projects', '/projects/', 'Directory of verified software, research, and data tools.'],
    ['Research', '/research/', 'Academic and applied AI research on GNNs and LLM evaluation.'],
    ['Learnings', '/learnings/', 'Deep-dive technical explainers and system notes.'],
    ['Topics', '/topics/', 'Browse 6 topical authority hubs across AI, finance, and engineering.'],
    ['Author', '/author/aniket-thakur/', 'Author entity profile and verified associations.'],
    ['Contact', '/contact/', 'Direct professional contact channels.']
  ].map(args => link(...args)).join('\n')}

## Topical Authority Hubs
${[
    ['AI Engineering Hub', '/topics/ai-engineering/', 'Production LLMs, evaluation harnesses, inference architectures, and real-time AI.'],
    ['Agentic AI Hub', '/topics/agentic-ai/', 'Autonomous agent loops, tool-calling pipelines, memory architectures, and safety.'],
    ['Data Engineering Hub', '/topics/data-engineering/', 'Distributed pipelines, PostgreSQL tuning, lakehouses, ETL reliability, and Redis caching.'],
    ['Fintech & Product Hub', '/topics/fintech-product/', 'Product management for fintech, loan origination, experiment design, and conversion.'],
    ['Quantitative Finance Hub', '/topics/quantitative-finance/', 'Algorithmic trading, volatility modeling, risk metrics, portfolio optimization, and derivatives.'],
    ['AI Research Hub', '/topics/ai-research/', 'Graph Neural Networks, topological deep learning, geometric graph embeddings, and OIST research.']
  ].map(args => link(...args)).join('\n')}

## Flagship Projects
${[
    ['Projects Index', '/projects/', 'Directory of verified software, research, and data tools.'],
    ['Prompt-Based BI Engine', '/projects/prompt-bi/', 'Natural language SQL translation and interactive visual dashboard generation.'],
    ['SEO Agent Laya', '/projects/seojev-laya/', 'Autonomous SEO auditing agent crawling and validating technical site architecture.']
  ].map(args => link(...args)).join('\n')}

## Blog
${link('Blog', '/blog/', 'All published professional articles; full article text is available in HTML without JavaScript.')}
${Object.entries(CATEGORIES).map(([key, c]) => link(c.name, `/blog/${key}/`, c.description)).join('\n')}

## Published articles
${sortedPosts.map(p => link(p.title, p.url, `${p.description} Published ${p.datePublished}.${p.dateModified && p.dateModified !== p.datePublished ? ` Updated ${p.dateModified}.` : ''}`)).join('\n') || 'No articles published yet.'}

## Content context

- Article topic tags describe the subject; headings organise each article.
- Manufacturer claims, sourced specifications, editorial analysis, and first-hand testing are distinct. Only describe an article as an independent test when it explicitly documents one.
- Automotive prices and specifications are dated and can vary by market and variant. Finance articles are educational and include their own disclosures.
- Verified External Profiles: GitHub: https://github.com/07anishu12 | LinkedIn: https://www.linkedin.com/in/aniket-thakur-a23a9b372 | Medium: https://medium.com/@kumaraniketn
`;
}

function llmsFull(posts) {
  const link = (label, url, description) => `- [${label.replace(/[\[\]\r\n]/g, '')}](${ORIGIN}${url}): ${description.replace(/[\r\n]+/g, ' ')}`;
  const techPosts = posts.filter(p => p.category === 'technology');
  const financePosts = posts.filter(p => p.category === 'finance');
  const cfaPosts = posts.filter(p => p.category === 'cfa');
  const productPosts = posts.filter(p => p.category === 'product');
  const autoPosts = posts.filter(p => p.category === 'auto');

  return `# Aniket Thakur — Complete Knowledge Index (llms-full.txt)

> Comprehensive reference guide, project index, technical taxonomy, and full publication directory for Aniket Thakur.
> Canonical Domain: ${ORIGIN}
> Author: Aniket Thakur (AI Engineer, Associate Product Manager, AI Researcher)

## Executive Summary & Entity Overview
Aniket Thakur is an AI Engineer, Researcher, and Associate Product Manager specializing in Production LLM Systems, Agentic AI, Graph Neural Networks, Data Engineering, and Quantitative Finance.
Professional associations include Drivio Technologies (APM) and research affiliations with the Okinawa Institute of Science and Technology Graduate University (OIST). Education includes Delhi Skill and Entrepreneurship University (DSEU) and WorldQuant University.

## Core Knowledge Domains & Pillar Hubs

### 1. AI Engineering & LLM Systems
- Canonical Hub: ${ORIGIN}/topics/ai-engineering/
- Focus: Production LLM deployment, evaluation harnesses, structured tool use, RAG architectures, local inference, and prompt engineering.
- Key Case Studies: Prompt-Based BI Engine, SEO Agent Laya.

### 2. Agentic AI & Reliability
- Canonical Hub: ${ORIGIN}/topics/agentic-ai/
- Focus: Autonomous multi-agent coordination, deterministic safeguards, state machine orchestration, verification loops, and self-correcting agents.

### 3. Data Engineering & Systems
- Canonical Hub: ${ORIGIN}/topics/data-engineering/
- Focus: High-traffic database tuning, lakehouse architectures, pipeline idempotency, Redis caching strategies, and telemetry pipelines.

### 4. Fintech Product Management
- Canonical Hub: ${ORIGIN}/topics/fintech-product/
- Focus: Loan origination systems, credit underwriting flows, growth experimentation, funnel optimization, and compliance architecture.

### 5. Quantitative Finance & Financial Engineering
- Canonical Hub: ${ORIGIN}/topics/quantitative-finance/
- Focus: Time series analysis, Black-Scholes pricing models, value-at-risk, portfolio risk parity, and factor models.

### 6. AI Research & Graph Neural Networks
- Canonical Hub: ${ORIGIN}/topics/ai-research/
- Focus: Topological deep learning, graph classification, dynamic graph representation, and OIST research collaborations.

## Flagship Systems & Projects
- **FundFlow Sentinel**: ${ORIGIN}/projects/fundflow-sentinel/
  Real-time transactional fraud monitoring using graph algorithms and stream processing.
- **ClassEvidence AI**: ${ORIGIN}/projects/classevidence-ai/
  Multimodal evidentiary retrieval system combining dense vector search and sparse lexical ranking.
- **Finance Tools Engine**: ${ORIGIN}/projects/finance-tools/
  Precision client-side and server-side calculators for loan amortization, compounding interest, and investment yields.
- **Signal Desk**: ${ORIGIN}/projects/signal-desk/
  Event-driven market scanning framework with sub-second signal alerting.
- **FastCharger Network**: ${ORIGIN}/projects/fastcharger/
  Geospatial EV charging station routing and real-time station availability tracker.
- **Prompt-Based BI Engine**: ${ORIGIN}/projects/prompt-bi/
  Conversational business intelligence generating SQL queries and interactive charting.
- **SEO Agent Laya**: ${ORIGIN}/projects/seojev-laya/
  Automated site-wide crawling, sitemap generation, structured schema validation, and broken link remediation.

## Technology & Engineering Articles (${techPosts.length} Publications)
${techPosts.map(p => link(p.title, p.url, `${p.description} (${p.datePublished})`)).join('\n')}

## Finance & Quantitative Analysis Articles (${financePosts.length} Publications)
${financePosts.map(p => link(p.title, p.url, `${p.description} (${p.datePublished})`)).join('\n')}

## CFA Program & Examination Articles (${cfaPosts.length} Publications)
${cfaPosts.map(p => link(p.title, p.url, `${p.description} (${p.datePublished})`)).join('\n')}

## Product & Strategy Articles (${productPosts.length} Publications)
${productPosts.map(p => link(p.title, p.url, `${p.description} (${p.datePublished})`)).join('\n')}

## Automotive & Mobility Articles (${autoPosts.length} Publications)
${autoPosts.map(p => link(p.title, p.url, `${p.description} (${p.datePublished})`)).join('\n')}
`;
}

function sitemap(posts, root = ROOT) {
  const { generateAllSitemaps, writeSitemapsToDirectory } = require('../seo/sitemap-builder');
  const result = generateAllSitemaps({ posts, origin: ORIGIN });
  writeSitemapsToDirectory(root, result.files);
  return result.files.get('sitemap.xml');
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
    assert(/^blog\/(?:[a-z0-9-]+\/)*(?:index\.html|search(?:-text)?\.json|feed\.xml)$/.test(relative), 'Invalid generated manifest path.');
    const file = path.join(root, relative);
    if (!files.has(relative) && fs.existsSync(file)) assert(hash(fs.readFileSync(file)) === digest, `Stale generated file was manually edited; preserve or move it before rebuilding: ${relative}`);
  }
  for (const [relative, content] of files) write(path.join(root, relative), content);
  for (const relative of Object.keys(old)) if (!files.has(relative) && fs.existsSync(path.join(root, relative))) fs.unlinkSync(path.join(root, relative));
  write(manifest, JSON.stringify(Object.fromEntries([...files].map(([f, content]) => [f, hash(content)])), null, 2) + '\n');
  for (const dir of ['', 'learnings', 'projects', 'research', 'topics', 'author']) {
    const folder = path.join(root, dir);
    if (!fs.existsSync(folder)) continue;
    const entries = dir === ''
      ? fs.readdirSync(folder).filter(f => f.endsWith('.html')).map(f => path.join(folder, f))
      : walk(folder).filter(f => f.endsWith('.html'));
    for (const file of entries) {
      if (/^google.*\.html$/.test(path.basename(file))) continue;
      let html = enhancePortfolio(fs.readFileSync(file, 'utf8'), root);
      if (!dir && path.basename(file) === 'index.html') {
        const nonAuto = posts.filter(p => p.category !== 'auto');
        const homePosts = nonAuto.length > 0 ? nonAuto : posts;
        html = updateHome(html, homePosts);
      }
      write(file, html);
    }
  }
  write(path.join(root, 'sitemap.xml'), sitemap(posts, root));
  write(path.join(root, 'llms.txt'), llms(posts));
  write(path.join(root, 'llms-full.txt'), llmsFull(posts));
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
    if (name.endsWith('.html') || (name.startsWith('sitemap') && name.endsWith('.xml')) || ['robots.txt', 'llms.txt', 'llms-full.txt', '.nojekyll', 'CNAME'].includes(name)) fs.copyFileSync(path.join(root, name), path.join(dest, name));
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
    // Preview sitemap and llms.txt retain published URLs only.
    write(path.join(dest, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  }
  console.log(`${preview ? 'Local preview' : 'Deployable site'}: ${dest}`);
  return dest;
}
if (require.main === module) { try { buildSite({ preview: process.argv.includes('--preview') }); } catch (e) { console.error(e.message); process.exitCode = 1; } }
module.exports = { buildBlog, buildSite, outputs, sitemap, walk };
