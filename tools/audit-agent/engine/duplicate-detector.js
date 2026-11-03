/**
 * Comprehensive Duplicate URL & Canonicalization Detector
 * Explicitly audits:
 * - / vs /index.html
 * - www vs non-www (including SSL SAN verification)
 * - HTTP vs HTTPS
 * - Trailing slash variations
 * - Duplicate article slugs across categories
 * - Duplicate title tags
 * - Duplicate canonical URLs
 * - Inconsistent canonicalization chains
 */

import https from 'node:https';
import http from 'node:http';
import tls from 'node:tls';
import { URL } from 'node:url';
import { HttpAuditor } from './http-auditor.js';

export class DuplicateDetector {
  constructor(origin = 'https://aniket.app', auditor = null) {
    this.origin = origin.replace(/\/$/, '');
    this.auditor = auditor || new HttpAuditor({ origin: this.origin });
  }

  /**
   * Directly inspects SSL certificate Subject Alternative Names (SAN)
   */
  async checkSslCert(hostname) {
    return new Promise((resolve) => {
      const socket = tls.connect(443, hostname, { servername: hostname, rejectUnauthorized: false }, () => {
        const cert = socket.getPeerCertificate();
        const altNames = cert.subjectaltname || '';
        const validForHost = altNames.includes(hostname) || (cert.subject && cert.subject.CN === hostname);
        socket.end();
        resolve({
          hostname,
          validForHost,
          subjectCN: cert.subject?.CN || null,
          subjectAltNames: altNames,
          validFrom: cert.valid_from,
          validTo: cert.valid_to
        });
      });
      socket.on('error', (err) => {
        resolve({
          hostname,
          validForHost: false,
          error: err.message
        });
      });
      socket.setTimeout(8000, () => {
        socket.destroy();
        resolve({ hostname, validForHost: false, error: 'TLS connection timeout' });
      });
    });
  }

  /**
   * Directly probes and tests the critical root and protocol variations
   */
  async probeInfrastructureVariations() {
    const variations = [
      { name: 'Root vs index.html', testUrl: `${this.origin}/index.html`, expectedCanonical: `${this.origin}/` },
      { name: 'HTTP vs HTTPS', testUrl: `http://aniket.app/`, expectedCanonical: `${this.origin}/` },
      { name: 'WWW vs Non-WWW', testUrl: `https://www.aniket.app/`, expectedCanonical: `${this.origin}/` },
      { name: 'Trailing slash on /about', testUrl: `${this.origin}/about`, expectedTarget: `${this.origin}/about/` },
      { name: 'Trailing slash on /projects', testUrl: `${this.origin}/projects`, expectedTarget: `${this.origin}/projects/` },
      { name: 'Trailing slash on /blog', testUrl: `${this.origin}/blog`, expectedTarget: `${this.origin}/blog/` },
      { name: 'Static .html on /about.html', testUrl: `${this.origin}/about.html`, expectedTarget: `${this.origin}/about/` },
      { name: 'Static .html on /work.html', testUrl: `${this.origin}/work.html`, expectedTarget: `${this.origin}/projects/` }
    ];

    const probeResults = [];

    // Check SSL cert for www
    const wwwSsl = await this.checkSslCert('www.aniket.app');

    for (const v of variations) {
      if (v.name === 'WWW vs Non-WWW' && !wwwSsl.validForHost) {
        probeResults.push({
          variation: v.name,
          requestedUrl: v.testUrl,
          initialStatus: 'SSL_ERR',
          finalUrl: v.testUrl,
          finalStatus: 526, // SSL Handshake Failed
          canonicalUrl: null,
          canonicalStatus: 'ssl-failure',
          issue: `SSL Certificate Name Mismatch: The TLS certificate served by Vercel for www.aniket.app only contains SAN '${wwwSsl.subjectAltNames}'. It lacks 'www.aniket.app'. Any client or search crawler accessing https://www.aniket.app triggers ERR_CERT_COMMON_NAME_INVALID before HTTP redirects can execute.`,
          severity: 'P0',
          sslDetails: wwwSsl
        });
        continue;
      }

      const audit = await this.auditor.auditUrl(v.testUrl);
      const isRedirectedProperly = audit.isRedirect && (audit.finalStatus === 200);
      const redirectStatusCode = audit.redirectChain[0]?.status;

      let issue = null;
      let severity = 'PASS';

      if (v.name === 'Root vs index.html') {
        if (!audit.isRedirect && audit.finalStatus === 200) {
          issue = 'index.html is directly served with HTTP 200 instead of a 308 permanent redirect to root (/). Causes split-URL duplicate content indexation risk.';
          severity = 'P0';
        }
      } else if (v.name === 'WWW vs Non-WWW') {
        if (redirectStatusCode === 307) {
          issue = 'www.aniket.app redirects with HTTP 307 (Temporary Redirect) instead of HTTP 301/308 (Permanent Redirect). Search engines do not transfer link equity across 307 redirects.';
          severity = 'P1';
        } else if (!audit.isRedirect) {
          issue = 'www.aniket.app does not redirect to apex domain.';
          severity = 'P0';
        }
      } else if (v.name === 'HTTP vs HTTPS') {
        if (!audit.isRedirect) {
          issue = 'HTTP does not redirect to HTTPS.';
          severity = 'P0';
        } else if (redirectStatusCode !== 301 && redirectStatusCode !== 308) {
          issue = `HTTP redirects with ${redirectStatusCode} instead of 301/308 permanent redirect.`;
          severity = 'P1';
        }
      } else if (v.name.startsWith('Trailing slash')) {
        if (redirectStatusCode !== 301 && redirectStatusCode !== 308) {
          issue = `Non-trailing slash route redirects with ${redirectStatusCode} instead of 301/308.`;
          severity = 'P1';
        }
      }

      probeResults.push({
        variation: v.name,
        requestedUrl: v.testUrl,
        initialStatus: redirectStatusCode || audit.finalStatus,
        finalUrl: audit.finalUrl,
        finalStatus: audit.finalStatus,
        canonicalUrl: audit.canonicalUrl,
        canonicalStatus: audit.canonicalStatus,
        issue,
        severity
      });
    }

    return probeResults;
  }

