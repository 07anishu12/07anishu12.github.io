"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "../lib/projects";

const ALL_CATEGORY = "All";

export function ProjectList({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  const categories = [
    ALL_CATEGORY,
    "Finance & Analytics",
    "AI & Automation",
    "Full-Stack Engineering",
    "Research",
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === ALL_CATEGORY) return true;
    return p.category === activeCategory;
  });

  const displayedProjects = limit ? projects.slice(0, limit) : filteredProjects;

  // Split into featured and standard when in full mode without active single-category filter
  const isFullShowcase = !limit && activeCategory === ALL_CATEGORY;
  const featuredProjects = isFullShowcase
    ? displayedProjects.filter((p) => p.featured)
    : displayedProjects;
  const secondaryProjects = isFullShowcase
    ? displayedProjects.filter((p) => !p.featured)
    : [];

  return (
    <div className="projects-showcase">
      {!limit && (
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
      {isFullShowcase && secondaryProjects.length > 0 && (
        <div className="secondary-projects-section">
          <div className="secondary-header">
            <h2 className="secondary-title">
              Additional Production Architectures &amp; Tools
            </h2>
            <p className="secondary-desc">
              Specialized engines, local inference pipelines, and scientific
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
        <div className="empty-state">
          <p>No projects match this category filter.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setActiveCategory(ALL_CATEGORY)}
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
