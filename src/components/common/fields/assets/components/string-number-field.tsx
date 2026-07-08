import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LabelAndPlaceholderTextFormat } from "@/lib/utils";
import type {
  ControllerRenderProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import type { InputInterface } from "../interface/input-props.type";

export const StringNumber = ({
  form,
  name,
  labelName,
  placeholder,
  required = false,
  disabled = false,
  viewOnly = false,
  disableLabelFormatting = false,
  customMessage,
}: InputInterface["Number"]) => {
  const placeholderText = disableLabelFormatting
    ? placeholder || labelName
    : LabelAndPlaceholderTextFormat(placeholder || labelName || "");

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || "string-number"}
        render={({
          field,
        }: {
          field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
        }) => {
          const error = form.formState.errors?.[name || ""];
          return (
            <FormItem>
              {labelName ? (
                <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
                  {disableLabelFormatting
                    ? labelName
                    : LabelAndPlaceholderTextFormat(labelName)}
                  {required && (
                    <span className="text-destructive">&nbsp;*</span>
                  )}
                </label>
              ) : null}
              {viewOnly ? (
                <div className="py-2 px-3 text-sm text-foreground bg-background rounded-md border border-border min-h-10">
                  {field.value || ""}
                </div>
              ) : (
                <>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={placeholderText}
                      disabled={disabled}
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {error ? String(error?.message || "") : customMessage || ""}
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
    <>
      {labelName ? (
        <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
          {disableLabelFormatting
            ? labelName
            : LabelAndPlaceholderTextFormat(labelName)}
          {required && <span className="text-destructive">&nbsp;*</span>}
        </label>
      ) : null}
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={placeholderText}
      />
    </>
  );
};
