
/* ══════════════════════════════════════════════════════════════
   DESIGN GUIDE — Interactive color & typography reference
   ══════════════════════════════════════════════════════════════ */

// ─── Data ─────────────────────────────────────────────────────

interface Swatch {
  name: string;
  cssVar: string;
  className: string;
}

// Background colors
const BG_COLORS: Swatch[] = [
  { name: "Primary", cssVar: "--bg-primary", className: "bg-primary" },
  { name: "Secondary", cssVar: "--bg-secondary", className: "bg-secondary" },
  { name: "Tertiary", cssVar: "--bg-tertiary", className: "bg-tertiary" },
  { name: "Quartiary", cssVar: "--bg-quartiary", className: "bg-quartiary" },
  { name: "Black Solid", cssVar: "--bg-black-solid", className: "bg-black-solid" },
  { name: "Disabled", cssVar: "--bg-disabled", className: "bg-disabled" },
  { name: "Disabled Alt", cssVar: "--bg-disabled-alt", className: "bg-disabled-alt" },
  { name: "Accent Primary", cssVar: "--bg-accent-primary", className: "bg-accent-primary" },
  { name: "Accent Solid", cssVar: "--bg-accent-solid", className: "bg-accent-solid" },
  { name: "Error Primary", cssVar: "--bg-error-primary", className: "bg-error-primary" },
  { name: "Error Secondary", cssVar: "--bg-error-secondary", className: "bg-error-secondary" },
  { name: "Success Primary", cssVar: "--bg-success-primary", className: "bg-success-primary" },
  { name: "Success Secondary", cssVar: "--bg-success-secondary", className: "bg-success-secondary" },
  { name: "Warning Primary", cssVar: "--bg-warning-primary", className: "bg-warning-primary" },
  { name: "Warning Secondary", cssVar: "--bg-warning-secondary", className: "bg-warning-secondary" },
  { name: "Info Primary", cssVar: "--bg-info-primary", className: "bg-info-primary" },
  { name: "Info Secondary", cssVar: "--bg-info-secondary", className: "bg-info-secondary" },
  { name: "Offer Primary", cssVar: "--bg-offer-primary", className: "bg-offer-primary" },
  { name: "Offer Secondary", cssVar: "--bg-offer-secondary", className: "bg-offer-secondary" },
];

// Text colors
const TEXT_COLORS: Swatch[] = [
  { name: "Primary", cssVar: "--text-primary", className: "text-primary" },
  { name: "Secondary", cssVar: "--text-secondary", className: "text-secondary" },
  { name: "Tertiary", cssVar: "--text-tertiary", className: "text-tertiary" },
  { name: "Disabled", cssVar: "--text-disabled", className: "text-disabled" },
  { name: "Disabled Alt", cssVar: "--text-disabled-alt", className: "text-disabled-alt" },
  { name: "Placeholder", cssVar: "--text-placeholder", className: "text-placeholder" },
  { name: "White", cssVar: "--text-white", className: "text-white" },
  { name: "On Dark Color", cssVar: "--text-on-dark-color", className: "text-on-dark-color" },
  { name: "Accent Primary", cssVar: "--text-accent-primary", className: "text-accent-primary" },
  { name: "Accent Secondary", cssVar: "--text-accent-secondary", className: "text-accent-secondary" },
  { name: "Error Primary", cssVar: "--text-error-primary", className: "text-error-primary" },
  { name: "Error Secondary", cssVar: "--text-error-secondary", className: "text-error-secondary" },
  { name: "Success Primary", cssVar: "--text-success-primary", className: "text-success-primary" },
  { name: "Success Secondary", cssVar: "--text-success-secondary", className: "text-success-secondary" },
  { name: "Warning Primary", cssVar: "--text-warning-primary", className: "text-warning-primary" },
  { name: "Warning Secondary", cssVar: "--text-warning-secondary", className: "text-warning-secondary" },
  { name: "Info Primary", cssVar: "--text-info-primary", className: "text-info-primary" },
  { name: "Info Secondary", cssVar: "--text-info-secondary", className: "text-info-secondary" },
  { name: "Offer Primary", cssVar: "--text-offer-primary", className: "text-offer-primary" },
  { name: "Offer Secondary", cssVar: "--text-offer-secondary", className: "text-offer-secondary" },
];

