import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "reading" | "wide";
  children: React.ReactNode;
}

export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: "max-w-[1140px]",
    reading: "max-w-[760px]",
    wide: "max-w-[1240px]",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-margin-mobile lg:px-margin",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
