import { notFound } from "next/navigation";
import { getPaginatedPosts } from "./blog";

export type ArchiveParams = { page?: string | string[]; q?: string | string[] };

export function archiveState(category: string, params: ArchiveParams = {}) {
  const raw = params.page;
  if (raw !== undefined && (typeof raw !== "string" || !/^[1-9]\d*$/.test(raw))) notFound();
  const page = Number(raw ?? 1);
  if (!Number.isSafeInteger(page)) notFound();
  if (Array.isArray(params.q)) notFound();
  const query = (params.q ?? "").trim();
  const result = getPaginatedPosts({ category, page, pageSize: 12, query });
  if (page > result.totalPages) notFound();
  if (category !== "all" && !result.categories.includes(category)) notFound();
  const base = category === "all" ? "/blog/" : `/blog/${category}/`;
  // Search results are not indexable; archive pagination remains self-canonical.
  const canonical = query || page === 1 ? base : `${base}?page=${page}`;
  return { ...result, page, query, canonical };
}
