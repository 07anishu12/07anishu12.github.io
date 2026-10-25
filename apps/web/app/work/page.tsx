import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  CollectionPageStructuredData,
} from "../../components/StructuredData";
import { InquiryButton } from "../../components/InquiryButton";

export const metadata = {
  title: "Work & Engineering Delivery — Aniket Thakur",
  description:
    "Comprehensive engineering case studies across AI systems, financial modeling, transactional outbox workflows, and geospatial data products by Aniket Thakur.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work & Engineering Delivery — Aniket Thakur",
    description:
      "Problem-solving, architecture, implementation decisions, trade-offs, and verified evidence across production-grade software systems.",
    url: "/work/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  problem: string;
  whyItMatters: string;
  role: string;
  flowSteps: { label: string; detail: string; isCore?: boolean }[];
  implementation: string;
  validation: string;
  limitations: string;
  tech: string[];
  projectSlug: string;
  repoUrl?: string;
  articleUrl?: string;
  articleLabel?: string;
}

const primaryCaseStudies: CaseStudy[] = [
  {
    id: "finance-tools",
    badge: "Finance & Quantitative Systems",
    title: "Deterministic DCF Valuation Engine with Dual-Format Reconciliation",
    problem:
      "Spreadsheet-based discounted cash flow (DCF) models frequently bury assumptions and sensitivity drivers inside deeply nested cell formulas, causing silent calculation errors during financial analysis.",
    whyItMatters:
      "Corporate valuation models must be verifiable and deterministic. When investment committees evaluate cash flows, formula drift between web dashboards and exported spreadsheets undermines trust.",
    role: "Sole System Architect & Full-Stack Engineer — modeled the financial mathematics, structured schema validation, built the FastAPI computation core, and engineered the dual-export pipeline.",
    flowSteps: [
      {
        label: "1. Driver Inputs",
        detail: "Unlevered Free Cash Flows, WACC, Terminal Growth, Exit Multiple",
      },
      {
        label: "2. Schema Gate",
        detail: "Pydantic & Zod validation enforcing numeric bounds & consistency",
      },
      {
        label: "3. Valuation Core",
        detail: "Deterministic calculation of Enterprise & Equity Value (Gordon Growth + Exit Multiple)",
        isCore: true,
      },
      {
        label: "4. Dual Export",
        detail: "Synchronized OpenPyXL Excel (.xlsx) workbook & immutable JSON audit snapshot",
      },
    ],
    implementation:
      "Built with Python, FastAPI, React, and OpenPyXL. The valuation core is isolated into pure mathematical functions with zero side effects. Terminal values are evaluated under both Gordon Growth and EV/EBITDA multiple methods, producing a unified sensitivity matrix.",
    validation:
      "Automated unit test suite verifies zero mathematical discrepancy between the web application state and exported Excel workbooks across varying tax rate and discount rate scenarios.",
    limitations:
      "Current implementation operates on manually entered or uploaded point-in-time financial statements; real-time equity market data streaming is scheduled for a future iteration.",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "OpenPyXL",
      "Financial Modeling",
      "Sensitivity Analysis",
    ],
    projectSlug: "finance-tools",
    repoUrl: "https://github.com/07anishu12/finance-tools",
    articleUrl: "/blog/finance/dcf-valuation-in-excel-a-step-by-step-model/",
    articleLabel: "Read the DCF Valuation Guide →",
  },
  {
    id: "signal-desk",
    badge: "Workflow Automation & Reliability",
    title: "Durable Ingestion Pipeline with Transactional Outbox Pattern",
    problem:
      "Direct synchronous HTTP calls from web forms to third-party CRM APIs and messaging gateways risk permanent lead loss during network blips and produce duplicate notifications on browser retries.",
    whyItMatters:
      "In commercial customer acquisition, dropped enquiries directly reduce revenue. Workflows require atomic persistence and idempotent message dispatch that survive downstream provider downtimes.",
    role: "Backend Architect & Engineer — designed the database transaction boundaries, implemented HMAC token authentication, and built the advisory-locked background outbox worker.",
    flowSteps: [
      {
        label: "1. Form Ingestion",
        detail: "Inbound customer submission verified via HMAC-signed session token",
      },
      {
        label: "2. Atomic Commit",
        detail: "PostgreSQL transaction writes lead record and outbox intents simultaneously",
        isCore: true,
      },
      {
        label: "3. Outbox Worker",
        detail: "Session advisory-locked worker fetches pending items with exponential backoff",
      },
      {
        label: "4. External Dispatch",
        detail: "Idempotent sync to Google Sheets adapter & WhatsApp notification channel",
      },
    ],
    implementation:
      "Engineered with TypeScript, Next.js, Hono, and PostgreSQL. Client submissions require a cryptographically signed token to prevent automated spam. The outbox processor uses PostgreSQL session advisory locks (`pg_try_advisory_lock`) to serialize delivery without distributed locks, retrying transient errors with bounded backoff (max 8 attempts).",
    validation:
      "Full integration test suite verifies zero lead loss when external adapters simulate 503 errors, confirmed deduplication of retry submissions, and verified OAuth 2.0 refresh persistence.",
    limitations:
      "Current dispatch targets Google Sheets and WhatsApp webhook channels; automated bi-directional CRM synchronisation and voice agents remain out of scope.",
    tech: [
      "TypeScript",
      "Next.js",
      "Hono",
      "PostgreSQL",
      "Transactional Outbox",
      "OAuth 2.0",
      "Advisory Locks",
    ],
    projectSlug: "signal-desk",
    repoUrl: "https://github.com/07anishu12/signal-desk",
    articleUrl:
      "/blog/technology/build-an-ai-agent-with-tool-calls-and-human-approval/",
    articleLabel: "Read the Outbox Architecture Guide →",
  },
  {
    id: "fastcharger",
    badge: "Geospatial Data Products",
    title: "Geospatial EV Charging Station Locator with PostGIS Indexing",
    problem:
      "EV owners searching for charging stations encounter sluggish radius queries and unstandardized connector compatibility data when navigating crowded metropolitan areas.",
    whyItMatters:
      "Finding an operational, compatible charger is time-critical for EV drivers. Geospatial APIs must return verified station listings within sub-100ms response windows even under heavy concurrent search traffic.",
    role: "Geospatial Systems Engineer — designed the bounding-box ingestion workflow, configured PostGIS spatial indexing, and implemented rate-limited API endpoints.",
    flowSteps: [
      {
        label: "1. User Location",
        detail: "Coordinate pair (lat/lng) and vehicle connector compatibility criteria",
      },
      {
        label: "2. Request Clamping",
        detail: "Hono middleware clamps search radius and bounds coordinate boxes",
      },
      {
        label: "3. Spatial Query",
        detail: "PostgreSQL/PostGIS ST_DWithin query accelerated by GiST spatial index",
        isCore: true,
      },
      {
        label: "4. Normalized Feed",
        detail: "Sub-50ms GeoJSON payload formatted with connector types and power tiers",
      },
    ],
    implementation:
      "Constructed with Next.js, Hono, and PostgreSQL with PostGIS extension. Search radiuses and coordinate limits are strictly validated to prevent full-table spatial scans. GiST indexes on station geometric points enable rapid proximity lookups.",
    validation:
      "Radial distance queries execute in under 50ms across station snapshot records; API body limiters protect database memory from malicious payload sizing.",
    limitations:
      "Indexes static and verified station directory records; dynamic real-time occupancy (charger busy/available) requires integration with proprietary CPO network protocols (OCPI).",
    tech: [
      "Next.js",
      "Hono",
      "PostgreSQL",
      "PostGIS",
      "GiST Indexing",
      "TypeScript",
    ],
    projectSlug: "fastcharger",
    repoUrl: "https://github.com/07anishu12/fastcharger",
    articleUrl:
      "/blog/auto/electric-scooter-battery-warranty-and-charging-what-to-check-before-buying/",
    articleLabel: "Read the EV Battery & Charging Guide →",
  },
  {
    id: "prompt-bi",
    badge: "AI Systems & Natural Language",
    title: "Sandboxed Natural-Language Query Engine & SQL Analytics",
    problem:
      "Non-technical stakeholders and product managers wait days for centralized data analysts to author routine SQL queries, stalling product decisions and operational insights.",
    whyItMatters:
      "Allowing non-technical users to query production databases with natural language poses severe security risks, including destructive queries (DROP/DELETE) and resource-exhausting unindexed scans.",
    role: "AI Product Designer & Full-Stack Engineer — architected the natural language to SQL translation pipeline, authored the AST security validator, and built the visualization UI.",
    flowSteps: [
      {
        label: "1. Natural Prompt",
        detail: "Plain-English business question (e.g. 'Monthly revenue by region in Q3')",
      },
      {
        label: "2. Schema Injection",
        detail: "Context injector injects normalized DDL and column descriptions",
      },
      {
        label: "3. AST Security Gate",
        detail: "Parser AST visitor blocks DDL/DML, restricts to read-only replica, clamps LIMIT 500",
        isCore: true,
      },
      {
        label: "4. Visual Output",
        detail: "Executes against read-only database replica; returns data table & Plotly chart",
      },
    ],
    implementation:
      "Built with Python, FastAPI, React, SQLAlchemy, and Plotly. The SQL query generated by the language model is parsed into an Abstract Syntax Tree (AST) prior to execution. The validator rejects any non-SELECT statements, enforces execution timeouts, and injects row limits.",
    validation:
      "Zero DDL/mutation bypasses achieved across malicious prompt injection test batteries; automated tests confirm queries execute exclusively on read-only replicas.",
    limitations:
      "Optimized for normalized star schemas and clean relational tables; highly ambiguous analytical questions or complex window functions still require human analyst review.",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "SQLAlchemy",
      "AST Validation",
      "Plotly",
      "Text-to-SQL",
    ],
    projectSlug: "prompt-bi",
    repoUrl: "https://github.com/07anishu12/prompt-bi",
    articleUrl:
      "/blog/technology/postgresql-and-pgvector-build-semantic-search/",
    articleLabel: "Read the Semantic Search & SQL Guide →",
  },
];

