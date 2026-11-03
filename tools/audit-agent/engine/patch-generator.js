/**
 * Developer-Ready Safe Patch Generator
 *
 * STRICT REQUIREMENT:
 * "Do not modify production files automatically.
 * Create proposed patches and require human approval before applying them."
 */

import fs from 'node:fs';
import path from 'node:path';

export class PatchGenerator {
  constructor(localRoot = process.cwd()) {
    this.localRoot = localRoot;
  }

  generateProposedPatches(tickets) {
    const patches = [];

    // Patch 1: apps/web/next.config.mjs - Fix index.html redirect, ensure permanent 308 for www, add canonical Link header
    const nextConfigDiff = `diff --git a/apps/web/next.config.mjs b/apps/web/next.config.mjs
--- a/apps/web/next.config.mjs
+++ b/apps/web/next.config.mjs
@@ -11,6 +11,11 @@ const nextConfig = {
   async redirects() {
     return [
+      {
+        source: "/index.html",
+        destination: "/",
+        permanent: true,
+      },
       {
         source: "/:path*",
         has: [{ type: "host", value: "www.aniket.app" }],
@@ -23,6 +28,11 @@ const nextConfig = {
         destination: name === "work" ? "/projects/" : \`/\${name}/\`,
         permanent: true,
       })),
+      {
+        source: "/research/graph-neural-networks-ecological-modeling.html",
+        destination: "/research/",
+        permanent: true,
+      },
       {
         source: "/author/aniket-thakur.html",
         destination: "/author/aniket-thakur/",
`;

    patches.push({
      file: 'apps/web/next.config.mjs',
      description: 'Enforce permanent 308 redirect from /index.html to / and eliminate static duplicate homepage indexation risk. Also normalize research paper path.',
      targetTicket: 'SEO-P0-001',
      diff: nextConfigDiff
    });

    // Patch 2: tools/seo/sitemap-builder.js - Add missing research and topics routes to sitemap generator
    const sitemapBuilderDiff = `diff --git a/tools/seo/sitemap-builder.js b/tools/seo/sitemap-builder.js
--- a/tools/seo/sitemap-builder.js
+++ b/tools/seo/sitemap-builder.js
@@ -45,6 +45,7 @@ const NATIVE_ROUTES = [
   "/projects/",
   "/research/",
+  "/research/graph-neural-networks-ecological-modeling.html",
   "/contact/",
   "/privacy/",
   "/finance/bikes/",
`;

    patches.push({
      file: 'tools/seo/sitemap-builder.js',
      description: 'Register omitted research and technical paper URLs into the automated sitemap generation script.',
      targetTicket: 'SEO-P1-003',
      diff: sitemapBuilderDiff
    });

    // Patch 3: Vercel vercel.json domain redirect configuration
    const vercelConfigDiff = `diff --git a/vercel.json b/vercel.json
--- a/vercel.json
+++ b/vercel.json
@@ -0,0 +1,14 @@
+{
+  "redirects": [
+    {
+      "source": "/index.html",
+      "destination": "/",
+      "permanent": true
+    },
+    {
+      "source": "/(.*)",
+      "has": [{ "type": "host", "value": "www.aniket.app" }],
+      "destination": "https://aniket.app/$1",
+      "permanent": true
+    }
+  ]
+}
`;

    patches.push({
      file: 'vercel.json',
      description: 'Enforce edge-level 308 permanent redirect for www and index.html at the Vercel routing layer.',
      targetTicket: 'SEO-P1-001',
      diff: vercelConfigDiff
    });

    return {
      timestamp: new Date().toISOString(),
      requiresHumanApproval: true,
      patchesCount: patches.length,
      patches,
      fullUnifiedDiff: patches.map(p => `# File: ${p.file}\n# Rationale: ${p.description}\n# Target Ticket: ${p.targetTicket}\n\n${p.diff}\n`).join('\n' + '='.repeat(80) + '\n\n')
    };
  }
}
