import type { Metadata } from "next";
import EvolveContainer from "./evolve-container";

export const metadata: Metadata = {
  title: "Evolve | E-Crystal",
  description:
    "Complete design system guide — colors, typography, spacing, and utility classes.",
};

export default function EvolvePage() {
  return (
    <>
      <EvolveContainer />
    </>
  );
}
