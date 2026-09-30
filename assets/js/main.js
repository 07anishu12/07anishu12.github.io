(() => {
  'use strict';

  const fallbackLearnings = [
    {
      title: 'TODO — Add a LinkedIn build note',
      date: 'TODO',
      tag: 'AI Engineering',
      excerpt: 'Replace this placeholder with a real LinkedIn post about an AI system, experiment, or engineering lesson.',
      link: 'https://www.linkedin.com/in/aniket-thakur-a23a9b372',
      todo: true
    },
    {
      title: 'TODO — Add a fintech product note',
      date: 'TODO',
      tag: 'Fintech',
      excerpt: 'Replace this placeholder with a real LinkedIn post about lending, loan journeys, or financial engineering.',
      link: 'https://www.linkedin.com/in/aniket-thakur-a23a9b372',
      todo: true
    },
    {
      title: 'TODO — Add a product lesson',
      date: 'TODO',
      tag: 'Product',
      excerpt: 'Replace this placeholder with a real LinkedIn or X post about building, shipping, or learning in public.',
      link: 'https://x.com/07anni04',
      todo: true
    }
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('motion-ready');

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
      menuToggle.innerHTML = isOpen ? '<span aria-hidden="true">☰</span><span class="sr-only">Open menu</span>' : '<span aria-hidden="true">×</span><span class="sr-only">Close menu</span>';
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        menuToggle.innerHTML = '<span aria-hidden="true">☰</span><span class="sr-only">Open menu</span>';
      });
    });
  }

  document.querySelectorAll('.button').forEach((button) => {
    if (reducedMotion) return;
    button.addEventListener('pointermove', (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
    });
  });

  document.querySelectorAll('[data-parallax]').forEach((element) => {
    if (reducedMotion) return;
    const image = element.querySelector('img');
    if (!image) return;
    const move = () => {
      const bounds = element.getBoundingClientRect();
      const center = bounds.top + bounds.height / 2;
      const offset = Math.max(-8, Math.min(8, (window.innerHeight / 2 - center) * 0.025));
      image.style.transform = `translateY(${offset}px) scale(1.02)`;
    };
    window.addEventListener('scroll', move, { passive: true });
    move();
  });

  const learningGrid = document.querySelector('[data-learning-grid]');
  const learningStatus = document.querySelector('[data-learning-status]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  let learningEntries = fallbackLearnings;

  const renderLearnings = (filter = 'All') => {
    if (!learningGrid) return;
    const filtered = filter === 'All' ? learningEntries : learningEntries.filter((item) => item.tag === filter);
    learningGrid.innerHTML = '';
    if (!filtered.length) {
      learningGrid.innerHTML = '<p class="empty-state">No notes in this filter yet.</p>';
      return;
    }
    filtered.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'note-card reveal is-visible';
      const safeLink = item.link || 'https://www.linkedin.com/in/aniket-thakur-a23a9b372';
      const todoLabel = item.todo || String(item.title).startsWith('TODO') ? '<span class="todo-label">Placeholder — replace with a real post</span>' : '';
      article.innerHTML = `
        <div class="note-meta"><span>${escapeHtml(item.date)}</span><span class="tag">${escapeHtml(item.tag)}</span></div>
        ${todoLabel}
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.excerpt)}</p>
        <a class="text-link" href="${escapeAttribute(safeLink)}" target="_blank" rel="noreferrer">Read the post <span class="arrow">↗</span></a>
      `;
      article.style.transitionDelay = `${index * 50}ms`;
      learningGrid.appendChild(article);
    });
  };

  if (learningGrid) {
    renderLearnings();
    // The inline fallback keeps this page usable when index.html is opened via file://.
    fetch('data/learnings.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Learnings data unavailable');
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          learningEntries = data;
          renderLearnings(document.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter || 'All');
          if (learningStatus) learningStatus.textContent = `${data.length} notes loaded from data/learnings.json`;
        }
      })
      .catch(() => {
        if (learningStatus) learningStatus.textContent = 'Showing the inline starter notes. Add real entries to data/learnings.json.';
      });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      renderLearnings(button.dataset.filter);
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  const formStatus = document.querySelector('[data-form-status]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (contactForm.querySelector('[name="website"]').value) return;
      if (formStatus) {
        formStatus.textContent = 'Form endpoint is not configured yet. Please email kumaraniketn@gmail.com directly.';
      }
    });
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }
})();
