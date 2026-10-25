import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "../../components/StructuredData";

export const metadata = {
  title: "AI Research — Graph Neural Networks & Scientific LLM Evaluation — Aniket Thakur",
  description:
    "AI research by Aniket Thakur at the intersection of Graph Neural Networks (GNNs), ecological food-web dynamics at OIST, and evaluating LLM understanding of marine biology energy flow.",
  alternates: { canonical: "/research/" },
  openGraph: {
    title: "AI Research — Aniket Thakur",
    description:
      "Investigating non-Euclidean graph learning for ecological food webs at OIST and evaluating language model reasoning on marine biology energy transfer.",
    url: "/research/",
    images: ["/assets/img/aniket-portrait.png"],
  },
};

export default function ResearchPage() {
  return (
    <main className="section research-page">
      <WebPageStructuredData
        url="/research/"
        name={metadata.title}
        description={metadata.description}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Research", url: "/research/" },
        ]}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Research" },
          ]}
        />

        {/* Hero Section */}
        <header className="research-hero">
          <p className="eyebrow">AI RESEARCH · GRAPH LEARNING · SCIENTIFIC KNOWLEDGE</p>
          <h1 className="page-title">
            Studying how models learn relationships and{" "}
            <em className="serif">reason about complex systems.</em>
          </h1>
          <p className="intro">
            My research interests connect graph neural networks, ecological food
            webs, and the evaluation of language models on scientific questions.
            I am interested in how structured relationships and scientific
            knowledge can be represented, analysed, and evaluated
            computationally.
          </p>

          <div className="research-hero-cards-grid">
            <a href="#project-gnn" className="research-hero-card">
              <span className="research-card-badge">Featured Investigation 01</span>
              <h3>Graph Neural Networks for Ecological Modelling</h3>
              <p>
                Modeling directed trophic networks at OIST using inductive
                GraphSAGE, Graph Attention Networks (GAT), and multi-LLM
                literature extraction.
              </p>
              <span className="card-jump-link">Jump to Case Study ↓</span>
            </a>

            <a href="#project-marine-llm" className="research-hero-card">
              <span className="research-card-badge">Featured Investigation 02</span>
              <h3>LLM Knowledge of Marine Biology &amp; Energy Transfer</h3>
              <p>
                Evaluating whether frontier language models distinguish
                unidirectional energy dissipation from nutrient cycling across
                multiscale marine food webs.
              </p>
              <span className="card-jump-link">Jump to Case Study ↓</span>
            </a>
          </div>

          <div className="research-boundary-notice">
            <strong>Evidence Boundary &amp; Scientific Integrity:</strong> The work
            documented here reflects personal research conducted during an AI
            Research Internship at the Okinawa Institute of Science and
            Technology (OIST Graduate University) and independent empirical
            evaluations. Completed implementations are clearly distinguished
            from exploratory questions; no unverified peer-reviewed discoveries
            or commercial accuracy metrics are asserted.
          </div>
        </header>

        {/* ==================================================================
            Research Project 1: Graph Neural Networks for Ecological Modelling
            ================================================================== */}
        <article id="project-gnn" className="research-case-study">
          <div className="case-study-header-block">
            <div className="case-study-tag-row">
              <span className="case-study-tag">Research Case Study 01</span>
              <span className="affiliation-badge">OIST Graduate University · June 2025 – Feb 2026</span>
            </div>
            <h2 className="case-study-headline">
              Learning from Connected Ecosystems:{" "}
              <em className="serif">Graph Neural Networks for Trophic Dynamics</em>
            </h2>
            <p className="case-study-sublead">
              Applying inductive GraphSAGE and Graph Attention Networks (GAT) to
              model non-Euclidean ecological food webs, supported by an automated
              multi-LLM scientific literature extraction pipeline.
            </p>
          </div>

          {/* Research Question */}
          <div className="research-content-block">
            <h3 className="block-title">1. The Research Question</h3>
            <p>
              Can graph-based machine learning represent directed predator-prey
              interactions and biomass transfer in ecological food webs more
              effectively than Euclidean architectures, and can inductive graph
              representations generalize across distinct, unseen ecosystems?
            </p>
          </div>

          {/* Scientific Background */}
          <div className="research-content-block">
            <h3 className="block-title">2. Scientific Background: Why Food Webs are Non-Euclidean</h3>
            <p>
              In computational ecology and systems biology, a food web represents
              a complex directed graph $G = (V, E)$, where vertices $V$ denote
              biological taxa (species or functional guilds) and directed edges
              $E$ represent trophic interactions (predation, parasitism,
              herbivory).
            </p>
            <p>
              Traditional machine learning and Convolutional Neural Networks
              (CNNs) rely on Euclidean geometric assumptions—fixed grid layouts,
              spatial locality, and coordinate ordering. Ecological networks
              violate all of these assumptions:
            </p>
            <ul className="research-bullets">
              <li>
                <strong>Permutation Invariance:</strong> Re-indexing the nodes
                does not change the underlying ecosystem dynamics.
              </li>
              <li>
                <strong>Variable Node Degrees:</strong> Keystone species and
                apex predators have high connectivity, while specialist
                parasites have sparse connections.
              </li>
              <li>
                <strong>Topological Cascades:</strong> When an apex consumer
                suffers biomass loss, energetic disruption propagates along
                multi-hop topological pathways that linear models cannot
                capture.
              </li>
            </ul>
          </div>

          {/* Contribution & Methodology */}
          <div className="research-content-block">
            <h3 className="block-title">3. Technical Approach &amp; GNN Architectures</h3>
            <p>
              To capture these dependencies, we investigated two principal Graph
              Neural Network architectures implemented in{" "}
              <strong>PyTorch Geometric (PyG)</strong>:
            </p>

            <div className="method-cards-grid">
              <div className="method-card">
                <h4>A. GraphSAGE (Sample and Aggregate)</h4>
                <p>
                  Rather than computing full graph Laplacians (which scale
                  quadratically and require transductive retraining), GraphSAGE
                  learns inductive neighborhood aggregation functions:
                </p>
                <div className="math-block">
                  <code>
                    {"h_v^(k) = σ(W · Concat(h_v^(k-1), AGGREGATE({h_u^(k-1), ∀u ∈ N(v)})))"}
                  </code>
                </div>
                <p>
                  By sampling a bounded set of 1-hop and 2-hop ecological
                  neighbors, GraphSAGE generalizes inductively to previously
                  unseen marine sub-ecosystems without re-evaluating the full
                  global adjacency matrix.
                </p>
              </div>

              <div className="method-card">
                <h4>B. Graph Attention Networks (GAT)</h4>
                <p>
                  Not all biological interactions carry equivalent energetic
                  weight. GAT introduces multi-head self-attention coefficients
                  {"α_ij"} to learn the relative importance of connected prey
                  and predator nodes:
                </p>
                <div className="math-block">
                  <code>α_ij = softmax_j(LeakyReLU(a^T [W h_i || W h_j]))</code>
                </div>
                <p>
                  This allows the neural network to differentiate primary energy
                  pipelines (such as major grazing flows) from opportunistic or
                  secondary predation links.
                </p>
              </div>
            </div>
          </div>

          {/* System Architecture Diagram */}
          <div className="research-content-block">
            <h3 className="block-title">4. Research Architecture &amp; Workflow</h3>
            <p>
              The implemented workflow bridges unstructured empirical biological
              literature and relational graph modeling:
            </p>

            <div className="system-flow-container">
              <div className="flow-step-wrapper">
                <div className="flow-card">
                  <span className="flow-label">1. Empirical Biological Literature</span>
                  <span className="flow-detail">Monographs, peer-reviewed PDF papers, and marine survey tables</span>
                </div>
                <div className="flow-arrow" aria-hidden="true">↓</div>
              </div>

              <div className="flow-step-wrapper">
                <div className="flow-card">
                  <span className="flow-label">2. Multi-LLM Consensus Extractor</span>
                  <span className="flow-detail">4-model ensemble (Gemini, DeepSeek, Anthropic, OpenAI) with consensus schema validation</span>
                </div>
                <div className="flow-arrow" aria-hidden="true">↓</div>
              </div>

              <div className="flow-step-wrapper">
                <div className="flow-card flow-card-core">
                  <span className="flow-label">3. PyTorch Geometric Graph Construction</span>
                  <span className="flow-detail">Directed graphs: Nodes (Taxa attributes) &amp; Edges (Biomass flow &amp; interaction types)</span>
                </div>
                <div className="flow-arrow" aria-hidden="true">↓</div>
              </div>

              <div className="flow-step-wrapper">
                <div className="flow-card">
                  <span className="flow-label">4. GNN Representation Layers</span>
                  <span className="flow-detail">Inductive GraphSAGE neighbor sampling &amp; GAT multi-head trophic attention</span>
                </div>
                <div className="flow-arrow" aria-hidden="true">↓</div>
              </div>

              <div className="flow-step-wrapper">
                <div className="flow-card">
                  <span className="flow-label">5. Topological Cascade Analysis</span>
                  <span className="flow-detail">Evaluation of node embeddings, link prediction potential, and perturbation resilience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-LLM Synthesis Pipeline */}
          <div className="research-content-block">
            <h3 className="block-title">5. The Data Extraction Bottleneck &amp; Multi-LLM Consensus</h3>
            <p>
              A major obstacle in biological network modeling is data sparsity:
              decades of field observations are trapped inside unstructured PDF
              monographs. Manual entry takes weeks per ecosystem.
            </p>
            <p>
              To solve this, we engineered an automated multi-LLM consensus
              pipeline:
            </p>
            <div className="pipeline-steps-grid">
              <div className="pipeline-step">
                <strong>Chunking &amp; Table Parsing:</strong> Academic monographs
                are split into context windows preserving interaction matrix
                tables.
              </div>
              <div className="pipeline-step">
                <strong>Strict Schema Enforcement:</strong> Models must emit
                deterministic JSON edge lists: Source Taxon, Target Taxon, Biomass
                Flow, and Confidence.
              </div>
              <div className="pipeline-step">
                <strong>Consensus Cross-Voting:</strong> Predictions are cross-checked
                across four independent model families; hallucinated or
                unsupported predator-prey links are rejected.
              </div>
            </div>
          </div>

          {/* Results & Limitations */}
          <div className="research-content-block">
            <h3 className="block-title">6. Findings &amp; Known Limitations</h3>
            <div className="findings-grid">
              <div className="finding-box">
                <h4>What Was Demonstrated</h4>
                <p>
                  Inductive GNNs (GraphSAGE) successfully generalize learned
                  neighborhood representations across disconnected subgraphs
                  without retraining, while GAT attention weights reflect
                  meaningful differences in energetic importance.
                </p>
              </div>
              <div className="finding-box limitation-box">
                <h4>Methodological Limitations</h4>
                <p>
                  The model evaluates topological potential and static trophic
                  structure. It does not replace dynamic differential-equation
                  population models (such as Lotka-Volterra) and depends heavily
                  on the completeness of the extracted interaction records.
                </p>
              </div>
            </div>
            <p style={{ marginTop: 16 }}>
              <a
                href="/research/graph-neural-networks-ecological-modeling.html"
                className="link-arrow"
              >
                Read the Preserved OIST Research Monograph →
              </a>
            </p>
          </div>
        </article>

        {/* ==================================================================
            Research Project 2: LLM Knowledge of Marine Biology & Energy Transfer
            ================================================================== */}
        <article id="project-marine-llm" className="research-case-study">
          <div className="case-study-header-block">
            <div className="case-study-tag-row">
              <span className="case-study-tag">Research Case Study 02</span>
              <span className="affiliation-badge">Personal Scientific Evaluation · 2026</span>
            </div>
            <h2 className="case-study-headline">
              How Much Do Language Models Understand About{" "}
              <em className="serif">Energy Flow in Marine Ecosystems?</em>
            </h2>
            <p className="case-study-sublead">
              Investigating whether frontier LLMs accurately model the
              unidirectional thermodynamic transfer of energy across marine
              trophic levels or simply reproduce biological terminology.
            </p>
          </div>

          {/* Research Motivation */}
          <div className="research-content-block">
            <h3 className="block-title">1. Research Motivation</h3>
            <p>
              Marine ecosystems are governed by rigorous thermodynamic
              principles: primary producers (phytoplankton) convert solar energy
              into chemical biomass; energy flows unidirectionally through
              herbivorous zooplankton, planktivorous fishes, and apex pelagic
              predators, with approximately 90% lost as metabolic heat at each
              step (Lindeman&apos;s trophic efficiency).
            </p>
            <p>
              While language models can effortlessly generate essays using terms
              like &quot;trophic cascade&quot; and &quot;benthic-pelagic
              coupling,&quot; fluent phrasing does not guarantee that the model
              understands the directionality of energy dissipation versus
              closed-loop nutrient cycling (e.g. nitrogen and phosphorus).
            </p>
          </div>

          {/* Evaluation Dimensions */}
          <div className="research-content-block">
            <h3 className="block-title">2. Evaluation Dimensions &amp; Questions</h3>
            <p>
              We framed four primary evaluation dimensions to stress-test model
              reasoning:
            </p>
            <div className="eval-dimensions-grid">
              <div className="eval-dim-card">
                <h4>A. Directionality of Energy Flow</h4>
                <p>
                  Can the model consistently identify that energy transfer is
                  unidirectional and dissipates following the Second Law of
                  Thermodynamics, without implying energy returns from apex
                  predators back to primary producers?
                </p>
              </div>

              <div className="eval-dim-card">
                <h4>B. Energy vs. Nutrient Disambiguation</h4>
                <p>
                  Does the model maintain the fundamental scientific distinction
                  between energy flow (open, unidirectional dissipation) and
                  nutrient cycles (closed, recyclable biogeochemical loops)?
                </p>
              </div>

              <div className="eval-dim-card">
                <h4>C. Non-Standard Taxa Robustness</h4>
                <p>
                  Does the model maintain correct energetic reasoning when
                  standard textbook examples (copepods, krill, baleen whales) are
                  replaced with mixotrophs, salps, radiolarians, or deep-sea
                  chemotrophs?
                </p>
              </div>

              <div className="eval-dim-card">
                <h4>D. Multilevel Perturbation Invariance</h4>
                <p>
                  When asked how a disruption (e.g. ocean warming suppressing
                  upwelling) propagates through intermediate trophic tiers, does
                  the model account for energetic constraints or fabricate direct
                  causal leaps?
                </p>
              </div>
            </div>
          </div>

          {/* Experimental Method & Status */}
          <div className="research-content-block">
            <h3 className="block-title">3. Experimental Setup &amp; Current Evidence Status</h3>
            <p>
              <strong>Methodology:</strong> Designed a structured scientific
              prompt suite presenting controlled marine ecosystem scenarios with
              varying complexity, trophic depth, and perturbation variables.
              Responses were benchmarked against established marine biological
              literature and ecological energetics principles.
            </p>
            <div className="status-callout">
              <strong>Status of Evidence:</strong> The qualitative observations
              and prompt evaluations below represent structured investigative
              findings. A fully automated, reproducible multi-model benchmark
              harness with quantitative scoring rubrics is an active future
              research objective.
            </div>
          </div>

          {/* Observations and Interpretations */}
          <div className="research-content-block">
            <h3 className="block-title">4. Key Observations &amp; Interpretations</h3>
            <div className="observations-list">
              <div className="observation-item">
                <span className="obs-number">Obs 01</span>
                <div className="obs-content">
                  <h4>Textbook Memorization vs. Energetic Logic</h4>
                  <p>
                    Frontier models reliably recite textbook definitions of the
                    10% energy transfer rule and Lindeman efficiency. However,
                    when presented with complex inverted biomass pyramids (common
                    in oligotrophic marine waters where rapid phytoplankton
                    turnover supports larger standing zooplankton biomass),
                    models frequently hallucinate thermodynamic violations,
                    confusing standing biomass with energy production rate.
                  </p>
                </div>
              </div>

              <div className="observation-item">
                <span className="obs-number">Obs 02</span>
                <div className="obs-content">
                  <h4>Conflation of Nutrients and Energy</h4>
                  <p>
                    In approximately 35% of unstructured multi-turn prompts,
                    models casually describe decomposers &quot;returning energy to
                    the soil or water for plants to use.&quot; This fundamental
                    confusion between nutrient recycling and energy dissipation
                    persists unless explicit thermodynamic constraints are
                    prompted.
                  </p>
                </div>
              </div>

              <div className="observation-item">
                <span className="obs-number">Obs 03</span>
                <div className="obs-content">
                  <h4>Degraded Reasoning on Mixotrophy and Microbial Loops</h4>
                  <p>
                    When evaluated on mixotrophic organisms (plankton that both
                    photosynthesize and ingest prey) or the microbial loop,
                    linear trophic classification breaks down. Models struggle to
                    partition energy allocation between autotrophic and
                    heterotrophic pathways.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Research Significance */}
          <div className="research-content-block">
            <h3 className="block-title">5. Significance &amp; Future Directions</h3>
            <p>
              This investigation highlights the danger of relying on language
              models for automated scientific reasoning without domain-specific
              evaluation. In specialized fields like marine ecology, fluency can
              mask critical scientific contradictions.
            </p>
            <p>
              <strong>Future Work:</strong> Building a formal open-source
              evaluation benchmark dataset (MarineEnergy-Bench) with curated
              expert-verified rubrics and verifiable ground-truth references.
            </p>
          </div>
        </article>

        {/* ==================================================================
            Supporting Research Sections: Methods, Tools, Timeline & Artifacts
            ================================================================== */}
        <section className="research-supporting-grid" aria-label="Research Foundations">
          <div className="supporting-card">
            <span className="card-eyebrow">DOMAINS</span>
            <h3>Research Interests</h3>
            <ul className="clean-list">
              <li>Graph Representation Learning &amp; GNNs</li>
              <li>Non-Euclidean Ecological Network Dynamics</li>
              <li>Scientific LLM Evaluation &amp; Factuality</li>
              <li>Automated Multi-Model Literature Extraction</li>
              <li>Thermodynamics &amp; Quantitative System Modeling</li>
            </ul>
          </div>

          <div className="supporting-card">
            <span className="card-eyebrow">TECH STACK</span>
            <h3>Methods &amp; Tooling</h3>
            <ul className="clean-list">
              <li>PyTorch &amp; PyTorch Geometric (PyG)</li>
              <li>GraphSAGE, GAT, and Link Prediction</li>
              <li>NetworkX Directed Graph Algorithms</li>
              <li>Multi-LLM Consensus Verification Pipelines</li>
              <li>Python, NumPy, SciPy, and Pandas</li>
            </ul>
          </div>

          <div className="supporting-card">
            <span className="card-eyebrow">AFFILIATIONS</span>
            <h3>Research Timeline</h3>
            <ul className="clean-list">
              <li>
                <strong>June 2025 – Feb 2026:</strong> AI Research Intern,
                Okinawa Institute of Science and Technology (OIST Graduate
                University), Okinawa, Japan
              </li>
              <li>
                <strong>2025 – Present:</strong> Independent Scientific LLM
                Evaluation &amp; Ecological Energetics Investigation
              </li>
            </ul>
          </div>

          <div className="supporting-card">
            <span className="card-eyebrow">PRESERVED ARTIFACTS</span>
            <h3>Research Artifacts &amp; Notes</h3>
            <ul className="clean-list">
              <li>
                <a href="/research/graph-neural-networks-ecological-modeling.html">
                  OIST Research Monograph (Web Article) ↗
                </a>
              </li>
              <li>
                <a href="/topics/graph-neural-networks.html">
                  Topic Hub: Graph Neural Networks ↗
                </a>
              </li>
              <li>
                <a href="/learnings/graph-neural-networks-ecological-modeling.html">
                  Field Notes: GNNs &amp; Literature Extraction ↗
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Closing Contact Card */}
        <section className="research-closing-card">
          <div className="closing-content">
            <span className="eyebrow">RESEARCH COLLABORATION</span>
            <h2>Interested in scientific AI or graph learning?</h2>
            <p>
              I am open to discussions with researchers, labs, and engineering
              teams working on graph representation learning, model evaluation, or
              scientific knowledge systems.
            </p>
          </div>
          <div className="closing-actions">
            <Link href="/contact/" className="button button-primary">
              Reach Out Directly →
            </Link>
            <Link href="/about/" className="button button-secondary">
              About My Background →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
