import fs from "node:fs";
import path from "node:path";
import { projects } from "../lib/projects.ts";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { readArticles } = require("../../../tools/blog/content.js");
fs.mkdirSync("generated/articles", { recursive: true });
const rawArticles = readArticles();
fs.writeFileSync("generated/posts.json", JSON.stringify(rawArticles));

const catalog = rawArticles.map((p) => ({
  title: p.title,
  seoTitle: p.seoTitle,
  slug: p.slug,
  description: p.description,
  category: p.category,
  tags: p.tags || [],
  author: p.author,
  datePublished: p.datePublished,
  dateModified: p.dateModified,
  coverImage: p.coverImage,
  coverImageAlt: p.coverImageAlt,
  draft: Boolean(p.draft),
  enquiry: Boolean(p.enquiry),
  width: p.width || 1200,
  height: p.height || 675,
  readingTime: p.readingTime || 5,
  featured: Boolean(p.featured),
  publishOrder: p.publishOrder,
  hasFaq: Boolean(p.faqItems?.length),
  hasQuickAnswer: Boolean(p.quickAnswer),
}));
fs.writeFileSync("generated/posts-catalog.json", JSON.stringify(catalog));

const searchIndex = rawArticles.map((p) => ({
  title: p.title,
  slug: p.slug,
  category: p.category,
  description: p.description,
  tags: p.tags || [],
  datePublished: p.datePublished,
  readingTime: p.readingTime || 5,
}));
fs.writeFileSync("generated/search-index.json", JSON.stringify(searchIndex));

for (const p of rawArticles) {
  const catDir = path.join("generated/articles", p.category);
  fs.mkdirSync(catDir, { recursive: true });
  fs.writeFileSync(path.join(catDir, `${p.slug}.json`), JSON.stringify(p));
}
if (fs.existsSync("../../data/articles_manifest.json")) {
  fs.copyFileSync("../../data/articles_manifest.json", "generated/articles_manifest.json");
}
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

const { generateAllSitemaps, writeSitemapsToDirectory } = require("../../../tools/seo/sitemap-builder.js");
const sitemaps = generateAllSitemaps({
  posts: rawArticles,
  projects,
  origin: process.env.CANONICAL_ORIGIN || "https://aniket.app",
});
writeSitemapsToDirectory(out, sitemaps.files);

const publicRouteReplacements = [
  ["/about.html", "/about/"],
  ["/contact.html", "/contact/"],
  ["/privacy.html", "/privacy/"],
  ["/work.html", "/projects/"],
  ["/author/aniket-thakur.html", "/author/aniket-thakur/"],
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
      "https://aniket.app/author/aniket-thakur.html",
      "https://aniket.app/author/aniket-thakur/",
    )
    .replaceAll(
      "https%3A%2F%2F07anishu12.github.io",
      "https%3A%2F%2Faniket.app",
    )
    .replaceAll("https://07anishu12.github.io/about.html", "/about/");
  fs.writeFileSync(file, html);
}

const authorSource = path.join(out, "author/aniket-thakur.html");
const authorDir = path.join(out, "author/aniket-thakur");
if (fs.existsSync(authorSource)) {
  fs.mkdirSync(authorDir, { recursive: true });
  fs.copyFileSync(authorSource, path.join(authorDir, "index.html"));
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
