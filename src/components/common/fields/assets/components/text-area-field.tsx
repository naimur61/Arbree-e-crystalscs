import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LabelAndPlaceholderTextFormat } from "@/lib/utils";
import type {
  ControllerRenderProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import type { InputInterface } from "../interface/input-props.type";

export const TextArea = ({
  form,
  name,
  labelName,
  placeholder,
  required = false,
  disabled = false,
  viewOnly = false,
  rows = 4,
  disableLabelFormatting = false,
  customMessage,
  value,
  setValue,
}: InputInterface["TextArea"]) => {
  const placeholderText = disableLabelFormatting
    ? placeholder || labelName
    : LabelAndPlaceholderTextFormat(placeholder || labelName || "");

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || "textarea"}
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
                <div className="py-2 px-3 text-sm text-foreground bg-background rounded-md border border-border min-h-10 whitespace-pre-wrap">
                  {field.value || ""}
                </div>
              ) : (
                <>
                  <FormControl>
                    <Textarea
                      placeholder={placeholderText}
                      disabled={disabled}
                      rows={rows}
                      {...field}
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
      <Textarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setValue?.(e.target.value)
        }
        placeholder={placeholderText}
        rows={rows}
      />
    </>
  );
};
