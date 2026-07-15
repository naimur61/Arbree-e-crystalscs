import { MetricsGrid } from "./_assets/components/metrics-grid";
import { SupplierTable } from "./_assets/components/supplier-table";
import MarketView from "./_assets/components/market-view";
import { FlowBanner } from "@/components/features/shared/flow-banner";

export default function DiscoverContainer() {
  return (
    <main className="min-h-screen">
      <div className="p-4 mx-auto">
        <FlowBanner currentPage="discover" />
        <MetricsGrid />
        <SupplierTable />
        <MarketView />
      </div>
    </main>
  );
}
