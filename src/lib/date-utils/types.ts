/** Date, ISO string, or timestamp */
export type DateInput = Date | string | number;

/** ISO 8601 string with Z suffix */
export type ISOString =
  `${string}-${string}-${string}T${string}:${string}:${string}.${string}Z`;

/** Locale code for Intl formatting */
export type LocaleCode =
  "en-US" | "en-GB" | "fr-FR" | "de-DE" | "es-ES" | (string & {});

/** Base options for formatting functions */
export interface FormatOptions {
  /** Convert UTC to local timezone */
  local?: boolean;
  /** Locale for output (default: "en-US") */
  locale?: LocaleCode;
}

/** Options for time12h() */
export interface Time12hOptions extends FormatOptions {
  /** Show relative prefix like "Today", "Yesterday" */
  relative?: boolean | "day";
}

/** Options for fullDateTime() */
export interface FullDateTimeOptions extends FormatOptions {
  /** Include time in output */
  showTime?: boolean;
}

/** Date format patterns */
export type DateFormatPattern =
  | "YYYY-MM-DD"
  | "DD-MM-YYYY"
  | "MM-DD-YYYY"
  | "YYYY/MM/DD"
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "DD.MM.YYYY"
  | "YYYY"
  | "MM-YYYY"
  | "DD-MM"
  | "MMMM YYYY"
  | "MMM YYYY"
  | "DD MMMM YYYY"
  | "DD MMM"
  | "DD MMM YYYY";

/** Options for formatDate() */
export interface CustomFormatDateOptions extends FormatOptions {
  format?: DateFormatPattern;
}

/** Duration unit types */
export type DurationUnit =
  "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds";

/** Options for duration() */
export interface DurationOptions {
  /** Specific units to display */
  units?: DurationUnit[];
  /** Max units to show */
  maxUnits?: number;
  /** Short labels (e.g., "y" instead of "year") */
  abbreviated?: boolean;
  locale?: LocaleCode;
}

/** Relative time format styles */
export type RelativeTimeFormat = "auto" | "always" | "verbose" | "narrow";

/** Options for relativeTime() */
export interface RelativeTimeOptions {
  format?: RelativeTimeFormat;
  locale?: LocaleCode;
  /** Days before switching to absolute date (default: 7) */
  threshold?: number;
}

/** Duration breakdown */
export interface DurationBreakdown {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalMs: number;
}

/** Comparison result */
export type DateComparisonResult = "past" | "present" | "future";

/** Date range */
export interface DateRange {
  start: DateInput;
  end: DateInput;
}

/** Quarter (1-4) */
export type Quarter = 1 | 2 | 3 | 4;
