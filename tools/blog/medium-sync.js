const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ROOT, ORIGIN, readArticles, parseArticle, escape } = require('./content');

const MEDIUM_API_BASE = 'https://api.medium.com/v1';
const DEFAULT_STATE_FILE = 'data/medium-sync.json';
const DEFAULT_QUEUE_DOC = 'docs/medium-import-queue.md';
const MEDIUM_IMPORT_URL = 'https://medium.com/p/import';
const KNOWN_PROFILE = 'https://medium.com/@kumaraniketn';

function computeContentHash(post) {
  const hash = crypto.createHash('sha256');
  hash.update(post.title || '');
  hash.update('\n');
  hash.update(post.description || '');
  hash.update('\n');
  hash.update(post.coverImage || '');
  hash.update('\n');
  hash.update(post.body || '');
  if (post.quickAnswer) {
    hash.update('\n' + JSON.stringify(post.quickAnswer));
  }
  if (post.sources) {
    hash.update('\n' + JSON.stringify(post.sources));
  }
  return hash.digest('hex');
}

function qualifyUrls(html) {
  // Convert root-relative href and src to absolute URLs pointing to ORIGIN
  return html
    .replace(/\bhref="\/(?!\/)([^"]*)"/g, `href="${ORIGIN}/$1"`)
    .replace(/\bsrc="\/(?!\/)([^"]*)"/g, `src="${ORIGIN}/$1"`);
}

function buildMediumContent(post) {
  const canonicalUrl = `${ORIGIN}${post.url}`;
  const parts = [];

  // Title
  parts.push(`<h1>${escape(post.title)}</h1>`);

  // Featured cover image
  if (post.coverImage) {
    const fullImageUrl = `${ORIGIN}${post.coverImage}`;
    const alt = escape(post.coverImageAlt || post.title);
    const caption = escape(post.imageCaption || post.coverImageAlt || '');
    parts.push(
      `<figure><img src="${fullImageUrl}" alt="${alt}" />${
        caption ? `<figcaption>${caption}</figcaption>` : ''
      }</figure>`
    );
  }

  // Quick answer summary if present
  if (post.quickAnswer) {
    const q = post.quickAnswer;
    const answerParts = [
      `<blockquote class="quick-answer">`,
      `<p><strong>Quick Summary: ${escape(q.question)}</strong></p>`,
      `<p>${escape(q.answer)}</p>`
    ];
    if (Array.isArray(q.facts) && q.facts.length > 0) {
      answerParts.push(
        `<ul>${q.facts
          .map(f => `<li><strong>${escape(f.label)}:</strong> ${escape(f.value)}</li>`)
          .join('')}</ul>`
      );
    }
    if (Array.isArray(q.goodFor) && q.goodFor.length > 0) {
      answerParts.push(`<p><strong>Good for:</strong> ${escape(q.goodFor.join('; '))}</p>`);
    }
    if (Array.isArray(q.watchFor) && q.watchFor.length > 0) {
      answerParts.push(`<p><strong>Watch for:</strong> ${escape(q.watchFor.join('; '))}</p>`);
    }
    if (q.note) {
      answerParts.push(`<p><small><em>${escape(q.note)}</em></small></p>`);
    }
    answerParts.push(`</blockquote>`);
    parts.push(answerParts.join('\n'));
  }

  // Main body HTML with qualified URLs
  const bodyHtml = qualifyUrls(post.html || '');
  parts.push(bodyHtml);

  // Sourced references if present and enabled
  if (Array.isArray(post.sources) && post.sources.length > 0 && post.showSources !== false) {
    const sourceItems = post.sources
      .map(
        s =>
          `<li><a href="${escape(s.url)}" rel="noopener noreferrer">${escape(s.title)}</a></li>`
      )
      .join('\n');
    parts.push(
      `<section class="article-sources">\n<h2>Sources &amp; References</h2>\n<ol>\n${sourceItems}\n</ol>\n</section>`
    );
  }

  // Canonical attribution footer
  parts.push(
    `<hr>\n<p><em>Originally published at <a href="${canonicalUrl}">${canonicalUrl}</a> on ${escape(
      post.datePublished
    )}.</em></p>`
  );

  return parts.join('\n\n');
}

