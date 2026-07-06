import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LabelAndPlaceholderTextFormat } from '@/lib/utils';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

export const OTP = ({
  form, name, labelName, required = false, disableLabelFormatting = false,
  maxLength = 6, customMessage,
}: {
  form?: UseFormReturn<FieldValues>; name?: string; labelName?: string; required?: boolean;
  disableLabelFormatting?: boolean; maxLength?: number; customMessage?: React.ReactNode;
}) => {
  if (!form) {
    return (
      <div>
        {labelName && (
          <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
            {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
            {required && <span className="text-destructive">&nbsp;*</span>}
          </label>
        )}
        <InputOTP maxLength={maxLength}>
          <InputOTPGroup>
            {Array.from({ length: maxLength }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name || 'otp'}
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
              <InputOTP maxLength={maxLength} value={field.value} onChange={field.onChange}>
                <InputOTPGroup>
                  {Array.from({ length: maxLength }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage>{error ? String(error?.message || '') : customMessage || ''}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
