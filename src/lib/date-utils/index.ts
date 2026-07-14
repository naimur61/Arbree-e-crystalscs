import type {
  DateInput,
  ISOString,
  LocaleCode,
  FormatOptions,
  Time12hOptions,
  FullDateTimeOptions,
  DateFormatPattern,
  CustomFormatDateOptions,
  DurationOptions,
  DurationBreakdown,
  RelativeTimeOptions,
  DateComparisonResult,
  DateRange,
  Quarter,
} from "./types";

export type * from "./types";

/* -------------------------------------------------------------------------- */
/*                               Internal Helpers                              */
/* -------------------------------------------------------------------------- */

/** Safely convert input to Date, returns null if invalid */
function toDateOrNull(input: DateInput | null | undefined): Date | null {
  if (input == null) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  if (typeof input === "string") {
    if (input.trim() === "") return null;
    const d = new Date(input);
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

/** Convert input to Date or throw */
function toDate(input: DateInput, label = "Date"): Date {
  const d = toDateOrNull(input);
  if (!d) throw new Error(`Invalid ${label}: ${String(input)}`);
  return d;
}

/** Convert ISO to local if requested */
function toLocalIfNeeded(date: Date, input: DateInput, local: boolean): Date {
  if (!local) return date;
  if (
    typeof input === "string" &&
    (input.includes("Z") || input.includes("+"))
  ) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }
  return date;
}

/** Pluralize: pluralize(2, "year") => "years" */
function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

/** Pad number with zeros */
function padZero(num: number, length = 2): string {
  return String(num).padStart(length, "0");
}

/* -------------------------------------------------------------------------- */
/*                              ISO Conversion                                 */
/* -------------------------------------------------------------------------- */

/**
 * Convert local date to ISO UTC string.
 * @example localToISO(new Date(2025, 5, 17, 14, 30)) // "2025-06-17T08:30:00.000Z"
 */
export function localToISO(date: DateInput): ISOString {
  const d = toDate(date, "Local date");
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString() as ISOString;
}

/** Convert Date to ISO without timezone conversion */
export function dateToISO(date: DateInput): ISOString {
  return toDate(date).toISOString() as ISOString;
}

/** Create ISO date from components (year, month 1-12, day, etc.) */
export function createISODate(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
): ISOString {
  const d = new Date(year, month - 1, day, hours, minutes, seconds);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    throw new Error(`Invalid date: ${year}-${month}-${day}`);
  }
  return localToISO(d);
}

/** Parse "2:30 PM" + date into ISO string */
export function toISOFromTime(
  referenceDate: DateInput,
  timeString: string,
): ISOString {
  const base = toDate(referenceDate, "Reference date");
  const match = timeString.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match)
    throw new Error(`Invalid time: "${timeString}". Use "HH:MM AM/PM"`);

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (hours < 1 || hours > 12)
    throw new Error(`Hours must be 1-12, got ${hours}`);
  if (minutes < 0 || minutes > 59)
    throw new Error(`Minutes must be 0-59, got ${minutes}`);

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return localToISO(
    new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      hours,
      minutes,
    ),
  );
}

/** Parse "14:30" (24h) + date into ISO string */
export function toISOFromTime24h(
  referenceDate: DateInput,
  timeString: string,
): ISOString {
  const base = toDate(referenceDate, "Reference date");
  const match = timeString.trim().match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (!match) throw new Error(`Invalid time: "${timeString}". Use "HH:MM"`);

  return localToISO(
    new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      parseInt(match[1], 10),
      parseInt(match[2], 10),
    ),
  );
}

/* -------------------------------------------------------------------------- */
/*                              Formatting                                     */
/* -------------------------------------------------------------------------- */

