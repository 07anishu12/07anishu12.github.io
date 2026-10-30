#!/usr/bin/env python3
"""
================================================================================
India Cars 100-Article Master Content Library: CMS Publishing Automation Script
================================================================================
Automates publishing and scheduling of all 100 car-buying articles from the
master library to WordPress REST API or Ghost Admin API.

Features:
- Full extraction & transformation into 6 copy-ready CMS fields:
    1. Title
    2. Meta Title
    3. Meta Description
    4. Meta Keywords / Tags
    5. Main Body HTML (H1, AEO direct answer, H2/H3s, tables, bullet lists)
    6. FAQ accordion block with attached schema.org FAQPage JSON-LD
- Internal link anchor suggestions preserved and cross-linked via clean slugs
- Filtered editorial metadata (Buyer Mindsets, Search Queries, Demand Hypotheses,
  Competitor Gaps, and Appendices A-D excluded from publication)
- Randomized publishing schedule across Oct 10, 2026 – Oct 30, 2026 (21 days)
- Time windows between 08:15:00 and 20:45:00 IST (UTC+05:30)
- WordPress REST API (/wp-json/wp/v2/posts) support with Yoast & Rank Math SEO meta
- Ghost Admin API (/ghost/api/admin/posts/) support with pure-Python JWT authentication
================================================================================
"""

import sys
import os
import re
import json
import html
import random
import argparse
import base64
import hmac
import hashlib
import time
from datetime import date, timedelta, datetime
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

PAYLOAD_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "india_cars_100_articles_payload.json")
DOCX_FILE = "/Users/anny/Desktop/India_Cars_100_Articles_Master_Content_Library.docx"

# ---------------------------------------------------------------------------
# Ghost Admin API Pure-Python JWT Generator (No external dependencies)
# ---------------------------------------------------------------------------
def generate_ghost_token(admin_api_key: str) -> str:
    """Generate a short-lived HS256 JWT for Ghost Admin API."""
    try:
        key_id, secret = admin_api_key.split(":")
    except ValueError:
        raise ValueError("Ghost Admin API Key must be in format 'id:secret'")
    
    # 5-minute expiry
    iat = int(time.time())
    exp = iat + 5 * 60
    
    header = {"alg": "HS256", "typ": "JWT", "kid": key_id}
    payload = {"iat": iat, "exp": exp, "aud": "/admin/"}
    
    def b64url_encode(data_bytes: bytes) -> str:
        return base64.urlsafe_b64encode(data_bytes).decode("utf-8").rstrip("=")
    
    header_b64 = b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_b64 = b64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    unsigned_token = f"{header_b64}.{payload_b64}"
    
    secret_bytes = bytes.fromhex(secret)
    signature = hmac.new(secret_bytes, unsigned_token.encode("utf-8"), hashlib.sha256).digest()
    sig_b64 = b64url_encode(signature)
    
    return f"{unsigned_token}.{sig_b64}"


# ---------------------------------------------------------------------------
# WordPress REST API Publisher
# ---------------------------------------------------------------------------
def publish_to_wordpress(article: dict, wp_url: str, user: str, app_pass: str, status_override: str = None) -> dict:
    """Publish or schedule a single article via WordPress REST API."""
    url = f"{wp_url.rstrip('/')}/wp-json/wp/v2/posts"
    
    # Basic auth with application password
    creds = f"{user}:{app_pass}"
    auth_header = "Basic " + base64.b64encode(creds.encode("utf-8")).decode("utf-8")
    
    status = status_override or article["status"]
    
    post_data = {
        "title": article["title"],
        "slug": article["slug"],
        "content": article["content_html"],
        "excerpt": article["meta_description"],
        "date": article["publication_date"],
        "status": status,
        "meta": {
            # Yoast SEO fields
            "_yoast_wpseo_title": article["meta_title"],
            "_yoast_wpseo_metadesc": article["meta_description"],
            "_yoast_wpseo_focuskw": article["meta_keywords"].split(",")[0].strip() if article.get("meta_keywords") else "",
            # Rank Math SEO fields
            "rank_math_title": article["meta_title"],
            "rank_math_description": article["meta_description"],
            "rank_math_focus_keyword": article["meta_keywords"]
        }
    }
    
    data_bytes = json.dumps(post_data).encode("utf-8")
    req = Request(url, data=data_bytes, headers={
        "Content-Type": "application/json",
        "Authorization": auth_header,
        "User-Agent": "AntigravityCMSPublishBot/1.0"
    })
    
    with urlopen(req, timeout=30) as response:
        resp_body = response.read().decode("utf-8")
        return json.loads(resp_body)


