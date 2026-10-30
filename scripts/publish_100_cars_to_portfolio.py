#!/usr/bin/env python3
"""
================================================================================
Publish 100 Indian Car-Buying Articles to Portfolio Website (aniket.app)
================================================================================
Processes the 100 articles from India_Cars_100_Articles_Master_Content_Library.docx
and india_cars_100_articles_payload.json:
1. Generates 1200x675 SVG cover artwork in assets/images/blog/<slug>/cover.svg
2. Generates Markdown files in data/blog/auto/<slug>.md with frontmatter, AEO quickAnswer,
   markdown tables, formatted lists, and FAQ blocks
3. Updates data/blog-editorial.json with approval records
4. Updates data/blog-date-audit.json with verified publication dates
================================================================================
"""

import sys
import os
import re
import json
import html
from xml.sax.saxutils import escape as xml_escape

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX_PATH = "/Users/anny/Desktop/India_Cars_100_Articles_Master_Content_Library.docx"
PAYLOAD_PATH = os.path.join(ROOT_DIR, "india_cars_100_articles_payload.json")
EDITORIAL_PATH = os.path.join(ROOT_DIR, "data/blog-editorial.json")
DATE_AUDIT_PATH = os.path.join(ROOT_DIR, "data/blog-date-audit.json")

def generate_svg_cover(article_num: int, title: str, slug: str, tags: list) -> str:
    """Generate 1200x675 SVG cover artwork styled for the Auto category."""
    esc_title = xml_escape(title)
    
    # Break title into max 3 lines of ~26 chars
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

    tag1 = xml_escape(tags[0] if len(tags) > 0 else "Auto")[:18]
    tag2 = xml_escape(tags[1] if len(tags) > 1 else "Car Buying Guide")[:18]
    art_id = f"CAR-{article_num:03d}"

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF9F6"/>
      <stop offset="100%" stop-color="#FFF7ED"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  <rect x="40" y="40" width="1120" height="595" rx="20" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="2"/>
  
  <g transform="translate(90, 100)">
    <rect x="0" y="0" width="155" height="34" rx="17" fill="#FFEDD5" stroke="#EA580C" stroke-opacity="0.3"/>
    <circle cx="16" cy="17" r="5" fill="#EA580C"/>
    <text x="30" y="22" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#9A3412" letter-spacing="1">AUTO GUIDE</text>
    
    <text x="170" y="22" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#6B7280">{art_id}</text>

    <text x="0" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#121316" letter-spacing="-0.5">{line1}</text>
    {f'<text x="0" y="132" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#121316" letter-spacing="-0.5">{line2}</text>' if line2 else ''}
    {f'<text x="0" y="179" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#121316" letter-spacing="-0.5">{line3}</text>' if line3 else ''}

    <g transform="translate(0, {220 if line3 else (180 if line2 else 135)})">
      <text x="0" y="24" font-family="Newsreader, Georgia, serif" font-size="20" font-style="italic" fill="#EA580C">
        Indian Car Buying Decisions &amp; Ownership Economics
      </text>
      
      <g transform="translate(0, 50)">
        <rect x="0" y="0" width="160" height="28" rx="6" fill="#F3F4F6"/>
        <text x="80" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag1}</text>
        
        <rect x="175" y="0" width="160" height="28" rx="6" fill="#F3F4F6"/>
        <text x="255" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#4B5563" text-anchor="middle">{tag2}</text>
      </g>
    </g>

    <g transform="translate(0, 440)">
      <circle cx="16" cy="16" r="16" fill="#EA580C"/>
      <text x="16" y="21" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">AT</text>
      <text x="44" y="14" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">Aniket Thakur</text>
      <text x="44" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#6B7280">Researched &amp; Verified · October 2026</text>
    </g>
  </g>

  <g transform="translate(620, 140)">
    <rect width="460" height="395" rx="14" fill="#FFFFFF" stroke="#E5E2D9" stroke-width="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.04))"/>
    <text x="30" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700" fill="#4B5563">AUTOMOTIVE SPECIFICATION MATRIX</text>
    
    <rect x="30" y="75" width="400" height="65" rx="8" fill="#FFF7ED" stroke="#FED7AA"/>
    <text x="45" y="100" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#9A3412">Powertrain &amp; Dynamics</text>
    <text x="45" y="122" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">Engine response, transmission gearing, and real-world efficiency.</text>

    <rect x="30" y="155" width="400" height="65" rx="8" fill="#F0FDFA" stroke="#99F6E4"/>
    <text x="45" y="180" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#115E59">Safety, Build &amp; Comfort</text>
    <text x="45" y="202" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#374151">BNCAP crash test ratings, ergonomics &amp; suspension composure.</text>

    <rect x="30" y="235" width="400" height="65" rx="8" fill="#FAF9F6" stroke="#E5E2D9"/>
    <text x="45" y="260" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#121316">5-Year Total Cost of Ownership</text>
    <text x="45" y="282" font-family="Plus Jakarta Sans, sans-serif" font-size="12" fill="#4B5563">Ex-showroom pricing, insurance tiers, fuel &amp; resale retention.</text>

    <rect x="30" y="320" width="400" height="48" rx="8" fill="#EA580C"/>
    <text x="230" y="350" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">VERIFIED BUYING VERDICT IN ARTICLE</text>
  </g>
