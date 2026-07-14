"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════
   CODE BLOCK
   ═══════════════════════════════════════════════════ */

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/50">
          <span className="text-xs font-semibold text-secondary">{title}</span>
          <button
            type="button"
            onClick={copy}
            className="text-xs text-tertiary hover:text-primary transition-colors"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-secondary">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION
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
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function ProvidersGuideContainer() {
  return (
    <div className="py-10 px-4 mx-auto space-y-16 max-w-5xl sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent-primary">
          E-Crystal Architecture
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          Providers & Layouts
        </h1>
        <p className="mx-auto max-w-xl text-sm text-secondary">
          Complete guide for providers, layouts, theme system, and sidebar
          management.
        </p>
      </header>

      {/* ── TOC ── */}
      <nav className="p-4 rounded-xl border border-border bg-secondary">
        <ul className="flex flex-wrap gap-y-2 gap-x-6 text-sm">
          {[
            ["#overview", "Overview"],
            ["#providers", "Providers"],
            ["#theme", "Theme Provider"],
            ["#layout", "Layout Provider"],
            ["#layouts", "Layout Components"],
            ["#usage", "Usage Examples"],
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
          OVERVIEW
          ════════════════════════════════════════════════════════ */}
      <Section id="overview" title="Overview">
        <div className="p-5 rounded-xl border border-border bg-background">
          <p className="text-sm text-secondary mb-4">Provider hierarchy:</p>
          <div className="font-mono text-xs text-accent-primary bg-secondary/50 p-4 rounded-lg">
            <pre>{`<Providers>
  <LayoutProvider>        ← Sidebar state
    <ThemeProvider>        ← Dark/Light mode
      <AppLayout>          ← Header + Sidebar shell
        {children}
      </AppLayout>
    </ThemeProvider>
  </LayoutProvider>
</Providers>`}</pre>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "ThemeProvider",
              desc: "Dark/Light mode via next-themes",
              file: "providers/theme-provider.tsx",
              icon: "🎨",
            },
            {
              name: "LayoutProvider",
              desc: "Sidebar open/close state",
              file: "providers/layout-provider.tsx",
              icon: "📐",
            },
            {
              name: "AppLayout",
              desc: "Header + Sidebar shell",
              file: "components/layouts/app-layout.tsx",
              icon: "🖼️",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-xl border border-border bg-background"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <code className="text-sm font-semibold text-accent-primary">
                  {item.name}
                </code>
              </div>
              <p className="mt-1 text-xs text-secondary">{item.desc}</p>
              <code className="block mt-2 text-[10px] text-tertiary">
                {item.file}
              </code>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          PROVIDERS
          ════════════════════════════════════════════════════════ */}
      <Section
        id="providers"
        title="Providers"
        desc="Central compositor that wraps all global context providers."
      >
        <CodeBlock
          title="providers/index.tsx"
          code={`"use client";

import { LayoutProvider } from "./layout-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LayoutProvider>
  );
}`}
        />
      </Section>

      {/* ════════════════════════════════════════════════════════
          THEME PROVIDER
          ════════════════════════════════════════════════════════ */}
      <Section
        id="theme"
        title="Theme Provider"
        desc="Manages dark/light mode using next-themes. Press 'D' to toggle."
      >
        <CodeBlock
          title="Basic Usage"
          code={`import { useTheme } from "next-themes";

function MyComponent() {
  const { resolvedTheme, setTheme } = useTheme();

  // resolvedTheme: "light" | "dark"

  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      Current: {resolvedTheme}
    </button>
  );
}`}
        />

        <CodeBlock
          title="With Icon Toggle"
          code={`import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}`}
        />

        <div className="p-4 rounded-xl border border-border bg-background">
          <p className="text-sm font-semibold text-primary mb-2">
            Available Values
          </p>
          <div className="space-y-2 text-xs text-secondary">
            <p>
              <code className="text-accent-primary">theme</code> — User choice:
              &quot;light&quot;, &quot;dark&quot;, or &quot;system&quot;
            </p>
            <p>
              <code className="text-accent-primary">resolvedTheme</code> —
              Actual applied: &quot;light&quot; or &quot;dark&quot;
            </p>
            <p>
              <code className="text-accent-primary">
                setTheme(&quot;dark&quot;)
              </code>{" "}
              — Set to dark
            </p>
            <p>
              <code className="text-accent-primary">
                setTheme(&quot;light&quot;)
              </code>{" "}
              — Set to light
            </p>
            <p>
              <code className="text-accent-primary">
                setTheme(&quot;system&quot;)
              </code>{" "}
              — Follow system preference
            </p>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          LAYOUT PROVIDER
          ════════════════════════════════════════════════════════ */}
      <Section
        id="layout"
        title="Layout Provider"
        desc="Manages sidebar open/close state using useReducer."
      >
        <CodeBlock
          title="Basic Usage"
          code={`import { useLayout } from "@/providers/layout-provider";

function MyComponent() {
  const { state, toggleLeftSidebar, toggleRightSidebar } = useLayout();

  // state.isLeftSidebarOpen: boolean
  // state.isRightSidebarOpen: boolean

  return (
    <div>
      <p>Left sidebar: {state.isLeftSidebarOpen ? "Open" : "Closed"}</p>
      <button onClick={toggleLeftSidebar}>Toggle Left</button>
      <button onClick={toggleRightSidebar}>Toggle Right</button>
    </div>
  );
}`}
        />

        <CodeBlock
          title="Available Actions"
          code={`const { state, dispatch, toggleLeftSidebar, toggleRightSidebar } = useLayout();

// Toggle sidebars
toggleLeftSidebar();
toggleRightSidebar();

// Or use dispatch directly
dispatch({ type: "TOGGLE_LEFT_SIDEBAR" });
dispatch({ type: "TOGGLE_RIGHT_SIDEBAR" });
dispatch({ type: "SET_LEFT_SIDEBAR", payload: true });
dispatch({ type: "SET_RIGHT_SIDEBAR", payload: false });
dispatch({ type: "SET_ACTIVE_ROUTE", payload: "/dashboard" });`}
        />

        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2.5 px-4 font-semibold text-left text-secondary">
                  Action
                </th>
                <th className="py-2.5 px-4 font-semibold text-left text-secondary">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["toggleLeftSidebar()", "Toggle left sidebar open/close"],
                ["toggleRightSidebar()", "Toggle right sidebar open/close"],
                [
                  "SET_LEFT_SIDEBAR",
                  "Set left sidebar state (payload: boolean)",
                ],
                [
                  "SET_RIGHT_SIDEBAR",
                  "Set right sidebar state (payload: boolean)",
                ],
                ["SET_ACTIVE_ROUTE", "Set active route (payload: string)"],
              ].map(([action, desc]) => (
                <tr key={action}>
                  <td className="py-2.5 px-4 font-mono text-xs text-accent-primary">
                    {action}
                  </td>
                  <td className="py-2.5 px-4 text-xs text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          LAYOUT COMPONENTS
          ════════════════════════════════════════════════════════ */}
      <Section
        id="layouts"
        title="Layout Components"
        desc="App shell with header, sidebars, and content area."
      >
        <CodeBlock
          title="AppLayout Structure"
          code={`<AppLayout title="Page Title" subtitle="Optional subtitle">
  {/* Your page content */}
</AppLayout>`}
        />

        <div className="p-5 rounded-xl border border-border bg-background space-y-4">
          <p className="text-sm font-semibold text-primary">Layout Files</p>
          <div className="space-y-2">
            {[
              {
                file: "app-layout.tsx",
                desc: "Main layout wrapper. Auth routes get no chrome, app routes get header + sidebars.",
              },
              {
                file: "top-navbar.tsx",
                desc: "Sticky header with title, search, theme toggle, avatar, sidebar toggle.",
              },
              {
                file: "left-sidebar.tsx",
                desc: "Left navigation with primary and secondary nav items.",
              },
              {
                file: "right-sidebar.tsx",
                desc: "Right panel with AI agents or other contextual content.",
              },
            ].map((item) => (
              <div
                key={item.file}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
              >
                <code className="text-xs text-accent-primary shrink-0">
                  {item.file}
                </code>
                <p className="text-xs text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock
          title="Excluded Routes (No Layout)"
          code={`// These routes render children without the layout shell
const EXCLUDED_PATHS = [
  "/login",
  "/register",
  "/auth/*",
  "/forgot-password",
  "/reset-password",
];`}
        />
      </Section>

      {/* ════════════════════════════════════════════════════════
          USAGE EXAMPLES
          ════════════════════════════════════════════════════════ */}
      <Section id="usage" title="Usage Examples">
        <CodeBlock
          title="Page with Layout"
          code={`// app/dashboard/page.tsx
import { AppLayout } from "@/components/layouts/app-layout";

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard" subtitle="Welcome back!">
      <div className="p-6">
        {/* Your dashboard content */}
      </div>
    </AppLayout>
  );
}`}
        />

        <CodeBlock
          title="Conditional Layout"
          code={`// app/(auth)/login/page.tsx — No layout
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Auth pages bypass AppLayout automatically */}
      <LoginForm />
    </div>
  );
}`}
        />

        <CodeBlock
          title="Custom Header Title"
          code={`import { AppLayout } from "@/components/layouts/app-layout";

export default function SettingsPage() {
  return (
    <AppLayout title="Settings" subtitle="Manage your preferences">
      {/* Header shows "Settings" and subtitle */}
    </AppLayout>
  );
}`}
        />

        <CodeBlock
          title="Sidebar State in Components"
          code={`import { useLayout } from "@/providers/layout-provider";

function ContentArea() {
  const { state } = useLayout();

  return (
    <div
      className="transition-all duration-300"
      style={{
        marginLeft: state.isLeftSidebarOpen ? "256px" : "0",
        marginRight: state.isRightSidebarOpen ? "288px" : "0",
      }}
    >
      {/* Content adjusts based on sidebar state */}
    </div>
  );
}`}
        />
      </Section>

      <footer className="pt-6 text-xs text-center border-t border-border text-tertiary">
        E-Crystal Providers & Layouts Guide
      </footer>
    </div>
  );
}