function buildMediumPayload(post, { publishStatus = 'public' } = {}) {
  const canonicalUrl = `${ORIGIN}${post.url}`;
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 5) : [post.category];
  const content = buildMediumContent(post);

  return {
    title: post.title,
    contentFormat: 'html',
    content,
    canonicalUrl,
    tags,
    publishStatus
  };
}

async function validateMediumToken(token, { fetchFn = fetch } = {}) {
  if (!token || typeof token !== 'string' || !token.trim()) {
    return { valid: false, reason: 'missing_token', error: 'No Medium integration token configured.' };
  }
  const cleanToken = token.trim();
  try {
    const res = await fetchFn(`${MEDIUM_API_BASE}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data && data.data && data.data.id) {
        return {
          valid: true,
          user: {
            id: data.data.id,
            username: data.data.username,
            name: data.data.name,
            url: data.data.url,
            imageUrl: data.data.imageUrl
          }
        };
      }
      return { valid: false, reason: 'invalid_response', error: 'Unexpected response schema from /v1/me' };
    }

    if (res.status === 401 || res.status === 403) {
      return {
        valid: false,
        reason: 'unauthorized',
        status: res.status,
        error: 'Medium integration token was rejected (HTTP 401/403: unauthorized).'
      };
    }

    return {
      valid: false,
      reason: 'http_error',
      status: res.status,
      error: `Medium API returned unexpected status HTTP ${res.status}`
    };
  } catch (err) {
    return {
      valid: false,
      reason: 'network_error',
      error: `Network error connecting to Medium API: ${err.message}`
    };
  }
}

async function publishStory(post, { token, authorId, fetchFn = fetch, publishStatus = 'public' } = {}) {
  if (!token || !authorId) {
    return { ok: false, error: 'Token and authorId are required to publish.' };
  }
  const payload = buildMediumPayload(post, { publishStatus });

  try {
    const res = await fetchFn(`${MEDIUM_API_BASE}/users/${encodeURIComponent(authorId)}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 201) {
      const body = await res.json();
      return {
        ok: true,
        story: {
          id: body.data.id,
          title: body.data.title,
          url: body.data.url,
          canonicalUrl: body.data.canonicalUrl || payload.canonicalUrl,
          publishStatus: body.data.publishStatus,
          publishedAt: body.data.publishedAt
        }
      };
    }

    if (res.status === 429) {
      return {
        ok: false,
        rateLimited: true,
        status: 429,
        error: 'Medium API rate limit exceeded (HTTP 429).'
      };
    }

    let detail = `HTTP ${res.status}`;
    try {
      const errJson = await res.json();
      if (errJson.errors && Array.isArray(errJson.errors) && errJson.errors[0]?.message) {
        detail = `${detail}: ${errJson.errors[0].message}`;
      }
    } catch {
      // ignore json parse failure
    }
    return {
      ok: false,
      status: res.status,
      error: `Medium publication failed: ${detail}`
    };
  } catch (err) {
    return {
      ok: false,
      error: `Network error while publishing to Medium: ${err.message}`
    };
  }
}

async function checkCanonicalUrlLive(canonicalUrl, { fetchFn = fetch, timeout = 5000 } = {}) {
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeout) : null;
    const res = await fetchFn(canonicalUrl, {
      method: 'HEAD',
      signal: controller ? controller.signal : undefined
    });
    if (timer) clearTimeout(timer);
    return res.status >= 200 && res.status < 400;
  } catch {
    return false;
  }
}

