import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

type CombinedButtonProps = ButtonProps & MotionProps;

export const Button = React.forwardRef<HTMLButtonElement, CombinedButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      primary: "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:brightness-110 border border-white/10",
      secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
      outline: "border-2 border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100 hover:border-zinc-600",
      ghost: "hover:bg-white/5 text-zinc-400 hover:text-white"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
