import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';
import type { CheckboxProps } from '../interface/input-props.type';

export const CheckField = ({
  form, name, labelName, required = false, disabled = false, options = [],
}: CheckboxProps & { options: { label: string; value: string }[] }) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          {labelName && (
            <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
              {labelName}
              {required && <span className="text-destructive">&nbsp;*</span>}
            </label>
          )}
          {options.map((opt) => (
            <FormField
              key={opt.value}
              control={form.control}
              name={name}
              render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => (
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(opt.value)}
                      onCheckedChange={(checked: boolean) => {
                        const current = field.value || [];
                        const updated = checked
                          ? [...current, opt.value]
                          : current.filter((v: string) => v !== opt.value);
                        field.onChange(updated);
                      }}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{opt.label}</FormLabel>
                </div>
              )}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
