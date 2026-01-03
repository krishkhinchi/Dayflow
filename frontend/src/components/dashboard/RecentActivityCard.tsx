import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "leave" | "attendance" | "profile" | "payroll";
  title: string;
  description: string;
  time: string;
  status?: "pending" | "approved" | "rejected";
}

interface RecentActivityCardProps {
  activities: Activity[];
}

const RecentActivityCard = ({ activities }: RecentActivityCardProps) => {
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    const styles = {
      pending: "bg-warning/10 text-warning",
      approved: "bg-success/10 text-success",
      rejected: "bg-destructive/10 text-destructive",
    };
    return (
      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium capitalize", styles[status as keyof typeof styles])}>
        {status}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      leave: "🌴",
      attendance: "📅",
      profile: "👤",
      payroll: "💰",
    };
    return icons[type as keyof typeof icons] || "📋";
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft p-6 animate-fade-up">
      <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0 animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-lg">{getTypeIcon(activity.type)}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-foreground text-sm">{activity.title}</p>
                {getStatusBadge(activity.status)}
              </div>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
