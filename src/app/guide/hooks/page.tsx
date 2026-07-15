import type { Metadata } from "next";
import HooksGuideContainer from "./hooks-guide-container";

export const metadata: Metadata = {
  title: "Hooks Guide | E-Crystal",
  description:
    "Complete guide for using queryHooks — useFetchData, useApiMutation, useInfiniteFetchData, and useSafeUpdate.",
};

export default function HooksGuidePage() {
  return <HooksGuideContainer />;
}