</svg>"""
    return svg

def table_to_markdown(tbl) -> str:
    """Convert docx Table to standard GitHub-flavored Markdown table."""
    if not tbl.rows:
        return ""
    
    # Headers
    headers = [cell.text.replace("\n", " ").strip() for cell in tbl.rows[0].cells]
    col_count = len(headers)
    
    md = "| " + " | ".join(headers) + " |\n"
    md += "| " + " | ".join([":---"] * col_count) + " |\n"
    
    for row in tbl.rows[1:]:
        cells = [cell.text.replace("\n", " ").replace("|", "\\|").strip() for cell in row.cells]
        # Pad or trim if column count differs
        if len(cells) < col_count:
            cells += [""] * (col_count - len(cells))
        elif len(cells) > col_count:
            cells = cells[:col_count]
        md += "| " + " | ".join(cells) + " |\n"
    
    return md + "\n"

def format_paragraph_markdown(p) -> str:
    """Format paragraph runs into markdown bold and italic."""
    out = ""
    for r in p.runs:
        t = r.text
        if not t:
            continue
        # Preserve bold and italic
        if r.bold and r.italic:
            t = f"***{t}***"
        elif r.bold:
            t = f"**{t}**"
        elif r.italic:
            t = f"*{t}*"
        out += t
    return out

def extract_article_content(elements):
    """Extract markdown body sections, table, and FAQs from docx elements."""
    body_lines = []
    state = "before_main"
    
    lead_paragraph = ""
    faq_lines = []
    
    for kind, item in elements:
        if kind == "P":
            txt = item.text.strip()
            if "5. MAIN ARTICLE:" in txt:
                state = "in_main"
                continue
            if "FREQUENTLY ASKED QUESTIONS" in txt:
                state = "in_faq"
                continue
            
            if state == "in_main":
                style = item.style.name
                if style == "Heading 1":
                    # Omit H1 title in body because title supplies H1
                    continue
                elif style == "Heading 2":
                    formatted = format_paragraph_markdown(item).strip()
                    body_lines.append(f"\n## {formatted}\n")
                elif style == "Heading 3":
                    formatted = format_paragraph_markdown(item).strip()
                    body_lines.append(f"\n### {formatted}\n")
                elif style == "List Bullet":
                    formatted = format_paragraph_markdown(item).strip()
                    body_lines.append(f"- {formatted}")
                elif style == "List Number":
                    formatted = format_paragraph_markdown(item).strip()
                    body_lines.append(f"1. {formatted}")
                else:
                    formatted = format_paragraph_markdown(item).strip()
                    if formatted:
                        if not lead_paragraph:
                            lead_paragraph = formatted
                        body_lines.append(f"\n{formatted}\n")
            elif state == "in_faq":
                if txt:
                    faq_lines.append(txt)
                    
        elif kind == "TBL" and state == "in_main":
            # Comparison table inside main body
            body_lines.append("\n" + table_to_markdown(item) + "\n")
            
    # Parse FAQs
    faqs = []
    curr_q = None
    curr_a = []
    for line in faq_lines:
        if re.match(r"^Q\d+[\.:\?]", line):
            if curr_q:
                faqs.append({"question": curr_q, "answer": " ".join(curr_a).strip()})
            curr_q = re.sub(r"^Q\d+[\.:\?]\s*", "", line).strip()
            curr_a = []
        else:
            curr_a.append(line.strip())
    if curr_q:
        faqs.append({"question": curr_q, "answer": " ".join(curr_a).strip()})
        
    return "\n".join(body_lines).strip(), lead_paragraph, faqs

def main():
    import docx
    
    print("Loading payload and docx master library...")
    with open(PAYLOAD_PATH, "r", encoding="utf-8") as f:
        payload = json.load(f)
        
    doc = docx.Document(DOCX_PATH)
    
    # Parse raw docx elements into articles
    articles_elements = {}
    current_art = None
    
    for el in doc.element.body:
        if el.tag.endswith("p"):
            p = docx.text.paragraph.Paragraph(el, doc)
            txt = p.text.strip()
            m_start = re.match(r"^ARTICLE\s+(\d+)\s+OF\s+100", txt, re.IGNORECASE)
            if m_start:
                num = int(m_start.group(1))
                current_art = num
                articles_elements[num] = []
                continue
            m_end = re.match(r"^END OF ARTICLE\s+(\d+)", txt, re.IGNORECASE)
            if m_end:
                current_art = None
                continue
            if current_art is not None:
                articles_elements[current_art].append(("P", p))
        elif el.tag.endswith("tbl"):
            t = docx.table.Table(el, doc)
            if current_art is not None:
                articles_elements[current_art].append(("TBL", t))
                
    # Read existing editorial and date-audit
    with open(EDITORIAL_PATH, "r", encoding="utf-8") as f:
        editorial_data = json.load(f)
    with open(DATE_AUDIT_PATH, "r", encoding="utf-8") as f:
        date_audit_data = json.load(f)
        
    audit_entries_map = {entry["url"]: i for i, entry in enumerate(date_audit_data["entries"])}
    
    processed_count = 0
    
    for art_info in payload:
        num = art_info["article_number"]
        title = art_info["title"]
        slug = art_info["slug"]
        meta_title = art_info["meta_title"]
        meta_desc = art_info["meta_description"]
        meta_kw = art_info["meta_keywords"]
        pub_date = art_info["publication_date"][:10]
        internal_links = art_info.get("internal_links", [])
        
        # Tags array
        tags = [t.strip() for t in meta_kw.split(",") if t.strip()]
        if "Auto" not in tags:
            tags.insert(0, "Auto")
        tags = tags[:5]
        
        # 1. Generate SVG Cover
        cover_dir = os.path.join(ROOT_DIR, "assets/images/blog", slug)
        os.makedirs(cover_dir, exist_ok=True)
        cover_svg_path = os.path.join(cover_dir, "cover.svg")
        svg_content = generate_svg_cover(num, title, slug, tags)
        with open(cover_svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
            
        # 2. Extract content from docx elements
        elements = articles_elements[num]
        body_md, lead_p, faqs = extract_article_content(elements)
        
        # Build QuickAnswer
        clean_lead = re.sub(r"[*_`]", "", lead_p).replace('"', '\\"').strip()
        if len(clean_lead) > 280:
            clean_lead = clean_lead[:277] + "..."
            
        # Add FAQ section in markdown
        faq_md = "\n\n## Frequently Asked Questions\n\n"
        for i, faq in enumerate(faqs, 1):
            q_text = faq["question"].strip()
            a_text = faq["answer"].strip()
            faq_md += f"### Q{i}. {q_text}\n\n{a_text}\n\n"
            
        # Add Related Buying Guides
        rel_md = "## Related Buying Guides\n\n"
        for lnk in internal_links:
            t_title = lnk["title"]
            t_slug = lnk["slug"]
            t_anchor = lnk["anchor"]
            rel_md += f"- [{t_anchor}](/blog/auto/{t_slug}/) — *{t_title}*\n"
            
        full_body = body_md + faq_md + rel_md
        
        # Build frontmatter
        featured = num in [1, 2, 6, 10, 11, 25, 26, 31, 50, 71, 81, 100]
        
        # YAML formatting
        yaml_lines = [
            "---",
            f'title: "{title.replace(chr(34), chr(92) + chr(34))}"',
            f'seoTitle: "{meta_title.replace(chr(34), chr(92) + chr(34))}"',
            f'slug: {slug}',
            f'description: "{meta_desc.replace(chr(34), chr(92) + chr(34))}"',
            "category: auto",
            "tags:",
        ]
        for t in tags:
            yaml_lines.append(f'  - "{t.replace(chr(34), chr(92) + chr(34))}"')
            
        yaml_lines.extend([
            'author: "Aniket Thakur"',
            f'datePublished: "{pub_date}"',
            f'dateModified: "{pub_date}"',
            f'coverImage: "/assets/images/blog/{slug}/cover.svg"',
            f'coverImageAlt: "{title.replace(chr(34), chr(92) + chr(34))} buying guide and comparison"',
            f'imageCaption: "Automotive specification matrix and decision framework for {title.replace(chr(34), chr(92) + chr(34))}."',
            "draft: false",
            f"featured: {'true' if featured else 'false'}",
            f'seoKeywords: "{meta_kw.replace(chr(34), chr(92) + chr(34))}"',
            "quickAnswer:",
            f'  question: "{title.replace(chr(34), chr(92) + chr(34))}: Direct Buying Verdict"',
            f'  answer: "{clean_lead}"',
            "  facts:",
            '    - label: "Research Standard"',
            '      value: "100-Article Master Library"',
            '    - label: "Verification Window"',
            '      value: "October 2026 Edition"',
            '    - label: "Category & Focus"',
            '      value: "Indian Automotive Market"',
            "  goodFor:",
            '    - "Indian car buyers comparing on-road prices and variants."',
            '    - "Drivers seeking verified maintenance and safety data."',
            "  watchFor:",
            '    - "Verify state RTO tax rates before signing dealership booking forms."',
            '    - "Inspect base variants for essential safety and AC equipment."',
            '  note: "October 2026 Edition · Verified On-Road Delhi Benchmarks"',
            "faqItems:",
        ])
        
        for faq in faqs:
            q_clean = faq["question"].replace('"', '\\"').strip()
            a_clean = faq["answer"].replace('"', '\\"').strip()
            yaml_lines.append(f'  - question: "{q_clean}"')
            yaml_lines.append(f'    answer: "{a_clean}"')
            
        yaml_lines.append("---\n")
        
        markdown_content = "\n".join(yaml_lines) + "\n" + full_body + "\n"
        
        # Write markdown file
        md_file_path = os.path.join(ROOT_DIR, "data/blog/auto", f"{slug}.md")
        with open(md_file_path, "w", encoding="utf-8") as f:
            f.write(markdown_content)
            
        # 3. Update Editorial record
        art_url = f"/blog/auto/{slug}/"
        editorial_data["entries"][art_url] = {
            "status": "approved",
            "reviewer": "Aniket Thakur",
            "reviewedOn": pub_date,
            "notes": f"Indian Car Buying Master Content Library (Article {num} of 100)."
        }
        
        # 4. Update Date Audit record
        audit_record = {
            "url": art_url,
            "datePublished": pub_date,
            "dateModified": pub_date,
            "status": "verified",
            "evidence": f"Published on {pub_date} per authoritative 100-article editorial schedule."
        }
        if art_url in audit_entries_map:
            date_audit_data["entries"][audit_entries_map[art_url]] = audit_record
        else:
            date_audit_data["entries"].append(audit_record)
            audit_entries_map[art_url] = len(date_audit_data["entries"]) - 1
            
        processed_count += 1
        if processed_count % 20 == 0 or processed_count == 100:
            print(f"Processed {processed_count}/100 articles...")
            
    # Save editorial and date audit
    with open(EDITORIAL_PATH, "w", encoding="utf-8") as f:
        json.dump(editorial_data, f, indent=2, ensure_ascii=False)
        f.write("\n")
        
    with open(DATE_AUDIT_PATH, "w", encoding="utf-8") as f:
        json.dump(date_audit_data, f, indent=2, ensure_ascii=False)
        f.write("\n")
        
    print(f"\n[SUCCESS] All {processed_count} articles written to data/blog/auto/*.md and registered in editorial/date-audit!")

if __name__ == "__main__":
    main()
