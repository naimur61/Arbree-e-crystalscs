import { FlowBanner } from "@/components/features/shared/flow-banner";
import { KpiCards } from "@/components/features/dashboard/kpi-cards";
import { InsightPanels } from "@/components/features/dashboard/insight-panels";
import { RiskChart } from "@/components/features/dashboard/risk-chart";

const DashboardContainer = () => {
  return (
    <div className="space-y-4">
      {/* Flow Banner */}
      <FlowBanner currentPage="dashboard" />

      {/* KPI Cards */}
      <KpiCards />

      {/* Insight Panels */}
      <InsightPanels />

      {/* Risk Chart */}
      <RiskChart />
    </div>
  );
};

export default DashboardContainer;
