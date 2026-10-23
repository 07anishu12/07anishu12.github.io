#!/usr/bin/env node

/**
 * Portfolio-to-Medium Article Synchronisation CLI
 *
 * Automates detection, transformation, and synchronisation of published
 * portfolio articles to Medium, preserving canonical URLs, author attributions,
 * and content integrity. Supports both official Medium API publishing (when an
 * integration token is available) and official semi-automated webpage-import queue.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mediumSync from '../tools/blog/medium-sync.js';

const {
  validateMediumToken,
  generateDryRunReport,
  generateInventory,
  getNextPendingArticle,
  checkCanonicalUrlLive,
  syncArticles,
  markArticleImported,
  loadSyncState,
  DEFAULT_STATE_FILE,
  DEFAULT_QUEUE_DOC,
  KNOWN_PROFILE,
  MEDIUM_IMPORT_URL
} = mediumSync;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function printHelp() {
  console.log(`
Portfolio-to-Medium Article Synchronisation CLI

Usage:
  node scripts/sync-medium.mjs [options]

Options:
  --dry-run              Run synchronisation in preview mode (no state written, no publications)
  --report               Display comprehensive status report for all portfolio articles
  --inventory [path]     Export complete article inventory to JSON (default: data/medium-inventory.json)
  --resume               Identify the next pending article and resume migration
  --verify-urls          Verify that all portfolio canonical URLs return HTTP 200 live
  --verify-token         Test configured MEDIUM_INTEGRATION_TOKEN against Medium API
  --limit <n>            Maximum number of articles to process in this run (default: 2)
  --slug <slug>          Target a single article by its URL slug
  --skip-url-check       Skip HTTP HEAD check verifying article is publicly accessible
  --mark-imported <slug> <url> [storyId]
                         Record that an article was manually imported to Medium
  --export-queue [path]  Export markdown import queue (default: ${DEFAULT_QUEUE_DOC})
  --help                 Show this help message
`);
}

function parseArgs(args) {
  const options = {
    dryRun: false,
    report: false,
    inventory: null,
    resume: false,
    verifyUrls: false,
    verifyToken: false,
    limit: 2,
    slug: null,
    skipUrlCheck: false,
    markImported: null,
    exportQueue: null,
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--report') {
      options.report = true;
    } else if (arg === '--resume') {
      options.resume = true;
    } else if (arg === '--verify-urls') {
      options.verifyUrls = true;
    } else if (arg === '--inventory') {
      options.inventory = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'data/medium-inventory.json';
    } else if (arg === '--verify-token') {
      options.verifyToken = true;
    } else if (arg === '--skip-url-check') {
      options.skipUrlCheck = true;
    } else if (arg === '--limit') {
      const val = parseInt(args[++i], 10);
      if (Number.isNaN(val) || val <= 0) {
        throw new Error('Option --limit requires a positive integer.');
      }
      options.limit = val;
    } else if (arg === '--slug') {
      options.slug = args[++i];
      if (!options.slug) throw new Error('Option --slug requires an article slug.');
    } else if (arg === '--export-queue') {
      options.exportQueue = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : DEFAULT_QUEUE_DOC;
    } else if (arg === '--mark-imported') {
      const slug = args[++i];
      const url = args[++i];
      const storyId = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : null;
      if (!slug || !url) {
        throw new Error('Usage: --mark-imported <slug> <mediumUrl> [storyId]');
      }
      options.markImported = { slug, url, storyId };
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

async function main() {
  const args = process.argv.slice(2);
  let options;
  try {
    options = parseArgs(args);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    printHelp();
    process.exit(1);
  }

  if (options.help) {
    printHelp();
    return;
  }

  console.log('=== Portfolio-to-Medium Article Synchronisation ===');
  console.log(`Repository Root: ${ROOT}`);
  console.log(`Medium Profile:  ${KNOWN_PROFILE}`);

  // 1. Verify token only
  if (options.verifyToken) {
    const token = process.env.MEDIUM_INTEGRATION_TOKEN;
    if (!token) {
      console.log('\nResult: No MEDIUM_INTEGRATION_TOKEN found in environment.');
      console.log('Medium no longer issues new API tokens. Semi-automated import queue mode is active.');
      return;
    }
    console.log('\nValidating MEDIUM_INTEGRATION_TOKEN with Medium API (GET /v1/me)...');
    const result = await validateMediumToken(token);
    if (result.valid) {
      console.log('Token Validation: SUCCESS');
      console.log(`Author ID:   ${result.user.id}`);
      console.log(`Username:    @${result.user.username}`);
      console.log(`Name:        ${result.user.name}`);
      console.log(`Profile URL: ${result.user.url}`);
    } else {
      console.error('Token Validation: FAILED');
      console.error(`Reason: ${result.error}`);
    }
    return;
  }

  // 2. Mark article imported
  if (options.markImported) {
    const { slug, url, storyId } = options.markImported;
    console.log(`\nRecording manual import for "${slug}" -> ${url}...`);
    try {
      const updated = markArticleImported(ROOT, slug, url, { storyId });
      console.log(`Successfully updated record for "${updated.title}".`);
      console.log(`Status: ${updated.status} | Medium URL: ${updated.mediumUrl}`);
    } catch (err) {
      console.error(`Failed to mark article imported: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  // 3. Export Inventory
  if (options.inventory) {
    console.log(`\nExporting migration inventory to ${options.inventory}...`);
    const inv = generateInventory(ROOT);
    const dest = path.resolve(ROOT, options.inventory);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, JSON.stringify(inv, null, 2) + '\n', 'utf8');
    console.log(`Inventory exported successfully.`);
    console.log(`Total Articles:    ${inv.total}`);
    console.log(`- Finance:         ${inv.byCategory.finance}`);
    console.log(`- Technology:      ${inv.byCategory.technology}`);
    console.log(`- Auto:            ${inv.byCategory.auto}`);
    console.log(`- Product:         ${inv.byCategory.product}`);
    console.log(`Status breakdown:`);
    console.log(`- Queued:          ${inv.byStatus.queued}`);
    console.log(`- Published:       ${inv.byStatus.published}`);
    console.log(`- Modified/Review: ${inv.byStatus.modified_requires_review}`);
    console.log(`- Failed:          ${inv.byStatus.failed}`);
    return;
  }

  // 4. Resume Interrupted Migration
  if (options.resume) {
    const next = getNextPendingArticle(ROOT);
    if (!next) {
      console.log('\nAll articles in the migration queue have been published or skipped!');
      return;
    }
    console.log('\n=== Resuming Migration ===');
    console.log(`Next Pending Article: [${next.datePublished}] ${next.title}`);
    console.log(`Category:             ${next.category}`);
    console.log(`Canonical URL:        ${next.canonicalUrl}`);
    console.log(`Source Path:          ${next.sourcePath || 'data/blog/' + next.category + '/' + next.slug + '.md'}`);
    console.log(`\nAction required:`);
    console.log(`1. Open Medium importer: ${MEDIUM_IMPORT_URL}`);
    console.log(`2. Paste canonical URL:  ${next.canonicalUrl}`);
    console.log(`3. Review and publish draft.`);
    console.log(`4. Register publication:`);
    console.log(`   npm run sync:medium -- --mark-imported ${next.slug} <MEDIUM_URL>`);
    return;
  }

  // 5. Verify Canonical URLs Live Accessibility
  if (options.verifyUrls) {
    console.log('\nVerifying live canonical URL accessibility for all portfolio articles...\n');
    const articles = generateInventory(ROOT).items;
    let liveCount = 0;
    let unavailCount = 0;
    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      const isLive = await checkCanonicalUrlLive(art.canonicalUrl);
      if (isLive) {
        liveCount++;
      } else {
        unavailCount++;
        console.warn(`[UNAVAILABLE] ${art.canonicalUrl}`);
      }
      if ((i + 1) % 25 === 0 || i === articles.length - 1) {
        process.stdout.write(`Checked ${i + 1}/${articles.length} URLs (Live: ${liveCount}, Unavailable: ${unavailCount})\r`);
      }
    }
    console.log(`\nURL Verification Complete: ${liveCount} live (HTTP 200), ${unavailCount} unavailable.`);
    return;
  }

  // 6. Status Report
  if (options.report) {
    console.log('\nGenerating Portfolio & Medium Synchronisation Report...\n');
    const report = generateDryRunReport(ROOT);
    const state = loadSyncState(ROOT);

    console.log('----------------------------------------------------');
    console.log(`Total Discovered Articles:              ${report.discovered}`);
    console.log(`Eligible for Synchronisation:           ${report.eligible}`);
    console.log(`Already Synchronised (Unchanged):       ${report.alreadySynchronised}`);
    console.log(`Modified (Review Required):             ${report.modifiedRequiresReview}`);
    console.log(`Ready for Publication / Import:         ${report.readyForPublication}`);
    console.log(`Missing or Invalid Metadata Records:    ${report.missingOrInvalidMetadata}`);
    console.log(`Duplicate Canonical / Risk Conflicts:   ${report.unresolvedCanonicalOrDuplicateRisks}`);
    console.log(`Current Operating Mode:                 ${state.mode}`);
    console.log('----------------------------------------------------');

    const queued = Object.values(state.articles).filter(a => a.status === 'queued');
    if (queued.length > 0) {
      console.log(`\nPending Queue (${queued.length} articles):`);
      for (const item of queued.slice(0, 5)) {
        console.log(` - [${item.datePublished}] ${item.title}`);
        console.log(`   Canonical: ${item.canonicalUrl}`);
      }
      if (queued.length > 5) {
        console.log(`   ...and ${queued.length - 5} more. See ${DEFAULT_QUEUE_DOC}`);
      }
    }
    return;
  }

  // 4. Synchronisation Run (or Dry Run)
  if (options.dryRun) {
    console.log('\n[DRY RUN MODE ENABLED - No changes will be written]\n');
  }

  const token = process.env.MEDIUM_INTEGRATION_TOKEN;
  console.log(`Batch Limit: ${options.limit} article(s)`);
  if (options.slug) console.log(`Targeting Article Slug: "${options.slug}"`);

  const outcome = await syncArticles(ROOT, {
    token,
    dryRun: options.dryRun,
    limit: options.limit,
    slug: options.slug,
    skipUrlCheck: options.skipUrlCheck,
    logger: console
  });

  console.log('\n=== Synchronisation Summary ===');
  console.log(`Mode:                   ${outcome.state.mode}`);
  console.log(`Processed Articles:     ${outcome.results.processed}`);
  console.log(`Published via API:      ${outcome.results.published}`);
  console.log(`Queued for Import:      ${outcome.results.queued}`);
  console.log(`Modified (Flagged):     ${outcome.results.modified}`);
  console.log(`Skipped (Up to date):   ${outcome.results.skipped}`);
  console.log(`Failed / Errors:        ${outcome.results.failed}`);

  if (outcome.results.failed > 0) {
    console.log('\nErrors encountered during run:');
    for (const item of outcome.results.items.filter(i => i.status === 'failed')) {
      console.error(`- ${item.id}: ${item.error}`);
    }
    process.exit(1);
  }

  console.log('\nSynchronisation completed successfully.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(err => {
    console.error('Fatal synchronisation error:', err);
    process.exit(1);
  });
}
