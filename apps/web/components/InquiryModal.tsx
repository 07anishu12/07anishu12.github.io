"use client";

import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AUTOMOTIVE_BRANDS,
  SERVICES_LIST,
  ServiceOption,
  VEHICLE_MODELS_BY_BRAND,
  VEHICLE_TYPES,
} from "@portfolio/contracts";

import { WHATSAPP_NUMBER, whatsappHref } from "../lib/contact";
import { useInquiry } from "./InquiryContext";

const mobilePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;
const pinPattern = /^[1-9]\d{5}$/;

interface AutoFormValues {
  fullName: string;
  mobile: string;
  pinCode: string;
  bikeBrand: string;
  otherBikeBrand: string;
  vehicleModel: string;
  vehicleType: string;
  consent: boolean;
  website: string;
}

interface GeneralFormValues {
  fullName: string;
  mobile: string;
  service: string;
  otherService: string;
  consent: boolean;
  website: string;
}

export function InquiryModal() {
  const {
    isOpen,
    activeType,
    options,
    closeInquiry,
    isSubmitting,
    setIsSubmitting,
  } = useInquiry();

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<string | null>(null);

  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Search filter for service dropdown
  const [serviceSearch, setServiceSearch] = useState("");

  // Form states
  const [autoValues, setAutoValues] = useState<AutoFormValues>({
    fullName: "",
    mobile: "",
    pinCode: "",
    bikeBrand: "",
    otherBikeBrand: "",
    vehicleModel: "",
    vehicleType: "",
    consent: false,
    website: "",
  });

  const [generalValues, setGeneralValues] = useState<GeneralFormValues>({
    fullName: "",
    mobile: "",
    service: "",
    otherService: "",
    consent: false,
    website: "",
  });

  // Apply prefill data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormStartedAt(Date.now());
      setStatusMessage("");
      setErrorMessage("");
      setSubmittedLeadId(null);
      setErrors({});
      setServiceSearch("");

      if (options.prefill) {
        if (activeType === "automotive") {
          setAutoValues((prev) => ({
            ...prev,
            fullName: options.prefill?.fullName || prev.fullName,
            mobile: options.prefill?.mobile || prev.mobile,
            pinCode: options.prefill?.pinCode || prev.pinCode,
            bikeBrand: options.prefill?.brand || prev.bikeBrand,
            vehicleModel: options.prefill?.model || prev.vehicleModel,
            vehicleType: options.prefill?.vehicleType || prev.vehicleType,
          }));
        } else {
          setGeneralValues((prev) => ({
            ...prev,
            fullName: options.prefill?.fullName || prev.fullName,
            mobile: options.prefill?.mobile || prev.mobile,
            service: options.prefill?.service || prev.service,
          }));
        }
      }

      // Auto-focus first input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, activeType, options.prefill]);

  // Handle Escape key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isSubmitting) closeInquiry();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement =
          focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, closeInquiry]);

  // Available models based on selected brand
  const availableModels = useMemo(() => {
    if (!autoValues.bikeBrand) return [];
    return VEHICLE_MODELS_BY_BRAND[autoValues.bikeBrand] || [];
  }, [autoValues.bikeBrand]);

  // Filtered services for general form
  const filteredServices = useMemo(() => {
    if (!serviceSearch.trim()) return SERVICES_LIST;
    const q = serviceSearch.toLowerCase();
    return SERVICES_LIST.filter((s) => s.toLowerCase().includes(q));
  }, [serviceSearch]);

  const updateAuto = (key: keyof AutoFormValues, val: any) => {
    setAutoValues((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "bikeBrand" && val !== prev.bikeBrand) {
        next.vehicleModel = ""; // Reset model when brand changes
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateGeneral = (key: keyof GeneralFormValues, val: any) => {
    setGeneralValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Client validation
  const validateAuto = (): boolean => {
    const errs: Record<string, string> = {};
    if (autoValues.fullName.trim().length < 2)
      errs.fullName = "Enter your full name.";
    if (!mobilePattern.test(autoValues.mobile.trim()))
      errs.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (!pinPattern.test(autoValues.pinCode.trim()))
      errs.pinCode = "Enter a valid 6-digit PIN code.";
    if (
      autoValues.bikeBrand === "Other" &&
      autoValues.otherBikeBrand.trim().length < 2
    )
      errs.otherBikeBrand = "Please specify the brand.";
    if (!autoValues.consent)
      errs.consent = "Please agree to the privacy notice.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateGeneral = (): boolean => {
    const errs: Record<string, string> = {};
    if (generalValues.fullName.trim().length < 2)
      errs.fullName = "Enter your full name.";
    if (!mobilePattern.test(generalValues.mobile.trim()))
      errs.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (!generalValues.service)
      errs.service = "Please select a service requirement.";
    if (
      generalValues.service === "Other" &&
      generalValues.otherService.trim().length < 2
    )
      errs.otherService = "Please describe your requirement.";
    if (!generalValues.consent)
      errs.consent = "Please agree to the privacy notice.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isValid = activeType === "automotive" ? validateAuto() : validateGeneral();
    if (!isValid) {
      setErrorMessage("Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setStatusMessage("Submitting your inquiry…");

    try {
      // Step 1: Obtain or reuse session submission token
      if (!tokenRef.current) {
        const tokenRes = await fetch("/api/v1/leads/token/", { cache: "no-store" });
        const tokenData = await tokenRes.json().catch(() => ({}));
        if (!tokenRes.ok || typeof tokenData.submissionToken !== "string") {
          throw new Error(
            tokenData?.error?.message ||
              "The inquiry service is temporarily unavailable. Please retry or contact directly via WhatsApp.",
          );
        }
        tokenRef.current = tokenData.submissionToken;
      }

      // Step 2: Build payload
      const payload =
        activeType === "automotive"
          ? {
              enquiryType: "automotive",
              submissionToken: tokenRef.current,
              sourcePath: window.location.pathname,
              articleSlug: options.sourceSlug,
              pageCategory: options.category || "auto",
              fullName: autoValues.fullName.trim(),
              mobile: autoValues.mobile.trim(),
              pinCode: autoValues.pinCode.trim(),
              bikeBrand: autoValues.bikeBrand || undefined,
              otherBikeBrand:
                autoValues.bikeBrand === "Other"
                  ? autoValues.otherBikeBrand.trim()
                  : undefined,
              vehicleModel: autoValues.vehicleModel || undefined,
              vehicleType: autoValues.vehicleType || undefined,
              consent: autoValues.consent,
              website: autoValues.website,
              formStartedAt,
              clientContext: { campaign: options.category || "auto" },
            }
          : {
              enquiryType: "general",
              submissionToken: tokenRef.current,
              sourcePath: window.location.pathname,
              pageCategory: options.category || "general",
              fullName: generalValues.fullName.trim(),
              mobile: generalValues.mobile.trim(),
              service: generalValues.service,
              otherService:
                generalValues.service === "Other"
                  ? generalValues.otherService.trim()
                  : undefined,
              consent: generalValues.consent,
              website: generalValues.website,
              formStartedAt,
            };

      // Step 3: POST submission
      const response = await fetch("/api/v1/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (data?.error?.code === "INVALID_SUBMISSION_TOKEN") {
        tokenRef.current = null; // Invalidate stale token
      }

      if (!response.ok || !data.ok || typeof data.leadId !== "string") {
        throw new Error(
          data?.error?.message ||
            "Unable to save your inquiry. Please retry or reach out via WhatsApp.",
        );
      }

      // Success state
      setSubmittedLeadId(data.leadId);
      setStatusMessage("");
      setErrorMessage("");

      // Track successful submission in GA4 (without PII)
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "enquiry_submitted", {
          form_type: activeType,
          page_path: window.location.pathname,
          duplicate: Boolean(data.duplicate),
        });
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          "An error occurred while submitting your inquiry. Your details have been preserved. Please try again or use WhatsApp.",
      );
      setStatusMessage("");

      // Track submission error in GA4 (without PII)
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "enquiry_error", {
          form_type: activeType,
          error_message: String(err?.message || "error").slice(0, 100),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    tokenRef.current = null;
    setSubmittedLeadId(null);
    setErrorMessage("");
    setStatusMessage("");
    setFormStartedAt(Date.now());
  };

  if (!isOpen) return null;

  return (
    <div
      className="inquiry-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          closeInquiry();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="inquiry-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-dialog-title"
      >
        <button
          className="inquiry-close"
          type="button"
          aria-label="Close dialog"
          disabled={isSubmitting}
          onClick={closeInquiry}
        >
          ✕
        </button>

        <div className="inquiry-header">
          <p className="eyebrow">
            {activeType === "automotive" ? "Vehicle & Finance" : "Direct Inquiry"}
          </p>
          <h2 id="inquiry-dialog-title">
            {activeType === "automotive" ? "Check Your Offer" : "Inquiry"}
          </h2>
          <p>
            {activeType === "automotive"
              ? "Share your details to receive verified showroom pricing, on-road costs, and financing options."
              : "Tell me about your project, system, or requirements to discuss scope, timeline, and feasibility."}
          </p>
        </div>

        {submittedLeadId ? (
          <div className="prose" style={{ marginTop: 12 }}>
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 12,
                padding: "20px 18px",
                color: "#166534",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontSize: "1.15rem", color: "#166534" }}>
                ✓ Inquiry Received Successfully
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: "0.9rem" }}>
                Thank you! Your inquiry has been saved under reference:
                <br />
                <code
                  style={{
                    display: "inline-block",
                    background: "#dcfce7",
                    padding: "2px 8px",
                    borderRadius: 6,
                    fontWeight: 700,
                    marginTop: 6,
                  }}
                >
                  {submittedLeadId}
                </code>
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#15803d" }}>
                I will review your requirements and follow up with you shortly.
              </p>
            </div>

            <div className="lead-actions" style={{ marginTop: 24 }}>
              <button
                className="button button-primary"
                type="button"
                onClick={closeInquiry}
              >
                Close
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={resetForm}
              >
                Submit another inquiry
              </button>
              <a
                className="button button-secondary"
                href={whatsappHref(
                  `Hi Aniket, I just submitted an inquiry on aniket.app (Ref: ${submittedLeadId}).`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Connect on WhatsApp ↗
              </a>
            </div>
          </div>
        ) : (
          <form
            className="lead-form"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSubmitting}
          >
            {/* Honeypot field for bot suppression */}
            <div className="lead-honeypot" aria-hidden="true">
              <label>
                Leave this blank:
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={
                    activeType === "automotive"
                      ? autoValues.website
                      : generalValues.website
                  }
                  onChange={(e) =>
                    activeType === "automotive"
                      ? updateAuto("website", e.target.value)
                      : updateGeneral("website", e.target.value)
                  }
                />
              </label>
            </div>

            {/* Error banner if submission failed */}
            {errorMessage && (
              <div
                role="alert"
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: "#991b1b",
                  fontSize: "0.85rem",
                  lineHeight: 1.45,
                }}
              >
                <strong>Submission alert:</strong> {errorMessage}
              </div>
            )}

            {/* Status message while loading */}
            {statusMessage && (
              <p className="lead-status" role="status" aria-live="polite">
                {statusMessage}
              </p>
            )}

            {/* AUTOMOTIVE INQUIRY FORM */}
            {activeType === "automotive" ? (
              <div className="lead-grid">
                {/* 1. Full Name (Required) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-auto-name">
                    Full name <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    className="lead-input"
                    id="inquiry-auto-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={autoValues.fullName}
                    onChange={(e) => updateAuto("fullName", e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "inquiry-auto-name-err" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p className="lead-error" id="inquiry-auto-name-err" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. Phone Number (Required) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-auto-phone">
                    Phone number <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    className="lead-input"
                    id="inquiry-auto-phone"
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={autoValues.mobile}
                    onChange={(e) => updateAuto("mobile", e.target.value)}
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={
                      errors.mobile ? "inquiry-auto-phone-err" : undefined
                    }
                  />
                  {errors.mobile && (
                    <p className="lead-error" id="inquiry-auto-phone-err" role="alert">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* 3. Indian PIN Code (Required) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-auto-pin">
                    Indian PIN code <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    className="lead-input"
                    id="inquiry-auto-pin"
                    name="pinCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    required
                    placeholder="e.g. 110001"
                    value={autoValues.pinCode}
                    onChange={(e) =>
                      updateAuto(
                        "pinCode",
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    aria-invalid={Boolean(errors.pinCode)}
                    aria-describedby={
                      errors.pinCode ? "inquiry-auto-pin-err" : undefined
                    }
                  />
                  {errors.pinCode && (
                    <p className="lead-error" id="inquiry-auto-pin-err" role="alert">
                      {errors.pinCode}
                    </p>
                  )}
                </div>

                {/* 4. Vehicle Brand (Optional) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-auto-brand">
                    Vehicle brand <span style={{ color: "var(--muted)" }}>(optional)</span>
                  </label>
                  <select
                    className="lead-input"
                    id="inquiry-auto-brand"
                    name="bikeBrand"
                    value={autoValues.bikeBrand}
                    onChange={(e) => updateAuto("bikeBrand", e.target.value)}
                  >
                    <option value="">Select a brand</option>
                    {AUTOMOTIVE_BRANDS.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Brand if 'Other' selected */}
                {autoValues.bikeBrand === "Other" && (
                  <div className="lead-field" style={{ gridColumn: "1 / -1" }}>
                    <label className="lead-label" htmlFor="inquiry-auto-other-brand">
                      Specify brand name <span style={{ color: "var(--red)" }}>*</span>
                    </label>
                    <input
                      className="lead-input"
                      id="inquiry-auto-other-brand"
                      name="otherBikeBrand"
                      type="text"
                      placeholder="Enter brand name"
                      value={autoValues.otherBikeBrand}
                      onChange={(e) => updateAuto("otherBikeBrand", e.target.value)}
                      aria-invalid={Boolean(errors.otherBikeBrand)}
                    />
                    {errors.otherBikeBrand && (
                      <p className="lead-error" role="alert">
                        {errors.otherBikeBrand}
                      </p>
                    )}
                  </div>
                )}

                {/* 5. Vehicle Model (Optional, filtered by brand) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-auto-model">
                    Vehicle model <span style={{ color: "var(--muted)" }}>(optional)</span>
                  </label>
                  {availableModels.length > 0 ? (
                    <select
                      className="lead-input"
                      id="inquiry-auto-model"
                      name="vehicleModel"
                      value={autoValues.vehicleModel}
                      onChange={(e) => updateAuto("vehicleModel", e.target.value)}
                    >
                      <option value="">Select a model</option>
                      {availableModels.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="lead-input"
                      id="inquiry-auto-model"
                      name="vehicleModel"
                      type="text"
                      placeholder="e.g. Splendor Plus, Activa, MT-15"
                      value={autoValues.vehicleModel}
                      onChange={(e) => updateAuto("vehicleModel", e.target.value)}
                    />
                  )}
                </div>

                {/* 6. Vehicle Type / Segment (Optional, distinct from brand/model) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-auto-type">
                    Vehicle type / segment <span style={{ color: "var(--muted)" }}>(optional)</span>
                  </label>
                  <select
                    className="lead-input"
                    id="inquiry-auto-type"
                    name="vehicleType"
                    value={autoValues.vehicleType}
                    onChange={(e) => updateAuto("vehicleType", e.target.value)}
                  >
                    <option value="">Select vehicle segment</option>
                    {VEHICLE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              /* GENERAL INQUIRY FORM */
              <div className="lead-grid">
                {/* 1. Full Name (Required) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-gen-name">
                    Full name <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    className="lead-input"
                    id="inquiry-gen-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="e.g. Aniket Thakur"
                    value={generalValues.fullName}
                    onChange={(e) => updateGeneral("fullName", e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? "inquiry-gen-name-err" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p className="lead-error" id="inquiry-gen-name-err" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. Phone Number (Required) */}
                <div className="lead-field">
                  <label className="lead-label" htmlFor="inquiry-gen-phone">
                    Phone number <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    className="lead-input"
                    id="inquiry-gen-phone"
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={generalValues.mobile}
                    onChange={(e) => updateGeneral("mobile", e.target.value)}
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={
                      errors.mobile ? "inquiry-gen-phone-err" : undefined
                    }
                  />
                  {errors.mobile && (
                    <p className="lead-error" id="inquiry-gen-phone-err" role="alert">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* 3. Searchable Service Required (Required) */}
                <div className="lead-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="lead-label" htmlFor="inquiry-gen-service">
                    Service required <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <div className="inquiry-service-search">
                    <input
                      type="text"
                      placeholder="🔍 Type to filter services list..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      aria-label="Filter service options"
                    />
                    <select
                      className="lead-input"
                      id="inquiry-gen-service"
                      name="service"
                      required
                      value={generalValues.service}
                      onChange={(e) => updateGeneral("service", e.target.value)}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={
                        errors.service ? "inquiry-gen-service-err" : undefined
                      }
                    >
                      <option value="">Select a service</option>
                      {filteredServices.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.service && (
                    <p className="lead-error" id="inquiry-gen-service-err" role="alert">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Optional description when 'Other' selected */}
                {generalValues.service === "Other" && (
                  <div className="lead-field" style={{ gridColumn: "1 / -1" }}>
                    <label className="lead-label" htmlFor="inquiry-gen-other">
                      Describe your requirement <span style={{ color: "var(--red)" }}>*</span>
                    </label>
                    <textarea
                      className="lead-input"
                      id="inquiry-gen-other"
                      name="otherService"
                      rows={3}
                      placeholder="Briefly describe what you are looking to build or solve..."
                      value={generalValues.otherService}
                      onChange={(e) => updateGeneral("otherService", e.target.value)}
                      aria-invalid={Boolean(errors.otherService)}
                    />
                    {errors.otherService && (
                      <p className="lead-error" role="alert">
                        {errors.otherService}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Privacy notice consent checkbox */}
            <div className="lead-consent" style={{ marginTop: 14 }}>
              <input
                id="inquiry-consent"
                name="consent"
                type="checkbox"
                required
                checked={
                  activeType === "automotive"
                    ? autoValues.consent
                    : generalValues.consent
                }
                onChange={(e) =>
                  activeType === "automotive"
                    ? updateAuto("consent", e.target.checked)
                    : updateGeneral("consent", e.target.checked)
                }
                aria-invalid={Boolean(errors.consent)}
              />
              <label htmlFor="inquiry-consent">
                I agree to be contacted regarding this inquiry and understand that my
                data is handled according to the{" "}
                <Link href="/privacy" target="_blank" rel="noreferrer">
                  privacy notice
                </Link>
                .
              </label>
              {errors.consent && (
                <p className="lead-error" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="lead-actions" style={{ marginTop: 20 }}>
              <button
                className="button button-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit Inquiry"}
              </button>
              <button
                className="button button-secondary"
                type="button"
                disabled={isSubmitting}
                onClick={closeInquiry}
              >
                Cancel
              </button>
              <a
                className="button button-secondary"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                Prefer WhatsApp ↗
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
