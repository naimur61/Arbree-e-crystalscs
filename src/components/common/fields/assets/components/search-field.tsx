import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ActionButton } from "@/components/common/button/action-button";
import type { SearchFieldProps } from "../interface/input-props.type";

export const SearchField = ({
  placeholder = "Search...",
  onSearch,
  value: externalValue,
  setValue: setExternalValue,
}: SearchFieldProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-10 pr-10"
        placeholder={placeholder}
        value={externalValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setExternalValue?.(e.target.value);
          onSearch?.(e.target.value);
        }}
      />
      {externalValue && (
        <ActionButton
          type="button"
          variant="ghost"
          size="icon"
          icon={<X className="h-4 w-4" />}
          handleOpen={() => {
            setExternalValue?.("");
            onSearch?.("");
          }}
          btnStyle="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        />
      )}
    </div>
  );
};
