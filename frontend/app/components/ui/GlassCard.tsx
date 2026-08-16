import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, size = "lg", hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card",
        `card-${size}`,
        hoverEffect && "glass-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
