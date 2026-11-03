/**
 * Advanced Content Quality & Search Intent Analyzer
 * Evaluates search intent, topical relevance, information gain,
 * repetitive paragraphs, cross-article near-duplicates, ungrounded factual claims,
 * missing examples/references, and internal linking opportunities.
 *
 * NOTE: Never automatically labels content as low quality simply because it is AI-generated.
 * Evaluates objective structural depth, factual grounding, and semantic utility.
 */

import { URL } from 'node:url';

export class ContentAnalyzer {
  constructor(origin = 'https://aniket.app') {
    this.origin = origin.replace(/\/$/, '');
  }

  /**
   * Classify search intent from title, path, and text signals
   */
  classifySearchIntent(url, title, h1, bodyText) {
    const combined = `${url} ${title} ${h1}`.toLowerCase();

    if (url === `${this.origin}/` || url.endsWith('/about/') || url.endsWith('/contact/') || url.endsWith('/work/')) {
      return {
        intent: 'Navigational / Brand',
        primaryNeed: 'Understand who Aniket Thakur is, his portfolio work, and contact information.'
      };
    }

    if (combined.includes('how to') || combined.includes('build-') || combined.includes('build ') || combined.includes('guide to')) {
      return {
        intent: 'Informational / How-To Tutorial',
        primaryNeed: 'Step-by-step implementation guide, architecture patterns, and code instructions.'
      };
    }

    if (combined.includes('vs') || combined.includes('best cars') || combined.includes('comparison') || combined.includes('difference')) {
      return {
        intent: 'Commercial / Comparative Evaluation',
        primaryNeed: 'Objective trade-off analysis, pricing/cost math, specifications, and selection criteria.'
      };
    }

    if (combined.includes('what is') || combined.includes('what are') || combined.includes('applications of') || combined.includes('overview')) {
      return {
        intent: 'Informational / Foundational Concept',
        primaryNeed: 'Clear conceptual definition, industry use cases, and architectural fundamentals.'
      };
    }

    if (url.includes('/projects/')) {
      return {
        intent: 'Portfolio / Case Study',
        primaryNeed: 'Technical case study demonstrating engineering capabilities and measurable impact.'
      };
    }

    return {
      intent: 'Informational / Domain Guide',
      primaryNeed: 'In-depth domain knowledge, actionable advice, and technical insights.'
    };
  }

  /**
   * Check for repetitive paragraphs within the same article
   */
  detectRepetitiveParagraphs(bodyText) {
    if (!bodyText) return { hasRepetition: false, duplicateParagraphs: [] };

    // Split text into paragraphs
    const paragraphs = bodyText
      .split(/\n\s*\n|\.\s{2,}/)
      .map(p => p.trim())
      .filter(p => p.length > 50); // Filter out tiny snippets

    const normalized = paragraphs.map(p =>
      p.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()
    );

    const duplicates = [];
    const seen = new Map();

    for (let i = 0; i < normalized.length; i++) {
      const text = normalized[i];
      if (seen.has(text)) {
        duplicates.push({
          firstOccurrenceIndex: seen.get(text),
          duplicateIndex: i,
          preview: paragraphs[i].slice(0, 100) + '...'
        });
      } else {
        seen.set(text, i);
      }
    }

    return {
      hasRepetition: duplicates.length > 0,
      duplicateParagraphsCount: duplicates.length,
      duplicateParagraphs: duplicates
    };
  }

  /**
   * Check for unsupported factual/numerical claims without references
   */
  detectUnsupportedFactualClaims(bodyText, externalLinksCount, hasTable, hasSourcesSection) {
    if (!bodyText) return { highStatisticalDensity: false, hasCitations: false, riskLevel: 'LOW' };

    // Regex detecting numerical claims, metrics, percentages, currency, benchmarks
    const statMatches = bodyText.match(/(\d+(?:\.\d+)?%|\$\d+(?:,\d+)*(?:\.\d+)?|₹\d+(?:,\d+)*|Rs\.?\s*\d+|\b\d{2,}\s*(?:km|km\/l|ms|GB|MB|tokens|queries|requests|users|hours|days|years)\b)/gi) || [];

    const statCount = statMatches.length;
    const hasCitations = externalLinksCount > 0 || hasSourcesSection;

    let riskLevel = 'LOW';
    let warning = null;

    if (statCount >= 8 && !hasCitations && !hasTable) {
      riskLevel = 'HIGH';
      warning = `Contains ${statCount} quantitative statistics/metrics but provides 0 external reference links and no structured data table. Risk of Google hallucination/unsupported claims scrutiny.`;
    } else if (statCount >= 4 && !hasCitations) {
      riskLevel = 'MEDIUM';
      warning = `Contains ${statCount} specific numbers/metrics without linked citations. Grounding with source links recommended.`;
    }

    return {
      statCount,
      sampleStats: statMatches.slice(0, 5),
      hasCitations,
      riskLevel,
      warning
    };
  }

  /**
   * Evaluate missing examples or missing references
   */
  evaluateTechnicalCompleteness(intent, wordCount, hasCode, hasTable, externalLinksCount) {
    const isTutorial = intent.includes('How-To') || intent.includes('Tutorial');
    const isComparative = intent.includes('Comparative');

    const issues = [];

    if (isTutorial && !hasCode && !hasTable) {
      issues.push('Tutorial/implementation guide lacks code blocks and structured reference tables.');
    }

    if (isComparative && !hasTable) {
      issues.push('Comparative evaluation guide lacks a side-by-side comparison table.');
    }

    if (externalLinksCount === 0 && wordCount > 600) {
      issues.push('Comprehensive guide contains 0 outbound references to authoritative primary sources.');
    }

    return {
      hasMissingExamples: issues.length > 0,
      issues
    };
  }

