import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

export const SingleCheckField = ({
  form, name, labelName, required = false, disabled = false,
  description,
}: {
  form?: UseFormReturn<FieldValues>; name?: string; labelName?: string; required?: boolean; disabled?: boolean; description?: string;
}) => {
  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || 'checkbox'}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
              </FormControl>
              <FormLabel className="font-normal">
                {labelName}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            </div>
            {description && <p className="text-sm text-muted-foreground ml-6">{description}</p>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox disabled={disabled} />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {labelName}
      </label>
    </div>
  );
};
