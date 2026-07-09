/* ──────────────────────────────────────────────────────────────
   Typography — Types
   ────────────────────────────────────────────────────────────── */

import * as React from "react";
import { themeConfig } from "@/lib/theme/theme.config";

/* ── All 18 typography variants ── */
export type TypographyVariant =
  | "title-1"
  | "title-2"
  | "title-3"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-1"
  | "body-2"
  | "body-3"
  | "body-4"
  | "label-1"
  | "label-2"
  | "label-3"
  | "caption-1"
  | "caption-2";

/* ── Text color from theme palette ── */
export type TypographyColor = keyof typeof themeConfig.colors.text;

/* ── Font weight override ── */
export type TypographyWeight = keyof typeof themeConfig.typography.weight;

/* ── Props shared by dynamic component and named tags ── */
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** The typography style token */
  variant: TypographyVariant;
  /** Override the rendered HTML element */
  as?: React.ElementType;
  /** Text color from the theme palette */
  color?: TypographyColor;
  /** Override font weight */
  weight?: TypographyWeight;
  children: React.ReactNode;
}
