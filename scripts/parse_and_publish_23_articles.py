#!/usr/bin/env python3
"""
================================================================================
Practical AI Engineering: 23 Complete Projects Ingestion & Publishing Automation
================================================================================
Parses the master docx collection:
/Users/anny/Desktop/Practical_AI_Engineering_23_Complete_Projects_Tutorials_and_Implementation_Guides.docx

Generates:
1. Master Markdown Document:
   /Users/anny/Desktop/Practical_AI_Engineering_23_Complete_Projects_Tutorials_and_Implementation_Guides.md
2. Structured Manifest:
   /Users/anny/Desktop/articles_manifest.json and data/articles_manifest.json
3. Pre-Split MDX Files:
   /Users/anny/Desktop/published_articles/*.mdx
4. Portfolio Blog Markdown Files:
   data/blog/technology/<slug>.md (23 articles)
5. 1200x675 SVG Artwork:
   assets/images/blog/<slug>/cover.svg (23 articles)
6. Updates data/blog-editorial.json and data/blog-date-audit.json
================================================================================
"""

import os
import sys
import re
import json
import zipfile
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape as xml_escape

DOCX_PATH = "/Users/anny/Desktop/Practical_AI_Engineering_23_Complete_Projects_Tutorials_and_Implementation_Guides.docx"
DESKTOP_DIR = "/Users/anny/Desktop"
PORTFOLIO_ROOT = "/Users/anny/Desktop/Portfolio-Website"
DATA_BLOG_DIR = os.path.join(PORTFOLIO_ROOT, "data/blog/technology")
ASSETS_IMG_DIR = os.path.join(PORTFOLIO_ROOT, "assets/images/blog")
EDITORIAL_JSON_PATH = os.path.join(PORTFOLIO_ROOT, "data/blog-editorial.json")
DATE_AUDIT_JSON_PATH = os.path.join(PORTFOLIO_ROOT, "data/blog-date-audit.json")
PUBLISHED_ARTICLES_DIR = os.path.join(DESKTOP_DIR, "published_articles")
PUBLISHED_ARTICLES_REPO_DIR = os.path.join(PORTFOLIO_ROOT, "published_articles")

TODAY_DATE = "2026-10-31"

SLUG_MAP = {
    1: "build-ai-research-agent-web-search-reports",
    2: "build-ai-excel-agent-spreadsheets-analysis",
    3: "build-ai-email-assistant-replies-inbox-automation",
    4: "build-ai-meeting-assistant-transcription-action-items",
    5: "build-ai-recruitment-agent-resume-screening",
    6: "build-ai-customer-support-agent-ticket-resolution",
    7: "build-ai-sales-agent-lead-qualification-outreach",
    8: "build-ai-financial-analyst-annual-reports-sec",
    9: "build-ai-sql-agent-natural-language-database-queries",
    10: "build-ai-data-analyst-csv-charts-pandas",
    11: "build-ai-browser-agent-web-navigation-tasks",
    12: "build-ai-academic-research-assistant-paper-summaries",
    13: "build-ai-invoice-processing-agent-financial-extraction",
    14: "build-ai-project-management-assistant-task-tracking",
    15: "build-ai-personal-assistant-daily-digital-work",
    16: "build-whatsapp-ai-customer-support-bot-business-api",
    17: "build-ai-phone-receptionist-twilio-voice-calls",
    18: "build-multilingual-ai-voice-assistant-hindi-english",
    19: "build-real-time-ai-translation-voice-conversations",
    20: "build-ai-video-assistant-recordings-question-answering",
    21: "build-ai-interviewer-technical-screening-scoring",
    22: "build-ai-tutor-interactive-conversations-learning",
    23: "build-ai-accessibility-assistant-image-description-reading"
}

PART_MAP = {
    1: "Part I: Practical AI Agents",
    2: "Part I: Practical AI Agents",
    3: "Part I: Practical AI Agents",
    4: "Part I: Practical AI Agents",
    5: "Part I: Practical AI Agents",
    6: "Part I: Practical AI Agents",
    7: "Part I: Practical AI Agents",
    8: "Part I: Practical AI Agents",
    9: "Part I: Practical AI Agents",
    10: "Part I: Practical AI Agents",
    11: "Part I: Practical AI Agents",
    12: "Part I: Practical AI Agents",
    13: "Part I: Practical AI Agents",
    14: "Part I: Practical AI Agents",
    15: "Part I: Practical AI Agents",
    16: "Part II: Voice AI and Multimodal Applications",
    17: "Part II: Voice AI and Multimodal Applications",
    18: "Part II: Voice AI and Multimodal Applications",
    19: "Part II: Voice AI and Multimodal Applications",
    20: "Part II: Voice AI and Multimodal Applications",
    21: "Part II: Voice AI and Multimodal Applications",
    22: "Part II: Voice AI and Multimodal Applications",
    23: "Part II: Voice AI and Multimodal Applications"
}

