# Aniket Thakur · Applied AI Engineer & Associate Product Manager

[![Live site](https://img.shields.io/badge/live%20site-07anishu12.github.io-FF2B1F?style=flat-square)](https://07anishu12.github.io) [![License: MIT](https://img.shields.io/badge/license-MIT-F4F1EA?style=flat-square)](LICENSE)

> **Applied AI engineer who ships product — and a PM who can actually build the model.**

![Ember Noir portfolio art direction preview](assets/img/aniket-portrait.png)

## About

This is the personal portfolio of **Aniket Thakur**, based in New Delhi, India. It is designed around the overlap of **AI × Finance × Product**: LLM systems, research, lending journeys, and the product ownership needed to make technical work useful.

Aniket works as an Associate Product Manager at Drivio Technologies, previously worked as a Business Analyst there, researched GNNs and multi-LLM pipelines at OIST in Japan, and began his consulting and analytics work at Analy Assist. His education includes an M.Sc. Financial Engineering at WorldQuant University and a B.Sc. Data Analytics from DSEU Shakarpur-2, where he graduated with a 3.82/4.0 GPA and Rank 2.

## Live site

**[07anishu12.github.io](https://07anishu12.github.io)**

The repository is structured for GitHub Pages at the root. The live badge above is the intended deployment URL; after publishing, verify the URL, navigation, résumé download, form endpoint, and metadata before sharing it.

## What is inside

- **Home** — fast recruiter context, proof points, skills, selected projects, and experience snapshot.
- **About** — the New Delhi → OIST Japan → Drivio story, the AI × Finance × Product triad, education, and AI media pipeline.
- **Work** — four roles, eight projects, and three architecture-led case studies.
- **Learnings** — filterable cards powered by `data/learnings.json`.
- **Contact** — direct email, phone, résumé download, social links, and a Formspree-ready contact form.

## Tech stack

- Semantic HTML5 across five static pages
- Custom CSS with the **Ember Noir** visual system: near-black, ember red, bone white, mono labels, blueprint grid, and CSS-generated project covers
- Vanilla JavaScript for mobile navigation, reveal-on-scroll, portrait parallax, learning filters, JSON loading, and the contact-form fallback
- No build step, framework, or runtime dependency
- GitHub Pages-ready with `.nojekyll`, `sitemap.xml`, and `robots.txt`

## Folder structure

```text
07anishu12.github.io/
├── index.html
├── about.html
├── work.html
├── learnings.html
├── contact.html
├── assets/
│   ├── Aniket_Thakur_Resume.pdf
│   ├── css/style.css
│   ├── js/main.js
│   └── img/aniket-portrait.png
├── data/learnings.json
├── sitemap.xml
├── robots.txt
├── README.md
├── LICENSE
└── .nojekyll
```

`aniket-portrait.png` is currently a lightweight styled **AT monogram placeholder** because the supplied portrait was not present in the source folder. Replace that file with Aniket's real portrait when available; the page wiring and absolute Open Graph image path are already in place.

## How I built this

1. Started with a static, relative-link architecture so the site works on GitHub Pages and when `index.html` is opened directly.
2. Built a shared navigation and footer language across five pages, with different content lengths and rhythms for landing, story, proof, voice, and contact.
3. Kept the visual system sharp and editorial: no rounded cards, no stock imagery, CSS-generated abstract project art, faint blueprint lines, film grain, and ember accents.
4. Made learnings content data-driven. The page first renders an inline fallback for `file://` usage, then loads `data/learnings.json` when the browser permits it.
5. Added semantic landmarks, one H1 per page, descriptive image alt text, visible keyboard focus, a skip link, contrast-conscious colors, and `prefers-reduced-motion` handling.

## Before launch

### Replace real content placeholders

- **Learnings:** `data/learnings.json` contains three clearly marked `TODO` entries. Paste 3–5 of Aniket's best LinkedIn post texts/links into that file. Use the existing fields (`title`, `date`, `tag`, `excerpt`, `link`, optional `todo`) and the cards will render without code changes. There is also a matching TODO code comment in `learnings.html`.
- **Contact form:** replace the empty `action` on the form in `contact.html` with the real Formspree endpoint. The current JavaScript fallback tells visitors to email directly rather than pretending an unconfigured submission succeeded.
- **Portrait:** replace `assets/img/aniket-portrait.png` with the supplied portrait and keep it at or below 300 KB.

### GitHub Pages deployment

Create a public repository named exactly `07anishu12.github.io`, then from this folder run:

```bash
git init
git add .
git commit -m "Portfolio v1"
git branch -M main
git remote add origin https://github.com/07anishu12/07anishu12.github.io.git
git push -u origin main
```

In **Repository → Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages should publish at `https://07anishu12.github.io`.

For a custom domain, add a `CNAME` file containing the domain and point the domain's DNS A records to GitHub Pages' current IP addresses. Re-test the canonical and Open Graph URLs after configuring it.

## Contact

- Email: [kumaraniketn@gmail.com](mailto:kumaraniketn@gmail.com)
- Phone: [+91-8448769791](tel:+918448769791)
- GitHub: [github.com/07anishu12](https://github.com/07anishu12)
- LinkedIn: [aniket-thakur-a23a9b372](https://www.linkedin.com/in/aniket-thakur-a23a9b372)
- X: [@07anni04](https://x.com/07anni04)

## 10-point launch checklist

- [ ] Replace the AT monogram placeholder with `aniket-portrait.png` and confirm it is ≤300 KB.
- [ ] Add 3–5 real LinkedIn/X learnings to `data/learnings.json`.
- [ ] Add the real Formspree endpoint to `contact.html` and submit a test message.
- [ ] Initialize the exact `07anishu12.github.io` public repository and push `main`.
- [ ] Enable GitHub Pages from `main` / root and wait for the first build.
- [ ] Open the live site on a phone and desktop.
- [ ] Click every nav link, project anchor, social link, résumé link, and mail link.
- [ ] View source and confirm canonical, Open Graph, Twitter, JSON-LD, and one-H1-per-page output.
- [ ] Run Google PageSpeed and fix any issues introduced by the final portrait or deployment.
- [ ] Share the live URL only after the form, résumé download, metadata, and responsive layout are verified.

## License

MIT. See [LICENSE](LICENSE).
