import * as React from "react";
import { cn } from "@/lib/utils";
import { themeConfig } from "@/lib/theme/theme.config";

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
} as const;

interface CardContainerProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
  /** Render as a different element (e.g. "section", "article", "aside") */
  as?: React.ElementType;
  /** Padding size: "none" | "sm" | "md" | "lg" (default "md") */
  padding?: keyof typeof paddingMap;
  /** Remove shadow */
  noShadow?: boolean;
  /** Optional icon shown before the title */
  icon?: React.ReactNode;
  /** Card title */
  title?: React.ReactNode;
  /** Subtitle or description below the title */
  subtitle?: React.ReactNode;
  /** Action element shown on the right side of the header */
  action?: React.ReactNode;
  /** Custom header content (overrides icon, title, subtitle, action) */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
}

function CardContainer({
  className,
  as: Component = "div",
  padding = "md",
  noShadow = false,
  icon,
  title,
  subtitle,
  action,
  header,
  footer,
  children,
  ...props
}: CardContainerProps) {
  const showBuiltInHeader = !header && (icon || title || subtitle || action);

  return (
    <Component
      data-slot="card-container"
      className={cn(
        "bg-primary rounded-lg border",
        themeConfig.colors.border.card,
        paddingMap[padding],
        noShadow ? "" : "shadow-sm",
        className,
      )}
      {...props}
    >
      {header ??
        (showBuiltInHeader && (
          <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col gap-1 min-w-0">
              {(icon || title) && (
                <div className="flex gap-2 items-center">
                  {icon && <span className="shrink-0">{icon}</span>}
                  {title && (
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {title}
                    </div>
                  )}
                </div>
              )}
              {subtitle && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {subtitle}
                </div>
              )}
            </div>
            {action && <div className="ml-4 shrink-0">{action}</div>}
          </div>
        ))}

      {children}

      {footer && (
        <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800">
          {footer}
        </div>
      )}
    </Component>
  );
}

export { CardContainer };
