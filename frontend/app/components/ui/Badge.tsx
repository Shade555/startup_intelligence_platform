import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "green" | "amber" | "yellow" | "red" | "rose" | "neutral";
}

export function Badge({ children, className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        variant !== "neutral" && `badge-${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
