import type { Metadata } from "next";
import ActivateContainer from "./activate-container";

export const metadata: Metadata = {
  title: "Activate | E-Crystal",
  description:
    "Complete design system guide — colors, typography, spacing, and utility classes.",
};

export default function ActivatePage() {
  return (
    <>
      <ActivateContainer />
    </>
  );
}
