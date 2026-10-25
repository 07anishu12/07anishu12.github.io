import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { WebPageStructuredData, BreadcrumbStructuredData } from "../../components/StructuredData";

export const metadata = {
  title: "About — Aniket Thakur | AI Engineer, Product Manager & Researcher",
  description:
    "Aniket Thakur builds AI systems, shapes fintech products, and conducts AI research in graph neural networks and language model evaluation at the intersection of engineering and finance.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Aniket Thakur — AI Engineer, Product Manager & Researcher",
    description:
      "Bridging AI engineering, product delivery, quantitative finance, and ecological graph research. Explore background, capabilities, and verified timeline.",
    url: "/about/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

const capabilities = [
  {
    category: "AI & Machine Learning",
    badge: "Core Engineering",
    problem:
      "Unstructured data, complex non-Euclidean systems, and ungrounded LLM hallucination require deterministic schema contracts and relational models.",
    tools: [
      "Python",
      "PyTorch",
      "PyTorch Geometric (PyG)",
      "Graph Neural Networks (GraphSAGE, GAT)",
      "LLM Tool Calling & RAG",
      "Model Evaluation",
      "Deterministic Schema Validation",
    ],
  },
  {
    category: "Product Management",
    badge: "Delivery & Strategy",
    problem:
      "Turning vague stakeholder ideas and complex workflows into reliable, scoped software specifications that engineering teams can build and measure.",
    tools: [
      "Problem Definition",
      "Product Requirements (PRDs)",
      "User Journey Mapping",
      "Backlog Prioritisation",
      "Banking & Loan Integrations",
      "Stakeholder Coordination",
    ],
  },
  {
    category: "Backend & Systems",
    badge: "Architecture",
    problem:
      "Preventing data loss during third-party API downtimes, ensuring transactional integrity, and isolating high-throughput read/write operations.",
    tools: [
      "Node.js",
      "TypeScript",
      "FastAPI (Python)",
      "PostgreSQL",
      "PostGIS Spatial Indexing",
      "Transactional Outbox Pattern",
      "Advisory Locks & Message Queues",
    ],
  },
  {
    category: "Frontend Engineering",
    badge: "User Experience",
    problem:
      "Presenting dense quantitative analysis, financial calculators, and technical reading material comfortably on smartphones without layout shift or horizontal overflow.",
    tools: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Responsive Fluid Layouts",
      "WCAG Accessibility",
      "Data-Dense UI Design",
      "Turbopack & Performance Tuning",
    ],
  },
  {
    category: "Finance & Quantitative Analytics",
    badge: "Quantitative Methods",
    problem:
      "Spreadsheet-based models suffer from silent cell drift and buried assumptions; financial decisions require transparent, auditable calculations.",
    tools: [
      "DCF Valuation Modeling",
      "WACC & Cost of Capital (CAPM)",
      "Gordon Growth & Exit Multiples",
      "Sensitivity Matrices",
      "SQL Business Intelligence",
      "Financial Engineering",
    ],
  },
];

const timelineEntries = [
  {
    period: "Dec 2025 – Present",
    role: "Associate Product Manager",
    org: "Drivio Technologies",
    type: "Employment",
    typeBadge: "badge-employment",
    description:
      "Leading two-wheeler digital financing journeys, cross-functional engineering delivery, core banking integrations, and structured outbox lead pipelines.",
  },
  {
    period: "June 2025 – Feb 2026",
    role: "AI Research Intern",
    org: "Okinawa Institute of Science and Technology (OIST Graduate University)",
    type: "Research Experience",
    typeBadge: "badge-research",
    description:
      "Conducted scientific AI research modeling non-Euclidean ecological food webs with Graph Neural Networks (GraphSAGE, GAT in PyG) and engineered multi-LLM consensus pipelines for literature extraction.",
  },
  {
    period: "Nov 2024 – June 2025",
    role: "Business Analyst",
    org: "Drivio Technologies",
    type: "Employment",
    typeBadge: "badge-employment",
    description:
      "Analyzed automotive finance operations, modeled customer conversion funnels, and structured LLM-assisted content automation workflows.",
  },
  {
    period: "Mar 2023 – July 2023",
    role: "Business Consultant & Analyst",
    org: "Analy Assist",
    type: "Employment",
    typeBadge: "badge-employment",
    description:
      "Conducted quantitative market research, prepared go-to-market strategies, and synthesized financial reporting for executive leadership.",
  },
  {
    period: "2025 – 2027 (Expected)",
    role: "M.Sc. in Financial Engineering",
    org: "WorldQuant University",
    type: "Education",
    typeBadge: "badge-education",
    description:
      "Advanced graduate study in quantitative asset pricing, computational finance, econometrics, and risk modeling.",
  },
  {
    period: "2022 – 2025",
    role: "B.Sc. in Data Analytics",
    org: "Delhi Skill and Entrepreneurship University (DSEU Shakarpur-2)",
    type: "Education",
    typeBadge: "badge-education",
    description:
      "Undergraduate foundation in applied statistics, machine learning, relational database architecture, Python, and SQL.",
  },
];

