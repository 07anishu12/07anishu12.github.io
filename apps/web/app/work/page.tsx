import Link from "next/link";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";
import { InquiryButton } from "../../components/InquiryButton";

export const metadata = {
  title: "Work & Engineering Capabilities — Aniket Thakur",
  description:
    "Comprehensive engineering case studies across AI systems, financial modeling, event-driven outbox pipelines, data products, and technical SEO by Aniket Thakur.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work & Engineering Capabilities — Aniket Thakur",
    description:
      "Engineering case studies structured as Problem → Approach → Implementation → Outcome across AI, financial systems, and full-stack architecture.",
    url: "/work/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

const caseStudies = [
  {
    category: "AI Products & Natural Language",
    slug: "prompt-bi",
    title: "Natural-Language Query Engine & Sandboxed SQL Analytics",
    problem:
      "Non-technical teams and product managers frequently wait days for data teams to hand-write routine relational database queries, causing operational decision delays.",
    approach:
      "Constructed a schema-aware natural language to SQL translation engine that injects table context, enforces strict AST linting, and executes only against read-only replicas.",
    implementation:
      "Engineered with React, TypeScript, FastAPI, and SQLAlchemy. The SQL linter actively blocks all DDL and state-mutating statements (DROP, DELETE, UPDATE, INSERT) and enforces strict row clamping (LIMIT 500) and execution timeouts.",
    outcome:
      "Enabled self-serve business intelligence without requiring SQL knowledge from executives, maintaining 100% read-only AST safety validation and explainable query outputs.",
    tech: [
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "Text-to-SQL",
      "AST Validation",
      "Plotly",
    ],
    projectSlug: "prompt-bi",
    articleUrl:
      "/blog/technology/postgresql-and-pgvector-build-semantic-search/",
    articleLabel: "Read Semantic Search & SQL Guide →",
    diagram: `[ User Natural-Language Prompt ]
            │
            ▼
┌───────────────────────────────┐
│   Schema Context Injector     │
│   - Injected Normalized DDL   │
│   - Read-Only Role Constraint │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     AST Security Validator    │
│   - Blocks DDL & Mutations    │
│   - Enforces LIMIT Clamping   │
└───────────────┬───────────────┘
                │
                ▼
[ Read-Only Database Replica ] ──► [ Plotly Charts & Summaries ]`,
  },
  {
    category: "Financial Systems & Quantitative Modeling",
    slug: "finance-tools",
    title: "Deterministic DCF Valuation Engine with Dual-Format Reconciliation",
    problem:
      "Spreadsheet-based discounted cash flow (DCF) models often hide formula assumptions and sensitivity parameters inside nested cells, making valuation audits prone to silent errors.",
    approach:
      "Decoupled financial calculation mechanics into a deterministic, schema-validated FastAPI engine that calculates Enterprise and Equity value under both Gordon Growth and Exit Multiple methods.",
    implementation:
      "Built with Python, FastAPI, React, and OpenPyXL. Inputs (WACC, terminal growth, exit multiple, revenue projections, tax rates) are validated against strict Zod/Pydantic schemas before running deterministic cash flow calculations.",
    outcome:
      "Guaranteed mathematical determinism with zero cell-drift between the web application state and downloaded Excel workbooks (.xlsx) and JSON snapshots.",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "OpenPyXL",
      "Financial Modeling",
    ],
    projectSlug: "finance-tools",
    articleUrl: "/blog/finance/dcf-valuation-in-excel-a-step-by-step-model/",
    articleLabel: "Read DCF Valuation Guide →",
    diagram: `[ Financial Inputs & Driver Parameters ]
                    │
                    ▼
┌───────────────────────────────────────┐
│       FastAPI DCF Valuation Core      │
│   ├── Unlevered Free Cash Flows       │
│   ├── WACC & Cost of Capital (CAPM)   │
│   ├── Gordon Growth Terminal Value    │
│   └── EV/EBITDA Exit Multiple Method  │
└───────────────────┬───────────────────┘
                    │
            ┌───────┴───────┐
            ▼               ▼
   [ Excel (.xlsx) Export ] [ JSON Audit Snapshot ]`,
  },
  {
    category: "Workflow Automation & Transactional Outbox Pipelines",
    slug: "signal-desk",
    title: "Durable Lead Ingestion Pipeline with Transactional Outbox Pattern",
    problem:
      "Synchronous API calls to third-party providers (CRM, Google Sheets, messaging platforms) risk losing user submissions during network failures, or creating duplicate messages on client retries.",
    approach:
      "Implemented the Transactional Outbox pattern where inbound submissions are committed atomically to a PostgreSQL database alongside outbox intents, then processed by an advisory-locked worker.",
    implementation:
      "Built with TypeScript, Next.js App Router, Hono, and PostgreSQL. Client submissions require an HMAC-signed token. A dedicated worker acquires a PostgreSQL session advisory lock to serialize side effects, applying exponential backoff (30s to 1hr, max 8 attempts).",
    outcome:
      "Guaranteed zero lead loss under external API downtimes, verified idempotency on network retries, and reliable synchronization with Google Sheets and WhatsApp notification channels.",
    tech: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Zod",
      "Transactional Outbox",
      "Google Apps Script",
    ],
    projectSlug: "signal-desk",
    articleUrl:
      "/blog/technology/build-an-ai-agent-with-tool-calls-and-human-approval/",
    articleLabel: "Read Agent & Outbox Workflow Guide →",
    diagram: `[ Inbound Lead Submission ]
            │ (HMAC Signed Token Auth)
            ▼
┌───────────────────────────────────────┐
│       PostgreSQL Atomic Commit        │
│   ├── leads record (Normalized PII)   │
│   └── lead_outbox (Channel Intents)   │
└───────────────────┬───────────────────┘
                    │
                    ▼ (Session Advisory Lock)
┌───────────────────────────────────────┐
│        Persistent Outbox Worker       │
│   ├── Google Sheets Adapter (Raw)     │
│   └── WhatsApp Signed Message Router  │
└───────────────────────────────────────┘`,
  },
  {
    category: "Data Products & Geospatial Discovery",
    slug: "fastcharger",
    title: "Geospatial Charging Station Locator with PostGIS Spatial Indexing",
    problem:
      "EV owners in dense urban areas encounter slow directory queries and outdated connector compatibility filtering when attempting to locate compatible nearby chargers.",
    approach:
      "Structured a layered discovery engine using PostGIS spatial indexing (`ST_DWithin`), bounded bounding-box ingestion, and decoupled high-performance API endpoints.",
    implementation:
      "Built with Next.js, Hono, and PostgreSQL with PostGIS extension. Strict input limiters clamp search radius and bounding boxes to prevent memory exhaustion, while rate limiting guards public endpoints.",
    outcome:
      "Sub-50ms radial proximity searches across station snapshots, strict API body limits, and verified security boundaries against denial-of-service attempts.",
    tech: [
      "Next.js",
      "Hono",
      "PostgreSQL",
      "PostGIS",
      "TypeScript",
      "Spatial Indexing",
    ],
    projectSlug: "fastcharger",
    articleUrl:
      "/blog/auto/electric-scooter-battery-warranty-and-charging-what-to-check-before-buying/",
    articleLabel: "Read EV Battery & Charging Guide →",
    diagram: `[ User Coordinates & Filter Criteria ]
                    │
                    ▼
┌───────────────────────────────────────┐
│          Hono Geospatial API          │
│   - Radius & Coordinate Clamping      │
│   - Rate Limiting & Security Headers  │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│       PostGIS Spatial Database        │
│   - ST_DWithin Geospatial Queries     │
│   - Spatial Index (GIST) on Points    │
└───────────────────────────────────────┘`,
  },
  {
    category: "Technical SEO & Graph Signal Analysis",
    slug: "seojev-laya",
    title: "Autonomous Site Graph Analysis & On-Device MLX Inference",
    problem:
      "Site crawls generate thousands of disconnected errors in spreadsheets without architectural context, causing developer teams to ignore critical search equity issues.",
    approach:
      "Modeled website architectures as directed NetworkX link graphs to compute PageRank and crawl depth, feeding aggregated signal clusters into local Apple Silicon MLX models.",
    implementation:
      "Constructed with Python, FastAPI, NetworkX, and MLX. Crawl signals are synthesized into structured developer work orders with explicit file paths and code remedies.",
    outcome:
      "Private local inference with zero third-party token consumption, topological depth calculation, and automated developer work order generation.",
    tech: [
      "Python",
      "FastAPI",
      "Apple Silicon MLX",
      "NetworkX",
      "Graph Analysis",
      "Technical SEO",
    ],
    projectSlug: "seojev-laya",
    articleUrl:
      "/blog/technology/run-an-llm-on-apple-silicon-memory-and-metal/",
    articleLabel: "Read Apple Silicon LLM Guide →",
    diagram: `[ Website URL / Crawl Origin ]
                    │
                    ▼
┌───────────────────────────────────────┐
│         Crawl & Link Graph            │
│   - NetworkX Directed Graph Builder   │
│   - PageRank, Depth & Orphan Nodes    │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│     Local Apple Silicon MLX Model     │
│   - Issue Evidence Grouping           │
│   - Actionable Engineering Tickets    │
└───────────────────────────────────────┘`,
  },
];

