"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "button" | "reset";
  btnSize?: "default" | "sm" | "lg" | "icon";
  btnStyle?: string;
  tooltipStyle?: string;
  variant?:
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  tooltipContent?: string;
  buttonContent?: React.ReactNode;
  icon?: React.ReactNode;
  lastIcon?: React.ReactNode;
  isPending?: boolean;
  handleOpen?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  side?: "top" | "right" | "bottom" | "left";
  loadingContent?: React.ReactNode;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      type = "button",
      btnSize = "default",
      btnStyle,
      tooltipStyle,
      variant = "default",
      tooltipContent,
      buttonContent,
      icon,
      lastIcon,
      isPending = false,
      handleOpen,
      side = "top",
      loadingContent,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const buttonEl = (
      <Button
        ref={ref}
        type={type}
        size={btnSize}
        onClick={handleOpen}
        variant={variant}
        disabled={isPending || disabled}
        className={cn(
          "capitalize cursor-pointer",
          (isPending || disabled) && "opacity-60 cursor-not-allowed",
          btnStyle,
          icon && (buttonContent || isPending) && "gap-x-3",
        )}
        {...props}
      >
        {!isPending && icon}
        {(buttonContent || isPending) && (
          <span>
            {isPending ? (loadingContent ?? buttonContent) : buttonContent}
          </span>
        )}
        {!isPending && lastIcon}
        {isPending && <Loader2 className="ml-2 w-4 h-4 animate-spin" />}
      </Button>
    );

    if (!tooltipContent) return buttonEl;
    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonEl}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(
            "bg-muted-foreground text-primary-foreground",
            tooltipStyle,
          )}
        >
          <p className="text-[10px]">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    );
  },
);
ActionButton.displayName = "ActionButton";

export { ActionButton };
