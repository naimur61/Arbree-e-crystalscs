import type { Metadata } from "next";
import ProvidersGuideContainer from "./providers-guide-container";

export const metadata: Metadata = {
  title: "Providers & Layouts Guide | E-Crystal",
  description:
    "Complete guide for providers, layouts, and theme system in E-Crystal.",
};

export default function ProvidersGuidePage() {
  return <ProvidersGuideContainer />;
}