function loadSyncState(root, stateRelativePath = DEFAULT_STATE_FILE) {
  const filePath = path.join(root, stateRelativePath);
  if (!fs.existsSync(filePath)) {
    return {
      version: 1,
      lastSyncedAt: null,
      mode: 'unconfigured', // 'official_api' | 'import_queue'
      account: {
        profile: KNOWN_PROFILE,
        username: 'kumaraniketn',
        authorId: null,
        authenticated: false
      },
      stats: {
        discovered: 0,
        eligible: 0,
        published: 0,
        queued: 0,
        failed: 0,
        modifiedRequiresReview: 0
      },
      articles: {}
    };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!parsed || parsed.version !== 1 || !parsed.articles) {
      throw new Error('Invalid state structure');
    }
    return parsed;
  } catch (err) {
    throw new Error(`Failed to load Medium sync state from ${stateRelativePath}: ${err.message}`);
  }
}

function saveSyncState(root, state, stateRelativePath = DEFAULT_STATE_FILE) {
  const filePath = path.join(root, stateRelativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp-${Date.now()}`;
  fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2) + '\n', 'utf8');
  fs.renameSync(tmpPath, filePath);
}

function discoverArticles(root, { preview = false } = {}) {
  const posts = readArticles({ root, preview });
  const results = [];
  for (const post of posts) {
    const id = `${post.category}/${post.slug}`;
    const canonicalUrl = `${ORIGIN}${post.url}`;
    const sourcePath = path.join('data/blog', post.category, `${post.slug}.md`);
    const contentHash = computeContentHash(post);
    results.push({
      id,
      category: post.category,
      slug: post.slug,
      title: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified || null,
      url: post.url,
      canonicalUrl,
      sourcePath,
      coverImage: post.coverImage,
      coverImageAlt: post.coverImageAlt,
      imageCaption: post.imageCaption || null,
      tags: post.tags || [],
      sources: post.sources || [],
      quickAnswer: post.quickAnswer || null,
      showSources: post.showSources,
      contentHash,
      post
    });
  }
  return results;
}

function generateInventory(root, { stateFile = DEFAULT_STATE_FILE } = {}) {
  const articles = discoverArticles(root);
  const state = loadSyncState(root, stateFile);

  const items = articles.map(art => {
    const recorded = state.articles[art.id] || {};
    return {
      id: art.id,
      title: art.title,
      slug: art.slug,
      category: art.category,
      tags: art.tags,
      datePublished: art.datePublished,
      dateModified: art.dateModified,
      canonicalUrl: art.canonicalUrl,
      sourcePath: art.sourcePath,
      eligible: true,
      contentHash: art.contentHash,
      status: recorded.status || 'queued',
      mediumUrl: recorded.mediumUrl || null,
      mediumStoryId: recorded.mediumStoryId || null,
      retryCount: recorded.retryCount || 0,
      lastAttemptedAt: recorded.lastAttemptedAt || null,
      lastSuccessAt: recorded.lastSuccessAt || null,
      error: recorded.error || null,
      notes: recorded.notes || null,
      manualInstructions: recorded.manualInstructions || buildManualImportInstructions(art)
    };
  });

  return {
    total: items.length,
    byCategory: {
      technology: items.filter(i => i.category === 'technology').length,
      auto: items.filter(i => i.category === 'auto').length,
      finance: items.filter(i => i.category === 'finance').length,
      product: items.filter(i => i.category === 'product').length
    },
    byStatus: {
      queued: items.filter(i => i.status === 'queued').length,
      published: items.filter(i => i.status === 'published').length,
      modified_requires_review: items.filter(i => i.status === 'modified_requires_review').length,
      failed: items.filter(i => i.status === 'failed').length,
      skipped: items.filter(i => i.status === 'skipped').length
    },
    items
  };
}

function updateArticleState(root, idOrSlug, updates = {}, { stateFile = DEFAULT_STATE_FILE } = {}) {
  const state = loadSyncState(root, stateFile);
  const foundKey = Object.keys(state.articles).find(
    k => k === idOrSlug || k.endsWith(`/${idOrSlug}`) || state.articles[k].slug === idOrSlug
  );

  if (!foundKey) {
    throw new Error(`Article "${idOrSlug}" not found in synchronisation state.`);
  }

  const item = state.articles[foundKey];
  const now = new Date().toISOString();

  if (updates.status !== undefined) item.status = updates.status;
  if (updates.mediumUrl !== undefined) item.mediumUrl = updates.mediumUrl;
  if (updates.mediumStoryId !== undefined) item.mediumStoryId = updates.mediumStoryId;
  if (updates.notes !== undefined) item.notes = updates.notes;
  if (updates.error !== undefined) item.error = updates.error;

  if (item.status === 'published' && !item.lastSuccessAt) {
    item.lastSuccessAt = now;
  }
  item.lastAttemptedAt = now;

  // Refresh stats
  const publishedList = Object.values(state.articles).filter(a => a.status === 'published');
  const queuedList = Object.values(state.articles).filter(a => a.status === 'queued');
  const failedList = Object.values(state.articles).filter(a => a.status === 'failed');
  const modifiedList = Object.values(state.articles).filter(a => a.status === 'modified_requires_review');
  const skippedList = Object.values(state.articles).filter(a => a.status === 'skipped');

  state.stats = {
    discovered: Object.keys(state.articles).length,
    eligible: Object.keys(state.articles).length,
    published: publishedList.length,
    queued: queuedList.length,
    failed: failedList.length,
    skipped: skippedList.length,
    modifiedRequiresReview: modifiedList.length
  };
  state.lastSyncedAt = now;

  saveSyncState(root, state, stateFile);

  const queueDocFullPath = path.join(root, DEFAULT_QUEUE_DOC);
  if (fs.existsSync(path.dirname(queueDocFullPath))) {
    fs.writeFileSync(queueDocFullPath, generateImportQueueMarkdown(state), 'utf8');
  }

  return item;
}

function getNextPendingArticle(root, { stateFile = DEFAULT_STATE_FILE } = {}) {
  const state = loadSyncState(root, stateFile);
  const pending = Object.values(state.articles).find(a => a.status === 'queued' || a.status === 'failed');
  return pending || null;
}

function buildManualImportInstructions(article) {
  return [
    `1. Log in to Medium as @kumaraniketn (Profile: ${KNOWN_PROFILE})`,
    `2. Open the official story importer: ${MEDIUM_IMPORT_URL}`,
    `3. Paste your canonical portfolio URL: ${article.canonicalUrl}`,
    `4. Click 'Import story'. Medium fetches the page, imports the content, and sets the canonical link.`,
    `5. In the Medium editor, review formatting, headings, code blocks, and cover image.`,
    `6. Open story settings (three dots -> 'More settings' or 'Advanced settings') and confirm the Canonical Link points to: ${article.canonicalUrl}`,
    `7. Publish the story on Medium.`,
    `8. Record the published Medium story URL in your repository:`,
    `   npm run sync:medium -- --mark-imported ${article.slug} <MEDIUM_URL>`
  ].join('\n');
}

function generateImportQueueMarkdown(state) {
  const queued = Object.values(state.articles).filter(a => a.status === 'queued');
  const modified = Object.values(state.articles).filter(a => a.status === 'modified_requires_review');
  const published = Object.values(state.articles).filter(a => a.status === 'published');
  const failed = Object.values(state.articles).filter(a => a.status === 'failed');

  const lines = [
    `# Medium Story Import Queue`,
    ``,
    `> Generated: ${new Date().toISOString()}  `,
    `> Medium Account: [${state.account?.username || 'kumaraniketn'}](${state.account?.profile || KNOWN_PROFILE})  `,
    `> Mode: ${state.mode === 'official_api' ? 'Official API (Automated)' : 'Official Webpage Import Queue (Semi-Automated)'}`,
    ``,
    `## Summary`,
    ``,
    `- **Total Tracked Articles:** ${Object.keys(state.articles).length}`,
    `- **Published on Medium:** ${published.length}`,
    `- **Queued for Import:** ${queued.length}`,
    `- **Modified (Review Required):** ${modified.length}`,
    `- **Failed / Errors:** ${failed.length}`,
    ``
  ];

  if (modified.length > 0) {
    lines.push(
      `## Modified Articles Requiring Manual Review`,
      ``,
      `These articles were already published on Medium, but their source content on the portfolio was subsequently updated. Because Medium's API and importer do not update existing live stories without creating duplicates, review the changes manually on Medium:`,
      ``
    );
    for (const item of modified) {
      lines.push(
        `### [${item.title}](${item.canonicalUrl})`,
        `- **Category:** \`${item.category}\` | **Slug:** \`${item.slug}\``,
        `- **Live Medium URL:** [${item.mediumUrl}](${item.mediumUrl})`,
        `- **Source Last Modified:** ${item.dateModified || 'Unknown'}`,
        `- **Action:** Compare recent portfolio changes with the Medium story and update the text directly in the Medium editor.`,
        ``
      );
    }
  }

  if (queued.length > 0) {
    lines.push(
      `## Articles Queued for Import`,
      ``,
      `To import each story to Medium using Medium's official webpage importer:`,
      `1. Open [Medium Story Importer](${MEDIUM_IMPORT_URL}) while logged into \`@${state.account?.username || 'kumaraniketn'}\`.`,
      `2. Paste the **Canonical Portfolio URL** from below into the import field.`,
      `3. Click **Import**, review the draft, check canonical SEO settings in Story Settings -> Advanced Settings, and click **Publish**.`,
      `4. Run \`npm run sync:medium -- --mark-imported <slug> <mediumUrl>\` to register it as published.`,
      ``,
      `| Status | Published Date | Title | Canonical Portfolio URL | Direct Import |`,
      `| :--- | :--- | :--- | :--- | :--- |`
    );
    for (const item of queued) {
      lines.push(
        `| Queued | ${item.datePublished} | ${item.title.replace(/\|/g, '\\|')} | [Portfolio Link](${item.canonicalUrl}) | [Import URL](${MEDIUM_IMPORT_URL}) |`
      );
    }
    lines.push(``);
  }

  if (published.length > 0) {
    lines.push(
      `## Published Stories (${published.length})`,
      ``,
      `| Title | Portfolio Canonical URL | Medium Story | Published Date |`,
      `| :--- | :--- | :--- | :--- |`
    );
    for (const item of published) {
      lines.push(
        `| ${item.title.replace(/\|/g, '\\|')} | [Portfolio](${item.canonicalUrl}) | [Medium Story](${item.mediumUrl || '#'}) | ${item.datePublished} |`
      );
    }
    lines.push(``);
  }

  return lines.join('\n');
}

