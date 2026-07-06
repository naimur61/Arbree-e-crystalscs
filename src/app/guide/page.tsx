import type { Metadata } from "next";
import GuideContainer from "./guide-container";

export const metadata: Metadata = {
  title: "Design Guide | E-Crystal",
  description:
    "Complete design system guide — colors, typography, spacing, and utility classes.",
};

export default function GuidePage() {
  return (
    <>
      <GuideContainer />
    </>
  );
}