  /**
   * Cross-article near-duplicate detection using MinHash-style n-gram shingles
   */
  detectCrossArticleNearDuplicates(articles) {
    // Generate 3-gram shingles for each article
    const getShingles = (text) => {
      const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
      const shingles = new Set();
      for (let i = 0; i <= words.length - 3; i++) {
        shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
      }
      return shingles;
    };

    const jaccard = (setA, setB) => {
      if (setA.size === 0 || setB.size === 0) return 0;
      let intersection = 0;
      for (const item of setA) {
        if (setB.has(item)) intersection++;
      }
      return intersection / (setA.size + setB.size - intersection);
    };

    const shinglesMap = new Map();
    for (const art of articles) {
      if (art.bodySnippet && art.wordCount > 200) {
        shinglesMap.set(art.url, getShingles(art.bodySnippet));
      }
    }

    const nearDuplicates = [];
    const urlList = Array.from(shinglesMap.keys());

    // Pairwise comparison (sampled if large)
    for (let i = 0; i < urlList.length; i++) {
      const urlA = urlList[i];
      const shinglesA = shinglesMap.get(urlA);

      for (let j = i + 1; j < urlList.length; j++) {
        const urlB = urlList[j];
        const shinglesB = shinglesMap.get(urlB);

        const score = jaccard(shinglesA, shinglesB);
        if (score > 0.65) {
          nearDuplicates.push({
            urlA,
            urlB,
            similarityScore: Math.round(score * 100),
            reason: `High lexical overlap (${Math.round(score * 100)}% 3-gram similarity). Possible template duplication.`
          });
        }
      }
    }

    return nearDuplicates;
  }

  /**
   * Detect internal linking opportunities across all articles
   */
  findInternalLinkingOpportunities(auditedArticles) {
    const opportunities = [];

    // Build entity topic dictionary
    const topics = [];
    for (const art of auditedArticles) {
      if (art.finalStatus === 200 && art.title && art.requestedUrl.includes('/blog/')) {
        // Clean title into a clean keyword target
        const cleanTitle = art.title
          .replace(/—\s*Aniket Thakur.*/i, '')
          .replace(/:\s*Choose for.*/i, '')
          .replace(/:\s*How to.*/i, '')
          .trim();

        if (cleanTitle.length >= 10) {
          topics.push({
            targetUrl: art.requestedUrl,
            targetTitle: cleanTitle,
            keyword: cleanTitle.toLowerCase()
          });
        }
      }
    }

    // Now check if other articles mention this keyword but don't link to the targetUrl
    for (const art of auditedArticles) {
      if (!art.bodySnippet || art.finalStatus !== 200) continue;
      const lowerSnippet = art.bodySnippet.toLowerCase();
      const existingLinks = new Set(art.internalLinks || []);

      for (const topic of topics) {
        if (topic.targetUrl === art.requestedUrl) continue;
        if (existingLinks.has(topic.targetUrl)) continue; // Already linked!

        if (lowerSnippet.includes(topic.keyword)) {
          opportunities.push({
            sourceUrl: art.requestedUrl,
            sourceTitle: art.title,
            targetUrl: topic.targetUrl,
            targetTitle: topic.targetTitle,
            keyword: topic.keyword,
            recommendation: `Add contextual internal hyperlink to '${topic.targetTitle}' using anchor text related to '${topic.keyword}'.`
          });

          if (opportunities.length >= 100) break; // Limit to 100 high-value suggestions
        }
      }
      if (opportunities.length >= 100) break;
    }

    return opportunities;
  }

  /**
   * Deep content audit for a single page
   */
  auditArticle(url, title, h1, bodyText, wordCount, hasTable, hasCode, externalLinksCount, internalLinks) {
    const intent = this.classifySearchIntent(url, title, h1, bodyText);
    const repetitive = this.detectRepetitiveParagraphs(bodyText);
    const hasSources = (bodyText || '').includes('Sources') || (bodyText || '').includes('References');
    const factualClaims = this.detectUnsupportedFactualClaims(bodyText, externalLinksCount, hasTable, hasSources);
    const completeness = this.evaluateTechnicalCompleteness(intent.intent, wordCount, hasCode, hasTable, externalLinksCount);

    let contentTier = 'HIGH_SUBSTANCE';
    if (wordCount < 300) contentTier = 'THIN';
    else if (wordCount < 600) contentTier = 'MODERATE';

    const qualityWarnings = [];
    if (contentTier === 'THIN' && !url.endsWith('/') && !url.includes('/about/') && !url.includes('/contact/')) {
      qualityWarnings.push(`Thin content warning: Article has only ${wordCount} words.`);
    }
    if (repetitive.hasRepetition) {
      qualityWarnings.push(`Repetitive content: ${repetitive.duplicateParagraphsCount} duplicate paragraph(s) detected.`);
    }
    if (factualClaims.riskLevel === 'HIGH') {
      qualityWarnings.push(factualClaims.warning);
    }
    if (completeness.hasMissingExamples) {
      qualityWarnings.push(...completeness.issues);
    }

    return {
      url,
      searchIntent: intent.intent,
      primaryNeed: intent.primaryNeed,
      contentTier,
      wordCount,
      repetitiveParagraphs: repetitive,
      factualClaims,
      technicalCompleteness: completeness,
      qualityWarnings,
      qualityScore: Math.max(20, 100 - (qualityWarnings.length * 20))
    };
  }
}
