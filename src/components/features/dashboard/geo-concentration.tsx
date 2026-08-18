import { Globe } from "lucide-react";
import { CardContainer } from "@/components/common/card";
import GeoMap from "@/components/features/dashboard/geo-map";

export function GeoConcentration() {
  return (
    <CardContainer
      icon={<Globe className="w-4 h-4 text-emerald-600" />}
      title="Geo-Concentration & Dependency Map"
      subtitle="Hover markers for supplier detail"
    >
      <GeoMap />
    </CardContainer>
  );
}