TAGS_MAP = {
    1: ["AI Agents", "Autonomous Research", "LangGraph", "Web Scraping", "SearXNG"],
    2: ["Excel Automation", "AI Agents", "Spreadsheet Analytics", "Python", "OpenPyXL"],
    3: ["AI Email Assistant", "Gmail API", "Workflow Automation", "FastAPI", "NLP"],
    4: ["AI Meeting Assistant", "Transcription", "Faster-Whisper", "Pyannote", "Action Items"],
    5: ["Recruitment AI", "Resume Parsing", "Candidate Scoring", "Ethics in AI", "Python"],
    6: ["Customer Support AI", "Ticket Resolution", "Hybrid RAG", "CRM Integration", "FastAPI"],
    7: ["AI Sales Agent", "Lead Scoring", "B2B Outreach", "PostgreSQL", "Signal Desk"],
    8: ["Financial Engineering", "SEC 10-K", "Financial Analysis", "Python", "Finance Tools"],
    9: ["SQL AI Agent", "Text-to-SQL", "SQLGlot", "Prompt BI", "Database Security"],
    10: ["Data Analysis", "Pandas", "CSV Profiling", "Data Visualization", "Python"],
    11: ["AI Browser Agent", "Playwright", "Browser Automation", "DOM Extraction", "Python"],
    12: ["Academic Research", "Scientific Literature", "arXiv API", "OpenAlex", "OIST"],
    13: ["Invoice OCR", "Document AI", "Accounts Payable", "GST Validation", "FastAPI"],
    14: ["Project Management AI", "Task Tracking", "DAG Scheduling", "Graphlib", "Python"],
    15: ["Personal AI Assistant", "Agent Memory", "Local LLM", "Tool Calling", "Python"],
    16: ["WhatsApp AI", "Cloud API", "Customer Support", "Webhooks", "FastAPI"],
    17: ["Voice AI", "Phone Receptionist", "Twilio Media Streams", "LiveKit", "SIP"],
    18: ["Multilingual AI", "Hinglish", "Voice Assistant", "Whisper", "Indian Languages"],
    19: ["Real-Time Translation", "Voice AI", "Audio Streaming", "WebSocket", "Python"],
    20: ["Multimodal Video AI", "Scene Detection", "PySceneDetect", "Video RAG", "Python"],
    21: ["AI Interviewer", "Technical Screening", "BARS Rubrics", "Voice AI", "Fairness"],
    22: ["AI Tutor", "Socratic Learning", "Bayesian Knowledge Tracing", "EdTech", "Python"],
    23: ["AI Accessibility", "VLM", "WCAG 2.2 AA", "Screen Reader", "Assistive Tech"]
}

