import { z } from "zod";
import type {
  BaseValidationProps,
  PasswordValidationProps,
  EmailValidationProps,
  PhoneValidationProps,
  UrlValidationProps,
  NumberValidationProps,
  TextValidationProps,
  NameValidationProps,
  UsernameValidationProps,
  SlugValidationProps,
  UuidValidationProps,
  HexColorValidationProps,
  IpValidationProps,
  CreditCardValidationProps,
  JsonValidationProps,
  IsoDateValidationProps,
  PostalCodeValidationProps,
  AlphaValidationProps,
  AlphanumericValidationProps,
  BooleanValidationProps,
  EnumValidationProps,
  TagsValidationProps,
} from "./type";

/* -------------------------------------------------------------------------- */
/*                                Default Config                              */
/* -------------------------------------------------------------------------- */
/* Every default lives here so the schemas are flexible and reusable by        */
/* anyone. Override any field per-call through the schema's props.             */
/* `required` defaults to `false` (optional) so a schema is always usable      */
/* even when `required` is omitted — "without the required value it is okay".   */
/* To make fields required by default, flip `required` to `true` here.          */
const DEFAULTS = {
  base: { min: 1, max: 255, label: "Field", required: false },
  email: { label: "Email", min: 1, max: 254, required: false },
  password: {
    label: "Password",
    min: 8,
    max: 128,
    required: false,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventSequentialNumbers: true,
    preventCommonPatterns: true,
  },
  username: {
    label: "Username",
    min: 3,
    max: 30,
    required: false,
    allowUnderscore: true,
    allowDash: true,
    allowDot: true,
    mustStartWithLetter: true,
  },
  url: { label: "URL", required: false, requireHttps: false },
  phone: { label: "Phone number", required: false, countryCode: "optional" },
  number: {
    label: "Number",
    required: false,
    integerOnly: false,
    positiveOnly: false,
    type: "number",
  },
  name: {
    label: "Name",
    min: 2,
    max: 50,
    required: false,
    allowMultipleWords: true,
  },
  text: {
    label: "Text",
    min: 1,
    max: 200,
    required: false,
    allowNumbers: true,
    allowSpecialChars: true,
    allowNewlines: false,
    trimWhitespace: true,
  },
  slug: {
    label: "Slug",
    min: 3,
    max: 100,
    required: false,
    allowUnderscore: true,
    allowUppercase: false,
  },
  uuid: { label: "UUID", required: false },
  color: { label: "Color", required: false, allowAlpha: false },
  ip: { label: "IP address", required: false, version: "any" },
  creditCard: { label: "Card number", required: false },
  json: { label: "JSON", required: false },
  date: {
    label: "Date",
    required: false,
    notFuture: false,
    notPast: false,
  },
  postal: { label: "Postal code", required: false },
  alpha: { label: "Text", min: 1, max: 255, required: false },
  alphanumeric: { label: "Text", min: 1, max: 255, required: false },
  boolean: { label: "Value", required: false },
  enum: { label: "Value", required: false },
  tags: {
    label: "Tags",
    required: false,
    unique: false,
    allowNumbers: true,
    allowSpecialChars: false,
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

/** Allow empty/undefined when a schema is optional. */
const emptyOk = (val: string | undefined, required: boolean): boolean =>
  !required && (val === undefined || val === "");

/** Shared regexes for the extra validators. */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const IPV4_REGEX =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IPV6_REGEX =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

/** Luhn checksum used by credit-card validation. */
const luhnValid = (digits: string): boolean => {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

/** Unicode numeral range mappings (start codepoint → base digit 0). */
const NUMERAL_SYSTEMS = [
  [0x30, 0x39], // Western Arabic (0-9)
  [0x660, 0x669], // Arabic-Indic
  [0x6f0, 0x6f9], // Eastern Arabic
  [0x966, 0x96f], // Devanagari
  [0x9e6, 0x9ef], // Bengali
  [0xa66, 0xa6f], // Gurmukhi
  [0xae6, 0xaef], // Gujarati
  [0xb66, 0xb6f], // Oriya
  [0xbe6, 0xbef], // Tamil
  [0xc66, 0xcef], // Telugu
  [0xce6, 0xcef], // Kannada
  [0xd66, 0xdef], // Malayalam
  [0xe50, 0xe59], // Thai
  [0xed0, 0xed9], // Lao
  [0xf20, 0xf29], // Tibetan
] as const;

const normalizeDigits = (val: string): string =>
  val.replace(/[\p{Nd}]/gu, (char) => {
    const code = char.codePointAt(0)!;
    for (const [start] of NUMERAL_SYSTEMS) {
      if (code >= start && code <= start + 9) {
        return String(code - start);
      }
    }
    return char;
  });

// Unicode-aware: allow letters from any script, common name punctuation
const NAME_CHAR_PATTERN = /^[\p{L}\p{M}\p{N} .\-',…—–。・・・・・()\[\]{}]+$/u;
const CONTROL_PATTERN = /[\p{C}\p{Zl}\p{Zp}]/u;

/* -------------------------------------------------------------------------- */
/*                         Core Schema Factory Helper                         */
/* -------------------------------------------------------------------------- */

const createStringSchema = (props: BaseValidationProps = {}): z.ZodString => {
  const {
    min = DEFAULTS.base.min,
    max = DEFAULTS.base.max,
    label = DEFAULTS.base.label,
    required = DEFAULTS.base.required,
  } = props;

  let schema: z.ZodString = z.string();

  if (required) {
    schema = schema.min(min, {
      message: `${label} must be at least ${min} character${min > 1 ? "s" : ""}`,
    });
  }

  return schema.max(max, {
    message: `${label} must be at most ${max} characters`,
  });
};

/* -------------------------------------------------------------------------- */
/*                                Email Schema                                */
/* -------------------------------------------------------------------------- */

export const emailSchema = (props: EmailValidationProps = {}) => {
  const {
    label = DEFAULTS.email.label,
    min = DEFAULTS.email.min,
    max = DEFAULTS.email.max,
    required = DEFAULTS.email.required,
    specificDomains,
    blockDomains,
  } = props;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  schema = schema.transform((v) => v.trim());

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return emailRegex.test(val);
    },
    { message: `${label} must be a valid email address` },
  );

  if (specificDomains?.length) {
    schema = schema.refine(
      (val) => {
        if (emptyOk(val, required)) return true;
        const domain = val.split("@")[1];
        return domain ? specificDomains.includes(domain) : false;
      },
      { message: `${label} must be from: ${specificDomains.join(", ")}` },
    );
  }

  if (blockDomains?.length) {
    schema = schema.refine(
      (val) => {
        if (emptyOk(val, required)) return true;
        const domain = val.split("@")[1];
        return domain ? !blockDomains.includes(domain) : true;
      },
      { message: `${label} from this domain is not allowed` },
    );
  }

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                               Password Schema                              */
/* -------------------------------------------------------------------------- */

export const passwordSchema = (props: PasswordValidationProps = {}) => {
  const {
    label = DEFAULTS.password.label,
    min = DEFAULTS.password.min,
    max = DEFAULTS.password.max,
    required = DEFAULTS.password.required,
    requireUppercase = DEFAULTS.password.requireUppercase,
    requireLowercase = DEFAULTS.password.requireLowercase,
    requireNumbers = DEFAULTS.password.requireNumbers,
    requireSpecialChars = DEFAULTS.password.requireSpecialChars,
    preventSequentialNumbers = DEFAULTS.password.preventSequentialNumbers,
    preventCommonPatterns = DEFAULTS.password.preventCommonPatterns,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  if (requireUppercase) {
    schema = schema.refine((val) => /[A-Z]/.test(val), {
      message: `${label} must include at least one uppercase letter`,
    });
  }

  if (requireLowercase) {
    schema = schema.refine((val) => /[a-z]/.test(val), {
      message: `${label} must include at least one lowercase letter`,
    });
  }

  if (requireNumbers) {
    schema = schema.refine((val) => /\d/.test(val), {
      message: `${label} must include at least one number`,
    });
  }

  if (requireSpecialChars) {
    schema = schema.refine(
      (val) => /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(val),
      { message: `${label} must include at least one special character` },
    );
  }

  if (preventSequentialNumbers) {
    schema = schema.refine(
      (val) => {
        for (let i = 0; i < val.length - 2; i++) {
          const a = parseInt(val[i], 10);
          const b = parseInt(val[i + 1], 10);
          const c = parseInt(val[i + 2], 10);
          if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
            if ((b === a + 1 && c === b + 1) || (b === a - 1 && c === b - 1)) {
              return false;
            }
          }
        }
        return true;
      },
      { message: `${label} cannot contain sequential numbers` },
    );
  }

  if (preventCommonPatterns) {
    const badPatterns = [
      /password/i,
      /123456/,
      /qwerty/i,
      /asdfgh/i,
      /zxcvbn/i,
      /abcdef/i,
    ];
    schema = schema.refine((val) => !badPatterns.some((p) => p.test(val)), {
      message: `${label} is too common or predictable`,
    });
  }

  schema = schema.refine((val) => !/(.)\1{2,}/.test(val), {
    message: `${label} cannot contain the same character repeated 3 or more times`,
  });

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                Username Schema                             */
/* -------------------------------------------------------------------------- */

export const usernameSchema = (props: UsernameValidationProps = {}) => {
  const {
    label = DEFAULTS.username.label,
    min = DEFAULTS.username.min,
    max = DEFAULTS.username.max,
    required = DEFAULTS.username.required,
    allowUnderscore = DEFAULTS.username.allowUnderscore,
    allowDash = DEFAULTS.username.allowDash,
    allowDot = DEFAULTS.username.allowDot,
    mustStartWithLetter = DEFAULTS.username.mustStartWithLetter,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  let allowed = "a-zA-Z0-9";
  if (allowUnderscore) allowed += "_";
  if (allowDash) allowed += "\\-";
  if (allowDot) allowed += ".";

  const charPattern = new RegExp(`^[${allowed}]+$`);

  schema = schema.refine((val) => charPattern.test(val), {
    message: `${label} contains invalid characters`,
  });

  schema = schema.refine((val) => !/[._-]{2,}/.test(val), {
    message: `${label} cannot contain consecutive special characters`,
  });

  schema = schema.refine((val) => !/[._-]$/.test(val), {
    message: `${label} cannot end with a special character`,
  });

  if (mustStartWithLetter) {
    schema = schema.refine((val) => /^[a-zA-Z]/.test(val), {
      message: `${label} must start with a letter`,
    });
  }

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                  URL Schema                                */
/* -------------------------------------------------------------------------- */

export const urlSchema = (props: UrlValidationProps = {}) => {
  const {
    label = DEFAULTS.url.label,
    required = DEFAULTS.url.required,
    requireHttps = DEFAULTS.url.requireHttps,
    allowedDomains,
    blockedDomains,
  } = props;

  const schema: z.ZodType<string> = z
    .string()
    .min(5, `${label} must be at least 5 characters`)
    .max(2048, `${label} must be less than 2048 characters`)
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          if (!["http:", "https:"].includes(url.protocol)) return false;
          if (requireHttps && url.protocol !== "https:") return false;
          if (
            allowedDomains?.length &&
            !allowedDomains.some((d) => url.hostname.endsWith(d))
          ) {
            return false;
          }
          if (
            blockedDomains?.length &&
            blockedDomains.some((d) => url.hostname.endsWith(d))
          ) {
            return false;
          }
          return true;
        } catch {
          return false;
        }
      },
      { message: `${label} must be a valid URL` },
    );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                 Phone Schema                               */
/* -------------------------------------------------------------------------- */

export const phoneSchema = (props: PhoneValidationProps = {}) => {
  const {
    label = DEFAULTS.phone.label,
    required = DEFAULTS.phone.required,
    countryCode = DEFAULTS.phone.countryCode,
    allowedCountries,
  } = props;

  // Normalize formatting characters (spaces, dashes, parentheses) FIRST so
  // that length/format checks run against the cleaned-up value.
  let schema: z.ZodType<string> = z
    .string()
    .transform((val) => val.replace(/[\s\-()]/g, ""));

  if (required) {
    schema = schema.refine((val) => val.length > 0, {
      message: `${label} is required`,
    });
  }

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return val.length >= 8 && val.length <= 15;
    },
    { message: `${label} must be between 8 and 15 digits` },
  );

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return /^[+]?[\p{Nd}]+$/u.test(val);
    },
    { message: `${label} must contain only digits and optional +` },
  );

  if (countryCode === "required") {
    schema = schema.refine(
      (val) => emptyOk(val, required) || val.startsWith("+"),
      { message: `${label} must start with country code (e.g., +1)` },
    );
  }

  if (allowedCountries?.length) {
    schema = schema.refine(
      (val) => {
        if (emptyOk(val, required)) return true;
        if (!val.startsWith("+")) return false;
        return allowedCountries.some((cc) => val.startsWith(cc));
      },
      {
        message: `${label} must be from allowed countries: ${allowedCountries.join(", ")}`,
      },
    );
  }

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                 Number Schema                              */
/* -------------------------------------------------------------------------- */

const createStringNumberSchema = (props: {
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  integerOnly: boolean;
  positiveOnly: boolean;
}) => {
  const { label, required, min, max, integerOnly, positiveOnly } = props;

  const rules: Array<(normalized: string) => string | null> = [];

  rules.push((normalized) => {
    const num = Number(normalized);
    if (isNaN(num) || !isFinite(num)) return `${label} must be a valid number`;
    return null;
  });

  if (integerOnly) {
    rules.push((normalized) => {
      if (!/^-?\d+$/.test(normalized)) return `${label} must be an integer`;
      return null;
    });
  }

  if (positiveOnly) {
    rules.push((normalized) => {
      if (Number(normalized) < 0) return `${label} must be positive`;
      return null;
    });
  }

  if (min !== undefined) {
    rules.push((normalized) => {
      if (Number(normalized) < min) return `${label} must be at least ${min}`;
      return null;
    });
  }

  if (max !== undefined) {
    rules.push((normalized) => {
      if (Number(normalized) > max) return `${label} must be at most ${max}`;
      return null;
    });
  }

  const base = required ? z.string() : z.string().optional();

  return base.superRefine((val, ctx) => {
    if (emptyOk(val, required)) return;
    const trimmed = (val ?? "").trim();
    if (trimmed === "") {
      if (!required) return;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${label} is required`,
      });
      return;
    }
    const normalized = normalizeDigits(trimmed);
    for (const rule of rules) {
      const error = rule(normalized);
      if (error !== null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: error });
        return;
      }
    }
  });
};

const createNativeNumberSchema = (props: {
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  integerOnly: boolean;
  positiveOnly: boolean;
}) => {
  const { label, required, min, max, integerOnly, positiveOnly } = props;

  const rules: Array<(val: number) => string | null> = [];

  if (integerOnly) {
    rules.push((val) => {
      if (!Number.isInteger(val)) return `${label} must be an integer`;
      return null;
    });
  }

  if (positiveOnly) {
    rules.push((val) => {
      if (val < 0) return `${label} must be positive`;
      return null;
    });
  }

  if (min !== undefined) {
    rules.push((val) => {
      if (val < min) return `${label} must be at least ${min}`;
      return null;
    });
  }

  if (max !== undefined) {
    rules.push((val) => {
      if (val > max) return `${label} must be at most ${max}`;
      return null;
    });
  }

  const base = required ? z.number() : z.number().optional();

  return base.superRefine((val, ctx) => {
    if (!required && val === undefined) return;
    for (const rule of rules) {
      const error = rule(val as number);
      if (error !== null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: error });
        return;
      }
    }
  });
};

export const numberSchema = (props: NumberValidationProps = {}) => {
  const {
    label = DEFAULTS.number.label,
    required = DEFAULTS.number.required,
    min,
    max,
    integerOnly = DEFAULTS.number.integerOnly,
    positiveOnly = DEFAULTS.number.positiveOnly,
    type = DEFAULTS.number.type,
  } = props;

  if (type === "string") {
    return createStringNumberSchema({
      label,
      required,
      min,
      max,
      integerOnly,
      positiveOnly,
    });
  }

  return createNativeNumberSchema({
    label,
    required,
    min,
    max,
    integerOnly,
    positiveOnly,
  });
};

/* -------------------------------------------------------------------------- */
/*                                 Name Schema                                */
/* -------------------------------------------------------------------------- */

export const nameSchema = (props: NameValidationProps = {}) => {
  const {
    label = DEFAULTS.name.label,
    min = DEFAULTS.name.min,
    max = DEFAULTS.name.max,
    required = DEFAULTS.name.required,
    allowMultipleWords = DEFAULTS.name.allowMultipleWords,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  schema = schema.transform((v) => v.trim());

  schema = schema.refine((val) => !/\s{2,}/.test(val), {
    message: `${label} cannot contain consecutive spaces`,
  });

  schema = schema.refine(
    (val) => NAME_CHAR_PATTERN.test(val) && !CONTROL_PATTERN.test(val),
    { message: `${label} contains invalid characters` },
  );

  schema = schema.refine(
    (val) => {
      const words = val.trim().split(/\s+/);
      return allowMultipleWords ? words.length >= 1 : words.length === 1;
    },
    {
      message: allowMultipleWords
        ? `${label} must contain at least one word`
        : `${label} must be a single word`,
    },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                                  Text Schema                               */
/* -------------------------------------------------------------------------- */

export const textSchema = (props: TextValidationProps = {}) => {
  const {
    min = DEFAULTS.text.min,
    max = DEFAULTS.text.max,
    label = DEFAULTS.text.label,
    required = DEFAULTS.text.required,
    allowNumbers = DEFAULTS.text.allowNumbers,
    allowSpecialChars = DEFAULTS.text.allowSpecialChars,
    allowNewlines = DEFAULTS.text.allowNewlines,
    trimWhitespace = DEFAULTS.text.trimWhitespace,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  if (trimWhitespace) {
    schema = schema.transform((v) => v.trim());
  }

  schema = schema.refine((val) => !/\s{2,}/.test(val), {
    message: `${label} cannot contain consecutive spaces`,
  });

  schema = schema.refine(
    (val) => {
      for (let i = 0; i < val.length; i++) {
        const char = val[i];

        if (/[\p{L}\p{M}]/u.test(char)) continue;
        if (char === " ") continue;
        if (allowNumbers && /\p{N}/u.test(char)) continue;
        if (allowNewlines && (char === "\n" || char === "\r")) continue;

        if (allowSpecialChars) {
          const common = `.,!?;:'"\\-_@#$%&*()+={}|[]<>/~\`^`;
          if (common.includes(char)) continue;
          if ("…—–•·°©®™€£¥¢§¶†‡".includes(char)) continue;
          if ("。，、；：？！「」『』【】（）《》〈〉".includes(char)) continue;
        }

        if (/[\p{C}\p{Zl}\p{Zp}]/u.test(char)) return false;
        return false;
      }
      return true;
    },
    { message: `${label} contains invalid characters` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                         Additional Common Validators                       */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Slug ---------------------------------- */
export const slugSchema = (props: SlugValidationProps = {}) => {
  const {
    min = DEFAULTS.slug.min,
    max = DEFAULTS.slug.max,
    label = DEFAULTS.slug.label,
    required = DEFAULTS.slug.required,
    allowUnderscore = DEFAULTS.slug.allowUnderscore,
    allowUppercase = DEFAULTS.slug.allowUppercase,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  let charset = allowUppercase ? "a-zA-Z0-9" : "a-z0-9";
  if (allowUnderscore) charset += "_";
  charset += "\\-";

  const pattern = new RegExp(`^[${charset}]+$`);

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return pattern.test(val);
    },
    {
      message: `${label} may only contain letters, numbers, hyphens${
        allowUnderscore ? " and underscores" : ""
      }`,
    },
  );

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return !/[-_]{2,}/.test(val);
    },
    { message: `${label} cannot contain consecutive hyphens or underscores` },
  );

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return !/^[-_]/.test(val) && !/[-_]$/.test(val);
    },
    { message: `${label} cannot start or end with a hyphen or underscore` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* --------------------------------- UUID ---------------------------------- */
export const uuidSchema = (props: UuidValidationProps = {}) => {
  const { label = DEFAULTS.uuid.label, required = DEFAULTS.uuid.required } =
    props;

  let schema: z.ZodType<string> = createStringSchema({
    min: 1,
    max: 36,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return UUID_REGEX.test(val);
    },
    { message: `${label} must be a valid UUID` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* ------------------------------- Hex Color -------------------------------- */
export const hexColorSchema = (props: HexColorValidationProps = {}) => {
  const {
    label = DEFAULTS.color.label,
    required = DEFAULTS.color.required,
    allowAlpha = DEFAULTS.color.allowAlpha,
  } = props;

  const pattern = allowAlpha
    ? /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
    : /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

  let schema: z.ZodType<string> = createStringSchema({
    min: 1,
    max: allowAlpha ? 9 : 7,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return pattern.test(val);
    },
    { message: `${label} must be a valid hex color` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* ------------------------------- IP Address ------------------------------- */
export const ipSchema = (props: IpValidationProps = {}) => {
  const {
    label = DEFAULTS.ip.label,
    required = DEFAULTS.ip.required,
    version = DEFAULTS.ip.version,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min: 1,
    max: 45,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      if (version === "v4") return IPV4_REGEX.test(val);
      if (version === "v6") return IPV6_REGEX.test(val);
      return IPV4_REGEX.test(val) || IPV6_REGEX.test(val);
    },
    {
      message: `${label} must be a valid ${version === "any" ? "" : version + " "}IP address`,
    },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* ----------------------------- Credit Card -------------------------------- */
export const creditCardSchema = (props: CreditCardValidationProps = {}) => {
  const {
    label = DEFAULTS.creditCard.label,
    required = DEFAULTS.creditCard.required,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min: 1,
    max: 19,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      const digits = val.replace(/[\s-]/g, "");
      if (!/^\d{12,19}$/.test(digits)) return false;
      return luhnValid(digits);
    },
    { message: `${label} must be a valid card number` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* --------------------------------- JSON ----------------------------------- */
export const jsonSchema = (props: JsonValidationProps = {}) => {
  const { label = DEFAULTS.json.label, required = DEFAULTS.json.required } =
    props;

  let schema: z.ZodType<string> = createStringSchema({
    min: 1,
    max: 10000,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: `${label} must be valid JSON` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* ------------------------------- ISO Date --------------------------------- */
export const isoDateSchema = (props: IsoDateValidationProps = {}) => {
  const {
    label = DEFAULTS.date.label,
    required = DEFAULTS.date.required,
    notFuture = DEFAULTS.date.notFuture,
    notPast = DEFAULTS.date.notPast,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min: 1,
    max: 50,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      const d = new Date(val);
      if (isNaN(d.getTime())) return false;
      const now = Date.now();
      if (notFuture && d.getTime() > now) return false;
      if (notPast && d.getTime() < now) return false;
      return true;
    },
    { message: `${label} must be a valid date` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* ------------------------------ Postal Code ------------------------------- */
export const postalCodeSchema = (props: PostalCodeValidationProps = {}) => {
  const { label = DEFAULTS.postal.label, required = DEFAULTS.postal.required } =
    props;

  let schema: z.ZodType<string> = createStringSchema({
    min: 3,
    max: 10,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return /^[a-z0-9][a-z0-9\s-]*[a-z0-9]$/i.test(val);
    },
    { message: `${label} must be a valid postal code` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------- Alpha ----------------------------------- */
export const alphaSchema = (props: AlphaValidationProps = {}) => {
  const {
    min = DEFAULTS.alpha.min,
    max = DEFAULTS.alpha.max,
    label = DEFAULTS.alpha.label,
    required = DEFAULTS.alpha.required,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return /^[\p{L}\p{M}]+$/u.test(val);
    },
    { message: `${label} must contain only letters` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* ----------------------------- Alphanumeric ------------------------------- */
export const alphanumericSchema = (props: AlphanumericValidationProps = {}) => {
  const {
    min = DEFAULTS.alphanumeric.min,
    max = DEFAULTS.alphanumeric.max,
    label = DEFAULTS.alphanumeric.label,
    required = DEFAULTS.alphanumeric.required,
  } = props;

  let schema: z.ZodType<string> = createStringSchema({
    min,
    max,
    label,
    required,
  });

  schema = schema.refine(
    (val) => {
      if (emptyOk(val, required)) return true;
      return /^[\p{L}\p{M}\p{N}]+$/u.test(val);
    },
    { message: `${label} must contain only letters and numbers` },
  );

  if (!required) return schema.optional().or(z.literal(""));
  return schema;
};

/* -------------------------------- Boolean --------------------------------- */
export const booleanSchema = (props: BooleanValidationProps = {}) => {
  const { required = DEFAULTS.boolean.required } = props;

  // Accept real booleans and common string forms coming from form inputs.
  const schema: z.ZodType<boolean> = z
    .union([z.boolean(), z.literal("true"), z.literal("false")])
    .transform((v) => (typeof v === "string" ? v === "true" : v));

  if (!required) return schema.optional();
  return schema;
};

/* --------------------------------- Enum ----------------------------------- */
export const enumSchema = (props: EnumValidationProps) => {
  const { required = DEFAULTS.enum.required, values } = props;

  if (!values || values.length === 0) {
    throw new Error("enumSchema requires a non-empty `values` array");
  }

  const schema: z.ZodType<string> =
    values.length === 1
      ? z.literal(values[0])
      : z.enum([...values] as [string, ...string[]]);

  if (!required) return schema.optional();
  return schema;
};

/* --------------------------------- Tags ----------------------------------- */
export const tagsSchema = (props: TagsValidationProps = {}) => {
  const {
    label = DEFAULTS.tags.label,
    required = DEFAULTS.tags.required,
    minItems,
    maxItems,
    unique = DEFAULTS.tags.unique,
    allowNumbers = DEFAULTS.tags.allowNumbers,
    allowSpecialChars = DEFAULTS.tags.allowSpecialChars,
  } = props;

  const itemSchema: z.ZodType<string> = z.string().refine(
    (val) => {
      if (!allowNumbers && /\p{N}/u.test(val)) return false;
      if (!allowSpecialChars && /[^a-zA-Z0-9\s]/u.test(val)) return false;
      return true;
    },
    { message: `${label} contains an invalid tag` },
  );

  let schema: z.ZodType<string[]> = z.array(itemSchema);

  if (minItems !== undefined) {
    schema = schema.refine((arr) => arr.length >= minItems, {
      message: `${label} needs at least ${minItems} item(s)`,
    });
  }

  if (maxItems !== undefined) {
    schema = schema.refine((arr) => arr.length <= maxItems, {
      message: `${label} can have at most ${maxItems} item(s)`,
    });
  }

  if (unique) {
    schema = schema.refine((arr) => new Set(arr).size === arr.length, {
      message: `${label} must not contain duplicates`,
    });
  }

  if (!required) return schema.optional();
  return schema;
};

/* -------------------------------------------------------------------------- */
/*                           Optional Schema Helper                           */
/* -------------------------------------------------------------------------- */

const optional = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().or(z.literal("")).nullable();

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export const validationSchemas = {
  createStringSchema,
  emailSchema,
  passwordSchema,
  nameSchema,
  usernameSchema,
  phoneSchema,
  urlSchema,
  numberSchema,
  textSchema,
  slugSchema,
  uuidSchema,
  hexColorSchema,
  ipSchema,
  creditCardSchema,
  jsonSchema,
  isoDateSchema,
  postalCodeSchema,
  alphaSchema,
  alphanumericSchema,
  booleanSchema,
  enumSchema,
  tagsSchema,
  optional,
};

export type * from "./type";
