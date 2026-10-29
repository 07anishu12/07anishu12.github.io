"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "../lib/projects";

const ALL_CATEGORY = "All";

export function ProjectList({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    ALL_CATEGORY,
    "Finance & Analytics",
    "AI & Automation",
    "Full-Stack Engineering",
    "Research",
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === ALL_CATEGORY || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.problem.toLowerCase().includes(q) ||
      p.stack.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const displayedProjects = limit ? projects.slice(0, limit) : filteredProjects;

  // Split into featured and standard when in full mode without active search/filter
  const isDefaultFullView =
    !limit && activeCategory === ALL_CATEGORY && !searchQuery.trim();
  const featuredProjects = isDefaultFullView
    ? displayedProjects.filter((p) => p.featured)
    : displayedProjects;
  const secondaryProjects = isDefaultFullView
    ? displayedProjects.filter((p) => !p.featured)
    : [];

  return (
    <div className="projects-showcase">
      {!limit && (
        <div className="projects-controls-wrap" style={{ marginBottom: "28px" }}>
          {/* Accessible Search Bar */}
          <div
            className="project-search-bar"
            style={{ marginBottom: "16px", maxWidth: "600px" }}
          >
            <label htmlFor="project-search-input" className="sr-only">
              Search projects by name, problem, or technology
            </label>
            <input
              id="project-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by system, problem, or tech (e.g. Python, OCR, Time-Series, Next.js)..."
              className="lead-input"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "6px",
                border: "1px solid rgba(0, 0, 0, 0.15)",
                fontSize: "0.95rem",
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div
            className="project-filter-bar"
            role="toolbar"
            aria-label="Filter projects by category"
          >
            <span className="filter-label">Filter:</span>
            <div className="filter-pills" role="tablist">
              {categories.map((cat) => {
                const count =
                  cat === ALL_CATEGORY
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`filter-pill ${isActive ? "filter-pill-active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat} <span className="pill-count">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Primary / Featured Projects Grid */}
      <div className="featured-projects-grid">
        {featuredProjects.map((p, idx) => (
          <article
            key={p.slug}
            className={`project-card ${p.featured && !limit ? "project-card-featured" : ""}`}
            data-category={p.category}
          >
            <div className="project-card-header">
              <div className="project-card-meta">
                <span className="project-category-badge">{p.category}</span>
                <span className="project-status-badge">
                  <span className="status-dot" aria-hidden="true"></span>
                  {p.status}
                </span>
              </div>
              <span className="project-index">
                #{String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="project-card-body">
              <h2 className="project-title">
                <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
              </h2>
              <p className="project-tagline">{p.tagline}</p>

              <div className="project-breakdown-grid">
                <div className="breakdown-col">
                  <h3 className="breakdown-label">The Problem</h3>
                  <p className="breakdown-text">{p.problem}</p>
                </div>
                <div className="breakdown-col">
                  <h3 className="breakdown-label">What I Built</h3>
                  <p className="breakdown-text">{p.contribution}</p>
                </div>
              </div>

              {p.architectureDiagram && (
                <div className="project-architecture-preview">
                  <span className="diagram-header">
                    Architecture &amp; Data Pipeline
                  </span>
                  <pre className="diagram-code">
                    <code>{p.architectureDiagram}</code>
                  </pre>
                </div>
              )}

              {p.metricsOrOutcomes && (
                <div className="project-outcomes-strip">
                  <span className="outcomes-label">Verified Outcomes:</span>
                  <span className="outcomes-text">{p.metricsOrOutcomes}</span>
                </div>
              )}

              <div className="project-tech-tags" aria-label="Technologies used">
                {p.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-card-actions">
              <Link
                className="button button-primary"
                href={`/projects/${p.slug}/`}
              >
                Read Case Study →
              </Link>
              {p.repo ? (
                <a
                  className="button button-secondary"
                  href={`https://github.com/07anishu12/${p.repo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Repository ↗
                </a>
              ) : p.relatedPath ? (
                <Link className="button button-secondary" href={p.relatedPath}>
                  Research Account →
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {/* Secondary Projects Section if in full showcase */}
      {isDefaultFullView && secondaryProjects.length > 0 && (
        <div className="secondary-projects-section" style={{ marginTop: "48px" }}>
          <div className="secondary-header">
            <h2 className="secondary-title">
              Complete Engineering Directory &amp; Tools
            </h2>
            <p className="secondary-desc">
              Specialized ETL pipelines, local inference tools, and scientific
              research systems.
            </p>
          </div>
          <div className="secondary-projects-grid">
            {secondaryProjects.map((p) => (
              <article
                key={p.slug}
                className="project-card project-card-compact"
              >
                <div className="project-card-header">
                  <span className="project-category-badge">{p.category}</span>
                  <span className="project-status-badge">
                    <span className="status-dot" aria-hidden="true"></span>
                    {p.status}
                  </span>
                </div>

                <h3 className="project-title-compact">
                  <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
                </h3>
                <p className="project-tagline-compact">{p.tagline}</p>
                <p className="breakdown-text-compact">{p.problem}</p>

                <div className="project-tech-tags compact-tags">
                  {p.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="compact-actions">
                  <Link className="link-arrow" href={`/projects/${p.slug}/`}>
                    Explore System &amp; Code →
                  </Link>
                  {p.repo && (
                    <a
                      className="link-subtle"
                      href={`https://github.com/07anishu12/${p.repo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {displayedProjects.length === 0 && (
        <div
          className="empty-state"
          style={{
            padding: "40px 20px",
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.02)",
            borderRadius: "8px",
            marginTop: "24px",
          }}
        >
          <p style={{ fontSize: "1.1rem", marginBottom: "16px" }}>
            {searchQuery
              ? `No projects found matching "${searchQuery}".`
              : "No projects match this category filter."}
          </p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setActiveCategory(ALL_CATEGORY);
              setSearchQuery("");
            }}
          >
            Show All Projects ({projects.length})
          </button>
        </div>
      )}
    </div>
  );
}
