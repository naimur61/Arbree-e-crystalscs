import * as React from "react";

export type TypographyVariant =
  "title" | "heading" | "body" | "label" | "caption";

export type TypographyWeight =
  | "thin"
  | "extralight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TypographyLevels = {
  title: "1" | "2" | "3";
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  body: "1" | "2" | "3" | "4";
  label: "1" | "2" | "3";
  caption: "1" | "2";
};

export type TypographyProps<V extends TypographyVariant = TypographyVariant> = {
  variant: V;
  level: TypographyLevels[V];
  as?: React.ElementType;
  weight?: TypographyWeight;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;
