import * as React from "react";
import { cn } from "@/lib/utils";
import { themeConfig } from "@/lib/theme/theme.config";

import type {
  TypographyLevels,
  TypographyProps,
  TypographyVariant,
} from "./Typography-type";

// Mapped type that preserves the variant-to-level relationship
type DefaultTagMap = {
  [V in TypographyVariant]: {
    [L in TypographyLevels[V]]: keyof React.JSX.IntrinsicElements;
  };
};

const defaultTags: DefaultTagMap = {
  title: {
    "1": "h1",
    "2": "h2",
    "3": "h3",
  },
  heading: {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  },
  body: {
    "1": "p",
    "2": "p",
    "3": "p",
    "4": "p",
  },
  label: {
    "1": "label",
    "2": "label",
    "3": "label",
  },
  caption: {
    "1": "span",
    "2": "span",
  },
};

export function Typography<V extends TypographyVariant>({
  variant,
  level,
  as,
  weight,
  className,
  children,
  ...props
}: TypographyProps<V>) {
  const typographyClass = (
    themeConfig.typography as Record<TypographyVariant, Record<string, string>>
  )[variant][level];

  const weightClass = weight
    ? themeConfig.typography.weight[weight]
    : undefined;

  const Component =
    as ??
    (
      defaultTags as Record<
        TypographyVariant,
        Record<string, keyof React.JSX.IntrinsicElements>
      >
    )[variant][level];

  return React.createElement(
    Component,
    {
      className: cn(typographyClass, weightClass, className),
      ...props,
    },
    children,
  );
}

export default Typography;
