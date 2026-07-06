import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LabelAndPlaceholderTextFormat } from '@/lib/utils';
import type { ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';
import type { InputInterface } from '../interface/input-props.type';

export const DatePickerField = ({
  form, name, labelName, placeholder, required = false, disabled = false,
  viewOnly = false, disableLabelFormatting = false, customMessage,
}: InputInterface['DatePicker']) => {
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
        name={name || 'date'}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => {
          const error = form.formState.errors?.[name || ''];
          return (
            <FormItem>
              <LabelEl />
              {viewOnly ? (
                <div className="py-2 px-3 text-sm text-foreground bg-background rounded-md border border-border min-h-10">
                  {field.value ? new Date(field.value).toLocaleDateString() : ''}
                </div>
              ) : (
                <>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder={placeholderText}
                      disabled={disabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{error ? String(error?.message || '') : customMessage || ''}</FormMessage>
                </>
              )}
            </FormItem>
          );
        }}
      />
    );
  }

  return (
    <>
      <LabelEl />
      <Input type="date" placeholder={placeholderText} />
    </>
  );
};
