import React from "react";
import { cn } from "@/lib/utils";
import { PostCategory } from "@/types";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "tech" | "life" | "neutral" | "active" | "live";
  category?: PostCategory;
  children: React.ReactNode;
}

export function Badge({
  variant,
  category,
  className,
  children,
  ...props
}: BadgeProps) {
  // If category is provided, map to variant
  const effectiveVariant = category ? category : variant || "neutral";

  const variantStyles = {
    tech: "bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]",
    life: "bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0]",
    neutral: "bg-surface-container text-on-surface-variant",
    active: "bg-on-surface text-surface",
    live: "bg-secondary-fixed text-on-secondary-fixed font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-medium transition-colors",
        variantStyles[effectiveVariant],
        className
      )}
      {...props}
    >
      {effectiveVariant === "tech" && (
        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
      )}
      {effectiveVariant === "life" && (
        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
      )}
      {children}
    </span>
  );
}