/** Returns "Jun 2025" */
export function toMonthYear(
  input: DateInput,
  options: FormatOptions = {},
): string {
  const { local = false, locale = "en-US" } = options;
  const date = toLocalIfNeeded(toDate(input), input, local);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Returns "2:30 PM" with optional relative prefix */
export function time12h(
  input: DateInput,
  options: Time12hOptions = {},
  relative?: boolean | "day",
): string {
  const { local = false, locale = "en-US", relative: optRelative } = options;
  const showRelative = optRelative ?? relative ?? false;
  const date = toLocalIfNeeded(toDate(input), input, local);

  const time = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  if (!showRelative) return time;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const inputDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const diffDays = Math.floor(
    (today.getTime() - inputDay.getTime()) / 86400000,
  );

  if (showRelative === "day" && diffDays > 7) {
    const fmt: DateFormatPattern =
      date.getFullYear() !== now.getFullYear() ? "DD MMM YYYY" : "DD MMM";
    return formatDate(input, { local, locale, format: fmt }) + ", " + time;
  }

  if (diffDays === 0) return `Today, ${time}`;
  if (diffDays === 1) return `Yesterday, ${time}`;
  if (diffDays > 1 && diffDays < 7) {
    return (
      new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date) +
      ", " +
      time
    );
  }

  const fmt: DateFormatPattern =
    date.getFullYear() !== now.getFullYear() ? "DD MMM YYYY" : "DD MMM";
  return formatDate(date, { local: false, format: fmt }) + ", " + time;
}

/** Returns "14:30" */
export function time24h(input: DateInput, options: FormatOptions = {}): string {
  const { local = false, locale = "en-GB" } = options;
  const date = toLocalIfNeeded(toDate(input), input, local);
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/** Format date with pattern like "DD-MM-YYYY", "MMMM YYYY", etc. */
export function formatDate(
  input: DateInput,
  options: CustomFormatDateOptions = {},
): string {
  const { local = false, locale = "en-US", format = "YYYY-MM-DD" } = options;
  const date = toLocalIfNeeded(toDate(input), input, local);

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const monthFull = new Intl.DateTimeFormat(locale, { month: "long" }).format(
    date,
  );
  const monthShort = new Intl.DateTimeFormat(locale, { month: "short" }).format(
    date,
  );

  switch (format) {
    case "YYYY":
      return String(y);
    case "MM-YYYY":
      return `${padZero(m)}-${y}`;
    case "DD-MM":
      return `${padZero(d)}-${padZero(m)}`;
    case "DD-MM-YYYY":
      return `${padZero(d)}-${padZero(m)}-${y}`;
    case "MM-DD-YYYY":
      return `${padZero(m)}-${padZero(d)}-${y}`;
    case "YYYY/MM/DD":
      return `${y}/${padZero(m)}/${padZero(d)}`;
    case "DD/MM/YYYY":
      return `${padZero(d)}/${padZero(m)}/${y}`;
    case "MM/DD/YYYY":
      return `${padZero(m)}/${padZero(d)}/${y}`;
    case "DD.MM.YYYY":
      return `${padZero(d)}.${padZero(m)}.${y}`;
    case "MMMM YYYY":
      return `${monthFull} ${y}`;
    case "MMM YYYY":
      return `${monthShort} ${y}`;
    case "DD MMMM YYYY":
      return `${padZero(d)} ${monthFull} ${y}`;
    case "DD MMM":
      return `${padZero(d)} ${monthShort}`;
    case "DD MMM YYYY":
      return `${padZero(d)} ${monthShort} ${y}`;
    default:
      return `${y}-${padZero(m)}-${padZero(d)}`;
  }
}

/** Returns "24 June 2025, 03:30 PM" */
export function fullDateTime(
  input: DateInput,
  options: FullDateTimeOptions = {},
): string {
  const { local = false, locale = "en-GB", showTime = true } = options;
  const date = toLocalIfNeeded(toDate(input), input, local);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...(showTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
  }).format(date);
}