# ---------------------------------------------------------------------------
# Ghost Admin API Publisher
# ---------------------------------------------------------------------------
def publish_to_ghost(article: dict, ghost_url: str, admin_key: str, status_override: str = None) -> dict:
    """Publish or schedule a single article via Ghost Admin API."""
    token = generate_ghost_token(admin_key)
    url = f"{ghost_url.rstrip('/')}/ghost/api/admin/posts/?source=html"
    
    status = status_override or article["status"]
    ghost_status = "scheduled" if status == "future" else status
    
    tags = [tag.strip() for tag in article.get("meta_keywords", "").split(",") if tag.strip()]
    
    post_data = {
        "posts": [{
            "title": article["title"],
            "slug": article["slug"],
            "html": article["content_html"],
            "custom_excerpt": article["meta_description"],
            "meta_title": article["meta_title"],
            "meta_description": article["meta_description"],
            "published_at": article["publication_date"],
            "status": ghost_status,
            "tags": [{"name": t} for t in tags[:5]]
        }]
    }
    
    data_bytes = json.dumps(post_data).encode("utf-8")
    req = Request(url, data=data_bytes, headers={
        "Content-Type": "application/json",
        "Authorization": f"Ghost {token}",
        "User-Agent": "AntigravityCMSPublishBot/1.0"
    })
    
    with urlopen(req, timeout=30) as response:
        resp_body = response.read().decode("utf-8")
        return json.loads(resp_body)


# ---------------------------------------------------------------------------
# Payload Loader & Validator
# ---------------------------------------------------------------------------
def load_payload(json_path: str = PAYLOAD_FILE) -> list:
    """Load and validate the 100-article payload."""
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"Payload file not found at: {json_path}")
    
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    if len(data) != 100:
        print(f"[WARNING] Expected 100 articles, found {len(data)} in payload.")
    return data


