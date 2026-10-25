import fs from "node:fs";
import path from "node:path";
import { projects } from "../lib/projects.ts";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { readArticles } = require("../../../tools/blog/content.js");
fs.mkdirSync("generated", { recursive: true });
fs.writeFileSync("generated/posts.json", JSON.stringify(readArticles()));
const root = path.resolve("../.."),
  out = path.resolve("public");
// This directory contains only generated, gitignored public artifacts.
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
// Reuse the existing publisher's public allowlist and draft-image isolation.
fs.cpSync(path.join(root, "_site"), out, { recursive: true });

const sitemapPath = path.join(out, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let xml = fs.readFileSync(sitemapPath, "utf8");
  const paths = [
    "/about",
    "/projects",
    "/research",
    "/contact",
    "/privacy",
    "/finance/bikes",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  for (const p of paths) {
    const url = `https://07anishu12.github.io${p}`;
    if (!xml.includes(`<loc>${url}</loc>`))
      xml = xml.replace("</urlset>", `<url><loc>${url}</loc></url></urlset>`);
  }
  fs.writeFileSync(sitemapPath, xml);
}

const configPath = path.join(out, "assets/js/site-config.js");
const publicApi = process.env.NEXT_PUBLIC_API_URL || "";
if (publicApi) {
  const parsed = new URL(publicApi);
  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  )
    throw new Error("NEXT_PUBLIC_API_URL must be a public origin");
}
fs.writeFileSync(
  configPath,
  fs
    .readFileSync(configPath, "utf8")
    .replace("apiBaseUrl: ''", `apiBaseUrl: ${JSON.stringify(publicApi)}`),
);
