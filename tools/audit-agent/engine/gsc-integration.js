/**
 * Google Search Console (GSC) API Integration Module
 *
 * STRICT REQUIREMENT:
 * "Never invent GSC data.
 * Without authorization, produce a separate technical audit and clearly label Google indexing status as unknown."
 */

import fs from 'node:fs';
import path from 'node:path';

export class GscIntegration {
  constructor(options = {}) {
    this.origin = (options.origin || 'https://aniket.app').replace(/\/$/, '');
    this.siteUrl = options.siteUrl || `${this.origin}/`;
    this.clientId = process.env.GSC_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || null;
    this.clientSecret = process.env.GSC_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || null;
    this.refreshToken = process.env.GSC_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN || null;
    this.accessToken = null;
    this.isAuthorized = false;
    this.authError = null;
    this.grantedScopes = [];
  }

  /**
   * Initializes credentials and tests OAuth authorization
   */
  async authenticate() {
    // If credentials are not in process.env, check .env.local
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
          const env = fs.readFileSync(envPath, 'utf8');
          const mId = env.match(/GOOGLE_CLIENT_ID="?([^"\n]+)"?/);
          const mSec = env.match(/GOOGLE_CLIENT_SECRET="?([^"\n]+)"?/);
          const mRef = env.match(/GOOGLE_REFRESH_TOKEN="?([^"\n]+)"?/);
          if (mId) this.clientId = mId[1];
          if (mSec) this.clientSecret = mSec[1];
          if (mRef) this.refreshToken = mRef[1];
        }
      } catch {
        // ignore
      }
    }

    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      this.isAuthorized = false;
      this.authError = 'No Google Search Console OAuth credentials found in environment (.env.local or process.env).';
      return this.getStatusSummary();
    }

    // Exchange refresh token for access token to verify Search Console scopes
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token'
      });

      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        this.isAuthorized = false;
        this.authError = `OAuth token refresh failed: ${tokenData.error} (${tokenData.error_description || 'Token expired or revoked'})`;
        return this.getStatusSummary();
      }

      this.accessToken = tokenData.access_token;
      this.grantedScopes = (tokenData.scope || '').split(' ').filter(Boolean);

      const hasGscScope = this.grantedScopes.some(s =>
        s.includes('webmasters') || s.includes('searchconsole')
      );

      if (!hasGscScope) {
        this.isAuthorized = false;
        this.authError = `OAuth token is active but lacks Search Console scopes. Granted scopes: ${this.grantedScopes.join(', ')}. Required: https://www.googleapis.com/auth/webmasters.readonly`;
        return this.getStatusSummary();
      }

      this.isAuthorized = true;
      return this.getStatusSummary();
    } catch (err) {
      this.isAuthorized = false;
      this.authError = `GSC Authentication network failure: ${err.message}`;
      return this.getStatusSummary();
    }
  }

  /**
   * Retrieves live sitemap processing status if authorized
   */
  async getSitemaps() {
    if (!this.isAuthorized) {
      return { status: 'UNKNOWN', message: 'GSC API not authorized. Indexing status is unknown.' };
    }

    try {
      const encodedSite = encodeURIComponent(this.siteUrl);
      const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      return await res.json();
    } catch (err) {
      return { error: err.message };
    }
  }

  /**
   * Inspect a specific URL via GSC URL Inspection API
   */
  async inspectUrl(inspectionUrl) {
    if (!this.isAuthorized) {
      return {
        url: inspectionUrl,
        indexingStatus: 'UNKNOWN',
        reason: 'Google Search Console authorization required'
      };
    }

    try {
      const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inspectionUrl,
          siteUrl: this.siteUrl
        })
      });
      return await res.json();
    } catch (err) {
      return { url: inspectionUrl, error: err.message };
    }
  }

  getStatusSummary() {
    return {
      connected: this.isAuthorized,
      authStatus: this.isAuthorized ? 'AUTHORIZED' : 'UNAUTHORIZED',
      siteUrl: this.siteUrl,
      grantedScopes: this.grantedScopes,
      authError: this.authError,
      indexingStatusLabel: this.isAuthorized
        ? 'Verified via Google Search Console API'
        : 'Unknown (Google Search Console API authorization required)',
      configurationNotice: this.isAuthorized
        ? 'Active OAuth integration confirmed.'
        : 'To query live Google Search Console indexing state, grant https://www.googleapis.com/auth/webmasters.readonly and update GSC_REFRESH_TOKEN.'
    };
  }
}
