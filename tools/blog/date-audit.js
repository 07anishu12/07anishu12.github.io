const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');
const { ROOT, CATEGORIES, assert } = require('./content');

const AUDIT_FILE = path.join(ROOT, 'data/blog-date-audit.json');
const DOC_FILE = path.join(ROOT, 'docs/seo-date-audit.md');
const BATCH_COMMIT = 'd41e6b9729fcc74ec83c7fae8696cc3f722931ee';
const BATCH_DEPLOYMENT = 39836439891;
const TATA_COMMIT = '9785a14c51fd5ec9fd1f7e3a34fbc8cff9d72e6f';
const TATA_DEPLOYMENT = 39584081663;

function files() {
  return Object.keys(CATEGORIES).flatMap(category => {
    const dir = path.join(ROOT, 'data/blog', category);
    return fs.existsSync(dir)
      ? fs.readdirSync(dir).filter(file => file.endsWith('.md')).sort().map(file => ({ category, file, source: `data/blog/${category}/${file}` }))
      : [];
  });
}

function frontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  assert(match, 'Missing front matter.');
  return YAML.parse(match[1], { uniqueKeys: true, maxAliasCount: 0 });
}

function readExisting() {
  if (!fs.existsSync(AUDIT_FILE)) return new Map();
  const data = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
  return new Map((data.entries || []).map(entry => [entry.source, entry]));
}

function defaultEntry(item, data, existing) {
  if (existing) {
    if (data.draft) return {
      ...existing,
      datePublished: data.datePublished || null,
      dateModified: data.dateModified || null,
      url: `/blog/${item.category}/${data.slug}/`,
      status: 'draft',
      confidence: 'not-publishable',
      evidence: null,
      rationale: 'Draft source; not a public publication date.',
      reviewRequired: false
    };
    return { ...existing, datePublished: data.datePublished || null, dateModified: data.dateModified || null, url: `/blog/${item.category}/${data.slug}/` };
  }
  const isTata = item.source === 'data/blog/auto/tata-aeris-review.md';
  return {
    source: item.source,
    url: `/blog/${item.category}/${data.slug}/`,
    datePublished: data.datePublished || null,
    dateModified: data.dateModified || null,
    status: data.draft ? 'draft' : (isTata ? 'verified' : 'unresolved'),
    confidence: data.draft ? 'not-publishable' : (isTata ? 'high' : 'batch-deployment-only'),
    evidence: isTata ? {
      kind: 'source-commit-and-pages-deployment',
      sourceCommit: TATA_COMMIT,
      deploymentRunId: TATA_DEPLOYMENT,
      note: 'Source history and the successful deployment that first added the article support the current date.'
    } : (data.draft ? null : {
      kind: 'batch-generation-and-deployment-only',
      sourceCommit: BATCH_COMMIT,
      deploymentRunId: BATCH_DEPLOYMENT,
      note: 'The date is retained from the batch source, but an individual first-publication event is not independently verified.'
    }),
    rationale: isTata ? 'Verified against the original publication commit and successful Pages deployment.' : (data.draft ? 'Draft source; not a public publication date.' : 'Retained pending individual historical evidence; do not treat the batch deployment date as first publication.'),
    reviewRequired: !isTata && !data.draft
  };
}

function collect() {
  const existing = readExisting();
  return files().map(item => {
    const data = frontMatter(fs.readFileSync(path.join(ROOT, item.source), 'utf8'));
    return defaultEntry(item, data, existing.get(item.source));
  });
}

function validate(entries) {
  const seen = new Set();
  const today = new Date().toISOString().slice(0, 10);
  for (const entry of entries) {
    assert(!seen.has(entry.source), `Duplicate date audit source: ${entry.source}`);
    seen.add(entry.source);
    assert(typeof entry.url === 'string' && entry.url.startsWith('/blog/'), `${entry.source}: invalid audit URL.`);
    assert(['verified', 'owner-confirmed', 'unresolved', 'draft'].includes(entry.status), `${entry.source}: invalid audit status.`);
    for (const key of ['datePublished', 'dateModified']) {
      const value = entry[key];
      if (!value) continue;
      assert(/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value, `${entry.source}: invalid ${key}.`);
      assert(value <= today, `${entry.source}: future ${key}.`);
    }
    assert(!entry.dateModified || !entry.datePublished || entry.dateModified >= entry.datePublished, `${entry.source}: modification precedes publication.`);
    if (['verified', 'owner-confirmed'].includes(entry.status)) assert(entry.evidence && entry.evidence.kind, `${entry.source}: confirmed dates need evidence.`);
  }
  const expected = new Set(files().map(item => item.source));
  assert(seen.size === expected.size && [...expected].every(source => seen.has(source)), 'Date audit must cover every Blog source exactly once.');
}

