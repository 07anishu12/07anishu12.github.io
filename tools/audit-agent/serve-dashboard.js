#!/usr/bin/env node

/**
 * Local HTTP Server for Viewing the SEO Audit Dashboard
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DASHBOARD_PATH = path.resolve(__dirname, '../../reports/seo-audit/technical_seo_audit.html');
const PORT = parseInt(process.env.AUDIT_PORT || '4004', 10);

const server = http.createServer((req, res) => {
  if (fs.existsSync(DASHBOARD_PATH)) {
    const html = fs.readFileSync(DASHBOARD_PATH, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Audit report not found yet. Run: npm run audit:agent first.');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Institutional SEO Audit Dashboard serving at http://localhost:${PORT}`);
});
