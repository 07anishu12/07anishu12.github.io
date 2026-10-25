"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { isAutomotiveRoute, useInquiry, InquiryOptions } from "./InquiryContext";

interface Props {
  className?: string;
  category?: string;
  sourceSlug?: string;
  prefill?: InquiryOptions["prefill"];
  labelOverride?: string;
  children?: React.ReactNode;
}

export function InquiryButton({
  className = "button button-primary",
  category,
  sourceSlug,
  prefill,
  labelOverride,
  children,
}: Props) {
  const pathname = usePathname() || "/";
  const { openInquiry } = useInquiry();

  const isAuto = isAutomotiveRoute(pathname, category);
  const defaultLabel = isAuto ? "Check Your Offer" : "Inquiry";
  const label = labelOverride || defaultLabel;

  const handleClick = () => {
    openInquiry({
      category,
      sourceSlug,
      prefill,
      type: isAuto ? "automotive" : "general",
    });
  };

  return (
    <button
      className={className}
      type="button"
      onClick={handleClick}
      aria-label={`Open ${label} dialog`}
      data-inquiry-button="true"
    >
      {children || label}
    </button>
  );
}
