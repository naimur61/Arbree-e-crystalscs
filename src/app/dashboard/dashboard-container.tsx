import { FlowBanner } from "@/components/features/shared/flow-banner";
import { KpiCards } from "@/components/features/dashboard/kpi-cards";
import { InsightPanels } from "@/components/features/dashboard/insight-panels";
import { RiskChart } from "@/components/features/dashboard/risk-chart";
import { GeoConcentration } from "@/components/features/dashboard/geo-concentration";
import { SupplierHealthCheck } from "@/components/features/dashboard/supplier-health-check";
import { CrystalAlerts } from "@/components/features/dashboard/crystal-alerts";
import { CrystalInsights } from "@/components/features/dashboard/crystal-insights";
import { UpsellBanner } from "@/components/features/dashboard/upsell-banner";

const DashboardContainer = () => {
  return (
    <div className="space-y-4">
      {/* Flow Banner */}
      <FlowBanner currentPage="dashboard" />
      {/* KPI Cards */}
      <KpiCards />

      {/* Supplier Health Check & Geo-Concentration Map */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <SupplierHealthCheck />
        <GeoConcentration />
      </div>

      {/* Insight Panels */}
      <InsightPanels />
      {/* Risk Chart */}
      <RiskChart />
      {/* e-Crystal Alerts */}
      <CrystalAlerts />
      {/* e-Crystal Insights */}
      <CrystalInsights />
      {/* Upsell Banner */}
      <UpsellBanner />
    </div>
  );
};

export default DashboardContainer;