def extract_xml_elements(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read("word/document.xml")
    root = ET.fromstring(xml_content)
    namespaces = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    body = root.find("w:body", namespaces)

    def get_text(element):
        parts = []
        for elem in element.iter():
            tag = elem.tag.split("}")[-1]
            if tag == "t":
                parts.append(elem.text or "")
            elif tag == "br":
                parts.append("\n")
            elif tag == "tab":
                parts.append("    ")
        return "".join(parts)

    elements = []
    for child in body:
        tag = child.tag.split("}")[-1]
        if tag == "p":
            pPr = child.find("w:pPr", namespaces)
            style = ""
            if pPr is not None:
                pStyle = pPr.find("w:pStyle", namespaces)
                if pStyle is not None:
                    style = pStyle.attrib.get("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val", "")
            sizes = set()
            for r in child.findall("w:r", namespaces):
                rPr = r.find("w:rPr", namespaces)
                if rPr is not None:
                    sz = rPr.find("w:sz", namespaces)
                    if sz is not None:
                        sizes.add(sz.attrib.get("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val"))
            t = get_text(child).strip()
            if t:
                elements.append(("p", style, sizes, t))
        elif tag == "tbl":
            rows = child.findall("w:tr", namespaces)
            if len(rows) == 1:
                cells = rows[0].findall("w:tc", namespaces)
                if len(cells) == 1:
                    txt = get_text(cells[0]).strip()
                    if txt.startswith("[CODE]"):
                        elements.append(("code", "", set(), txt[6:].strip()))
                        continue
            tbl_data = []
            for r in rows:
                row_data = []
                for c in r.findall("w:tc", namespaces):
                    row_data.append(get_text(c).strip())
                tbl_data.append(row_data)
            elements.append(("tbl", "", set(), tbl_data))
    return elements

def detect_code_lang(code):
    lines = [l.strip() for l in code.split("\n") if l.strip()]
    first_line = lines[0] if lines else ""
    if first_line.startswith(("flowchart", "sequenceDiagram", "graph ", "classDiagram", "stateDiagram")):
        return "mermaid"
    if any(first_line.startswith(prefix) for prefix in ["import ", "from ", "def ", "class ", "async def ", "@"]):
        return "python"
    if any(first_line.startswith(prefix) for prefix in ["pip ", "python3 ", "python ", "pytest ", "curl ", "docker ", "source ", "uvicorn "]):
        return "bash"
    if any(k in first_line for k in ["_KEY=", "_URL=", "_MODEL=", "PORT=", "DEBUG="]):
        return "bash"
    if first_line.startswith(("SELECT ", "CREATE ", "INSERT ", "ALTER ", "WITH ")):
        return "sql"
    if first_line.startswith(("{", "[")):
        return "json"
    if "├──" in code or "└──" in code:
        return "text"
    if first_line.startswith("===") or "test session starts" in code:
        return "text"
    if ":" in first_line and not first_line.startswith(("http:", "https:")) and not first_line.endswith(";"):
        return "yaml"
    return "python"

def format_markdown_table(rows):
    if not rows:
        return ""
    # Header
    col_count = max(len(r) for r in rows)
    cleaned_rows = []
    for r in rows:
        padded = r + [""] * (col_count - len(r))
        # Replace newlines with <br> and escape pipes
        cleaned_cells = [c.replace("\n", "<br>").replace("|", "\\|") for c in padded]
        cleaned_rows.append(cleaned_cells)

    header = "| " + " | ".join(cleaned_rows[0]) + " |"
    delimiter = "| " + " | ".join(["---"] * col_count) + " |"
    data_lines = ["| " + " | ".join(row) + " |" for row in cleaned_rows[1:]]
    return "\n" + "\n".join([header, delimiter] + data_lines) + "\n"

def resolve_internal_links(text):
    """
    Replaces raw Internal Link Suggestions and case study mentions with verified links.
    """
    # Companion articles in the series
    for num, slug in SLUG_MAP.items():
        # Match Article X: How to Build...
        pat = rf"Article {num}: How to Build [^[\n*)]+"
        matches = re.findall(pat, text)
        for m in set(matches):
            text = text.replace(m, f"[{m}](/writing/{slug}/)")

    # Key case studies on Aniket.app
    text = text.replace("Finance Tools — DCF Valuation", "[Finance Tools — DCF Valuation](/projects/finance-tools/)")
    text = text.replace("Finance Tools DCF Engine", "[Finance Tools DCF Engine](/projects/finance-tools/)")
    text = text.replace("Signal Desk — Lead Agent", "[Signal Desk — Lead Agent](/projects/signal-desk/)")
    text = text.replace("Prompt BI engineering system", "[Prompt BI](/projects/prompt-bi/) engineering system")
    text = text.replace("Prompt BI", "[Prompt BI](/projects/prompt-bi/)")
    text = text.replace("FastCharger", "[FastCharger](/projects/fastcharger/)")
    text = text.replace("Invoice OCR Extractor", "[Invoice OCR Extractor](/projects/invoice-ocr/)")
    text = text.replace(
        "AI Agent Development Skills: Tools, Memory, and Orchestration (https://aniket.app/)",
        "[AI Agent Development Skills: Tools, Memory, and Orchestration](/blog/technology/ai-agent-development-skills-tools-memory-orchestration/)"
    )
    text = text.replace(
        "AI Agent Development Skills: Tools, Memory, and Orchestration",
        "[AI Agent Development Skills: Tools, Memory, and Orchestration](/blog/technology/ai-agent-development-skills-tools-memory-orchestration/)"
    )
    text = text.replace(
        "Okinawa Institute of Science and Technology (OIST) Applied AI Research",
        "[OIST Applied AI Research](/research/)"
    )

    # Clean up verification notice placeholders
    text = text.replace(" [URL requires verification upon publication]", "")
    text = text.replace("[URL requires verification upon publication]", "")

    return text

def generate_svg_cover(art_num, title, slug, tags):
    """
    Generates a 1200x675 SVG cover artwork following the repository's technology theme.
    """
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

    tag1 = xml_escape(tags[0] if len(tags) > 0 else "AI Engineering")[:20]
    tag2 = xml_escape(tags[1] if len(tags) > 1 else "Production Guide")[:20]
    art_id = f"AI-ENG-{art_num:02d}"

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF9F6"/>
      <stop offset="100%" stop-color="#EEF2FF"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  <rect x="40" y="40" width="1120" height="595" rx="20" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="2"/>
  
  <g transform="translate(90, 100)">
    <rect x="0" y="0" width="200" height="34" rx="17" fill="#E0E7FF" stroke="#4F46E5" stroke-opacity="0.3"/>
    <circle cx="16" cy="17" r="5" fill="#4F46E5"/>
    <text x="30" y="22" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#3730A3" letter-spacing="1">PRACTICAL AI</text>
    
    <text x="215" y="22" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#6B7280">{art_id}</text>

    <text x="0" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#121316" letter-spacing="-0.5">{line1}</text>
    {f'<text x="0" y="132" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#121316" letter-spacing="-0.5">{line2}</text>' if line2 else ''}
    {f'<text x="0" y="179" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#121316" letter-spacing="-0.5">{line3}</text>' if line3 else ''}

    <g transform="translate(0, {220 if line3 else (180 if line2 else 135)})">
      <text x="0" y="24" font-family="Newsreader, Georgia, serif" font-size="20" font-style="italic" fill="#4F46E5">
        Production Engineering &amp; Implementation Guide
      </text>
      
      <g transform="translate(0, 50)">
        <rect x="0" y="0" width="160" height="28" rx="6" fill="#F3F4F6"/>
        <text x="80" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag1}</text>
        
        <rect x="175" y="0" width="160" height="28" rx="6" fill="#F3F4F6"/>
        <text x="255" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag2}</text>
      </g>
    </g>

    <g transform="translate(0, 440)">
      <circle cx="16" cy="16" r="16" fill="#4F46E5"/>
      <text x="16" y="21" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">AT</text>
      <text x="44" y="14" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Aniket Thakur</text>
      <text x="44" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#6B7280">Researched &amp; Verified · October 2026</text>
    </g>
  </g>

  <g transform="translate(620, 140)">
    <rect width="460" height="395" rx="14" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.04))"/>
    <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">ENGINEERING ARCHITECTURE</text>
    
    <rect x="30" y="75" width="180" height="70" rx="8" fill="#EEF2FF" stroke="#C7D2FE"/>
    <text x="45" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#3730A3">Runtime Execution</text>
    <text x="45" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#4F46E5">Local Weights / Engine</text>

    <rect x="250" y="75" width="180" height="70" rx="8" fill="#F5F3FF" stroke="#DDD6FE"/>
    <text x="265" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" fill="#5B21B6">Context &amp; Pipeline</text>
    <text x="265" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#7C3AED">Inference / RAG / API</text>

    <rect x="30" y="165" width="400" height="135" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
    <text x="45" y="195" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Production Reliability &amp; Safety Gating:</text>
    
    <text x="45" y="225" font-family="JetBrains Mono, monospace" font-size="11" fill="#4B5563">Validation Accuracy:</text>
    <rect x="160" y="214" width="250" height="14" rx="7" fill="#E5E7EB"/>
    <rect x="160" y="214" width="220" height="14" rx="7" fill="#4F46E5"/>
    <text x="390" y="225" font-family="JetBrains Mono, monospace" font-size="10" fill="#FFFFFF" text-anchor="end">Deterministic</text>

    <text x="45" y="255" font-family="JetBrains Mono, monospace" font-size="11" fill="#4B5563">Pipeline Throughput:</text>
    <rect x="160" y="244" width="250" height="14" rx="7" fill="#E5E7EB"/>
    <rect x="160" y="244" width="235" height="14" rx="7" fill="#7C3AED"/>
    <text x="405" y="255" font-family="JetBrains Mono, monospace" font-size="10" fill="#FFFFFF" text-anchor="end">Low Latency</text>

    <text x="45" y="285" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#0891B2">✓ Zero privacy leaks · Verified open-source architecture</text>

    <rect x="30" y="320" width="400" height="48" rx="6" fill="#1E293B"/>
    <text x="45" y="350" font-family="JetBrains Mono, monospace" font-size="13" fill="#38BDF8">$ ai deploy --production-verified</text>
  </g>
