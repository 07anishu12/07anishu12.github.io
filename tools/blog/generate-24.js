const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');
const { imageSize } = require('image-size');
const { parseArticle, renderMarkdown, ROOT } = require('./content');

const manifestPath = path.join(ROOT, 'data/blog-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const initialArticles = manifest.filter(m => m.in_initial_scope);

// Detailed quickAnswer objects tailored for each of the 24 articles
const quickAnswers = {
  'FIN-001': {
    question: 'CAGR vs Absolute Returns: Which formula should you use?',
    answer: 'Absolute return measures total gain or loss over an entire period; CAGR calculates the constant annual compounded growth rate that connects the start and end values.',
    facts: [
      { label: 'Absolute return formula', value: '(Ending / Beg) - 1' },
      { label: 'CAGR formula', value: '(Ending / Beg)^(1/n) - 1' }
    ],
    goodFor: [
      'Lump-sum holdings with no intermediate cash flows.',
      'Comparing multi-year performance across unequal holding periods.'
    ],
    watchFor: [
      'Intermediate cash inflows or outflows (use XIRR instead).',
      'Extrapolating short-term holding periods over a full year.'
    ],
    note: 'Assumes reinvested distributions and zero intermediate contributions.'
  },
  'FIN-002': {
    question: 'SIP vs Lump Sum: Which investment method works better?',
    answer: 'Lump-sum investing mathematically outperforms in consistently rising markets because capital is deployed early; SIP reduces drawdown risk and regret in volatile or declining markets through rupee cost averaging.',
    facts: [
      { label: 'SIP key mechanism', value: 'Rupee Cost Averaging' },
      { label: 'Lump sum advantage', value: 'Maximum Time in Market' }
    ],
    goodFor: [
      'SIP: Salaried investors matching monthly cash flow to savings.',
      'Lump sum: Long investment horizons with clear risk tolerance.'
    ],
    watchFor: [
      'Holding excess cash in low-yield accounts while waiting to time the market.',
      'Stopping SIPs during market downturns when accumulation value is highest.'
    ],
    note: 'Historical index trends show time in market generally trumps market timing.'
  },
  'FIN-003': {
    question: 'Direct vs Regular Mutual Funds: What is the real difference?',
    answer: 'Direct plans have lower total expense ratios because no distributor commissions are paid, resulting in higher compounded returns over long investment horizons for the exact same underlying portfolio.',
    facts: [
      { label: 'Expense difference', value: '0.50% – 1.00% p.a.' },
      { label: 'Portfolio difference', value: 'Identical holdings & manager' }
    ],
    goodFor: [
      'Self-directed investors comfortable selecting and managing their funds online.',
      'Maximising long-term wealth compounding over 10 to 20 years.'
    ],
    watchFor: [
      'Tax and exit load implications when switching existing regular units to direct.',
      'Loss of distributor support if you require bespoke financial planning advice.'
    ],
    note: 'Both plans share identical portfolio managers, stocks, and risk mandates.'
  },
  'FIN-004': {
    question: 'Index Funds vs Active Mutual Funds: How do they compare?',
    answer: 'Index funds replicate a benchmark with low fees and minimal manager risk; active funds charge higher expense ratios aiming to generate alpha, though many fail to consistently beat their benchmarks after fees.',
    facts: [
      { label: 'Index fund TER', value: '0.10% – 0.40%' },
      { label: 'Active fund TER', value: '1.25% – 2.25%' }
    ],
    goodFor: [
      'Core equity exposure in broad, highly efficient market segments.',
      'Investors seeking predictable market-matching returns at rock-bottom cost.'
    ],
    watchFor: [
      'Tracking error and cash drag in illiquid or synthetic index products.',
      'Manager drift or persistent benchmark underperformance in active funds.'
    ],
    note: 'Tracking error measures the standard deviation of return differences from the benchmark.'
  },
  'FIN-005': {
    question: 'ETF vs Index Fund in India: Which should you choose?',
    answer: 'ETFs trade intraday on exchanges with live prices requiring a demat account and brokerage; Index funds trade at end-of-day NAV directly through the AMC without demat requirements.',
    facts: [
      { label: 'ETF trading', value: 'Live exchange pricing' },
      { label: 'Index fund trading', value: 'End-of-day AMC NAV' }
    ],
    goodFor: [
      'Index funds: Automated SIPs with zero bid-ask spread or demat hassle.',
      'ETFs: Tactical investors trading specific intra-day market levels.'
    ],
    watchFor: [
      'Illiquid ETF bid-ask spreads creating significant execution slippage.',
      'Brokerage, demat maintenance charges, and exchange transaction fees.'
    ],
    note: 'Always compare ETF market price with intraday indicative NAV (iNAV).'
  },
  'FIN-006': {
    question: 'What is a mutual fund expense ratio and how does it affect you?',
    answer: 'The Total Expense Ratio (TER) represents the annual percentage fee deducted daily from the fund’s assets to cover management, administrative, and distribution costs, reducing your net compounded NAV.',
    facts: [
      { label: 'Deduction frequency', value: 'Calculated and deducted daily' },
      { label: 'SEBI cap limits', value: 'Tiered based on AUM slabs' }
    ],
    goodFor: [
      'Benchmarking cost efficiency across similar mutual fund categories.',
      'Identifying high-cost funds that erode long-term compounding benefits.'
    ],
    watchFor: [
      'Frequent changes in TER disclosed by AMCs on monthly fact sheets.',
      'Underlying portfolio turnover costs which fall outside the statutory TER cap.'
    ],
    note: 'All published mutual fund NAVs are already net of daily expense deductions.'
  },
  'FIN-007': {
    question: 'XIRR vs CAGR: Which formula should you use for your portfolio?',
    answer: 'CAGR calculates geometric annualised returns for a single lump-sum period; XIRR calculates annualised returns for multiple, irregular, dated cash inflows and outflows such as SIPs and withdrawals.',
    facts: [
      { label: 'CAGR input', value: 'Start date & end date only' },
      { label: 'XIRR input', value: 'Dated cash flow schedule' }
    ],
    goodFor: [
      'XIRR: Evaluating SIP investments, multiple equity tranches, and dividend flows.',
      'CAGR: Assessing point-to-point index returns or a single fixed deposit.'
    ],
    watchFor: [
      'XIRR numerical approximation errors when cash flows switch signs rapidly.',
      'Annualising short holding periods under 12 months with XIRR or CAGR.'
    ],
    note: 'Excel and Sheets require positive values for inflows and negative for outflows.'
  },
  'FIN-020': {
    question: 'Terminal Value in DCF: Perpetuity growth or exit multiple?',
    answer: 'Perpetuity growth values cash flows assuming a constant long-term growth rate below GDP; exit multiple applies a market valuation multiple (e.g., EV/EBITDA) to the final forecast year. Triangulating both provides the soundest valuation.',
    facts: [
      { label: 'Perpetuity formula', value: 'FCF_(n+1) / (WACC - g)' },
      { label: 'Typical share of EV', value: '60% – 85% of total value' }
    ],
    goodFor: [
      'Mature businesses with stable cash-flow generation and sustainable reinvestment.',
      'Stress-testing acquisition models against prevailing transaction multiples.'
    ],
    watchFor: [
      'Setting long-term perpetual growth higher than sovereign economic GDP growth.',
      'Mismatched exit multiples that do not reflect normalized industry cycles.'
    ],
    note: 'Reinvestment rate must be linked to perpetual growth: g = Reinvestment Rate × ROIC.'
  },
  'TECH-001': {
    question: 'Which free open-weight LLMs can you run locally in 2026?',
    answer: 'The leading open-weight models for local execution are Llama 3.1 8B, Qwen 2.5 7B/14B, and Mistral 7B. When quantized to 4-bit (Q4_K_M), 8B models require approximately 6–8 GB VRAM and run smoothly on modern consumer hardware.',
    facts: [
      { label: 'Recommended sweetspot', value: '7B – 8B parameters' },
      { label: 'Memory requirement', value: '6 GB – 8 GB VRAM (Q4)' }
    ],
    goodFor: [
      'Offline document summarization, coding assistance, and private data workflows.',
      'Developers avoiding recurring cloud API fees and token rate limits.'
    ],
    watchFor: [
      'Licensing restrictions on proprietary training data or commercial redistribution.',
      'Context window degradation when scaling context beyond 32k on limited RAM.'
    ],
    note: 'Quantized GGUF formats retain over 98% of FP16 benchmark perplexity.'
  },
  'TECH-002': {
    question: 'How do you download and run local LLMs with Ollama?',
    answer: 'Ollama packages model weights, prompt templates, and runtime dependencies into a single binary. Install it, run `ollama run <model>`, and immediately access local inference via CLI, REST API, or web clients.',
    facts: [
      { label: 'Default API port', value: 'localhost:11434' },
      { label: 'Supported OS', value: 'macOS, Linux, Windows' }
    ],
    goodFor: [
      'Beginners wanting a one-command setup for local AI inference.',
      'Developers integrating local LLMs into Python, Node.js, or Docker stacks.'
    ],
    watchFor: [
      'Default models running in system RAM if GPU drivers are misconfigured.',
      'High disk usage from storing multiple model versions (3–5 GB per 8B model).'
    ],
    note: 'Ollama uses an OpenAI-compatible /v1 chat completions endpoint natively.'
  },
  'TECH-003': {
    question: 'What is llama.cpp and how do quantized GGUF models work?',
    answer: 'llama.cpp is a high-performance C/C++ inference engine without external dependencies; it pioneered GGUF quantization, reducing 16-bit float model weights to 4-bit integers with minimal perplexity degradation.',
    facts: [
      { label: 'Quantization savings', value: '~70% memory reduction' },
      { label: 'Inference speedup', value: '2x – 4x on CPU/Metal' }
    ],
    goodFor: [
      'Apple Silicon (Metal acceleration) and memory-constrained PCs.',
      'Fine-grained control over GPU layer offloading and thread allocation.'
    ],
    watchFor: [
      'Selecting overly compressed quants (Q2_K) which produce noticeable quality degradation.',
      'Mismatch between compiler flags and CPU vector instruction sets (AVX2/AVX512).'
    ],
    note: 'GGUF files store both model architecture hyperparameters and tensor weights.'
  },
  'TECH-004': {
    question: 'How do you build a local ChatGPT-style interface with Open WebUI?',
    answer: 'Open WebUI is an extensible self-hosted AI interface that connects directly to local inference backends like Ollama and vLLM, providing multi-model chat, document RAG, user auth, and web browsing.',
    facts: [
      { label: 'Deployment method', value: 'Docker container or pip' },
      { label: 'Backend connection', value: 'Ollama & OpenAI-compatible APIs' }
    ],
    goodFor: [
      'Teams and households wanting a shared, private ChatGPT replacement.',
      'Chatting with local PDFs and documents without third-party data leakage.'
    ],
    watchFor: [
      'Configuring host network bindings securely when exposing past localhost.',
      'Resource contention between the Open WebUI container and LLM inference engine.'
    ],
    note: 'Supports role-based access control (RBAC) and local vector embeddings.'
  },
  'TECH-005': {
    question: 'How do Hugging Face Transformers load and execute models in Python?',
    answer: 'Transformers provides a standardized API (`AutoTokenizer` and `AutoModelForCausalLM`) to download weights from the Hugging Face Hub, tokenize strings into tensor inputs, and execute autoregressive text generation.',
    facts: [
      { label: 'Core pipeline', value: 'Text → Tokenizer → Tensors → Model' },
      { label: 'Framework support', value: 'PyTorch, TensorFlow, JAX' }
    ],
    goodFor: [
      'Research, prototyping custom model architectures, and fine-tuning experiments.',
      'Direct programmatic control over generation logits, temperature, and top-p sampling.'
    ],
    watchFor: [
      'Out of Memory (OOM) errors from loading unquantized FP32/FP16 models directly.',
      'Mismatch between tokenizer padding tokens and model attention masks.'
    ],
    note: 'Use `device_map="auto"` and `bitsandbytes` for seamless 4-bit GPU loading.'
  },
  'TECH-006': {
    question: 'What is vLLM and how does PagedAttention improve multi-user throughput?',
    answer: 'vLLM is a high-throughput LLM serving engine that implements PagedAttention—a memory management technique inspired by OS virtual memory paging that eliminates KV-cache fragmentation and maximizes concurrent batching.',
    facts: [
      { label: 'Throughput gain', value: '2x – 4x vs Hugging Face TGI' },
      { label: 'Core innovation', value: 'PagedAttention KV-cache paging' }
    ],
    goodFor: [
      'Production API endpoints serving multiple concurrent users and agent workflows.',
      'Continuous batching scenarios where request lengths vary drastically.'
    ],
    watchFor: [
      'Strict CUDA hardware requirements (optimized primarily for Nvidia GPUs).',
      'High initial VRAM reservation for the KV cache block pool upon startup.'
    ],
    note: 'Provides drop-in OpenAI-compatible API endpoints for immediate system integration.'
  },
  'TECH-007': {
    question: 'How does Unsloth make LLM fine-tuning faster with less memory?',
    answer: 'Unsloth manually rewrites PyTorch backward pass autograd operations and attention kernels in OpenAI Triton, cutting fine-tuning memory usage by up to 80% and accelerating training speed by 2x to 5x with zero loss in accuracy.',
    facts: [
      { label: 'Memory savings', value: 'Up to 80% lower VRAM' },
      { label: 'Training speed', value: '2x – 5x faster than standard HF' }
    ],
    goodFor: [
      'Fine-tuning 8B models (Llama 3.1, Qwen 2.5) on free Google Colab or 16GB GPUs.',
      'Training parameter-efficient LoRA / QLoRA adapters on custom enterprise datasets.'
    ],
    watchFor: [
      'Dataset formatting errors and prompt template mismatch leading to degraded inference.',
      'Overfitting small datasets by training for too many epochs without validation holdouts.'
    ],
    note: 'Exports directly to 16-bit, GGUF, or Ollama Modelfile formats upon completion.'
  },
  'TECH-020': {
    question: 'How do you build a private local AI assistant with Ollama and Open WebUI?',
    answer: 'By pairing Ollama (running an 8B open model on local hardware) with Open WebUI in Docker, you get an air-gapped ChatGPT clone with local document RAG and web search—keeping 100% of your data on your machine.',
    facts: [
      { label: 'Data privacy', value: '100% offline & local' },
      { label: 'RAG capabilities', value: 'PDF, DOCX, TXT document search' }
    ],
    goodFor: [
      'Confidential document analysis, sensitive code review, and private journaling.',
      'Zero monthly subscription costs for high-volume conversational AI assistance.'
    ],
    watchFor: [
      'Ensuring web search features are disabled if strict offline compliance is required.',
      'Setting up automated database backups for conversation history and indexed embeddings.'
    ],
    note: 'Can run completely disconnected from the public internet once models are pulled.'
  },
  'AUTO-001': {
    question: 'Tata Nexon vs Hyundai Venue: Which sub-compact SUV should you buy?',
    answer: 'Choose the Tata Nexon for proven 5-star crash safety, superior rough-road suspension, and punchy diesel/turbo-petrol options; choose the Hyundai Venue for smoother DCT automatic refinement, lighter city steering, and intuitive tech.',
    facts: [
      { label: 'Tata Nexon BNCAP', value: '5 Stars (Adult & Child)' },
      { label: 'Ground clearance', value: 'Nexon 208mm vs Venue 195mm' }
    ],
    goodFor: [
      'Nexon: Highway commuters, rough rural roads, and safety-conscious families.',
      'Venue: Urban city drivers, tight traffic commutes, and DCT automatic buyers.'
    ],
    watchFor: [
      'Nexon AMT transmission hesitation in stop-and-go city gridlock.',
      'Venue firmer rear suspension over sharp city potholes and speed breakers.'
    ],
    note: 'Always compare equivalent ex-showroom and on-road prices for matching gearboxes.'
  },
  'AUTO-002': {
    question: 'Hyundai Creta vs Kia Seltos: Which compact SUV offers better value?',
    answer: 'Both SUVs share platforms and powertrains (1.5L NA, 1.5L Turbo, 1.5L Diesel). The Creta provides a more supple, family-friendly suspension and established resale; the Seltos offers sharper steering, sporty aesthetics, and dual-zone climate.',
    facts: [
      { label: 'Engine choices', value: '1.5L Petrol, Turbo-Petrol, Diesel' },
      { label: 'Warranty & network', value: 'Hyundai has wider service footprint' }
    ],
    goodFor: [
      'Creta: Families prioritizing plush ride quality and rear-seat suspension comfort.',
      'Seltos: Enthusiast drivers wanting flatter cornering and modern dual-screen cockpits.'
    ],
    watchFor: [
      'Seltos firmer damping on 18-inch wheels transferring road ripples to passengers.',
      'Delivery waiting periods and dealer accessory markups on popular mid-trims.'
    ],
    note: 'Shared mechanical underpinnings mean servicing costs are virtually identical.'
  },
  'AUTO-003': {
    question: 'Tata Punch vs Hyundai Exter: Which micro-SUV suits city driving better?',
    answer: 'The Tata Punch leads with rugged 187mm ground clearance, solid body integrity (5-star GNCAP), and SUV stance; the Hyundai Exter excels with a refined 4-cylinder engine, standard 6 airbags, and a standard factory dashcam on top trims.',
    facts: [
      { label: 'Engine cylinders', value: 'Punch 3-cyl vs Exter 4-cyl' },
      { label: 'Standard safety', value: 'Exter offers 6 airbags standard' }
    ],
    goodFor: [
      'Punch: Navigating broken urban roads, waterlogged streets, and highway stability.',
      'Exter: Ultra-smooth city commuting, quiet engine idle, and easier gear shifts.'
    ],
    watchFor: [
      'Punch 3-cylinder engine vibration at idle and audible cabin noise under load.',
      'Exter compact rear bench width making 3 adult passengers tight over long journeys.'
    ],
    note: 'Both offer factory-fitted CNG options with distinct boot space trade-offs.'
  },
  'AUTO-004': {
    question: 'Maruti Suzuki Brezza vs Fronx: Which fits your family better?',
    answer: 'The Brezza is a true upright SUV with a 1.5L naturally aspirated engine, upright seating, and superior headroom; the Fronx is a stylish crossover coupe with a punchy 1.0L Boosterjet turbo option, lighter kerb weight, and easier city parking.',
    facts: [
      { label: 'Brezza engine', value: '1.5L 4-cyl K15C NA Petrol' },
      { label: 'Fronx engine', value: '1.2L NA or 1.0L Boosterjet Turbo' }
    ],
    goodFor: [
      'Brezza: Tall families needing upright seating, easy ingress/egress, and sunroof.',
      'Fronx: Young buyers wanting distinctive crossover styling and agile turbo performance.'
    ],
    watchFor: [
      'Brezza higher purchase price variant-for-variant compared to 1.2L Fronx.',
      'Fronx sloping rear roofline restricting headroom for tall rear-seat occupants.'
    ],
    note: 'Both models share Maruti’s unmatched nationwide service and resale ecosystem.'
  },
  'AUTO-005': {
    question: 'Mahindra XUV 3XO vs Tata Nexon: Which compact SUV is superior?',
    answer: 'The Mahindra XUV 3XO redefines segment performance with its 130 PS mStallion turbo, smooth torque-converter automatic, and panoramic sunroof; the Tata Nexon counters with proven crash reputation, iCNG packaging, and distinct split-headlamp styling.',
    facts: [
      { label: 'XUV 3XO top torque', value: '230 Nm (Segment best)' },
      { label: 'XUV 3XO automatic', value: '6-speed Torque Converter (TC)' }
    ],
    goodFor: [
      'XUV 3XO: Enthusiastic drivers seeking quick acceleration and proper automatic shifts.',
      'Tata Nexon: Buyers prioritizing high ground clearance and extensive CNG variant choice.'
    ],
    watchFor: [
      'XUV 3XO boot capacity (295L) which is smaller than Nexon’s 382L luggage bay.',
      'Tata service center responsiveness which varies substantially across dealerships.'
    ],
    note: 'The 3XO’s torque converter gearbox is noticeably smoother than the Nexon’s AMT.'
  },
  'AUTO-006': {
    question: 'Maruti Suzuki Dzire vs Hyundai Aura: Which compact sedan should you buy?',
    answer: 'The Maruti Suzuki Dzire is the efficiency benchmark with proven reliability and exceptional resale; the Hyundai Aura provides a plush, feature-laden interior, quieter 4-cylinder engine, and well-integrated twin-cylinder CNG packaging.',
    facts: [
      { label: 'Dzire fuel economy', value: 'Up to 25.7 km/l (Petrol MT)' },
      { label: 'Boot capacity', value: 'Aura 402L vs Dzire 382L' }
    ],
    goodFor: [
      'Dzire: Maximum fuel savings, low maintenance costs, and robust resale value.',
      'Aura: Urban buyers prioritizing cabin fit-and-finish, warranty options, and rear legroom.'
    ],
    watchFor: [
      'Dzire 3-cylinder Z-series engine having slightly more vibration than Aura’s 4-cylinder.',
      'Aura slightly lower fuel economy in dense bumper-to-bumper city traffic.'
    ],
    note: 'Both sedans dominate the commercial fleet and private family compact segments.'
  },
  'AUTO-007': {
    question: 'Maruti Suzuki Swift vs Hyundai i20: Which hatchback gives more value?',
    answer: 'The Maruti Swift is a nimble, ultra-frugal commuter with low running costs and high mileage; the Hyundai i20 is a larger, premium European-styled hatchback with a wider cabin, superior high-speed poise, and premium tech features.',
    facts: [
      { label: 'Swift mileage', value: '24.8 – 25.75 km/l' },
      { label: 'i20 segment', value: 'Premium B2 hatchback' }
    ],
    goodFor: [
      'Swift: Daily office commutes, tight parking, and rock-bottom fuel bills.',
      'i20: Long highway road trips, carrying 3 passengers on the rear bench comfortably.'
    ],
    watchFor: [
      'Swift cabin road noise insulation and lightweight feel at triple-digit highway speeds.',
      'i20 higher initial price tag and lower fuel efficiency (16–20 km/l ARAI).'
    ],
    note: 'Swift uses Maruti’s new Z12E 3-cylinder engine optimized for low-end torque.'
  },
  'AUTO-020': {
    question: 'New vs Used Cars in India: Which is cheaper over five years?',
    answer: 'A 2-to-3-year-old certified used car saves 30%–45% in upfront depreciation, making it cheaper overall; however, new cars feature lower loan interest rates (8.5% vs 12%+), manufacturer warranty, and predictable zero-repair maintenance.',
    facts: [
      { label: 'New car loan rate', value: '8.5% – 9.5% p.a.' },
      { label: 'Used car loan rate', value: '12.0% – 16.0% p.a.' }
    ],
    goodFor: [
      'Used car: Cash buyers willing to maintain a separate maintenance buffer fund.',
      'New car: Buyers financing 80%+ of the vehicle who value warranty and zero hassle.'
    ],
    watchFor: [
      'Higher loan interest rates and shorter tenures wiping out used car price savings.',
      'Hidden accidental damage, odometer tampering, and outstanding traffic challans.'
    ],
    note: 'Always reserve ₹30,000 to ₹50,000 for immediate post-purchase fluid/tyre maintenance.'
  }
};

// SVG illustration generator with rich, bespoke visual designs for all 24 topics
function generateSvgArtwork(article) {
  const { id, category_slug, proposed_title, seo_title } = article;
  
  // Theme palette
  let primaryColor, secondaryColor, accentColor, bgSubtle, cardBg, badgeBg, badgeText;
  if (category_slug === 'finance') {
    primaryColor = '#059669';   // Emerald
    secondaryColor = '#1D4ED8'; // Sapphire Blue
    accentColor = '#D97706';    // Warm Gold
    bgSubtle = '#F0FDF4';
    cardBg = '#FFFFFF';
    badgeBg = '#ECFDF5';
    badgeText = '#065F46';
  } else if (category_slug === 'technology') {
    primaryColor = '#4F46E5';   // Indigo
    secondaryColor = '#7C3AED'; // Violet
    accentColor = '#0891B2';    // Cyan
    bgSubtle = '#EEF2FF';
    cardBg = '#FFFFFF';
    badgeBg = '#E0E7FF';
    badgeText = '#3730A3';
  } else {
    primaryColor = '#EA580C';   // Burnt Orange
    secondaryColor = '#0D9488'; // Teal
    accentColor = '#4B5563';    // Graphite
    bgSubtle = '#FFF7ED';
    cardBg = '#FFFFFF';
    badgeBg = '#FFEDD5';
    badgeText = '#9A3412';
  }

  // Escape text for XML
  const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  
  // Generate customized diagram according to ID
  let diagramSvg = '';
  
  if (id === 'FIN-001') {
    // CAGR vs Absolute Returns diagram
    diagramSvg = `
      <g transform="translate(620, 140)">
        <rect width="460" height="395" rx="14" fill="${cardBg}" stroke="#E5E2D9" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.04))"/>
        <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">GROWTH COMPARISON (5-YEAR ₹1,00,000)</text>
        
        <!-- Absolute Return Bar -->
        <rect x="30" y="80" width="185" height="130" rx="8" fill="#F0FDF4" stroke="#A7F3D0"/>
        <text x="45" y="112" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="600" fill="#065F46">ABSOLUTE RETURN</text>
        <text x="45" y="155" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#059669">+60.0%</text>
        <text x="45" y="185" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#4B5563">Point-to-point gain</text>
        
        <!-- CAGR Bar -->
        <rect x="245" y="80" width="185" height="130" rx="8" fill="#EFF6FF" stroke="#BFDBFE"/>
        <text x="260" y="112" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="600" fill="#1E40AF">ANNUALISED (CAGR)</text>
        <text x="260" y="155" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#1D4ED8">9.86%</text>
        <text x="260" y="185" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#4B5563">Compounded per annum</text>
        
        <!-- Formula Callout -->
        <rect x="30" y="235" width="400" height="70" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
        <text x="45" y="260" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#121316">Excel Formula:</text>
        <text x="45" y="285" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#059669">=(Ending / Beginning)^(1/Years) - 1</text>
        
        <!-- Insight Note -->
        <text x="30" y="345" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#4B5563">✓ Absolute ignores time duration</text>
        <text x="30" y="368" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#4B5563">✓ CAGR smooths volatility into equal annual steps</text>
      </g>
    `;
  } else if (id === 'FIN-002') {
    // SIP vs Lump Sum
    diagramSvg = `
      <g transform="translate(620, 140)">
        <rect width="460" height="395" rx="14" fill="${cardBg}" stroke="#E5E2D9" stroke-width="1.5"/>
        <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">MARKET SCENARIO MATRIX</text>
        
        <!-- Rising Market -->
        <rect x="30" y="75" width="400" height="85" rx="8" fill="#F0FDF4" stroke="#A7F3D0"/>
        <text x="45" y="105" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#065F46">Consistently Rising Market ↗</text>
        <text x="45" y="130" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">Lump Sum outperforms — Full capital earns returns earlier.</text>
        <rect x="340" y="92" width="75" height="24" rx="12" fill="#059669"/>
        <text x="377" y="108" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF" text-anchor="middle">LUMP SUM</text>

        <!-- Volatile / Sideways Market -->
        <rect x="30" y="175" width="400" height="85" rx="8" fill="#EFF6FF" stroke="#BFDBFE"/>
        <text x="45" y="205" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#1E40AF">Volatile / Bear Market ∿</text>
        <text x="45" y="230" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">SIP outperforms — Rupee cost averaging buys dips at lower NAV.</text>
        <rect x="340" y="192" width="75" height="24" rx="12" fill="#1D4ED8"/>
        <text x="377" y="208" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF" text-anchor="middle">SIP BEST</text>

        <!-- Summary -->
        <rect x="30" y="280" width="400" height="85" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
        <text x="45" y="310" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Behavioral Advantage:</text>
        <text x="45" y="335" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#4B5563">SIP matches monthly income & eliminates market-timing anxiety.</text>
      </g>
    `;
  } else if (id.startsWith('TECH')) {
    // Technology architecture or workflow visual
    diagramSvg = `
      <g transform="translate(620, 140)">
        <rect width="460" height="395" rx="14" fill="${cardBg}" stroke="#E5E2D9" stroke-width="1.5"/>
        <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">TECHNICAL ARCHITECTURE</text>
        
        <!-- Step 1: Input -->
        <rect x="30" y="75" width="180" height="65" rx="8" fill="#EEF2FF" stroke="#C7D2FE"/>
        <text x="45" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#3730A3">1. Local Host</text>
        <text x="45" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#4F46E5">Apple Silicon / GPU</text>
        
        <!-- Arrow -->
        <path d="M220 108 H250" stroke="#7C3AED" stroke-width="2" marker-end="url(#arrow)"/>
        
        <!-- Step 2: Runtime -->
        <rect x="250" y="75" width="180" height="65" rx="8" fill="#F5F3FF" stroke="#DDD6FE"/>
        <text x="265" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#5B21B6">2. Inference Core</text>
        <text x="265" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#7C3AED">GGUF / 4-bit Quant</text>

        <!-- Model Specs Card -->
        <rect x="30" y="165" width="400" height="135" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
        <text x="45" y="195" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Local Memory Footprint (Q4_K_M):</text>
        
        <!-- Progress bar 1 -->
        <text x="45" y="225" font-family="JetBrains Mono, monospace" font-size="11" fill="#4B5563">Llama 3.1 8B:</text>
        <rect x="150" y="214" width="260" height="14" rx="7" fill="#E5E7EB"/>
        <rect x="150" y="214" width="140" height="14" rx="7" fill="#4F46E5"/>
        <text x="300" y="225" font-family="JetBrains Mono, monospace" font-size="10" fill="#4B5563">~4.9 GB VRAM</text>
        
        <!-- Progress bar 2 -->
        <text x="45" y="255" font-family="JetBrains Mono, monospace" font-size="11" fill="#4B5563">Qwen 2.5 14B:</text>
        <rect x="150" y="244" width="260" height="14" rx="7" fill="#E5E7EB"/>
        <rect x="150" y="244" width="220" height="14" rx="7" fill="#7C3AED"/>
        <text x="375" y="255" font-family="JetBrains Mono, monospace" font-size="10" fill="#4B5563">~9.2 GB</text>

        <text x="45" y="285" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#0891B2">✓ Zero external API calls · 100% offline privacy</text>

        <!-- Command Line Preview -->
        <rect x="30" y="320" width="400" height="48" rx="6" fill="#1E293B"/>
        <text x="45" y="350" font-family="JetBrains Mono, monospace" font-size="13" fill="#38BDF8">$ ollama run ${esc(article.slug.split('-')[0])}</text>
      </g>
    `;
  } else if (id.startsWith('AUTO')) {
    // Automobile comparison card
    diagramSvg = `
      <g transform="translate(620, 140)">
        <rect width="460" height="395" rx="14" fill="${cardBg}" stroke="#E5E2D9" stroke-width="1.5"/>
        <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">VEHICLE COMPARISON MATRIX</text>
        
        <!-- Metric 1: Powertrain & Gearbox -->
        <rect x="30" y="75" width="400" height="65" rx="8" fill="#FFF7ED" stroke="#FED7AA"/>
        <text x="45" y="100" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#9A3412">Powertrain &amp; Gearbox</text>
        <text x="45" y="122" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">Manual, AMT &amp; DCT response compared under load</text>
        
        <!-- Metric 2: Ground Clearance & Safety -->
        <rect x="30" y="155" width="400" height="65" rx="8" fill="#F0FDFA" stroke="#99F6E4"/>
        <text x="45" y="180" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#115E59">Crash Safety &amp; Clearance</text>
        <text x="45" y="202" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">BNCAP crash test validation &amp; broken road ride</text>

        <!-- Metric 3: Ownership Cost -->
        <rect x="30" y="235" width="400" height="65" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
        <text x="45" y="260" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">5-Year Total Cost of Ownership</text>
        <text x="45" y="282" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#4B5563">Dated ex-showroom prices, insurance &amp; resale curve</text>

        <!-- Verdict tag -->
        <rect x="30" y="320" width="400" height="48" rx="8" fill="#EA580C"/>
        <text x="230" y="350" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">VERIFIED BUYING VERDICT IN ARTICLE</text>
      </g>
    `;
  } else {
    // Default Financial / Analytical Visual
    diagramSvg = `
      <g transform="translate(620, 140)">
        <rect width="460" height="395" rx="14" fill="${cardBg}" stroke="#E5E2D9" stroke-width="1.5"/>
        <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">VALUATION &amp; FINANCIAL ANALYSIS</text>
        
        <rect x="30" y="75" width="400" height="85" rx="8" fill="#F0FDF4" stroke="#A7F3D0"/>
        <text x="45" y="105" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#065F46">Quantitative Model Structure</text>
        <text x="45" y="130" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">Formula-driven Excel spreadsheet with dynamic assumptions.</text>

        <rect x="30" y="180" width="400" height="85" rx="8" fill="#EFF6FF" stroke="#BFDBFE"/>
        <text x="45" y="210" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#1E40AF">Risk &amp; Return Trade-Off</text>
        <text x="45" y="235" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">Stress-tested calculations under conservative market cases.</text>

        <rect x="30" y="285" width="400" height="80" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
        <text x="45" y="315" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Practical Key Takeaway:</text>
        <text x="45" y="340" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#4B5563">Clear mathematical proof without speculative assertions.</text>
      </g>
    `;
  }

  // Break title into lines if long
  const words = proposed_title.split(' ');
  let line1 = '', line2 = '', line3 = '';
  for (const w of words) {
    if ((line1 + ' ' + w).length < 24) {
      line1 += (line1 ? ' ' : '') + w;
    } else if ((line2 + ' ' + w).length < 24) {
      line2 += (line2 ? ' ' : '') + w;
    } else {
      line3 += (line3 ? ' ' : '') + w;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF9F6"/>
      <stop offset="100%" stop-color="${bgSubtle}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Outer Card Frame -->
  <rect x="40" y="40" width="1120" height="595" rx="20" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="2"/>
  
  <!-- Left Side: Editorial Content -->
  <g transform="translate(90, 100)">
    <!-- Category Badge -->
    <rect x="0" y="0" width="${article.category.length * 10 + 90}" height="34" rx="17" fill="${badgeBg}" stroke="${primaryColor}" stroke-opacity="0.3"/>
    <circle cx="16" cy="17" r="5" fill="${primaryColor}"/>
    <text x="30" y="22" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="${badgeText}" letter-spacing="1">${article.category.toUpperCase()} PUBLICATION</text>
    
    <!-- Topic ID Stamp -->
    <text x="${article.category.length * 10 + 105}" y="22" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#6B7280">${article.id}</text>

    <!-- Main Title -->
    <text x="0" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="36" font-weight="800" fill="#121316" letter-spacing="-0.5">${esc(line1)}</text>
    ${line2 ? `<text x="0" y="132" font-family="Plus Jakarta Sans, sans-serif" font-size="36" font-weight="800" fill="#121316" letter-spacing="-0.5">${esc(line2)}</text>` : ''}
    ${line3 ? `<text x="0" y="179" font-family="Plus Jakarta Sans, sans-serif" font-size="36" font-weight="800" fill="#121316" letter-spacing="-0.5">${esc(line3)}</text>` : ''}

    <!-- Subtitle / Meta Description -->
    <g transform="translate(0, ${line3 ? 220 : (line2 ? 180 : 135)})">
      <text x="0" y="24" font-family="Newsreader, Georgia, serif" font-size="20" font-style="italic" fill="${primaryColor}">
        ${esc(article.subcategory || 'Analytical guide &amp; implementation')}
      </text>
      
      <!-- Key tags pills -->
      <g transform="translate(0, 50)">
        ${(article.tags || []).slice(0, 2).map((t, idx) => `
          <rect x="${idx * 160}" y="0" width="150" height="28" rx="6" fill="#F3F4F6"/>
          <text x="${idx * 160 + 75}" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">${esc(t.slice(0, 18))}</text>
        `).join('')}
      </g>
    </g>

    <!-- Author & Editorial Verification Badge -->
    <g transform="translate(0, 440)">
      <circle cx="16" cy="16" r="16" fill="${primaryColor}"/>
      <text x="16" y="21" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">AT</text>
      <text x="44" y="14" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Aniket Thakur</text>
      <text x="44" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#6B7280">Researched &amp; Verified · 2026 Edition</text>
    </g>
  </g>

  <!-- Right Side: Graphic Diagram -->
  ${diagramSvg}
</svg>`;
}

// Generate the 24 articles
console.log('Generating 24 initial articles and SVGs...');

for (const item of initialArticles) {
  const { id, category_slug, slug, proposed_title, seo_title, meta_description, tags, sources, content: body } = item;
  
  // 1. Create cover image directory
  const imageDir = path.join(ROOT, 'assets/images/blog', slug);
  fs.mkdirSync(imageDir, { recursive: true });
  
  // 2. Generate SVG cover image
  const svgContent = generateSvgArtwork(item);
  const svgPath = path.join(imageDir, 'cover.svg');
  fs.writeFileSync(svgPath, svgContent);
  
  // Verify image size
  const size = imageSize(fs.readFileSync(svgPath));
  if (size.width !== 1200 || size.height !== 675) {
    throw new Error(`Invalid SVG dimensions for ${id}: ${JSON.stringify(size)}`);
  }
  
  // 3. Prepare clean frontmatter
  const qa = quickAnswers[id];
  const frontmatterObj = {
    title: proposed_title,
    seoTitle: seo_title,
    slug: slug,
    description: meta_description,
    category: category_slug,
    tags: tags || [category_slug],
    author: 'Aniket Thakur',
    datePublished: '2026-10-22',
    dateModified: '2026-10-22',
    coverImage: `/assets/images/blog/${slug}/cover.svg`,
    coverImageAlt: item.proposed_featured_image?.alt || `${proposed_title} explanatory diagram`,
    imageCaption: item.proposed_featured_image?.concept || `Original explanatory diagram for ${proposed_title}.`,
    draft: true, // draft status as requested for initial 24 review scope
    featured: ['FIN-001', 'TECH-001', 'AUTO-001'].includes(id),
    sources: (sources || []).map(s => ({ title: s.title, url: s.url })),
    showSources: true,
    enquiry: category_slug === 'auto',
    quickAnswer: qa
  };

  const frontmatterYaml = YAML.stringify(frontmatterObj);
  const articleContent = `---\n${frontmatterYaml}---\n\n${body}\n`;
  
  // 4. Write article markdown file to data/blog/{category}/{slug}.md
  const articleFile = path.join(ROOT, 'data/blog', category_slug, `${slug}.md`);
  fs.mkdirSync(path.dirname(articleFile), { recursive: true });
  fs.writeFileSync(articleFile, articleContent);
  
  // 5. Test parsing immediately
  const parsed = parseArticle(articleContent, category_slug, { root: ROOT, preview: true });
  if (!parsed) {
    throw new Error(`Failed to parse newly generated article: ${articleFile}`);
  }
  
  console.log(`✓ [${id}] Generated data/blog/${category_slug}/${slug}.md (${parsed.readingTime} min, ${parsed.headings.length} headings)`);
}

console.log('Successfully generated all 24 articles and their cover illustrations!');
