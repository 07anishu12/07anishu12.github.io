"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";

export interface PostItem {
  title: string;
  description: string;
  category: string;
  slug: string;
  datePublished: string;
  coverImage?: string;
  coverImageAlt?: string;
  readingTime?: number;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  technology: "#1d4ed8",
  finance: "#15803d",
  auto: "#b45309",
  product: "#6b21a8",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export interface BlogIndexProps {
  posts?: PostItem[];
  initialPosts?: PostItem[];
  totalPosts?: number;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  categories: string[];
  categoryCounts?: Record<string, number>;
  activeCategory?: string;
  basePath?: string;
}

export function BlogIndex({
  posts,
  initialPosts,
  totalPosts: initialTotalPosts,
  currentPage: initialCurrentPage = 1,
  totalPages: initialTotalPages,
  pageSize = 12,
  categories,
  categoryCounts = {},
  activeCategory = "all",
  basePath = "/blog/",
}: BlogIndexProps) {
  // If legacy full posts array was passed, slice it
  const resolvedInitialPosts = useMemo(() => {
    if (initialPosts) return initialPosts;
    if (posts) {
      const filtered =
        activeCategory === "all"
          ? posts
          : posts.filter(
              (p) =>
                p.category.toLowerCase() === activeCategory.toLowerCase(),
            );
      const start = (initialCurrentPage - 1) * pageSize;
      return filtered.slice(start, start + pageSize);
    }
    return [];
  }, [initialPosts, posts, activeCategory, initialCurrentPage, pageSize]);

  const resolvedTotalPosts =
    initialTotalPosts ??
    (posts
      ? activeCategory === "all"
        ? posts.length
        : posts.filter(
            (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
          ).length
      : resolvedInitialPosts.length);

  const resolvedTotalPages =
    initialTotalPages ?? Math.max(1, Math.ceil(resolvedTotalPosts / pageSize));

  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<PostItem[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Lazy-load compact search index only when user focuses search bar or starts typing
  const loadSearchIndex = async () => {
    if (searchIndex !== null || isSearching) return;
    setIsSearching(true);
    try {
      const res = await fetch("/generated/search-index.json");
      if (res.ok) {
        const data = await res.json();
        setSearchIndex(data);
      }
    } catch (e) {
      console.warn("[Search] Could not load search index:", e);
    } finally {
      setIsSearching(false);
    }
  };

  // Compute displayed articles: search results if query present, else server-rendered initialPosts
  const { displayedArticles, isSearchActive, searchResultsCount } =
    useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return {
          displayedArticles: resolvedInitialPosts,
          isSearchActive: false,
          searchResultsCount: 0,
        };
      }

      const sourceList = searchIndex || posts || resolvedInitialPosts;
      const filtered = sourceList.filter((p) => {
        const matchesCat =
          activeCategory === "all" ||
          p.category.toLowerCase() === activeCategory.toLowerCase();
        if (!matchesCat) return false;
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      });

      return {
        displayedArticles: filtered,
        isSearchActive: true,
        searchResultsCount: filtered.length,
      };
    }, [query, resolvedInitialPosts, searchIndex, posts, activeCategory]);

  // Spotlight article for page 1 without search
  const showFeaturedHero =
    initialCurrentPage === 1 && !isSearchActive && displayedArticles.length > 0;
  const featuredPost = showFeaturedHero ? displayedArticles[0] : null;

  // Grid articles (exclude featured post if shown as hero)
  const gridArticles = useMemo(() => {
    if (showFeaturedHero) {
      return displayedArticles.slice(1);
    }
    return displayedArticles;
  }, [displayedArticles, showFeaturedHero]);

  const handleClearSearch = () => {
    setQuery("");
  };

  // Helper to generate crawlable pagination href
  const getPageHref = (pageNum: number) => {
    const cleanBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
    if (pageNum <= 1) return cleanBase;
    return `${cleanBase}?page=${pageNum}`;
  };

  return (
    <div className="blog-library-wrapper">
      {/* Category Navigation Pills (Semantic Links for Instant Crawlability) */}
      <nav
        className="blog-category-pills"
        aria-label="Filter articles by category"
      >
        <Link
          href="/blog/"
          className={`category-pill ${activeCategory === "all" ? "category-pill-active" : ""}`}
        >
          All Writing{" "}
          <span className="pill-badge">
            {categoryCounts.all || resolvedTotalPosts}
          </span>
        </Link>
        {categories.map((c) => {
          const count =
            categoryCounts[c.toLowerCase()] ??
            (posts
              ? posts.filter(
                  (p) => p.category.toLowerCase() === c.toLowerCase(),
                ).length
              : 0);
          const isActive = activeCategory.toLowerCase() === c.toLowerCase();
          return (
            <Link
              key={c}
              href={`/blog/${c.toLowerCase()}/`}
              className={`category-pill ${isActive ? "category-pill-active" : ""}`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}{" "}
              <span className="pill-badge">{count}</span>
            </Link>
          );
        })}
      </nav>

      {/* On-Demand Search Bar */}
      <div className="blog-search-container">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={searchInputRef}
            className="blog-search-input"
            id="article-search"
            type="search"
            value={query}
            onFocus={loadSearchIndex}
            onChange={(e) => {
              loadSearchIndex();
              setQuery(e.target.value);
            }}
            placeholder={`Search ${resolvedTotalPosts} guides, models, and systems...`}
            aria-label="Search technical library"
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Active Search Results Indicator */}
      {isSearchActive && (
        <div className="blog-search-results-bar">
          <span>
            Found <strong>{searchResultsCount}</strong>{" "}
            {searchResultsCount === 1 ? "article" : "articles"} matching "
            <em>{query}</em>"
          </span>
          <button
            type="button"
            className="search-results-clear"
            onClick={handleClearSearch}
          >
            Reset to Page View
          </button>
        </div>
      )}

