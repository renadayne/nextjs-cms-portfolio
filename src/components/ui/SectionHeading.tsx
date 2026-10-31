import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10",
        align === "center" && "md:flex-col md:items-center text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <div className="flex items-center gap-2 text-primary font-code-inline text-code-inline font-medium uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 font-body-default text-body-default text-on-surface-variant leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="self-start md:self-end">{action}</div>}
    </div>
  );
}
