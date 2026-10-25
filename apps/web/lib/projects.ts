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
}

export const projects: ProjectItem[] = [
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
    relatedPath: "/blog/finance/dcf-valuation-in-excel-a-step-by-step-model/",
    relatedLabel: "Read the DCF Valuation Guide →",
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
    relatedPath:
      "/blog/technology/build-an-ai-agent-with-tool-calls-and-human-approval/",
    relatedLabel: "Read the Agent Workflow Guide →",
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
    relatedPath:
      "/blog/auto/electric-scooter-battery-warranty-and-charging-what-to-check-before-buying/",
    relatedLabel: "Read the EV Battery & Charging Guide →",
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
    relatedPath:
      "/blog/technology/postgresql-and-pgvector-build-semantic-search/",
    relatedLabel: "Read the Semantic Search & SQL Guide →",
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
    relatedPath:
      "/blog/technology/dify-tutorial-build-a-document-workflow-application/",
    relatedLabel: "Read the Document Workflow Guide →",
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
    relatedPath:
      "/blog/technology/run-an-llm-on-apple-silicon-memory-and-metal/",
    relatedLabel: "Read the Apple Silicon LLM Guide →",
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
    relatedPath:
      "/blog/technology/useful-mcp-servers-files-databases-and-developer-tools/",
    relatedLabel: "Read the Developer Tooling Guide →",
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
    relatedPath: "/research/graph-neural-networks-ecological-modeling.html",
    relatedLabel: "Read the OIST Research Account →",
  },
];
