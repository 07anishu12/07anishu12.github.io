import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../lib/projects";
import {
  BreadcrumbStructuredData,
  CreativeWorkStructuredData,
  WebPageStructuredData,
} from "../../../components/StructuredData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Aniket Thakur`,
    description: p.tagline || p.problem,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: {
      title: `${p.title} — Aniket Thakur`,
      description: p.tagline || p.problem,
      url: `/projects/${slug}/`,
      images: ["/assets/img/aniket-portrait.png"],
    },
  };
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();

  return (
    <main className="section project-detail-page">
      <WebPageStructuredData
        url={`/projects/${slug}/`}
        name={p.title}
        description={p.tagline || p.problem}
      />
      <CreativeWorkStructuredData
        url={`/projects/${slug}/`}
        name={p.title}
        description={p.tagline || p.problem}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects/" },
          { name: p.title, url: `/projects/${slug}/` },
        ]}
      />

      <article className="container reading">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="page-breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/projects/">Projects</Link>
            </li>
            <li aria-current="page">{p.title}</li>
          </ol>
        </nav>

        {/* Case Study Header */}
        <header className="case-study-header">
          <div className="case-study-meta">
            <span className="project-category-badge">{p.category}</span>
            <span className="project-status-badge">
              <span className="status-dot" aria-hidden="true"></span>
              {p.status}
            </span>
          </div>

          <h1 className="page-title">{p.title}</h1>
          <p className="intro">{p.tagline || p.problem}</p>

          <div className="tech-stack-row" aria-label="Technologies used">
            {p.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Structured Case Study Sections */}
        <div className="prose case-study-body">
          <section className="case-section">
            <h2>The Problem</h2>
            <p>{p.problem}</p>
          </section>

          {p.approach && (
            <section className="case-section">
              <h2>Engineering Approach</h2>
              <p>{p.approach}</p>
            </section>
          )}

          <section className="case-section">
            <h2>What I Built &amp; My Contribution</h2>
            <p>{p.contribution}</p>
          </section>

          <section className="case-section">
            <h2>Architecture &amp; Data Pipeline</h2>
            <div className="flow-card">
              <p className="flow-text">{p.flow}</p>
              {p.architectureDiagram && (
                <div className="diagram-box">
                  <span className="diagram-title">System Architecture</span>
                  <pre className="diagram-code">
                    <code>{p.architectureDiagram}</code>
                  </pre>
                </div>
              )}
            </div>
          </section>

          {p.metricsOrOutcomes && (
            <section className="case-section">
              <h2>Verified Outcomes &amp; Metrics</h2>
              <div className="outcomes-card">
                <p>{p.metricsOrOutcomes}</p>
              </div>
            </section>
          )}

          <section className="case-section">
            <h2>Verified Implementation</h2>
            <p>
              {p.evidence} Verification here represents code audit and local
              inspection, distinguishing functional code paths from external
              cloud provider accounts.
            </p>
          </section>

          <section className="case-section">
            <h2>Boundaries &amp; Known Limitations</h2>
            <p>{p.limitations}</p>
          </section>

          {p.relatedPath && (
            <section className="case-section related-section">
              <h2>Related Technical Guide &amp; Analysis</h2>
              <p>
                To understand the mathematical, algorithmic, or architectural
                principles behind this system, explore the companion deep dive:
              </p>
              <p>
                <Link className="link-arrow" href={p.relatedPath}>
                  {p.relatedLabel || "Read related publication →"}
                </Link>
              </p>
            </section>
          )}
        </div>

        {/* Actions Footer */}
        <footer className="case-study-footer">
          <div className="footer-actions">
            {p.repo ? (
              <a
                className="button button-primary"
                href={`https://github.com/07anishu12/${p.repo}`}
                target="_blank"
                rel="noreferrer"
              >
                Inspect Repository on GitHub ↗
              </a>
            ) : (
              <Link
                className="button button-primary"
                href="/research/graph-neural-networks-ecological-modeling.html"
              >
                Read Research Account →
              </Link>
            )}
            <Link className="button button-secondary" href="/projects/">
              ← Back to All Projects
            </Link>
            <Link className="button button-secondary" href="/work/">
              Explore Capabilities on Work Page →
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
