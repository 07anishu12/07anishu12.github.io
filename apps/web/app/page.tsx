import Link from "next/link";
import { InquiryButton } from "../components/InquiryButton";
import { WebPageStructuredData } from "../components/StructuredData";
import { listPosts } from "../lib/blog";

export const metadata = {
  title: "Aniket Thakur — AI Engineer, Product Manager & AI Researcher",
  description:
    "I build AI products, intelligent systems, and data-driven solutions. Explore projects across AI engineering, product management, and applied ML research by Aniket Thakur.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aniket Thakur — AI Engineer, Product Manager & AI Researcher",
    description:
      "I build AI products, intelligent systems, and data-driven solutions. Explore projects across AI engineering, product management, and applied ML research.",
    url: "/",
    images: ["/assets/img/aniket-portrait.png"],
  },
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

export default function Home() {
  const allPosts = listPosts();

  // Pick 3 representative technical articles demonstrating AI engineering, quantitative finance, and agent systems
  const preferredSlugs = [
    "postgresql-and-pgvector-build-semantic-search",
    "terminal-value-in-dcf-growth-vs-exit-multiple",
    "build-an-ai-agent-with-tool-calls-and-human-approval",
  ];

  const selectedArticles = preferredSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter(Boolean) as typeof allPosts;

  const displayArticles =
    selectedArticles.length === 3 ? selectedArticles : allPosts.slice(0, 3);

  // 3 featured projects with rich, verified summaries and visual pipeline badges
  const featuredCards = [
    {
      slug: "finance-tools",
      title: "Finance Tools — DCF Valuation",
      category: "Finance & Analytics",
      status: "Implemented & Verified",
      tagline:
        "Deterministic Discounted Cash Flow valuation engine with Excel & JSON reconciliation",
      problem:
        "Financial valuation assumptions are frequently hidden in spreadsheet cells or opaque web models, making sensitivity reviews difficult before calculating enterprise and equity value.",
      contribution:
        "Engineered a deterministic Python/FastAPI valuation engine decoupled from the UI, supporting dual Gordon Growth and Exit Multiple terminal value models with automated Excel (.xlsx) and JSON reconciliation.",
      decisions:
        "Enforced strict Pydantic input schemas, mathematical determinism with zero cell-drift between UI state and exported workbooks, and isolated local-write checks.",
      technologies: ["Python", "FastAPI", "React", "PostgreSQL", "OpenPyXL"],
      repo: "Finance-tools",
      chips: [
        "FastAPI Valuation Core",
        "Gordon Growth & Multiples",
        "Excel (.xlsx) & JSON Reconciled",
      ],
    },
    {
      slug: "signal-desk",
      title: "Signal Desk — Lead Agent",
      category: "AI & Automation",
      status: "Production Serverless",
      tagline:
        "Durable event-driven lead routing pipeline with PostgreSQL outbox & WhatsApp state machine",
      problem:
        "High-intent customer inquiries often get lost or duplicated during third-party API spikes and external service connection dropouts.",
      contribution:
        "Designed and built an event-driven lead ingestion pipeline implementing the transactional outbox pattern in PostgreSQL, with HMAC token authentication, automated deduplication, and Google Sheets webhook sync.",
      decisions:
        "Enforced atomic database transactions storing events before outbound delivery, exponential backoff retries with bounded failure thresholds, and formula injection sanitization.",
      technologies: [
        "Next.js App Router",
        "TypeScript",
        "PostgreSQL",
        "Transactional Outbox",
        "Google Sheets API",
      ],
      repo: "lead-agent",
      chips: [
        "HMAC Signed Token Auth",
        "Postgres Transactional Outbox",
        "Advisory Lock Queue & Sync",
      ],
    },
    {
      slug: "fastcharger",
      title: "FastCharger — EV Discovery",
      category: "Full-Stack Engineering",
      status: "Verified Architecture",
      tagline:
        "Geospatial electric vehicle charging locator with PostGIS spatial indexing & bounded ingestion",
      problem:
        "EV drivers struggle to quickly find operational, nearby charging stations along real travel routes when aggregators have stale data or slow radial search.",
      contribution:
        "Engineered a full-stack station locator with PostGIS spatial indexing for sub-50ms proximity queries, bounding-box map view filtering, and verified rate-limiting boundaries.",
      decisions:
        "Implemented PostGIS ST_DWithin spatial indexing on geographic coordinates, API payload limits, and debounce-optimized map bounds calculation.",
      technologies: ["React", "Node.js", "PostGIS", "Leaflet", "Express"],
      repo: "ev-charging-station-locator",
      chips: [
        "Sub-50ms Radial Match",
        "PostGIS Spatial Index (ST_DWithin)",
        "Rate-Limited Geospatial API",
      ],
    },
  ];

  return (
    <main className="home-redesign">
      <WebPageStructuredData
        url="/"
        name={metadata.title}
        description={metadata.description}
      />

      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Aniket Thakur · AI × Product × Finance</p>
            <h1 className="hero-title">
              I build AI products, intelligent systems, and{" "}
              <em className="serif">data-driven solutions.</em>
            </h1>

            {/* Three Clearly Visible Professional Roles */}
            <div
              className="hero-roles-strip"
              role="list"
              aria-label="Core professional roles"
            >
              <div className="hero-role-item" role="listitem">
                <span className="role-tag">AI Engineer</span>
                <span className="role-summary">
                  LLM applications, AI agents, automation pipelines, and
                  production-oriented systems.
                </span>
              </div>
              <div className="hero-role-item" role="listitem">
                <span className="role-tag">Product Manager</span>
                <span className="role-summary">
                  Product strategy, user problem discovery, workflow mapping, and
                  cross-functional execution.
                </span>
              </div>
              <div className="hero-role-item" role="listitem">
                <span className="role-tag">AI Researcher</span>
                <span className="role-summary">
                  Machine learning, graph neural networks for complex networks,
                  and applied empirical research.
                </span>
              </div>
            </div>

            <p className="hero-copy">
              I combine engineering rigor, product thinking, and quantitative
              analysis to turn complex problems into reliable, high-impact systems
              that solve real problems.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="/projects/">
                Explore My Projects →
              </Link>
              <InquiryButton
                className="button button-secondary"
                labelOverride="Contact Me"
              />
              <Link className="hero-subtle-link" href="/research/">
                Research &amp; Writing ↗
              </Link>
            </div>
          </div>

          <figure className="portrait-card">
            <picture>
              <source
                type="image/avif"
                srcSet="/assets/img/aniket-portrait-280.avif 280w, /assets/img/aniket-portrait-400.avif 400w, /assets/img/aniket-portrait-560.avif 560w, /assets/img/aniket-portrait-680.avif 680w, /assets/img/aniket-portrait-800.avif 800w, /assets/img/aniket-portrait-1086.avif 1086w"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 360px"
              />
              <source
                type="image/webp"
                srcSet="/assets/img/aniket-portrait-280.webp 280w, /assets/img/aniket-portrait-400.webp 400w, /assets/img/aniket-portrait-560.webp 560w, /assets/img/aniket-portrait-680.webp 680w, /assets/img/aniket-portrait-800.webp 800w, /assets/img/aniket-portrait-1086.webp 1086w"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 360px"
              />
              <img
                src="/assets/img/aniket-portrait.webp"
                alt="Aniket Thakur portrait"
                width={1086}
                height={1448}
                fetchPriority="high"
                decoding="async"
                style={{ width: "100%", height: "auto", aspectRatio: "3 / 4" }}
              />
            </picture>
            <figcaption>
              <span>New Delhi / Okinawa</span>
              <span>AI · Product · Research</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. COMPACT PROFESSIONAL CREDIBILITY SECTION */}
      <section className="section section-credibility">
        <div className="container">
          <div className="credibility-header">
            <p className="eyebrow">Verified Foundation</p>
            <h2 className="credibility-title">
              Engineering Rigor · Product Execution · Applied Research
            </h2>
          </div>
          <div className="credibility-grid">
            <div className="credibility-card">
              <div className="credibility-card-top">
                <span className="cred-num">01</span>
                <span className="cred-badge">AI &amp; Backend Engineering</span>
              </div>
              <p className="cred-body">
                Production Next.js, FastAPI, PostgreSQL, and event-driven
                architectures. Implemented AST query linting, transactional
                outbox pipelines, and on-device MLX inference.
              </p>
              <span className="cred-proof">
                Verified in: Signal Desk, Prompt BI, FastCharger
              </span>
            </div>

            <div className="credibility-card">
              <div className="credibility-card-top">
                <span className="cred-num">02</span>
                <span className="cred-badge">Fintech Product Management</span>
              </div>
              <p className="cred-body">
                Associate Product Manager at Drivio Technologies. Designed
                two-wheeler loan origination journeys, core banking API
                integrations, and structured operational workflows.
              </p>
              <span className="cred-proof">
                Verified in: Drivio Loan Platform, Workflow Specs
              </span>
            </div>

            <div className="credibility-card">
              <div className="credibility-card-top">
                <span className="cred-num">03</span>
                <span className="cred-badge">Graph Neural Network Research</span>
              </div>
              <p className="cred-body">
                AI Research Intern at Okinawa Institute of Science and
                Technology (OIST), Japan. Researched GNN architectures for
                ecological networks and automated literature pipelines.
              </p>
              <span className="cred-proof">
                Verified in: OIST Research Account
              </span>
            </div>

            <div className="credibility-card">
              <div className="credibility-card-top">
                <span className="cred-num">04</span>
                <span className="cred-badge">
                  Quantitative Finance &amp; Education
                </span>
              </div>
              <p className="cred-body">
                M.Sc. Financial Engineering candidate (WorldQuant University)
                and B.Sc. Data Analytics (DSEU). Built deterministic DCF engines
                with dual Excel &amp; JSON reconciliation.
              </p>
              <span className="cred-proof">
                Verified in: Finance Tools, WQU Coursework
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REBUILT FEATURED PROJECTS SECTION */}
      <section className="section" id="featured-projects">
        <div className="container">
          <div className="section-header-compact">
            <div>
              <p className="eyebrow">Featured Production Systems</p>
              <h2 className="section-title">
                What I have built.{" "}
                <em className="serif">Problems I have solved.</em>
              </h2>
            </div>
            <p className="section-subtitle">
              Engineering case studies highlighting real architectural
              trade-offs, verifiable codebases, and personal design
              contributions.
            </p>
          </div>

          <div className="home-featured-grid">
            {featuredCards.map((p) => (
              <article key={p.slug} className="home-project-card">
                <div
                  className="project-card-visual"
                  data-category={p.category}
                >
                  <div className="visual-banner-top">
                    <span className="visual-category-badge">{p.category}</span>
                    <span className="visual-status-pill">
                      <span className="status-dot" aria-hidden="true"></span>
                      {p.status}
                    </span>
                  </div>
                  <div className="visual-flow-chips">
                    {p.chips.map((chip) => (
                      <span key={chip} className="flow-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-card-main">
                  <h3 className="project-card-title">
                    <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
                  </h3>
                  <p className="project-card-tagline">{p.tagline}</p>

                  <div className="project-card-details">
                    <div className="detail-row">
                      <span className="detail-label">The Problem</span>
                      <p className="detail-value">{p.problem}</p>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">What I Built</span>
                      <p className="detail-value">{p.contribution}</p>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">
                        Engineering Decisions
                      </span>
                      <p className="detail-value">{p.decisions}</p>
                    </div>
                  </div>

                  <div
                    className="project-tech-strip"
                    aria-label="Technologies used"
                  >
                    {p.technologies.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    <Link
                      className="button button-primary project-cta"
                      href={`/projects/${p.slug}/`}
                    >
                      Read Case Study →
                    </Link>
                    {p.repo && (
                      <a
                        className="button button-secondary project-cta"
                        href={`https://github.com/07anishu12/${p.repo}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub Repo ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="home-projects-bridge">
            <div className="bridge-text">
              <strong>Looking for more systems?</strong> Explore Prompt BI
              (Natural-Language Analytics), Invoice OCR Extractor, SEOJEV/Laya,
              Omnichannel AI Platform, and OIST Graph Neural Network Research.
            </div>
            <div className="bridge-buttons">
              <Link className="button button-primary" href="/projects/">
                View All 8 Projects in Directory →
              </Link>
              <Link className="button button-secondary" href="/work/">
                Explore Work &amp; Capabilities Page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT I DO (SKILLS & CAPABILITIES) SECTION */}
      <section className="section section-muted" id="what-i-do">
        <div className="container">
          <div className="section-header-compact">
            <div>
              <p className="eyebrow">Capabilities &amp; Scope</p>
              <h2 className="section-title">
                Three Disciplines.{" "}
                <em className="serif">One Cohesive Skillset.</em>
              </h2>
            </div>
            <p className="section-subtitle">
              How I connect AI engineering, product discovery, and quantitative
              rigor to build useful software and reliable data products.
            </p>
          </div>

          <div className="capabilities-grid">
            {/* Column 1: AI Engineering */}
            <div className="capability-card">
              <div className="cap-card-header">
                <span className="cap-pill">Engineering</span>
                <h3>AI Engineering</h3>
                <p className="cap-role-desc">
                  Designing and deploying resilient LLM applications,
                  event-driven backends, and deterministic AI tools.
                </p>
              </div>
              <ul className="cap-list">
                <li>
                  <strong>LLM Applications &amp; AI Agents:</strong> Structured
                  output generation, tool-calling state machines, and
                  human-in-the-loop approval workflows.
                </li>
                <li>
                  <strong>RAG &amp; Vector Retrieval:</strong> Hybrid
                  keyword-vector search, pgvector indexing, chunking strategies,
                  and retrieval evaluation.
                </li>
                <li>
                  <strong>Backend Architecture:</strong> REST and serverless APIs
                  with FastAPI, Node.js/Next.js, and PostgreSQL transactional
                  outbox queues.
                </li>
                <li>
                  <strong>Safety &amp; Reliability:</strong> AST query linting
                  blocking unsafe SQL mutations, bounded retries, and
                  reproducible local testing.
                </li>
              </ul>
              <div className="cap-footer">
                <span className="cap-tech-label">Core Technologies:</span>
                <div className="cap-tags">
                  <span>Python</span>
                  <span>FastAPI</span>
                  <span>PyTorch</span>
                  <span>TypeScript</span>
                  <span>PostgreSQL</span>
                  <span>pgvector</span>
                  <span>Ollama</span>
                </div>
                <div className="cap-links">
                  <Link href="/projects/signal-desk/">See Signal Desk →</Link>
                  <Link href="/projects/prompt-bi/">See Prompt BI →</Link>
                </div>
              </div>
            </div>

            {/* Column 2: Product Management */}
            <div className="capability-card">
              <div className="cap-card-header">
                <span className="cap-pill">Product</span>
                <h3>Product Management</h3>
                <p className="cap-role-desc">
                  Turning ambiguous user problems into structured specifications,
                  prioritized roadmaps, and shipped software.
                </p>
              </div>
              <ul className="cap-list">
                <li>
                  <strong>Discovery &amp; Problem Framing:</strong> User
                  interviews, quantitative funnel analysis, and identifying root
                  workflow bottlenecks.
                </li>
                <li>
                  <strong>Specifications &amp; PRDs:</strong> Authoring
                  comprehensive requirement docs, data contract definitions, and
                  acceptance criteria.
                </li>
                <li>
                  <strong>Fintech Loan Workflows:</strong> End-to-end two-wheeler
                  loan origination journeys, credit evaluation funnels, and
                  banking integrations.
                </li>
                <li>
                  <strong>Prioritization &amp; Execution:</strong> RICE and
                  MoSCoW framework application, sprint coordination, and
                  measurable business KPI tracking.
                </li>
              </ul>
              <div className="cap-footer">
                <span className="cap-tech-label">Focus Areas:</span>
                <div className="cap-tags">
                  <span>PRD Specs</span>
                  <span>Fintech Workflows</span>
                  <span>RICE Framework</span>
                  <span>Loan Journeys</span>
                  <span>User Journeys</span>
                </div>
                <div className="cap-links">
                  <Link href="/about/">See Product Experience →</Link>
                  <Link href="/work/">See Work Capabilities →</Link>
                </div>
              </div>
            </div>

            {/* Column 3: AI Research & Quantitative Analysis */}
            <div className="capability-card">
              <div className="cap-card-header">
                <span className="cap-pill">Research</span>
                <h3>AI Research &amp; Quantitative Analysis</h3>
                <p className="cap-role-desc">
                  Applying mathematical rigor, graph neural networks, and
                  statistical models to extract signal from complex systems.
                </p>
              </div>
              <ul className="cap-list">
                <li>
                  <strong>Graph Neural Networks (GNNs):</strong> Node
                  classification and link prediction for ecological networks
                  using PyTorch Geometric.
                </li>
                <li>
                  <strong>Scientific Literature Pipelines:</strong> Automated
                  parsing and structured entity extraction from complex academic
                  publications.
                </li>
                <li>
                  <strong>Financial Valuation Modeling:</strong> Discounted Cash
                  Flow (DCF), WACC estimation, Gordon Growth, and exit multiple
                  sensitivity tables.
                </li>
                <li>
                  <strong>Econometrics &amp; Time Series:</strong> Empirical
                  statistical modeling, financial data analysis, and predictive
                  feature engineering.
                </li>
              </ul>
              <div className="cap-footer">
                <span className="cap-tech-label">Core Domains:</span>
                <div className="cap-tags">
                  <span>Graph Neural Networks</span>
                  <span>PyG</span>
                  <span>DCF Modeling</span>
                  <span>Financial Engineering</span>
                  <span>Pandas</span>
                </div>
                <div className="cap-links">
                  <Link href="/research/">Explore OIST Research →</Link>
                  <Link href="/projects/finance-tools/">See Valuation Engine →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SURFACE PROFESSIONAL EXPERIENCE AND EDUCATION */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-header-compact">
            <div>
              <p className="eyebrow">Track Record</p>
              <h2 className="section-title">
                Experience &amp; <em className="serif">Education.</em>
              </h2>
            </div>
            <p className="section-subtitle">
              Verified roles across product management, applied scientific
              research, and quantitative analytics.
            </p>
          </div>

          <div className="exp-edu-grid">
            {/* Experience Column */}
            <div className="exp-column">
              <h3 className="column-heading">Professional &amp; Research Roles</h3>
              <div className="experience-timeline">
                <div className="exp-item">
                  <div className="exp-meta">
                    <span className="exp-period">Dec 2025 – Present</span>
                    <span className="exp-org">Drivio Technologies</span>
                  </div>
                  <h4 className="exp-role">Associate Product Manager</h4>
                  <p className="exp-desc">
                    Directing two-wheeler loan origination journeys,
                    cross-functional delivery, core banking API integrations,
                    and structured operational AI workflows.
                  </p>
                </div>

                <div className="exp-item">
                  <div className="exp-meta">
                    <span className="exp-period">June 2025 – Feb 2026</span>
                    <span className="exp-org">
                      Okinawa Institute of Science and Technology (OIST)
                    </span>
                  </div>
                  <h4 className="exp-role">AI Research Intern</h4>
                  <p className="exp-desc">
                    Researched Graph Neural Networks for ecological food webs
                    and engineered automated literature ingestion pipelines to
                    extract structured research data.
                  </p>
                </div>

                <div className="exp-item">
                  <div className="exp-meta">
                    <span className="exp-period">Nov 2024 – June 2025</span>
                    <span className="exp-org">Drivio Technologies</span>
                  </div>
                  <h4 className="exp-role">Business Analyst</h4>
                  <p className="exp-desc">
                    Analyzed finance operations, customer loan conversion
                    funnels, and implemented LLM-assisted workflows for content
                    and operational efficiency.
                  </p>
                </div>

                <div className="exp-item">
                  <div className="exp-meta">
                    <span className="exp-period">Mar 2023 – July 2023</span>
                    <span className="exp-org">Analy Assist</span>
                  </div>
                  <h4 className="exp-role">Business Consultant &amp; Analyst</h4>
                  <p className="exp-desc">
                    Conducted quantitative market research, go-to-market
                    strategic planning, and automated executive decision
                    dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Education Column */}
            <div className="edu-column">
              <h3 className="column-heading">Academic Education</h3>
              <div className="education-cards">
                <div className="edu-card">
                  <div className="edu-period">2025 – 2027 (Expected)</div>
                  <h4 className="edu-degree">M.Sc. in Financial Engineering</h4>
                  <div className="edu-institution">WorldQuant University</div>
                  <p className="edu-desc">
                    Advanced graduate studies in continuous-time finance,
                    stochastic calculus, econometrics, statistical arbitrage, and
                    valuation modeling.
                  </p>
                </div>

                <div className="edu-card">
                  <div className="edu-period">2022 – 2025</div>
                  <h4 className="edu-degree">B.Sc. in Data Analytics</h4>
                  <div className="edu-institution">
                    Delhi Skill and Entrepreneurship University (DSEU
                    Shakarpur-2)
                  </div>
                  <p className="edu-desc">
                    Rigorous foundation in statistical computing, database
                    management systems (SQL/PostgreSQL), Python data
                    architecture, and machine learning fundamentals.
                  </p>
                </div>

                <div className="edu-summary-box">
                  <h4>Connecting Theory to Systems</h4>
                  <p>
                    My academic training in quantitative finance and data science
                    directly informs how I build deterministic valuation tools,
                    evaluate model hallucinations, and design resilient
                    event-driven architectures.
                  </p>
                  <Link className="link-arrow" href="/about/">
                    Read complete background on About page →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESEARCH HIGHLIGHT & SELECTED WRITING */}
      <section className="section section-muted" id="research-and-writing">
        <div className="container">
          {/* Research Highlight Card */}
          <div className="research-highlight-card">
            <div className="rh-content">
              <span className="eyebrow">Applied AI Research · OIST Japan</span>
              <h2 className="rh-title">
                Graph Neural Networks &amp;{" "}
                <em className="serif">Ecological Food Webs</em>
              </h2>
              <p className="rh-desc">
                At the Okinawa Institute of Science and Technology, my research
                investigated how Graph Neural Networks (GNNs) model complex
                trophic interactions in ecological networks. By treating species
                as nodes and energy flows as directed edges, GNNs capture
                non-linear topological dependencies that traditional scalar
                metrics miss. I also engineered automated ingestion pipelines to
                synthesize unstructured scientific literature into structured
                ecological modeling datasets.
              </p>
              <div className="rh-actions">
                <Link
                  className="button button-primary"
                  href="/research/graph-neural-networks-ecological-modeling.html"
                >
                  Explore OIST Research Account →
                </Link>
                <Link className="button button-secondary" href="/research/">
                  Research Perspective Overview →
                </Link>
              </div>
            </div>
            <div className="rh-aside">
              <div className="rh-fact">
                <span className="rh-fact-label">Institution</span>
                <span className="rh-fact-val">
                  Okinawa Institute of Science and Technology (OIST)
                </span>
              </div>
              <div className="rh-fact">
                <span className="rh-fact-label">Core Architecture</span>
                <span className="rh-fact-val">
                  Graph Convolutional &amp; Attention Networks (PyG)
                </span>
              </div>
              <div className="rh-fact">
                <span className="rh-fact-label">Applied Domain</span>
                <span className="rh-fact-val">
                  Marine &amp; Terrestrial Trophic Interaction Networks
                </span>
              </div>
            </div>
          </div>

          {/* Selected Writing Section */}
          <div className="home-writing-section">
            <div className="section-header-compact">
              <div>
                <p className="eyebrow">The Technical Library</p>
                <h2 className="section-title">
                  Selected Technical <em className="serif">Writing.</em>
                </h2>
              </div>
              <p className="section-subtitle">
                In-depth guides on AI systems, financial modeling, and
                architectural trade-offs, drawn from my 326-article library.
              </p>
            </div>

            <div className="home-writing-grid">
              {displayArticles.map((article) => (
                <article key={article.slug} className="home-writing-card">
                  <div className="hw-meta">
                    <span className="hw-category">{article.category}</span>
                    <span className="hw-date">
                      {formatDate(article.datePublished)}
                    </span>
                    {article.readingTime && (
                      <span className="hw-readtime">
                        {article.readingTime}m read
                      </span>
                    )}
                  </div>
                  <h3 className="hw-title">
                    <Link href={`/blog/${article.category}/${article.slug}/`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="hw-desc">{article.description}</p>
                  <Link
                    className="read-more-link"
                    href={`/blog/${article.category}/${article.slug}/`}
                  >
                    Read Guide →
                  </Link>
                </article>
              ))}
            </div>

            <div className="home-writing-footer">
              <Link className="button button-secondary" href="/blog/">
                Visit Complete Writing Library (326 Guides) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT CALL TO ACTION */}
      <section className="section home-cta-section" id="contact">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <p className="eyebrow">Let's Connect</p>
              <h2 className="cta-title">
                Have an intelligent system to build or{" "}
                <em className="serif">a problem to solve?</em>
              </h2>
              <p className="cta-intro">
                Whether you are looking to hire an AI engineer or product
                manager, need targeted engineering consulting, or want to
                discuss research collaboration, I welcome the conversation.
              </p>
              <div className="cta-actions">
                <InquiryButton
                  className="button button-primary"
                  labelOverride="Send an Inquiry"
                />
                <Link className="button button-secondary" href="/contact/">
                  Direct Contact Options →
                </Link>
                <a
                  className="cta-email-link"
                  href="mailto:kumaraniketn@gmail.com"
                >
                  kumaraniketn@gmail.com ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