function generateDryRunReport(root, { stateFile = DEFAULT_STATE_FILE } = {}) {
  const articles = discoverArticles(root);
  const state = loadSyncState(root, stateFile);

  let alreadyPublished = 0;
  let readyForPublish = 0;
  let requireManualImport = 0;
  let modifiedCount = 0;
  let missingMetadata = 0;
  let duplicateCanonicalRisks = 0;

  const canonicalSet = new Set();

  for (const art of articles) {
    if (canonicalSet.has(art.canonicalUrl)) {
      duplicateCanonicalRisks++;
    }
    canonicalSet.add(art.canonicalUrl);

    if (!art.title || !art.canonicalUrl || !art.datePublished) {
      missingMetadata++;
      continue;
    }

    const recorded = state.articles[art.id];
    if (recorded && recorded.status === 'published') {
      if (recorded.contentHash === art.contentHash) {
        alreadyPublished++;
      } else {
        modifiedCount++;
      }
    } else {
      readyForPublish++;
      requireManualImport++;
    }
  }

  return {
    discovered: articles.length,
    eligible: articles.length,
    alreadySynchronised: alreadyPublished,
    missingOrInvalidMetadata: missingMetadata,
    readyForPublication: readyForPublish,
    requireManualImport,
    modifiedRequiresReview: modifiedCount,
    unresolvedCanonicalOrDuplicateRisks: duplicateCanonicalRisks,
    articles
  };
}

