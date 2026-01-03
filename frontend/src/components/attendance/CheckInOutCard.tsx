import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckInOutCardProps {
  isCheckedIn: boolean;
  checkInTime?: string;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

const CheckInOutCard = ({ isCheckedIn, checkInTime, onCheckIn, onCheckOut }: CheckInOutCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft overflow-hidden animate-fade-up">
      {/* Time Display */}
      <div className="gradient-hero p-8 text-center">
        <p className="text-primary-foreground/80 text-sm mb-2">{formatDate(currentTime)}</p>
        <p className="text-4xl font-bold text-primary-foreground tracking-wider">
          {formatTime(currentTime)}
        </p>
      </div>

      {/* Status & Action */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className={cn(
              "font-semibold",
              isCheckedIn ? "text-success" : "text-muted-foreground"
            )}>
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </p>
          </div>
          {checkInTime && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Check-in Time</p>
              <p className="font-semibold text-foreground">{checkInTime}</p>
            </div>
          )}
        </div>

        <Button
          onClick={isCheckedIn ? onCheckOut : onCheckIn}
          variant={isCheckedIn ? "destructive" : "hero"}
          size="lg"
          className="w-full"
        >
          {isCheckedIn ? (
            <>
              <LogOut className="w-5 h-5 mr-2" />
              Check Out
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Check In
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Working hours: 9:00 AM - 6:00 PM</span>
        </div>
      </div>
    </div>
  );
};

export default CheckInOutCard;
