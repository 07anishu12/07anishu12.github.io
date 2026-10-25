export const projects = [
  {
    slug: "finance-tools",
    title: "Finance Tools — DCF Valuation",
    repo: "Finance-tools",
    problem:
      "Make valuation assumptions reviewable before turning them into a result.",
    contribution:
      "A local DCF application connects research, assumption review, deterministic calculations and export.",
    flow: "React workspace → FastAPI workflow → PostgreSQL run history → Excel and JSON snapshots.",
    evidence:
      "Valuation routes enforce local-write checks and versioned review actions. Both terminal-value methods and reconciled exports are documented.",
    limitations:
      "Live SEC research and native Excel recalculation are not certified by fixture tests. This is a local tool, not a hosted financial service.",
    stack: "Python, FastAPI, React, PostgreSQL",
  },
  {
    slug: "signal-desk",
    title: "Signal Desk — Lead Agent",
    repo: "lead-agent",
    problem:
      "Give an operator a durable, explainable next action after a lead arrives.",
    contribution:
      "A TypeScript modular monolith persists inbound events and applies deterministic lead priority.",
    flow: "Provider notification → PostgreSQL inbox → normalization and routing → operator dashboard and outbox.",
    evidence:
      "The repository contains validated WhatsApp event schemas and durable conversation boundaries; outbound gates are explicit.",
    limitations:
      "Live Meta access is unverified. WhatsApp sending remains gated and automated voice is disabled by default.",
    stack: "TypeScript, Node.js, PostgreSQL, Zod",
  },
  {
    slug: "fastcharger",
    title: "FastCharger — EV Discovery",
    repo: "ev-charging-station-locator",
    problem: "Make charging-station data searchable by place and proximity.",
    contribution:
      "Separate discovery UI, API, ingestion workers and a versioned station snapshot.",
    flow: "Next.js → Hono API → PostgreSQL/PostGIS; ingestion loads the bundled snapshot.",
    evidence:
      "The inspected API mounts discovery and health routes with body limits, security headers and rate limiting.",
    limitations:
      "A snapshot does not prove real-time charger availability; live map tiles and providers have separate availability boundaries.",
    stack: "Next.js, Hono, PostgreSQL, PostGIS",
  },
  {
    slug: "prompt-bi",
    title: "Prompt BI — Natural-Language Analytics",
    repo: "prompt-bi",
    problem:
      "Help people explore business data without hand-writing every query.",
    contribution:
      "A natural-language analysis workspace with schema context, SQL validation and dashboard components.",
    flow: "React dashboard → FastAPI prompt and query services → validated connectors and database.",
    evidence:
      "The application wires authentication, rate limiting, error handlers and dashboard WebSockets.",
    limitations:
      "Connector presence does not certify live access or generated-query correctness. Provider and database configuration are required.",
    stack: "React, TypeScript, FastAPI, SQLAlchemy",
  },
  {
    slug: "invoice-ocr",
    title: "Invoice OCR Extractor",
    repo: "invoice-ocr-extractor",
    problem: "Turn invoice documents into structured fields people can review.",
    contribution:
      "An upload-and-review dashboard with OCR, optional model extraction and deterministic fallbacks.",
    flow: "Next.js upload → FastAPI validation → OCR/extractor → database → review screen.",
    evidence:
      "The upload service constrains document extensions, MIME types and size, and exposes a processing lifecycle.",
    limitations:
      "OCR quality varies with document layout. No accuracy benchmark or production deployment is claimed.",
    stack: "Next.js, FastAPI, PaddleOCR, SQLite",
  },
  {
    slug: "seojev-laya",
    title: "SEOJEV / Laya",
    repo: "SEO-Agent-using-LAYA",
    problem: "Turn repetitive crawl findings into actionable engineering work.",
    contribution:
      "A technical SEO pipeline combines crawl evidence, graph signals and local inference.",
    flow: "Crawl → evidence and template groups → local Laya inference → work orders and verification.",
    evidence:
      "The FastAPI application wires run workers, schedules and dedicated site, artifact and work-order routes.",
    limitations:
      "Apple Silicon and model setup are required. Repository claims do not establish ranking or traffic improvements.",
    stack: "Python, FastAPI, MLX, NetworkX",
  },
  {
    slug: "omnichannel",
    title: "Omnichannel AI Platform",
    repo: "omnichannel-ai-platform",
    problem:
      "Define service boundaries for a multi-channel operations platform.",
    contribution:
      "A workspace of web, API, worker and contract packages with health and security foundations.",
    flow: "Web → Fastify API → MySQL and Redis dependencies → worker/private AI service.",
    evidence:
      "The inspected API initializes dependency checks, correlation IDs, schema negotiation and log redaction.",
    limitations:
      "This is a reference foundation; configured live channel delivery and production readiness are not independently verified.",
    stack: "TypeScript, Fastify, MySQL, Redis",
  },
  {
    slug: "oist-graph-research",
    title: "OIST — Graph Neural Network Research",
    repo: null,
    problem: "Represent ecological relationships and energy flow in food webs.",
    contribution:
      "Graph modelling and scientific-literature synthesis during an AI research internship at OIST.",
    flow: "Scientific literature → structured ecological relationships → graph representations → modelling experiments.",
    evidence:
      "The preserved portfolio research account describes graph neural networks and multi-model literature synthesis.",
    limitations:
      "No private datasets, unpublished implementation, measured accuracy gain, or publication status are asserted. Evidence is the existing research account, not a public source-code audit.",
    stack: "Graph neural networks, Python, scientific literature synthesis",
  },
];
