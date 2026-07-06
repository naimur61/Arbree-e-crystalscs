import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a label string by converting camelCase, snake_case, or kebab-case to readable text.
 * Example: "firstName" -> "First Name", "user_name" -> "User Name"
 */
export function LabelAndPlaceholderTextFormat(label: string): string {
  if (!label) return '';
  
  // Handle camelCase and PascalCase
  const withSpaces = label
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  
  // Handle snake_case and kebab-case
  const formatted = withSpaces
    .replace(/[_-]/g, ' ')
    .trim();
  
  // Capitalize first letter of each word
  return formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Password validation rules for strength checking.
 */
export interface PasswordRule {
  test: (value: string) => boolean;
  label: string;
}

export const passwordRules: PasswordRule[] = [
  { test: (value) => value.length >= 8, label: 'At least 8 characters' },
  { test: (value) => /[A-Z]/.test(value), label: 'At least one uppercase letter' },
  { test: (value) => /[a-z]/.test(value), label: 'At least one lowercase letter' },
  { test: (value) => /[0-9]/.test(value), label: 'At least one number' },
  { test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), label: 'At least one special character' },
];

/**
 * Masks a string by showing only the last N characters.
 * Useful for phone numbers and sensitive data.
 */
export function maskString(value: string, visibleChars: number = 4): string {
  if (!value) return '';
  if (value.length <= visibleChars) return value;
  
  const masked = '*'.repeat(value.length - visibleChars);
  return masked + value.slice(-visibleChars);
}
