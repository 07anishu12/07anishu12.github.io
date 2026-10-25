"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InquiryNavButton } from "./InquiryNavButton";
import { isAutomotiveRoute, useInquiry } from "./InquiryContext";

interface NavItem {
  label: string;
  href: string;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", exact: true },
  { label: "About", href: "/about/" },
  { label: "Work", href: "/work/" },
  { label: "Projects", href: "/projects/" },
  { label: "Research", href: "/research/" },
  { label: "Writing", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "/";
  const { openInquiry } = useInquiry();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isAuto = isAutomotiveRoute(pathname);
  const inquiryLabel = isAuto ? "Check Your Offer" : "Inquiry";

  // Automatically close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll and handle keyboard accessibility (Escape, Focus trap)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus close button on open
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsOpen(false);
          menuButtonRef.current?.focus();
          return;
        }

        if (e.key === "Tab" && drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (focusables.length === 0) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  };

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/" aria-label="Aniket Thakur home">
          <strong>Aniket Thakur</strong>
          <span>AI × Product × Finance</span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="nav-links desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item) ? "active-link" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Cluster */}
        <div className="header-actions">
          <InquiryNavButton />

          {/* Accessible Mobile Menu Toggle Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-dialog"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={toggleMenu}
          >
            {isOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer Backdrop */}
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Accessible Mobile Navigation Drawer Sheet */}
      <div
        id="mobile-nav-dialog"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`mobile-nav-drawer ${isOpen ? "drawer-open" : ""}`}
      >
        <div className="mobile-drawer-header">
          <Link
            className="brand drawer-brand"
            href="/"
            onClick={closeMenu}
            aria-label="Aniket Thakur home"
          >
            <strong>Aniket Thakur</strong>
            <span>AI × Product × Finance</span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-drawer-close"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer-nav" aria-label="Mobile navigation links">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-drawer-link ${active ? "mobile-link-active" : ""}`}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
              >
                <span className="mobile-link-label">{item.label}</span>
                <svg
                  className="mobile-link-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="mobile-drawer-cta button button-primary"
            onClick={() => {
              closeMenu();
              openInquiry();
            }}
          >
            {inquiryLabel} →
          </button>
          <div className="mobile-drawer-contact">
            <a
              href="mailto:kumaraniketn@gmail.com"
              className="drawer-contact-link"
              onClick={closeMenu}
            >
              kumaraniketn@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