# ---------------------------------------------------------------------------
# Main CLI Execution
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        description="India Cars 100-Article Content Library: Automated CMS Publisher"
    )
    parser.add_argument("--cms", choices=["dry-run", "wordpress", "ghost"], default="dry-run",
                        help="CMS target or dry-run validation mode (default: dry-run)")
    parser.add_argument("--json", default=PAYLOAD_FILE,
                        help="Path to the pre-generated 100-article JSON payload")
    parser.add_argument("--article", type=int, default=None,
                        help="Publish only a single article number (1 to 100)")
    parser.add_argument("--from", dest="from_art", type=int, default=1,
                        help="Starting article number (1 to 100)")
    parser.add_argument("--to", dest="to_art", type=int, default=100,
                        help="Ending article number (1 to 100)")
    parser.add_argument("--status", choices=["publish", "future", "draft"], default=None,
                        help="Force all articles to this publication status")
    
    # WordPress options
    parser.add_argument("--wp-url", default=os.getenv("WP_URL"),
                        help="WordPress site root URL (e.g. https://example.com)")
    parser.add_argument("--wp-user", default=os.getenv("WP_USER"),
                        help="WordPress username")
    parser.add_argument("--wp-app-pass", default=os.getenv("WP_APP_PASSWORD"),
                        help="WordPress Application Password")
    
    # Ghost options
    parser.add_argument("--ghost-url", default=os.getenv("GHOST_URL"),
                        help="Ghost Admin URL (e.g. https://example.ghost.io)")
    parser.add_argument("--ghost-admin-key", default=os.getenv("GHOST_ADMIN_KEY"),
                        help="Ghost Admin API key (id:secret)")
    
    args = parser.parse_args()
    
    payload = load_payload(args.json)
    
    # Filter selection
    if args.article is not None:
        selected = [art for art in payload if art["article_number"] == args.article]
        if not selected:
            print(f"[ERROR] Article {args.article} not found in payload.")
            sys.exit(1)
    else:
        selected = [art for art in payload if args.from_art <= art["article_number"] <= args.to_art]
    
    print("=" * 80)
    print(" INDIA CARS 100-ARTICLE CMS PUBLISHING AUTOMATION")
    print("=" * 80)
    print(f"Target CMS Mode   : {args.cms.upper()}")
    print(f"Articles Selected : {len(selected)} (Range: {selected[0]['article_number']} to {selected[-1]['article_number']})")
    print(f"Payload Source    : {args.json}")
    print("=" * 80)
    
    # DRY-RUN MODE
    if args.cms == "dry-run":
        print("\n[INFO] Running Pre-Flight Validation / Dry-Run Manifest:")
        date_counts = {}
        for art in selected:
            d_str = art["publication_date"][:10]
            date_counts[d_str] = date_counts.get(d_str, 0) + 1
            
        print(f"\nPublication Calendar Breakdown ({len(date_counts)} dates):")
        for d in sorted(date_counts.keys()):
            arts_on_day = [a for a in selected if a["publication_date"].startswith(d)]
            times = ", ".join(a["publication_date"][11:19] for a in arts_on_day)
            print(f"  📅 {d} ({date_counts[d]} posts): {times}")
            
        print("\nSample Post Manifest (Article 1):")
        a1 = selected[0]
        print(f"  Article #        : {a1['article_number']}")
        print(f"  Title            : {a1['title']}")
        print(f"  Slug             : {a1['slug']}")
        print(f"  Publication Date : {a1['publication_date']}")
        print(f"  Status           : {a1['status']}")
        print(f"  SEO Meta Title   : {a1['meta_title']}")
        print(f"  SEO Meta Desc    : {a1['meta_description'][:80]}...")
        print(f"  Meta Keywords    : {a1['meta_keywords']}")
        print(f"  FAQs Extracted   : {len(a1['faqs'])} Q&As")
        print(f"  Internal Links   : {len(a1['internal_links'])} linked guides")
        print(f"  Body HTML Length : {len(a1['content_html'])} characters")
        print("\n[SUCCESS] Dry-run passed. To publish live, run with --cms wordpress or --cms ghost.")
        return

    # WORDPRESS MODE
    elif args.cms == "wordpress":
        if not (args.wp_url and args.wp_user and args.wp_app_pass):
            print("[ERROR] WordPress requires --wp-url, --wp-user, and --wp-app-pass.")
            sys.exit(1)
        
        print(f"[INFO] Publishing to WordPress: {args.wp_url}")
        success_count = 0
        for i, art in enumerate(selected, 1):
            num = art["article_number"]
            title = art["title"]
            pub_date = art["publication_date"]
            status = args.status or art["status"]
            print(f"[{i}/{len(selected)}] Article {num}: '{title[:45]}...' -> {pub_date} ({status})...", end=" ", flush=True)
            try:
                res = publish_to_wordpress(art, args.wp_url, args.wp_user, args.wp_app_pass, args.status)
                post_id = res.get("id", "Unknown")
                print(f"[OK: ID #{post_id}]")
                success_count += 1
            except HTTPError as e:
                err_content = e.read().decode("utf-8")
                print(f"[FAILED: HTTP {e.code}] {err_content[:100]}")
            except Exception as e:
                print(f"[FAILED: {e}]")
            time.sleep(0.5) # Gentle rate-limit
            
        print(f"\n[SUMMARY] Successfully published/scheduled {success_count} of {len(selected)} posts to WordPress.")

    # GHOST MODE
    elif args.cms == "ghost":
        if not (args.ghost_url and args.ghost_admin_key):
            print("[ERROR] Ghost requires --ghost-url and --ghost-admin-key.")
            sys.exit(1)
            
        print(f"[INFO] Publishing to Ghost: {args.ghost_url}")
        success_count = 0
        for i, art in enumerate(selected, 1):
            num = art["article_number"]
            title = art["title"]
            pub_date = art["publication_date"]
            status = args.status or art["status"]
            print(f"[{i}/{len(selected)}] Article {num}: '{title[:45]}...' -> {pub_date} ({status})...", end=" ", flush=True)
            try:
                res = publish_to_ghost(art, args.ghost_url, args.ghost_admin_key, args.status)
                post_id = res.get("posts", [{}])[0].get("id", "Unknown")
                print(f"[OK: ID #{post_id}]")
                success_count += 1
            except HTTPError as e:
                err_content = e.read().decode("utf-8")
                print(f"[FAILED: HTTP {e.code}] {err_content[:100]}")
            except Exception as e:
                print(f"[FAILED: {e}]")
            time.sleep(0.5)
            
        print(f"\n[SUMMARY] Successfully published/scheduled {success_count} of {len(selected)} posts to Ghost.")


if __name__ == "__main__":
    main()
