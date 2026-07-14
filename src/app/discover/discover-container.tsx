import { MetricsGrid } from "./_assets/components/metrics-grid";
import { SupplierTable } from "./_assets/components/supplier-table";
import MarketView from "./_assets/components/market-view";
import { FlowBanner } from "@/components/features/ui/flow-banner";

export default function DiscoverContainer() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="p-4 mx-auto">
        <FlowBanner currentPage="discover" />
        <MetricsGrid />
        <SupplierTable />
        <MarketView />
      </div>
    </main>
  );
}