function write(entries) {
  validate(entries);
  fs.mkdirSync(path.dirname(AUDIT_FILE), { recursive: true });
  fs.mkdirSync(path.dirname(DOC_FILE), { recursive: true });
  fs.writeFileSync(AUDIT_FILE, JSON.stringify({ version: 1, calendar: 'UTC', entries }, null, 2) + '\n');
  const counts = entries.reduce((acc, entry) => { acc[entry.status] = (acc[entry.status] || 0) + 1; return acc; }, {});
  const rows = entries.map(entry => {
    const evidence = entry.evidence ? `${entry.evidence.kind}${entry.evidence.sourceCommit ? `; commit ${entry.evidence.sourceCommit.slice(0, 7)}` : ''}${entry.evidence.deploymentRunId ? `; Pages run ${entry.evidence.deploymentRunId}` : ''}` : 'No publication evidence; draft or unresolved.';
    return `| \`${entry.url}\` | ${entry.datePublished || '—'} | ${entry.dateModified || '—'} | ${entry.status} | ${entry.confidence} | ${evidence} |`;
  }).join('\n');
  const doc = `# SEO publication date audit\n\nAudit date: **2026-10-23**. Calendar: **UTC**.\n\nThis is an internal editorial control file. It is not copied into the public GitHub Pages artifact. Dates are not changed merely to make the site appear older or newer.\n\n## Summary\n\n- Evidence-backed article dates: **${counts.verified || 0}**.\n- Owner-confirmed publication records: **${counts['owner-confirmed'] || 0}**.\n- Retained but unresolved article dates: **${counts.unresolved || 0}**.\n- Draft article records: **${counts.draft || 0}**.\n- Source records audited: **${entries.length}**.\n\nThe Tata Aeris article is supported by its original publication commit and successful Pages deployment. The other batch-generated records retain their existing source dates and are marked owner-confirmed because the site owner confirmed that they were already published. Their dates are not independently reconstructed from a random range.\n\n## Evidence policy\n\nA Git commit, file creation time, or batch-generation timestamp is not automatically a first-publication date. An owner-confirmed record documents the site owner's publication assertion without claiming independently verified deployment history. Dates must not be randomized or changed merely to make the site appear older or newer.\n\n## Article records\n\n| URL | datePublished | dateModified | Status | Confidence | Evidence |\n|---|---:|---:|---|---|---|\n${rows}\n`;
  fs.writeFileSync(DOC_FILE, doc);
}

function check() {
  assert(fs.existsSync(AUDIT_FILE), `Missing ${path.relative(ROOT, AUDIT_FILE)}; run npm run audit:dates:write.`);
  const data = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
  validate(data.entries || []);
  const bySource = new Map(data.entries.map(entry => [entry.source, entry]));
  for (const item of files()) {
    const current = frontMatter(fs.readFileSync(path.join(ROOT, item.source), 'utf8'));
    const audit = bySource.get(item.source);
    assert(audit.datePublished === (current.datePublished || null) && audit.dateModified === (current.dateModified || null), `${item.source}: audit date does not match front matter.`);
    if (current.draft === false) {
      assert(['verified', 'owner-confirmed'].includes(audit.status), `${item.source}: published source requires verified or owner-confirmed date evidence.`);
    }
  }
  console.log(`Date audit: ${data.entries.length} source records checked; ${data.entries.filter(entry => entry.status === 'verified').length} verified, ${data.entries.filter(entry => entry.status === 'owner-confirmed').length} owner-confirmed, ${data.entries.filter(entry => entry.status === 'unresolved').length} unresolved, ${data.entries.filter(entry => entry.status === 'draft').length} drafts.`);
}

try {
  if (process.argv.includes('--write')) write(collect());
  else check();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

module.exports = { check, collect, validate };
