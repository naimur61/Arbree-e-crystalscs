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
  /**
   * Max characters to render before truncating.
   * Opt-in feature: when omitted (default), the text is shown in full and no
   * "See more" toggle is rendered.
   */
  limit?: number;
  /**
   * When `limit` is set, choose how overflow is handled:
   *  - `false` (default): truncate + render a "See more" toggle button.
   *  - `true`: truncate + reveal the full text in a hover tooltip (no button).
   */
  tooltip?: boolean;
  /** Label for the expand ("See more") toggle. */
  seeMoreText?: string;
  /** Label for the collapse ("See less") toggle. */
  seeLessText?: string;
  children: React.ReactNode;
}
