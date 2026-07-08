"use client";

import type { UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface Option {
  value: string;
  label: string;
  image?: string;
  flag?: string;
  disabled?: boolean;
}

type RawOption = string | Option;

interface SelectFieldProps {
  form: UseFormReturn<FieldValues>;
  name: string;
  labelName?: string;
  required?: boolean;
  disabled?: boolean;
  options?: RawOption[];
  placeholder?: string;
  showSearch?: boolean;
  isImageShow?: boolean;
  isFlag?: boolean;
  type?: "single" | "multiple";
  viewOnly?: boolean;
  onValueChange?: (value: string | string[]) => void;
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  customMessage?: string;
}

export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      form,
      name,
      labelName,
      required = false,
      disabled = false,
      options = [],
      placeholder = "Select an option",
      showSearch = true,
      isImageShow = false,
      isFlag = false,
      type = "single",
      viewOnly = false,
      onValueChange,
      isLoading = false,
      onSearch,
      customMessage,
    },
    ref,
  ) => {
    const normalizedOptions: Option[] = React.useMemo(
      () =>
        (options || []).map((opt: RawOption) =>
          typeof opt === "string" ? { label: opt, value: opt } : opt,
        ),
      [options],
    );

    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [showMore, setShowMore] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const fieldValue = form.watch(name);
    const selectedValues = React.useMemo<string[]>(() => {
      if (type === "multiple")
        return Array.isArray(fieldValue) ? fieldValue : [];
      return fieldValue ? [fieldValue as string] : [];
    }, [fieldValue, type]);

    const selectedOptions = React.useMemo(
      () =>
        normalizedOptions.filter((opt) => selectedValues.includes(opt.value)),
      [normalizedOptions, selectedValues],
    );

    const filteredOptions = React.useMemo(() => {
      if (!showSearch || !searchValue) return normalizedOptions;
      return normalizedOptions.filter(
        (opt) =>
          opt.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          opt.value.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [normalizedOptions, searchValue, showSearch]);

    const handleSelect = (value: string) => {
      if (type === "multiple") {
        const newValues = selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value)
          : [...selectedValues, value];
        form.setValue(name, newValues, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        onValueChange?.(newValues);
      } else {
        form.setValue(name, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        onValueChange?.(value);
        setIsOpen(false);
      }
    };

    const handleClear = () => {
      form.setValue(name, type === "multiple" ? [] : "");
      onValueChange?.(type === "multiple" ? [] : "");
      setShowMore(false);
    };

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        )
          setIsOpen(false);
      };
      if (isOpen) {
        document.addEventListener("mousedown", handler);
        searchInputRef.current?.focus();
      }
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const isInvalid = form.formState.errors[name];

    return (
      <div ref={ref} className="w-full space-y-2">
        {labelName && (
          <label className="text-sm font-medium">
            {labelName}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        {viewOnly ? (
          <div className="py-2 px-3 text-sm text-foreground bg-background rounded-md border border-border min-h-10">
            {type === "multiple"
              ? selectedOptions.map((o) => o.label).join(", ")
              : selectedOptions[0]?.label || ""}
          </div>
        ) : (
          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setIsOpen((p) => !p)}
              className={cn(
                "w-full min-h-11 rounded-lg border px-3 py-2 flex items-center justify-between gap-2",
                "hover:bg-muted/50 transition-colors text-sm",
                isInvalid && "border-destructive",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <div className="flex flex-wrap gap-2 flex-1">
                {selectedOptions.length === 0 && (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
                {type === "single" && selectedOptions[0] && (
                  <div className="flex items-center gap-2">
                    {isFlag && selectedOptions[0].flag && (
                      <span>{selectedOptions[0].flag}</span>
                    )}
                    {isImageShow && selectedOptions[0].image && (
                      <Image
                        src={selectedOptions[0].image}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full object-cover"
                        alt=""
                      />
                    )}
                    <span>{selectedOptions[0].label}</span>
                  </div>
                )}
                {type === "multiple" &&
                  selectedOptions
                    .slice(0, showMore ? undefined : 2)
                    .map((opt) => (
                      <span
                        key={opt.value}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                      >
                        {opt.label}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(opt.value);
                          }}
                        />
                      </span>
                    ))}
                {type === "multiple" &&
                  !showMore &&
                  selectedOptions.length > 2 && (
                    <span
                      className="text-xs text-primary cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMore(true);
                      }}
                    >
                      +{selectedOptions.length - 2} more
                    </span>
                  )}
                {type === "multiple" &&
                  showMore &&
                  selectedOptions.length > 2 && (
                    <span
                      className="text-xs text-primary cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMore(false);
                      }}
                    >
                      show less
                    </span>
                  )}
              </div>
              <div className="flex items-center gap-1">
                {selectedOptions.length > 0 && (
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-destructive"
                    onClick={handleClear}
                  />
                )}
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>

            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-md"
              >
                {showSearch && (
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        ref={searchInputRef}
                        className="w-full pl-8 pr-3 py-2 border rounded-md text-sm bg-background"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          onSearch?.(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length === 0 && (
                    <p className="p-3 text-sm text-center text-muted-foreground">
                      {customMessage || "No options found"}
                    </p>
                  )}
                  {filteredOptions.map((opt, idx) => {
                    const active = selectedValues.includes(opt.value);
                    return (
                      <button
                        key={opt.value + idx}
                        disabled={opt.disabled}
                        onClick={() => handleSelect(opt.value)}
                        className={cn(
                          "w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted",
                          active && "bg-primary/10 text-primary",
                          opt.disabled && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        {type === "multiple" && (
                          <span className="w-4 h-4 border rounded flex items-center justify-center">
                            {active && <Check className="w-3 h-3" />}
                          </span>
                        )}
                        {isFlag && opt.flag && <span>{opt.flag}</span>}
                        {isImageShow && opt.image && (
                          <Image
                            src={opt.image}
                            width={20}
                            height={20}
                            className="w-5 h-5 rounded-full"
                            alt=""
                          />
                        )}
                        <span className="flex-1">{opt.label}</span>
                        {type === "single" && active && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {isInvalid && (
          <p className="text-xs text-destructive">
            {String(form.formState.errors[name]?.message)}
          </p>
        )}
      </div>
    );
  },
);
SelectField.displayName = "SelectField";
