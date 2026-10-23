const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const cheerio = require('cheerio');

const { ROOT, ORIGIN } = require('./content');
const { buildSite } = require('./build');
const { checkSite } = require('./check');
const {
  computeContentHash,
  qualifyUrls,
  buildMediumContent,
  buildMediumPayload,
  validateMediumToken,
  publishStory,
  loadSyncState,
  saveSyncState,
  discoverArticles,
  generateDryRunReport,
  generateImportQueueMarkdown,
  syncArticles,
  markArticleImported
} = require('./medium-sync');

function createFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'medium-sync-test-'));

  // Copy necessary base files
  for (const name of [...fs.readdirSync(ROOT).filter(f => f.endsWith('.html')), 'sitemap.xml', 'robots.txt', '.nojekyll']) {
    if (fs.existsSync(path.join(ROOT, name))) {
      fs.copyFileSync(path.join(ROOT, name), path.join(root, name));
    }
  }
  for (const dir of ['learnings', 'projects', 'research', 'topics', 'author', 'assets', 'data']) {
    fs.cpSync(path.join(ROOT, dir), path.join(root, dir), { recursive: true });
  }

  // Ensure isolated state without parent medium-sync files
  fs.rmSync(path.join(root, 'data/medium-sync.json'), { force: true });
  fs.rmSync(path.join(root, 'docs/medium-import-queue.md'), { force: true });

  // Isolate blog directory with synthetic articles
  fs.rmSync(path.join(root, 'data/blog'), { recursive: true, force: true });
  for (const cat of ['technology', 'product', 'auto', 'finance']) {
    fs.mkdirSync(path.join(root, 'data/blog', cat), { recursive: true });
  }

  // Synthetic cover image
  const imageDir = path.join(root, 'assets/images/blog/test-article');
  fs.mkdirSync(imageDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'examples/cover.svg'), path.join(imageDir, 'cover.svg'));

  const makeArticle = ({
    slug = 'test-article-1',
    category = 'technology',
    draft = false,
    title = 'Synthetic Article Title',
    body = '## Section One\n\nThis is paragraph content.\n\n> [!NOTE]\n> Note text.\n\n| Col 1 | Col 2 |\n| :--- | :--- |\n| Val 1 | Val 2 |\n\n```js\nconsole.log(123);\n```',
    quickAnswer = null,
    sources = null
  }) => {
    const lines = [
      '---',
      `title: "${title}"`,
      `slug: "${slug}"`,
      `description: "Synthetic test description"`,
      `category: "${category}"`,
      `author: "Aniket Thakur"`,
      `datePublished: "2026-01-01"`,
      `dateModified: "2026-01-01"`,
      `coverImage: "/assets/images/blog/test-article/cover.svg"`,
      `coverImageAlt: "Synthetic Alt"`,
      `imageCaption: "Synthetic Caption"`,
      `draft: ${draft}`,
      `tags:`,
      `  - Tech`,
      `  - Guide`,
      `  - Software`,
      `  - Node`,
      `  - Web`,
      `  - ExtraTag` // 6 tags to test 5-tag slicing
    ];
    if (sources) {
      lines.push('sources:');
      for (const s of sources) {
        lines.push(`  - title: "${s.title}"`, `    url: "${s.url}"`);
      }
    }
    if (quickAnswer) {
      lines.push('quickAnswer:');
      lines.push(`  question: "${quickAnswer.question}"`);
      lines.push(`  answer: "${quickAnswer.answer}"`);
      lines.push('  facts:');
      lines.push('    - label: "Metric"');
      lines.push('      value: "100%"');
      lines.push('  goodFor:');
      lines.push('    - "Speed"');
      lines.push('  watchFor:');
      lines.push('    - "Edge cases"');
    }
    lines.push('---', '', body);
    return lines.join('\n');
  };

  const setupApprovedArticle = (slug, opts = {}) => {
    const artContent = makeArticle({ slug, ...opts });
    const category = opts.category || 'technology';
    fs.writeFileSync(path.join(root, `data/blog/${category}/${slug}.md`), artContent);

    // Register in editorial & date audit
    const url = `/blog/${category}/${slug}/`;
    const edFile = path.join(root, 'data/blog-editorial.json');
    const ed = fs.existsSync(edFile) ? JSON.parse(fs.readFileSync(edFile, 'utf8')) : { version: 1, entries: {} };
    ed.entries[url] = { status: 'approved', reviewer: 'Aniket Thakur', reviewedOn: '2026-01-01' };
    fs.writeFileSync(edFile, JSON.stringify(ed, null, 2));

    const daFile = path.join(root, 'data/blog-date-audit.json');
    const da = fs.existsSync(daFile) ? JSON.parse(fs.readFileSync(daFile, 'utf8')) : { version: 1, calendar: 'UTC', entries: [] };
    const existingIndex = da.entries.findIndex(e => e.url === url);
    const entry = {
      source: `data/blog/${category}/${slug}.md`,
      url,
      datePublished: '2026-01-01',
      dateModified: null,
      status: 'verified',
      confidence: 'synthetic-test',
      evidence: { kind: 'synthetic-fixture' }
    };
    if (existingIndex >= 0) da.entries[existingIndex] = entry;
    else da.entries.push(entry);
    fs.writeFileSync(daFile, JSON.stringify(da, null, 2));
  };

  return {
    root,
    makeArticle,
    setupApprovedArticle,
    clean: () => fs.rmSync(root, { recursive: true, force: true })
  };
}

