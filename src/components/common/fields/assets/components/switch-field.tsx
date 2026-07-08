import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { LabelAndPlaceholderTextFormat } from "@/lib/utils";
import type {
  ControllerRenderProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import type { InputInterface } from "../interface/input-props.type";

export const SwitchField = ({
  form,
  name,
  labelName,
  required = false,
  disabled = false,
  viewOnly = false,
  disableLabelFormatting = false,
  customMessage,
  description,
  border = false,
  value,
  setValue,
  onCheckedChange,
}: InputInterface["Switch"]) => {
  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || "switch"}
        render={({
          field,
        }: {
          field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
        }) => {
          const error = form.formState.errors?.[name || ""];
          return (
            <FormItem>
              <div
                className={`flex items-center justify-between ${border ? "p-4 border rounded-lg" : ""}`}
              >
                <div className="space-y-0.5">
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
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked: boolean) => {
                      field.onChange(checked);
                      onCheckedChange?.(checked);
                    }}
                    disabled={disabled || viewOnly}
                  />
                </FormControl>
              </div>
              <FormMessage>
                {error ? String(error?.message || "") : customMessage || ""}
              </FormMessage>
            </FormItem>
          );
        }}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-between ${border ? "p-4 border rounded-lg" : ""}`}
    >
      <div className="space-y-0.5">
        {labelName ? (
          <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
            {disableLabelFormatting
              ? labelName
              : LabelAndPlaceholderTextFormat(labelName)}
            {required && <span className="text-destructive">&nbsp;*</span>}
          </label>
        ) : null}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        checked={value}
        onCheckedChange={(checked: boolean) => {
          setValue?.(checked);
          onCheckedChange?.(checked);
        }}
        disabled={disabled || viewOnly}
      />
    </div>
  );
};
