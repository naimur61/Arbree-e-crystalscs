import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LabelAndPlaceholderTextFormat } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

interface RangeDatePickerProps {
  form: UseFormReturn<FieldValues>;
  name: string;
  labelName?: string;
  required?: boolean;
  disabled?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: string;
}

export const RangeDatePicker = ({
  form, name, labelName, required = false, disabled = false,
  disableLabelFormatting = false, customMessage,
}: RangeDatePickerProps) => {
  const LabelEl = () =>
    labelName ? (
      <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
        {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
        {required && <span className="text-destructive">&nbsp;*</span>}
      </label>
    ) : null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => {
        const error = form.formState.errors?.[name];
        const value = field.value || {};
        return (
          <FormItem>
            <LabelEl />
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    type="date"
                    className="pl-10"
                    disabled={disabled}
                    value={value.from || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange({ ...value, from: e.target.value })}
                  />
                </FormControl>
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    type="date"
                    className="pl-10"
                    disabled={disabled}
                    value={value.to || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange({ ...value, to: e.target.value })}
                  />
                </FormControl>
              </div>
            </div>
            <FormMessage>{error ? String(error?.message || '') : customMessage || ''}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
