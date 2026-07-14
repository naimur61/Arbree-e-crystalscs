"use client";

import { useState } from "react";
import { Typography } from "@/components/common/typography/typography";
import { themeConfig } from "@/lib/theme/theme.config";

/* ═══════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════ */

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      {desc && <p className="text-sm text-secondary">{desc}</p>}
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   COLOR CHIPS — compact clickable color tokens
   ═══════════════════════════════════════════════════ */

function ColorChips() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (cls: string) => {
    try {
      await navigator.clipboard.writeText(cls);
    } catch {
      const el = document.createElement("textarea");
      el.value = cls;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(cls);
    setTimeout(() => setCopied(null), 1200);
  };

  const groups = [
    ["text", themeConfig.colors.text] as const,
    ["bg", themeConfig.colors.bg] as const,
    ["border", themeConfig.colors.border] as const,
    ["icon", themeConfig.colors.icon] as const,
  ];

  function swatchClass(group: string, cls: string) {
    if (group === "bg") return cls;
    if (group === "border") return cls + " border-2 bg-transparent";
    return cls + " bg-current";
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {groups.map(([group, entries]) => (
        <div key={group} className="space-y-2.5">
          <p className="text-xs font-semibold tracking-wider uppercase text-secondary">
            {group}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(entries).map(([key, cls]) => {
              const isCopied = copied === cls;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => copy(cls)}
                  title={`Click to copy "${cls}"`}
                  className={`group relative inline-flex items-center gap-2 py-1.5 pl-1.5 pr-2.5 rounded-lg border text-xs font-mono transition-all duration-150 cursor-pointer
                    ${
                      isCopied
                        ? "border-accent-primary bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary"
                        : "border-border bg-background text-primary hover:border-accent-primary/50 hover:bg-accent-primary/5"
                    }`}
                >
                  <span
                    className={`w-4 h-4 rounded shrink-0 ring-1 ring-inset ring-black/10 ${swatchClass(
                      group,
                      cls,
                    )}`}
                  />
                  <span>{cls}</span>
                  {isCopied && (
                    <span className="absolute -top-1.5 -right-1.5 text-[10px] w-4 h-4 flex items-center justify-center font-bold text-accent-primary bg-background rounded-full border border-accent-primary">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function GuideContainer() {
  return (
    <div className="py-10 px-4 mx-auto space-y-16 max-w-5xl sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent-primary">
          E-Crystal Design System
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          Guide
        </h1>
        <p className="mx-auto max-w-xl text-sm text-secondary">
          Quick reference for the Typography component and design tokens.
        </p>
      </header>

      {/* ── TOC ── */}
      <nav className="p-4 rounded-xl border border-border bg-secondary">
        <ul className="flex flex-wrap gap-y-2 gap-x-6 text-sm">
          {[
            ["#typography", "Typography Component"],
            ["#colors", "Color Tokens"],
            ["#scale", "Type Scale"],
            ["#fonts", "Fonts"],
            ["#weights", "Font Weights"],
            ["/guide/hooks", "Hooks Guide →"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="font-medium text-secondary hover:text-primary"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ════════════════════════════════════════════════════════
          TYPOGRAPHY COMPONENT
          ════════════════════════════════════════════════════════ */}
      <Section id="typography" title="Typography Component">
        {/* ── Quick Example ── */}
        <div className="p-5 rounded-xl border border-border bg-background space-y-3">
          <p className="text-sm font-semibold text-primary">Quick start</p>
          <Typography variant="h2" color="accentPrimary">
            This is an H2 with accent color
          </Typography>
          <code className="block text-xs text-tertiary">
            {'<Typography variant="h2" color="accentPrimary">…</Typography>'}
          </code>
        </div>

        {/* ── Props Table ── */}
        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2.5 px-4 font-semibold text-left text-secondary">
                  Prop
                </th>
                <th className="py-2.5 px-4 font-semibold text-left text-secondary">
                  Type
                </th>
                <th className="py-2.5 px-4 font-semibold text-left text-secondary">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                [
                  "variant",
                  "TypographyVariant",
                  "Style token (title-1…caption-2)",
                ],
                ["color", "TypographyColor", "Text color from theme"],
                ["as", "React.ElementType", "Override HTML tag"],
                ["weight", "TypographyWeight", "Font weight override"],
                ["className", "string", "Additional classes"],
              ].map(([prop, type, desc]) => (
                <tr key={prop}>
                  <td className="py-2.5 px-4 font-mono text-xs text-accent-primary">
                    {prop}
                  </td>
                  <td className="py-2.5 px-4 text-xs text-secondary">{type}</td>
                  <td className="py-2.5 px-4 text-xs text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── All 18 variants ─── */}
        <p className="text-sm font-semibold text-primary">All variants</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              "title-1",
              "title-2",
              "title-3",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "body-1",
              "body-2",
              "body-3",
              "body-4",
              "label-1",
              "label-2",
              "label-3",
              "caption-1",
              "caption-2",
            ] as const
          ).map((v) => (
            <div
              key={v}
              className="p-4 rounded-xl border border-border bg-background"
            >
              <Typography variant={v}>{v} — The quick brown fox</Typography>
              <code className="block mt-1 text-xs text-tertiary">
                {'<Typography variant="' + v + '" />'}
              </code>
            </div>
          ))}
        </div>

        {/* ─── Color examples ─── */}
        <p className="text-sm font-semibold text-primary">
          With <code className="text-accent-primary">color</code> prop
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["primary", "Default text"],
              ["secondary", "Secondary text"],
              ["accentPrimary", "Accent"],
              ["successPrimary", "Success"],
              ["errorPrimary", "Error"],
              ["warningPrimary", "Warning"],
              ["infoPrimary", "Info"],
              ["offerPrimary", "Offer"],
              ["white", "White"],
            ] as const
          ).map(([color, label]) => (
            <div
              key={color}
              className="p-4 rounded-xl border border-border bg-background"
            >
              <Typography variant="body-2" color={color}>
                {label}
              </Typography>
              <code className="block mt-1 text-xs text-tertiary">
                {'color="' + color + '"'}
              </code>
            </div>
          ))}
        </div>

        {/* ─── Weight examples ─── */}
        <p className="text-sm font-semibold text-primary">
          With <code className="text-accent-primary">weight</code> prop
        </p>
        <div className="space-y-2">
          {(
            [
              ["thin", "100"],
              ["light", "300"],
              ["regular", "400"],
              ["medium", "500"],
              ["semibold", "600"],
              ["bold", "700"],
              ["black", "900"],
            ] as const
          ).map(([w, v]) => (
            <div
              key={w}
              className="flex gap-4 items-baseline p-3 rounded-xl border border-border bg-background"
            >
              <code className="w-20 text-xs text-tertiary shrink-0">
                {w} ({v})
              </code>
              <Typography variant="body-2" weight={w} className="flex-1">
                The quick brown fox jumps over the lazy dog
              </Typography>
              <code className="text-xs text-tertiary shrink-0">
                {'weight="' + w + '"'}
              </code>
            </div>
          ))}
        </div>

        {/* ─── `as` + `className` ─── */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <p className="text-xs font-semibold text-secondary">
              Override HTML tag with <code>as</code>
            </p>
            <Typography variant="h3" as="div">
              This H3 renders as a div
            </Typography>
            <code className="block text-xs text-tertiary">
              {'<Typography variant="h3" as="div" />'}
            </code>
          </div>
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <p className="text-xs font-semibold text-secondary">
              Extra classes with <code>className</code>
            </p>
            <Typography variant="body-1" className="italic text-accentPrimary">
              Italic accent body text
            </Typography>
            <code className="block text-xs text-tertiary">
              {
                '<Typography variant="body-1" className="italic text-accentPrimary" />'
              }
            </code>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          COLOR TOKENS — compact clickable chips
          ════════════════════════════════════════════════════════ */}
      <Section id="colors" title="Color Tokens">
        <ColorChips />
      </Section>

      {/* ════════════════════════════════════════════════════════
          TYPE SCALE
          ════════════════════════════════════════════════════════ */}
      <Section id="scale" title="Type Scale">
        <div className="space-y-2">
          {(
            [
              ["Title 1", "72/88", "--type-title-1"],
              ["Title 2", "64/76", "--type-title-2"],
              ["Title 3", "56/68", "--type-title-3"],
              ["H1", "56/68", "--type-h1"],
              ["H2", "48/58", "--type-h2"],
              ["H3", "40/48", "--type-h3"],
              ["H4", "32/38", "--type-h4"],
              ["H5", "24/30", "--type-h5"],
              ["H6", "20/24", "--type-h6"],
              ["Body 1", "18/28", "--type-body-1"],
              ["Body 2", "16/24", "--type-body-2"],
              ["Body 3", "14/20", "--type-body-3"],
              ["Body 4", "12/16", "--type-body-4"],
              ["Label 1", "16/22", "--type-label-1"],
              ["Label 2", "14/20", "--type-label-2"],
              ["Label 3", "12/16", "--type-label-3"],
              ["Caption 1", "10/12", "--type-caption-1"],
              ["Caption 2", "9/10", "--type-caption-2"],
            ] as const
          ).map(([name, size, cssVar]) => (
            <div
              key={name}
              className="flex gap-4 items-baseline p-3 rounded-xl border border-border bg-background"
            >
              <span className="w-20 text-xs font-semibold text-primary shrink-0">
                {name}
              </span>
              <span
                className="flex-1 truncate text-primary"
                style={{
                  fontSize: `var(${cssVar}-size)`,
                  lineHeight: `var(${cssVar}-lh)`,
                }}
              >
                The quick brown fox
              </span>
              <span className="text-xs text-tertiary shrink-0">{size}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          FONTS
          ════════════════════════════════════════════════════════ */}
      <Section id="fonts" title="Fonts">
        <div className="grid gap-4 sm:grid-cols-3">
          {(
            [
              [
                "Montserrat",
                "--font-montserrat",
                "font-heading",
                "Headings & UI",
              ],
              ["Geist Sans", "--font-geist-sans", "font-sans", "Body text"],
              ["Geist Mono", "--font-geist-mono", "font-mono", "Code blocks"],
            ] as const
          ).map(([name, var_, cls, use]) => (
            <div
              key={name}
              className="p-4 space-y-2 rounded-xl border border-border bg-background"
            >
              <p
                className="text-xl font-semibold text-primary truncate"
                style={{ fontFamily: `var(${var_})` }}
              >
                {name}
              </p>
              <p className="text-xs text-secondary">{use}</p>
              <code className="block text-[11px] text-tertiary">{cls}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          FONT WEIGHTS
          ════════════════════════════════════════════════════════ */}
      <Section id="weights" title="Font Weights">
        <div className="flex flex-wrap gap-3">
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
              className="p-3 text-center rounded-xl border border-border bg-background min-w-[90px]"
            >
              <p className="text-lg text-primary" style={{ fontWeight: value }}>
                {name}
              </p>
              <code className="text-[10px] text-tertiary">{value}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          HOOKS GUIDE LINK
          ════════════════════════════════════════════════════════ */}
      <Section id="hooks" title="Hooks Guide">
        <a
          href="/guide/hooks"
          className="block p-6 rounded-xl border border-border bg-background hover:border-accent-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-primary">
                queryHooks Documentation
              </p>
              <p className="text-sm text-secondary mt-1">
                Complete guide for useFetchData, useApiMutation,
                useInfiniteFetchData, and useSafeUpdate.
              </p>
            </div>
            <span className="text-accent-primary">→</span>
          </div>
        </a>
      </Section>

      <footer className="pt-6 text-xs text-center border-t border-border text-tertiary">
        E-Crystal Design System · Tailwind CSS v4 + shadcn/ui
      </footer>
    </div>
  );
}
