import Link from "next/link";
import { ProjectList } from "../../components/ProjectList";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";
import { projects } from "../../lib/projects";

export const metadata = {
  title: "Projects & Systems — Aniket Thakur",
  description:
    "Production engineering case studies covering financial tools, operational workflows, AI products, geospatial search, and research systems by Aniket Thakur.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Projects & Systems — Aniket Thakur",
    description:
      "Production engineering case studies covering financial tools, operational workflows, AI products, and research systems.",
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
        <nav aria-label="Breadcrumb" className="page-breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Projects</li>
          </ol>
        </nav>

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
            A portfolio of production architectures, financial models,
            event-driven outbox pipelines, and local-first AI tools. Each study
            distinguishes verified implemented features from external
            dependencies and prototypes.
          </p>

          <div className="projects-stats-strip">
            <div className="stat-item">
              <span className="stat-number">8</span>
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

        {/* Project List Component with Filter Tabs */}
        <section aria-label="Projects directory">
          <ProjectList />
        </section>

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
