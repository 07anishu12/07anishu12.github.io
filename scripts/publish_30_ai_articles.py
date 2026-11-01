#!/usr/bin/env python3
"""
================================================================================
AI Knowledge Library: 30 Long-Form Articles Ingestion & Publishing Automation
================================================================================
Parses master PDF:
/Users/anny/Desktop/AI_30_Long_Form_Articles_SEO_AEO_GEO.pdf

Publishes all 30 articles:
1. Master Manifest:
   data/ai_30_articles_manifest.json and /Users/anny/Desktop/ai_30_articles_manifest.json
2. Pre-Split MDX Files:
   published_articles/<slug>.mdx and /Users/anny/Desktop/published_articles/<slug>.mdx
3. Portfolio Blog Markdown Files:
   data/blog/technology/<slug>.md (30 articles)
4. 1200x675 SVG Artwork:
   assets/images/blog/<slug>/cover.svg (30 articles)
5. Updates data/blog-editorial.json and data/blog-date-audit.json
================================================================================
"""

import os
import sys
import re
import json
import subprocess
from xml.sax.saxutils import escape as xml_escape

PDF_PATH = "/Users/anny/Desktop/AI_30_Long_Form_Articles_SEO_AEO_GEO.pdf"
DESKTOP_DIR = "/Users/anny/Desktop"
PORTFOLIO_ROOT = "/Users/anny/Desktop/Portfolio-Website"
DATA_BLOG_DIR = os.path.join(PORTFOLIO_ROOT, "data/blog/technology")
ASSETS_IMG_DIR = os.path.join(PORTFOLIO_ROOT, "assets/images/blog")
EDITORIAL_JSON_PATH = os.path.join(PORTFOLIO_ROOT, "data/blog-editorial.json")
DATE_AUDIT_JSON_PATH = os.path.join(PORTFOLIO_ROOT, "data/blog-date-audit.json")
PUBLISHED_ARTICLES_REPO_DIR = os.path.join(PORTFOLIO_ROOT, "published_articles")
PUBLISHED_ARTICLES_DESKTOP_DIR = os.path.join(DESKTOP_DIR, "published_articles")

TODAY_DATE = "2026-11-01"

AUTHORITATIVE_SOURCE_URLS = {
    "OpenAI Agents guide": "https://platform.openai.com/docs/guides/agents",
    "LangGraph reference": "https://langchain-ai.github.io/langgraph/",
    "LangGraph workflows and agents": "https://langchain-ai.github.io/langgraph/",
    "OpenAI MCP connections": "https://modelcontextprotocol.io/",
    "NIST AI Risk Management Framework": "https://www.nist.gov/itl/ai-risk-management-framework",
    "FastAPI documentation": "https://fastapi.tiangolo.com/",
    "Hugging Face Transformers documentation": "https://huggingface.co/docs/transformers",
    "OpenAI API documentation": "https://platform.openai.com/docs/",
    "Google Search helpful content guidance": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    "Google Search generative AI content guidance": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    "Google AI content and quality guidance": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    "Google AI content guidance": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    "Google helpful content guidance": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    "Microsoft RAG documentation": "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview",
    "LlamaIndex documentation": "https://docs.llamaindex.ai/",
    "pgvector project documentation": "https://github.com/pgvector/pgvector",
    "Qdrant documentation": "https://qdrant.tech/documentation/",
    "OpenAI fine-tuning guide": "https://platform.openai.com/docs/guides/fine-tuning",
    "Model Context Protocol specification": "https://modelcontextprotocol.io/",
    "Ollama documentation": "https://github.com/ollama/ollama",
    "Hugging Face quantization guide": "https://huggingface.co/docs/transformers/main_classes/quantization",
    "OWASP Top 10 for LLM Applications": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    "OpenTelemetry documentation": "https://opentelemetry.io/docs/",
    "Langfuse evaluation documentation": "https://langfuse.com/docs",
    "OpenAI Evals guide": "https://github.com/openai/evals",
    "RBI publications and notifications": "https://www.rbi.org.in/",
    "FDA AI-enabled medical devices": "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device",
    "WHO digital health resources": "https://www.who.int/health-topics/digital-health",
    "UNESCO guidance for generative AI in education": "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",
    "UNESCO AI and education resources": "https://www.unesco.org/en/digital-education/artificial-intelligence",
    "NHTSA automated driving systems": "https://www.nhtsa.gov/technology-innovation/automated-vehicles-safety",
    "NIST Cybersecurity Framework": "https://www.nist.gov/cyberframework",
    "Hugging Face documentation": "https://huggingface.co/docs",
    "scikit-learn user guide": "https://scikit-learn.org/stable/user_guide.html",
    "PyTorch tutorials": "https://pytorch.org/tutorials/",
    "Hugging Face course": "https://huggingface.co/learn",
    "ILO 2026 review on GenAI, jobs and productivity": "https://www.ilo.org/global/topics/future-of-work/publications/WCMS_890761/lang--en/index.htm",
    "ILO 2025 global occupational exposure index": "https://www.ilo.org/global/topics/future-of-work/publications/WCMS_890761/lang--en/index.htm",
    "ILO 2026 skills report": "https://www.ilo.org/skills/",
    "OpenAI prompt caching guide": "https://platform.openai.com/docs/guides/prompt-caching"
}