test('Article discovery, metadata extraction, draft exclusion, and validation', () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('article-published', {
      title: 'Published Post',
      quickAnswer: { question: 'What is it?', answer: 'It is a test.' },
      sources: [{ title: 'Source 1', url: 'https://example.com/1' }]
    });

    // Write a draft article (draft: true)
    fs.writeFileSync(
      path.join(f.root, 'data/blog/technology/draft-article.md'),
      f.makeArticle({ slug: 'draft-article', draft: true, title: 'Draft Post' })
    );

    const discovered = discoverArticles(f.root);
    assert.equal(discovered.length, 1);
    assert.equal(discovered[0].slug, 'article-published');
    assert.equal(discovered[0].title, 'Published Post');
    assert.equal(discovered[0].canonicalUrl, `${ORIGIN}/blog/technology/article-published/`);
    assert.ok(discovered[0].contentHash.length === 64);
    assert.equal(discovered[0].quickAnswer.question, 'What is it?');
    assert.equal(discovered[0].sources.length, 1);
  } finally {
    f.clean();
  }
});

test('Medium HTML formatting preserves headings, images, callouts, tables, code, and canonical footer', () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('formatted-story', {
      title: 'Formatting Test Story',
      quickAnswer: { question: 'Is formatting intact?', answer: 'Yes, completely.' },
      sources: [{ title: 'Reference Docs', url: 'https://example.com/docs' }]
    });

    const articles = discoverArticles(f.root);
    const payload = buildMediumPayload(articles[0].post);

    assert.equal(payload.title, 'Formatting Test Story');
    assert.equal(payload.canonicalUrl, `${ORIGIN}/blog/technology/formatted-story/`);
    assert.equal(payload.contentFormat, 'html');
    assert.equal(payload.publishStatus, 'public');
    // Tags sliced to at most 5
    assert.equal(payload.tags.length, 5);

    const $ = cheerio.load(`<div>${payload.content}</div>`);
    assert.equal($('h1').text(), 'Formatting Test Story');
    assert.equal($('figure img').attr('src'), `${ORIGIN}/assets/images/blog/test-article/cover.svg`);
    assert.equal($('figure figcaption').text(), 'Synthetic Caption');
    assert.ok($('blockquote.quick-answer').length);
    assert.equal($('h2').first().text(), 'Section One');
    assert.ok($('table').length);
    assert.ok($('pre').length);
    assert.ok($('.article-sources').length);
    assert.ok($(`a[href="${ORIGIN}/blog/technology/formatted-story/"]`).length);
  } finally {
    f.clean();
  }
});