async function syncArticles(root, options = {}) {
  const {
    token = process.env.MEDIUM_INTEGRATION_TOKEN,
    stateFile = DEFAULT_STATE_FILE,
    queueDocFile = DEFAULT_QUEUE_DOC,
    dryRun = false,
    limit = Infinity,
    slug = null,
    skipUrlCheck = false,
    fetchFn = fetch,
    publishStatus = process.env.MEDIUM_PUBLISH_STATUS || 'public',
    logger = console
  } = options;

  const state = loadSyncState(root, stateFile);
  const allArticles = discoverArticles(root);

  // Filter if a specific slug is requested
  const articles = slug
    ? allArticles.filter(a => a.slug === slug || a.id.endsWith(`/${slug}`))
    : allArticles;

  if (slug && articles.length === 0) {
    throw new Error(`Article with slug "${slug}" not found among published portfolio articles.`);
  }

  // 1. Verify token
  let tokenResult = { valid: false, reason: 'missing_token' };
  if (token) {
    tokenResult = await validateMediumToken(token, { fetchFn });
  }

  const isApiEnabled = tokenResult.valid;
  state.mode = isApiEnabled ? 'official_api' : 'import_queue';

  if (isApiEnabled) {
    state.account.authorId = tokenResult.user.id;
    state.account.username = tokenResult.user.username;
    state.account.profile = tokenResult.user.url;
    state.account.authenticated = true;
    logger.log(`Medium API Authenticated as: ${tokenResult.user.name} (@${tokenResult.user.username})`);
  } else {
    state.account.authenticated = false;
    if (token) {
      logger.warn(`Medium API token validation failed: ${tokenResult.error}. Falling back to import queue.`);
    } else {
      logger.log(`No MEDIUM_INTEGRATION_TOKEN provided. Operating in official semi-automated import-queue mode.`);
    }
  }

  const results = {
    processed: 0,
    published: 0,
    queued: 0,
    modified: 0,
    skipped: 0,
    failed: 0,
    items: []
  };

  let countProcessed = 0;

  for (const art of articles) {
    const existing = state.articles[art.id];

    // Case A: Already published and content unchanged
    if (existing && existing.status === 'published' && existing.contentHash === art.contentHash) {
      results.skipped++;
      continue;
    }

    // Case B: Already published, but content on portfolio was updated
    if (existing && existing.status === 'published' && existing.contentHash !== art.contentHash) {
      existing.status = 'modified_requires_review';
      existing.dateModified = art.dateModified || new Date().toISOString().slice(0, 10);
      existing.previousHash = existing.contentHash;
      existing.contentHash = art.contentHash;
      existing.modifiedDetectedAt = new Date().toISOString();
      existing.note = `Portfolio article was modified. Manual review needed on Medium story: ${existing.mediumUrl}`;
      results.modified++;
      results.items.push({ id: art.id, slug: art.slug, status: 'modified_requires_review', title: art.title });
      continue;
    }

    // Check limit
    if (countProcessed >= limit) {
      // Keep as queued if not already in state
      if (!existing) {
        state.articles[art.id] = {
          id: art.id,
          category: art.category,
          slug: art.slug,
          title: art.title,
          url: art.url,
          canonicalUrl: art.canonicalUrl,
          datePublished: art.datePublished,
          dateModified: art.dateModified,
          contentHash: art.contentHash,
          status: 'queued',
          mediumStoryId: null,
          mediumUrl: null,
          retryCount: 0,
          lastAttemptedAt: null,
          lastSuccessAt: null,
          error: null,
          importUrl: MEDIUM_IMPORT_URL,
          manualInstructions: buildManualImportInstructions(art)
        };
        results.queued++;
      }
      continue;
    }

    // Check live URL if needed
    if (!skipUrlCheck && !dryRun) {
      const isLive = await checkCanonicalUrlLive(art.canonicalUrl, { fetchFn });
      if (!isLive) {
        logger.warn(`Canonical URL is not publicly live yet: ${art.canonicalUrl}. Skipping to preserve canonical integrity.`);
        results.skipped++;
        continue;
      }
    }

    countProcessed++;
    results.processed++;

    if (isApiEnabled && !dryRun) {
      // Publish via official Medium API
      logger.log(`Publishing "${art.title}" (${art.canonicalUrl}) to Medium via API...`);
      const pubRes = await publishStory(art.post, {
        token,
        authorId: state.account.authorId,
        fetchFn,
        publishStatus
      });

      const now = new Date().toISOString();

      if (pubRes.ok) {
        logger.log(`Successfully published: ${pubRes.story.url}`);
        state.articles[art.id] = {
          id: art.id,
          category: art.category,
          slug: art.slug,
          title: art.title,
          url: art.url,
          canonicalUrl: art.canonicalUrl,
          datePublished: art.datePublished,
          dateModified: art.dateModified,
          contentHash: art.contentHash,
          status: 'published',
          mediumStoryId: pubRes.story.id,
          mediumUrl: pubRes.story.url,
          publishedAt: pubRes.story.publishedAt ? new Date(pubRes.story.publishedAt).toISOString() : now,
          lastAttemptedAt: now,
          lastSuccessAt: now,
          retryCount: (existing?.retryCount || 0),
          error: null
        };
        results.published++;
        results.items.push({ id: art.id, slug: art.slug, status: 'published', url: pubRes.story.url });
      } else {
        logger.error(`Failed to publish "${art.title}": ${pubRes.error}`);
        state.articles[art.id] = {
          ...(existing || {}),
          id: art.id,
          category: art.category,
          slug: art.slug,
          title: art.title,
          url: art.url,
          canonicalUrl: art.canonicalUrl,
          datePublished: art.datePublished,
          dateModified: art.dateModified,
          contentHash: art.contentHash,
          status: 'failed',
          mediumStoryId: existing?.mediumStoryId || null,
          mediumUrl: existing?.mediumUrl || null,
          lastAttemptedAt: now,
          retryCount: (existing?.retryCount || 0) + 1,
          error: pubRes.error,
          rateLimited: Boolean(pubRes.rateLimited)
        };
        results.failed++;
        results.items.push({ id: art.id, slug: art.slug, status: 'failed', error: pubRes.error });
      }
    } else {
      // Fallback: Semi-automated import queue
      const now = new Date().toISOString();
      state.articles[art.id] = {
        id: art.id,
        category: art.category,
        slug: art.slug,
        title: art.title,
        url: art.url,
        canonicalUrl: art.canonicalUrl,
        datePublished: art.datePublished,
        dateModified: art.dateModified,
        contentHash: art.contentHash,
        status: existing?.status === 'published' ? 'published' : 'queued',
        mediumStoryId: existing?.mediumStoryId || null,
        mediumUrl: existing?.mediumUrl || null,
        lastAttemptedAt: now,
        lastSuccessAt: existing?.lastSuccessAt || null,
        retryCount: existing?.retryCount || 0,
        error: null,
        importUrl: MEDIUM_IMPORT_URL,
        manualInstructions: buildManualImportInstructions(art)
      };
      results.queued++;
      results.items.push({ id: art.id, slug: art.slug, status: 'queued', canonicalUrl: art.canonicalUrl });
    }
  }

  // Ensure all remaining discovered articles exist in state as queued if brand new
  for (const art of allArticles) {
    if (!state.articles[art.id]) {
      state.articles[art.id] = {
        id: art.id,
        category: art.category,
        slug: art.slug,
        title: art.title,
        url: art.url,
        canonicalUrl: art.canonicalUrl,
        datePublished: art.datePublished,
        dateModified: art.dateModified,
        contentHash: art.contentHash,
        status: 'queued',
        mediumStoryId: null,
        mediumUrl: null,
        retryCount: 0,
        lastAttemptedAt: null,
        lastSuccessAt: null,
        error: null,
        importUrl: MEDIUM_IMPORT_URL,
        manualInstructions: buildManualImportInstructions(art)
      };
    }
  }

  // Update stats
  const publishedList = Object.values(state.articles).filter(a => a.status === 'published');
  const queuedList = Object.values(state.articles).filter(a => a.status === 'queued');
  const failedList = Object.values(state.articles).filter(a => a.status === 'failed');
  const modifiedList = Object.values(state.articles).filter(a => a.status === 'modified_requires_review');

  state.stats = {
    discovered: allArticles.length,
    eligible: allArticles.length,
    published: publishedList.length,
    queued: queuedList.length,
    failed: failedList.length,
    modifiedRequiresReview: modifiedList.length
  };
  state.lastSyncedAt = new Date().toISOString();

  if (!dryRun) {
    saveSyncState(root, state, stateFile);
    if (queueDocFile) {
      const queueDoc = generateImportQueueMarkdown(state);
      const queueDocFullPath = path.join(root, queueDocFile);
      fs.mkdirSync(path.dirname(queueDocFullPath), { recursive: true });
      fs.writeFileSync(queueDocFullPath, queueDoc, 'utf8');
    }
  }

  return {
    dryRun,
    isApiEnabled,
    stats: state.stats,
    results,
    state
  };
}