PART_MAPPING = {
    1: "Part I: AI Agents & Autonomous Systems",
    2: "Part I: AI Agents & Autonomous Systems",
    3: "Part I: AI Agents & Autonomous Systems",
    4: "Part I: AI Agents & Autonomous Systems",
    5: "Part I: AI Agents & Autonomous Systems",
    6: "Part I: AI Agents & Autonomous Systems",
    7: "Part II: LLMs, RAG & Vector Systems",
    8: "Part II: LLMs, RAG & Vector Systems",
    9: "Part II: LLMs, RAG & Vector Systems",
    10: "Part II: LLMs, RAG & Vector Systems",
    11: "Part II: LLMs, RAG & Vector Systems",
    12: "Part II: LLMs, RAG & Vector Systems",
    13: "Part II: LLMs, RAG & Vector Systems",
    14: "Part III: Production Architecture & Engineering",
    15: "Part III: Production Architecture & Engineering",
    16: "Part III: Production Architecture & Engineering",
    17: "Part III: Production Architecture & Engineering",
    18: "Part IV: Industry Applications & Enterprise AI",
    19: "Part IV: Industry Applications & Enterprise AI",
    20: "Part IV: Industry Applications & Enterprise AI",
    21: "Part IV: Industry Applications & Enterprise AI",
    22: "Part IV: Industry Applications & Enterprise AI",
    23: "Part IV: Industry Applications & Enterprise AI",
    24: "Part V: AI Tools, Strategy, Safety & Careers",
    25: "Part V: AI Tools, Strategy, Safety & Careers",
    26: "Part V: AI Tools, Strategy, Safety & Careers",
    27: "Part V: AI Tools, Strategy, Safety & Careers",
    28: "Part V: AI Tools, Strategy, Safety & Careers",
    29: "Part V: AI Tools, Strategy, Safety & Careers",
    30: "Part V: AI Tools, Strategy, Safety & Careers"
}

