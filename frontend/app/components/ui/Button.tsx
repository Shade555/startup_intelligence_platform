import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  
  const baseStyles = "relative inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-[#0c0c0c] hover:bg-[#e4e4e7] hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    secondary: "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)]",
    danger: "bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 hover:bg-[rgba(239,68,68,0.15)] hover:text-red-300 shadow-[0_4px_15px_rgba(239,68,68,0.1)]",
    ghost: "bg-transparent text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.05)]",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
      )}
    </button>
  );
}