export default function WorkPage() {
  const structuredItems = caseStudies.map((cs) => ({
    name: cs.title,
    url: `/projects/${cs.projectSlug}/`,
    description: cs.problem,
  }));

  return (
    <main className="section work-page">
      <CollectionPageStructuredData
        url="/work/"
        name={metadata.title}
        description={metadata.description}
        items={structuredItems}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Work", url: "/work/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="page-breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Work &amp; Capabilities</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="work-hero">
          <p className="eyebrow">
            Professional Capabilities &amp; Case Studies
          </p>
          <h1 className="page-title">
            Solving real technical problems.{" "}
            <em className="serif">Delivering verified systems.</em>
          </h1>
          <p className="intro">
            A comprehensive overview of how I design, architect, and ship
            software. Every case study details the original problem, the
            engineering approach, implementation boundaries, and empirically
            verified outcomes.
          </p>

          <div className="capabilities-nav-strip">
            <span className="strip-label">Domains:</span>
            <span className="domain-pill">AI &amp; Natural Language</span>
            <span className="domain-pill">Financial Modeling</span>
            <span className="domain-pill">Transactional Outbox</span>
            <span className="domain-pill">Geospatial Search</span>
            <span className="domain-pill">Technical SEO</span>
          </div>
        </header>

        {/* Detailed Case Studies List (Problem -> Approach -> Implementation -> Outcome) */}
        <section
          className="work-case-studies"
          aria-label="Engineering case studies"
        >
          {caseStudies.map((cs, idx) => (
            <article key={cs.slug} className="work-case-card">
              <div className="work-card-top">
                <div className="work-meta-row">
                  <span className="project-category-badge">{cs.category}</span>
                  <span className="case-number">Case Study 0{idx + 1}</span>
                </div>
                <h2 className="work-case-title">{cs.title}</h2>
              </div>

              <div className="work-four-stage-grid">
                <div className="stage-block stage-problem">
                  <h3 className="stage-heading">
                    <span className="stage-badge">1</span> Problem
                  </h3>
                  <p className="stage-body">{cs.problem}</p>
                </div>

                <div className="stage-block stage-approach">
                  <h3 className="stage-heading">
                    <span className="stage-badge">2</span> Approach
                  </h3>
                  <p className="stage-body">{cs.approach}</p>
                </div>

                <div className="stage-block stage-implementation">
                  <h3 className="stage-heading">
                    <span className="stage-badge">3</span> Implementation
                  </h3>
                  <p className="stage-body">{cs.implementation}</p>
                </div>

                <div className="stage-block stage-outcome">
                  <h3 className="stage-heading">
                    <span className="stage-badge">4</span> Outcome
                  </h3>
                  <p className="stage-body">{cs.outcome}</p>
                </div>
              </div>

              {cs.diagram && (
                <div className="work-diagram-container">
                  <span className="diagram-header">
                    System Architecture Flow
                  </span>
                  <pre className="diagram-code">
                    <code>{cs.diagram}</code>
                  </pre>
                </div>
              )}

              <div className="work-tech-row" aria-label="Technologies used">
                {cs.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="work-card-bottom">
                <div className="work-actions">
                  <Link
                    className="button button-primary"
                    href={`/projects/${cs.projectSlug}/`}
                  >
                    View Project Specification →
                  </Link>
                  <Link className="link-arrow" href={cs.articleUrl}>
                    {cs.articleLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Operating Philosophy / Working Principles */}
        <section className="work-philosophy-section">
          <div className="philosophy-header">
            <span className="eyebrow">Engineering Standards</span>
            <h2>How I Build Software</h2>
            <p className="intro">
              Core technical principles applied consistently across every
              codebase.
            </p>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h3>1. Verification Over Assumptions</h3>
              <p>
                Every feature must be grounded in verified automated tests,
                strict schema contracts, and empirical output evidence.
                Unverified claims have no place in engineering.
              </p>
            </div>
            <div className="philosophy-card">
              <h3>2. Determinism Before Generative Models</h3>
              <p>
                Financial math, authorization, and core business transactions
                should always be deterministic. Use AI models for reasoning and
                synthesis, never as an unconstrained substitute for business
                logic.
              </p>
            </div>
            <div className="philosophy-card">
              <h3>3. Outbox Durability Over Direct Chains</h3>
              <p>
                Never rely on fragile direct synchronous HTTP chains across
                external services. Commit state locally and use the
                transactional outbox pattern to guarantee idempotency and fault
                tolerance.
              </p>
            </div>
            <div className="philosophy-card">
              <h3>4. Clean Boundaries &amp; Minimal Dependencies</h3>
              <p>
                Build modular monoliths with explicit boundaries, clean typing,
                and native platform capabilities before reaching for bloated
                third-party abstractions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Call to Action */}
        <section className="work-inquiry-panel">
          <div className="inquiry-content">
            <span className="eyebrow">Let’s Collaborate</span>
            <h2>Interested in working together?</h2>
            <p>
              I am open to technical leadership, full-stack architecture, AI
              engineering, and quantitative financial product challenges.
            </p>
          </div>
          <div className="inquiry-actions">
            <InquiryButton
              className="button button-primary"
              category="general"
              labelOverride="Start a Conversation →"
            />
            <Link className="button button-secondary" href="/projects/">
              Explore All Projects →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
