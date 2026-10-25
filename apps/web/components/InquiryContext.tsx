"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

export type InquiryType = "automotive" | "general";

export interface InquiryOptions {
  type?: InquiryType;
  category?: string;
  sourceSlug?: string;
  prefill?: {
    brand?: string;
    model?: string;
    vehicleType?: string;
    service?: string;
    fullName?: string;
    mobile?: string;
    pinCode?: string;
  };
}

interface InquiryContextValue {
  isOpen: boolean;
  activeType: InquiryType;
  options: InquiryOptions;
  openInquiry: (options?: InquiryOptions) => void;
  closeInquiry: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function isAutomotiveRoute(pathname: string, category?: string): boolean {
  if (category === "auto") return true;
  if (category === "finance" && /(bike|scooter|two-wheeler)/.test(pathname))
    return true;
  if (pathname.startsWith("/blog/auto") || pathname === "/finance/bikes")
    return true;
  return false;
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<InquiryOptions>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Automatically determine if the current page or requested options represent automotive
  const activeType: InquiryType =
    options.type ??
    (isAutomotiveRoute(pathname, options.category) ? "automotive" : "general");

  const openInquiry = useCallback((newOptions: InquiryOptions = {}) => {
    lastActiveElement.current = document.activeElement as HTMLElement | null;
    setOptions(newOptions);
    setIsOpen(true);

    // Track modal open in Google Analytics (without PII)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "enquiry_modal_open", {
        form_type: newOptions.type || "auto_detected",
        page_path: window.location.pathname,
      });
    }
  }, []);

  const closeInquiry = useCallback(() => {
    if (isSubmitting) return; // Prevent accidental closure while saving
    setIsOpen(false);
    setOptions({});

    // Restore focus to triggering element
    setTimeout(() => {
      if (lastActiveElement.current && lastActiveElement.current.focus) {
        lastActiveElement.current.focus();
      }
    }, 50);
  }, [isSubmitting]);

  // Support global custom events and data-attribute click delegation
  useEffect(() => {
    const handleGlobalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<InquiryOptions>;
      openInquiry(customEvent.detail || {});
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "[data-inquiry-trigger], [data-open-inquiry]",
      ) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      const type = (target.dataset.inquiryType as InquiryType) || undefined;
      const brand = target.dataset.inquiryBrand;
      const model = target.dataset.inquiryModel;
      const vehicleType = target.dataset.inquiryVehicleType;
      const service = target.dataset.inquiryService;
      openInquiry({
        type,
        prefill: { brand, model, vehicleType, service },
      });
    };

    window.addEventListener("open-inquiry", handleGlobalOpen as EventListener);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener(
        "open-inquiry",
        handleGlobalOpen as EventListener,
      );
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [openInquiry]);

  // Manage body scroll lock and inert state on background when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const siteShell = document.querySelector(".site-shell");
      if (siteShell) {
        siteShell.setAttribute("aria-hidden", "true");
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        if (siteShell) {
          siteShell.removeAttribute("aria-hidden");
        }
      };
    }
  }, [isOpen]);

  return (
    <InquiryContext.Provider
      value={{
        isOpen,
        activeType,
        options,
        openInquiry,
        closeInquiry,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
