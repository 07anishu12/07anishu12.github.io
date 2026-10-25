const BIKE_BRANDS = [
  'Hero',
  'Honda',
  'TVS',
  'Bajaj',
  'Yamaha',
  'Royal Enfield',
  'Suzuki',
  'KTM',
  'Ola Electric',
  'Ather',
  'Vida',
  'Ampere',
  'Other'
];

const eligible = post => {
  const slug = post.slug.toLowerCase();
  if (post.category === 'finance') return /(bike|scooter|two-wheeler|motorcycle)/.test(slug);
  if (post.category === 'auto') return /(bike|scooter|two-wheeler|motorcycle|commuter|on-road|down-payment|loan|emi|ownership-cost)/.test(slug);
  return false;
};

const escapeAttribute = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const field = ({ id, label, name, type = 'text', inputMode, autocomplete, pattern, placeholder, describedBy }) => `<div class="lead-field">
  <label class="lead-label" for="${id}">${label}</label>
  <input class="lead-input" id="${id}" name="${name}" type="${type}"${inputMode ? ` inputmode="${inputMode}"` : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${pattern ? ` pattern="${pattern}"` : ''}${placeholder ? ` placeholder="${placeholder}"` : ''} required aria-describedby="${describedBy}">
  <p class="lead-error" id="${describedBy}" data-lead-error="${name}" role="alert"></p>
</div>`;

const brandOptions = brands => brands.map(brand => `<option value="${escapeAttribute(brand)}">${escapeAttribute(brand)}</option>`).join('');

function renderLeadCapture(post, { brands = BIKE_BRANDS } = {}) {
  if (!eligible(post)) return '';
  const id = `lead-${post.slug}`;
  const compact = !/(bike-emi|bike-loan|two-wheeler-loan|down-payment|car-loan|emi-calculator)/.test(post.slug);
  const heading = post.category === 'finance' ? 'Planning a two-wheeler purchase?' : 'Want help comparing your next bike?';
  const intro = post.category === 'finance'
    ? 'Share a few basics and I can point you toward a sensible comparison. No account or loan promise—just a relevant follow-up.'
    : 'Share your PIN code and preference for a practical follow-up on fit, cost, and trade-offs.';
  const form = `<form class="lead-form" data-lead-form novalidate>
    <div class="lead-grid">
      ${field({ id: `${id}-name`, label: 'Full name', name: 'fullName', autocomplete: 'name', placeholder: 'Your name', describedBy: `${id}-name-error` })}
      ${field({ id: `${id}-pin`, label: 'Indian PIN code', name: 'pinCode', inputMode: 'numeric', pattern: '[0-9]{6}', autocomplete: 'postal-code', placeholder: '110001', describedBy: `${id}-pin-error` })}
      ${field({ id: `${id}-mobile`, label: 'Mobile number', name: 'mobile', type: 'tel', inputMode: 'tel', autocomplete: 'tel', placeholder: '+91 9876543210', describedBy: `${id}-mobile-error` })}
      <div class="lead-field">
        <label class="lead-label" for="${id}-brand">Bike brand preference</label>
        <select class="lead-input" id="${id}-brand" name="bikeBrand" required aria-describedby="${id}-brand-error">
          <option value="">Select a brand</option>${brandOptions(brands)}
        </select>
        <p class="lead-error" id="${id}-brand-error" data-lead-error="bikeBrand" role="alert"></p>
      </div>
      <div class="lead-field lead-other-brand" data-other-brand hidden>
        <label class="lead-label" for="${id}-other-brand">Other brand</label>
        <input class="lead-input" id="${id}-other-brand" name="otherBikeBrand" type="text" maxlength="80" placeholder="Tell me the brand" aria-describedby="${id}-other-brand-error">
        <p class="lead-error" id="${id}-other-brand-error" data-lead-error="otherBikeBrand" role="alert"></p>
      </div>
    </div>
    <div class="lead-honeypot" aria-hidden="true"><label>Leave this field blank <input name="website" tabindex="-1" autocomplete="off"></label></div>
    <input type="hidden" name="formStartedAt" data-lead-started-at>
    <div class="lead-consent">
      <input id="${id}-consent" name="consent" type="checkbox" value="true" required aria-describedby="${id}-consent-error">
      <label for="${id}-consent">I agree to be contacted about this enquiry and have read the <a href="/privacy.html">privacy notice</a>.</label>
      <p class="lead-error" id="${id}-consent-error" data-lead-error="consent" role="alert"></p>
    </div>
    <div class="lead-actions">
      <button class="btn btn-primary" type="submit" data-lead-submit>Request a follow-up <span class="arrow" aria-hidden="true">→</span></button>
      <a class="btn btn-secondary" data-lead-whatsapp href="https://wa.me/817012905081" target="_blank" rel="noopener">Prefer WhatsApp <span class="arrow" aria-hidden="true">↗</span></a>
    </div>
    <p class="lead-status" data-lead-status role="status" aria-live="polite"></p>
  </form>`;
  const body = `<p class="eyebrow">A practical next step</p><h2 id="${id}-title">${heading}</h2><p>${intro}</p>${form}`;
  return compact
    ? `<details class="lead-capture lead-capture-compact" data-lead-capture data-article-slug="${escapeAttribute(post.slug)}" data-article-category="${escapeAttribute(post.category)}"><summary><span><strong>${heading}</strong><small>Optional · takes about a minute</small></span><span aria-hidden="true">+</span></summary><div class="lead-capture-body">${body}</div></details>`
    : `<section class="lead-capture" data-lead-capture data-article-slug="${escapeAttribute(post.slug)}" data-article-category="${escapeAttribute(post.category)}" aria-labelledby="${id}-title"><div class="lead-capture-body">${body}</div></section>`;
}

module.exports = { BIKE_BRANDS, eligible, renderLeadCapture };