  /**
   * Analyzes all crawled URLs for slug, title, and canonical duplicates
   */
  analyzeCrawlInventory(auditedUrls) {
    const urls = Array.from(auditedUrls.values());

    // 1. Slug analysis
    const slugMap = new Map();
    for (const item of urls) {
      try {
        const u = new URL(item.requestedUrl);
        const segments = u.pathname.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment && lastSegment !== 'index.html') {
          const list = slugMap.get(lastSegment) || [];
          list.push(item.requestedUrl);
          slugMap.set(lastSegment, list);
        }
      } catch {
        // ignore
      }
    }
    const duplicateSlugs = Array.from(slugMap.entries())
      .filter(([_, list]) => list.length > 1)
      .map(([slug, instances]) => ({ slug, count: instances.length, instances }));

    // 2. Duplicate Titles
    const titleMap = new Map();
    for (const item of urls) {
      if (item.title && item.finalStatus === 200) {
        const norm = item.title.trim().toLowerCase().replace(/\s+/g, ' ');
        const list = titleMap.get(norm) || [];
        list.push({ url: item.requestedUrl, title: item.title });
        titleMap.set(norm, list);
      }
    }
    const duplicateTitles = Array.from(titleMap.entries())
      .filter(([_, list]) => list.length > 1)
      .map(([normTitle, instances]) => ({
        normalizedTitle: normTitle,
        count: instances.length,
        instances
      }));

    // 3. Duplicate Canonical URLs
    const canonicalMap = new Map();
    for (const item of urls) {
      if (item.canonicalUrl && item.finalStatus === 200) {
        const normCanon = item.canonicalUrl.trim();
        const list = canonicalMap.get(normCanon) || [];
        list.push(item.requestedUrl);
        canonicalMap.set(normCanon, list);
      }
    }
    const duplicateCanonicals = Array.from(canonicalMap.entries())
      .filter(([_, list]) => list.length > 1)
      .map(([canonicalUrl, instances]) => ({
        canonicalUrl,
        count: instances.length,
        instances
      }));

    // 4. Inconsistent Canonicalization Check
    const inconsistentCanonicals = [];
    for (const item of urls) {
      if (item.finalStatus !== 200) continue;

      if (!item.canonicalUrl) {
        inconsistentCanonicals.push({
          url: item.requestedUrl,
          type: 'MISSING_CANONICAL',
          description: 'URL lacks a rel="canonical" link tag.'
        });
        continue;
      }

      if (item.canonicalUrl.startsWith('http://')) {
        inconsistentCanonicals.push({
          url: item.requestedUrl,
          type: 'INSECURE_CANONICAL',
          canonical: item.canonicalUrl,
          description: 'Canonical URL references non-secure HTTP instead of HTTPS.'
        });
      }

      try {
        const cUrl = new URL(item.canonicalUrl);
        if (cUrl.hostname !== 'aniket.app') {
          inconsistentCanonicals.push({
            url: item.requestedUrl,
            type: 'CROSS_DOMAIN_CANONICAL',
            canonical: item.canonicalUrl,
            description: `Canonical references external host (${cUrl.hostname}) instead of aniket.app.`
          });
        }
      } catch {
        inconsistentCanonicals.push({
          url: item.requestedUrl,
          type: 'MALFORMED_CANONICAL',
          canonical: item.canonicalUrl,
          description: 'Canonical URL is not a valid absolute URL.'
        });
      }

      const reqHasSlash = item.requestedUrl.endsWith('/');
      const canHasSlash = item.canonicalUrl.endsWith('/');
      if (reqHasSlash !== canHasSlash && !item.canonicalUrl.includes('.')) {
        inconsistentCanonicals.push({
          url: item.requestedUrl,
          type: 'TRAILING_SLASH_MISMATCH',
          canonical: item.canonicalUrl,
          description: `URL slash mismatch: requested='${item.requestedUrl}' vs canonical='${item.canonicalUrl}'.`
        });
      }
    }

    return {
      duplicateSlugsCount: duplicateSlugs.length,
      duplicateSlugs,
      duplicateTitlesCount: duplicateTitles.length,
      duplicateTitles,
      duplicateCanonicalsCount: duplicateCanonicals.length,
      duplicateCanonicals,
      inconsistentCanonicalsCount: inconsistentCanonicals.length,
      inconsistentCanonicals
    };
  }
}
