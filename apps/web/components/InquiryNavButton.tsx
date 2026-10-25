"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { isAutomotiveRoute, useInquiry } from "./InquiryContext";

export function InquiryNavButton() {
  const pathname = usePathname() || "/";
  const { openInquiry } = useInquiry();

  const isAuto = isAutomotiveRoute(pathname);
  const label = isAuto ? "Check Your Offer" : "Inquiry";

  return (
    <button
      className="nav-cta"
      type="button"
      onClick={() => openInquiry()}
      aria-label={`Open ${label} dialog`}
      data-inquiry-nav-trigger="true"
    >
      <span className="nav-cta-text">{label}</span>
    </button>
  );
}
