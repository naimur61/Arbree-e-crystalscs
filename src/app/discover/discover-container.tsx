import { FlowBanner } from "@/components/common/ui/flow-banner";
import { MetricsGrid } from "./_assets/components/metrics-grid";
import { SupplierTable } from "./_assets/components/supplier-table";
import MarketView from "./_assets/components/market-view";

export default function DiscoverContainer() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto p-4">
        <FlowBanner currentPage="discover" />
        <MetricsGrid />
        <SupplierTable />
        <MarketView />
      </div>
    </main>
  );
}
