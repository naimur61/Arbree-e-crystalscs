// ═══════════════════════════════════════════════════════════
// BUTTON TYPE DEFINITIONS
// All button-related types in one place
// ═══════════════════════════════════════════════════════════

import { type ButtonHTMLAttributes, type ReactNode } from "react";

// ── Variants ──
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "gradient";

// ── Sizes ──
export type ButtonSize =
  | "xs"
  | "sm"
  | "default"
  | "lg"
  | "xl"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg"
  | "icon-xl";

// ── Typography ──
export type ButtonTypography =
  "caption" | "body-sm" | "body" | "body-lg" | "label" | "heading";

// ── Icon Sizes ──
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

// ── Shadow ──
export type ButtonShadow = "none" | "sm" | "md" | "lg" | "xl" | "glow";

// ── Border Radius ──
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

// ── Animation ──
export type ButtonAnimation = "none" | "pulse" | "bounce" | "spin" | "shake";

// ── Tooltip Side ──
export type TooltipSide = "top" | "right" | "bottom" | "left";

// ── Button Props ──
export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "button" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  typography?: ButtonTypography;
  iconSize?: IconSize;
  shadow?: ButtonShadow;
  radius?: ButtonRadius;
  animation?: ButtonAnimation;
  btnStyle?: string;
  tooltipStyle?: string;
  tooltipContent?: string;
  buttonContent?: ReactNode;
  icon?: ReactNode;
  lastIcon?: ReactNode;
  isPending?: boolean;
  handleOpen?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  side?: TooltipSide;
  loadingContent?: ReactNode;
}

// ── Typography Config ──
export interface TypographyConfig {
  caption: string;
  "body-sm": string;
  body: string;
  "body-lg": string;
  label: string;
  heading: string;
}

// ── Icon Size Config ──
export interface IconSizeConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
