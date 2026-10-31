import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-label-md text-label-md rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-primary-container text-on-primary hover:bg-secondary shadow-sm",
    secondary:
      "bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary shadow-sm border border-outline-variant/30",
    outline:
      "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-low hover:border-outline",
    ghost:
      "bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
  };

  const sizeStyles = {
    sm: "h-9 px-3.5 text-body-sm rounded-md",
    md: "h-11 px-5",
    lg: "h-12 px-6 text-headline-sm",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
