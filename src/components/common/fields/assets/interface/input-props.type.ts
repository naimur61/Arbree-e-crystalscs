import type { UseFormReturn, FieldValues } from "react-hook-form";

export interface TextInputProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  placeholder?: string;
  labelName?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: React.ReactNode;
  isArray?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string;
  setValue?: (value: string) => void;
}

export interface TextAreaInputProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  rows?: number;
  disableLabelFormatting?: boolean;
  customMessage?: React.ReactNode;
  value?: string;
  setValue?: (value: string) => void;
}

export interface NumberInputProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  disableLabelFormatting?: boolean;
  numberType?: "float" | "integer";
  customMessage?: React.ReactNode;
  value?: string;
  setValue?: (value: string) => void;
}

export interface PasswordInputProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  disableLabelFormatting?: boolean;
  mode?: "normal" | "validate";
  customMessage?: React.ReactNode;
}

export interface SingleSelectProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  options?: string[];
  viewOnly?: boolean;
  isLoading?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disableLabelFormatting?: boolean;
  customMessage?: string;
}

export interface SelectFieldProps {
  form: UseFormReturn<FieldValues>;
  name: string;
  labelName?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  options?:
    | {
        value: string;
        label: string;
        image?: string;
        flag?: string;
        disabled?: boolean;
      }[]
    | string[];
  placeholder?: string;
  showSearch?: boolean;
  type?: "single" | "multiple";
  viewOnly?: boolean;
  onValueChange?: (value: string | string[]) => void;
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  customMessage?: string;
}

export interface SwitchProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: React.ReactNode;
  description?: string;
  border?: boolean;
  value?: boolean;
  setValue?: (value: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
}

export interface CheckboxProps {
  form?: UseFormReturn<FieldValues>;
  name: string;
  labelName?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  options?: { label: string; value: string }[];
}

export interface RadioProps {
  form?: UseFormReturn<FieldValues>;
  name: string;
  labelName?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  options?: { label: string; value: string }[];
}

export interface DatePickerProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: string;
}

export interface PhoneNumberProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: string;
  defaultCountry?: string;
  disableCountryCode?: boolean;
  disableDropdown?: boolean;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
  hasPhone?: boolean;
}

export interface SearchFieldProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  placeholder?: string;
  optional?: boolean;
  onSearch?: (value: string) => void;
  value?: string;
  setValue?: (value: string) => void;
}

export interface InputInterface {
  Text: TextInputProps;
  TextArea: TextAreaInputProps;
  Number: NumberInputProps;
  Password: PasswordInputProps;
  SingleSelect: SingleSelectProps;
  PhoneNumber: PhoneNumberProps;
  Switch: SwitchProps;
  DatePicker: DatePickerProps;
  Search: SearchFieldProps;
}

export interface FieldPropsInterface {
  form?: UseFormReturn<FieldValues>;
  name: string;
  placeholder?: string;
  labelName?: string;
  description?: string;
  border?: boolean;
  options?: string[];
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  isArray?: boolean;
  style?: string;
  defaultValue?: string;
  viewOnly?: boolean;
  rows?: number;
  disableLabelFormatting?: boolean;
  maxLength?: number;
  suffix?: string;
  mode?: "normal" | "validate";
  customMessage?: React.ReactNode;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
}
