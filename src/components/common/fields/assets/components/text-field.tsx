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

export const Text = ({
  form,
  name,
  placeholder,
  labelName,
  required = false,
  disabled = false,
  viewOnly = false,
  disableLabelFormatting = false,
  customMessage,
  isArray = false,
  leftIcon,
  rightIcon,
  value,
  setValue,
}: InputInterface["Text"]) => {
  const placeholderText = disableLabelFormatting
    ? placeholder || labelName || ""
    : LabelAndPlaceholderTextFormat(placeholder || labelName || "");

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || "text"}
        render={({
          field,
        }: {
          field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
        }) => {
          const error = form.formState.errors?.[name || ""];
          const isError = !!error;
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
                    <div className="w-full relative">
                      {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {leftIcon}
                        </div>
                      )}
                      <Input
                        className={`${leftIcon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"} ${isError ? "border-destructive" : ""}`}
                        placeholder={placeholderText}
                        disabled={disabled}
                        {...field}
                        type="text"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          if (isArray && name) {
                            const arr = event.target.value
                              .split(/[\s,]+/)
                              .map((v: string) => v.trim())
                              .filter((v: string) => v.length > 0);
                            form.setValue(name, arr, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }
                          field.onChange(event);
                        }}
                      />
                      {rightIcon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
                          {rightIcon}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage>
                    {isError
                      ? String(error?.message || "")
                      : customMessage || ""}
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
      <div className="w-full relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <Input
          className={`${leftIcon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"}`}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue?.(e.target.value || "")
          }
          type="text"
          placeholder={placeholderText}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
    </>
  );
};