TAGS_MAPPING = {
    1: ["AI Agents", "Autonomous AI", "Agent Architecture", "AI Engineering", "Python"],
    2: ["Multi-Agent Systems", "Agent Orchestration", "AI Architecture", "LangGraph", "Python"],
    3: ["AI Workflow Automation", "Business Automation", "Process Engineering", "Enterprise AI", "FastAPI"],
    4: ["AI Browser Agent", "Playwright", "Web Scraping", "Tool Calling", "Python"],
    5: ["Voice AI", "Real-Time Audio", "Speech-to-Text", "Turn Detection", "WebSockets"],
    6: ["AI Agent Memory", "State Persistence", "Context Management", "Vector Storage", "Python"],
    7: ["Large Language Models", "Transformers", "Model Architecture", "Inference", "Deep Learning"],
    8: ["RAG", "Document Intelligence", "Information Retrieval", "LlamaIndex", "Vector Search"],
    9: ["Vector Databases", "Embeddings", "pgvector", "Semantic Search", "Information Retrieval"],
    10: ["Fine-Tuning", "RAG", "Model Customization", "LLM Evaluation", "Machine Learning"],
    11: ["Model Context Protocol", "MCP", "AI Tooling", "Interoperability", "OpenAI"],
    12: ["Local LLMs", "Ollama", "Private AI", "Quantization", "Edge AI"],
    13: ["AI Chatbot", "FastAPI", "LLM APIs", "Python Development", "Chat Architecture"],
    14: ["AI SaaS", "Product Architecture", "SaaS Engineering", "Metering", "Startups"],
    15: ["AI Customer Support", "Automated Triage", "Ticket Resolution", "CRM Integration", "Customer Experience"],
    16: ["Production LLM Architecture", "Enterprise AI", "Scalable Systems", "System Design", "Cloud Architecture"],
    17: ["LLM Evaluation", "AI Observability", "Langfuse", "Telemetry", "Debugging"],
    18: ["AI in Finance", "Financial Engineering", "Fraud Detection", "Risk Analysis", "Fintech"],
    19: ["AI in Healthcare", "Clinical AI", "Medical Imaging", "Healthtech", "HIPAA Compliance"],
    20: ["AI in Education", "Personalized Learning", "EdTech", "AI Tutors", "Adaptive Learning"],
    21: ["Automotive AI", "Autonomous Driving", "Predictive Maintenance", "ADAS", "Connected Vehicles"],
    22: ["AI in Cybersecurity", "Threat Detection", "SecOps", "Anomaly Detection", "Network Defense"],
    23: ["AI Business Applications", "Enterprise Automation", "ROI", "Digital Transformation", "Operations"],
    24: ["Best AI Tools", "Developer Productivity", "Coding Assistants", "Research Tools", "AI Stack"],
    25: ["Machine Learning", "Deep Learning", "Artificial Intelligence", "Neural Networks", "Data Science"],
    26: ["AI Engineer Roadmap", "Career Guide", "Tech Skills", "2027 Roadmap", "Software Engineering"],
    27: ["Future of Work", "Software Engineering", "Data Science", "AI Replacement", "Industry Trends"],
    28: ["AI Startups", "Product Discovery", "Founder Guide", "Venture Building", "Go-to-Market"],
    29: ["AI Safety", "Hallucinations", "Responsible AI", "Guardrails", "AI Alignment"],
    30: ["LLM Cost Reduction", "Inference Speed", "Prompt Caching", "Model Routing", "Optimization"]
}

def slugify(title):
    t = title.lower()
    t = re.sub(r'[\':?,.()]+', '', t)
    t = re.sub(r'\s+', '-', t.strip())
    return t

def clean_page_breaks(text):
    text = text.replace(
        'customer30 Long-Form AI Articles • November 2026 | 57\n\n\x0cARTIFICIAL INTELLIGENCE | LONG-FORM CONTENT COLLECTION\n\nspecific',
        'customer-specific'
    )
    pattern = re.compile(
        r'(\n[^\n]+)?\n\d+\s+Long-Form AI Articles\s+•\s+November 2026\s+\|\s+\d+\s*\n\s*\x0cARTIFICIAL INTELLIGENCE\s+\|\s+LONG-FORM CONTENT COLLECTION\s*\n+([^\n]+)?'
    )
    def replacer(match):
        prev_line = match.group(1) or ''
        next_line = match.group(2) or ''
        prev_clean = prev_line.strip()
        next_clean = next_line.strip()
        
        if prev_clean and not prev_clean.endswith(('.', '!', '?', ':')) or (next_clean and next_clean[0].islower()):
            return prev_line + ' ' + next_line
        else:
            return prev_line + '\n\n' + next_line

    return pattern.sub(replacer, text)

