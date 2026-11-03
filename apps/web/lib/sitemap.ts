import catalog from "../generated/posts-catalog.json";
import { projects } from "./projects";

export const ORIGIN = process.env.CANONICAL_ORIGIN || "https://aniket.app";

export const SITEMAP_SCHEMAS = {
  sitemapindex: "http://www.sitemaps.org/schemas/sitemap/0.9",
  urlset: "http://www.sitemaps.org/schemas/sitemap/0.9",
} as const;

export type SitemapGroupId =
  | "pages"
  | "blog-categories"
  | "blog-technology"
  | "blog-automotive"
  | "blog-product"
  | "blog-finance"
  | "projects"
  | "author"
  | "tools";

export interface SitemapConfig {
  id: SitemapGroupId;
  filename: string;
  description: string;
}

export const SITEMAP_CONFIGS: SitemapConfig[] = [
  {
    id: "pages",
    filename: "sitemap-pages.xml",
    description: "Homepage and static website pages",
  },
  {
    id: "blog-categories",
    filename: "sitemap-blog-categories.xml",
    description: "Blog index and category listing pages",
  },
  {
    id: "blog-technology",
    filename: "sitemap-blog-technology.xml",
    description: "Technology articles",
  },
  {
    id: "blog-automotive",
    filename: "sitemap-blog-automotive.xml",
    description: "Automotive articles",
  },
  {
    id: "blog-product",
    filename: "sitemap-blog-product.xml",
    description: "Product management articles",
  },
  {
    id: "blog-finance",
    filename: "sitemap-blog-finance.xml",
    description: "Finance articles",
  },
  {
    id: "projects",
    filename: "sitemap-projects.xml",
    description: "Portfolio projects and case studies",
  },
  {
    id: "author",
    filename: "sitemap-author.xml",
    description: "Author profile pages",
  },
  {
    id: "tools",
    filename: "sitemap-tools.xml",
    description: "Financial calculators and other tools",
  },
];

export const STATIC_PAGE_DATES: Record<string, string> = {
  "/": "2026-10-30",
  "/about/": "2026-10-25",
  "/work/": "2026-10-30",
  "/research/": "2026-10-25",
  "/research/graph-neural-networks-ecological-modeling.html": "2026-10-25",
  "/contact/": "2026-10-25",
  "/privacy/": "2026-10-25",
};

export const CATEGORY_MAP: Record<string, SitemapGroupId> = {
  technology: "blog-technology",
  auto: "blog-automotive",
  product: "blog-product",
  finance: "blog-finance",
};

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

export function escapeXml(unsafe: string): string {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export function normalizeUrl(urlOrPath: string, origin = ORIGIN): string {
  let u: URL;
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    u = new URL(urlOrPath);
  } else {
    u = new URL(urlOrPath, origin);
  }
  let pathname = u.pathname;
  if (pathname !== "/" && !pathname.endsWith("/") && !pathname.includes(".")) {
    pathname += "/";
  }
  return `${origin}${pathname}`;
}

export function formatIsoTimestamp(dateStr?: string): string {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T00:00:00+05:30`;
  }
  return dateStr;
}

export function buildUrlsetXml(entries: SitemapEntry[]): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${SITEMAP_SCHEMAS.urlset}">`,
  ];
  for (const entry of entries) {
    if (entry.lastmod) {
      lines.push("  <url>");
      lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
      lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
      lines.push("  </url>");
    } else {
      lines.push("  <url>");
      lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
      lines.push("  </url>");
    }
  }
  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}

