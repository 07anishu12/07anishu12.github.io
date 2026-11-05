#!/usr/bin/env python3
"""
================================================================================
EICMA 2026 Motorcycle Launches: 80 SEO Articles Ingestion & Publishing Automation
================================================================================
Parses master PDF:
/Users/anny/Desktop/EICMA_2026_Complete_Motorcycle_Launches_80_SEO_Articles.pdf

Publishes all 80 articles with publication dates distributed between
November 1, 2026 and November 5, 2026 (16 articles per day):
- 2026-11-01: Articles 01 to 16
- 2026-11-02: Articles 17 to 32
- 2026-11-03: Articles 33 to 48
- 2026-11-04: Articles 49 to 64
- 2026-11-05: Articles 65 to 80

Outputs:
1. Master Manifest:
   data/eicma_2026_80_articles_manifest.json and /Users/anny/Desktop/eicma_2026_80_articles_manifest.json
2. Pre-Split MDX Files:
   published_articles/<slug>.mdx and /Users/anny/Desktop/published_articles/<slug>.mdx
3. Portfolio Blog Markdown Files:
   data/blog/auto/<slug>.md (80 articles)
4. 1200x675 SVG Artwork:
   assets/images/blog/<slug>/cover.svg (80 articles)
5. Updates data/blog-editorial.json and data/blog-date-audit.json
================================================================================
"""

import os
import sys
import re
import json
import subprocess
import unicodedata
from xml.sax.saxutils import escape as xml_escape

ROOT_DIR = "/Users/anny/Desktop/Portfolio-Website"
DESKTOP_DIR = "/Users/anny/Desktop"
PDF_PATH = "/Users/anny/Desktop/EICMA_2026_Complete_Motorcycle_Launches_80_SEO_Articles.pdf"

DATA_BLOG_AUTO = os.path.join(ROOT_DIR, "data/blog/auto")
ASSETS_IMG_DIR = os.path.join(ROOT_DIR, "assets/images/blog")
EDITORIAL_JSON_PATH = os.path.join(ROOT_DIR, "data/blog-editorial.json")
DATE_AUDIT_JSON_PATH = os.path.join(ROOT_DIR, "data/blog-date-audit.json")
PUBLISHED_ARTICLES_REPO = os.path.join(ROOT_DIR, "published_articles")
PUBLISHED_ARTICLES_DESKTOP = os.path.join(DESKTOP_DIR, "published_articles")

MANIFEST_REPO = os.path.join(ROOT_DIR, "data/eicma_2026_80_articles_manifest.json")
MANIFEST_DESKTOP = os.path.join(DESKTOP_DIR, "eicma_2026_80_articles_manifest.json")

# Category mapping
CATEGORY_NAMES = {
    "A": "Major International Motorcycle Launches",
    "B": "Japanese Motorcycle Manufacturers",
    "C": "European & Italian Motorcycle Launches",
    "D": "Indian Motorcycle Manufacturers & Global Expansion",
    "E": "Electric Scooters & Future Mobility",
    "F": "Motorcycle Comparisons & Buying Decisions",
    "G": "India Launch Prospects & Market Analysis",
    "H": "Event Roundups, Technology & Industry Trends"
}

def get_category_code(art_num):
    if art_num <= 10:
        return "A"
    elif art_num <= 20:
        return "B"
    elif art_num <= 35:
        return "C"
    elif art_num <= 45:
        return "D"
    elif art_num <= 53:
        return "E"
    elif art_num <= 63:
        return "F"
    elif art_num <= 70:
        return "G"
    else:
        return "H"