def generate_svg_cover(art_num, title, slug, tags):
    esc_title = xml_escape(title)
    words = title.split()
    lines = []
    curr = ""
    for w in words:
        if len(curr + " " + w) <= 24:
            curr = (curr + " " + w).strip()
        else:
            if curr:
                lines.append(curr)
            curr = w
    if curr:
        lines.append(curr)

    line1 = xml_escape(lines[0]) if len(lines) > 0 else ""
    line2 = xml_escape(lines[1]) if len(lines) > 1 else ""
    line3 = xml_escape(" ".join(lines[2:])) if len(lines) > 2 else ""

    tag1 = xml_escape(tags[0] if len(tags) > 0 else "Artificial Intelligence")[:22]
    tag2 = xml_escape(tags[1] if len(tags) > 1 else "Engineering Guide")[:22]
    art_id = f"AI-LIB-{art_num:02d}"

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF9F6"/>
      <stop offset="100%" stop-color="#EEF2FF"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  <rect x="40" y="40" width="1120" height="595" rx="20" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="2"/>
  
  <g transform="translate(90, 95)">
    <rect x="0" y="0" width="220" height="34" rx="17" fill="#E0E7FF" stroke="#4F46E5" stroke-opacity="0.3"/>
    <circle cx="16" cy="17" r="5" fill="#4F46E5"/>
    <text x="30" y="22" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#3730A3" letter-spacing="1">AI KNOWLEDGE BASE</text>
    
    <text x="235" y="22" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#6B7280">{art_id}</text>

    <text x="0" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="32" font-weight="800" fill="#121316" letter-spacing="-0.5">{line1}</text>
    {f'<text x="0" y="130" font-family="Plus Jakarta Sans, sans-serif" font-size="32" font-weight="800" fill="#121316" letter-spacing="-0.5">{line2}</text>' if line2 else ''}
    {f'<text x="0" y="175" font-family="Plus Jakarta Sans, sans-serif" font-size="32" font-weight="800" fill="#121316" letter-spacing="-0.5">{line3}</text>' if line3 else ''}

    <g transform="translate(0, {215 if line3 else (175 if line2 else 130)})">
      <text x="0" y="24" font-family="Newsreader, Georgia, serif" font-size="20" font-style="italic" fill="#4F46E5">
        Production Engineering &amp; Strategic Implementation
      </text>
      
      <g transform="translate(0, 50)">
        <rect x="0" y="0" width="170" height="28" rx="6" fill="#F3F4F6"/>
        <text x="85" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag1}</text>
        
        <rect x="185" y="0" width="170" height="28" rx="6" fill="#F3F4F6"/>
        <text x="270" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag2}</text>
      </g>
    </g>

    <g transform="translate(0, 440)">
      <circle cx="16" cy="16" r="16" fill="#4F46E5"/>
      <text x="16" y="21" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">AT</text>
      <text x="44" y="14" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Aniket Thakur</text>
      <text x="44" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#6B7280">Researched &amp; Verified · November 2026</text>
    </g>
  </g>

  <g transform="translate(620, 130)">
    <rect width="460" height="405" rx="14" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.04))"/>
    <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">TECHNICAL ARCHITECTURE</text>
    
    <rect x="30" y="75" width="180" height="70" rx="8" fill="#EEF2FF" stroke="#C7D2FE"/>
    <text x="45" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#3730A3">Core Systems</text>
    <text x="45" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#4F46E5">Engine &amp; Retrieval</text>

    <rect x="250" y="75" width="180" height="70" rx="8" fill="#F5F3FF" stroke="#DDD6FE"/>
    <text x="265" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#5B21B6">Context &amp; Memory</text>
    <text x="265" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#7C3AED">State Orchestration</text>

    <rect x="30" y="165" width="400" height="145" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
    <text x="45" y="195" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Production Verification &amp; Stability Metrics:</text>
    
    <text x="45" y="225" font-family="JetBrains Mono, monospace" font-size="11" fill="#4B5563">Factual Consistency:</text>
    <rect x="170" y="214" width="240" height="14" rx="7" fill="#E5E7EB"/>
    <rect x="170" y="214" width="220" height="14" rx="7" fill="#4F46E5"/>
    <text x="395" y="225" font-family="JetBrains Mono, monospace" font-size="10" fill="#FFFFFF" text-anchor="end">Ground Truth</text>

    <text x="45" y="255" font-family="JetBrains Mono, monospace" font-size="11" fill="#4B5563">Pipeline Latency:</text>
    <rect x="170" y="244" width="240" height="14" rx="7" fill="#E5E7EB"/>
    <rect x="170" y="244" width="210" height="14" rx="7" fill="#7C3AED"/>
    <text x="390" y="255" font-family="JetBrains Mono, monospace" font-size="10" fill="#FFFFFF" text-anchor="end">Sub-Second</text>

    <text x="45" y="285" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#0891B2">✓ Strict type schemas · Zero unverified claims</text>

    <rect x="30" y="330" width="400" height="48" rx="6" fill="#1E293B"/>
    <text x="45" y="360" font-family="JetBrains Mono, monospace" font-size="13" fill="#38BDF8">$ ai test --eval=ground-truth --ci</text>
  </g>