export function buildSitemapIndexXml(
  sitemaps: { loc: string; lastmod?: string }[],
): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<sitemapindex xmlns="${SITEMAP_SCHEMAS.sitemapindex}">`,
  ];
  for (const sm of sitemaps) {
    lines.push("  <sitemap>");
    lines.push(`    <loc>${escapeXml(sm.loc)}</loc>`);
    if (sm.lastmod) {
      lines.push(`    <lastmod>${escapeXml(sm.lastmod)}</lastmod>`);
    }
    lines.push("  </sitemap>");
  }
  lines.push("</sitemapindex>");
  return lines.join("\n") + "\n";
}

/**
 * Returns grouped sitemap entries from application data.
 */
export function getSitemapGroups(origin = ORIGIN): Map<SitemapGroupId, SitemapEntry[]> {
  const groups = new Map<SitemapGroupId, SitemapEntry[]>();
  for (const config of SITEMAP_CONFIGS) {
    groups.set(config.id, []);
  }

  // 1. Pages
  for (const [pathname, lastmod] of Object.entries(STATIC_PAGE_DATES)) {
    groups.get("pages")!.push({
      loc: normalizeUrl(pathname, origin),
      lastmod,
    });
  }

  // Find latest dates per category
  const categoryDates: Record<string, string> = {};
  for (const p of catalog) {
    if (p.draft) continue;
    const cat = p.category;
    const date = p.dateModified || p.datePublished;
    if (date) {
      if (!categoryDates[cat] || date > categoryDates[cat]) {
        categoryDates[cat] = date;
      }
      if (!categoryDates.all || date > categoryDates.all) {
        categoryDates.all = date;
      }
    }
  }

  // 2. Blog categories
  groups.get("blog-categories")!.push({
    loc: normalizeUrl("/blog/", origin),
    lastmod: categoryDates.all || "2026-10-31",
  });
  for (const cat of ["technology", "auto", "product", "finance"]) {
    const hasPosts = catalog.some((p) => !p.draft && p.category === cat);
    if (hasPosts) {
      groups.get("blog-categories")!.push({
        loc: normalizeUrl(`/blog/${cat}/`, origin),
        lastmod: categoryDates[cat] || categoryDates.all || "2026-10-31",
      });
    }
  }

  // 3-6. Individual articles
  for (const p of catalog) {
    if (p.draft) continue;
    const groupId = CATEGORY_MAP[p.category];
    if (groupId && groups.has(groupId)) {
      groups.get(groupId)!.push({
        loc: normalizeUrl(`/blog/${p.category}/${p.slug}/`, origin),
        lastmod: p.dateModified || p.datePublished,
      });
    }
  }

  // 7. Projects
  groups.get("projects")!.push({
    loc: normalizeUrl("/projects/", origin),
    lastmod: "2026-10-30",
  });
  for (const p of projects) {
    groups.get("projects")!.push({
      loc: normalizeUrl(`/projects/${p.slug}/`, origin),
      lastmod: "2026-10-30",
    });
  }

  // 8. Author
  groups.get("author")!.push({
    loc: normalizeUrl("/author/aniket-thakur/", origin),
    lastmod: "2026-10-25",
  });

  // 9. Tools
  groups.get("tools")!.push({
    loc: normalizeUrl("/finance/bikes/", origin),
    lastmod: "2026-10-25",
  });

  return groups;
}

/**
 * Returns XML for a specific child sitemap group.
 */
export function getSitemapXml(groupId: SitemapGroupId, origin = ORIGIN): string | null {
  const groups = getSitemapGroups(origin);
  const entries = groups.get(groupId);
  if (!entries || entries.length === 0) return null;
  return buildUrlsetXml(entries);
}

/**
 * Returns XML for the parent sitemap index.
 */
export function getSitemapIndexXml(origin = ORIGIN): string {
  const groups = getSitemapGroups(origin);
  const sitemaps: { loc: string; lastmod?: string }[] = [];

  for (const config of SITEMAP_CONFIGS) {
    const entries = groups.get(config.id) || [];
    if (entries.length === 0) continue;

    const dates = entries
      .map((e) => e.lastmod)
      .filter((d): d is string => Boolean(d))
      .sort();
    const latestDate = dates.length ? dates[dates.length - 1] : undefined;

    sitemaps.push({
      loc: `${origin}/${config.filename}`,
      lastmod: formatIsoTimestamp(latestDate),
    });
  }

  return buildSitemapIndexXml(sitemaps);
}