test('Relative URLs in body are converted to absolute URLs pointing to ORIGIN', () => {
  const rawHtml = '<p>Check <a href="/about.html">About</a> and <img src="/assets/img/pic.png"></p>';
  const qualified = qualifyUrls(rawHtml);
  assert.equal(
    qualified,
    `<p>Check <a href="${ORIGIN}/about.html">About</a> and <img src="${ORIGIN}/assets/img/pic.png"></p>`
  );
});

test('Token validation against Medium API (Success, Unauthorized, Network failure)', async () => {
  // 1. Success mock
  const successFetch = async (url, opts) => {
    assert.equal(url, 'https://api.medium.com/v1/me');
    assert.equal(opts.headers.Authorization, 'Bearer valid-test-token');
    return {
      status: 200,
      json: async () => ({
        data: {
          id: 'user_12345',
          username: 'testuser',
          name: 'Test Author',
          url: 'https://medium.com/@testuser'
        }
      })
    };
  };

  const validRes = await validateMediumToken('valid-test-token', { fetchFn: successFetch });
  assert.equal(validRes.valid, true);
  assert.equal(validRes.user.id, 'user_12345');
  assert.equal(validRes.user.username, 'testuser');

  // 2. Unauthorized mock (401)
  const unauthFetch = async () => ({ status: 401, json: async () => ({ errors: [{ message: 'Unauthorized' }] }) });
  const unauthRes = await validateMediumToken('bad-token', { fetchFn: unauthFetch });
  assert.equal(unauthRes.valid, false);
  assert.equal(unauthRes.reason, 'unauthorized');
  assert.ok(!unauthRes.error.includes('bad-token')); // Token must not be leaked in error message!

  // 3. Missing token
  const emptyRes = await validateMediumToken('');
  assert.equal(emptyRes.valid, false);
  assert.equal(emptyRes.reason, 'missing_token');

  // 4. Network error mock
  const failFetch = async () => { throw new Error('DNS failure'); };
  const failRes = await validateMediumToken('valid-token', { fetchFn: failFetch });
  assert.equal(failRes.valid, false);
  assert.equal(failRes.reason, 'network_error');
});

test('Publish story via API with 201 Created and canonical URL preservation', async () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('api-publish-test');
    const articles = discoverArticles(f.root);

    let receivedPayload = null;
    const mockFetch = async (url, opts) => {
      if (url.endsWith('/me')) {
        return {
          status: 200,
          json: async () => ({ data: { id: 'auth_777', username: 'author' } })
        };
      }
      if (url.includes('/users/auth_777/posts')) {
        receivedPayload = JSON.parse(opts.body);
        return {
          status: 201,
          json: async () => ({
            data: {
              id: 'med_story_999',
              title: receivedPayload.title,
              url: 'https://medium.com/@author/test-story-med_story_999',
              canonicalUrl: receivedPayload.canonicalUrl,
              publishStatus: 'public',
              publishedAt: 1700000000000
            }
          })
        };
      }
      throw new Error(`Unexpected URL: ${url}`);
    };

    const res = await publishStory(articles[0].post, {
      token: 'test-token',
      authorId: 'auth_777',
      fetchFn: mockFetch
    });

    assert.equal(res.ok, true);
    assert.equal(res.story.id, 'med_story_999');
    assert.equal(res.story.url, 'https://medium.com/@author/test-story-med_story_999');
    assert.equal(res.story.canonicalUrl, `${ORIGIN}/blog/technology/api-publish-test/`);
    assert.equal(receivedPayload.canonicalUrl, `${ORIGIN}/blog/technology/api-publish-test/`);
  } finally {
    f.clean();
  }
});