def get_publication_date(art_num):
    # 80 articles across 5 days (Nov 1 to Nov 5, 2026) -> 16 per day
    day = min(5, (art_num - 1) // 16 + 1)
    return f"2026-11-0{day}"

# Verified Manufacturer Official Portals
MANUFACTURER_SOURCES = {
    "Hero": {"title": "Hero MotoCorp Official Global Portal", "url": "https://www.heromotocorp.com/"},
    "Royal Enfield": {"title": "Royal Enfield Official Global Portal", "url": "https://www.royalenfield.com/"},
    "Himalayan": {"title": "Royal Enfield Official Global Portal", "url": "https://www.royalenfield.com/"},
    "Continental GT": {"title": "Royal Enfield Official Global Portal", "url": "https://www.royalenfield.com/"},
    "Flying Flea": {"title": "Royal Enfield Flying Flea EV Portal", "url": "https://www.royalenfield.com/"},
    "Norton": {"title": "Norton Motorcycles Official Portal", "url": "https://www.nortonmotorcycles.com/"},
    "BMW": {"title": "BMW Motorrad Official Global Portal", "url": "https://www.bmw-motorrad.com/"},
    "Suzuki": {"title": "Suzuki Cycles Official Global Portal", "url": "https://suzukicycles.com/"},
    "Honda": {"title": "Honda Powersports Official Global Portal", "url": "https://powersports.honda.com/"},
    "Fireblade": {"title": "Honda Powersports Official Global Portal", "url": "https://powersports.honda.com/"},
    "Africa Twin": {"title": "Honda Powersports Official Global Portal", "url": "https://powersports.honda.com/"},
    "Yamaha": {"title": "Yamaha Motor Official Global Portal", "url": "https://www.yamaha-motor.com/"},
    "Kawasaki": {"title": "Kawasaki Motors Official Global Portal", "url": "https://www.kawasaki.com/"},
    "Ducati": {"title": "Ducati Official Global Portal", "url": "https://www.ducati.com/"},
    "Panigale": {"title": "Ducati Official Global Portal", "url": "https://www.ducati.com/"},
    "Diavel": {"title": "Ducati Official Global Portal", "url": "https://www.ducati.com/"},
    "Monster": {"title": "Ducati Official Global Portal", "url": "https://www.ducati.com/"},
    "Moto Guzzi": {"title": "Moto Guzzi Official Global Portal", "url": "https://www.motoguzzi.com/"},
    "Aprilia": {"title": "Aprilia Official Global Portal", "url": "https://www.aprilia.com/"},
    "Triumph": {"title": "Triumph Motorcycles Official Global Portal", "url": "https://www.triumphmotorcycles.com/"},
    "TVS": {"title": "TVS Motor Official Global Portal", "url": "https://www.tvsmotor.com/"},
    "Vespa": {"title": "Vespa Official Global Portal", "url": "https://www.vespa.com/"},
}

EICMA_SOURCE = {"title": "EICMA 2026 Official Exhibition Directory", "url": "https://www.eicma.it/"}

FEATURED_ARTICLES = {1, 2, 3, 5, 8, 10, 11, 15, 21, 23, 26, 36, 39, 42, 54, 60, 64, 71, 72, 73, 76, 77, 80}

def slugify(title):
    t = unicodedata.normalize('NFKD', title).encode('ascii', 'ignore').decode('utf-8')
    t = t.lower()
    t = re.sub(r'[\':?,.()!/&]+', '', t)
    t = re.sub(r'[^a-z0-9]+', '-', t.strip())
    t = re.sub(r'-+', '-', t)
    return t.strip('-')

def clean_text_whitespace(text):
    return ' '.join(text.split()).strip()

def format_paragraphs(text):
    paras = text.split('\n\n')
    cleaned = []
    for p in paras:
        lines = [l.strip() for l in p.split('\n') if l.strip()]
        if not lines:
            continue
        p_text = ''
        for l in lines:
            if not p_text:
                p_text = l
            elif p_text.endswith('-'):
                p_text += l
            else:
                p_text += ' ' + l
        cleaned.append(p_text)
    return '\n\n'.join(cleaned)

def generate_svg_cover(art_num, title, slug, tags, spec_summary):
    words = title.split()
    lines = []
    curr = ''
    for w in words:
        if len(curr + ' ' + w) <= 24:
            curr = (curr + ' ' + w).strip()
        else:
            if curr:
                lines.append(curr)
            curr = w
    if curr:
        lines.append(curr)

    line1 = xml_escape(lines[0]) if len(lines) > 0 else ''
    line2 = xml_escape(lines[1]) if len(lines) > 1 else ''
    line3 = xml_escape(' '.join(lines[2:])) if len(lines) > 2 else ''

    tag1 = xml_escape(tags[0] if len(tags) > 0 else 'Auto')[:18]
    tag2 = xml_escape(tags[1] if len(tags) > 1 else 'EICMA 2026')[:18]
    art_id = f"EICMA-{art_num:03d}"

    spec1 = xml_escape(spec_summary.get('engine', 'Liquid-Cooled Powertrain'))[:44]
    spec2 = xml_escape(spec_summary.get('power', 'Optimized Power & Dynamics'))[:44]
    spec3 = xml_escape(spec_summary.get('status', 'Verified Market Analysis'))[:44]

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF9F6"/>
      <stop offset="100%" stop-color="#FFF1F2"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  <rect x="40" y="40" width="1120" height="595" rx="20" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="2"/>
  
  <g transform="translate(90, 95)">
    <rect x="0" y="0" width="190" height="34" rx="17" fill="#FEE2E2" stroke="#DC2626" stroke-opacity="0.3"/>
    <circle cx="16" cy="17" r="5" fill="#DC2626"/>
    <text x="30" y="22" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#991B1B" letter-spacing="1">EICMA 2026 DEBUT</text>
    
    <text x="205" y="22" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#6B7280">{art_id}</text>

    <text x="0" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="32" font-weight="800" fill="#121316" letter-spacing="-0.5">{line1}</text>
    {f'<text x="0" y="130" font-family="Plus Jakarta Sans, sans-serif" font-size="32" font-weight="800" fill="#121316" letter-spacing="-0.5">{line2}</text>' if line2 else ''}
    {f'<text x="0" y="175" font-family="Plus Jakarta Sans, sans-serif" font-size="32" font-weight="800" fill="#121316" letter-spacing="-0.5">{line3}</text>' if line3 else ''}

    <g transform="translate(0, {215 if line3 else (175 if line2 else 130)})">
      <text x="0" y="24" font-family="Newsreader, Georgia, serif" font-size="20" font-style="italic" fill="#DC2626">
        Milan International Motorcycle Exhibition • Official Series
      </text>
      
      <g transform="translate(0, 50)">
        <rect x="0" y="0" width="160" height="28" rx="6" fill="#F3F4F6"/>
        <text x="80" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag1}</text>
        
        <rect x="175" y="0" width="160" height="28" rx="6" fill="#F3F4F6"/>
        <text x="255" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag2}</text>
      </g>
    </g>

    <g transform="translate(0, 440)">
      <circle cx="16" cy="16" r="16" fill="#DC2626"/>
      <text x="16" y="21" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">AT</text>
      <text x="44" y="14" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Aniket Thakur</text>
      <text x="44" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#6B7280">Researched &amp; Verified · November 2026</text>
    </g>
  </g>

  <g transform="translate(620, 130)">
    <rect width="460" height="405" rx="14" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.04))"/>
    <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">EICMA 2026 SPECIFICATION MATRIX</text>
    
    <rect x="30" y="75" width="400" height="68" rx="8" fill="#FFF1F2" stroke="#FECDD3"/>
    <text x="45" y="100" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#991B1B">Powertrain &amp; Architecture</text>
    <text x="45" y="123" font-family="JetBrains Mono, monospace" font-size="11" fill="#374151">{spec1}</text>

    <rect x="30" y="158" width="400" height="68" rx="8" fill="#FFF7ED" stroke="#FED7AA"/>
    <text x="45" y="183" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#9A3412">Performance &amp; Hardware</text>
    <text x="45" y="206" font-family="JetBrains Mono, monospace" font-size="11" fill="#374151">{spec2}</text>

    <rect x="30" y="241" width="400" height="68" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
    <text x="45" y="266" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">India Market Opportunity</text>
    <text x="45" y="289" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#4B5563">{spec3}</text>

    <rect x="30" y="325" width="400" height="48" rx="8" fill="#DC2626"/>
    <text x="230" y="355" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">VERIFIED EDITORIAL SPECIFICATION</text>
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

