import Link from "next/link";
import { ProjectList } from "../../components/ProjectList";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";
import { projects } from "../../lib/projects";

export const metadata = {
  title: "Projects & Systems — Aniket Thakur",
  description:
    "Production engineering case studies covering quantitative finance, multimodal AI, operational outbox workflows, geospatial search, and research systems by Aniket Thakur.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Projects & Systems — Aniket Thakur",
    description:
      "Production engineering case studies covering quantitative finance, multimodal AI, operational outbox workflows, geospatial search, and research systems.",
    url: "/projects/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

export default function ProjectsPage() {
  const structuredItems = projects.map((p) => ({
    name: p.title,
    url: `/projects/${p.slug}/`,
    description: p.tagline || p.problem,
  }));

  return (
    <main className="section projects-page">
      <CollectionPageStructuredData
        url="/projects/"
        name={metadata.title}
        description={metadata.description}
        items={structuredItems}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb nav */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Projects" },
          ]}
        />

        {/* Hero Section */}
        <header className="projects-hero">
          <p className="eyebrow">
            Engineering Portfolio · Real Systems &amp; Code
          </p>
          <h1 className="page-title">
            What I have built.{" "}
            <em className="serif">Problems I have solved.</em>
          </h1>
          <p className="intro">
            A portfolio of production architectures, quantitative financial models,
            multimodal AI engines, event-driven outbox pipelines, and local-first tools.
            Each case study distinguishes verified implemented features from external
            cloud dependencies and prototypes.
          </p>

          <div className="projects-stats-strip">
            <div className="stat-item">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Verified Systems</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">
                Core Domains (AI, Finance, Full-Stack, Research)
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">
                Audited Codebases &amp; Source Inspection
              </span>
            </div>
          </div>
        </header>

        {/* Project List Component with Filter Tabs & Search */}
        <section aria-label="Projects directory">
          <ProjectList />
        </section>

        {/* Semantic Crawlable Directory for Answer Engines & Search Spiders */}
        <nav
          aria-label="Index of all engineering case studies"
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "12px",
              color: "inherit",
              opacity: 0.8,
            }}
          >
            All Case Studies &amp; Architectural Specifications
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "10px",
            }}
          >
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}/`}
                  style={{
                    fontSize: "0.92rem",
                    textDecoration: "underline",
                  }}
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bridge to Work & Capabilities */}
        <aside className="projects-bridge-card">
          <div className="bridge-content">
            <span className="eyebrow">Capabilities &amp; Problem Solving</span>
            <h2>Looking for detailed engineering case studies?</h2>
            <p>
              Explore how I approach problems end-to-end: from initial system
              design and trade-offs to implementation boundaries, schema
              contracts, and verified delivery.
            </p>
          </div>
          <div className="bridge-actions">
            <Link className="button button-primary" href="/work/">
              Explore Work &amp; Capabilities →
            </Link>
            <Link
              className="button button-secondary"
              href="/research/graph-neural-networks-ecological-modeling.html"
            >
              OIST Research Account →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
