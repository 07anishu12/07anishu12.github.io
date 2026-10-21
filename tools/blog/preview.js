const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { buildSite } = require('./build');
const preview = process.argv.includes('--drafts');
const dir = buildSite({ preview });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf' };
const port = Number(process.env.PORT || 4173);
http.createServer((req, res) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    file = path.resolve(dir, '.' + pathname);
    if (file !== dir && !file.startsWith(dir + path.sep)) throw new Error('Invalid path');
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' }); res.end(); return; }
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      file = path.join(dir, '404.html'); res.statusCode = 404;
    }
    res.setHeader('Content-Type', `${types[path.extname(file)] || 'application/octet-stream'}; charset=utf-8`);
    res.setHeader('Cache-Control', 'no-store');
    if (preview) res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(400); res.end('Invalid request'); }
}).listen(port, '127.0.0.1', () => console.log(`${preview ? 'Draft preview' : 'Production preview'}: http://127.0.0.1:${port}/blog/ (Ctrl+C to stop; rerun after edits)`));
