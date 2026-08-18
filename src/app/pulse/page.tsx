import type { Metadata } from "next";
import PulseContainer from "./pulse-container";

export const metadata: Metadata = {
  title: "Pulse — e-CRYSTAL FLOW™ Supplier Risk Dashboard",
  description:
    "Continuous oversight of supplier breaches, shared infrastructure incidents, and supply-chain risk radius.",
};

export default function PulsePage() {
  return <PulseContainer />;
}
