"use client";

import { useMemo, useState } from "react";
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

export function BlogIndex({
  posts,
  categories,
  activeCategory: initialActiveCategory,
}: {
  posts: PostItem[];
  categories: string[];
  activeCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialActiveCategory || "all",
  );
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  // Filter posts based on query and category
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [posts, query, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  // Identify featured article (first post when on page 1 and no search query)
  const showFeaturedHero =
    currentPage === 1 && !query.trim() && filteredPosts.length > 0;
  const featuredPost = showFeaturedHero ? filteredPosts[0] : null;

  // Remaining articles for the grid
  const gridArticles = useMemo(() => {
    if (showFeaturedHero) {
      // Exclude featured article from the first page grid
      const start = 1;
      const end = 1 + PAGE_SIZE;
      return filteredPosts.slice(start, end);
    }
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, showFeaturedHero, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const handleClearSearch = () => {
    setQuery("");
    setPage(1);
  };

  return (
    <div className="blog-library-wrapper">
      {/* Category Navigation Pills */}
      <nav
        className="blog-category-pills"
        aria-label="Filter articles by category"
      >
        <button
          type="button"
          className={`category-pill ${selectedCategory === "all" ? "category-pill-active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          All Writing <span className="pill-badge">{posts.length}</span>
        </button>
        {categories.map((c) => {
          const count = posts.filter(
            (p) => p.category.toLowerCase() === c.toLowerCase(),
          ).length;
          const isActive = selectedCategory.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              className={`category-pill ${isActive ? "category-pill-active" : ""}`}
              onClick={() => handleCategoryChange(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}{" "}
              <span className="pill-badge">{count}</span>
            </button>
          );
        })}
      </nav>

      {/* Search Input Bar */}
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
            className="blog-search-input"
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search 326 guides, models, and deep dives…"
            aria-label="Search articles"
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={handleClearSearch}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
        <div className="search-status-row" role="status" aria-live="polite">
          <span>
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found
            {selectedCategory !== "all" ? ` in ${selectedCategory}` : ""}
            {query ? ` for "${query}"` : ""}
          </span>
          {query && (
            <button
              type="button"
              className="reset-filter-link"
              onClick={handleClearSearch}
            >
              Reset search
            </button>
          )}
        </div>
      </div>

      {/* Featured Spotlight Card */}
      {featuredPost && (
        <section
          className="featured-spotlight-card"
          aria-label="Featured technical guide"
        >
          <div className="spotlight-visual">
            {featuredPost.coverImage ? (
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.coverImageAlt || featuredPost.title}
                className="spotlight-img"
                loading="eager"
              />
            ) : (
              <div className="spotlight-placeholder-art" aria-hidden="true">
                <span className="spotlight-category-glyph">
                  {featuredPost.category.toUpperCase().slice(0, 3)}
                </span>
              </div>
            )}
          </div>
          <div className="spotlight-content">
            <div className="spotlight-meta-top">
              <span
                className="article-badge"
                style={{
                  color:
                    CATEGORY_COLORS[featuredPost.category.toLowerCase()] ||
                    "var(--blue)",
                }}
              >
                {featuredPost.category.toUpperCase()}
              </span>
              <span className="spotlight-flag">Featured Deep Dive</span>
            </div>
            <h2 className="spotlight-title">
              <Link
                href={`/blog/${featuredPost.category}/${featuredPost.slug}/`}
              >
                {featuredPost.title}
              </Link>
            </h2>
            <p className="spotlight-excerpt">{featuredPost.description}</p>
            <div className="spotlight-footer">
              <div className="spotlight-meta-info">
                <span>{formatDate(featuredPost.datePublished)}</span>
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
            this category.
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

      {/* Crawlable Pagination Controls */}
      {totalPages > 1 && (
        <nav
          className="blog-pagination"
          aria-label="Article library pagination"
        >
          <button
            type="button"
            className="button button-secondary pagination-btn"
            disabled={currentPage === 1}
            onClick={() => {
              setPage((prev) => Math.max(1, prev - 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          >
            ← Previous
          </button>

          <span className="pagination-status">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            type="button"
            className="button button-secondary pagination-btn"
            disabled={currentPage >= totalPages}
            onClick={() => {
              setPage((prev) => Math.min(totalPages, prev + 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
