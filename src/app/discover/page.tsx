import type { Metadata } from "next";
import DiscoverContainer from "./discover-container";

export const metadata: Metadata = {
  title: "Discover | E-Crystal",
  description:
    "Complete design system guide — colors, typography, spacing, and utility classes.",
};

export default function DiscoverPage() {
  return (
    <>
      <DiscoverContainer />
    </>
  );
}
