/* -------------------------------------------------------------------------- */
/*  Validation prop types                                                     */
/*  Pure TypeScript types — no runtime code — kept separate so the schema     */
/*  implementation file stays clean.                                          */
/* -------------------------------------------------------------------------- */

export type BaseValidationProps = {
  min?: number;
  max?: number;
  label?: string;
  required?: boolean;
};

export type PasswordValidationProps = BaseValidationProps & {
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  preventSequentialNumbers?: boolean;
  preventCommonPatterns?: boolean;
};

export type EmailValidationProps = BaseValidationProps & {
  specificDomains?: string[];
  blockDomains?: string[];
};

export type PhoneValidationProps = BaseValidationProps & {
  countryCode?: "optional" | "required" | "none";
  allowedCountries?: string[];
};

export type UrlValidationProps = BaseValidationProps & {
  requireHttps?: boolean;
  allowedDomains?: string[];
  blockedDomains?: string[];
};

export type NumberValidationProps = {
  label?: string;
  required?: boolean;
  min?: number;
  max?: number;
  integerOnly?: boolean;
  positiveOnly?: boolean;
  type?: "number" | "string";
};

export type TextValidationProps = BaseValidationProps & {
  allowNumbers?: boolean;
  allowSpecialChars?: boolean;
  allowNewlines?: boolean;
  trimWhitespace?: boolean;
};

export type NameValidationProps = BaseValidationProps & {
  allowMultipleWords?: boolean;
};

export type UsernameValidationProps = BaseValidationProps & {
  allowUnderscore?: boolean;
  allowDash?: boolean;
  allowDot?: boolean;
  mustStartWithLetter?: boolean;
};

/* -------------------------------------------------------------------------- */
/*  Commonly-needed additional types                                          */
/* -------------------------------------------------------------------------- */

export type SlugValidationProps = BaseValidationProps & {
  allowUnderscore?: boolean;
  allowUppercase?: boolean;
};

export type UuidValidationProps = BaseValidationProps;

export type HexColorValidationProps = BaseValidationProps & {
  allowAlpha?: boolean;
};

export type IpValidationProps = BaseValidationProps & {
  version?: "v4" | "v6" | "any";
};

export type CreditCardValidationProps = BaseValidationProps;

export type JsonValidationProps = BaseValidationProps;

export type IsoDateValidationProps = BaseValidationProps & {
  notFuture?: boolean;
  notPast?: boolean;
};

export type PostalCodeValidationProps = BaseValidationProps;

export type AlphaValidationProps = BaseValidationProps;

export type AlphanumericValidationProps = BaseValidationProps;

export type BooleanValidationProps = {
  label?: string;
  required?: boolean;
};

export type EnumValidationProps = {
  label?: string;
  required?: boolean;
  values: readonly string[];
};

export type TagsValidationProps = {
  label?: string;
  required?: boolean;
  minItems?: number;
  maxItems?: number;
  unique?: boolean;
  allowNumbers?: boolean;
  allowSpecialChars?: boolean;
};
