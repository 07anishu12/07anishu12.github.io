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

export const STOCK_BLUEPRINTS = {
  electricScooter: "/assets/images/stock/electric-scooter-blueprint.jpg",
  scooter: "/assets/images/stock/scooter-architecture-blueprint.jpg",
  car: "/assets/images/stock/car-performance-blueprint.jpg",
  motorcycle: "/assets/images/stock/motorcycle-technical-blueprint.jpg",
};

export function getBlueprintForArticle(titleOrAlt: string = "", category: string = ""): string | null {
  const text = titleOrAlt.toLowerCase();
  const cat = category.toLowerCase().trim();

  // Electric scooter / EV mobility
  if (
    text.includes("electric scooter") ||
    text.includes("ev scooter") ||
    text.includes("e-scooter") ||
    text.includes("ather") ||
    text.includes("ola s1") ||
    text.includes("iqube") ||
    text.includes("river indie") ||
    text.includes("chetak electric") ||
    (text.includes("scooter") && text.includes("ev")) ||
    (text.includes("scooter") && text.includes("battery"))
  ) {
    return STOCK_BLUEPRINTS.electricScooter;
  }

  // ICE & Urban Scooter platforms
  if (
    text.includes("scooter") ||
    text.includes("activa") ||
    text.includes("jupiter") ||
    text.includes("access 125") ||
    text.includes("aerox") ||
    text.includes("burgman") ||
    text.includes("ntorq") ||
    text.includes("destini") ||
    text.includes("fascino") ||
    text.includes("rayzr") ||
    text.includes("dio 125")
  ) {
    return STOCK_BLUEPRINTS.scooter;
  }

  // Cars, sedans, SUVs, turbos, ADAS
  if (
    text.includes("car") ||
    text.includes("sedan") ||
    text.includes("suv") ||
    text.includes("turbo") ||
    text.includes("adas") ||
    text.includes("airbag") ||
    text.includes("hybrid") ||
    text.includes("torque") ||
    text.includes("creta") ||
    text.includes("seltos") ||
    text.includes("nexon") ||
    text.includes("brezza") ||
    text.includes("curvv") ||
    text.includes("thar") ||
    text.includes("scorpio") ||
    text.includes("xuv") ||
    text.includes("innova") ||
    text.includes("fortuner") ||
    text.includes("skoda") ||
    text.includes("volkswagen") ||
    text.includes("virtus") ||
    text.includes("slavia")
  ) {
    return STOCK_BLUEPRINTS.car;
  }

  // Motorcycles, bikes, roadsters, ADVs
  if (
    text.includes("motorcycle") ||
    text.includes("bike") ||
    text.includes("eicma") ||
    text.includes("royal enfield") ||
    text.includes("himalayan") ||
    text.includes("classic 350") ||
    text.includes("hunter 350") ||
    text.includes("bullet 350") ||
    text.includes("ktm") ||
    text.includes("duke") ||
    text.includes("rc ") ||
    text.includes("xpulse") ||
    text.includes("apache") ||
    text.includes("pulsar") ||
    text.includes("speed 400") ||
    text.includes("guerrilla") ||
    text.includes("bear 650") ||
    text.includes("interceptor") ||
    text.includes("kawasaki") ||
    text.includes("ninja") ||
    text.includes("yamaha") ||
    text.includes("triumph") ||
    text.includes("harley") ||
    text.includes("bmw motorrad") ||
    text.includes("ducati") ||
    text.includes("aprilia") ||
    cat === "auto"
  ) {
    return STOCK_BLUEPRINTS.motorcycle;
  }

  return null;
}

export function getFallbackForCategory(category?: string, titleOrAlt?: string): string {
  if (titleOrAlt) {
    const blueprint = getBlueprintForArticle(titleOrAlt, category);
    if (blueprint) return blueprint;
  }
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
  const blueprintMatch = getBlueprintForArticle(alt, category);
  const fallbackUrl = blueprintMatch || getFallbackForCategory(category, alt);
  const initialSrc = src && src.trim() ? src.trim() : fallbackUrl;

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Sync if src prop changes
  useEffect(() => {
    const nextFallback = blueprintMatch || getFallbackForCategory(category, alt);
    const nextSrc = src && src.trim() ? src.trim() : nextFallback;
    setCurrentSrc(nextSrc);
    setErrorCount(0);
  }, [src, fallbackUrl, blueprintMatch, category, alt]);

  const handleError = () => {
    if (errorCount === 0) {
      // First tier fallback: category stock blueprint or category branded SVG
      const tier1 = blueprintMatch || getFallbackForCategory(category, alt);
      setCurrentSrc(tier1 !== currentSrc ? tier1 : CATEGORY_FALLBACKS[category.toLowerCase()] || CATEGORY_FALLBACKS.default);
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Second tier fallback: universal branded SVG
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
