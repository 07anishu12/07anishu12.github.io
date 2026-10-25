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
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
// This directory contains only generated, gitignored public artifacts.
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
// Reuse the existing publisher's public allowlist and draft-image isolation.
fs.cpSync(path.join(root, "_site"), out, { recursive: true });

const sitemapPath = path.join(out, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let xml = fs.readFileSync(sitemapPath, "utf8");
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  const seen = new Set();
  const removed = new Set([
    "/about",
    "/about.html",
    "/contact",
    "/contact.html",
    "/privacy",
    "/privacy.html",
    "/work.html",
    "/index.html",
  ]);
  const origin = process.env.CANONICAL_ORIGIN || "https://aniket.app";
  const normalizePath = (value) => {
    const url = new URL(value);
    if (
      url.pathname !== "/" &&
      !url.pathname.endsWith("/") &&
      !path.extname(url.pathname)
    )
      url.pathname += "/";
    return `${origin}${url.pathname}`;
  };
  const normalized = blocks
    .map((block) => {
      const source = block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1];
      if (!source) return null;
      const loc = normalizePath(source);
      if (removed.has(new URL(loc).pathname) || seen.has(loc)) return null;
      seen.add(loc);
      const lastmod = block.match(
        /<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/,
      )?.[1];
      return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
    })
    .filter(Boolean);
  const paths = [
    "/about/",
    "/work/",
    "/projects/",
    "/research/",
    "/contact/",
    "/privacy/",
    "/finance/bikes/",
    ...projects.map((p) => `/projects/${p.slug}/`),
  ];
  for (const p of paths) {
    const url = `${origin}${p}`;
    if (!seen.has(url)) {
      seen.add(url);
      normalized.push(`<url><loc>${url}</loc></url>`);
    }
  }
  xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${normalized.map((entry) => `  ${entry}`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml);
}

const publicRouteReplacements = [
  ["/about.html", "/about/"],
  ["/contact.html", "/contact/"],
  ["/privacy.html", "/privacy/"],
  ["/work.html", "/projects/"],
];
for (const file of walk(out).filter((value) => value.endsWith(".html"))) {
  let html = fs.readFileSync(file, "utf8");
  for (const [from, to] of publicRouteReplacements)
    html = html.replaceAll(`href="${from}"`, `href="${to}"`);
  html = html
    .replaceAll(
      "https://aniket.app/projects/index.html",
      "https://aniket.app/projects/",
    )
    .replaceAll(
      "https://aniket.app/research/index.html",
      "https://aniket.app/research/",
    )
    .replaceAll(
      "https://aniket.app/topics/index.html",
      "https://aniket.app/topics/",
    )
    .replaceAll(
      "https%3A%2F%2F07anishu12.github.io",
      "https%3A%2F%2Faniket.app",
    )
    .replaceAll("https://07anishu12.github.io/about.html", "/about/");
  fs.writeFileSync(file, html);
}

const llmsPath = path.join(out, "llms.txt");
if (fs.existsSync(llmsPath)) {
  let llms = fs.readFileSync(llmsPath, "utf8");
  for (const [from, to] of [
    ["/about.html", "/about/"],
    ["/work.html", "/projects/"],
    ["/research/index.html", "/research/"],
    ["/contact.html", "/contact/"],
    ["/privacy.html", "/privacy/"],
  ])
    llms = llms.replaceAll(from, to);
  fs.writeFileSync(llmsPath, llms);
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
