"use client";

import dynamic from "next/dynamic";
import { useInquiry } from "./InquiryContext";

const InquiryModal = dynamic(
  () => import("./InquiryModal").then((mod) => mod.InquiryModal),
  { ssr: false },
);

export function InquiryModalLazy() {
  const { isOpen } = useInquiry();
  if (!isOpen) return null;
  return <InquiryModal />;
}
