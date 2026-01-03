import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success" | "warning";
}

const StatCard = ({ title, value, subtitle, icon, trend, variant = "default" }: StatCardProps) => {
  const variants = {
    default: "bg-card",
    primary: "gradient-hero text-primary-foreground",
    accent: "gradient-accent text-accent-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
  };

  const isColored = variant !== "default";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-up",
        variants[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", isColored ? "opacity-80" : "text-muted-foreground")}>
            {title}
          </p>
          <p className={cn("text-3xl font-bold", !isColored && "text-foreground")}>{value}</p>
          {subtitle && (
            <p className={cn("text-sm", isColored ? "opacity-70" : "text-muted-foreground")}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 text-sm font-medium mt-2",
              trend.isPositive ? "text-success" : "text-destructive",
              isColored && "!text-inherit opacity-80"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="opacity-60">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          isColored ? "bg-white/20" : "bg-primary/10"
        )}>
          <span className={isColored ? "" : "text-primary"}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
