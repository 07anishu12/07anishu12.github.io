#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '../../');
const DATA_FILE = path.join(ROOT_DIR, 'data/learnings.json');
const ADMIN_PUBLIC_DIR = path.join(__dirname, 'public');
const BUILD_SCRIPT = path.join(__dirname, 'build.js');
const UPLOAD_DIR_A = path.join(ROOT_DIR, 'assets/images/learnings');
const UPLOAD_DIR_B = path.join(ROOT_DIR, 'assets/img/learnings');

// Ensure upload directories exist
[UPLOAD_DIR_A, UPLOAD_DIR_B].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
  };
  return map[ext] || 'application/octet-stream';
}

function readArticles() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading articles JSON:', err);
    return [];
  }
}

function writeArticles(articles) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8');
  try {
    execSync(`node "${BUILD_SCRIPT}"`, { stdio: 'inherit', cwd: ROOT_DIR });
  } catch (err) {
    console.error('Error executing build.js:', err.message);
  }
}

function calculateReadingTime(text) {
  if (!text) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Set CORS headers for local studio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API: GET /api/articles ---
  if (req.method === 'GET' && pathname === '/api/articles') {
    const articles = readArticles();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(articles));
    return;
  }

  // --- API: GET /api/articles/:slug ---
  if (req.method === 'GET' && pathname.startsWith('/api/articles/')) {
    const slug = pathname.replace('/api/articles/', '');
    const articles = readArticles();
    const found = articles.find(a => (a.slug === slug || a.id === slug));
    if (!found) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Article not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(found));
    return;
  }

  // --- API: POST /api/articles (Create or Update) ---
  if (req.method === 'POST' && pathname === '/api/articles') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.title || !payload.title.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Title is required' }));
          return;
        }

        const slug = slugify(payload.slug || payload.title);
        const articles = readArticles();
        const existingIdx = articles.findIndex(a => a.id === slug || a.slug === slug || (payload.id && a.id === payload.id));

        const now = new Date().toISOString().slice(0, 10);
        const article = {
          id: slug,
          slug: slug,
          title: payload.title.trim(),
          contentType: payload.contentType || 'Note',
          category: payload.category || 'General',
          shortDescription: payload.shortDescription || '',
          body: payload.body || '',
          heroImage: payload.heroImage || '',
          imageAlt: payload.imageAlt || '',
          thumbnailImage: payload.thumbnailImage || payload.heroImage || '',
          author: payload.author || 'Aniket Thakur',
          publishedDate: payload.publishedDate || (existingIdx >= 0 ? articles[existingIdx].publishedDate : now),
          updatedDate: now,
          readingTime: calculateReadingTime(payload.body),
          tags: Array.isArray(payload.tags) ? payload.tags : (payload.tags ? payload.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
          featured: Boolean(payload.featured),
          status: payload.status || 'published',
          source: payload.source || 'Personal',
          sourceUrl: payload.sourceUrl || '',
          canonicalUrl: `https://07anishu12.github.io/learnings/${slug}.html`,
          seoTitle: payload.seoTitle || `${payload.title.trim()} — Aniket Thakur`,
          seoDescription: payload.seoDescription || payload.shortDescription || '',
          ogImage: payload.heroImage || 'assets/img/aniket-portrait.png',
          relatedArticles: Array.isArray(payload.relatedArticles) ? payload.relatedArticles : []
        };

        if (article.featured) {
          // Unset featured on others
          articles.forEach(a => { if (a.id !== article.id && a.slug !== article.slug) a.featured = false; });
        }

        if (existingIdx >= 0) {
          articles[existingIdx] = article;
        } else {
          articles.unshift(article);
        }

        writeArticles(articles);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, article }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // --- API: DELETE /api/articles/:slug (Archive or Delete) ---
  if (req.method === 'DELETE' && pathname.startsWith('/api/articles/')) {
    const slug = pathname.replace('/api/articles/', '');
    const articles = readArticles();
    const idx = articles.findIndex(a => a.id === slug || a.slug === slug);
    if (idx === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Article not found' }));
      return;
    }

    // Set to archived rather than permanently deleting
    articles[idx].status = 'archived';
    articles[idx].featured = false;
    writeArticles(articles);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Article marked as archived' }));
    return;
  }

  // --- API: POST /api/upload (Base64 or raw image upload) ---
  if (req.method === 'POST' && pathname === '/api/upload') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.data || !payload.filename) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'data (base64) and filename are required' }));
          return;
        }

        const safeExt = path.extname(payload.filename).toLowerCase();
        const baseName = slugify(path.basename(payload.filename, safeExt));
        const finalName = `${Date.now()}-${baseName}${safeExt}`;
        const buffer = Buffer.from(payload.data.replace(/^data:image\/\w+;base64,/, ''), 'base64');

        fs.writeFileSync(path.join(UPLOAD_DIR_A, finalName), buffer);
        fs.writeFileSync(path.join(UPLOAD_DIR_B, finalName), buffer);

        const relPath = `assets/images/learnings/${finalName}`;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, path: relPath }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // --- API: POST /api/build (Trigger static regeneration) ---
  if (req.method === 'POST' && pathname === '/api/build') {
    try {
      execSync(`node "${BUILD_SCRIPT}"`, { stdio: 'inherit', cwd: ROOT_DIR });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Static content generated successfully.' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // --- Serve Static Admin UI ---
  let filePath;
  if (pathname === '/admin' || pathname === '/admin/') {
    filePath = path.join(ADMIN_PUBLIC_DIR, 'index.html');
  } else if (pathname.startsWith('/admin/')) {
    filePath = path.join(ADMIN_PUBLIC_DIR, pathname.replace('/admin/', ''));
  } else {
    // Serve repo root static assets (for previews and public previewing)
    filePath = path.join(ROOT_DIR, pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''));
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const mime = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Fallback to 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${pathname}`);
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ANIKET THAKUR · LOCAL PUBLISHING STUDIO`);
  console.log(`  Studio URL: http://localhost:${PORT}/admin/`);
  console.log(`  Public Site: http://localhost:${PORT}/learnings.html`);
  console.log(`======================================================\n`);
});