// Icon colors
const ICON_COLORS: Swatch[] = [
  { name: "Primary", cssVar: "--icon-primary", className: "icon-primary" },
  { name: "Secondary", cssVar: "--icon-secondary", className: "icon-secondary" },
  { name: "Tertiary", cssVar: "--icon-tertiary", className: "icon-tertiary" },
  { name: "Disabled", cssVar: "--icon-disabled", className: "icon-disabled" },
  { name: "Disabled Alt", cssVar: "--icon-disabled-alt", className: "icon-disabled-alt" },
  { name: "Placeholder", cssVar: "--icon-placeholder", className: "icon-placeholder" },
  { name: "White", cssVar: "--icon-white", className: "icon-white" },
  { name: "On Dark Color", cssVar: "--icon-on-dark-color", className: "icon-on-dark-color" },
  { name: "Accent Primary", cssVar: "--icon-accent-primary", className: "icon-accent-primary" },
  { name: "Accent Secondary", cssVar: "--icon-accent-secondary", className: "icon-accent-secondary" },
  { name: "Error Primary", cssVar: "--icon-error-primary", className: "icon-error-primary" },
  { name: "Error Secondary", cssVar: "--icon-error-secondary", className: "icon-error-secondary" },
  { name: "Success Primary", cssVar: "--icon-success-primary", className: "icon-success-primary" },
  { name: "Success Secondary", cssVar: "--icon-success-secondary", className: "icon-success-secondary" },
  { name: "Warning Primary", cssVar: "--icon-warning-primary", className: "icon-warning-primary" },
  { name: "Warning Secondary", cssVar: "--icon-warning-secondary", className: "icon-warning-secondary" },
  { name: "Info Primary", cssVar: "--icon-info-primary", className: "icon-info-primary" },
  { name: "Info Secondary", cssVar: "--icon-info-secondary", className: "icon-info-secondary" },
  { name: "Offer Primary", cssVar: "--icon-offer-primary", className: "icon-offer-primary" },
  { name: "Offer Secondary", cssVar: "--icon-offer-secondary", className: "icon-offer-secondary" },
];

// Border colors
const BORDER_COLORS: Swatch[] = [
  { name: "Primary", cssVar: "--border-primary", className: "border-primary" },
  { name: "Secondary", cssVar: "--border-secondary", className: "border-secondary" },
  { name: "Tertiary", cssVar: "--border-tertiary", className: "border-tertiary" },
  { name: "Primary Solid", cssVar: "--border-primary-solid", className: "border-primary-solid" },
  { name: "Disabled", cssVar: "--border-disabled", className: "border-disabled" },
  { name: "Disabled Alt", cssVar: "--border-disabled-alt", className: "border-disabled-alt" },
  { name: "Accent Primary", cssVar: "--border-accent-primary", className: "border-accent-primary" },
  { name: "Accent Secondary", cssVar: "--border-accent-secondary", className: "border-accent-secondary" },
  { name: "Error Primary", cssVar: "--border-error-primary", className: "border-error-primary" },
  { name: "Error Secondary", cssVar: "--border-error-secondary", className: "border-error-secondary" },
  { name: "Success Primary", cssVar: "--border-success-primary", className: "border-success-primary" },
  { name: "Success Secondary", cssVar: "--border-success-secondary", className: "border-success-secondary" },
  { name: "Warning Primary", cssVar: "--border-warning-primary", className: "border-warning-primary" },
  { name: "Warning Secondary", cssVar: "--border-warning-secondary", className: "border-warning-secondary" },
  { name: "Info Primary", cssVar: "--border-info-primary", className: "border-info-primary" },
  { name: "Info Secondary", cssVar: "--border-info-secondary", className: "border-info-secondary" },
  { name: "Offer Primary", cssVar: "--border-offer-primary", className: "border-offer-primary" },
  { name: "Offer Secondary", cssVar: "--border-offer-secondary", className: "border-offer-secondary" },
];

// Typography scale
interface TypeScale {
  name: string;
  cssVarSize: string;
  cssVarLh: string;
  cssVarLs: string;
  sample: string;
}

