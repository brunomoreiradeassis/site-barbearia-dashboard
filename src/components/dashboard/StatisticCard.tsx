
import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const cardVariants = cva(
  "stat-card flex flex-col gap-2 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card/80 hover:bg-card/90",
        primary: "bg-primary/10 hover:bg-primary/15 border-primary/20",
        success: "bg-green-500/10 hover:bg-green-500/15 border-green-500/20 text-green-700 dark:text-green-500",
        warning: "bg-orange-500/10 hover:bg-orange-500/15 border-orange-500/20 text-orange-700 dark:text-orange-500",
        info: "bg-blue-500/10 hover:bg-blue-500/15 border-blue-500/20 text-blue-700 dark:text-blue-500",
        danger: "bg-red-500/10 hover:bg-red-500/15 border-red-500/20 text-red-700 dark:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatisticCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "info" | "danger";
  className?: string;
}

export function StatisticCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatisticCardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)}>
      <div className="absolute -right-3 -top-3 opacity-10">
        <Icon size={60} />
      </div>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="rounded-full bg-background/50 p-1.5">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
