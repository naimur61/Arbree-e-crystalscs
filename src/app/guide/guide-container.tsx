/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/* ══════════════════════════════════════════════════════════════
   DESIGN GUIDE — Interactive color & typography reference
   All data sourced dynamically from global CSS and theme.config.ts
   ══════════════════════════════════════════════════════════════ */

import { Typography } from "@/components/common/Typography/Typography";
import { themeConfig } from "@/lib/theme/theme.config";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────

interface ColorCardData {
  name: string;
  cssVar: string;
  className: string;
  value: string;
}

// ─── Known tailwind color families for palette discovery ─────

const TAILWIND_FAMILIES = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "bw",
  "alpha-light",
  "alpha-dark",
];

const SHADES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
  "1000",
  "00",
];
const NAMED_SHADES = ["white", "black", "transparent"];

// ─── Static counters (no DOM dependency at all) ────────────────
// Tailwind v4's @theme inline variables are NOT available as
// runtime CSS custom properties, so we always use static counts.

/** Total semantic color entries across all categories */
const TOTAL_SEMANTIC_COLORS = Object.values(themeConfig.colors).reduce<number>(
  (sum, g) => sum + Object.keys(g).length,
  0,
);

/** Known semantic variable count per category */
const BG_COUNT = Object.keys(themeConfig.colors.bg).length;
const TEXT_COUNT = Object.keys(themeConfig.colors.text).length;
const ICON_COUNT = Object.keys(themeConfig.colors.icon).length;
const BORDER_COUNT = Object.keys(themeConfig.colors.border).length;

/** Tailwind color families excluding meta families */
const REGULAR_TAILWIND_FAMILIES = TAILWIND_FAMILIES.filter(
  (f) => f !== "bw" && !f.startsWith("alpha-"),
);
const TAILWIND_FAMILIES_COUNT = REGULAR_TAILWIND_FAMILIES.length;

/** Known shade count per regular family (from globals.css) */
const SHADES_PER_FAMILY = 11; // 50-950

/** Total expected tailwind palette colors (approximate) */
const EXPECTED_TAILWIND_TOTAL = TAILWIND_FAMILIES_COUNT * SHADES_PER_FAMILY + 3; // 3 for bw (white, black, transparent)

/** Alpha family count (from globals.css) */
const EXPECTED_ALPHA_COUNT = 24; // alpha-light 50-1000+00 + alpha-dark 50-1000+00

// ─── Helpers ──────────────────────────────────────────────────

function camelToTitle(camel: string): string {
  return camel
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/Hover/g, " Hover")
    .trim();
}

function configKeyToCssVar(group: string, camelKey: string): string {
  const kebab = camelKey
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
  return `--${group}-${kebab}`;
}

// ─── DOM reading helpers (only meaningful on client) ──────────

