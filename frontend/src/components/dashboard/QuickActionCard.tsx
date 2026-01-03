import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface QuickActionCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "default" | "primary" | "accent";
}

const QuickActionCard = ({ to, icon, title, description, variant = "default" }: QuickActionCardProps) => {
  const iconVariants = {
    default: "bg-secondary text-primary",
    primary: "gradient-hero text-primary-foreground shadow-glow",
    accent: "gradient-accent text-accent-foreground shadow-accent-glow",
  };

  return (
    <Link
      to={to}
      className="group block bg-card rounded-2xl p-5 shadow-soft hover:shadow-elevated transition-all duration-300 border border-transparent hover:border-primary/20 animate-fade-up"
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", iconVariants[variant])}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

export default QuickActionCard;
