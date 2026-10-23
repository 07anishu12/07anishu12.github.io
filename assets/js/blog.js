(() => {
  'use strict';
  const share = document.querySelector('[data-share="copy"]');
  share?.addEventListener('click', async () => {
    const status = document.querySelector('[data-share-status]');
    try { await navigator.clipboard.writeText(share.dataset.url); status.textContent = 'Link copied.'; }
    catch { status.textContent = `Copy this link: ${share.dataset.url}`; }
  });
  // Code block copy functionality
  document.querySelectorAll('.blog-code').forEach(block => {
    const pre = block.querySelector('pre');
    const label = block.querySelector('.blog-code-label');
    if (!pre || !label) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'blog-code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent.trim());
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Error';
      }
    });
    label.append(btn);
  });

  // Reading progress indicator
  const progressBar = document.getElementById('reading-progress');
  const articleEl = document.querySelector('.blog-article');
  if (progressBar && articleEl) {
    const updateProgress = () => {
      const rect = articleEl.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        progressBar.style.width = '0%';
        return;
      }
      const scrolled = -rect.top;
      const progress = Math.min(100, Math.max(0, (scrolled / scrollable) * 100));
      progressBar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  // Dynamic Mermaid diagram visualizer for technical architecture & workflows
  const mermaids = document.querySelectorAll('.mermaid');
  if (mermaids.length) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
    s.defer = true;
    s.onload = () => {
      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
          themeVariables: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            primaryColor: '#F8FAFC',
            primaryTextColor: '#0F172A',
            primaryBorderColor: '#CBD5E1',
            lineColor: '#64748B',
            secondaryColor: '#EFF6FF',
            secondaryTextColor: '#1E40AF',
            secondaryBorderColor: '#BFDBFE',
            tertiaryColor: '#F0FDF4',
            tertiaryTextColor: '#166534',
            tertiaryBorderColor: '#BBF7D0',
            clusterBkg: '#FAFAF9',
            clusterBorder: '#E7E5E4',
            edgeLabelBackground: '#FFFFFF',
            nodeBorder: '#CBD5E1',
            mainBkg: '#FFFFFF'
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 16,
            nodeSpacing: 45,
            rankSpacing: 45
          }
        });

        async function renderDiagrams() {
          for (let i = 0; i < mermaids.length; i++) {
            const el = mermaids[i];
            const code = el.textContent.trim();
            const id = 'diagram-render-' + i;
            try {
              const { svg } = await window.mermaid.render(id, code);
              el.innerHTML = svg;
              el.setAttribute('data-processed', 'true');
            } catch (err) {
              console.error('Diagram render failed:', err);
            }
          }
        }

        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(renderDiagrams);
        } else {
          renderDiagrams();
        }
      }
    };
    document.head.appendChild(s);
  }

  const form = document.querySelector('[data-blog-search]');
  if (form) {
    const query = form.elements.q, tag = form.elements.tag;
    const results = document.querySelector('[data-search-results]');
    const listing = document.querySelector('[data-static-listing]');
    const status = document.querySelector('[data-search-status]');
    // Search is progressive enhancement. All articles and pages have static links.
    fetch('/blog/search.json').then(r => { if (!r.ok) throw new Error('Search unavailable'); return r.json(); }).then(posts => {
      const scoped = posts.filter(p => !form.dataset.category || p.category === form.dataset.category);
      [...new Set(scoped.flatMap(p => p.tags))].sort().forEach(t => tag.add(new Option(t, t)));
      const requested = new URLSearchParams(location.search).get('tag');
      if (requested && ![...tag.options].some(o => o.value === requested)) tag.add(new Option(requested, requested));
      tag.value = requested || '';
      const queryParam = new URLSearchParams(location.search).get('q');
      if (queryParam) query.value = queryParam;
      form.hidden = false;
      let textIndexPromise;
      let requestId = 0;
      const loadTextIndex = () => textIndexPromise ||= fetch('/blog/search-text.json').then(r => { if (!r.ok) throw new Error('Search text unavailable'); return r.json(); });
      function render(found) {
        results.replaceChildren();
        status.textContent = `${found.length} article${found.length === 1 ? '' : 's'} found`;
        found.forEach(p => {
          const card = document.createElement('article'); card.className = 'blog-card';
          const imageLink = document.createElement('a'); imageLink.href = p.url; imageLink.className = 'blog-card-image'; imageLink.setAttribute('aria-label', `Read ${p.title}`);
          const img = document.createElement('img'); img.src = p.coverImage; img.alt = p.coverImageAlt; img.width = p.width; img.height = p.height; img.loading = 'lazy'; imageLink.append(img);
          const category = document.createElement('a'); category.className = 'eyebrow'; category.href = `/blog/${p.category}/`; category.textContent = p.categoryName;
          const heading = document.createElement('h2'), a = document.createElement('a'); a.href = p.url; a.textContent = p.title; heading.append(a);
          const desc = document.createElement('p'); desc.textContent = p.description;
          const meta = document.createElement('div'); meta.className = 'blog-meta';
          const time = document.createElement('time'); time.dateTime = p.datePublished; time.textContent = new Date(`${p.datePublished}T00:00:00Z`).toLocaleDateString('en-IN', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' });
          const duration = document.createElement('span'); duration.textContent = `${p.readingTime} min read`; meta.append(time, duration);
          card.append(imageLink, category, heading, desc, meta); results.append(card);
        });
      }
      function update() {
        const currentRequest = ++requestId;
        const term = query.value.trim().toLocaleLowerCase(), topic = tag.value;
        const active = Boolean(term || topic);
        listing.hidden = active; results.hidden = !active;
        if (!active) { status.textContent = ''; return; }
        const matches = textByUrl => scoped.filter(p => {
          const searchable = `${p.title} ${p.description} ${p.tags.join(' ')} ${textByUrl?.get(p.url) || ''}`.toLocaleLowerCase();
          return (!topic || p.tags.includes(topic)) && (!term || searchable.includes(term));
        });
        if (!term) { render(matches()); return; }
        status.textContent = 'Searching…';
        loadTextIndex().then(items => {
          if (currentRequest !== requestId) return;
          render(matches(new Map(items.map(item => [item.url, item.text]))));
        }).catch(() => { status.textContent = 'Search is unavailable. Browse the category and page links below.'; });
      }
      form.addEventListener('submit', e => e.preventDefault());
      query.addEventListener('input', update); tag.addEventListener('change', update); update();
    }).catch(() => { status.textContent = 'Search is unavailable. Browse the category and page links below.'; });
  }
})();
