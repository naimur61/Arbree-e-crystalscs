// ═══════════════════════════════════════════════════════════
// BUTTON CONFIGURATION
// CVA variants + config objects + utility helpers
// ═══════════════════════════════════════════════════════════

import { cva, type VariantProps } from "class-variance-authority";
import type {
  ButtonVariant,
  ButtonSize,
  ButtonTypography,
  IconSize,
  TypographyConfig,
  IconSizeConfig,
} from "./button-type";

// ─────────────────────────────────────────────────────────
// CVA VARIANT DEFINITIONS
// ─────────────────────────────────────────────────────────

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      // ── Variant ──
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-sm",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-br from-[#004706] via-[#009D36] to-[#004706] text-white hover:opacity-90 shadow-md",
      },

      // ── Size ──
      size: {
        xs: "h-6 rounded-md px-2 text-xs gap-1.5",
        sm: "h-8 rounded-md px-3 text-sm gap-1.5",
        default: "h-9 rounded-md px-4 text-sm gap-2",
        lg: "h-10 rounded-md px-6 text-base gap-2",
        xl: "h-12 rounded-lg px-8 text-lg gap-2.5",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-4",
        icon: "size-9 rounded-md [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-10 rounded-md [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-12 rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },

      // ── Shadow ──
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        glow: "shadow-[0_0_20px_rgba(0,157,54,0.4)]",
      },

      // ── Radius ──
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      // ── Animation ──
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
        shake: "animate-shake",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ─────────────────────────────────────────────────────────
// TYPOGRAPHY CONFIG
// ─────────────────────────────────────────────────────────

export const typographyConfig: TypographyConfig = {
  caption: "text-xs leading-tight",
  "body-sm": "text-sm leading-normal",
  body: "text-base leading-normal",
  "body-lg": "text-lg leading-relaxed",
  label: "text-sm font-medium leading-normal",
  heading: "text-base font-semibold leading-tight",
};

// ─────────────────────────────────────────────────────────
// ICON SIZE CONFIG
// ─────────────────────────────────────────────────────────

export const iconSizeConfig: IconSizeConfig = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
};

// ─────────────────────────────────────────────────────────
// VARIANT LABELS (for display/documentation)
// ─────────────────────────────────────────────────────────

export const variantLabels: Record<ButtonVariant, string> = {
  default: "Default",
  destructive: "Destructive",
  outline: "Outline",
  secondary: "Secondary",
  ghost: "Ghost",
  link: "Link",
  gradient: "Gradient",
};

export const sizeLabels: Record<ButtonSize, string> = {
  xs: "Extra Small",
  sm: "Small",
  default: "Default",
  lg: "Large",
  xl: "Extra Large",
  "icon-xs": "Icon XS",
  "icon-sm": "Icon Small",
  icon: "Icon Default",
  "icon-lg": "Icon Large",
  "icon-xl": "Icon XL",
};

// ─────────────────────────────────────────────────────────
// HELPER: Get all variant options
// ─────────────────────────────────────────────────────────

export const getVariantOptions = () =>
  Object.entries(variantLabels).map(([value, label]) => ({
    value: value as ButtonVariant,
    label,
  }));

export const getSizeOptions = () =>
  Object.entries(sizeLabels).map(([value, label]) => ({
    value: value as ButtonSize,
    label,
  }));

export const getTypographyOptions = () =>
  Object.entries(typographyConfig).map(([value]) => ({
    value: value as ButtonTypography,
    label: value.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

export const getIconSizeOptions = () =>
  Object.entries(iconSizeConfig).map(([value]) => ({
    value: value as IconSize,
    label: value.toUpperCase(),
  }));

// ── Export types ──
export type ButtonVariants = VariantProps<typeof buttonVariants>;
