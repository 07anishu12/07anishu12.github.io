export interface RelatedProject {
  slug: string;
  title: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  repo: string | null;
  category:
    | "Finance & Analytics"
    | "AI & Automation"
    | "Full-Stack Engineering"
    | "Research";
  tagline: string;
  problem: string;
  approach?: string;
  contribution: string;
  flow: string;
  architectureDiagram?: string;
  evidence: string;
  status: string;
  limitations: string;
  stack: string;
  technologies: string[];
  featured: boolean;
  metricsOrOutcomes: string;
  relatedPath?: string;
  relatedLabel?: string;
  keyDecisions?: string;
  testsAndReproducibility?: string;
  relatedProjects?: RelatedProject[];
}

export const projects: ProjectItem[] = [
  {
    slug: "fundflow-sentinel",
    title: "FundFlow Sentinel — Mutual Fund Flow Forecasting & Stress Lab",
    repo: "FundFlow-Sentinel",
    category: "Finance & Analytics",
    tagline:
      "Quantitative decision-support engine for Indian mutual funds with walk-forward Ridge forecasting, 3-tier redemption alerts, and stress testing",
    problem:
      "Indian asset management allocators and institutional analysts struggle to model macro category-level net flow shifts and redemption stress, often relying on laggy trailing AUM metrics or unverified point-in-time assumptions without temporal leakage controls.",
    approach:
      "Constructed an offline-first Python quantitative architecture featuring persistence baselines, walk-forward Ridge regression with expanding-window evaluation, hierarchical redemption risk thresholds, and an isolated 5-factor NAV ranking engine with zero model leakage.",
    contribution:
      "Engineered the complete quantitative pipeline: temporal feature matrix generation, Ridge walk-forward cross-validation, 3-tier redemption alerting, reference AUM stress simulation (capped at 100% outflow), and 287 automated unit/integration tests with atomic CLI state reporting.",
    flow: "Raw AMFI & Market Datasets → Temporal Feature Pipeline → Ridge Walk-Forward Engine → Hierarchical Alert Scorer → Scenario Stress Lab → Streamlit Command Centre",
    architectureDiagram: `[ AMFI Monthly Category Flows ] ──► [ Temporal Feature Matrix (Zero Leakage) ]
                                                │
                                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                      FundFlow Sentinel Core Engine                        │
│   ├── Baseline Persistence Model vs Ridge Walk-Forward Regression        │
│   ├── 3-Tier Alert Engine (Mild, Elevated, Severe Redemption Risk)        │
│   └── Scenario Stress Lab (Historical Max, Forecast Shock, 100% Outflow Cap)│
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
[ Streamlit Command Centre & 5 Labs ]       [ Independent 5-Factor NAV Ranker ]
(Local-First Offline UI)                   (Strictly Isolated from Macro Flows)`,
    evidence:
      "Verified via 287 automated tests ('make test'), atomic CLI runner with SHA-256 digest validation ('data/outputs/run_report.json'), and strict mathematical invariants enforcing temporal non-leakage and zero-MAD safeguards.",
    status: "Implemented & Tested (Python / Streamlit Core)",
    limitations:
      "Macro category-level flow forecasts represent econometric approximations, not guaranteed investor redemption behavior. Evaluated on monthly historical AMFI/NSE datasets; requires dated local disclosures before production institutional allocation.",
    stack: "Python 3.11, Streamlit, Scikit-learn, Pandas, NumPy, Pytest",
    technologies: [
      "Python",
      "Quantitative Finance",
      "Time-Series Modeling",
      "Streamlit",
      "Scikit-learn",
      "Risk Management",
    ],
    featured: true,
    metricsOrOutcomes:
      "287 passing automated tests; sub-second offline pipeline execution; deterministic zero-leakage walk-forward validation; finance-safe outflow capping.",
    keyDecisions:
      "Decoupled macro category net flows from individual scheme rankings to avoid cross-contamination. Enforced temporal non-leakage by fitting scalers and Ridge estimators strictly inside expanding training folds. Capped asset-at-risk stress outflows mathematically at 100% of reference AUM.",
    testsAndReproducibility:
      "Tested on Python 3.11 with 287 automated unit and integration tests ('make test'). Includes deterministic offline CLI orchestration ('python -m fundflow.cli --offline all') with SHA-256 digest receipts in 'data/outputs/run_report.json'.",
    relatedPath:
      "/blog/finance/direct-vs-regular-mutual-funds-in-india-explained/",
    relatedLabel: "Read the Mutual Fund Investment Guide →",
    relatedProjects: [
      { slug: "finance-tools", title: "Finance Tools — DCF Valuation" },
      {
        slug: "vehicle-catalogue-pipeline",
        title: "Vehicle Catalogue & Pricing ETL",
      },
    ],
  },
  {
    slug: "classevidence-ai",
    title: "Humaniti AI — Evidence-Grounded Classroom Practice Analysis",
    repo: "ClassEvidence-AI",
    category: "AI & Automation",
    tagline:
      "Privacy-first multimodal instructional assessment engine assigning deterministic pedagogical ratings grounded exclusively in verifiable, timestamped evidence",
    problem:
      "Automated educational assessment tools routinely hallucinate subjective judgments, penalize missing data as incompetence, and utilize biased demographic proxies such as vocal cadence, accent, or facial emotion.",
    approach:
      "Engineered an evidence-grounded assessment platform enforcing strict ethical invariants: every finding links directly to exact timestamp offsets, missing evidence is labeled not_assessable rather than zero, and grades are withheld if less than 70% of the rubric is observable.",
    contribution:
      "Architected the Next.js 16.4 App Router web client, PostgreSQL database schema with Prisma ORM, ephemeral media processing pipelines, deterministic 4-tier rubric scorer (Poor, Average, Good, Excellent), and anti-bias evaluation filters.",
    flow: "Classroom Audio/Video → Ephemeral Media Stager (.private/) → Whisper Transcription & Audio Diagnostics → Evidence Grounding Engine → Deterministic 4-Tier Classification → Coaching Report",
    architectureDiagram: `[ Classroom Media Recording ]
             │ (Local Ephemeral Staging)
             ▼
┌────────────────────────────────────────────────────────┐
│               Humaniti Grounded AI Engine              │
│   ├── Audio & Transcript Diagnostic Pipeline           │
│   ├── Timestamped Evidence Item Locator (start/endSec) │
│   ├── Anti-Bias Filters (No Accent/Emotion Proxies)    │
│   └── Fail-Safe Grade Withholder (<70% Rubric Weight)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             Next.js & Prisma Coaching Hub              │
│   - Deterministic 4-Tier Rating (Poor -> Excellent)    │
│   - Transparent Auditable Video Timeline & Quotes      │
└────────────────────────────────────────────────────────┘`,
    evidence:
      "Inspected repository code enforces ephemeral scrubbing of media upon job completion, includes synthetic zero-dependency demo fixtures, and implements strict Zod schema validation across all assessment endpoints.",
    status: "Implemented Full-Stack Architecture (Next.js & Python Worker)",
    limitations:
      "Does not claim objective measurement of lifelong educator quality. Designed exclusively for structured coaching feedback on observable classroom practices; cloud LLM provider calls remain blocked by default.",
    stack:
      "Next.js 16.4, React 19, TypeScript, PostgreSQL, Prisma, Python 3.12, Whisper",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Multimodal AI",
      "AI Ethics",
      "Python",
    ],
    featured: true,
    metricsOrOutcomes:
      "Zero PII retention policy; 100% timestamped evidence attribution; automatic grade withholding under sparse observations; WCAG 2.1 AA accessible UI.",
    keyDecisions:
      "Enforced strict evidence-first invariants: every score requires verified startSec/endSec timestamp locators. Missing observations are marked not_assessable rather than zero. Automatically withholds pedagogical classifications ('insufficient_evidence') if observable rubric coverage falls below 70%.",
    testsAndReproducibility:
      "Full test suite with mock audio and transcript fixtures. Ephemeral processing scrubbers verified via automated cleanup tests. Synthetic zero-dependency demo mode accessible via '/demo' route.",
    relatedPath:
      "/blog/technology/reduce-llm-hallucinations-with-schemas-and-evidence/",
    relatedLabel: "Read the Grounded AI & Evidence Guide →",
    relatedProjects: [
      {
        slug: "prompt-bi",
        title: "Prompt BI — Natural-Language Analytics",
      },
      {
        slug: "content-automation",
        title: "Content Automation Engine",
      },
    ],
  },
  {
    slug: "finance-tools",
    title: "Finance Tools — DCF Valuation",
    repo: "Finance-tools",
    category: "Finance & Analytics",
    tagline:
      "Deterministic Discounted Cash Flow valuation engine with Excel & JSON reconciliation",
    problem:
      "Financial valuation assumptions are frequently hidden in spreadsheet cells or opaque web models, making sensitivity reviews difficult before calculating enterprise and equity value.",
    approach:
      "Decoupled the calculation engine into a deterministic FastAPI core with strict input schemas, dual terminal-value models (Gordon Growth and Exit Multiple), and dual export reconciliation.",
    contribution:
      "Engineered a local DCF application connecting financial data inputs, assumption review, deterministic WACC and cash flow projections, and dual-format report generation.",
    flow: "React Workspace → FastAPI Core Engine → PostgreSQL Assumption Store → Excel (.xlsx) & JSON Snapshots",
    architectureDiagram: `[ Financial Inputs & Drivers ]
            │
            ▼
┌───────────────────────────────┐
│     FastAPI DCF Core Engine   │
│  - Unlevered FCF Projection   │
│  - WACC & Cost of Capital     │
│  - Gordon Growth & Multiples  │
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
[ Excel Worksheets ]  [ JSON Snapshot ]`,
    evidence:
      "Valuation routes enforce local-write checks and versioned review actions. Both terminal-value methods and reconciled exports are documented in code.",
    status: "Implemented & Verified (Local Workspace)",
    limitations:
      "Live SEC Edgar automated research and native Excel formula recalculation require manual file verification. Built as a local analytical tool, not a registered financial advisory service.",
    stack: "Python, FastAPI, React, PostgreSQL, OpenPyXL",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Financial Modeling",
    ],
    featured: true,
    metricsOrOutcomes:
      "Deterministic 5-year projections; Gordon Growth & EV/EBITDA terminal values; instant zero-drift Excel export.",
    keyDecisions:
      "Enforced strict separation between the calculation engine and React frontend. Supported dual terminal value calculation methodologies to allow sensitivity comparisons under differing market regimes.",
    testsAndReproducibility:
      "FastAPI test suite verifying formula accuracy against standard Excel benchmarks; sample datasets provided in repository.",
    relatedPath: "/blog/finance/dcf-valuation-in-excel-a-step-by-step-model/",
    relatedLabel: "Read the DCF Valuation Guide →",
    relatedProjects: [
      {
        slug: "fundflow-sentinel",
        title: "FundFlow Sentinel",
      },
      {
        slug: "vehicle-catalogue-pipeline",
        title: "Vehicle Catalogue & Pricing ETL",
      },
    ],
  },
  {
    slug: "signal-desk",
    title: "Signal Desk — Lead Agent",
    repo: "lead-agent",
    category: "AI & Automation",
    tagline:
      "Durable event-driven lead routing pipeline with PostgreSQL outbox & WhatsApp state machine",
    problem:
      "Inbound customer inquiries from disparate forms often result in dropped context, missing consent records, and uncoordinated manual follow-up without audit trails.",
    approach:
      "Built a modular monolith using the transactional outbox pattern to guarantee lead persistence and serialize external messaging provider interactions safely.",
    contribution:
      "Designed and implemented inbound lead normalization, PostgreSQL transactional outbox jobs, token signature verification, and owner WhatsApp template routing.",
    flow: "Inbound Form Submission → Token Auth Gate → PostgreSQL Leads & Outbox → Persistent Worker → Provider Delivery",
    architectureDiagram: `[ Inbound Lead Submission ]
            │ (HMAC Token Signed)
            ▼
┌───────────────────────────────┐
│   PostgreSQL Atomic Commit    │
│   ├── leads table             │
│   └── lead_outbox (sheets/wa) │
└───────────────┬───────────────┘
                │
                ▼ (Advisory Lock Worker)
┌───────────────────────────────┐
│     Worker Outbox Queue       │
│  ├── Google Sheets Adapter    │
│  └── WhatsApp Signed Callback │
└───────────────────────────────┘`,
    evidence:
      "The repository contains validated WhatsApp event schemas, durable conversation boundaries, and an advisory-locked worker that prevents concurrent message races.",
    status: "Implemented & Tested (Database Outbox Monolith)",
    limitations:
      "Live Meta Cloud API access is unverified without owner approval. Outbound sending remains strictly gated; automated voice is disabled by default.",
    stack: "TypeScript, Node.js, PostgreSQL, Zod, Hono",
    technologies: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Zod",
      "Transactional Outbox",
    ],
    featured: true,
    metricsOrOutcomes:
      "Atomic persistence receipt; exponential backoff retries (30s to 1hr); zero silent data loss under network failure.",
    keyDecisions:
      "Selected PostgreSQL transactional outbox over external message brokers to keep operations simple and guarantee atomic lead writes without distributed transaction bugs.",
    testsAndReproducibility:
      "Automated integration tests validating outbox queue retries, HMAC token signatures, and idempotency.",
    relatedPath:
      "/blog/technology/build-an-ai-agent-with-tool-calls-and-human-approval/",
    relatedLabel: "Read the Agent Workflow Guide →",
    relatedProjects: [
      {
        slug: "content-automation",
        title: "Content Automation Engine",
      },
      {
        slug: "omnichannel",
        title: "Omnichannel AI Platform",
      },
    ],
  },
  {
    slug: "fastcharger",
    title: "FastCharger — EV Discovery",
    repo: "ev-charging-station-locator",
    category: "Full-Stack Engineering",
    tagline:
      "Geospatial electric vehicle charging locator with PostGIS spatial indexing & bounded ingestion",
    problem:
      "EV owners in high-density regions face fragmented station directories with slow spatial querying and outdated connector compatibility details.",
    approach:
      "Implemented a layered geospatial discovery architecture separating client discovery UI, high-performance Hono API routes, and a versioned station snapshot.",
    contribution:
      "Constructed discovery UI, station query filters, spatial indexing pipelines, rate-limiting middleware, and security headers.",
    flow: "Next.js Map Client → Hono Geospatial API → PostgreSQL / PostGIS Spatial Index → Bundled Station Snapshot",
    architectureDiagram: `[ User Location / Search ]
            │
            ▼
┌───────────────────────────────┐
│      Hono Discovery API       │
│   - Bounded Spatial Bounding  │
│   - Connector & Speed Filters │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   PostGIS Spatial Database    │
│   - ST_DWithin Geospatial     │
│   - Static Station Snapshot   │
└───────────────────────────────┘`,
    evidence:
      "The inspected API mounts discovery and health routes with strict body limits, security headers, CORS boundaries, and rate limiting.",
    status: "Implemented Architecture (Spatial Monolith)",
    limitations:
      "A static station snapshot does not prove real-time charger stall availability or live hardware uptime. Live map tiles require third-party provider keys.",
    stack: "Next.js, Hono, PostgreSQL, PostGIS, TypeScript",
    technologies: [
      "Next.js",
      "Hono",
      "PostgreSQL",
      "PostGIS",
      "Geospatial Search",
    ],
    featured: true,
    metricsOrOutcomes:
      "Sub-50ms indexed spatial proximity queries; rate-limited discovery endpoints; strict zero-leakage security boundaries.",
    keyDecisions:
      "Utilized PostGIS ST_DWithin spatial indexing to achieve sub-50ms query responses even on modest cloud instances, combined with bounded bounding-box queries.",
    testsAndReproducibility:
      "Hono route test suite verifying rate limiting, spatial bounding validation, and health checks.",
    relatedPath:
      "/blog/auto/electric-scooter-battery-warranty-and-charging-what-to-check-before-buying/",
    relatedLabel: "Read the EV Battery & Charging Guide →",
    relatedProjects: [
      {
        slug: "india-document-tools",
        title: "India Document Tools",
      },
      {
        slug: "signal-desk",
        title: "Signal Desk — Lead Agent",
      },
    ],
  },
  {
    slug: "prompt-bi",
    title: "Prompt BI — Natural-Language Analytics",
    repo: "prompt-bi",
    category: "AI & Automation",
    tagline:
      "Natural-language query engine over relational SQL with AST security sandboxing & explainable charts",
    problem:
      "Business and executive teams face multi-day turnaround lags waiting for data teams to hand-write routine operational SQL queries.",
    approach:
      "Engineered an AST-sandboxed Natural Language to SQL translation pipeline that validates table relationships, clamps query limits, and renders audited visualizations.",
    contribution:
      "Constructed natural-language analysis workspace with database schema metadata injection, SQL AST validation, and interactive dashboard components.",
    flow: "Natural Language Prompt → Schema Metadata Context → LLM SQL Generation → AST Security Linter → Read-Only Execution → Plotly Charts",
    architectureDiagram: `[ Natural Language Question ]
            │
            ▼
┌───────────────────────────────┐
│    Prompt & Schema Context    │
│   - Injected Schema Metadata  │
│   - Read-Only User Constraint │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   AST Security SQL Validator  │
│   - Blocks DROP/UPDATE/DELETE │
│   - Enforces LIMIT Clamping   │
└───────────────┬───────────────┘
                │
                ▼
[ Read-Only Replica DB ] ──► [ Plotly Charts & Summaries ]`,
    evidence:
      "The application wires authentication, query rate limiting, error handlers, read-only constraints, and dashboard WebSockets.",
    status: "Implemented & Sandboxed (Python / FastAPI)",
    limitations:
      "Connector presence does not guarantee live cloud database access or 100% LLM query correctness. Self-hosted database configuration is required.",
    stack: "React, TypeScript, FastAPI, SQLAlchemy, Plotly",
    technologies: [
      "React",
      "FastAPI",
      "SQLAlchemy",
      "Text-to-SQL",
      "AST Validation",
    ],
    featured: true,
    metricsOrOutcomes:
      "100% read-only AST safety validation; zero manual SQL required for routine queries; real-time explainable query outputs.",
    keyDecisions:
      "Parsed all model-generated SQL statements into Abstract Syntax Trees (AST) before database execution, strictly rejecting any destructive commands (DROP, ALTER, DELETE, INSERT).",
    testsAndReproducibility:
      "Pytest suite testing the AST security filter against known SQL injection vectors and mutation syntax.",
    relatedPath:
      "/blog/technology/postgresql-and-pgvector-build-semantic-search/",
    relatedLabel: "Read the Semantic Search & SQL Guide →",
    relatedProjects: [
      {
        slug: "classevidence-ai",
        title: "Humaniti AI",
      },
      {
        slug: "seojev-laya",
        title: "SEOJEV / Laya",
      },
    ],
  },
  {
    slug: "india-document-tools",
    title: "India Document Tools — Form Processing & OCR Platform",
    repo: "india-document-tools",
    category: "Full-Stack Engineering",
    tagline:
      "Full-stack document intelligence platform combining Indian exam/application form preparation utilities with OCR-backed structured extraction",
    problem:
      "Indian applicants face stringent, fragmented upload constraints across exam and recruitment portals (exact pixel dimensions, file size clamps, signature ratios), while manual verification of marksheets and identity cards creates massive administrative friction.",
    approach:
      "Built a multi-tier microservice architecture separating client-side image and PDF manipulation utilities from queue-backed FastAPI/PaddleOCR extraction workers with confidence-scored structured outputs.",
    contribution:
      "Designed the Next.js 14 user interface, Fastify backend API gateway, Redis job orchestration, PostgreSQL persistence via Prisma, and integration contracts for the Python PaddleOCR extraction service.",
    flow: "User Document Upload → Fastify API Gateway → Redis Job Queue → Python PaddleOCR Microservice → Structured Key-Value Extraction → Next.js Verification Dashboard",
    architectureDiagram: `[ Applicant Document / Form Upload ]
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│               Fastify Gateway & API Service             │
│   ├── MIME/Dimension Constraints & Presets              │
│   ├── Redis Distributed Job Queue                       │
│   └── PostgreSQL / Prisma Metadata Store                │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│            Python PaddleOCR Extraction Service          │
│   ├── Document Classifier (Identity, Marksheet, Invoice)│
│   ├── Bounding-Box Key-Value Extraction                 │
│   └── Confidence-Scored JSON / Markdown Emitter         │
└─────────────────────────────────────────────────────────┘`,
    evidence:
      "Verified multi-tier test architecture: Pytest for OCR extraction logic, Node.js integration tests in backend, and Playwright end-to-end browser automation workflows.",
    status: "Implemented Multi-Service Platform (Fastify, Next.js, Python)",
    limitations:
      "Independent software utility; not affiliated with or endorsed by any Indian government entity or examination board. Extraction accuracy depends on document scan resolution.",
    stack:
      "Next.js, Fastify, TypeScript, Redis, PostgreSQL, Prisma, Python, PaddleOCR, Docker",
    technologies: [
      "Next.js",
      "Fastify",
      "TypeScript",
      "Redis",
      "Prisma",
      "PaddleOCR",
      "Docker",
      "Document AI",
    ],
    featured: false,
    metricsOrOutcomes:
      "Sub-second client-side image preprocessing; automated table and field extraction; automated Playwright E2E test coverage; zero cloud telemetry leakage.",
    keyDecisions:
      "Separated high-throughput client-side file manipulation (canvas image resizing, client PDF optimization) from server-side OCR workloads. Isolated the Python PaddleOCR extraction engine behind a Redis job queue with Fastify gateway rate limiting and Prisma persistence.",
    testsAndReproducibility:
      "Multi-tiered test framework: Pytest for Python OCR parsing, Node.js integration tests for Fastify endpoints, and Playwright end-to-end browser automation workflows ('npm run test:e2e').",
    relatedPath:
      "/blog/technology/dify-tutorial-build-a-document-workflow-application/",
    relatedLabel: "Read the Document Workflow Architecture Guide →",
    relatedProjects: [
      { slug: "invoice-ocr", title: "Invoice OCR Extractor" },
      { slug: "fastcharger", title: "FastCharger — EV Discovery" },
    ],
  },
  {
    slug: "content-automation",
    title: "Content Automation — Multi-Platform Publishing Engine",
    repo: "multi-platform-content-automation",
    category: "AI & Automation",
    tagline:
      "Autonomous signal harvesting, LLM visual brief synthesis, headless Chrome infographic compilation, and browser-scheduled distribution",
    problem:
      "Publishing verified technical infographics and multi-slide carousels across professional platforms requires repetitive manual curation, design adjustments, and multi-channel scheduling.",
    approach:
      "Engineered an automated operations pipeline that ingests topical RSS and community signals, synthesizes platform-tailored copy via Gemini and Claude, compiles dynamic HTML templates into carousel slides using headless Chrome, and delivers draft digests to Slack.",
    contribution:
      "Developed topical signal scrapers, LLM prompt templates, dynamic HTML infographic renderers, Puppeteer browser automation scripts, and Slack notification webhooks.",
    flow: "RSS & Reddit Signals → LLM Topic Curation → Dynamic HTML Template Compiler → Headless Chrome Render → Slack Digest Approval → Puppeteer Scheduled Dispatch",
    architectureDiagram: `[ Tech RSS & Developer Feeds ] ──► [ Topical Signal Filter ]
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────┐
│               LLM Synthesis & Layout Engine             │
│   ├── Claude & Gemini Structured Post Compilers         │
│   └── Dynamic HTML Infographic & Carousel Generator     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Headless Chrome & Dispatch Layer           │
│   ├── High-DPI Carousel Image Renderer                  │
│   ├── Slack Webhook Review Digest                       │
│   └── Puppeteer Browser Automation Scheduler            │
└─────────────────────────────────────────────────────────┘`,
    evidence:
      "Inspected repository confirms decoupled state architecture in 'data/', modular generators, and scoped browser automation scripts with automated Slack webhooks.",
    status: "Implemented Operations Pipeline (Node.js & Python)",
    limitations:
      "Requires verified third-party API credentials and session cookies for automated browser dispatch. Automated posting is gated behind manual operator approval.",
    stack:
      "Python 3.10, Node.js, Puppeteer, Headless Chrome, Gemini API, Claude API, Slack Webhooks",
    technologies: [
      "Node.js",
      "Python",
      "Puppeteer",
      "LLM APIs",
      "Browser Automation",
      "Workflow Automation",
    ],
    featured: false,
    metricsOrOutcomes:
      "Zero manual HTML formatting for carousels; automated high-DPI image generation; human-in-the-loop Slack review gates.",
    keyDecisions:
      "Decoupled external signal ingestion from browser scheduling adapters. Utilized headless Chrome to render pixel-perfect high-DPI HTML infographics and carousels, maintaining an immutable state cache in 'data/' with human-in-the-loop Slack review checkpoints.",
    testsAndReproducibility:
      "Tested locally with Python 3.10 and Node.js 18; verified scoped browser automation scripts, modular generators, and Slack review gates.",
    relatedPath:
      "/blog/technology/build-an-ai-agent-with-tool-calls-and-human-approval/",
    relatedLabel: "Read the Human-in-the-Loop Agent Guide →",
    relatedProjects: [
      { slug: "signal-desk", title: "Signal Desk — Lead Agent" },
      { slug: "seojev-laya", title: "SEOJEV / Laya" },
    ],
  },
  {
    slug: "vehicle-catalogue-pipeline",
    title: "Vehicle Catalogue & Pricing ETL Pipeline",
    repo: "api-sink",
    category: "Finance & Analytics",
    tagline:
      "Async extraction, data normalization, and 10-sheet structured Excel catalogue generation across 1,940+ vehicle models and 2,230+ cities",
    problem:
      "Automotive pricing data in India is highly fragmented across variants, fuel types, and state-level RTO/tax structures, making automated financial comparisons prone to dirty data and missing variant mappings.",
    approach:
      "Built an asynchronous Python ETL pipeline that systematically ingests vehicle makes, models, and variant specifications, enforces structural and referential data-quality checks, and compiles an immutable 10-sheet Excel workbook with automated change detection.",
    contribution:
      "Engineered async HTTP clients with exponential backoff, variant normalizers, OpenPyXL 10-sheet workbook generators with formula formatting, baseline snapshot comparators, and automated pytest validation suites.",
    flow: "Raw API Endpoints → Async Bounded Extractor → Canonical JSONL Normalizer → Data Quality Validator → Versioned Snapshot Store → 10-Sheet Styled Excel Master",
    architectureDiagram: `[ Automotive API Endpoints (Cars, Bikes, Scooters) ]
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│               Async Extraction & Normalizer             │
│   ├── Bounded Exponential Backoff & Rate Limiting       │
│   ├── Canonical JSONL Serialization (Makes/Models/Specs)│
│   └── 2,235-City Multi-Tier Price Ingestion             │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               Validation & Delivery Engine              │
│   ├── Structural & Referential Integrity Checks         │
│   ├── 10-Sheet Formatted Excel Catalogue (OpenPyXL)     │
│   └── Baseline Change Detection & Alert Engine          │
└─────────────────────────────────────────────────────────┘`,
    evidence:
      "Inspected repository includes complete test suite ('pytest tests/test_pipeline.py'), detailed validation reports, and a verified 10-sheet master workbook cataloging 2,292 active and discontinued variants.",
    status: "Implemented Production Pipeline (Python / OpenPyXL)",
    limitations:
      "Built for offline catalog ingestion and batch analytics; does not provide real-time consumer dealership quote guarantees.",
    stack: "Python 3.11, Asyncio, Aiohttp, OpenPyXL, Pytest, JSONL",
    technologies: [
      "Python",
      "Data Engineering",
      "ETL Pipelines",
      "OpenPyXL",
      "Data Quality",
      "Automotive Analytics",
    ],
    featured: false,
    metricsOrOutcomes:
      "2,292 variants normalized; 1,944 models validated; 10-sheet formatted master Excel generation with automated change tracking.",
    keyDecisions:
      "Engineered an asynchronous HTTP crawler with exponential backoff and payload validation to ingest 1,940+ vehicle models and 2,230+ cities. Enforced cross-sheet referential integrity checks and compiled an immutable 10-sheet OpenPyXL master workbook with baseline change detection.",
    testsAndReproducibility:
      "Pytest validation suite in 'tests/test_pipeline.py' verifying structural integrity, counts, and change classification across 2,292 active, discontinued, and upcoming variants.",
    relatedPath:
      "/blog/finance/excel-financial-modelling-functions-and-shortcuts/",
    relatedLabel: "Read the Financial Data Modeling Guide →",
    relatedProjects: [
      { slug: "fundflow-sentinel", title: "FundFlow Sentinel" },
      { slug: "finance-tools", title: "Finance Tools — DCF Valuation" },
    ],
  },
  {
    slug: "invoice-ocr",
    title: "Invoice OCR Extractor",
    repo: "invoice-ocr-extractor",
    category: "AI & Automation",
    tagline:
      "Structured invoice document parsing with PaddleOCR and field confidence review",
    problem:
      "Manual data entry from PDF and scanned invoices is labor-intensive, error-prone, and slow across accounting and procurement workflows.",
    approach:
      "Built a processing lifecycle that parses PDF/image uploads, extracts line items and header totals via OCR, and provides a verification dashboard.",
    contribution:
      "Created document upload validator, OCR parsing workers, fallback regex field extractors, and review dashboard.",
    flow: "Document Upload → MIME/Size Validation → PaddleOCR Processing → Key-Value Extraction → SQLite Storage → Review UI",
    architectureDiagram: `[ Invoice PDF / Image ] ──► [ MIME & Size Validator ]
                                    │
                                    ▼
┌────────────────────────────────────────────────────────┐
│     PaddleOCR Extraction & Regex Fallback Engine       │
│  - Vendor Name, Invoice #, Date, Line Items, Total Tax │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
           [ SQLite Database & Review Screen ]`,
    evidence:
      "The upload service strictly constrains document extensions, MIME types, and file size, and exposes a transparent processing lifecycle.",
    status: "Implemented Prototype (FastAPI & Next.js)",
    limitations:
      "OCR quality varies with document resolution and non-standard layouts. No formal production accuracy SLA is claimed.",
    stack: "Next.js, FastAPI, PaddleOCR, SQLite",
    technologies: ["FastAPI", "Next.js", "PaddleOCR", "SQLite", "Document AI"],
    featured: false,
    metricsOrOutcomes:
      "Strict upload boundary enforcement; automated table extraction; visual human-in-the-loop review interface.",
    keyDecisions:
      "Implemented a dual-layer extraction fallback: primary bounding-box layout parsing via PaddleOCR, supplemented by deterministic regular expressions for tax ID and date formats.",
    testsAndReproducibility:
      "Unit tests validating file MIME security guards and regex parsers against synthetic receipt fixtures.",
    relatedPath:
      "/blog/technology/dify-tutorial-build-a-document-workflow-application/",
    relatedLabel: "Read the Document Workflow Guide →",
    relatedProjects: [
      {
        slug: "india-document-tools",
        title: "India Document Tools",
      },
    ],
  },
  {
    slug: "seojev-laya",
    title: "SEOJEV / Laya",
    repo: "SEO-Agent-using-LAYA",
    category: "AI & Automation",
    tagline:
      "Autonomous technical SEO audit agent using graph signals and local Apple Silicon MLX inference",
    problem:
      "SEO audits produce massive spreadsheets of disconnected crawl issues that sit unprioritized and unexecuted by development teams.",
    approach:
      "Combined site graph topology analysis with local on-device LLM reasoning to translate technical audit findings into prioritized engineering work orders.",
    contribution:
      "Engineered crawling engine, NetworkX site link graph builder, local MLX inference wrapper, and automated work-order generator.",
    flow: "Crawl Engine → Link Graph Construction → Evidence Aggregation → Local MLX Model → Verifiable Work Orders",
    architectureDiagram: `[ Target Website URL ]
            │
            ▼
┌───────────────────────────────┐
│     Crawl & Graph Engine      │
│   - NetworkX PageRank/Depth   │
│   - Broken Links & Redirects  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Local MLX Inference       │
│   - Structured Issue Grouping │
│   - Engineering Work Orders   │
└───────────────────────────────┘`,
    evidence:
      "The FastAPI application wires run workers, schedules, site artifacts, and dedicated work-order API routes.",
    status: "Implemented Tool (Python / Apple Silicon MLX)",
    limitations:
      "Requires Apple Silicon hardware and local model weights. Repository claims do not promise ranking or organic search traffic guarantees.",
    stack: "Python, FastAPI, MLX, NetworkX, BeautifulSoup",
    technologies: [
      "Python",
      "FastAPI",
      "Apple Silicon MLX",
      "NetworkX",
      "Technical SEO",
    ],
    featured: false,
    metricsOrOutcomes:
      "Local private inference with zero cloud token cost; automated page depth and link graph calculations; actionable developer work orders.",
    keyDecisions:
      "Leveraged local Apple Silicon MLX unified memory architecture for zero-cloud token cost inference, coupled with NetworkX for link-graph centrality calculations.",
    testsAndReproducibility:
      "Integration tests checking graph adjacency matrix construction and crawler depth boundary enforcement.",
    relatedPath:
      "/blog/technology/run-an-llm-on-apple-silicon-memory-and-metal/",
    relatedLabel: "Read the Apple Silicon LLM Guide →",
    relatedProjects: [
      {
        slug: "content-automation",
        title: "Content Automation Engine",
      },
    ],
  },
  {
    slug: "omnichannel",
    title: "Omnichannel AI Platform",
    repo: "omnichannel-ai-platform",
    category: "Full-Stack Engineering",
    tagline:
      "Modular microservices architecture for multi-channel customer communications and AI agent routing",
    problem:
      "Managing customer communications across email, webchat, and messaging platforms creates duplicated logic and fragmented user profiles.",
    approach:
      "Constructed an enterprise-style monorepo with isolated API, background worker, contract packages, and strict schema validation.",
    contribution:
      "Built clean monorepo architecture, Fastify service boundaries, shared contract validation, Redis queue abstractions, and log redaction middleware.",
    flow: "Web Clients → Fastify API Gateway → MySQL Persistence → Redis Queues → Private AI Worker",
    architectureDiagram: `[ Web & Messaging Clients ]
            │
            ▼
┌───────────────────────────────┐
│      Fastify API Gateway      │
│   - Correlation ID & Logging  │
│   - Zod Contract Validation   │
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
[ MySQL Database ]  [ Redis Queue ] ──► [ AI Worker Service ]`,
    evidence:
      "The inspected API initializes health dependency checks, correlation IDs, schema negotiation, and personal data log redaction.",
    status: "Architecture Foundation (Node.js Workspace)",
    limitations:
      "Reference enterprise architecture foundation. Configured live external channel delivery and production readiness are not independently verified.",
    stack: "TypeScript, Fastify, MySQL, Redis, Docker",
    technologies: ["TypeScript", "Fastify", "MySQL", "Redis", "Microservices"],
    featured: false,
    metricsOrOutcomes:
      "Strict monorepo package separation; schema-governed contracts; zero-leakage log sanitization.",
    keyDecisions:
      "Isolated contracts into a dedicated package to ensure compile-time type safety across the Fastify gateway, worker services, and external channel adapters.",
    testsAndReproducibility:
      "Automated unit tests verifying Zod contract serialization and Redis message queue lifecycle.",
    relatedPath:
      "/blog/technology/useful-mcp-servers-files-databases-and-developer-tools/",
    relatedLabel: "Read the Developer Tooling Guide →",
    relatedProjects: [
      {
        slug: "signal-desk",
        title: "Signal Desk — Lead Agent",
      },
    ],
  },
  {
    slug: "oist-graph-research",
    title: "OIST — Graph Neural Network Research",
    repo: null,
    category: "Research",
    tagline:
      "Scientific literature synthesis & Graph Neural Network representations for ecological food webs",
    problem:
      "Complex ecological food webs exhibit non-linear predator-prey dynamics and trophic cascades that standard tabular modeling fails to represent accurately.",
    approach:
      "Employed graph neural network abstractions (GNNs) to model multi-trophic interactions and synthesized cross-disciplinary computational biology literature.",
    contribution:
      "Graph modeling, literature synthesis, and structural relationship mapping during an AI research internship at the Okinawa Institute of Science and Technology (OIST).",
    flow: "Ecological Literature → Relationship Entity Extraction → Directed Graph Representation → Graph Neural Network Modeling",
    architectureDiagram: `[ Ecological Research Literature ]
            │
            ▼
┌───────────────────────────────┐
│     Entity-Relation Parser    │
│   - Trophic Levels & Species  │
│   - Biomass & Energy Exchange │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Graph Neural Network Model  │
│   - Node Embeddings           │
│   - Edge Weight Sensitivity   │
└───────────────────────────────┘`,
    evidence:
      "The preserved portfolio research account describes graph neural network formulations, trophic representations, and multi-model literature synthesis.",
    status: "Research Account (OIST Internship)",
    limitations:
      "No private proprietary datasets, commercial implementations, or publication guarantees are asserted. Grounded in the documented research account.",
    stack: "Graph Neural Networks, Python, NetworkX, Computational Modeling",
    technologies: [
      "GNNs",
      "Python",
      "NetworkX",
      "Computational Biology",
      "Scientific Synthesis",
    ],
    featured: false,
    metricsOrOutcomes:
      "Structured graph modeling of multi-species food webs; published research overview and academic literature synthesis.",
    keyDecisions:
      "Structured species relationships as heterogeneous directed graphs, capturing trophic levels as node attributes and predatory interactions as weighted edges.",
    testsAndReproducibility:
      "Documented literature review and structural relationship formulations published in the OIST research account.",
    relatedPath: "/research/graph-neural-networks-ecological-modeling.html",
    relatedLabel: "Read the OIST Research Account →",
    relatedProjects: [
      {
        slug: "fundflow-sentinel",
        title: "FundFlow Sentinel",
      },
    ],
  },
];
