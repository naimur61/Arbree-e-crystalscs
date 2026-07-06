'use client';

import { useState } from 'react';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LabelAndPlaceholderTextFormat } from '@/lib/utils';
import type { ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';
import type { InputInterface } from '../interface/input-props.type';

export const SingleSelectField = ({
  form, name, labelName, placeholder, required = false, disabled = false,
  options, viewOnly = false, onValueChange, isLoading = false, defaultValue = '',
  customMessage, disableLabelFormatting = false,
}: InputInterface['SingleSelect']) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const placeholderText = disableLabelFormatting ? placeholder || 'Select an option' : LabelAndPlaceholderTextFormat(`${placeholder || 'Select an option'}`);

  const renderSelect = (value: string, onChange: (val: string) => void) => (
    <Select onValueChange={(val: string) => { onChange(val); onValueChange?.(val); }} value={value} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholderText} />
      </SelectTrigger>
      <SelectContent className="capitalize">
        {isLoading ? (
          <SelectItem value="loading" disabled>Loading...</SelectItem>
        ) : options && options.length > 0 ? (
          options.map((option) => (
            <SelectItem key={option} value={option} className="capitalize">{option}</SelectItem>
          ))
        ) : (
          <SelectItem value="no-options" disabled>
            {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName || '')} options not available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );

  const LabelEl = () =>
    labelName ? (
      <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
        {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
        {required && <span className="text-muted-foreground">&nbsp;*</span>}
      </label>
    ) : null;

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || 'select'}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => (
          <FormItem>
            <LabelEl />
            {viewOnly ? (
              <div className="py-2 px-3 text-sm text-foreground capitalize bg-background rounded-md border border-border min-h-10">
                {field.value || ''}
              </div>
            ) : (
              <>
                {renderSelect(field.value, field.onChange)}
                <FormMessage>{customMessage || ''}</FormMessage>
              </>
            )}
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <LabelEl />
      {viewOnly ? (
        <div className="py-2 px-3 text-sm text-foreground capitalize bg-background rounded-md border border-border min-h-10">
          {localValue || ''}
        </div>
      ) : (
        renderSelect(localValue, setLocalValue)
      )}
    </div>
  );
};