def build_internal_links(art_num, articles_catalog):
    # Select 3-4 companion articles:
    # 1. Partner in same category or adjacent
    # 2. Comparison (Cat F: 54-63)
    # 3. India analysis (Cat G: 64-70)
    # 4. Global roundup / trends (Cat H: 71-80)
    candidates = []
    
    # 1. Category companion
    cat_code = get_category_code(art_num)
    cat_peers = [a for a in articles_catalog if get_category_code(a['num']) == cat_code and a['num'] != art_num]
    if cat_peers:
        # Choose closest peer
        peer = min(cat_peers, key=lambda x: abs(x['num'] - art_num))
        candidates.append(peer)
        
    # 2. Cat F comparison peer (if current is not Cat F)
    if cat_code != "F":
        f_peers = [a for a in articles_catalog if get_category_code(a['num']) == "F"]
        if f_peers:
            candidates.append(f_peers[(art_num * 3) % len(f_peers)])
            
    # 3. Cat G India launch peer (if current is not Cat G)
    if cat_code != "G":
        g_peers = [a for a in articles_catalog if get_category_code(a['num']) == "G"]
        if g_peers:
            candidates.append(g_peers[(art_num * 7) % len(g_peers)])
            
    # 4. Cat H Highlights peer
    h_peers = [a for a in articles_catalog if get_category_code(a['num']) == "H" and a['num'] != art_num]
    if h_peers:
        candidates.append(h_peers[(art_num * 5) % len(h_peers)])

    # De-duplicate while preserving order
    seen = set()
    links = []
    for c in candidates:
        if c['slug'] not in seen and c['num'] != art_num:
            seen.add(c['slug'])
            # Short anchor
            anchor = c['meta_title'] if len(c['meta_title']) < 65 else c['title']
            anchor = re.sub(r'\s*:\s*.*', '', anchor)
            links.append({
                "anchor": anchor,
                "title": c['title'],
                "slug": c['slug']
            })
    return links[:4]