test('API publishing handles Rate Limiting (429) and Server Errors gracefully', async () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('rate-limit-test');
    const articles = discoverArticles(f.root);

    // 429 mock
    const rateLimitFetch = async () => ({ status: 429, json: async () => ({ errors: [{ message: 'Rate limited' }] }) });
    const rlRes = await publishStory(articles[0].post, {
      token: 'tok',
      authorId: 'user1',
      fetchFn: rateLimitFetch
    });
    assert.equal(rlRes.ok, false);
    assert.equal(rlRes.rateLimited, true);

    // 500 mock
    const serverErrFetch = async () => ({ status: 500, json: async () => ({ errors: [{ message: 'Internal error' }] }) });
    const errRes = await publishStory(articles[0].post, {
      token: 'tok',
      authorId: 'user1',
      fetchFn: serverErrFetch
    });
    assert.equal(errRes.ok, false);
    assert.ok(errRes.error.includes('HTTP 500'));
  } finally {
    f.clean();
  }
});

test('Duplicate prevention: Identical content is skipped; Modified content flags review instead of duplicating', async () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('duplicate-check-article');

    // 1. First sync in queue mode
    const out1 = await syncArticles(f.root, {
      token: null,
      skipUrlCheck: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });
    assert.equal(out1.results.queued, 1);

    // Simulate article publication
    markArticleImported(f.root, 'duplicate-check-article', 'https://medium.com/@user/duplicate-check-article-123');

    // 2. Second sync: unchanged content must be skipped (idempotent, 0 new publications/queues)
    const out2 = await syncArticles(f.root, {
      token: null,
      skipUrlCheck: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });
    assert.equal(out2.results.skipped, 1);
    assert.equal(out2.results.published, 0);
    assert.equal(out2.results.queued, 0);

    // 3. Edit source article content
    fs.writeFileSync(
      path.join(f.root, 'data/blog/technology/duplicate-check-article.md'),
      f.makeArticle({ slug: 'duplicate-check-article', body: '## Updated Heading\n\nContent was edited.' })
    );

    // 4. Third sync: Modified article must NOT be duplicated or re-published! Must be flagged for review.
    const out3 = await syncArticles(f.root, {
      token: null,
      skipUrlCheck: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });
    assert.equal(out3.results.modified, 1);
    assert.equal(out3.state.articles['technology/duplicate-check-article'].status, 'modified_requires_review');
    assert.equal(out3.state.articles['technology/duplicate-check-article'].mediumUrl, 'https://medium.com/@user/duplicate-check-article-123');
  } finally {
    f.clean();
  }
});

test('Dry run report accurately reflects discovered, eligible, queued, and risk stats without modifying state', () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('art-1');
    f.setupApprovedArticle('art-2');

    const report = generateDryRunReport(f.root);
    assert.equal(report.discovered, 2);
    assert.equal(report.eligible, 2);
    assert.equal(report.alreadySynchronised, 0);
    assert.equal(report.readyForPublication, 2);
    assert.equal(report.requireManualImport, 2);
    assert.equal(report.missingOrInvalidMetadata, 0);
    assert.equal(report.unresolvedCanonicalOrDuplicateRisks, 0);

    // State file must not exist yet because dry run does not mutate
    assert.equal(fs.existsSync(path.join(f.root, 'data/medium-sync.json')), false);
  } finally {
    f.clean();
  }
});

test('Batch limit and single-slug targeting', async () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('post-alpha');
    f.setupApprovedArticle('post-beta');
    f.setupApprovedArticle('post-gamma');

    // Limit to 1
    const resLimit = await syncArticles(f.root, {
      token: null,
      limit: 1,
      skipUrlCheck: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });
    assert.equal(resLimit.results.processed, 1);

    // Target single slug
    const resSlug = await syncArticles(f.root, {
      token: null,
      slug: 'post-beta',
      skipUrlCheck: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });
    assert.equal(resSlug.results.processed, 1);
    assert.equal(resSlug.results.items[0].slug, 'post-beta');
  } finally {
    f.clean();
  }
});

