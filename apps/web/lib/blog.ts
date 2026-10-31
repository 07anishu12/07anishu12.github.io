import fs from "node:fs";
import path from "node:path";
import catalog from "../generated/posts-catalog.json";
import { cacheAside, CacheKeys, CachePolicies } from "./cache";

export interface BlogPostSummary {
  title: string;
  seoTitle?: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  datePublished: string;
  dateModified?: string;
  coverImage: string;
  coverImageAlt: string;
  draft: boolean;
  enquiry?: boolean;
  width: number;
  height: number;
  readingTime?: number;
  featured?: boolean;
  publishOrder?: number;
  hasFaq?: boolean;
  hasQuickAnswer?: boolean;
}

export interface BlogPost extends BlogPostSummary {
  socialWidth?: number;
  socialHeight?: number;
  socialImage?: string;
  socialImageAlt?: string;
  sources: { title: string; url: string }[];
  imageCaption?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  headings: { id: string; text: string; level: string }[];
  quickAnswer?: {
    question: string;
    answer: string;
    facts: { label: string; value: string }[];
    goodFor: string[];
    watchFor: string[];
    note?: string;
  };
  faqItems?: { question: string; answer: string }[];
  html: string;
  body: string;
}

export const categoryDescriptions: Record<string, string> = {
  technology: "AI, software, gadgets, tutorials, comparisons, and explainers.",
  product:
    "Product discovery, experimentation, AI product execution, and product operations.",
  auto: "Cars, bikes, EVs, ownership costs, and automotive technology.",
  finance: "Personal finance, markets, fintech, and financial explainers.",
};

export const listPosts = (): BlogPostSummary[] =>
  catalog as BlogPostSummary[];

function resolveArticleFilePath(category: string, slug: string): string {
  const direct = path.join(
    process.cwd(),
    "generated",
    "articles",
    category,
    `${slug}.json`,
  );
  if (fs.existsSync(direct)) return direct;
  const webPath = path.join(
    process.cwd(),
    "apps",
    "web",
    "generated",
    "articles",
    category,
    `${slug}.json`,
  );
  if (fs.existsSync(webPath)) return webPath;
  return path.resolve(
    process.cwd(),
    "apps/web/generated/articles",
    category,
    `${slug}.json`,
  );
}

export function getPost(category: string, slug: string): BlogPost | undefined {
  const item = (catalog as BlogPostSummary[]).find(
    (p) =>
      p.category.toLowerCase() === category.toLowerCase() && p.slug === slug,
  );
  if (!item) return undefined;

  try {
    const filePath = resolveArticleFilePath(category, slug);
    if (!fs.existsSync(filePath)) return undefined;
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content) as BlogPost;
  } catch (error) {
    console.error(`[Blog] Failed to load article ${category}/${slug}:`, error);
    return undefined;
  }
}

export function getWritingPost(slug: string): BlogPost | undefined {
  const item = (catalog as BlogPostSummary[]).find(
    (p) => p.slug === slug,
  );
  if (!item) return undefined;
  return getPost(item.category, slug);
}

export async function getPostCached(
  category: string,
  slug: string,
): Promise<BlogPost | undefined> {
  const cacheKey = CacheKeys.article(category, slug);
  return cacheAside(cacheKey, async () => getPost(category, slug), {
    ttlSeconds: CachePolicies.ARTICLE_CONTENT,
  });
}

export interface PaginatedResult {
  posts: BlogPostSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  categories: string[];
  categoryCounts: Record<string, number>;
}

export function getPaginatedPosts({
  category = "all",
  page = 1,
  pageSize = 12,
  query = "",
}: {
  category?: string;
  page?: number;
  pageSize?: number;
  query?: string;
}): PaginatedResult {
  const all = listPosts();
  const q = query.trim().toLowerCase();

  const filtered = all.filter((p) => {
    const matchesCategory =
      category === "all" ||
      p.category.toLowerCase() === category.toLowerCase();
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * pageSize;
  const pagePosts = filtered.slice(start, start + pageSize);

  const categories = [...new Set(all.map((p) => p.category))];
  const categoryCounts: Record<string, number> = { all: all.length };
  for (const c of categories) {
    categoryCounts[c.toLowerCase()] = all.filter(
      (p) => p.category.toLowerCase() === c.toLowerCase(),
    ).length;
  }

  return {
    posts: pagePosts,
    total,
    page: currentPage,
    pageSize,
    totalPages,
    categories,
    categoryCounts,
  };
}

export const isLeadCapturePost = (post: {
  category: string;
  slug: string;
}): boolean => {
  if (post.category === "finance")
    return /(bike|scooter|two-wheeler|motorcycle)/.test(post.slug);
  if (post.category === "auto")
    return /(bike|scooter|two-wheeler|motorcycle|commuter|on-road|down-payment|loan|emi|ownership-cost)/.test(
      post.slug,
    );
  return false;
};