function readCSSVar(varName: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

// ─── Hook: mounted check for client-only data ─────────────────

function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// ─── Hook: read CSS variables once after mount + watch dark mode ─

function useCSSVarMap(varNames: string[]): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    const read = () => {
      const next: Record<string, string> = {};
      for (const v of varNames) {
        next[v] = readCSSVar(v);
      }
      return next;
    };

    setValues(read());

    const observer = new MutationObserver(() => setValues(read()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => observer.disconnect();
  }, [mounted, varNames.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  return values;
}

// ─── Build color card data ────────────────────────────────────

function buildCards(
  group: Record<string, string>,
  groupType: string,
  varMap: Record<string, string>,
  mounted: boolean,
): ColorCardData[] {
  return Object.entries(group).map(([key, className]) => {
    const name = camelToTitle(key);
    const cssVar = configKeyToCssVar(groupType, key);
    const value = varMap[cssVar] || (mounted ? readCSSVar(cssVar) : "");
    return { name, cssVar, className, value };
  });
}

// ─── Icon component for icon color cards ──────────────────────

function SampleIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// COLOR CARD GRID COMPONENT — click any card to copy its class
// ═══════════════════════════════════════════════════════════════

function ColorGrid({
  cards,
  type,
}: {
  cards: ColorCardData[];
  type: "bg" | "text" | "icon" | "border";
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (className: string, cssVar: string) => {
    try {
      await navigator.clipboard.writeText(className);
      setCopiedKey(cssVar);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = className;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedKey(cssVar);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const isCopied = copiedKey === card.cssVar;
        return (
          <button
            key={card.cssVar}
            type="button"
            onClick={() => handleCopy(card.className, card.cssVar)}
            className="p-4 space-y-3 rounded-xl border transition-all duration-200 hover:shadow-md group border-border bg-background hover:border-accent-primary/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-left w-full"
            title={`Click to copy "${card.className}"`}
          >
            {/* Color swatch */}
            <div className="space-y-1">
              <div
                className="w-full h-10 rounded-lg border transition-transform border-border shrink-0 group-hover:scale-[1.02]"
                style={{ backgroundColor: card.value || "transparent" }}
              />
              <p className="font-mono text-[10px] text-tertiary truncate">
                {card.value || "—"}
              </p>
            </div>

            {/* Info row */}
            <div className="space-y-1.5">
              {/* Name + preview icon */}
              <div className="flex gap-2 items-center">
                {type === "icon" && <SampleIcon className={card.className} />}
                <p className="text-sm font-semibold text-primary truncate">
                  {card.name}
                </p>
              </div>
              {/* CSS variable */}
              <code className="block font-mono text-[11px] text-tertiary truncate">
                {card.cssVar}
              </code>
              {/* Tailwind class with copy feedback */}
              <div className="relative">
                <code
                  className={`inline-block py-0.5 px-1.5 font-mono rounded text-[11px] transition-all duration-200 ${
                    isCopied
                      ? "bg-accent-primary text-accent-primary scale-105"
                      : "bg-tertiary text-secondary"
                  }`}
                >
                  {isCopied ? "Copied!" : card.className}
                </code>
                {/* Copy hint on hover */}
                <span className="ml-1.5 text-[10px] text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                  click to copy
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-6 scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight font-heading text-primary">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// OVERVIEW STAT CARD
// ═══════════════════════════════════════════════════════════════

function StatCard({
  value,
  label,
  sublabel,
  colorClass,
}: {
  value: string | number;
  label: string;
  sublabel: string;
  colorClass: string;
}) {
  return (
    <div className="p-4 space-y-1 rounded-xl border border-border bg-background">
      <p className={`text-3xl font-extrabold ${colorClass}`}>{value}</p>
      <p className="text-sm text-secondary">{label}</p>
      <p className="text-xs text-tertiary">{sublabel}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN GUIDE PAGE
// ═══════════════════════════════════════════════════════════════

export default function GuideContainer() {
  const mounted = useMounted();

  // Collect the CSS variable names for all semantic entries
  // NOTE: --color-* Tailwind v4 theme vars are NOT available at runtime,
  // so we only read semantic CSS vars (--bg-*, --text-*, --icon-*, --border-*).
  const allSemanticVarNames = Object.entries(themeConfig.colors).flatMap(
    ([group, entries]) =>
      Object.keys(entries).map((key) => configKeyToCssVar(group, key)),
  );

  const cssVarMap = useCSSVarMap(allSemanticVarNames);

  // Build card data for each category
  const bgCards = buildCards(themeConfig.colors.bg, "bg", cssVarMap, mounted);
  const textCards = buildCards(
    themeConfig.colors.text,
    "text",
    cssVarMap,
    mounted,
  );
  const iconCards = buildCards(
    themeConfig.colors.icon,
    "icon",
    cssVarMap,
    mounted,
  );
  const borderCards = buildCards(
    themeConfig.colors.border,
    "border",
    cssVarMap,
    mounted,
  );

  // ── Overview counts (ALL static — avoids runtime CSS variable gaps) ──

  const validBgCount = bgCards.filter((c) => c.value).length;
  const validTextCount = textCards.filter((c) => c.value).length;
  const validIconCount = iconCards.filter((c) => c.value).length;
  const validBorderCount = borderCards.filter((c) => c.value).length;
  const semanticTotal =
    validBgCount + validTextCount + validIconCount + validBorderCount;

  // Shade-only families (exclude bw, alpha-*)
  const shadeFamilyCount = REGULAR_TAILWIND_FAMILIES.length;

  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 mx-auto space-y-16 max-w-6xl sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent-primary">
            Design System
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight font-heading text-primary">
            E-Crystal Guide
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-secondary">
            Complete reference for every color, typography token, spacing unit,
            and utility class in the E-Crystal design system. Toggle dark mode
            to see how every token adapts.
          </p>
        </header>

        {/* ── Color Palette Overview ── */}
        <section className="p-6 space-y-4 rounded-2xl border border-border bg-secondary">
          <h2 className="text-lg font-bold font-heading text-primary">
            📊 Color Palette Overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              value={EXPECTED_TAILWIND_TOTAL}
              label="Total Colors in Tailwind Palette"
              sublabel={`${TAILWIND_FAMILIES_COUNT} color families`}
              colorClass="text-accent-primary"
            />
            <StatCard
              value={semanticTotal || TOTAL_SEMANTIC_COLORS}
              label="Semantic Colors in Global CSS"
              sublabel={`${validBgCount || BG_COUNT} bg, ${validTextCount || TEXT_COUNT} text, ${validIconCount || ICON_COUNT} icon, ${validBorderCount || BORDER_COUNT} border`}
              colorClass="text-info-primary"
            />
            <StatCard
              value={EXPECTED_TAILWIND_TOTAL - 3}
              label="Color Shades from Tailwind"
              sublabel={`${shadeFamilyCount} families × ${SHADES_PER_FAMILY} shades each`}
              colorClass="text-success-primary"
            />
            <StatCard
              value={EXPECTED_ALPHA_COUNT}
              label="Alpha / Overlay Colors"
              sublabel="With transparency"
              colorClass="text-warning-primary"
            />
          </div>
          <details className="text-sm">
            <summary className="font-semibold cursor-pointer text-secondary hover:text-primary">
              View all {TAILWIND_FAMILIES_COUNT} Tailwind color families →
            </summary>
            <div className="grid grid-cols-2 gap-2 mt-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {TAILWIND_FAMILIES.map((f) => (
                <code
                  key={f}
                  className="py-1 px-2 text-xs rounded bg-tertiary text-primary"
                >
                  {f} (
                  {f === "bw"
                    ? 3
                    : f.startsWith("alpha-")
                      ? 12
                      : SHADES_PER_FAMILY}
                  )
                </code>
              ))}
            </div>
          </details>
        </section>

        {/* ── Table of Contents ── */}
        <nav className="p-6 rounded-2xl border border-border bg-secondary">
          <h2 className="mb-4 text-lg font-bold font-heading text-primary">
            Table of Contents
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["colors-background", "Background Colors"],
              ["colors-text", "Text Colors"],
              ["colors-icon", "Icon Colors"],
              ["colors-border", "Border Colors"],
              ["tailwind-used", "Tailwind Color Palette"],
              ["typography", "Typography Scale"],
              ["typography-component", "Typography Component"],
              ["fonts", "Fonts"],
              ["weights", "Font Weights"],
              ["radius", "Border Radius"],
              ["shadcn", "Shadcn Tokens"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block py-2 px-3 text-sm font-medium rounded-lg transition-colors text-secondary hover:bg-tertiary hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ════════════════════════════════════════════════════════
            BACKGROUND COLORS — Card Grid
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-background" title="Background Colors">
          <p className="text-sm text-secondary">
            Utility:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              bg-&lt;color&gt;
            </code>
          </p>
          <ColorGrid cards={bgCards} type="bg" />
        </Section>

        {/* ════════════════════════════════════════════════════════
            TEXT COLORS — Card Grid
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-text" title="Text Colors">
          <p className="text-sm text-secondary">
            Utility:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              text-&lt;color&gt;
            </code>
          </p>
          <ColorGrid cards={textCards} type="text" />
        </Section>

        {/* ════════════════════════════════════════════════════════
            ICON COLORS — Card Grid with sample icons
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-icon" title="Icon Colors">
          <p className="text-sm text-secondary">
            Utility:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              icon-&lt;color&gt;
            </code>{" "}
            — sets both{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              color
            </code>{" "}
            and{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              fill
            </code>
            .
          </p>
          <ColorGrid cards={iconCards} type="icon" />
        </Section>

        {/* ════════════════════════════════════════════════════════
            BORDER COLORS — Card Grid
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-border" title="Border Colors">
          <p className="text-sm text-secondary">
            Utility:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              border-&lt;color&gt;
            </code>
          </p>
          <ColorGrid cards={borderCards} type="border" />
        </Section>

        {/* ════════════════════════════════════════════════════════
            TAILWIND COLOR PALETTE (static overview by family)
            Tailwind v4's @theme inline transforms these at build time,
            so the --color-* variables are NOT available at runtime.
            ════════════════════════════════════════════════════════ */}
        <Section id="tailwind-used" title="Full Tailwind Color Palette">
          <p className="text-sm text-secondary">
            All{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              {EXPECTED_TAILWIND_TOTAL}
            </code>{" "}
            colors defined as{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              --color-*
            </code>{" "}
            variables in{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              @theme inline
            </code>
            .
          </p>
          <p className="text-xs text-tertiary">
            These are processed at build time by Tailwind v4. Use the semantic
            color sections above for live light/dark preview.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TAILWIND_FAMILIES.map((family) => {
              const isBw = family === "bw";
              const shadeCount = isBw ? NAMED_SHADES.length : SHADES.length;
              return (
                <div
                  key={family}
                  className="p-3 space-y-1 rounded-xl border border-border bg-background"
                >
                  <p className="text-sm font-bold capitalize text-primary">
                    {family}
                  </p>
                  <p className="text-xs text-secondary">
                    {shadeCount} shade{shadeCount > 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-0.5">
                    {Array.from({ length: Math.min(shadeCount, 8) }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-sm bg-tertiary/60"
                          title={`${family}-${isBw ? NAMED_SHADES[i] : SHADES[i]}`}
                        />
                      ),
                    )}
                    {shadeCount > 8 && (
                      <span className="text-[10px] text-tertiary">
                        +{shadeCount - 8}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            TYPOGRAPHY SCALE
            ════════════════════════════════════════════════════════ */}
        <Section id="typography" title="Typography Scale">
          <p className="text-sm text-secondary">
            Each token is defined as CSS variables:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              --type-[name]-size
            </code>
            ,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              --type-[name]-lh
            </code>
            ,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              --type-[name]-ls
            </code>
            .
          </p>
          <div className="space-y-3">
            {[
              {
                name: "Title 1",
                size: "--type-title-1-size",
                lh: "--type-title-1-lh",
                ls: "--type-title-1-ls",
                sample: "72px / 88px",
              },
              {
                name: "Title 2",
                size: "--type-title-2-size",
                lh: "--type-title-2-lh",
                ls: "--type-title-2-ls",
                sample: "64px / 76px",
              },
              {
                name: "Title 3",
                size: "--type-title-3-size",
                lh: "--type-title-3-lh",
                ls: "--type-title-3-ls",
                sample: "56px / 68px",
              },
              {
                name: "H1",
                size: "--type-h1-size",
                lh: "--type-h1-lh",
                ls: "--type-h1-ls",
                sample: "56px / 68px",
              },
              {
                name: "H2",
                size: "--type-h2-size",
                lh: "--type-h2-lh",
                ls: "--type-h2-ls",
                sample: "48px / 58px",
              },
              {
                name: "H3",
                size: "--type-h3-size",
                lh: "--type-h3-lh",
                ls: "--type-h3-ls",
                sample: "40px / 48px",
              },
              {
                name: "H4",
                size: "--type-h4-size",
                lh: "--type-h4-lh",
                ls: "--type-h4-ls",
                sample: "32px / 38px",
              },
              {
                name: "H5",
                size: "--type-h5-size",
                lh: "--type-h5-lh",
                ls: "--type-h5-ls",
                sample: "24px / 30px",
              },
              {
                name: "H6",
                size: "--type-h6-size",
                lh: "--type-h6-lh",
                ls: "--type-h6-ls",
                sample: "20px / 24px",
              },
              {
                name: "Label 1",
                size: "--type-label-1-size",
                lh: "--type-label-1-lh",
                ls: "--type-label-1-ls",
                sample: "16px / 22px",
              },
              {
                name: "Label 2",
                size: "--type-label-2-size",
                lh: "--type-label-2-lh",
                ls: "--type-label-2-ls",
                sample: "14px / 20px",
              },
              {
                name: "Label 3",
                size: "--type-label-3-size",
                lh: "--type-label-3-lh",
                ls: "--type-label-3-ls",
                sample: "12px / 16px",
              },
              {
                name: "Body 1",
                size: "--type-body-1-size",
                lh: "--type-body-1-lh",
                ls: "--type-body-1-ls",
                sample: "18px / 28px",
              },
              {
                name: "Body 2",
                size: "--type-body-2-size",
                lh: "--type-body-2-lh",
                ls: "--type-body-2-ls",
                sample: "16px / 24px",
              },
              {
                name: "Body 3",
                size: "--type-body-3-size",
                lh: "--type-body-3-lh",
                ls: "--type-body-3-ls",
                sample: "14px / 20px",
              },
              {
                name: "Body 4",
                size: "--type-body-4-size",
                lh: "--type-body-4-lh",
                ls: "--type-body-4-ls",
                sample: "12px / 16px",
              },
              {
                name: "Caption 1",
                size: "--type-caption-1-size",
                lh: "--type-caption-1-lh",
                ls: "--type-caption-1-ls",
                sample: "10px / 12px",
              },
              {
                name: "Caption 2",
                size: "--type-caption-2-size",
                lh: "--type-caption-2-lh",
                ls: "--type-caption-2-ls",
                sample: "9px / 10px",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-2 p-4 rounded-xl border sm:flex-row sm:gap-6 sm:items-baseline border-border bg-background"
              >
                <span className="w-24 text-sm font-semibold shrink-0 text-primary">
                  {t.name}
                </span>
                <span
                  className="flex-1 truncate text-primary"
                  style={{
                    fontSize: `var(${t.size})`,
                    lineHeight: `var(${t.lh})`,
                    letterSpacing: `var(${t.ls})`,
                  }}
                >
                  The quick brown fox
                </span>
                <span className="text-xs shrink-0 text-tertiary">
                  {t.sample}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            TYPOGRAPHY COMPONENT — Usage Guide
            ════════════════════════════════════════════════════════ */}
        <Section id="typography-component" title="Typography Component">
          <p className="text-sm text-secondary">
            Use the{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              &lt;Typography&gt;
            </code>{" "}
            component to render text with consistent design tokens. Pick a{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              variant
            </code>{" "}
            and{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              level
            </code>
            , optionally override the HTML element with{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              as
            </code>
            , and adjust the weight with{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              weight
            </code>
            .
          </p>

          {/* ── Props Table ── */}
          <div className="p-4 space-y-3 rounded-xl border border-border bg-background">
            <p className="text-sm font-bold text-primary">Props API</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-semibold text-left text-secondary">
                      Prop
                    </th>
                    <th className="py-2 pr-4 font-semibold text-left text-secondary">
                      Type
                    </th>
                    <th className="py-2 font-semibold text-left text-secondary">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent-primary">
                      variant
                    </td>
                    <td className="py-2 pr-4 text-secondary">
                      <code>title | heading | body | label | caption</code>
                    </td>
                    <td className="py-2 text-secondary">
                      Typographic category
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent-primary">
                      level
                    </td>
                    <td className="py-2 pr-4 text-secondary">
                      <code>string literal</code>
                    </td>
                    <td className="py-2 text-secondary">
                      Size rank within the variant (e.g. <code>{'"1"'}</code>,{" "}
                      <code>{'"h2"'}</code>)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent-primary">
                      as
                    </td>
                    <td className="py-2 pr-4 text-secondary">
                      <code>React.ElementType</code>
                    </td>
                    <td className="py-2 text-secondary">
                      Override rendered HTML tag (defaults per variant)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent-primary">
                      weight
                    </td>
                    <td className="py-2 pr-4 text-secondary">
                      <code>TypographyWeight</code>
                    </td>
                    <td className="py-2 text-secondary">
                      Font weight (thin → black)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent-primary">
                      className
                    </td>
                    <td className="py-2 pr-4 text-secondary">
                      <code>string</code>
                    </td>
                    <td className="py-2 text-secondary">
                      Additional Tailwind / utility classes
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-accent-primary">
                      children
                    </td>
                    <td className="py-2 pr-4 text-secondary">
                      <code>React.ReactNode</code>
                    </td>
                    <td className="py-2 text-secondary">Content</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Default HTML tags per variant ── */}
          <div className="p-4 space-y-3 rounded-xl border border-border bg-background">
            <p className="text-sm font-bold text-primary">Default HTML Tags</p>
            <p className="text-xs text-secondary">
              When no <code>as</code> prop is provided, the component renders
              these elements:
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  {
                    variant: "title",
                    levels: "1, 2, 3",
                    tag: "&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;",
                  },
                  {
                    variant: "heading",
                    levels: "h1–h6",
                    tag: "&lt;h1&gt;–&lt;h6&gt;",
                  },
                  { variant: "body", levels: "1, 2, 3, 4", tag: "&lt;p&gt;" },
                  { variant: "label", levels: "1, 2, 3", tag: "&lt;label&gt;" },
                  { variant: "caption", levels: "1, 2", tag: "&lt;span&gt;" },
                ] as const
              ).map((row) => (
                <div
                  key={row.variant}
                  className="flex gap-3 items-baseline p-3 rounded-lg bg-tertiary/50"
                >
                  <code className="text-xs font-semibold text-accent-primary shrink-0">
                    {row.variant}
                  </code>
                  <span className="text-xs text-secondary">
                    levels {row.levels} →{" "}
                    <code dangerouslySetInnerHTML={{ __html: row.tag }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Title Variant ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Variant: <code className="text-accent-primary">title</code> —
              levels <code className="text-tertiary">1 / 2 / 3</code>
            </p>
            {(["1", "2", "3"] as const).map((level) => (
              <div
                key={level}
                className="p-4 space-y-1 rounded-xl border border-border bg-background"
              >
                <Typography variant="title" level={level}>
                  Title {level} — The quick brown fox jumps over the lazy dog
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="title" level="' + level + '" />'}
                </code>
              </div>
            ))}
          </div>

          {/* ── Heading Variant ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Variant: <code className="text-accent-primary">heading</code> —
              levels{" "}
              <code className="text-tertiary">h1 / h2 / h3 / h4 / h5 / h6</code>
            </p>
            {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((level) => (
              <div
                key={level}
                className="p-4 space-y-1 rounded-xl border border-border bg-background"
              >
                <Typography variant="heading" level={level}>
                  Heading {level} — The quick brown fox jumps over the lazy dog
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="heading" level="' + level + '" />'}
                </code>
              </div>
            ))}
          </div>

          {/* ── Body Variant ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Variant: <code className="text-accent-primary">body</code> —
              levels <code className="text-tertiary">1 / 2 / 3 / 4</code>
            </p>
            {(["1", "2", "3", "4"] as const).map((level) => (
              <div
                key={level}
                className="p-4 space-y-1 rounded-xl border border-border bg-background"
              >
                <Typography variant="body" level={level}>
                  Body {level} — The quick brown fox jumps over the lazy dog
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="body" level="' + level + '" />'}
                </code>
              </div>
            ))}
          </div>

          {/* ── Label Variant ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Variant: <code className="text-accent-primary">label</code> —
              levels <code className="text-tertiary">1 / 2 / 3</code>
            </p>
            {(["1", "2", "3"] as const).map((level) => (
              <div
                key={level}
                className="p-4 space-y-1 rounded-xl border border-border bg-background"
              >
                <Typography variant="label" level={level}>
                  Label {level} — The quick brown fox jumps over the lazy dog
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="label" level="' + level + '" />'}
                </code>
              </div>
            ))}
          </div>

          {/* ── Caption Variant ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Variant: <code className="text-accent-primary">caption</code> —
              levels <code className="text-tertiary">1 / 2</code>
            </p>
            {(["1", "2"] as const).map((level) => (
              <div
                key={level}
                className="p-4 space-y-1 rounded-xl border border-border bg-background"
              >
                <Typography variant="caption" level={level}>
                  Caption {level} — The quick brown fox jumps over the lazy dog
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="caption" level="' + level + '" />'}
                </code>
              </div>
            ))}
          </div>

          {/* ── Weight Examples ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Font Weight: <code className="text-accent-primary">weight</code>{" "}
              prop
            </p>
            <p className="text-xs text-secondary">
              Override the default weight with any value from <code>thin</code>{" "}
              to <code>black</code>.
            </p>
            <div className="space-y-2">
              {(
                [
                  ["thin", "100"],
                  ["extralight", "200"],
                  ["light", "300"],
                  ["regular", "400"],
                  ["medium", "500"],
                  ["semibold", "600"],
                  ["bold", "700"],
                  ["extrabold", "800"],
                  ["black", "900"],
                ] as const
              ).map(([name, value]) => (
                <div
                  key={name}
                  className="p-4 rounded-xl border border-border bg-background"
                >
                  <Typography variant="body" level="2" weight={name}>
                    {name} ({value}) — The quick brown fox jumps over the lazy
                    dog
                  </Typography>
                  <code className="text-xs text-tertiary">
                    {'<Typography variant="body" level="2" weight="' +
                      name +
                      '" />'}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* ── `as` Prop Override ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Element Override: <code className="text-accent-primary">as</code>{" "}
              prop
            </p>
            <p className="text-xs text-secondary">
              Change the rendered HTML element while keeping the same typography
              token.
            </p>
            <div className="space-y-2">
              <div className="p-4 rounded-xl border border-border bg-background">
                <Typography variant="heading" level="h3" as="div">
                  This heading renders as a &lt;div&gt;, not &lt;h3&gt;
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="heading" level="h3" as="div" />'}
                </code>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <Typography variant="title" level="1" as="span">
                  This title renders as a &lt;span&gt;, not &lt;h1&gt;
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="title" level="1" as="span" />'}
                </code>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <Typography variant="body" level="2" as="li">
                  This body renders as an &lt;li&gt;, not &lt;p&gt;
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="body" level="2" as="li" />'}
                </code>
              </div>
            </div>
          </div>

          {/* ── className Composition ── */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-primary">
              Utility Composition:{" "}
              <code className="text-accent-primary">className</code> prop
            </p>
            <p className="text-xs text-secondary">
              Merge additional Tailwind classes on top of the token styles.
            </p>
            <div className="space-y-2">
              <div className="p-4 rounded-xl border border-border bg-background">
                <Typography
                  variant="heading"
                  level="h2"
                  className="text-accent-primary truncate"
                >
                  Truncated heading with accent color
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="heading" level="h2" className="text-accent-primary truncate">' +
                    "..."}
                </code>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <Typography
                  variant="body"
                  level="3"
                  className="text-tertiary italic"
                >
                  Muted italic body text
                </Typography>
                <code className="text-xs text-tertiary">
                  {'<Typography variant="body" level="3" className="text-tertiary italic">' +
                    "..."}
                </code>
              </div>
            </div>
          </div>
        </Section>

        <Section id="fonts" title="Fonts">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "Montserrat",
                var: "--font-montserrat",
                tailwind: "font-heading",
                sample: "Headings & UI",
              },
              {
                name: "Geist Sans",
                var: "--font-geist-sans",
                tailwind: "font-sans",
                sample: "Body text",
              },
              {
                name: "Geist Mono",
                var: "--font-geist-mono",
                tailwind: "font-mono",
                sample: "Code blocks",
              },
            ].map((f) => (
              <div
                key={f.name}
                className="p-5 space-y-2 rounded-xl border border-border bg-background"
              >
                <p
                  className="text-2xl font-semibold text-primary"
                  style={{ fontFamily: `var(${f.var})` }}
                >
                  {f.name}
                </p>
                <p className="text-sm text-secondary">{f.sample}</p>
                <code className="block text-xs text-tertiary">
                  {f.tailwind} → {f.var}
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            FONT WEIGHTS
            ════════════════════════════════════════════════════════ */}
        <Section id="weights" title="Font Weights">
          <p className="text-sm text-secondary">
            Use standard Tailwind:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              font-thin
            </code>{" "}
            through{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              font-black
            </code>
            .
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Thin", value: "100" },
              { name: "ExtraLight", value: "200" },
              { name: "Light", value: "300" },
              { name: "Regular", value: "400" },
              { name: "Medium", value: "500" },
              { name: "SemiBold", value: "600" },
              { name: "Bold", value: "700" },
              { name: "ExtraBold", value: "800" },
              { name: "Black", value: "900" },
            ].map((w) => (
              <div
                key={w.name}
                className="flex justify-between items-baseline p-4 rounded-xl border border-border bg-background"
              >
                <span
                  className="text-lg text-primary"
                  style={{ fontWeight: w.value }}
                >
                  {w.name}
                </span>
                <div className="text-right">
                  <span className="block text-sm font-semibold text-secondary">
                    {w.value}
                  </span>
                  <code className="text-xs text-tertiary">
                    font-{w.name.toLowerCase()}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            BORDER RADIUS
            ════════════════════════════════════════════════════════ */}
        <Section id="radius" title="Border Radius">
          <p className="text-sm text-secondary">
            Base radius:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              --radius: 0.625rem
            </code>{" "}
            (light) /{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              0.5rem
            </code>{" "}
            (dark).
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "sm",
                cssVar: "--radius-sm",
                tailwindClass: "rounded-sm",
              },
              {
                name: "md",
                cssVar: "--radius-md",
                tailwindClass: "rounded-md",
              },
              {
                name: "lg",
                cssVar: "--radius-lg",
                tailwindClass: "rounded-lg",
              },
              {
                name: "xl",
                cssVar: "--radius-xl",
                tailwindClass: "rounded-xl",
              },
              {
                name: "2xl",
                cssVar: "--radius-2xl",
                tailwindClass: "rounded-2xl",
              },
              {
                name: "3xl",
                cssVar: "--radius-3xl",
                tailwindClass: "rounded-3xl",
              },
              {
                name: "4xl",
                cssVar: "--radius-4xl",
                tailwindClass: "rounded-4xl",
              },
            ].map((r) => (
              <div key={r.name} className="space-y-2 text-center">
                <div
                  className="flex justify-center items-center mx-auto w-20 h-20 bg-accent-primary text-accent-primary"
                  style={{ borderRadius: `var(${r.cssVar})` }}
                >
                  <span className="text-xs font-semibold">{r.name}</span>
                </div>
                <p className="text-sm font-semibold text-primary">{r.name}</p>
                <code className="block text-xs text-tertiary">
                  {r.tailwindClass}
                </code>
                <code className="block text-[10px] text-disabled">
                  {r.cssVar}
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            SHADCN / SEMANTIC TOKENS
            ════════════════════════════════════════════════════════ */}
        <Section id="shadcn" title="Shadcn / Semantic Tokens">
          <p className="text-sm text-secondary">
            These are the standard shadcn/ui tokens mapped via{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">
              @theme inline
            </code>
            .
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Card", css: "--card", tw: "bg-card" },
              {
                label: "Card Foreground",
                css: "--card-foreground",
                tw: "text-card-foreground",
              },
              { label: "Popover", css: "--popover", tw: "bg-popover" },
              { label: "Primary", css: "--primary", tw: "bg-primary" },
              {
                label: "Primary FG",
                css: "--primary-foreground",
                tw: "text-primary-foreground",
              },
              { label: "Secondary", css: "--secondary", tw: "bg-secondary" },
              {
                label: "Secondary FG",
                css: "--secondary-foreground",
                tw: "text-secondary-foreground",
              },
              { label: "Muted", css: "--muted", tw: "bg-muted" },
              {
                label: "Muted FG",
                css: "--muted-foreground",
                tw: "text-muted-foreground",
              },
              { label: "Accent", css: "--accent", tw: "bg-accent" },
              {
                label: "Accent FG",
                css: "--accent-foreground",
                tw: "text-accent-foreground",
              },
              {
                label: "Destructive",
                css: "--destructive",
                tw: "bg-destructive",
              },
              {
                label: "Destructive FG",
                css: "--destructive-foreground",
                tw: "text-destructive-foreground",
              },
              { label: "Border", css: "--border", tw: "border-border" },
              { label: "Input", css: "--input", tw: "border-input" },
              { label: "Ring", css: "--ring", tw: "ring-ring" },
            ].map((t) => (
              <div
                key={t.css}
                className="p-3 space-y-1 rounded-xl border border-border bg-background"
              >
                <p className="text-sm font-semibold text-primary">{t.label}</p>
                <code className="block text-xs text-tertiary">{t.tw}</code>
                <code className="block text-[10px] text-disabled">{t.css}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ── */}
        <footer className="pt-8 text-sm text-center border-t border-border text-tertiary">
          <p>
            E-Crystal Design System · Powered by Tailwind CSS v4 + shadcn/ui +
            Radix
          </p>
        </footer>
      </div>
    </div>
  );
}
