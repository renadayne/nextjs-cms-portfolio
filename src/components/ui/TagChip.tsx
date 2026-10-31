import React from "react";
import { cn } from "@/lib/utils";

interface TagChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

export function TagChip({
  active = false,
  clickable = false,
  className,
  children,
  ...props
}: TagChipProps) {
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-md font-code-inline text-[13px] transition-all",
        active
          ? "bg-on-surface text-surface font-medium"
          : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
        clickable && "cursor-pointer active:scale-95",
        className
      )}
      {...props}
    >
      #{children}
    </span>
  );
}
