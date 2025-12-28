import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "interactive";
}

// Combine Motion properties with HTML Div properties
type CombinedCardProps = CardProps & MotionProps;

export const Card = React.forwardRef<HTMLDivElement, CombinedCardProps>(
    ({ className, variant = "glass", ...props }, ref) => {

        // Base styles for all cards
        const baseStyles = "rounded-2xl border p-6 transition-all duration-300 relative overflow-hidden";

        const variants = {
            default: "bg-card text-card-foreground border-border shadow-sm",
            glass: "glass-card hover:shadow-2xl hover:shadow-primary/5",
            interactive: "glass hover:border-primary/50 hover:shadow-[0_0_30px_-5px_var(--primary)]/20 cursor-pointer group"
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";
