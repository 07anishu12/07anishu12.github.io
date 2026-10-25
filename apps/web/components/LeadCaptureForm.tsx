"use client";

import { FormEvent, useRef, useState } from "react";

import { API_URL, whatsappHref } from "../lib/contact";

const DEFAULT_BRANDS = [
  "Hero",
  "Honda",
  "TVS",
  "Bajaj",
  "Yamaha",
  "Royal Enfield",
  "Suzuki",
  "KTM",
  "Ola Electric",
  "Ather",
  "Vida",
  "Ampere",
  "Other",
];

type FormValues = {
  fullName: string;
  pinCode: string;
  mobile: string;
  bikeBrand: string;
  otherBikeBrand: string;
  consent: boolean;
  website: string;
};

type Props = {
  brands?: string[];
  source?: string;
  campaign?: string;
};

const initialValues: FormValues = {
  fullName: "",
  pinCode: "",
  mobile: "",
  bikeBrand: "",
  otherBikeBrand: "",
  consent: false,
  website: "",
};

const mobilePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;
const pinPattern = /^[1-9]\d{5}$/;

export function LeadCaptureForm({
  brands = DEFAULT_BRANDS,
  source,
  campaign,
}: Props) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const token = useRef<string | null>(null);
  const [received, setReceived] = useState(false);

  const update = (name: keyof FormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (values.fullName.trim().length < 2)
      next.fullName = "Enter your full name.";
    if (!pinPattern.test(values.pinCode.trim()))
      next.pinCode = "Enter a six-digit PIN code.";
    if (!mobilePattern.test(values.mobile.trim()))
      next.mobile = "Enter a valid Indian mobile number.";
    if (!values.bikeBrand) next.bikeBrand = "Choose a bike brand.";
    if (values.bikeBrand === "Other" && values.otherBikeBrand.trim().length < 2)
      next.otherBikeBrand = "Tell me the brand you have in mind.";
    if (!values.consent) next.consent = "Please agree to the privacy notice.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || !validate()) {
      if (!submitting) setStatus("Please correct the highlighted fields.");
      return;
    }
    setSubmitting(true);
    setStatus("Sending your enquiry…");
    try {
      const endpoint = API_URL ? API_URL.replace(/\/$/, "") : "";
      if (!token.current) {
        const result = await fetch(`${endpoint}/api/v1/leads/token/`, {
          cache: "no-store",
        });
        const data = await result.json();
        if (!result.ok || typeof data.submissionToken !== "string")
          throw new Error(
            data?.error?.message ||
              "The enquiry service is unavailable. Please try again or use WhatsApp.",
          );
        token.current = data.submissionToken;
      }
      const response = await fetch(`${endpoint}/api/v1/leads/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          enquiryType: "automotive",
          submissionToken: token.current,
          sourcePath: window.location.pathname,
          articleSlug:
            source && !["contact", "bike-finance"].includes(source)
              ? source
              : undefined,
          pageCategory: campaign || "auto",
          fullName: values.fullName.trim(),
          pinCode: values.pinCode.trim(),
          mobile: values.mobile.trim(),
          bikeBrand: values.bikeBrand,
          otherBikeBrand:
            values.bikeBrand === "Other"
              ? values.otherBikeBrand.trim()
              : undefined,
          consent: values.consent,
          website: values.website,
          formStartedAt: startedAt,
          clientContext: { campaign: "bike-finance" },
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (payload?.error?.code === "INVALID_SUBMISSION_TOKEN")
        token.current = null;
      if (
        !response.ok ||
        payload.ok !== true ||
        typeof payload.leadId !== "string"
      )
        throw new Error(
          payload?.error?.message || "The enquiry could not be sent.",
        );
      setValues(initialValues);
      setReceived(true);
      setStatus(
        `Your enquiry is saved. Reference: ${payload.leadId}. Follow-up notifications may still be pending.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error && error.message.includes("Failed to fetch")
          ? "The enquiry service is unavailable right now. Please use WhatsApp instead."
          : error instanceof Error
            ? error.message
            : "The enquiry could not be sent. Please use WhatsApp instead.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    name: keyof FormValues,
    label: string,
    input: React.ReactNode,
  ) => (
    <div className="lead-field">
      <label className="lead-label" htmlFor={`lead-${name}`}>
        {label}
      </label>
      {input}
      <p className="lead-error" id={`lead-${name}-error`} role="alert">
        {errors[name]}
      </p>
    </div>
  );

  return (
    <form
      className="lead-form"
      data-lead-form
      onSubmit={submit}
      noValidate
      aria-busy={submitting}
    >
      <div className="lead-grid">
        {field(
          "fullName",
          "Full name",
          <input
            className="lead-input"
            id="lead-fullName"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby="lead-fullName-error"
          />,
        )}
        {field(
          "pinCode",
          "Indian PIN code",
          <input
            className="lead-input"
            id="lead-pinCode"
            name="pinCode"
            inputMode="numeric"
            autoComplete="postal-code"
            value={values.pinCode}
            onChange={(event) =>
              update(
                "pinCode",
                event.target.value.replace(/\D/g, "").slice(0, 6),
              )
            }
            aria-invalid={Boolean(errors.pinCode)}
            aria-describedby="lead-pinCode-error"
          />,
        )}
        {field(
          "mobile",
          "Mobile number",
          <input
            className="lead-input"
            id="lead-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.mobile}
            onChange={(event) => update("mobile", event.target.value)}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby="lead-mobile-error"
          />,
        )}
        {field(
          "bikeBrand",
          "Bike brand preference",
          <select
            className="lead-input"
            id="lead-bikeBrand"
            name="bikeBrand"
            value={values.bikeBrand}
            onChange={(event) => update("bikeBrand", event.target.value)}
            aria-invalid={Boolean(errors.bikeBrand)}
            aria-describedby="lead-bikeBrand-error"
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>,
        )}
        {values.bikeBrand === "Other" &&
          field(
            "otherBikeBrand",
            "Other brand",
            <input
              className="lead-input"
              id="lead-otherBikeBrand"
              name="otherBikeBrand"
              value={values.otherBikeBrand}
              onChange={(event) => update("otherBikeBrand", event.target.value)}
              aria-invalid={Boolean(errors.otherBikeBrand)}
              aria-describedby="lead-otherBikeBrand-error"
            />,
          )}
      </div>
      <div className="lead-honeypot" aria-hidden="true">
        <label>
          Leave this field blank{" "}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>
      <div className="lead-consent">
        <input
          id="lead-consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(event) => update("consent", event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby="lead-consent-error"
        />
        <label htmlFor="lead-consent">
          I agree to be contacted about this enquiry and have read the{" "}
          <a href="/privacy">privacy notice</a>.
        </label>
        <p className="lead-error" id="lead-consent-error" role="alert">
          {errors.consent}
        </p>
      </div>
      <div className="lead-actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={submitting || received}
        >
          {received
            ? "Inquiry received"
            : submitting
              ? "Submitting…"
              : "Submit Inquiry"}
        </button>
        {received && (
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              token.current = null;
              setReceived(false);
              setStatus("");
              setStartedAt(Date.now());
            }}
          >
            Start a new enquiry
          </button>
        )}
        <a
          className="button button-secondary"
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
        >
          Prefer WhatsApp ↗
        </a>
      </div>
      <p className="lead-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
