(() => {
  'use strict';

  // The JSON files are the editable source of truth. These values keep the static site
  // usable when a page is opened directly from disk before the JSON request can run.
  const FORM_ENDPOINT = 'YOUR_FORM_ENDPOINT';
  const contactFallback = {
    name: 'Aniket Thakur',
    email: 'kumaraniketn@gmail.com',
    phone: '+918448769791',
    phoneDisplay: '+91 8448769791',
    whatsapp: '817012905081',
    whatsappDisplay: '+81 70-1290-5081',
    location: 'New Delhi, India',
    github: 'https://github.com/07anishu12',
    linkedin: 'https://www.linkedin.com/in/aniket-thakur-a23a9b372',
    x: 'https://x.com/07anni04',
    resume: 'assets/Aniket_Thakur_Resume.pdf'
  };
  const assistantFallback = {
    intro: 'I can help you explore Aniket\'s work and background. Choose a question below:',
    whatsappLabel: 'WhatsApp Aniket',
    answers: {
      'What does Aniket do?': 'Aniket is an AI researcher and Associate Product Manager working across Generative AI, machine learning, fintech, and data analytics.',
      'What are Aniket\'s key projects?': 'His featured systems are Laya (Automated SEO Intelligence, 70% cycle reduction), Prompt-Based Business Intelligence, osTicket AI Workflow, and Multi-LLM Content Generation.',
      'What is Laya?': 'Laya is an automated SEO pipeline connecting web scraping, SERP ranking analysis, and LLMs with strict validation. It reduced content creation cycles by 70%.',
      'Where did Aniket work?': 'He works as an Associate Product Manager at Drivio Technologies (previously Business Analyst), was an AI Research Intern at OIST in Okinawa, Japan, and was a Business Consultant & Analyst at Analy Assist.',
      'What did he research at OIST?': 'At OIST, he developed Graph Neural Network (GNN) algorithms for ecological food-web modeling and engineered multi-LLM data synthesis pipelines using Gemini, DeepSeek, Anthropic, and OpenAI.',
      'What technologies does he use?': 'His toolkit includes Generative AI, Transformers, RAG, Fine-Tuning, GNNs (GraphSAGE, GAT), Python, PyTorch, PyTorch Geometric, SQL, R, JavaScript, and financial modeling.',
      'Where can I download his résumé?': 'You can download Aniket\'s résumé using the Download Résumé button in the navigation or contact page.',
      'How can I contact Aniket?': 'Email him at kumaraniketn@gmail.com, call +91 8448769791, WhatsApp at +81 70-1290-5081, or connect on LinkedIn.'
    }
  };

  let contact = contactFallback;
  let assistantData = assistantFallback;

  initNavigation();
  initContactData();
  initLearnings();
  initContactForm();
  initAssistant();

  function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span aria-hidden="true">☰</span>';
      nav.hidden = true;
      document.body.classList.remove('is-menu-open');
    };
    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '<span aria-hidden="true">✕</span>';
      nav.hidden = false;
      document.body.classList.add('is-menu-open');
    };

    toggle.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (event) => {
      if (nav.hidden || nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  async function initContactData() {
    try {
      const response = await fetch('data/contact.json', { cache: 'no-store' });
      if (response.ok) contact = { ...contactFallback, ...(await response.json()) };
    } catch (_) {
      // Local fallback keeps file preview functional
    }
    hydrateContact();
  }

  function hydrateContact() {
    const textValues = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      phoneDisplay: contact.phoneDisplay,
      whatsapp: contact.whatsapp,
      whatsappDisplay: contact.whatsappDisplay,
      location: contact.location
    };
    document.querySelectorAll('[data-contact]').forEach((element) => {
      const key = element.dataset.contact;
      if (textValues[key]) element.textContent = textValues[key];
    });

    const links = {
      email: `mailto:${contact.email}`,
      phone: `tel:${contact.phone}`,
      whatsapp: `https://wa.me/${contact.whatsapp}`,
      github: contact.github,
      linkedin: contact.linkedin,
      x: contact.x,
      resume: contact.resume
    };
    document.querySelectorAll('[data-contact-link]').forEach((element) => {
      const key = element.dataset.contactLink;
      if (links[key]) element.href = links[key];
    });
    document.querySelectorAll('[data-email-fallback]').forEach((element) => {
      element.href = buildEmailUrl();
    });
  }

  function initLearnings() {
    const grid = document.querySelector('[data-learning-grid]');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.note-card')];
    const status = document.querySelector('[data-learning-status]');
    const filters = [...document.querySelectorAll('[data-filter]')];

    filters.forEach((button) => button.addEventListener('click', () => {
      filters.forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      const filter = button.dataset.filter;

      let visibleCount = 0;
      cards.forEach((card) => {
        const cat = card.dataset.category;
        const matches = (filter === 'All' || cat === filter);
        card.hidden = !matches;
        if (matches) visibleCount++;
      });

      let emptyMsg = grid.querySelector('.learnings-filter-empty');
      if (visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement('div');
          emptyMsg.className = 'learnings-filter-empty';
          emptyMsg.style.gridColumn = '1 / -1';
          emptyMsg.innerHTML = '<p class="lead" style="text-align: center; padding: 40px 0; color: var(--text-secondary);">No notes found in this topic yet.</p>';
          grid.appendChild(emptyMsg);
        }
        emptyMsg.hidden = false;
      } else if (emptyMsg) {
        emptyMsg.hidden = true;
      }

      if (status) status.textContent = `${visibleCount} note${visibleCount === 1 ? '' : 's'} displayed`;
    }));
  }

  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;
    const status = form.querySelector('[data-form-status]');
    const fallbackLink = form.querySelector('[data-email-fallback]');

    if (FORM_ENDPOINT !== 'YOUR_FORM_ENDPOINT') form.action = FORM_ENDPOINT;
    if (fallbackLink) fallbackLink.addEventListener('click', () => { fallbackLink.href = buildEmailUrl(); });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value) return;

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const requirement = String(formData.get('requirement') || '').trim();
      const message = String(formData.get('message') || '').trim();

      const whatsappMessage = `Hi Aniket,\n\nYou have a new enquiry from your portfolio.\n\nName: ${name}\nEmail: ${email}\nRequirement:\n${requirement}\n\nMessage:\n${message}\n\nSent from Aniket's portfolio website.`;
      const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

      if (status) status.textContent = 'WhatsApp opened with your enquiry. Press Send to complete the message.';
      const opened = window.open(whatsappUrl, '_blank', 'noopener');
      if (!opened) window.location.href = whatsappUrl;
    });
  }

  function buildEmailUrl() {
    const form = document.querySelector('[data-contact-form]');
    const name = form?.querySelector('[name="name"]')?.value.trim() || '';
    const email = form?.querySelector('[name="email"]')?.value.trim() || '';
    const requirement = form?.querySelector('[name="requirement"]')?.value.trim() || '';
    const message = form?.querySelector('[name="message"]')?.value.trim() || '';
    const body = `Name: ${name}\nEmail: ${email}\nRequirement: ${requirement}\nMessage: ${message}`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name || 'visitor'}`)}&body=${encodeURIComponent(body)}`;
  }

  function initAssistant() {
    const launcher = document.createElement('button');
    launcher.className = 'assistant-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-controls', 'portfolio-assistant');
    launcher.innerHTML = '<span class="badge" aria-hidden="true">?</span> Ask about my work';

    const panel = document.createElement('aside');
    panel.className = 'assistant-panel';
    panel.id = 'portfolio-assistant';
    panel.setAttribute('aria-label', 'Portfolio assistant');
    panel.innerHTML = `
      <div class="assistant-head">
        <strong>Portfolio Guide</strong>
        <button class="assistant-close" type="button" aria-label="Close portfolio guide">×</button>
      </div>
      <div class="assistant-body">
        <p class="assistant-intro"></p>
        <div class="assistant-answer" aria-live="polite">Click any question below to explore:</div>
        <div class="assistant-questions"></div>
        <a class="btn btn-primary btn-sm assistant-whatsapp" data-contact-link="whatsapp" href="https://wa.me/817012905081" target="_blank" rel="noopener">WhatsApp Aniket ↗</a>
      </div>
    `;
    document.body.append(launcher, panel);

    const close = () => {
      panel.classList.remove('is-open');
      launcher.setAttribute('aria-expanded', 'false');
    };

    launcher.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      launcher.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('.assistant-question')?.focus();
    });

    panel.querySelector('.assistant-close').addEventListener('click', close);
    panel.querySelector('.assistant-intro').textContent = assistantData.intro;
    const questions = panel.querySelector('.assistant-questions');
    const answer = panel.querySelector('.assistant-answer');

    const populateQuestions = () => {
      questions.innerHTML = '';
      Object.keys(assistantData.answers).forEach((question) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'assistant-question';
        button.textContent = question;
        button.addEventListener('click', () => {
          answer.textContent = assistantData.answers[question];
        });
        questions.appendChild(button);
      });
    };

    populateQuestions();

    fetch('data/assistant.json', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data || !data.answers) return;
        assistantData = data;
        panel.querySelector('.assistant-intro').textContent = assistantData.intro;
        populateQuestions();
      })
      .catch(() => {});
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[character]));
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }
})();