const secondaryCaseStudies = [
  {
    title: "Autonomous Site Graph Analysis & On-Device MLX Inference",
    slug: "seojev-laya",
    domain: "Technical SEO & Graph Signal Analysis",
    description:
      "Modeled website architectures as directed NetworkX link graphs to compute PageRank and crawl depth, synthesizing issue clusters into structured developer tickets using local Apple Silicon MLX models.",
    tech: ["Python", "FastAPI", "NetworkX", "Apple Silicon MLX", "Technical SEO"],
    projectSlug: "seojev-laya",
  },
  {
    title: "Multi-LLM Consensus Scientific Literature Pipeline",
    slug: "oist-literature",
    domain: "AI Research & Literature Extraction",
    description:
      "Engineered an automated data extraction and validation pipeline using a 4-model ensemble (Gemini, DeepSeek, Anthropic, OpenAI) to extract structured JSON ecological edge lists from unstructured PDF monographs.",
    tech: ["Python", "Multi-LLM Ensemble", "PyTorch Geometric", "Schema Enforcement"],
    projectSlug: "finance-tools", // links to research
    customLink: "/research/",
    customLinkLabel: "Explore OIST Research →",
  },
];

export default function WorkPage() {
  const structuredItems = primaryCaseStudies.map((cs) => ({
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
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Work & Capabilities" },
          ]}
        />

        {/* Hero Section */}
        <header className="work-hero">
          <p className="eyebrow">ENGINEERING &amp; PRODUCT DELIVERY</p>
          <h1 className="page-title">
            From complex problems to{" "}
            <em className="serif">working systems.</em>
          </h1>
          <p className="intro">
            I combine engineering, analytical thinking, and product judgement to
            turn ambiguous requirements into systems with clear boundaries,
            measurable behaviour, and practical value.
          </p>

          <div className="capabilities-nav-strip">
            <span className="strip-label">Focus Areas:</span>
            <span className="domain-pill">AI &amp; Automation</span>
            <span className="domain-pill">Product &amp; Workflow Systems</span>
            <span className="domain-pill">Finance &amp; Data</span>
          </div>
        </header>

        {/* Primary Case Studies Section */}
        <section
          className="work-case-studies"
          aria-label="Detailed Case Studies"
        >
          {primaryCaseStudies.map((cs, idx) => (
            <article key={cs.id} className="editorial-case-card">
              {/* Card Header */}
              <div className="case-header">
                <div className="case-meta-top">
                  <span className="case-domain-tag">{cs.badge}</span>
                  <span className="case-index">Case Study 0{idx + 1}</span>
                </div>
                <h2 className="case-heading">{cs.title}</h2>
              </div>

              {/* 8-Part Structured Analysis */}
              <div className="case-analysis-grid">
                {/* 1. Problem & 2. Why It Matters */}
                <div className="analysis-box">
                  <h3 className="box-title">
                    <span className="box-step">01</span> The Problem
                  </h3>
                  <p className="box-desc">{cs.problem}</p>
                </div>

                <div className="analysis-box">
                  <h3 className="box-title">
                    <span className="box-step">02</span> Why It Matters
                  </h3>
                  <p className="box-desc">{cs.whyItMatters}</p>
                </div>

                {/* 3. Role & Responsibilities */}
                <div className="analysis-box full-width">
                  <h3 className="box-title">
                    <span className="box-step">03</span> My Role &amp; Responsibilities
                  </h3>
                  <p className="box-desc">{cs.role}</p>
                </div>

                {/* 4. System Architecture Diagram */}
                <div className="analysis-box full-width architecture-flow-box">
                  <h3 className="box-title">
                    <span className="box-step">04</span> System Architecture Flow
                  </h3>
                  <div className="system-flow-container">
                    {cs.flowSteps.map((step, sIdx) => (
                      <div key={step.label} className="flow-step-wrapper">
                        <div
                          className={`flow-card ${step.isCore ? "flow-card-core" : ""}`}
                        >
                          <span className="flow-label">{step.label}</span>
                          <span className="flow-detail">{step.detail}</span>
                        </div>
                        {sIdx < cs.flowSteps.length - 1 && (
                          <div className="flow-arrow" aria-hidden="true">
                            ↓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Implementation Decisions */}
                <div className="analysis-box full-width">
                  <h3 className="box-title">
                    <span className="box-step">05</span> Implementation &amp; Technical Decisions
                  </h3>
                  <p className="box-desc">{cs.implementation}</p>
                </div>

                {/* 6. Validation and 7. Limitations */}
                <div className="analysis-box">
                  <h3 className="box-title">
                    <span className="box-step">06</span> Validation &amp; Evidence
                  </h3>
                  <p className="box-desc">{cs.validation}</p>
                </div>

                <div className="analysis-box">
                  <h3 className="box-title">
                    <span className="box-step">07</span> Limitations &amp; Next Steps
                  </h3>
                  <p className="box-desc">{cs.limitations}</p>
                </div>
              </div>

              {/* Technologies Row */}
              <div className="case-tech-strip">
                <span className="tech-heading">Stack:</span>
                <div className="tech-tags-list">
                  {cs.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 8. Links to Project and Repository */}
              <div className="case-footer-actions">
                <Link
                  href={`/projects/${cs.projectSlug}/`}
                  className="button button-primary"
                >
                  View Full Project Specification →
                </Link>
                {cs.repoUrl && (
                  <a
                    href={cs.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-secondary"
                  >
                    View Repository ↗
                  </a>
                )}
                {cs.articleUrl && (
                  <Link href={cs.articleUrl} className="link-arrow">
                    {cs.articleLabel}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </section>

        {/* Secondary Case Studies */}
        <section className="work-secondary-section" aria-label="Secondary Projects">
          <div className="section-title-wrap">
            <span className="eyebrow">ADDITIONAL VERIFIED WORK</span>
            <h2 className="section-title">
              Specialized Tooling &amp; <em className="serif">Research Systems</em>
            </h2>
            <p className="section-subtitle">
              Targeted implementations solving graph signal synthesis and
              scientific literature extraction bottlenecks.
            </p>
          </div>

          <div className="secondary-case-grid">
            {secondaryCaseStudies.map((sc) => (
              <div key={sc.slug} className="secondary-case-card">
                <span className="case-domain-tag">{sc.domain}</span>
                <h3 className="secondary-title">{sc.title}</h3>
                <p className="secondary-desc">{sc.description}</p>
                <div className="tech-tags-list">
                  {sc.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="secondary-link-wrap">
                  {sc.customLink ? (
                    <Link href={sc.customLink} className="link-arrow">
                      {sc.customLinkLabel}
                    </Link>
                  ) : (
                    <Link
                      href={`/projects/${sc.projectSlug}/`}
                      className="link-arrow"
                    >
                      View Project Specs →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operating Philosophy / Working Principles */}
        <section className="work-philosophy-section">
          <div className="philosophy-header">
            <span className="eyebrow">ENGINEERING STANDARDS</span>
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
                Build modular systems with explicit boundaries, clean typing, and
                native platform capabilities before reaching for bloated
                third-party abstractions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Call to Action */}
        <section className="work-inquiry-panel">
          <div className="inquiry-content">
            <span className="eyebrow">LET’S COLLABORATE</span>
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
            <Link className="button button-secondary" href="/contact/">
              Contact Details →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