test('Partial failure: First article succeeds, second fails; state records both accurately', async () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('article-succeeds');
    f.setupApprovedArticle('article-fails');

    let callCount = 0;
    const partialMockFetch = async (url, opts) => {
      if (url.endsWith('/me')) {
        return {
          status: 200,
          json: async () => ({ data: { id: 'auth_partial', username: 'author' } })
        };
      }
      if (url.includes('/users/auth_partial/posts')) {
        callCount++;
        if (callCount === 1) {
          return {
            status: 201,
            json: async () => ({
              data: {
                id: 'story_1',
                title: 'First Article',
                url: 'https://medium.com/@author/story-1',
                canonicalUrl: `${ORIGIN}/blog/technology/article-succeeds/`,
                publishStatus: 'public',
                publishedAt: Date.now()
              }
            })
          };
        }
        return {
          status: 500,
          json: async () => ({ errors: [{ message: 'Database temporarily unavailable' }] })
        };
      }
      throw new Error(`Unexpected url: ${url}`);
    };

    const outcome = await syncArticles(f.root, {
      token: 'fake-token',
      fetchFn: partialMockFetch,
      skipUrlCheck: true,
      limit: 2,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });

    assert.equal(outcome.results.published, 1);
    assert.equal(outcome.results.failed, 1);

    const savedState = loadSyncState(f.root);
    const successItem = Object.values(savedState.articles).find(a => a.status === 'published');
    const failedItem = Object.values(savedState.articles).find(a => a.status === 'failed');

    assert.ok(successItem);
    assert.equal(successItem.mediumStoryId, 'story_1');
    assert.equal(successItem.mediumUrl, 'https://medium.com/@author/story-1');

    assert.ok(failedItem);
    assert.equal(failedItem.retryCount, 1);
    assert.ok(failedItem.error.includes('HTTP 500'));
  } finally {
    f.clean();
  }
});

test('Mark article manually imported updates state and markdown queue document', () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('imported-manually');

    // Run sync in queue mode
    syncArticles(f.root, {
      token: null,
      skipUrlCheck: true,
      logger: { log: () => {}, warn: () => {}, error: () => {} }
    });

    const item = markArticleImported(
      f.root,
      'imported-manually',
      'https://medium.com/@kumaraniketn/imported-manually-abc123',
      { storyId: 'story_abc123' }
    );

    assert.equal(item.status, 'published');
    assert.equal(item.mediumUrl, 'https://medium.com/@kumaraniketn/imported-manually-abc123');
    assert.equal(item.mediumStoryId, 'story_abc123');

    const state = loadSyncState(f.root);
    assert.equal(state.stats.published, 1);
    assert.equal(state.stats.queued, 0);

    const mdQueue = fs.readFileSync(path.join(f.root, 'docs/medium-import-queue.md'), 'utf8');
    assert.ok(mdQueue.includes('https://medium.com/@kumaraniketn/imported-manually-abc123'));
  } finally {
    f.clean();
  }
});

test('Public build output completely excludes private synchronisation state and scripts', () => {
  const f = createFixture();
  try {
    f.setupApprovedArticle('public-isolation-check');

    // Generate synchronisation state and queue in fixture
    saveSyncState(f.root, { version: 1, articles: {} });
    fs.mkdirSync(path.join(f.root, 'scripts'), { recursive: true });
    fs.writeFileSync(path.join(f.root, 'scripts/sync-medium.mjs'), '// CLI\n');
    fs.writeFileSync(path.join(f.root, '.env'), 'MEDIUM_INTEGRATION_TOKEN=secret\n');

    // Build deployable site
    const siteDir = buildSite({ root: f.root });

    // Validate using site checker
    const checkRes = checkSite(siteDir, f.root);
    assert.ok(checkRes.articles >= 1);

    // Explicitly verify sensitive files are NOT in _site
    assert.equal(fs.existsSync(path.join(siteDir, 'data/medium-sync.json')), false);
    assert.equal(fs.existsSync(path.join(siteDir, 'docs/medium-import-queue.md')), false);
    assert.equal(fs.existsSync(path.join(siteDir, 'scripts')), false);
    assert.equal(fs.existsSync(path.join(siteDir, '.env')), false);
  } finally {
    f.clean();
  }
});

