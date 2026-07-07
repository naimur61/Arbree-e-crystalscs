import { MetricCard } from "./metric-card";

const metricsData = [
  {
    label: "Total Suppliers",
    value: 487,
    change: 12,
    trend: "up" as const,
    target: "Target: 500",
    progressLabel: "vs. last quarter",
    progressValue: 97,
    accentColor: "green" as const,
  },
  {
    label: "New This Month",
    value: 23,
    change: 12,
    trend: "up" as const,
    target: "Monthly target: 30",
    progressLabel: "vs. last 30 days",
    progressValue: 97,
    accentColor: "blue" as const,
  },
  {
    label: "Incomplete",
    value: 23,
    change: 12,
    trend: "up" as const,
    subtitle: "6.4% need classification",
    progressLabel: "resolved last week",
    progressValue: 97,
    accentColor: "orange" as const,
  },
  {
    label: "High Risk (Initial)",
    value: 23,
    change: 12,
    trend: "up" as const,
    subtitle: "8.6% of total base",
    progressLabel: "vs. last quarter",
    progressValue: 97,
    accentColor: "red" as const,
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metricsData.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}