function markArticleImported(root, slug, mediumUrl, { storyId = null, stateFile = DEFAULT_STATE_FILE } = {}) {
  const state = loadSyncState(root, stateFile);
  const foundKey = Object.keys(state.articles).find(k => k.endsWith(`/${slug}`) || state.articles[k].slug === slug);

  if (!foundKey) {
    throw new Error(`Article with slug "${slug}" not found in synchronisation state.`);
  }

  const item = state.articles[foundKey];
  const now = new Date().toISOString();

  item.status = 'published';
  item.mediumUrl = mediumUrl;
  item.mediumStoryId = storyId || item.mediumStoryId || null;
  item.lastSuccessAt = now;
  item.error = null;

  // Refresh stats
  const publishedList = Object.values(state.articles).filter(a => a.status === 'published');
  const queuedList = Object.values(state.articles).filter(a => a.status === 'queued');
  const failedList = Object.values(state.articles).filter(a => a.status === 'failed');
  const modifiedList = Object.values(state.articles).filter(a => a.status === 'modified_requires_review');

  state.stats = {
    discovered: Object.keys(state.articles).length,
    eligible: Object.keys(state.articles).length,
    published: publishedList.length,
    queued: queuedList.length,
    failed: failedList.length,
    modifiedRequiresReview: modifiedList.length
  };
  state.lastSyncedAt = now;

  saveSyncState(root, state, stateFile);

  const queueDocFullPath = path.join(root, DEFAULT_QUEUE_DOC);
  if (fs.existsSync(path.dirname(queueDocFullPath))) {
    fs.writeFileSync(queueDocFullPath, generateImportQueueMarkdown(state), 'utf8');
  }

  return item;
}

module.exports = {
  MEDIUM_API_BASE,
  DEFAULT_STATE_FILE,
  DEFAULT_QUEUE_DOC,
  MEDIUM_IMPORT_URL,
  KNOWN_PROFILE,
  computeContentHash,
  qualifyUrls,
  buildMediumContent,
  buildMediumPayload,
  validateMediumToken,
  publishStory,
  checkCanonicalUrlLive,
  loadSyncState,
  saveSyncState,
  discoverArticles,
  buildManualImportInstructions,
  generateImportQueueMarkdown,
  generateDryRunReport,
  generateInventory,
  updateArticleState,
  getNextPendingArticle,
  syncArticles,
  markArticleImported
};