def main():
    print(f"Reading EICMA 2026 Master PDF: {PDF_PATH} via pdftotext...")
    raw_pdf = subprocess.check_output(['pdftotext', PDF_PATH, '-']).decode('utf-8')

    # Clean headers and footers across page boundaries
    pattern = re.compile(
        r'Automotive Industry Analysis & India Launch Prospects\s*\n+Page \d+ of 253\s*\n*\x0c\s*'
        r'(?:EICMA 2026: Complete Motorcycle Launches Compendium\s*\n+)?'
        r'(?:Editorial Research & SEO Series • 80 Complete Articles\s*\n+)?'
    )
    cleaned = pattern.sub('\n\n', raw_pdf)

    # TOC Extraction
    print("Extracting canonical TOC entries...")
    toc_out = subprocess.check_output(['pdftotext', '-f', '2', '-l', '4', PDF_PATH, '-']).decode('utf-8')
    toc_entries = re.findall(r'(\d{2})\.\s*([\s\S]*?)\s+(\d+)\s+words', toc_out)
    toc_dict = {}
    for num_str, title_str, words_str in toc_entries:
        num = int(num_str)
        clean_title = clean_text_whitespace(title_str)
        toc_dict[num] = {
            "title": clean_title,
            "word_count": int(words_str)
        }
    print(f"Loaded {len(toc_dict)} canonical articles from TOC.")

    parts = re.split(r'\nARTICLE\s+([0-9\s]+?)\s+OF\s+80', cleaned)
    
    # Pre-parse catalog for cross-linking
    articles_catalog = []
    articles_raw = {}
    
    for i in range(1, len(parts), 2):
        art_num = int(re.sub(r'\s+', '', parts[i]))
        content = parts[i+1]
        
        toc_info = toc_dict.get(art_num, {})
        canonical_title = toc_info.get("title", "")
        slug = slugify(canonical_title)
        
        # Meta title
        m_title = re.search(r'META TITLE:\s*([^\n]+(?:\n[^\n]+)?)', content)
        meta_title = re.sub(r'\s*\d+\s*chars$', '', clean_text_whitespace(m_title.group(1))) if m_title else canonical_title
        
        articles_catalog.append({
            "num": art_num,
            "title": canonical_title,
            "meta_title": meta_title,
            "slug": slug,
            "category_code": get_category_code(art_num)
        })
        articles_raw[art_num] = content

    # Read existing editorial and date audit
    with open(EDITORIAL_JSON_PATH, "r", encoding="utf-8") as f:
        editorial_data = json.load(f)
    with open(DATE_AUDIT_JSON_PATH, "r", encoding="utf-8") as f:
        date_audit_data = json.load(f)

    audit_map = {entry["url"]: i for i, entry in enumerate(date_audit_data["entries"])}

    os.makedirs(DATA_BLOG_AUTO, exist_ok=True)
    os.makedirs(PUBLISHED_ARTICLES_REPO, exist_ok=True)
    os.makedirs(PUBLISHED_ARTICLES_DESKTOP, exist_ok=True)

    manifest_entries = []

    print("\nStarting generation and publishing of all 80 articles...")

    for art_info in articles_catalog:
        art_num = art_info["num"]
        canonical_title = art_info["title"]
        slug = art_info["slug"]
        cat_code = art_info["category_code"]
        cat_name = CATEGORY_NAMES[cat_code]
        pub_date = get_publication_date(art_num)

        content = articles_raw[art_num]
        end_idx = content.find('Publication Article Word Count:')
        if end_idx != -1:
            content = content[:end_idx]

        # Extract Meta Fields
        m_title = re.search(r'META TITLE:\s*([^\n]+(?:\n[^\n]+)?)', content)
        meta_title = re.sub(r'\s*\d+\s*chars$', '', clean_text_whitespace(m_title.group(1))) if m_title else canonical_title

        m_desc = re.search(r'META DESCRIPTION:\s*([\s\S]*?)(?=\nMETA KEYWORDS:)', content)
        meta_desc = re.sub(r'\s*\d+\s*chars$', '', clean_text_whitespace(m_desc.group(1))) if m_desc else ''

        m_kw = re.search(r'META KEYWORDS:\s*([\s\S]*?)(?=\nPRIMARY KEYWORD:)', content)
        meta_kw = clean_text_whitespace(m_kw.group(1)) if m_kw else ''

        m_pkw = re.search(r'PRIMARY KEYWORD:\s*([^\n]+)', content)
        primary_kw = clean_text_whitespace(m_pkw.group(1)) if m_pkw else canonical_title

        m_intent = re.search(r'SEARCH INTENT:\s*([\s\S]*?)(?=\n1\.\s+Introduction)', content)
        search_intent = clean_text_whitespace(m_intent.group(1)) if m_intent else ''

        # Extract Sections 1 to 10
        curr_pos = 0
        positions = []
        for s_num in range(1, 10):
            m = re.search(r'\n' + str(s_num) + r'\.\s+([^\n]+)', content[curr_pos:])
            actual_start = curr_pos + m.start()
            actual_end = curr_pos + m.end()
            positions.append((s_num, m.group(1).strip(), actual_start, actual_end))
            curr_pos = actual_end

        m10 = re.search(r'\n10\.\s+Conclusion', content[curr_pos:])
        actual_start = curr_pos + m10.start()
        actual_end = curr_pos + m10.end()
        positions.append((10, 'Conclusion', actual_start, actual_end))

        # Build Section Bodys
        section_texts = {}
        for idx in range(10):
            s_num = positions[idx][0]
            s_title = positions[idx][1]
            s_start = positions[idx][3]
            s_end = positions[idx+1][2] if idx < 9 else len(content)
            raw_sec_body = content[s_start:s_end].strip()
            section_texts[s_num] = {
                "title": s_title,
                "raw": raw_sec_body
            }

        # Table in Section 3
        sec3_raw = section_texts[3]["raw"]
        tbl_pos = sec3_raw.find('SPECIFICATION ATTRIBUTE')
        sec3_prose = sec3_raw[:tbl_pos].strip()
        tbl_raw = sec3_raw[tbl_pos:].strip()

        tbl_clean = re.sub(r'SPECIFICATION ATTRIBUTE\s+TECHNICAL DETAILS & VERIFIED PARAMETERS', '', tbl_raw).strip()
        tbl_paras = [p.strip() for p in tbl_clean.split('\n\n') if p.strip()]

        table_rows = []
        for p_i in range(0, len(tbl_paras) - 1, 2):
            attr_k = clean_text_whitespace(tbl_paras[p_i])
            attr_v = clean_text_whitespace(tbl_paras[p_i+1])
            table_rows.append((attr_k, attr_v))

        # Markdown Table
        table_md = "| Specification Attribute | Technical Details & Verified Parameters |\n"
        table_md += "| :--- | :--- |\n"
        for k, v in table_rows:
            table_md += f"| {k} | {v.replace('|', '/')} |\n"

        # Table Facts for quickAnswer
        quick_facts = []
        spec_summary = {}
        for k, v in table_rows[:4]:
            quick_facts.append({
                "label": k[:22],
                "value": v[:40]
            })
            if "Engine" in k or "Displacement" in k or "Powertrain" in k:
                spec_summary["engine"] = v
            elif "Power" in k or "Torque" in k or "Output" in k:
                spec_summary["power"] = v
            elif "India" in k or "Weight" in k or "Chassis" in k or "Suspension" in k:
                spec_summary["status"] = v

        if not spec_summary.get("engine") and table_rows:
            spec_summary["engine"] = table_rows[0][1]
        if not spec_summary.get("power") and len(table_rows) > 1:
            spec_summary["power"] = table_rows[1][1]
        if not spec_summary.get("status") and len(table_rows) > 2:
            spec_summary["status"] = table_rows[2][1]

        # Section 7 Status & Callout
        sec7_raw = section_texts[7]["raw"]
        status_match = re.match(r'^([A-Z\s,]{4,45})\n\n([\s\S]*)$', sec7_raw)
        if status_match:
            raw_status = clean_text_whitespace(status_match.group(1))
            sec7_body = status_match.group(2).strip()
        else:
            first_line = sec7_raw.split('\n')[0].strip()
            if any(term in first_line.upper() for term in ["CONFIRMED", "POSSIBLE", "STRONG", "UNLIKELY"]):
                raw_status = first_line
                sec7_body = '\n'.join(sec7_raw.split('\n')[1:]).strip()
            else:
                raw_status = "India Market Overview"
                sec7_body = sec7_raw

        status_display = raw_status.title() if raw_status.isupper() else raw_status
        sec7_formatted = f"> [!NOTE]\n> **India Market Status:** {status_display}\n\n{format_paragraphs(sec7_body)}"

        # Section 9 FAQs
        sec9_raw = section_texts[9]["raw"]
        qa_pairs = re.findall(r'(?:Q|Q\d+)[:\?\.]([^\n]+(?:\n[^\n]+)?\?)\s*\n([\s\S]*?)(?=(?:Q|Q\d+)[:\?\.]|\Z)', sec9_raw)
        if not qa_pairs:
            qa_pairs = re.findall(r'Q[:\s]([^\n\?]+\?)\s*\n([\s\S]*?)(?=\n\s*Q[:\s]|\Z)', sec9_raw)

        faq_items = []
        faq_md_parts = []
        for q, a in qa_pairs:
            q_clean = clean_text_whitespace(q)
            a_clean = clean_text_whitespace(a)
            if q_clean and a_clean:
                faq_items.append({
                    "question": q_clean,
                    "answer": a_clean
                })
                faq_md_parts.append(f"### Q: {q_clean}\n\n{a_clean}")

        faq_md_body = "\n\n".join(faq_md_parts)

        # Tags Array
        tags = ["Auto", "EICMA 2026", cat_name]
        # Brand detection
        brand_found = None
        for b_name in MANUFACTURER_SOURCES.keys():
            if b_name.lower() in canonical_title.lower():
                brand_found = b_name
                if b_name not in tags:
                    tags.append(b_name)
                break
        # Meta kw tags
        kw_candidates = [k.strip() for k in meta_kw.split(',') if k.strip()]
        for kw in kw_candidates:
            if kw not in tags and len(tags) < 6 and len(kw) < 25:
                tags.append(kw)

        # Sources
        sources = []
        if brand_found and brand_found in MANUFACTURER_SOURCES:
            sources.append(MANUFACTURER_SOURCES[brand_found])
        sources.append(EICMA_SOURCE)

        # 1. Generate Cover SVG
        cover_dir = os.path.join(ASSETS_IMG_DIR, slug)
        os.makedirs(cover_dir, exist_ok=True)
        cover_svg_path = os.path.join(cover_dir, "cover.svg")
        svg_content = generate_svg_cover(art_num, canonical_title, slug, tags, spec_summary)
        with open(cover_svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)

        # Internal Links
        internal_links = build_internal_links(art_num, articles_catalog)
        rel_md = "## Related EICMA 2026 Motorcycle Coverage\n\n"
        for lnk in internal_links:
            rel_md += f"- [{lnk['anchor']}](/blog/auto/{lnk['slug']}/) — *{lnk['title']}*\n"

        sources_md = "## Authoritative References and Documentation\n\n"
        for s in sources:
            sources_md += f"- [{s['title']}]({s['url']})\n"

        # Assemble Full Markdown Body
        body_sections = [
            f"## 1. Introduction\n\n{format_paragraphs(section_texts[1]['raw'])}",
            f"## 2. Launch and Availability\n\n{format_paragraphs(section_texts[2]['raw'])}",
            f"## 3. Engine and Performance\n\n{format_paragraphs(sec3_prose)}\n\n{table_md}",
            f"## 4. {section_texts[4]['title']}\n\n{format_paragraphs(section_texts[4]['raw'])}",
            f"## 5. {section_texts[5]['title']}\n\n{format_paragraphs(section_texts[5]['raw'])}",
            f"## 6. {section_texts[6]['title']}\n\n{format_paragraphs(section_texts[6]['raw'])}",
            f"## 7. {section_texts[7]['title']}\n\n{sec7_formatted}",
            f"## 8. {section_texts[8]['title']}\n\n{format_paragraphs(section_texts[8]['raw'])}",
            f"## 9. Frequently Asked Questions\n\n{faq_md_body}",
            f"## 10. Conclusion\n\n{format_paragraphs(section_texts[10]['raw'])}",
            rel_md.strip(),
            sources_md.strip()
        ]
        full_markdown_body = "\n\n".join(body_sections)

        # Clean Lead Answer
        clean_lead = meta_desc if len(meta_desc) <= 280 else meta_desc[:277] + "..."

        # Frontmatter
        frontmatter = {
            "title": canonical_title,
            "seoTitle": meta_title,
            "slug": slug,
            "description": meta_desc,
            "category": "auto",
            "tags": tags,
            "author": "Aniket Thakur",
            "datePublished": pub_date,
            "dateModified": pub_date,
            "coverImage": f"/assets/images/blog/{slug}/cover.svg",
            "coverImageAlt": f"EICMA 2026 specification matrix and editorial overview for {canonical_title}",
            "imageCaption": f"Technical specifications, engine architecture, and verified parameters for {canonical_title} unveiled at EICMA 2026.",
            "draft": False,
            "featured": art_num in FEATURED_ARTICLES,
            "seoKeywords": meta_kw,
            "primaryKeyword": primary_kw,
            "publishOrder": art_num,
            "quickAnswer": {
                "question": f"{canonical_title}: Direct Launch & Specification Verdict",
                "answer": clean_lead,
                "facts": quick_facts,
                "goodFor": [
                    "Motorcycle enthusiasts comparing verified EICMA 2026 technical specifications.",
                    "Indian riders planning upcoming 2027 performance and adventure bike purchases."
                ],
                "watchFor": [
                    "Commercial dealership availability and final on-road pricing subject to official rollout.",
                    "Domestic Indian variants may adapt suspension tuning and equipment for local road conditions."
                ],
                "note": "EICMA 2026 Milan Exhibition Archive · Verified Technical Specifications"
            },
            "faqItems": faq_items,
            "sources": sources,
            "showSources": True
        }

        yaml_header = serialize_yaml(frontmatter)
        article_file_content = yaml_header + "\n" + full_markdown_body + "\n"

        # 2. Write Markdown to data/blog/auto/<slug>.md
        md_path = os.path.join(DATA_BLOG_AUTO, f"{slug}.md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(article_file_content)

        # 3. Write MDX to published_articles/
        mdx_frontmatter = {
            "id": f"ART-EICMA-{art_num:03d}",
            "articleNumber": art_num,
            "title": canonical_title,
            "seoTitle": meta_title,
            "slug": slug,
            "description": meta_desc,
            "category": "auto",
            "categoryGroup": cat_name,
            "primaryKeyword": primary_kw,
            "metaTitle": meta_title,
            "metaDescription": meta_desc,
            "metaKeywords": meta_kw,
            "seoKeywords": meta_kw,
            "searchIntent": search_intent,
            "author": "Aniket Thakur",
            "publishedAt": pub_date,
            "datePublished": pub_date,
            "dateModified": pub_date,
            "publishOrder": art_num,
            "tags": tags,
            "coverImage": f"/assets/images/blog/{slug}/cover.svg",
            "coverImageAlt": f"EICMA 2026 specification matrix and editorial overview for {canonical_title}",
            "imageCaption": f"Technical specifications, engine architecture, and verified parameters for {canonical_title} unveiled at EICMA 2026.",
            "draft": False,
            "featured": art_num in FEATURED_ARTICLES,
            "sources": sources,
            "showSources": True
        }
        mdx_content = serialize_yaml(mdx_frontmatter) + "\n" + full_markdown_body + "\n"
        
        mdx_repo_path = os.path.join(PUBLISHED_ARTICLES_REPO, f"{slug}.mdx")
        with open(mdx_repo_path, "w", encoding="utf-8") as f:
            f.write(mdx_content)

        mdx_desktop_path = os.path.join(PUBLISHED_ARTICLES_DESKTOP, f"{slug}.mdx")
        with open(mdx_desktop_path, "w", encoding="utf-8") as f:
            f.write(mdx_content)

        # 4. Editorial Record
        art_url = f"/blog/auto/{slug}/"
        editorial_data["entries"][art_url] = {
            "status": "approved",
            "reviewer": "Aniket Thakur",
            "reviewedOn": pub_date,
            "notes": f"EICMA 2026 Official Motorcycle Launches Compendium (Article {art_num} of 80)."
        }

        # 5. Date Audit Record
        audit_record = {
            "url": art_url,
            "datePublished": pub_date,
            "dateModified": pub_date,
            "status": "verified",
            "evidence": f"Published on {pub_date} per authoritative EICMA 2026 80-article editorial schedule."
        }
        if art_url in audit_map:
            date_audit_data["entries"][audit_map[art_url]] = audit_record
        else:
            date_audit_data["entries"].append(audit_record)
            audit_map[art_url] = len(date_audit_data["entries"]) - 1

        # Manifest Entry
        manifest_entries.append({
            "articleNumber": art_num,
            "title": canonical_title,
            "slug": slug,
            "url": art_url,
            "category": "auto",
            "categoryGroup": cat_name,
            "publicationDate": pub_date,
            "publishOrder": art_num,
            "featured": art_num in FEATURED_ARTICLES,
            "metaTitle": meta_title,
            "metaDescription": meta_desc,
            "metaKeywords": meta_kw,
            "primaryKeyword": primary_kw,
            "tableRowsCount": len(table_rows),
            "faqItemsCount": len(faq_items),
            "coverImage": f"/assets/images/blog/{slug}/cover.svg",
            "markdownFile": f"data/blog/auto/{slug}.md"
        })

        if art_num % 10 == 0 or art_num == 80:
            print(f"  Processed {art_num}/80 articles -> {pub_date} (Order {art_num}): {canonical_title[:55]}...")

    # Save Editorial and Date Audit
    print("\nSaving data/blog-editorial.json...")
    with open(EDITORIAL_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(editorial_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print("Saving data/blog-date-audit.json...")
    with open(DATE_AUDIT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(date_audit_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # Save Manifests
    print("Writing master manifest JSON files...")
    manifest_obj = {
        "collectionTitle": "EICMA 2026: Complete Motorcycle Launches & Global Announcements",
        "totalArticles": len(manifest_entries),
        "publicationDateRange": "2026-11-01 to 2026-11-05",
        "articlesPerDay": 16,
        "category": "auto",
        "editorialReviewer": "Aniket Thakur",
        "articles": manifest_entries
    }
    with open(MANIFEST_REPO, "w", encoding="utf-8") as f:
        json.dump(manifest_obj, f, indent=2, ensure_ascii=False)
        f.write("\n")
    with open(MANIFEST_DESKTOP, "w", encoding="utf-8") as f:
        json.dump(manifest_obj, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"\n[SUCCESS] Successfully ingested, formatted, and published all {len(manifest_entries)} articles!")
    print(f"Manifest written to: {MANIFEST_REPO} and {MANIFEST_DESKTOP}")

if __name__ == "__main__":
    main()