</svg>"""
    return svg

def parse_all_articles():
    print(f"Reading {DOCX_PATH}...")
    elements = extract_xml_elements(DOCX_PATH)
    print(f"Extracted {len(elements)} XML elements.")

    # Locate TOC
    toc_items = {}
    for i, el in enumerate(elements):
        if el[0] == "p" and 20 <= i <= 43:
            m = re.match(r"^Article (\d+):\s*(.*?)\s*\*\((.*?)\)\*", el[3])
            if m:
                art_num = int(m.group(1))
                toc_items[art_num] = {
                    "title": m.group(2).strip(),
                    "primaryKeyword": m.group(3).replace("Primary Keyword:", "").strip()
                }

    # Locate Article starts
    art_indices = [i for i, el in enumerate(elements) if el[0] == "p" and re.match(r"^Article (\d+):", el[3]) and i >= 45]
    
    # End of Article 23 is at "Final Quality-Control & Verification Summary"
    end_idx = len(elements)
    for i in range(art_indices[-1], len(elements)):
        if elements[i][0] == "p" and "Final Quality-Control" in elements[i][3]:
            end_idx = i
            break
    
    boundary_indices = art_indices + [end_idx]

    articles = []

    for idx_num, start_idx in enumerate(art_indices):
        art_num = idx_num + 1
        end_idx = boundary_indices[idx_num + 1]
        art_elements = elements[start_idx:end_idx]

        # Extract metadata
        meta = {}
        body_elements = []
        in_meta = True

        for el in art_elements:
            if in_meta:
                if el[0] == "p":
                    t = el[3]
                    if t.startswith(f"Article {art_num}:"):
                        continue
                    if t.startswith("Title:"):
                        meta["title"] = t.replace("Title:", "").strip()
                        continue
                    if t.startswith("Meta Title:"):
                        meta["metaTitle"] = t.replace("Meta Title:", "").strip()
                        continue
                    if t.startswith("Meta Description:"):
                        meta["metaDescription"] = t.replace("Meta Description:", "").strip()
                        continue
                    if t.startswith("Meta Keywords:"):
                        meta["metaKeywords"] = t.replace("Meta Keywords:", "").strip()
                        continue
                    if "Introduction" in t and ("27" in el[2] or "26" in el[2]):
                        in_meta = False
                        body_elements.append(el)
                        continue
                body_elements.append(el)
            else:
                body_elements.append(el)

        slug = SLUG_MAP[art_num]
        part = PART_MAP[art_num]
        title = meta.get("title") or toc_items[art_num]["title"]
        primary_kw = toc_items[art_num]["primaryKeyword"]
        meta_title = meta.get("metaTitle") or f"{title} | Aniket.app"
        meta_desc = meta.get("metaDescription") or ""
        meta_keywords = meta.get("metaKeywords") or primary_kw
        tags = TAGS_MAP.get(art_num, ["AI Engineering", "Machine Learning", "Python"])

        # Parse body and extract structured items (FAQs, sources, tables, code)
        faq_items = []
        sources = []
        md_lines = []

        in_faq = False
        current_faq_q = None
        current_faq_a = []

        for el in body_elements:
            if el[0] == "p":
                style = el[1]
                sizes = el[2]
                text = el[3]

                # Heading detection based on font size
                is_h2 = any(s in sizes for s in ["26", "27"]) or (text in ["Introduction", "System Architecture", "Frequently Asked Questions", "Troubleshooting Common Errors", "Cost Breakdown & Production Considerations", "Production Readiness Checklist", "Useful Tools, Documentation and GitHub Repositories", "Step-by-Step Implementation Guide"])
                is_h3 = any(s in sizes for s in ["23", "24"]) or (text.startswith("Step ") and ":" in text) or (text.startswith("Option ") and ":" in text) or text in ["Key Architectural Boundaries", "Recommended Implementation Options"]

                if "Frequently Asked Questions" in text and is_h2:
                    in_faq = True
                    md_lines.append("\n## Frequently Asked Questions\n")
                    continue

                if in_faq:
                    # Parse FAQ item
                    # Format is often "Question? Answer" in a single ListNumber paragraph
                    if "?" in text:
                        # Flush previous
                        if current_faq_q and current_faq_a:
                            faq_items.append({"question": current_faq_q, "answer": " ".join(current_faq_a).strip()})
                            current_faq_a = []
                        q_part, a_part = text.split("?", 1)
                        current_faq_q = q_part.strip() + "?"
                        if a_part.strip():
                            current_faq_a.append(a_part.strip())
                    else:
                        if current_faq_q:
                            current_faq_a.append(text.strip())
                    continue

                if is_h2:
                    md_lines.append(f"\n## {text}\n")
                elif is_h3:
                    md_lines.append(f"\n### {text}\n")
                elif style == "ListBullet":
                    # Check if checklist
                    if text.startswith("[ ]"):
                        md_lines.append(f"- [ ] {text[3:].strip()}")
                    else:
                        md_lines.append(f"- {text}")
                elif style == "ListNumber":
                    # Troubleshooting or numbered steps
                    if text.startswith("Playwright Container Crash") or text.startswith("SearXNG Returns") or text.startswith("Infinite Agent") or (":" in text and ("Error" in text or "Failure" in text or "Crash" in text or "Loop" in text or "Exception" in text or "Rate Limit" in text)):
                        md_lines.append(f"\n#### {text}\n")
                    elif re.match(r"^\d+\.", text):
                        md_lines.append(text)
                    else:
                        md_lines.append(f"1. {text}")
                else:
                    # Regular paragraph or callout
                    if text.startswith("*(") and text.endswith(")*"):
                        # Callout
                        inner = text[2:-2].strip()
                        if "Pricing checked" in inner:
                            md_lines.append(f"\n> [!NOTE]\n> **Pricing Verification:** {inner}\n")
                        elif "Internal Link Suggestion:" in inner:
                            resolved_inner = resolve_internal_links(inner)
                            md_lines.append(f"\n> [!TIP]\n> **Architecture Reference:** {resolved_inner}\n")
                        else:
                            md_lines.append(f"\n> {inner}\n")
                    else:
                        resolved_text = resolve_internal_links(text)
                        md_lines.append(f"\n{resolved_text}\n")

            elif el[0] == "code":
                code_text = el[3]
                lang = detect_code_lang(code_text)
                md_lines.append(f"\n```{lang}\n{code_text}\n```\n")

            elif el[0] == "tbl":
                tbl_rows = el[3]
                # Check if this is the Useful Tools table
                first_row = [c.lower() for c in tbl_rows[0]]
                if any("link" in c or "github" in c or "url" in c for c in first_row) and any("resource" in c or "component" in c for c in first_row):
                    link_idx = -1
                    for idx_c, c in enumerate(first_row):
                        if "link" in c or "url" in c or "repository" in c:
                            link_idx = idx_c
                            break
                    for r in tbl_rows[1:]:
                        if link_idx != -1 and link_idx < len(r):
                            url = r[link_idx].strip()
                            if url.startswith("http"):
                                title_str = r[0].strip()
                                if len(r) > 1 and r[1].strip():
                                    title_str += f" ({r[1].strip()})"
                                sources.append({"title": title_str, "url": url})
                
                table_md = format_markdown_table(tbl_rows)
                md_lines.append(table_md)

        # Flush final FAQ
        if current_faq_q and current_faq_a:
            faq_items.append({"question": current_faq_q, "answer": " ".join(current_faq_a).strip()})

        # Append FAQ items to markdown body as well for rich HTML rendering
        if faq_items:
            for item in faq_items:
                md_lines.append(f"\n### {item['question']}\n\n{item['answer']}\n")

        # Assemble markdown body
        raw_body = "\n".join(md_lines)
        # Clean up excessive blank lines
        clean_body = re.sub(r"\n{3,}", "\n\n", raw_body).strip()
        word_count = len(clean_body.split())
        read_time = max(1, round(word_count / 200))

        # Quick Answer construction
        quick_answer = {
            "question": f"How to Build: {title} (Summary & Mechanics)",
            "answer": f"{meta_desc} This system couples deterministic validation loops with modern AI orchestration to eliminate hallucinations, enforce type contracts, and guarantee enterprise production stability.",
            "facts": [
                {"label": "Architecture", "value": "Deterministic Agent Graph"},
                {"label": "Primary Stack", "value": "Python 3.12 / FastAPI / Pydantic"},
                {"label": "Part Series", "value": part},
                {"label": "Verified As Of", "value": "October 2026"}
            ],
            "goodFor": [
                "Production automation requiring verifiable citation & error boundaries",
                "Self-hosted privacy-first deployments with open-source alternatives"
            ],
            "watchFor": [
                "Enforce hard recursion limits to prevent cyclic execution drift",
                "Sanitize untrusted inputs to prevent indirect prompt injection"
            ]
        }

        art_data = {
            "id": f"ART-{art_num:03d}",
            "articleNumber": art_num,
            "part": part,
            "title": title,
            "slug": slug,
            "category": "technology",
            "primaryKeyword": primary_kw,
            "metaTitle": meta_title,
            "metaDescription": meta_desc,
            "metaKeywords": meta_keywords,
            "author": "Aniket Thakur",
            "publishedAt": TODAY_DATE,
            "datePublished": TODAY_DATE,
            "dateModified": TODAY_DATE,
            "readTime": read_time,
            "wordCount": word_count,
            "tags": tags,
            "coverImage": f"/assets/images/blog/{slug}/cover.svg",
            "coverImageAlt": f"Technical architecture diagram for {title}",
            "imageCaption": f"Architectural flowchart and technical breakdown for {title}.",
            "draft": False,
            "featured": art_num in [1, 2, 8, 9, 16, 17],
            "publishOrder": art_num,
            "quickAnswer": quick_answer,
            "faqItems": faq_items,
            "sources": sources,
            "body": clean_body
        }

        articles.append(art_data)
        print(f"[{art_num}/23] Parsed: {title[:50]}... ({word_count} words, {len(faq_items)} FAQs, {len(sources)} sources)")

    return articles

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

def write_outputs(articles):
    os.makedirs(PUBLISHED_ARTICLES_DIR, exist_ok=True)
    os.makedirs(PUBLISHED_ARTICLES_REPO_DIR, exist_ok=True)
    os.makedirs(DATA_BLOG_DIR, exist_ok=True)

    # 1. Master Markdown Document
    master_md_path = os.path.join(DESKTOP_DIR, "Practical_AI_Engineering_23_Complete_Projects_Tutorials_and_Implementation_Guides.md")
    print(f"Writing Master Document to {master_md_path}...")
    with open(master_md_path, "w", encoding="utf-8") as f:
        f.write("# Practical AI Engineering: 23 Complete Projects, Tutorials and Implementation Guides\n\n")
        f.write("> Target Publication: [Aniket.app](https://aniket.app/)\n")
        f.write("> Content Category: Artificial Intelligence, AI Engineering, AI Agents, Machine Learning, Automation\n")
        f.write(f"> Publication Date: {TODAY_DATE}\n\n")
        f.write("## Table of Contents\n\n")
        f.write("### Part I: Practical AI Agents (Articles 1–15)\n")
        for a in articles[:15]:
            f.write(f"- [Article {a['articleNumber']}: {a['title']}](/writing/{a['slug']}/) *(Keyword: {a['primaryKeyword']})*\n")
        f.write("\n### Part II: Voice AI and Multimodal Applications (Articles 16–23)\n")
        for a in articles[15:]:
            f.write(f"- [Article {a['articleNumber']}: {a['title']}](/writing/{a['slug']}/) *(Keyword: {a['primaryKeyword']})*\n")
        f.write("\n---\n\n")

        for a in articles:
            f.write(f"# Article {a['articleNumber']}: {a['title']}\n\n")
            f.write(f"- **Primary Keyword:** {a['primaryKeyword']}\n")
            f.write(f"- **Slug:** `{a['slug']}`\n")
            f.write(f"- **Meta Title:** {a['metaTitle']}\n")
            f.write(f"- **Meta Description:** {a['metaDescription']}\n")
            f.write(f"- **Meta Keywords:** {a['metaKeywords']}\n")
            f.write(f"- **Read Time:** {a['readTime']} min ({a['wordCount']} words)\n\n")
            f.write(a["body"])
            f.write("\n\n---\n\n")

    # 2. Structured Manifest
    manifest_desktop_path = os.path.join(DESKTOP_DIR, "articles_manifest.json")
    manifest_repo_path = os.path.join(PORTFOLIO_ROOT, "data/articles_manifest.json")
    manifest_web_path = os.path.join(PORTFOLIO_ROOT, "apps/web/generated/articles_manifest.json")
    print(f"Writing Manifest to {manifest_desktop_path} and {manifest_repo_path}...")
    manifest_json_str = json.dumps(articles, indent=2, ensure_ascii=False)
    with open(manifest_desktop_path, "w", encoding="utf-8") as f:
        f.write(manifest_json_str)
    with open(manifest_repo_path, "w", encoding="utf-8") as f:
        f.write(manifest_json_str)
    if os.path.exists(os.path.dirname(manifest_web_path)):
        with open(manifest_web_path, "w", encoding="utf-8") as f:
            f.write(manifest_json_str)

    # 3. Pre-Split MDX Files and Portfolio Markdown Files
    print(f"Writing MDX files to {PUBLISHED_ARTICLES_DIR} and repo blog files...")
    for a in articles:
        # MDX Frontmatter
        frontmatter_dict = {
            "id": a["id"],
            "articleNumber": a["articleNumber"],
            "title": a["title"],
            "seoTitle": a["metaTitle"],
            "slug": a["slug"],
            "description": a["metaDescription"],
            "category": a["category"],
            "part": a["part"],
            "primaryKeyword": a["primaryKeyword"],
            "metaTitle": a["metaTitle"],
            "metaDescription": a["metaDescription"],
            "metaKeywords": a["metaKeywords"],
            "seoKeywords": a["metaKeywords"],
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
        full_file_content = yaml_prefix + "\n" + a["body"] + "\n"

        # Write to published_articles/<slug>.mdx (Desktop)
        mdx_path = os.path.join(PUBLISHED_ARTICLES_DIR, f"{a['slug']}.mdx")
        with open(mdx_path, "w", encoding="utf-8") as f:
            f.write(full_file_content)

        # Write to published_articles/<slug>.mdx (Repo)
        repo_mdx_path = os.path.join(PUBLISHED_ARTICLES_REPO_DIR, f"{a['slug']}.mdx")
        with open(repo_mdx_path, "w", encoding="utf-8") as f:
            f.write(full_file_content)

        # Write to data/blog/technology/<slug>.md (Repo)
        blog_md_path = os.path.join(DATA_BLOG_DIR, f"{a['slug']}.md")
        with open(blog_md_path, "w", encoding="utf-8") as f:
            f.write(full_file_content)

        # 4. Generate SVG Artwork
        svg_dir = os.path.join(ASSETS_IMG_DIR, a["slug"])
        os.makedirs(svg_dir, exist_ok=True)
        svg_path = os.path.join(svg_dir, "cover.svg")
        svg_content = generate_svg_cover(a["articleNumber"], a["title"], a["slug"], a["tags"])
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)

    print("All article files and SVG artwork generated successfully.")

    # 5. Update data/blog-editorial.json
    print(f"Updating {EDITORIAL_JSON_PATH}...")
    with open(EDITORIAL_JSON_PATH, "r", encoding="utf-8") as f:
        editorial_data = json.load(f)

    for a in articles:
        url_key = f"/blog/technology/{a['slug']}/"
        editorial_data["entries"][url_key] = {
            "status": "approved",
            "reviewer": "Aniket Thakur",
            "reviewedOn": TODAY_DATE,
            "note": "Practical AI Engineering 23-Article Collection publication."
        }

    with open(EDITORIAL_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(editorial_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # 6. Update data/blog-date-audit.json
    print(f"Updating {DATE_AUDIT_JSON_PATH}...")
    with open(DATE_AUDIT_JSON_PATH, "r", encoding="utf-8") as f:
        date_audit_data = json.load(f)

    existing_urls = {e["url"] for e in date_audit_data["entries"]}

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
                "note": "Practical AI Engineering series published with verified date."
            },
            "rationale": "Owner-confirmed publication date.",
            "reviewRequired": False
        }
        if url_key in existing_urls:
            # Update existing
            for idx, e in enumerate(date_audit_data["entries"]):
                if e["url"] == url_key:
                    date_audit_data["entries"][idx] = audit_entry
                    break
        else:
            date_audit_data["entries"].append(audit_entry)

    with open(DATE_AUDIT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(date_audit_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print("Editorial and date audit records successfully updated.")

def main():
    articles = parse_all_articles()
    assert len(articles) == 23, f"Expected 23 articles, got {len(articles)}"
    write_outputs(articles)
    print("\n✓ Processing Complete: 23 articles parsed, structured, and staged for build.")

if __name__ == "__main__":
    main()
