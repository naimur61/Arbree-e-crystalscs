"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Shield, TrendingUp } from "lucide-react";

const DONUT_DATA = [
  { name: "Low Risk", value: 65, color: "var(--icon-success-primary)" },
  { name: "Medium Risk", value: 20, color: "var(--icon-warning-primary)" },
  { name: "High Risk", value: 10, color: "var(--icon-error-primary)" },
  { name: "Unknown", value: 5, color: "var(--text-tertiary)" },
];

const BAR_DATA = [
  { month: "Jan", score: 82 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 72 },
  { month: "May", score: 88 },
  { month: "Jun", score: 91 },
];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg border bg-primary border-primary shadow-sm">
        <p className="text-sm font-medium text-primary">{payload[0].name}</p>
        <p className="text-sm text-secondary">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
}

export function RiskChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Donut Chart - Risk Breakdown */}
      <div className="rounded-xl border border-primary bg-primary shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-info-primary">
              <Shield className="w-4 h-4 icon-info-primary" />
            </div>
            <h3 className="text-sm font-semibold text-primary">
              Supplier Risk Distribution
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-6">
            {/* Donut */}
            <div className="shrink-0" style={{ width: 160, height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DONUT_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {DONUT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2.5">
              {DONUT_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-secondary">{item.name}</span>
                  <span className="ml-auto text-sm font-semibold text-primary">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart - Compliance Score Trend */}
      <div className="rounded-xl border border-primary bg-primary shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-7 h-7 rounded-lg bg-success-primary">
              <TrendingUp className="w-4 h-4 icon-success-primary" />
            </div>
            <h3 className="text-sm font-semibold text-primary">
              Compliance Score Trend
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div style={{ width: "100%", height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BAR_DATA}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="score"
                  radius={[4, 4, 0, 0]}
                  fill="var(--color-chart-3, #22c55e)"
                  maxBarSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