      {/* Spotlight / Featured Article (Page 1 Only) */}
      {showFeaturedHero && featuredPost && (
        <section
          className="blog-spotlight"
          aria-label="Featured technical guide"
        >
          <div className="spotlight-card">
            <div className="spotlight-image-col">
              {featuredPost.coverImage ? (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.coverImageAlt || featuredPost.title}
                  className="spotlight-img"
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div
                  className="spotlight-placeholder"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[featuredPost.category.toLowerCase()] ||
                      "var(--blue)",
                  }}
                >
                  <span>{featuredPost.category}</span>
                </div>
              )}
            </div>
            <div className="spotlight-content-col">
              <div className="spotlight-badge-row">
                <span
                  className="spotlight-category"
                  style={{
                    color:
                      CATEGORY_COLORS[featuredPost.category.toLowerCase()] ||
                      "var(--blue)",
                  }}
                >
                  <span
                    className="category-bullet"
                    style={{
                      background:
                        CATEGORY_COLORS[featuredPost.category.toLowerCase()] ||
                        "var(--blue)",
                    }}
                  ></span>
                  {featuredPost.category}
                </span>
                <span className="spotlight-tag">Featured Analysis</span>
              </div>
              <h2 className="spotlight-title">
                <Link
                  href={`/blog/${featuredPost.category}/${featuredPost.slug}/`}
                >
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="spotlight-desc">{featuredPost.description}</p>
              <div className="spotlight-meta">
                <time dateTime={featuredPost.datePublished}>
                  {formatDate(featuredPost.datePublished)}
                </time>
                {featuredPost.readingTime && (
                  <>
                    <span className="meta-dot">·</span>
                    <span>{featuredPost.readingTime} min read</span>
                  </>
                )}
              </div>
              <Link
                className="button button-primary spotlight-btn"
                href={`/blog/${featuredPost.category}/${featuredPost.slug}/`}
              >
                Read Article →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Responsive Article Cards Grid */}
      {gridArticles.length > 0 ? (
        <div className="article-cards-grid">
          {gridArticles.map((p) => {
            const catColor =
              CATEGORY_COLORS[p.category.toLowerCase()] || "var(--blue)";
            return (
              <article key={p.slug} className="article-card">
                <Link
                  href={`/blog/${p.category}/${p.slug}/`}
                  className="article-card-cover-link"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt={p.coverImageAlt || p.title}
                      className="article-card-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="article-card-placeholder">
                      <span
                        className="placeholder-cat"
                        style={{ color: catColor }}
                      >
                        {p.category}
                      </span>
                    </div>
                  )}
                </Link>

                <div className="article-card-content">
                  <div className="article-card-meta">
                    <span
                      className="article-category-tag"
                      style={{ color: catColor }}
                    >
                      <span
                        className="category-bullet"
                        style={{ background: catColor }}
                      ></span>
                      {p.category}
                    </span>
                    <span className="article-card-date">
                      {formatDate(p.datePublished)}
                    </span>
                    {p.readingTime && (
                      <span className="article-card-readtime">
                        {p.readingTime}m read
                      </span>
                    )}
                  </div>

                  <h3 className="article-card-title">
                    <Link href={`/blog/${p.category}/${p.slug}/`}>
                      {p.title}
                    </Link>
                  </h3>

                  <p className="article-card-desc">{p.description}</p>

                  <div className="article-card-action">
                    <Link
                      className="read-more-link"
                      href={`/blog/${p.category}/${p.slug}/`}
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="no-results-card">
          <h3>No articles found</h3>
          <p>
            No articles match your search query <strong>"{query}"</strong> in
            this view.
          </p>
          <button
            type="button"
            className="button button-secondary"
            onClick={handleClearSearch}
          >
            Clear Search &amp; View All Articles
          </button>
        </div>
      )}

      {/* Crawlable Pagination Controls (Using Real Links for Search Engines) */}
      {!isSearchActive && resolvedTotalPages > 1 && (
        <nav
          className="blog-pagination"
          aria-label="Article library pagination"
        >
          {initialCurrentPage > 1 ? (
            <Link
              href={getPageHref(initialCurrentPage - 1)}
              className="button button-secondary pagination-btn"
              rel="prev"
            >
              ← Previous
            </Link>
          ) : (
            <span
              className="button button-secondary pagination-btn disabled"
              aria-disabled="true"
            >
              ← Previous
            </span>
          )}

          <span className="pagination-status">
            Page <strong>{initialCurrentPage}</strong> of{" "}
            <strong>{resolvedTotalPages}</strong>
          </span>

          {initialCurrentPage < resolvedTotalPages ? (
            <Link
              href={getPageHref(initialCurrentPage + 1)}
              className="button button-secondary pagination-btn"
              rel="next"
            >
              Next →
            </Link>
          ) : (
            <span
              className="button button-secondary pagination-btn disabled"
              aria-disabled="true"
            >
              Next →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
