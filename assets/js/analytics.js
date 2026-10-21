(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || {};
  if (location.origin !== 'https://07anishu12.github.io' || document.documentElement.dataset.preview === 'true' || !/^G-[A-Z0-9]+$/.test(config.measurementId || '')) return;
  // No consent system existed. If enabled in config, the site's consent UI must
  // set portfolioAnalyticsConsent=true and dispatch portfolio:analytics-consent.
  let started = false;
  function start() {
    if (started || (config.requireAnalyticsConsent && window.portfolioAnalyticsConsent !== true)) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    const canonical = document.querySelector('link[rel="canonical"]')?.href || `${location.origin}/404.html`;
    const article = document.querySelector('[data-article-slug]');
    const context = article ? { article_category: article.dataset.articleCategory, article_slug: article.dataset.articleSlug } : {};
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* No referrer. */ }
    window.gtag('js', new Date());
    window.gtag('config', config.measurementId, {
      ...context, page_location: canonical, page_referrer: referrer,
      allow_google_signals: false, allow_ad_personalization_signals: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.measurementId)}`;
    document.head.appendChild(script);
    document.addEventListener('click', event => {
      if (config.requireAnalyticsConsent && window.portfolioAnalyticsConsent !== true) return;
      const a = event.target.closest('a, button');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      let name, params = { ...context };
      if (a.dataset.share) { name = 'share'; params.method = a.dataset.share; params.content_type = 'article'; params.item_id = canonical; }
      else if (href.startsWith('mailto:')) { name = 'contact_click'; params.contact_method = 'email'; }
      else if (href.startsWith('tel:')) { name = 'contact_click'; params.contact_method = 'phone'; }
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) { name = 'contact_click'; params.contact_method = 'whatsapp'; }
      else if (a.closest('.blog-body, .blog-sources, .article-body')) {
        try {
          const target = new URL(href, location.href);
          if (['https:', 'http:'].includes(target.protocol) && target.origin !== location.origin) {
            name = 'outbound_reference'; params.reference_domain = target.hostname;
          }
        } catch { /* Invalid URL; no event. */ }
      }
      // Resume downloads use GA4 enhanced measurement's file_download event.
      // No link text, contact destinations, query strings, or form values are sent.
      if (name) window.gtag('event', name, params);
    });
  }
  window.addEventListener('portfolio:analytics-consent', () => {
    if (config.requireAnalyticsConsent) {
      const granted = window.portfolioAnalyticsConsent === true;
      window[`ga-disable-${config.measurementId}`] = !granted;
      if (started) window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
    }
    start();
  });
  start();
})();
