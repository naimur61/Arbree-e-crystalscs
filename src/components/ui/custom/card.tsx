import * as React from "react";
import { cn } from "@/lib/utils";
import { themeConfig } from "@/lib/theme/theme.config";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white dark:bg-gray-950 rounded-lg border shadow-sm",
        themeConfig.colors.border.card,
        className,
      )}
      {...props}
    />
  );
}

export { Card };
