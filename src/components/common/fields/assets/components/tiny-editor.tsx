'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { LabelAndPlaceholderTextFormat } from '@/lib/utils';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

interface TinyEditorProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: React.ReactNode;
  height?: number;
}

export const TinyEditor = ({
  form, name = 'content', labelName, required = false, placeholder = 'Enter content...',
  disabled = false, disableLabelFormatting = false, customMessage, height = 300,
}: TinyEditorProps) => {
  if (!form) {
    return <Textarea placeholder={placeholder} disabled={disabled} style={{ minHeight: height }} />;
  }

  return (
      <FormField
        control={form.control}
        name={name || 'content'}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => {
          const error = form.formState.errors?.[name || ''];
        return (
          <FormItem>
            {labelName && (
              <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
                {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
                {required && <span className="text-destructive">&nbsp;*</span>}
              </label>
            )}
            <FormControl>
              <Textarea {...field} placeholder={placeholder} disabled={disabled}
                className="font-mono text-sm" style={{ minHeight: height }} />
            </FormControl>
            <FormMessage>{error ? String(error?.message || '') : customMessage || ''}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