test('Three representative real articles (Auto, Tech, Finance) format faithfully with diverse structures', () => {
  const articles = discoverArticles(ROOT);

  // 1. Auto representative: tata-aeris-review (quickAnswer, vehicle review, callouts)
  const autoArt = articles.find(a => a.slug === 'tata-aeris-review');
  assert.ok(autoArt, 'Tata Aeris review must exist');
  const autoPayload = buildMediumPayload(autoArt.post);
  assert.equal(autoPayload.canonicalUrl, 'https://07anishu12.github.io/blog/auto/tata-aeris-review/');
  assert.ok(autoPayload.content.includes('<blockquote class="quick-answer">'), 'Quick answer summary must be rendered');
  assert.ok(autoPayload.content.includes('<figure><img src="https://07anishu12.github.io/assets/images/blog/'), 'Cover image must use absolute URL');
  assert.ok(autoPayload.tags.length <= 5, 'Tags must not exceed 5');

  // 2. Technology representative: browser-use-guide-how-ai-agents-operate-websites (code blocks)
  const techArt = articles.find(a => a.slug === 'browser-use-guide-how-ai-agents-operate-websites');
  assert.ok(techArt, 'Browser Use guide must exist');
  const techPayload = buildMediumPayload(techArt.post);
  assert.equal(techPayload.canonicalUrl, 'https://07anishu12.github.io/blog/technology/browser-use-guide-how-ai-agents-operate-websites/');
  assert.ok(techPayload.content.includes('<pre'), 'Code blocks must be preserved in <pre> tags');
  assert.ok(techPayload.content.includes('Originally published at'), 'Attribution footer must be present');

  // 3. Finance representative: asset-allocation-equity-debt-gold-and-cash (financial calculations, formulas, disclosures)
  const finArt = articles.find(a => a.slug === 'asset-allocation-equity-debt-gold-and-cash');
  assert.ok(finArt, 'Asset allocation guide must exist');
  const finPayload = buildMediumPayload(finArt.post);
  assert.equal(finPayload.canonicalUrl, 'https://07anishu12.github.io/blog/finance/asset-allocation-equity-debt-gold-and-cash/');
  assert.ok(finPayload.content.includes('<code>'), 'Calculations and formulas must be preserved in <code> tags');
  assert.ok(finPayload.content.includes('Originally published at'), 'Attribution footer must be present');
});

test('Migration Dashboard Server API endpoints respond with correct status and inventory data', async () => {
  const { createServer } = require('../migration/server');
  const server = createServer(ROOT);

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1. GET /
    const uiRes = await fetch(`${baseUrl}/`);
    assert.equal(uiRes.status, 200);
    const html = await uiRes.text();
    assert.ok(html.includes('Medium Migration Studio'));

    // 2. GET /api/inventory
    const invRes = await fetch(`${baseUrl}/api/inventory`);
    assert.equal(invRes.status, 200);
    const invData = await invRes.json();
    assert.ok(invData.total >= 151);
    assert.ok(invData.byCategory.technology >= 50);

    // 3. GET /api/stats
    const statsRes = await fetch(`${baseUrl}/api/stats`);
    assert.equal(statsRes.status, 200);
    const statsData = await statsRes.json();
    assert.ok(statsData.discovered >= 151);

    // 4. GET /api/next-pending
    const nextRes = await fetch(`${baseUrl}/api/next-pending`);
    assert.equal(nextRes.status, 200);
    const nextData = await nextRes.json();
    assert.ok(nextData.item !== undefined);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
