'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { LabelAndPlaceholderTextFormat, maskString } from '@/lib/utils';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
import type { InputInterface } from '../interface/input-props.type';

export const PhoneNumber = ({
  form, name, labelName, placeholder, required = false, disabled = false,
  viewOnly = false, disableLabelFormatting = false, customMessage, defaultCountry = 'us',
  disableCountryCode = true, disableDropdown = false, onValueChange, isLoading = false,
  hasPhone = false,
}: InputInterface['PhoneNumber']) => {
  const placeholderText = disableLabelFormatting
    ? placeholder || labelName
    : LabelAndPlaceholderTextFormat(placeholder || labelName || '');

  const LabelEl = () =>
    labelName ? (
      <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
        {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
        {required && <span className="text-destructive">&nbsp;*</span>}
      </label>
    ) : null;

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || 'phone'}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => {
          const error = form.formState.errors?.[name || ''];
          const isError = !!error;

          return (
            <FormItem>
              <LabelEl />
              {viewOnly ? (
                <div className="py-2 px-3 text-sm text-foreground bg-background rounded-md border border-border min-h-10">
                  {hasPhone ? maskString(field.value) : field.value || ''}
                </div>
              ) : (
                <>
                  <FormControl>
                    <div className="[&_.react-tel-input]:w-full [&_.form-control]:!w-full [&_.form-control]:!h-11 [&_.form-control]:!rounded-lg [&_.form-control]:!border-border [&_.form-control]:!bg-background [&_.form-control]:!text-sm [&_.flag-dropdown]:!rounded-l-lg [&_.flag-dropdown]:!border-border">
                      <PhoneInput
                        country={defaultCountry}
                        value={field.value}
                        disabled={disabled || isLoading}
                        disableCountryCode={disableCountryCode}
                        disableDropdown={disableDropdown}
                        placeholder={LabelAndPlaceholderTextFormat(placeholder || 'Enter phone number')}
                        inputStyle={isError ? { borderColor: '#dc2626' } : undefined}
                        onChange={(value: string) => {
                          field.onChange(value);
                          onValueChange?.(value);
                        }}
                        onBlur={field.onBlur}
                        searchStyle={{ width: '100%' }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {isError ? String(error?.message || '') : customMessage || ''}
                  </FormMessage>
                </>
              )}
            </FormItem>
          );
        }}
      />
    );
  }

  return (
    <div>
      <LabelEl />
      <PhoneInput
        country={defaultCountry}
        disabled={disabled}
        disableCountryCode={disableCountryCode}
        disableDropdown={disableDropdown}
        placeholder={placeholderText}
        inputClass="!w-full !h-11 !rounded-lg !border-border !bg-background !text-sm"
      />
    </div>
  );
};
