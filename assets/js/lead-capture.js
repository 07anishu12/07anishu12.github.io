(function () {
  'use strict';

  const mobilePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;
  const pinPattern = /^[1-9]\d{5}$/;

  const apiUrl = () => {
    const configured = window.PORTFOLIO_CONFIG?.apiBaseUrl || '';
    return `${configured.replace(/\/$/, '')}/api/v1/leads`;
  };

  const setError = (form, name, message) => {
    const input = form.elements[name];
    const error = form.querySelector(`[data-lead-error="${name}"]`);
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  };

  const validate = form => {
    const values = Object.fromEntries(new FormData(form).entries());
    let valid = true;
    const checks = [
      ['fullName', String(values.fullName || '').trim().length >= 2 ? '' : 'Enter your full name.'],
      ['pinCode', pinPattern.test(String(values.pinCode || '').trim()) ? '' : 'Enter a six-digit PIN code.'],
      ['mobile', mobilePattern.test(String(values.mobile || '').trim()) ? '' : 'Enter a valid Indian mobile number.'],
      ['bikeBrand', String(values.bikeBrand || '').trim() ? '' : 'Choose a bike brand.'],
      ['otherBikeBrand', values.bikeBrand !== 'Other' || String(values.otherBikeBrand || '').trim() ? '' : 'Tell me the brand you have in mind.'],
      ['consent', form.elements.consent.checked ? '' : 'Please agree to the privacy notice.']
    ];
    checks.forEach(([name, message]) => {
      setError(form, name, message);
      if (message) valid = false;
    });
    return { valid, values };
  };

  const init = section => {
    const form = section.querySelector('[data-lead-form]');
    if (!form) return;
    const status = form.querySelector('[data-lead-status]');
    const submit = form.querySelector('[data-lead-submit]');
    const startedAt = form.elements.formStartedAt;
    const brand = form.elements.bikeBrand;
    const other = section.querySelector('[data-other-brand]');
    const whatsapp = form.querySelector('[data-lead-whatsapp]');
    let submitting = false;
    let submissionToken;
    const originalWhatsappHref = whatsapp?.href;
    startedAt.value = String(Date.now());

    brand.addEventListener('change', () => {
      const showOther = brand.value === 'Other';
      other.hidden = !showOther;
      form.elements.otherBikeBrand.required = showOther;
      if (!showOther) setError(form, 'otherBikeBrand', '');
    });

    form.addEventListener('input', () => {
      validate(form);
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (submitting) return;
      const { valid, values } = validate(form);
      if (!valid) {
        status.textContent = 'Please correct the highlighted fields.';
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

      submitting = true;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      status.textContent = 'Sending your enquiry…';
      try {
        if (!submissionToken) {
          const tokenResponse = await fetch(`${apiUrl()}/token`, { cache: 'no-store' });
          const tokenPayload = await tokenResponse.json();
          if (!tokenResponse.ok || !tokenPayload.submissionToken) throw new Error('The enquiry service is unavailable. Please retry.');
          submissionToken = tokenPayload.submissionToken;
        }
        const response = await fetch(apiUrl(), {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            submissionToken,
            sourcePath: window.location.pathname,
            articleSlug: section.dataset.articleSlug || undefined,
            pageCategory: section.dataset.articleCategory || undefined,
            fullName: String(values.fullName).trim(),
            pinCode: String(values.pinCode).trim(),
            mobile: String(values.mobile).trim(),
            bikeBrand: String(values.bikeBrand).trim(),
            otherBikeBrand: values.bikeBrand === 'Other' ? String(values.otherBikeBrand || '').trim() : undefined,
            consent: form.elements.consent.checked,
            website: String(values.website || ''),
            formStartedAt: Number(values.formStartedAt) || undefined
          })
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || payload.ok !== true || typeof payload.leadId !== 'string') throw new Error(payload?.error?.message || 'Lead delivery failed.');
        status.textContent = 'Thanks — your enquiry has been saved. Your follow-up is queued.';
        submissionToken = undefined;
        form.reset();
        startedAt.value = String(Date.now());
        other.hidden = true;
        form.elements.otherBikeBrand.required = false;
        if (whatsapp && originalWhatsappHref) whatsapp.href = originalWhatsappHref;
      } catch (error) {
        status.textContent = error instanceof Error && error.message.includes('Failed to fetch')
          ? 'The enquiry service is unavailable right now. Please use WhatsApp instead.'
          : (error instanceof Error ? error.message : 'The enquiry could not be sent. Please try WhatsApp instead.');
      } finally {
        submitting = false;
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
    });

    if (whatsapp && originalWhatsappHref) whatsapp.href = originalWhatsappHref;
  };

  document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('[data-lead-capture]').forEach(init));
}());
