"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { isAutomotiveRoute, useInquiry } from "./InquiryContext";

export function InquiryFloatingTrigger() {
  const pathname = usePathname() || "/";
  const { openInquiry, isOpen } = useInquiry();

  // Hide floating trigger when modal is open
  if (isOpen) return null;

  const isAuto = isAutomotiveRoute(pathname);
  const label = isAuto ? "Check Your Offer" : "Inquiry";

  return (
    <button
      className="inquiry-floating-trigger"
      type="button"
      onClick={() => openInquiry()}
      aria-label={`Open ${label} dialog`}
      data-inquiry-floating-trigger="true"
    >
      <span aria-hidden="true">{isAuto ? "⚡" : "💬"}</span>
      <span>{label}</span>
    </button>
  );
}
