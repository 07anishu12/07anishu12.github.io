/**
 * Robots.txt Parser & Compliance Engine
 * Evaluates crawling permissions for Googlebot, Googlebot Smartphone, and universal crawlers.
 */

import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

export class RobotsParser {
  constructor(origin = 'https://aniket.app') {
    this.origin = origin.replace(/\/$/, '');
    this.robotsUrl = `${this.origin}/robots.txt`;
    this.rawText = '';
    this.statusCode = null;
    this.sitemaps = [];
    this.rules = {
      googlebot: { allows: [], disallows: [] },
      googlebotMobile: { allows: [], disallows: [] },
      universal: { allows: [], disallows: [] }
    };
  }

  async fetchAndParse() {
    return new Promise((resolve) => {
      const u = new URL(this.robotsUrl);
      const client = u.protocol === 'https:' ? https : http;

      const req = client.get(this.robotsUrl, { timeout: 10000 }, (res) => {
        this.statusCode = res.statusCode;
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          this.rawText = body;
          this.parse(body);
          resolve(this.getSummary());
        });
      });

      req.on('error', (err) => {
        this.statusCode = 500;
        this.rawText = '';
        resolve(this.getSummary(err.message));
      });
    });
  }

  parse(text) {
    const lines = text.split(/\r?\n/);
    let currentAgents = [];

    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;

      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;

      const directive = line.slice(0, colonIdx).trim().toLowerCase();
      const value = line.slice(colonIdx + 1).trim();

      if (directive === 'sitemap') {
        if (!this.sitemaps.includes(value)) {
          this.sitemaps.push(value);
        }
      } else if (directive === 'user-agent') {
        const agent = value.toLowerCase();
        currentAgents = [agent];
      } else if (directive === 'allow' || directive === 'disallow') {
        const isAllow = directive === 'allow';
        for (const agent of currentAgents) {
          if (agent === 'googlebot') {
            if (isAllow) this.rules.googlebot.allows.push(value);
            else this.rules.googlebot.disallows.push(value);
          } else if (agent === 'googlebot-mobile' || agent === 'googlebot-smartphone') {
            if (isAllow) this.rules.googlebotMobile.allows.push(value);
            else this.rules.googlebotMobile.disallows.push(value);
          } else if (agent === '*') {
            if (isAllow) this.rules.universal.allows.push(value);
            else this.rules.universal.disallows.push(value);
          }
        }
      }
    }
  }

  isAllowed(pathname, userAgent = 'googlebot') {
    const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const agentRules = (userAgent.toLowerCase().includes('googlebot'))
      ? (this.rules.googlebot.disallows.length ? this.rules.googlebot : this.rules.universal)
      : this.rules.universal;

    // Check specific allows first
    for (const allow of agentRules.allows) {
      if (allow && cleanPath.startsWith(allow)) return true;
    }

    // Check disallows
    for (const disallow of agentRules.disallows) {
      if (disallow && cleanPath.startsWith(disallow)) return false;
    }

    return true;
  }

  getSummary(error = null) {
    return {
      robotsUrl: this.robotsUrl,
      statusCode: this.statusCode,
      accessible: this.statusCode === 200,
      sitemapsFound: this.sitemaps,
      rulesParsed: {
        googlebot: {
          allowsCount: this.rules.googlebot.allows.length,
          disallowsCount: this.rules.googlebot.disallows.length,
          disallows: this.rules.googlebot.disallows
        },
        universal: {
          allowsCount: this.rules.universal.allows.length,
          disallowsCount: this.rules.universal.disallows.length,
          disallows: this.rules.universal.disallows
        }
      },
      error
    };
  }
}
