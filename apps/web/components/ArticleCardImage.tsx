"use client";

import React, { useState, useEffect } from "react";

export interface ArticleCardImageProps {
  src?: string;
  alt: string;
  category?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  auto: "/assets/images/fallback/fallback-auto.svg",
  technology: "/assets/images/fallback/fallback-technology.svg",
  finance: "/assets/images/fallback/fallback-finance.svg",
  product: "/assets/images/fallback/fallback-product.svg",
  default: "/assets/images/fallback/fallback-default.svg",
};

export function getFallbackForCategory(category?: string): string {
  if (!category) return CATEGORY_FALLBACKS.default;
  const key = category.toLowerCase().trim();
  return CATEGORY_FALLBACKS[key] || CATEGORY_FALLBACKS.default;
}

export function ArticleCardImage({
  src,
  alt,
  category = "auto",
  priority = false,
  className = "article-card-cover",
  width = 1200,
  height = 675,
}: ArticleCardImageProps) {
  const fallbackUrl = getFallbackForCategory(category);
  const initialSrc = src && src.trim() ? src.trim() : fallbackUrl;

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Sync if src prop changes
  useEffect(() => {
    const nextSrc = src && src.trim() ? src.trim() : fallbackUrl;
    setCurrentSrc(nextSrc);
    setErrorCount(0);
  }, [src, fallbackUrl]);

  const handleError = () => {
    if (errorCount === 0) {
      // First fallback: category-specific branded SVG
      setCurrentSrc(fallbackUrl);
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Second fallback: universal branded SVG
      setCurrentSrc(CATEGORY_FALLBACKS.default);
      setErrorCount(2);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className="article-card-image-container"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        backgroundColor: "#FAF9F6",
      }}
    >
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.2s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: isLoaded ? 1 : 0.9,
        }}
      />
    </div>
  );
}