/** Returns "2 hours ago" or "in 3 days" */
export function relativeTime(
  input: DateInput,
  options: RelativeTimeOptions = {},
): string {
  const { format = "auto", locale = "en-US", threshold = 7 } = options;
  const date = toDate(input);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const absMs = Math.abs(diffMs);
  const isPast = diffMs < 0;

  const seconds = Math.floor(absMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (days > threshold) {
    return formatDate(date, { locale, format: "DD MMM YYYY" });
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const pick = (val: number, unit: Intl.RelativeTimeFormatUnit) =>
    rtf.format(isPast ? -val : val, unit);

  if (format === "narrow" || format === "always") {
    if (years > 0) return pick(years, "year");
    if (months > 0) return pick(months, "month");
    if (weeks > 0) return pick(weeks, "week");
    if (days > 0) return pick(days, "day");
    if (hours > 0) return pick(hours, "hour");
    if (minutes > 0) return pick(minutes, "minute");
    return pick(seconds, "second");
  }

  // auto/verbose
  if (days === 0) {
    if (hours > 0) return isPast ? `${hours}h ago` : `in ${hours}h`;
    if (minutes > 0) return isPast ? `${minutes}m ago` : `in ${minutes}m`;
    return isPast ? `${seconds}s ago` : `in ${seconds}s`;
  }

  if (years > 0) return pick(years, "year");
  if (months > 0) return pick(months, "month");
  if (weeks > 0) return pick(weeks, "week");
  return pick(days, "day");
}

/* -------------------------------------------------------------------------- */
/*                              Duration                                       */
/* -------------------------------------------------------------------------- */

/** Get detailed duration breakdown between two dates */
export function getDurationBreakdown(
  start: DateInput,
  end?: DateInput | null,
): DurationBreakdown {
  const s = toDate(start, "Start date");
  const e = end ? toDate(end, "End date") : new Date();
  if (e < s) throw new Error("End date must be after start date");

  const totalMs = e.getTime() - s.getTime();
  const totalSec = Math.floor(totalMs / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHr = Math.floor(totalMin / 60);
  const totalDays = Math.floor(totalHr / 24);

  let years = e.getFullYear() - s.getFullYear();
  let months = e.getMonth() - s.getMonth();
  let days = e.getDate() - s.getDate();

  if (days < 0) {
    months--;
    days += new Date(e.getFullYear(), e.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const weeks = Math.floor(days / 7);
  const remDays = days % 7;

  return {
    years,
    months,
    weeks,
    days: remDays,
    hours: totalHr % 24,
    minutes: totalMin % 60,
    seconds: totalSec % 60,
    totalDays,
    totalHours: totalHr,
    totalMinutes: totalMin,
    totalSeconds: totalSec,
    totalMs,
  };
}

/** Format duration: "2 years 5 months" or with options */
export function duration(
  start: DateInput,
  end?: DateInput | null,
  options: DurationOptions = {},
): string {
  const { units, maxUnits, abbreviated = false } = options;
  const b = getDurationBreakdown(start, end);

  const labels = abbreviated
    ? {
        years: "y",
        months: "mo",
        weeks: "w",
        days: "d",
        hours: "h",
        minutes: "m",
        seconds: "s",
      }
    : {
        years: "year",
        months: "month",
        weeks: "week",
        days: "day",
        hours: "hour",
        minutes: "minute",
        seconds: "second",
      };

  const defaultUnits: Array<keyof typeof labels> = (() => {
    if (b.years > 0) return ["years", "months"];
    if (b.months > 0) return ["months", "days"];
    if (b.weeks > 0) return ["weeks", "days"];
    if (b.days > 0) return ["days", "hours"];
    if (b.hours > 0) return ["hours", "minutes"];
    if (b.minutes > 0) return ["minutes", "seconds"];
    return ["seconds"];
  })();

  const result: string[] = [];
  for (const unit of units ?? defaultUnits) {
    const val = b[unit as keyof DurationBreakdown] as number;
    if (val > 0) {
      result.push(
        `${val} ${pluralize(val, labels[unit as keyof typeof labels])}`,
      );
      if (maxUnits && result.length >= maxUnits) break;
    }
  }

  if (!result.length) return abbreviated ? "0s" : "0 seconds";
  if (result.length === 1) return result[0];
  if (result.length === 2) return result.join(" and ");
  return result.slice(0, -1).join(", ") + ", and " + result.slice(-1);
}

/* -------------------------------------------------------------------------- */
/*                              Date Queries                                   */
/* -------------------------------------------------------------------------- */

/** Is date today? */
export function isToday(input: DateInput): boolean {
  const d = toDate(input);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

/** Is date yesterday? */
export function isYesterday(input: DateInput): boolean {
  const d = toDate(input);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return (
    d.getFullYear() === y.getFullYear() &&
    d.getMonth() === y.getMonth() &&
    d.getDate() === y.getDate()
  );
}

/** Is date tomorrow? */
export function isTomorrow(input: DateInput): boolean {
  const d = toDate(input);
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  );
}

/** Are both dates the same day? */
export function isSameDay(d1: DateInput, d2: DateInput): boolean {
  const a = toDate(d1),
    b = toDate(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Is date in the past? */
export function isPast(input: DateInput): boolean {
  return toDate(input).getTime() < Date.now();
}

/** Is date in the future? */
export function isFuture(input: DateInput): boolean {
  return toDate(input).getTime() > Date.now();
}

/** Compare two dates: "past", "present", or "future" */
export function compareDates(
  d1: DateInput,
  d2: DateInput,
): DateComparisonResult {
  const diff = toDate(d1).getTime() - toDate(d2).getTime();
  return Math.abs(diff) < 1000 ? "present" : diff < 0 ? "past" : "future";
}

/** Is date within range? */
export function isInRange(input: DateInput, range: DateRange): boolean {
  const t = toDate(input).getTime();
  return (
    t >= toDate(range.start, "Range start").getTime() &&
    t <= toDate(range.end, "Range end").getTime()
  );
}

/* -------------------------------------------------------------------------- */
/*                              Date Manipulation                              */
/* -------------------------------------------------------------------------- */

/** Get start of day (00:00:00) */
export function startOfDay(input: DateInput): Date {
  const d = toDate(input);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

/** Get end of day (23:59:59.999) */
export function endOfDay(input: DateInput): Date {
  const d = toDate(input);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

/** Get start of month */
export function startOfMonth(input: DateInput): Date {
  const d = toDate(input);
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

/** Get end of month */
export function endOfMonth(input: DateInput): Date {
  const d = toDate(input);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

/** Get start of year */
export function startOfYear(input: DateInput): Date {
  const d = toDate(input);
  return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}

/** Get end of year */
export function endOfYear(input: DateInput): Date {
  const d = toDate(input);
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

/** Add time: addTime(date, 7, "days") */
export function addTime(
  input: DateInput,
  amount: number,
  unit: "days" | "weeks" | "months" | "years" | "hours" | "minutes" | "seconds",
): Date {
  const d = new Date(toDate(input));
  switch (unit) {
    case "seconds":
      d.setSeconds(d.getSeconds() + amount);
      break;
    case "minutes":
      d.setMinutes(d.getMinutes() + amount);
      break;
    case "hours":
      d.setHours(d.getHours() + amount);
      break;
    case "days":
      d.setDate(d.getDate() + amount);
      break;
    case "weeks":
      d.setDate(d.getDate() + amount * 7);
      break;
    case "months":
      d.setMonth(d.getMonth() + amount);
      break;
    case "years":
      d.setFullYear(d.getFullYear() + amount);
      break;
  }
  return d;
}

/** Subtract time: subTime(date, 7, "days") */
export function subTime(
  input: DateInput,
  amount: number,
  unit: "days" | "weeks" | "months" | "years" | "hours" | "minutes" | "seconds",
): Date {
  return addTime(input, -amount, unit);
}

/** Get day of week (0 = Sunday, 6 = Saturday) */
export function getDayOfWeek(input: DateInput): number {
  return toDate(input).getDay();
}

/** Get day name: "Monday", "Mon", etc. */
export function getDayOfWeekName(
  input: DateInput,
  format: "long" | "short" = "long",
  locale: LocaleCode = "en-US",
): string {
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(
    toDate(input),
  );
}

/** Get quarter (1-4) */
export function getQuarter(input: DateInput): Quarter {
  return (Math.floor(toDate(input).getMonth() / 3) + 1) as Quarter;
}

/** Get ISO week number */
export function getWeekNumber(input: DateInput): number {
  const d = toDate(input);
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  return Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** Get days in month */
export function getDaysInMonth(input: DateInput): number {
  const d = toDate(input);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/** Get days in year (365 or 366) */
export function getDaysInYear(input: DateInput): number {
  return isLeapYear(input) ? 366 : 365;
}

/** Is leap year? */
export function isLeapYear(input: DateInput): boolean {
  const y = toDate(input).getFullYear();
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** Calculate age from birthdate */
export function getAge(
  birthdate: DateInput,
  referenceDate?: DateInput,
): number {
  const b = toDate(birthdate, "Birthdate");
  const r = referenceDate ? toDate(referenceDate) : new Date();
  let age = r.getFullYear() - b.getFullYear();
  if (
    r.getMonth() < b.getMonth() ||
    (r.getMonth() === b.getMonth() && r.getDate() < b.getDate())
  )
    age--;
  return age;
}

/* -------------------------------------------------------------------------- */
/*                              Utilities                                      */
/* -------------------------------------------------------------------------- */

/** Get format pattern string (e.g., "YYYY-MM-DD") */
export function getDateFormat(
  type?: "date" | "time" | "year" | "month" | "week" | "datetime",
): string {
  const patterns = {
    time: "HH:mm",
    year: "YYYY",
    month: "YYYY-MM",
    week: "YYYY-[W]WW",
    datetime: "YYYY-MM-DDTHH:mm:ss",
  };
  return patterns[type as keyof typeof patterns] ?? "YYYY-MM-DD";
}

/** Merge date and time from separate Date objects */
export function mergeDateAndTime(dateObj: DateInput, timeObj: DateInput): Date {
  const d = toDate(dateObj),
    t = toDate(timeObj);
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    t.getHours(),
    t.getMinutes(),
    t.getSeconds(),
    t.getMilliseconds(),
  );
}

/** Get local date string "YYYY-MM-DD" (no timezone issues) */
export function toLocalDateString(input: DateInput): string {
  const d = toDate(input);
  return `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`;
}

/** Get local time string "HH:MM" (no timezone issues) */
export function toLocalTimeString(input: DateInput): string {
  const d = toDate(input);
  return `${padZero(d.getHours())}:${padZero(d.getMinutes())}`;
}

/** Create Date from "YYYY-MM-DD" and "HH:MM" strings */
export function fromDateStrings(dateStr: string, timeStr = "00:00"): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [h, min] = timeStr.split(":").map(Number);
  if ([y, m, d].some(isNaN)) throw new Error(`Invalid date: "${dateStr}"`);
  if ([h, min].some(isNaN)) throw new Error(`Invalid time: "${timeStr}"`);

  const date = new Date(y, m - 1, d, h, min, 0, 0);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    throw new Error(`Invalid components: ${dateStr} ${timeStr}`);
  }
  return date;
}

/* -------------------------------------------------------------------------- */
/*                                    Export                                  */
/* -------------------------------------------------------------------------- */

const dateFormat = {
  localToISO,
  dateToISO,
  createISODate,
  toISOFromTime,
  toISOFromTime24h,
  toMonthYear,
  time12h,
  time24h,
  formatDate,
  fullDateTime,
  relativeTime,
  getDateFormat,
  duration,
  getDurationBreakdown,
  isToday,
  isYesterday,
  isTomorrow,
  isSameDay,
  isPast,
  isFuture,
  compareDates,
  isInRange,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addTime,
  subTime,
  getDayOfWeek,
  getDayOfWeekName,
  getQuarter,
  getWeekNumber,
  getDaysInMonth,
  getDaysInYear,
  isLeapYear,
  getAge,
  mergeDateAndTime,
  toLocalDateString,
  toLocalTimeString,
  fromDateStrings,
};

export default dateFormat;
