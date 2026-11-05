import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  getBlueprintForArticle,
  getFallbackForCategory,
  STOCK_BLUEPRINTS,
} from "../components/ArticleCardImage";

test("Writing Redesign: Stock Blueprint Mapping resolves accurate images", () => {
  // Electric scooter
  assert.equal(
    getBlueprintForArticle("Ather 450X vs Ola S1 Pro Comparison", "auto"),
    STOCK_BLUEPRINTS.electricScooter
  );
  assert.equal(
    getBlueprintForArticle("Electric Scooter Buying Guide India", "auto"),
    STOCK_BLUEPRINTS.electricScooter
  );

  // ICE & Urban Scooter
  assert.equal(
    getBlueprintForArticle("Honda Activa 125 vs TVS Jupiter 125", "auto"),
    STOCK_BLUEPRINTS.scooter
  );
  assert.equal(
    getBlueprintForArticle("Suzuki Access 125 Maintenance Costs", "auto"),
    STOCK_BLUEPRINTS.scooter
  );

  // Car & Automotive
  assert.equal(
    getBlueprintForArticle("ADAS in Indian Cars: ACC, AEB and Lane Assist", "auto"),
    STOCK_BLUEPRINTS.car
  );
  assert.equal(
    getBlueprintForArticle("Turbocharged vs Naturally Aspirated Engines", "auto"),
    STOCK_BLUEPRINTS.car
  );

  // Motorcycle & Roadster
  assert.equal(
    getBlueprintForArticle("10 Global Motorcycles After EICMA 2026", "auto"),
    STOCK_BLUEPRINTS.motorcycle
  );
  assert.equal(
    getBlueprintForArticle("Royal Enfield Himalayan 750 Analysis", "auto"),
    STOCK_BLUEPRINTS.motorcycle
  );

  // Non-automotive category should not map to vehicle blueprint
  assert.equal(
    getBlueprintForArticle("Building Agentic Coding Workflows", "technology"),
    null
  );
});

test("Writing Redesign: Stock blueprint files exist on disk", () => {
  const stockFiles = [
    "car-performance-blueprint.jpg",
    "electric-scooter-blueprint.jpg",
    "motorcycle-technical-blueprint.jpg",
    "scooter-architecture-blueprint.jpg",
  ];

  for (const file of stockFiles) {
    const publicPath = path.resolve(process.cwd(), "public/assets/images/stock", file);
    const rootPath = path.resolve(process.cwd(), "../../assets/images/stock", file);
    assert.ok(
      fs.existsSync(publicPath) || fs.existsSync(rootPath),
      `Missing stock blueprint file: ${file}`
    );
  }
});

test("Writing Redesign: CSS contains required 1280px container, typography targets & responsive breakpoints", () => {
  const css = fs.readFileSync(path.resolve(process.cwd(), "app/globals.css"), "utf8");

  // Container width
  assert.ok(
    css.includes("max-width: 1280px") && css.includes(".blog-page .container"),
    "globals.css must define 1280px max-width container for .blog-page"
  );

  // Grid breakpoints: 3 columns default, 2 columns <= 1199px, 1 column <= 768px
  assert.ok(
    css.includes("@media (max-width: 1199px)"),
    "globals.css must include 1199px breakpoint for tablet 2-column grid"
  );
  assert.ok(
    css.includes("@media (max-width: 768px)"),
    "globals.css must include 768px breakpoint for mobile 1-column grid"
  );

  // Typography clamp hierarchy
  assert.ok(
    css.includes(".article-card-title"),
    "globals.css must style .article-card-title"
  );
  assert.ok(
    css.includes(".article-card-desc"),
    "globals.css must style .article-card-desc"
  );
  assert.ok(
    css.includes(".spotlight-card") && css.includes(".spotlight-title"),
    "globals.css must style .spotlight-card and .spotlight-title"
  );
});
