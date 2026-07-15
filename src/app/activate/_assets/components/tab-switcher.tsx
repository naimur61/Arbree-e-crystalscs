"use client";

const TABS = [
  { key: "suppliers", label: "Suppliers" },
  { key: "services", label: "Services" },
  { key: "functions", label: "Functions" },
] as const;

interface TabSwitcherProps {
  activeTab: "suppliers" | "services" | "functions";
  onTabChange: (tab: "suppliers" | "services" | "functions") => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);
  const tabWidth = 100 / TABS.length;

  return (
    <div className="relative inline-flex items-center bg-emerald-50 rounded-full p-1 select-none">
      {/* Sliding active pill */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-gradient-to-br from-[#004706] via-[#009D36] to-[#004706] shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `calc(${tabWidth}% - 4px)`,
          left: `calc(${tabWidth * activeIndex}% + 2px)`,
        }}
      />
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
            activeTab === tab.key
              ? "text-white"
              : "text-secondary hover:text-primary"
          }`}
          style={{ minWidth: 100 }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
