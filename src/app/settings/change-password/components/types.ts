/* =========================================================================
   TYPES
   ========================================================================= */

export interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

export const REQUIREMENTS: PasswordRequirement[] = [
  {
    id: "length",
    label: "At least 12 characters",
    test: (p) => p.length >= 12,
  },
  {
    id: "upper",
    label: "One uppercase letter (A–Z)",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lower",
    label: "One lowercase letter (a–z)",
    test: (p) => /[a-z]/.test(p),
  },
  { id: "number", label: "One number (0–9)", test: (p) => /[0-9]/.test(p) },
  {
    id: "symbol",
    label: "One symbol (!@#$...)",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
  {
    id: "no-spaces",
    label: "No spaces",
    test: (p) => p.length > 0 && !/\s/.test(p),
  },
];
