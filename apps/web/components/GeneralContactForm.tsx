"use client";

import React, { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { API_URL, whatsappHref } from "../lib/contact";

const SERVICES = [
  "AI Engineering & Automation",
  "Product & Technical Delivery",
  "AI Research & Model Evaluation",
  "Quantitative Finance & Modeling",
  "Other Collaboration",
];

const mobilePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

export function GeneralContactForm() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [otherService, setOtherService] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot field

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const tokenRef = useRef<string | null>(null);
  const formStartedAtRef = useRef<number>(Date.now());

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!mobile.trim() || !mobilePattern.test(mobile.trim())) {
      errs.mobile = "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
    }
    if (service === "Other Collaboration" && !otherService.trim()) {
      errs.otherService = "Please briefly describe the topic or problem.";
    }
    if (!consent) {
      errs.consent = "You must agree to the privacy notice before submitting.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage("");
    setStatusMessage("");

    if (!validate()) {
      setErrorMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Authenticating session and sending enquiry…");

    try {
      const endpoint = API_URL ? API_URL.replace(/\/$/, "") : "";

      // 1. Fetch token if not already fetched
      if (!tokenRef.current) {
        const tokenRes = await fetch(`${endpoint}/api/v1/leads/token/`, {
          cache: "no-store",
        });
        if (!tokenRes.ok) {
          throw new Error("Unable to obtain secure submission token. Please try again or connect via WhatsApp.");
        }
        const tokenData = await tokenRes.json();
        tokenRef.current = tokenData.token;
      }

      // 2. Submit payload
      const payload = {
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        service,
        otherService: service === "Other Collaboration" ? otherService.trim() : undefined,
        consent,
        website, // Honeypot
        token: tokenRef.current,
        startedAt: formStartedAtRef.current,
      };

      const res = await fetch(`${endpoint}/api/v1/leads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 503 && data.detail?.includes("DATABASE_URL")) {
          // Transparent fallback to direct communication
          setStatusMessage(data.detail);
          return;
        }
        throw new Error(data.error || data.detail || `Submission failed with status ${res.status}`);
      }

      setIsSuccess(true);
      setSubmittedId(data.leadId || "SUBMITTED");
      setStatusMessage("Enquiry received successfully! Aniket will review your message and respond directly.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      {isSuccess ? (
        <div className="form-success-card" role="status" aria-live="polite">
          <div className="success-icon-wrap" aria-hidden="true">
            ✓
          </div>
          <h3>Enquiry Received</h3>
          <p className="success-message">{statusMessage}</p>
          {submittedId && (
            <p className="receipt-tag">
              Receipt Reference: <code>{submittedId}</code>
            </p>
          )}
          <div className="success-actions">
            <a
              href={whatsappHref(`Hi Aniket, I submitted an enquiry (Ref: ${submittedId}) on aniket.app.`)}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Continue on WhatsApp ↗
            </a>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setIsSuccess(false);
                setFullName("");
                setMobile("");
                setOtherService("");
                setConsent(false);
                setStatusMessage("");
                tokenRef.current = null;
                formStartedAtRef.current = Date.now();
              }}
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form className="contact-direct-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-full-name" className="form-label">
                Full Name <span className="field-required">*</span>
              </label>
              <input
                id="contact-full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`form-input ${errors.fullName ? "input-error" : ""}`}
                placeholder="e.g. Priya Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.fullName && <p className="field-error-msg">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="contact-mobile" className="form-label">
                Mobile Number (India) <span className="field-required">*</span>
              </label>
              <input
                id="contact-mobile"
                name="tel"
                type="tel"
                autoComplete="tel"
                required
                className={`form-input ${errors.mobile ? "input-error" : ""}`}
                placeholder="e.g. 9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.mobile && <p className="field-error-msg">{errors.mobile}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-service" className="form-label">
              Primary Area of Discussion <span className="field-required">*</span>
            </label>
            <select
              id="contact-service"
              name="service"
              className="form-select"
              value={service}
              onChange={(e) => setService(e.target.value)}
              disabled={isSubmitting}
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {service === "Other Collaboration" && (
            <div className="form-group">
              <label htmlFor="contact-other-service" className="form-label">
                Topic Description <span className="field-required">*</span>
              </label>
              <input
                id="contact-other-service"
                name="otherService"
                type="text"
                required
                className={`form-input ${errors.otherService ? "input-error" : ""}`}
                placeholder="Tell me about the problem, project, or question…"
                value={otherService}
                onChange={(e) => setOtherService(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.otherService && (
                <p className="field-error-msg">{errors.otherService}</p>
              )}
            </div>
          )}

          {/* Honeypot field (hidden from real users) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Consent Checkbox */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={isSubmitting}
                className="checkbox-input"
              />
              <span className="checkbox-text">
                I agree to the <Link href="/privacy/">Privacy Notice</Link> and authorize Aniket Thakur to review my details and follow up directly regarding this enquiry.
              </span>
            </label>
            {errors.consent && <p className="field-error-msg">{errors.consent}</p>}
          </div>

          {/* Status and Error banners */}
          {errorMessage && (
            <div className="form-banner banner-error" role="alert">
              {errorMessage}
            </div>
          )}
          {statusMessage && !isSuccess && (
            <div className="form-banner banner-info" role="status">
              {statusMessage}
            </div>
          )}

          {/* Submit Action */}
          <div className="form-submit-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-primary submit-btn"
            >
              {isSubmitting ? "Submitting…" : "Send Message →"}
            </button>
            <a
              href={whatsappHref("Hi Aniket, I'd like to discuss a project or collaboration.")}
              target="_blank"
              rel="noreferrer"
              className="button button-secondary whatsapp-quick-btn"
            >
              Quick WhatsApp ↗
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
