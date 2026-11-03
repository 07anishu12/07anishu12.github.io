# Canonicalization & Duplicate URL Audit Report

## Infrastructure Variation Test Matrix
| Variation | Requested URL | Initial Status | Final Destination | Canonical Status | Severity |
|---|---|---|---|---|---|
| Root vs index.html | `https://aniket.app/index.html` | 308 | `https://aniket.app/` | self-referential | PASS |
| HTTP vs HTTPS | `http://aniket.app/` | 308 | `https://aniket.app/` | self-referential | PASS |
| WWW vs Non-WWW | `https://www.aniket.app/` | SSL_ERR | `https://www.aniket.app/` | ssl-failure | P0 |
| Trailing slash on /about | `https://aniket.app/about` | 308 | `https://aniket.app/about/` | self-referential | PASS |
| Trailing slash on /projects | `https://aniket.app/projects` | 308 | `https://aniket.app/projects/` | self-referential | PASS |
| Trailing slash on /blog | `https://aniket.app/blog` | 308 | `https://aniket.app/blog/` | self-referential | PASS |
| Static .html on /about.html | `https://aniket.app/about.html` | 308 | `https://aniket.app/about/` | self-referential | PASS |
| Static .html on /work.html | `https://aniket.app/work.html` | 308 | `https://aniket.app/projects/` | self-referential | PASS |

## Summary Findings
- **Duplicate Homepage (/index.html):** PASS
- **WWW Domain Forwarding:** SSL Certificate Name Mismatch: The TLS certificate served by Vercel for www.aniket.app only contains SAN 'DNS:aniket.app'. It lacks 'www.aniket.app'. Any client or search crawler accessing https://www.aniket.app triggers ERR_CERT_COMMON_NAME_INVALID before HTTP redirects can execute.
- **Duplicate Titles:** 8 normalized title clusters
- **Inconsistent Canonicals:** 0 occurrences