export default function AboutPage() {
  return (
    <main className="section about-page">
      <WebPageStructuredData
        url="/about/"
        name={metadata.title}
        description={metadata.description}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "About" },
          ]}
        />

        {/* Hero Section */}
        <header className="about-hero">
          <p className="eyebrow">ABOUT ANIKET</p>
          <h1 className="page-title">
            I build AI systems, shape products, and{" "}
            <em className="serif">investigate complex problems.</em>
          </h1>
          <p className="intro">
            My work sits at the intersection of AI engineering, product
            management, research, and finance. I build software systems, explore
            how models learn and retrieve information, and translate technical
            ideas into practical products.
          </p>

          {/* Three Distinct Roles */}
          <div className="about-roles-grid">
            <div className="about-role-card">
              <div className="role-header">
                <span className="role-badge badge-ai">Role 01</span>
                <h3>AI Engineer</h3>
              </div>
              <p>
                AI applications, backend systems, model integration, automation,
                and data pipelines. Focused on deterministic safety and clean
                architecture.
              </p>
            </div>

            <div className="about-role-card">
              <div className="role-header">
                <span className="role-badge badge-pm">Role 02</span>
                <h3>Product Manager</h3>
              </div>
              <p>
                Problem definition, prioritisation, requirements, stakeholder
                coordination, and product delivery. Grounded in user value and
                execution speed.
              </p>
            </div>

            <div className="about-role-card">
              <div className="role-header">
                <span className="role-badge badge-research">Role 03</span>
                <h3>AI Researcher</h3>
              </div>
              <p>
                Graph neural networks, ecological modelling, scientific
                literature, and model evaluation. Investigating how models handle
                non-Euclidean data.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="about-hero-actions">
            <Link href="/work/" className="button button-primary">
              Explore My Work →
            </Link>
            <Link href="/research/" className="button button-secondary">
              View Research →
            </Link>
            <Link href="/contact/" className="button button-subtle">
              Get in Touch
            </Link>
          </div>
        </header>

        {/* Core Capabilities */}
        <section className="about-section" aria-label="Core Capabilities">
          <div className="section-title-wrap">
            <span className="eyebrow">TECHNICAL &amp; PRODUCT TOOLKIT</span>
            <h2 className="section-title">
              What I Bring to a <em className="serif">Team</em>
            </h2>
            <p className="section-subtitle">
              Tools and methodologies grounded in real systems delivery, not
              superficial keyword badges.
            </p>
          </div>

          <div className="capabilities-group-grid">
            {capabilities.map((c) => (
              <div key={c.category} className="capability-card">
                <div className="capability-card-header">
                  <span className="capability-badge">{c.badge}</span>
                  <h3 className="capability-title">{c.category}</h3>
                </div>
                <div className="capability-problem-box">
                  <span className="problem-label">Problem Solved:</span>
                  <p className="problem-text">{c.problem}</p>
                </div>
                <div className="capability-tools-wrap">
                  <span className="tools-label">Practiced Techniques &amp; Tools:</span>
                  <div className="tools-tags">
                    {c.tools.map((t) => (
                      <span key={t} className="tool-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career & Education Timeline */}
        <section className="about-section" aria-label="Career and Education">
          <div className="section-title-wrap">
            <span className="eyebrow">CHRONOLOGICAL RECORD</span>
            <h2 className="section-title">
              Career &amp; <em className="serif">Education</em>
            </h2>
            <p className="section-subtitle">
              Chronological experience across product delivery, scientific
              research, and quantitative education.
            </p>
          </div>

          <div className="verified-timeline">
            {timelineEntries.map((item, index) => (
              <article key={item.period + index} className="timeline-card">
                <div className="timeline-meta-col">
                  <time className="timeline-period">{item.period}</time>
                  <span className={`timeline-tag ${item.typeBadge}`}>
                    {item.type}
                  </span>
                </div>
                <div className="timeline-content-col">
                  <h3 className="timeline-role-title">
                    {item.role}{" "}
                    <span className="timeline-org">· {item.org}</span>
                  </h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Closing Call to Action */}
        <section className="about-closing-card" aria-label="Collaboration Inquiry">
          <div className="closing-content">
            <span className="eyebrow">NEXT STEPS</span>
            <h2>
              Have a problem that needs engineering, research, or product
              thinking?
            </h2>
            <p>
              I am always glad to discuss AI architecture, quantitative modeling,
              product roadmaps, or research questions.
            </p>
          </div>
          <div className="closing-actions">
            <Link href="/work/" className="button button-primary">
              View Case Studies →
            </Link>
            <Link href="/research/" className="button button-secondary">
              Read Research →
            </Link>
            <Link href="/contact/" className="button button-secondary">
              Start a Conversation →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
