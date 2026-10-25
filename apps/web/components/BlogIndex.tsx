"use client";
import { useState } from "react";
type Post = {
  title: string;
  description: string;
  category: string;
  slug: string;
  datePublished: string;
};
export function BlogIndex({
  posts,
  categories,
}: {
  posts: Post[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const results = posts.filter((p) =>
    `${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(results.length / 12));
  return (
    <>
      <nav className="category-nav" aria-label="Article categories">
        <a href="/blog">All writing</a>
        {categories.map((c) => (
          <a key={c} href={`/blog/${c}/`}>
            {c}
          </a>
        ))}
      </nav>
      <label className="search-label" htmlFor="article-search">
        Search this library
      </label>
      <input
        className="lead-input"
        id="article-search"
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        placeholder="Find a topic…"
      />
      <p role="status">{results.length} articles</p>
      <div className="article-list">
        {results.slice((page - 1) * 12, page * 12).map((p) => (
          <article key={p.slug}>
            <small>
              {p.category} · {p.datePublished}
            </small>
            <h2>
              <a href={`/blog/${p.category}/${p.slug}/`}>{p.title}</a>
            </h2>
            <p>{p.description}</p>
          </article>
        ))}
      </div>
      {!results.length && <p>No articles match. Try a broader search.</p>}
      <nav className="pagination" aria-label="Pagination">
        <button
          className="button button-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          className="button button-secondary"
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </nav>
    </>
  );
}
