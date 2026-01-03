import { cn } from "@/lib/utils";

interface AttendanceStatusProps {
  status: "present" | "absent" | "half-day" | "leave" | "pending";
  size?: "sm" | "md";
}

const AttendanceStatus = ({ status, size = "md" }: AttendanceStatusProps) => {
  const styles = {
    present: "bg-success/10 text-success border-success/20",
    absent: "bg-destructive/10 text-destructive border-destructive/20",
    "half-day": "bg-warning/10 text-warning border-warning/20",
    leave: "bg-info/10 text-info border-info/20",
    pending: "bg-muted text-muted-foreground border-muted",
  };

  const labels = {
    present: "Present",
    absent: "Absent",
    "half-day": "Half Day",
    leave: "On Leave",
    pending: "Pending",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        styles[status],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {labels[status]}
    </span>
  );
};

export default AttendanceStatus;
