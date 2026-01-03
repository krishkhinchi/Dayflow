import { cn } from "@/lib/utils";

interface LeaveStatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

const LeaveStatusBadge = ({ status }: LeaveStatusBadgeProps) => {
  const styles = {
    pending: "bg-warning/10 text-warning border-warning/20",
    approved: "bg-success/10 text-success border-success/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const icons = {
    pending: "⏳",
    approved: "✓",
    rejected: "✕",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium capitalize",
        styles[status]
      )}
    >
      <span>{icons[status]}</span>
      {status}
    </span>
  );
};

export default LeaveStatusBadge;
