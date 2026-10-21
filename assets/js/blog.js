(() => {
  'use strict';
  const share = document.querySelector('[data-share="copy"]');
  share?.addEventListener('click', async () => {
    const status = document.querySelector('[data-share-status]');
    try { await navigator.clipboard.writeText(share.dataset.url); status.textContent = 'Link copied.'; }
    catch { status.textContent = `Copy this link: ${share.dataset.url}`; }
  });
  const form = document.querySelector('[data-blog-search]');
  if (!form) return;
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
    form.hidden = false;
    function update() {
      const term = query.value.trim().toLocaleLowerCase(), topic = tag.value;
      const active = Boolean(term || topic);
      listing.hidden = active; results.hidden = !active; results.replaceChildren();
      if (!active) { status.textContent = ''; return; }
      const found = scoped.filter(p => (!topic || p.tags.includes(topic)) && (!term || `${p.title} ${p.description} ${p.tags.join(' ')} ${p.text}`.toLocaleLowerCase().includes(term)));
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
    form.addEventListener('submit', e => e.preventDefault());
    query.addEventListener('input', update); tag.addEventListener('change', update); update();
  }).catch(() => { status.textContent = 'Search is unavailable. Browse the category and page links below.'; });
})();