const TYPOGRAPHY: TypeScale[] = [
  { name: "Title 1", cssVarSize: "--type-title-1-size", cssVarLh: "--type-title-1-lh", cssVarLs: "--type-title-1-ls", sample: "72px / 88px" },
  { name: "Title 2", cssVarSize: "--type-title-2-size", cssVarLh: "--type-title-2-lh", cssVarLs: "--type-title-2-ls", sample: "64px / 76px" },
  { name: "Title 3", cssVarSize: "--type-title-3-size", cssVarLh: "--type-title-3-lh", cssVarLs: "--type-title-3-ls", sample: "56px / 68px" },
  { name: "H1", cssVarSize: "--type-h1-size", cssVarLh: "--type-h1-lh", cssVarLs: "--type-h1-ls", sample: "56px / 68px" },
  { name: "H2", cssVarSize: "--type-h2-size", cssVarLh: "--type-h2-lh", cssVarLs: "--type-h2-ls", sample: "48px / 58px" },
  { name: "H3", cssVarSize: "--type-h3-size", cssVarLh: "--type-h3-lh", cssVarLs: "--type-h3-ls", sample: "40px / 48px" },
  { name: "H4", cssVarSize: "--type-h4-size", cssVarLh: "--type-h4-lh", cssVarLs: "--type-h4-ls", sample: "32px / 38px" },
  { name: "H5", cssVarSize: "--type-h5-size", cssVarLh: "--type-h5-lh", cssVarLs: "--type-h5-ls", sample: "24px / 30px" },
  { name: "H6", cssVarSize: "--type-h6-size", cssVarLh: "--type-h6-lh", cssVarLs: "--type-h6-ls", sample: "20px / 24px" },
  { name: "Label 1", cssVarSize: "--type-label-1-size", cssVarLh: "--type-label-1-lh", cssVarLs: "--type-label-1-ls", sample: "16px / 22px" },
  { name: "Label 2", cssVarSize: "--type-label-2-size", cssVarLh: "--type-label-2-lh", cssVarLs: "--type-label-2-ls", sample: "14px / 20px" },
  { name: "Label 3", cssVarSize: "--type-label-3-size", cssVarLh: "--type-label-3-lh", cssVarLs: "--type-label-3-ls", sample: "12px / 16px" },
  { name: "Body 1", cssVarSize: "--type-body-1-size", cssVarLh: "--type-body-1-lh", cssVarLs: "--type-body-1-ls", sample: "18px / 28px" },
  { name: "Body 2", cssVarSize: "--type-body-2-size", cssVarLh: "--type-body-2-lh", cssVarLs: "--type-body-2-ls", sample: "16px / 24px" },
  { name: "Body 3", cssVarSize: "--type-body-3-size", cssVarLh: "--type-body-3-lh", cssVarLs: "--type-body-3-ls", sample: "14px / 20px" },
  { name: "Body 4", cssVarSize: "--type-body-4-size", cssVarLh: "--type-body-4-lh", cssVarLs: "--type-body-4-ls", sample: "12px / 16px" },
  { name: "Caption 1", cssVarSize: "--type-caption-1-size", cssVarLh: "--type-caption-1-lh", cssVarLs: "--type-caption-1-ls", sample: "10px / 12px" },
  { name: "Caption 2", cssVarSize: "--type-caption-2-size", cssVarLh: "--type-caption-2-lh", cssVarLs: "--type-caption-2-ls", sample: "9px / 10px" },
];

// Font weights
interface Weight {
  name: string;
  value: string;
  cssVar: string;
}

const WEIGHTS: Weight[] = [
  { name: "Thin", value: "100", cssVar: "--weight-thin" },
  { name: "ExtraLight", value: "200", cssVar: "--weight-extralight" },
  { name: "Light", value: "300", cssVar: "--weight-light" },
  { name: "Regular", value: "400", cssVar: "--weight-regular" },
  { name: "Medium", value: "500", cssVar: "--weight-medium" },
  { name: "SemiBold", value: "600", cssVar: "--weight-semibold" },
  { name: "Bold", value: "700", cssVar: "--weight-bold" },
  { name: "ExtraBold", value: "800", cssVar: "--weight-extrabold" },
  { name: "Black", value: "900", cssVar: "--weight-black" },
];

// Radius tokens
interface Radius {
  name: string;
  value: string;
  cssVar: string;
  tailwindClass: string;
}

const RADII: Radius[] = [
  { name: "sm", value: "calc(var(--radius) * 0.25)", cssVar: "--radius-sm", tailwindClass: "rounded-sm" },
  { name: "md", value: "calc(var(--radius) * 0.5)", cssVar: "--radius-md", tailwindClass: "rounded-md" },
  { name: "lg", value: "var(--radius)", cssVar: "--radius-lg", tailwindClass: "rounded-lg" },
  { name: "xl", value: "calc(var(--radius) * 1.5)", cssVar: "--radius-xl", tailwindClass: "rounded-xl" },
  { name: "2xl", value: "calc(var(--radius) * 2)", cssVar: "--radius-2xl", tailwindClass: "rounded-2xl" },
  { name: "3xl", value: "calc(var(--radius) * 3)", cssVar: "--radius-3xl", tailwindClass: "rounded-3xl" },
  { name: "4xl", value: "calc(var(--radius) * 4)", cssVar: "--radius-4xl", tailwindClass: "rounded-4xl" },
];

