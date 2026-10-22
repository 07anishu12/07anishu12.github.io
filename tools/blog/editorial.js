const fs = require('node:fs');
const path = require('node:path');

const EDITORIAL_FILE = 'data/blog-editorial.json';
const DATE_AUDIT_FILE = 'data/blog-date-audit.json';

function readJson(root, relative, fallback) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function readEditorial(root) {
  const data = readJson(root, EDITORIAL_FILE, { version: 1, entries: {} });
  if (!data || data.version !== 1 || !data.entries || typeof data.entries !== 'object') {
    throw new Error(`${EDITORIAL_FILE} must contain version 1 and an entries object.`);
  }
  return data;
}

function readDateAudit(root) {
  const data = readJson(root, DATE_AUDIT_FILE, { version: 1, entries: [] });
  if (!data || data.version !== 1 || !Array.isArray(data.entries)) {
    throw new Error(`${DATE_AUDIT_FILE} must contain version 1 and an entries array.`);
  }
  return data;
}

function assertApproved(root, post) {
  const editorial = readEditorial(root).entries[post.url];
  if (!editorial || editorial.status !== 'approved' || !editorial.reviewer || !editorial.reviewedOn) {
    throw new Error(`${post.url}: draft:false requires an approved editorial record with reviewer and reviewedOn.`);
  }
  const audit = readDateAudit(root).entries.find(entry => entry.url === post.url);
  if (!audit || !['verified', 'owner-confirmed'].includes(audit.status) || !audit.evidence) {
    throw new Error(`${post.url}: published articles require a verified or owner-confirmed date-audit entry with evidence.`);
  }
}

module.exports = { EDITORIAL_FILE, DATE_AUDIT_FILE, readEditorial, readDateAudit, assertApproved };
