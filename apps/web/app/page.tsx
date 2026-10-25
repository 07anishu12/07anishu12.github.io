import Link from "next/link";
import { ProjectList } from "../components/ProjectList";
import { Background } from "../components/Background";
import { InquiryButton } from "../components/InquiryButton";
import { WebPageStructuredData } from "../components/StructuredData";
import { listPosts } from "../lib/blog";
export const metadata = {
  title: "Aniket Thakur \u2014 AI \u00d7 Product \u00d7 Finance",
  description:
    "AI engineering, backend systems and product thinking applied to useful tools, research and financial workflows.",
  alternates: { canonical: "/" },
};
export default function Home() {
  const recent = listPosts().slice(0, 3);
  return (
    <main>
      <WebPageStructuredData
        url="/"
        name="Aniket Thakur — AI × Product × Finance"
        description={metadata.description}
      />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Aniket Thakur · AI × Product × Finance</p>
            <h1>
              Build with intent.
              <br />
              <em className="serif">Make it useful.</em>
            </h1>
            <p className="hero-copy">
              I connect AI engineering, backend systems and product thinking to
              turn complex problems into tools people can use.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/projects/">
                Explore my work →
              </Link>
              <InquiryButton className="button button-secondary" />
            </div>
            <p className="hero-note">
              Product delivery at Drivio · Graph research at OIST · Financial
              engineering at WorldQuant University
            </p>
          </div>
          <figure className="portrait-card">
            <img
              src="/assets/img/aniket-portrait.png"
              alt="Aniket Thakur"
              width="1086"
              height="1448"
              fetchPriority="high"
            />
            <figcaption>
              <span>New Delhi / Okinawa</span>
              <span>Engineering &amp; research</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>
                Useful systems.
                <br />
                <em className="serif">Visible decisions.</em>
              </h2>
            </div>
            <p>
              Explore the assumptions, architecture and boundaries behind each
              project.
            </p>
          </div>
          <ProjectList limit={3} />
          <Link href="/projects/">View all projects →</Link>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Research perspective</p>
          <h2 className="section-title">
            Understanding the relationships{" "}
            <em className="serif">inside the data.</em>
          </h2>
          <p className="intro">
            At OIST, my research focused on graph neural networks and ecological
            food webs—a different setting for the same question: how do we turn
            complexity into understanding?
          </p>
          <Link href="/research/">Explore the research →</Link>
        </div>
      </section>
      <Background />
      <section className="section">
        <div className="container">
          <p className="eyebrow">Recent writing</p>
          <h2 className="section-title">Notes from the work.</h2>
          <div className="project-grid">
            {recent.map((p) => (
              <article className="project" key={p.slug}>
                <small>{p.category}</small>
                <h3>
                  <Link href={`/blog/${p.category}/${p.slug}/`}>{p.title}</Link>
                </h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
          <Link href="/blog/">Visit the writing library →</Link>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <p className="eyebrow">Collaborate</p>
          <h2 className="section-title">
            Have a useful problem <em className="serif">to solve?</em>
          </h2>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <InquiryButton className="button button-primary" />
            <Link className="button button-secondary" href="/contact/">
              Contact options ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