// ─── Helper Components ────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight font-heading text-primary">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SwatchCard({ swatch, type }: { swatch: Swatch; type: "bg" | "text" | "icon" | "border" }) {
  if (type === "bg") {
    return (
      <div className="overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md group border-border bg-background">
        <div className={`h-20 w-full ${swatch.className}`} />
        <div className="p-3 space-y-1">
          <p className="text-sm font-semibold text-primary">{swatch.name}</p>
          <code className="block text-xs break-all text-tertiary">{swatch.className}</code>
          <code className="block break-all text-[10px] text-disabled">{swatch.cssVar}</code>
        </div>
      </div>
    );
  }

  if (type === "border") {
    return (
      <div className="overflow-hidden p-3 space-y-1 rounded-xl border-2 shadow-sm border-border bg-background">
        <div className={`h-3 w-full rounded ${swatch.className} border-2`} />
        <p className="text-sm font-semibold text-primary">{swatch.name}</p>
        <code className="block text-xs break-all text-tertiary">{swatch.className}</code>
        <code className="block break-all text-[10px] text-disabled">{swatch.cssVar}</code>
      </div>
    );
  }

  // Text or Icon
  return (
    <div className="overflow-hidden p-3 space-y-2 rounded-xl border shadow-sm border-border bg-background">
      <p className={`text-lg font-semibold ${swatch.className}`}>Aa Bb 123</p>
      <p className="text-sm font-semibold text-primary">{swatch.name}</p>
      <code className="block text-xs break-all text-tertiary">{swatch.className}</code>
      <code className="block break-all text-[10px] text-disabled">{swatch.cssVar}</code>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function GuideContainer() {
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
            Complete reference for every color, typography token, spacing unit, and
            utility class in the E-Crystal design system. Toggle dark mode to see
            how every token adapts.
          </p>
        </header>

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
              ["typography", "Typography Scale"],
              ["fonts", "Fonts"],
              ["weights", "Font Weights"],
              ["radius", "Border Radius"],
              ["spacing", "Spacing Scale"],
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
            BACKGROUND COLORS
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-background" title="Background Colors">
          <p className="text-sm text-secondary">
            Utility: <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">bg-&lt;color&gt;</code>{" "}
            — e.g. <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">bg-primary</code>,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">bg-error-primary</code>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {BG_COLORS.map((sw) => (
              <SwatchCard key={sw.className} swatch={sw} type="bg" />
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            TEXT COLORS
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-text" title="Text Colors">
          <p className="text-sm text-secondary">
            Utility: <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">text-&lt;color&gt;</code>{" "}
            — e.g. <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">text-primary</code>,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">text-success-primary</code>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {TEXT_COLORS.map((sw) => (
              <SwatchCard key={sw.className} swatch={sw} type="text" />
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            ICON COLORS
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-icon" title="Icon Colors">
          <p className="text-sm text-secondary">
            Utility: <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">icon-&lt;color&gt;</code>{" "}
            — sets both <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">color</code> and{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">fill</code> for SVGs.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {ICON_COLORS.map((sw) => (
              <SwatchCard key={sw.className} swatch={sw} type="icon" />
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            BORDER COLORS
            ════════════════════════════════════════════════════════ */}
        <Section id="colors-border" title="Border Colors">
          <p className="text-sm text-secondary">
            Utility: <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">border-&lt;color&gt;</code>{" "}
            — apply with <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">border</code> utility.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {BORDER_COLORS.map((sw) => (
              <SwatchCard key={sw.className} swatch={sw} type="border" />
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            TYPOGRAPHY SCALE
            ════════════════════════════════════════════════════════ */}
        <Section id="typography" title="Typography Scale">
          <p className="text-sm text-secondary">
            Each token is defined as CSS variables:{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">--type-[name]-size</code>,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">--type-[name]-lh</code>,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">--type-[name]-ls</code>.
            Use inline styles or Tailwind arbitrary values to apply them.
          </p>
          <div className="space-y-3">
            {TYPOGRAPHY.map((t) => (
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
                    fontSize: `var(${t.cssVarSize})`,
                    lineHeight: `var(${t.cssVarLh})`,
                    letterSpacing: `var(${t.cssVarLs})`,
                  }}
                >
                  The quick brown fox
                </span>
                <span className="text-xs shrink-0 text-tertiary">{t.sample}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            FONTS
            ════════════════════════════════════════════════════════ */}
        <Section id="fonts" title="Fonts">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "Montserrat", var: "--font-montserrat", tailwind: "font-heading", sample: "Headings & UI" },
              { name: "Geist Sans", var: "--font-geist-sans", tailwind: "font-sans", sample: "Body text" },
              { name: "Geist Mono", var: "--font-geist-mono", tailwind: "font-mono", sample: "Code blocks" },
            ].map((f) => (
              <div
                key={f.name}
                className="p-5 space-y-2 rounded-xl border border-border bg-background"
              >
                <p className="text-2xl font-semibold text-primary" style={{ fontFamily: `var(${f.var})` }}>
                  {f.name}
                </p>
                <p className="text-sm text-secondary">{f.sample}</p>
                <code className="block text-xs text-tertiary">{f.tailwind} → {f.var}</code>
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
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">font-thin</code> through{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">font-black</code>.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WEIGHTS.map((w) => (
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
                  <span className="block text-sm font-semibold text-secondary">{w.value}</span>
                  <code className="text-xs text-tertiary">font-{w.name.toLowerCase()}</code>
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
            Base radius: <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">--radius: 0.625rem</code>{" "}
            (light) / <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">0.5rem</code> (dark).
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RADII.map((r) => (
              <div key={r.name} className="space-y-2 text-center">
                <div
                  className="flex justify-center items-center mx-auto w-20 h-20 bg-accent-primary text-accent-primary"
                  style={{ borderRadius: `var(${r.cssVar})` }}
                >
                  <span className="text-xs font-semibold">{r.name}</span>
                </div>
                <p className="text-sm font-semibold text-primary">{r.name}</p>
                <code className="block text-xs text-tertiary">{r.tailwindClass}</code>
                <code className="block text-[10px] text-disabled">{r.cssVar}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            SPACING SCALE
            ════════════════════════════════════════════════════════ */}
        <Section id="spacing" title="Spacing Scale">
          <p className="text-sm text-secondary">
            Use Tailwind utilities: <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">p-*</code>,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">gap-*</code>,{" "}
            <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">m-*</code>, etc.
          </p>
          <div className="space-y-2">
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96].map(
              (n) => (
                <div key={n} className="flex gap-4 items-center">
                  <code className="w-12 text-xs text-right shrink-0 text-tertiary">{n}</code>
                  <div
                    className="h-4 rounded bg-accent-primary"
                    style={{ width: `${n * 4}px`, minWidth: n === 0 ? "2px" : undefined }}
                  />
                  <code className="text-xs text-disabled">
                    {(n * 0.25).toFixed(2).replace(/\.?0+$/, "")}rem
                  </code>
                </div>
              ),
            )}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════
            SHADCN / SEMANTIC TOKENS
            ════════════════════════════════════════════════════════ */}
        <Section id="shadcn" title="Shadcn / Semantic Tokens">
          <p className="text-sm text-secondary">
            These are the standard shadcn/ui tokens mapped via <code className="py-0.5 px-1.5 text-xs rounded bg-tertiary">@theme inline</code>.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Card", css: "--card", tw: "bg-card" },
              { label: "Card Foreground", css: "--card-foreground", tw: "text-card-foreground" },
              { label: "Popover", css: "--popover", tw: "bg-popover" },
              { label: "Primary", css: "--primary", tw: "bg-primary" },
              { label: "Primary FG", css: "--primary-foreground", tw: "text-primary-foreground" },
              { label: "Secondary", css: "--secondary", tw: "bg-secondary" },
              { label: "Secondary FG", css: "--secondary-foreground", tw: "text-secondary-foreground" },
              { label: "Muted", css: "--muted", tw: "bg-muted" },
              { label: "Muted FG", css: "--muted-foreground", tw: "text-muted-foreground" },
              { label: "Accent", css: "--accent", tw: "bg-accent" },
              { label: "Accent FG", css: "--accent-foreground", tw: "text-accent-foreground" },
              { label: "Destructive", css: "--destructive", tw: "bg-destructive" },
              { label: "Destructive FG", css: "--destructive-foreground", tw: "text-destructive-foreground" },
              { label: "Border", css: "--border", tw: "border-border" },
              { label: "Input", css: "--input", tw: "border-input" },
              { label: "Ring", css: "--ring", tw: "ring-ring" },
            ].map((t) => (
              <div key={t.css} className="p-3 space-y-1 rounded-xl border border-border bg-background">
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
            E-Crystal Design System · Powered by Tailwind CSS v4 + shadcn/ui + Radix
          </p>
        </footer>
      </div>
    </div>
  );
}