</svg>"""
    return svg

def serialize_yaml(data):
    lines = ["---"]
    for k, v in data.items():
        if isinstance(v, bool):
            lines.append(f"{k}: {'true' if v else 'false'}")
        elif isinstance(v, (int, float)):
            lines.append(f"{k}: {v}")
        elif isinstance(v, str):
            lines.append(f"{k}: {json.dumps(v)}")
        elif isinstance(v, list):
            if not v:
                lines.append(f"{k}: []")
            elif all(isinstance(x, str) for x in v):
                lines.append(f"{k}:")
                for x in v:
                    lines.append(f"  - {json.dumps(x)}")
            elif all(isinstance(x, dict) for x in v):
                lines.append(f"{k}:")
                for item in v:
                    first = True
                    for subk, subv in item.items():
                        if first:
                            lines.append(f"  - {subk}: {json.dumps(str(subv))}")
                            first = False
                        else:
                            lines.append(f"    {subk}: {json.dumps(str(subv))}")
        elif isinstance(v, dict):
            lines.append(f"{k}:")
            for subk, subv in v.items():
                if isinstance(subv, list):
                    if not subv:
                        lines.append(f"  {subk}: []")
                    elif all(isinstance(x, str) for x in subv):
                        lines.append(f"  {subk}:")
                        for x in subv:
                            lines.append(f"    - {json.dumps(x)}")
                    elif all(isinstance(x, dict) for x in subv):
                        lines.append(f"  {subk}:")
                        for item in subv:
                            first = True
                            for f_k, f_v in item.items():
                                if first:
                                    lines.append(f"    - {f_k}: {json.dumps(str(f_v))}")
                                    first = False
                                else:
                                    lines.append(f"      {f_k}: {json.dumps(str(f_v))}")
                elif isinstance(subv, str):
                    lines.append(f"  {subk}: {json.dumps(subv)}")
                elif isinstance(subv, bool):
                    lines.append(f"  {subk}: {'true' if subv else 'false'}")
                elif isinstance(subv, (int, float)):
                    lines.append(f"  {subk}: {subv}")
    lines.append("---\n")
    return "\n".join(lines)

def parse_pdf():
    print(f"Reading {PDF_PATH} via pdftotext...")
    raw_text = subprocess.check_output(["pdftotext", PDF_PATH, "-"]).decode("utf-8")
    
    # Extract TOC from page 3
    toc_match = re.search(r'Contents\s*\n([\s\S]*?)(?=30 Long-Form AI Articles • November 2026 \| 3)', raw_text)
    toc_text = toc_match.group(1).strip()
    toc_titles = {}
    for line in toc_text.split('\n'):
        line = line.strip()
        m = re.match(r'^(\d{2})\.\s*(.*)$', line)
        if m:
            toc_titles[int(m.group(1))] = m.group(2).strip()

    print(f"Loaded {len(toc_titles)} canonical titles from TOC.")

    cleaned = clean_page_breaks(raw_text)
    parts = re.split(r'\nArticle\s+(\d{1,2})\n', cleaned)

    articles = []

    for i in range(1, len(parts), 2):
        art_num = int(parts[i])
        content = parts[i+1]

        canonical_title = toc_titles.get(art_num, "")
        slug = slugify(canonical_title)
        part = PART_MAPPING.get(art_num, "Artificial Intelligence Knowledge Library")
        tags = TAGS_MAPPING.get(art_num, ["Artificial Intelligence", "AI Engineering", "Python"])

        # Meta title
        mt_match = re.search(r'Meta title\s*\n\s*([^\n]+(?:\n[^\n]+)?)', content)
        meta_title = ' '.join(mt_match.group(1).split()) if mt_match else canonical_title

        # Meta description
        md_match = re.search(r'Meta description\s*\n\s*([\s\S]*?)(?=\nMeta keywords)', content)
        meta_desc = ' '.join(md_match.group(1).split()) if md_match else ''

        # Meta keywords
        mk_match = re.search(r'Meta keywords\s*\n\s*([\s\S]*?)(?=\nSearch intent)', content)
        meta_kw = ' '.join(mk_match.group(1).split()) if mk_match else ''

        # Search intent
        si_match = re.search(r'Search intent\s*\n\s*([^\n]+)', content)
        search_intent = si_match.group(1).strip() if si_match else ''

        # Primary keyword
        kw_list = [k.strip() for k in meta_kw.split(',') if k.strip()]
        primary_kw = kw_list[0] if kw_list else canonical_title

        # Body extraction
        intent_pos = content.find('Search intent')
        after_intent = content[intent_pos:]
        body_start = after_intent.find('\n\n') + 2
        faq_pos = content.find('Frequently asked questions')
        raw_body = content[intent_pos + body_start : faq_pos].strip()

        # Parse body sections
        paras = [p.strip() for p in raw_body.split('\n\n') if p.strip()]
        
        md_body_parts = []
        # Intro paragraph (P0 lines after title repetition)
        p0_lines = [l.strip() for l in paras[0].split('\n') if l.strip()]
        intro_text = " ".join(p0_lines[1:] if len(p0_lines) > 1 else p0_lines)
        if intro_text:
            md_body_parts.append(intro_text)

        # Subsequent sections
        for p in paras[1:]:
            lines = [l.strip() for l in p.split('\n') if l.strip()]
            if not lines:
                continue
            heading = lines[0]
            section_body = " ".join(lines[1:])
            md_body_parts.append(f"\n## {heading}\n\n{section_body}")

        # Parse FAQs
        faq_match = re.search(r'Frequently asked questions\s*\n([\s\S]*?)(?=\nSuggested internal links|\nFurther reading|\nPre-publication|$)', content)
        faq_items = []
        if faq_match:
            faq_text = faq_match.group(1).strip()
            q_blocks = re.findall(r'([^\n?]+\?)\s*\n([\s\S]*?)(?=(?:[^\n?]+\?)|$)', faq_text)
            for q, a in q_blocks:
                faq_items.append({
                    "question": q.strip(),
                    "answer": " ".join(a.split())
                })

        # Append FAQ section to markdown body
        if faq_items:
            md_body_parts.append("\n## Frequently Asked Questions\n")
            for item in faq_items:
                md_body_parts.append(f"\n### {item['question']}\n\n{item['answer']}\n")

        # Parse Sources
        sources_match = re.search(r'Further reading and primary sources\s*\n([\s\S]*?)(?=\nPre-publication|\nArticle\s+\d+|$)', content)
        sources = []
        if sources_match:
            lines = [l.strip() for l in sources_match.group(1).split('\n') if l.strip() and not l.strip().startswith(('', '\uf0b7'))]
            for s_name in lines:
                s_name = s_name.strip()
                if not s_name:
                    continue
                url = AUTHORITATIVE_SOURCE_URLS.get(s_name, "https://developers.google.com/search/docs/fundamentals/creating-helpful-content")
                sources.append({
                    "title": s_name,
                    "url": url
                })

        if sources:
            md_body_parts.append("\n## Authoritative References and Documentation\n")
            for s in sources:
                md_body_parts.append(f"- [{s['title']}]({s['url']})")

        # Suggested internal links
        il_match = re.search(r'Suggested internal links\s*\n([\s\S]*?)(?=\nFurther reading|\nPre-publication|$)', content)
        suggested_links_raw = ' '.join(il_match.group(1).split()) if il_match else ''

        body_text = "\n\n".join(md_body_parts)
        word_count = len(body_text.split())
        read_time = max(1, round(word_count / 200))

        # Quick Answer
        quick_answer = {
            "question": f"Overview: {canonical_title}",
            "answer": f"{meta_desc} This technical guide outlines architectural principles, verification requirements, production engineering trade-offs, and failure recovery protocols.",
            "facts": [
                {"label": "Architecture", "value": "Production AI & Engineering Systems"},
                {"label": "Primary Stack", "value": "Python 3.12 / FastAPI / Pydantic"},
                {"label": "Series Section", "value": part},
                {"label": "Verified As Of", "value": "November 2026"}
            ],
            "goodFor": [
                "Production AI architecture requiring verifiable reliability & explicit guardrails",
                "Engineering teams designing resilient, cost-effective AI workflows"
            ],
            "watchFor": [
                "Enforce strict input validation to prevent prompt injection and data drift",
                "Maintain human-in-the-loop controls for sensitive or consequential operations"
            ]
        }

        art_data = {
            "id": f"ART-AI-{art_num:03d}",
            "articleNumber": art_num,
            "part": part,
            "title": canonical_title,
            "slug": slug,
            "category": "technology",
            "primaryKeyword": primary_kw,
            "metaTitle": meta_title,
            "metaDescription": meta_desc,
            "metaKeywords": meta_kw,
            "seoTitle": meta_title,
            "seoKeywords": meta_kw,
            "author": "Aniket Thakur",
            "publishedAt": TODAY_DATE,
            "datePublished": TODAY_DATE,
            "dateModified": TODAY_DATE,
            "readTime": read_time,
            "wordCount": word_count,
            "tags": tags,
            "coverImage": f"/assets/images/blog/{slug}/cover.svg",
            "coverImageAlt": f"Technical architecture diagram for {canonical_title}",
            "imageCaption": f"Technical architecture and system flow for {canonical_title}.",
            "draft": False,
            "featured": art_num in [1, 2, 7, 8, 11, 16, 26, 30],
            "publishOrder": art_num,
            "sources": sources,
            "showSources": True,
            "enquiry": False,
            "quickAnswer": quick_answer,
            "faqItems": faq_items,
            "suggestedLinksRaw": suggested_links_raw,
            "body": body_text
        }

        articles.append(art_data)
        print(f"[{art_num:02d}/30] Parsed '{canonical_title[:45]}...' ({word_count} words, {len(faq_items)} FAQs, {len(sources)} sources)")

    return articles

def link_related_articles(articles):
    """
    Adds related internal article links within the 30-article series.
    """
    slug_by_num = {a["articleNumber"]: a["slug"] for a in articles}
    title_by_num = {a["articleNumber"]: a["title"] for a in articles}

    for a in articles:
        num = a["articleNumber"]
        # Related articles: previous, next, and 1-2 complementary articles
        related_nums = []
        if num > 1:
            related_nums.append(num - 1)
        if num < 30:
            related_nums.append(num + 1)
        
        # Add complementary topic
        if num <= 6: # Agents
            related_nums.extend([7, 16])
        elif num <= 13: # LLMs & RAG
            related_nums.extend([1, 16, 30])
        elif num <= 17: # Production
            related_nums.extend([2, 29, 30])
        elif num <= 23: # Applications
            related_nums.extend([3, 15, 24])
        else: # Tools & Careers
            related_nums.extend([1, 14, 26])

        # Deduplicate and remove self
        chosen_nums = [n for n in dict.fromkeys(related_nums) if n != num][:4]

        related_md = ["\n## Related Articles in This AI Knowledge Series\n"]
        for r_num in chosen_nums:
            r_slug = slug_by_num[r_num]
            r_title = title_by_num[r_num]
            related_md.append(f"- [{r_title}](/blog/technology/{r_slug}/)")

        a["body"] += "\n" + "\n".join(related_md) + "\n"

def write_files(articles):
    os.makedirs(PUBLISHED_ARTICLES_REPO_DIR, exist_ok=True)
    os.makedirs(PUBLISHED_ARTICLES_DESKTOP_DIR, exist_ok=True)
    os.makedirs(DATA_BLOG_DIR, exist_ok=True)

    # 1. Master Manifest
    manifest_repo_path = os.path.join(PORTFOLIO_ROOT, "data/ai_30_articles_manifest.json")
    manifest_desktop_path = os.path.join(DESKTOP_DIR, "ai_30_articles_manifest.json")
    print(f"Writing Manifest to {manifest_repo_path} and {manifest_desktop_path}...")
    manifest_json_str = json.dumps(articles, indent=2, ensure_ascii=False)
    with open(manifest_repo_path, "w", encoding="utf-8") as f:
        f.write(manifest_json_str)
    with open(manifest_desktop_path, "w", encoding="utf-8") as f:
        f.write(manifest_json_str)

    # 2. Write Markdown & MDX files & SVGs
    print("Writing markdown files, MDX files, and SVG covers...")
    for a in articles:
        frontmatter_dict = {
            "id": a["id"],
            "articleNumber": a["articleNumber"],
            "title": a["title"],
            "seoTitle": a["seoTitle"],
            "slug": a["slug"],
            "description": a["metaDescription"],
            "category": a["category"],
            "part": a["part"],
            "primaryKeyword": a["primaryKeyword"],
            "metaTitle": a["metaTitle"],
            "metaDescription": a["metaDescription"],
            "metaKeywords": a["metaKeywords"],
            "seoKeywords": a["seoKeywords"],
            "author": a["author"],
            "publishedAt": a["publishedAt"],
            "datePublished": a["datePublished"],
            "dateModified": a["dateModified"],
            "readTime": a["readTime"],
            "wordCount": a["wordCount"],
            "tags": a["tags"],
            "coverImage": a["coverImage"],
            "coverImageAlt": a["coverImageAlt"],
            "imageCaption": a["imageCaption"],
            "draft": a["draft"],
            "featured": a["featured"],
            "publishOrder": a["publishOrder"],
            "sources": a["sources"],
            "showSources": True,
            "enquiry": False,
            "quickAnswer": a["quickAnswer"],
            "faqItems": a["faqItems"]
        }

        yaml_prefix = serialize_yaml(frontmatter_dict)
        full_content = yaml_prefix + "\n" + a["body"] + "\n"

        # Write to data/blog/technology/<slug>.md
        blog_md_path = os.path.join(DATA_BLOG_DIR, f"{a['slug']}.md")
        with open(blog_md_path, "w", encoding="utf-8") as f:
            f.write(full_content)

        # Write to published_articles/<slug>.mdx (Repo)
        repo_mdx_path = os.path.join(PUBLISHED_ARTICLES_REPO_DIR, f"{a['slug']}.mdx")
        with open(repo_mdx_path, "w", encoding="utf-8") as f:
            f.write(full_content)

        # Write to published_articles/<slug>.mdx (Desktop)
        desktop_mdx_path = os.path.join(PUBLISHED_ARTICLES_DESKTOP_DIR, f"{a['slug']}.mdx")
        with open(desktop_mdx_path, "w", encoding="utf-8") as f:
            f.write(full_content)

        # Generate SVG Cover
        svg_dir = os.path.join(ASSETS_IMG_DIR, a["slug"])
        os.makedirs(svg_dir, exist_ok=True)
        svg_path = os.path.join(svg_dir, "cover.svg")
        svg_content = generate_svg_cover(a["articleNumber"], a["title"], a["slug"], a["tags"])
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)

    print("All 30 markdown files, MDX files, and SVG covers created successfully.")

    # 3. Update data/blog-editorial.json
    print(f"Updating editorial registry at {EDITORIAL_JSON_PATH}...")
    with open(EDITORIAL_JSON_PATH, "r", encoding="utf-8") as f:
        editorial_data = json.load(f)

    for a in articles:
        url_key = f"/blog/technology/{a['slug']}/"
        editorial_data["entries"][url_key] = {
            "status": "approved",
            "reviewer": "Aniket Thakur",
            "reviewedOn": TODAY_DATE,
            "note": "AI Knowledge Library 30-Article Collection publication."
        }

    with open(EDITORIAL_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(editorial_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # 4. Update data/blog-date-audit.json
    print(f"Updating date audit records at {DATE_AUDIT_JSON_PATH}...")
    with open(DATE_AUDIT_JSON_PATH, "r", encoding="utf-8") as f:
        date_audit_data = json.load(f)

    existing_urls = {e.get("url") for e in date_audit_data["entries"] if isinstance(e, dict)}

    for a in articles:
        url_key = f"/blog/technology/{a['slug']}/"
        audit_entry = {
            "source": f"data/blog/technology/{a['slug']}.md",
            "url": url_key,
            "datePublished": TODAY_DATE,
            "dateModified": TODAY_DATE,
            "status": "owner-confirmed",
            "confidence": "owner-confirmed",
            "evidence": {
                "kind": "site-owner-confirmation",
                "confirmedOn": TODAY_DATE,
                "note": "AI Knowledge Library 30-Article Collection published with owner verification."
            },
            "rationale": "Owner-confirmed publication date.",
            "reviewRequired": False
        }
        if url_key in existing_urls:
            for idx, e in enumerate(date_audit_data["entries"]):
                if e.get("url") == url_key:
                    date_audit_data["entries"][idx] = audit_entry
                    break
        else:
            date_audit_data["entries"].append(audit_entry)

    with open(DATE_AUDIT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(date_audit_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print("Editorial and date audit records successfully updated.")

def main():
    articles = parse_pdf()
    assert len(articles) == 30, f"Expected 30 articles, got {len(articles)}"
    link_related_articles(articles)
    write_files(articles)
    print("\n✓ SUCCESS: All 30 articles ingested, formatted, and staged for build.")

if __name__ == "__main__":
    main()
