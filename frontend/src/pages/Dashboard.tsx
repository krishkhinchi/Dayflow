import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import CheckInOutCard from "@/components/attendance/CheckInOutCard";
import { 
  Users, 
  CalendarCheck, 
  CalendarOff, 
  DollarSign,
  User,
  Clock,
  FileText
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { userRole, userName } = useAuth();
  const { toast } = useToast();
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | undefined>();

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setIsCheckedIn(true);
    setCheckInTime(now);
    toast({
      title: "Checked in successfully!",
      description: `You checked in at ${now}`,
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    toast({
      title: "Checked out successfully!",
      description: "Have a great rest of your day!",
    });
  };

  const recentActivities = [
    {
      id: "1",
      type: "leave" as const,
      title: "Leave Request Submitted",
      description: "Annual leave for Dec 25-27",
      time: "2 hours ago",
      status: "pending" as const,
    },
    {
      id: "2",
      type: "attendance" as const,
      title: "Attendance Marked",
      description: "Checked in at 9:05 AM",
      time: "Today",
    },
    {
      id: "3",
      type: "payroll" as const,
      title: "Salary Credited",
      description: "November 2024 salary processed",
      time: "2 days ago",
    },
    {
      id: "4",
      type: "leave" as const,
      title: "Leave Approved",
      description: "Sick leave for Nov 15",
      time: "1 week ago",
      status: "approved" as const,
    },
  ];

  if (userRole === "admin") {
    return (
      <DashboardLayout userRole="admin" userName={userName || "Admin"}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of your organization's HR metrics</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Employees"
              value="156"
              subtitle="12 departments"
              icon={<Users className="w-6 h-6" />}
              variant="primary"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Present Today"
              value="142"
              subtitle="91% attendance"
              icon={<CalendarCheck className="w-6 h-6" />}
              variant="success"
            />
            <StatCard
              title="Pending Leaves"
              value="8"
              subtitle="Requires approval"
              icon={<CalendarOff className="w-6 h-6" />}
              variant="warning"
            />
            <StatCard
              title="Payroll Due"
              value="$284K"
              subtitle="This month"
              icon={<DollarSign className="w-6 h-6" />}
            />
          </div>

          {/* Quick Actions & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickActionCard
                  to="/employees"
                  icon={<Users className="w-5 h-5" />}
                  title="Manage Employees"
                  description="View and edit employee records"
                  variant="primary"
                />
                <QuickActionCard
                  to="/leave-approvals"
                  icon={<CalendarOff className="w-5 h-5" />}
                  title="Leave Approvals"
                  description="8 pending requests"
                  variant="accent"
                />
                <QuickActionCard
                  to="/attendance"
                  icon={<CalendarCheck className="w-5 h-5" />}
                  title="Attendance Report"
                  description="View attendance records"
                />
                <QuickActionCard
                  to="/payroll"
                  icon={<DollarSign className="w-5 h-5" />}
                  title="Payroll Management"
                  description="Process salaries"
                />
              </div>
            </div>
            <RecentActivityCard activities={recentActivities} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="employee" userName={userName || "Employee"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName?.split(" ")[0] || "User"}! 👋</h1>
          <p className="text-muted-foreground">Here's your workday overview</p>
        </div>

        {/* Stats & Check-in */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Days Worked"
              value="22"
              subtitle="This month"
              icon={<CalendarCheck className="w-6 h-6" />}
              variant="primary"
            />
            <StatCard
              title="Leave Balance"
              value="12"
              subtitle="Days remaining"
              icon={<CalendarOff className="w-6 h-6" />}
              variant="accent"
            />
            <StatCard
              title="Working Hours"
              value="176h"
              subtitle="This month"
              icon={<Clock className="w-6 h-6" />}
            />
            <StatCard
              title="Pending Requests"
              value="1"
              subtitle="Awaiting approval"
              icon={<FileText className="w-6 h-6" />}
            />
          </div>
          <CheckInOutCard
            isCheckedIn={isCheckedIn}
            checkInTime={checkInTime}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-foreground">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                to="/profile"
                icon={<User className="w-5 h-5" />}
                title="My Profile"
                description="View and update your details"
                variant="primary"
              />
              <QuickActionCard
                to="/leave"
                icon={<CalendarOff className="w-5 h-5" />}
                title="Apply for Leave"
                description="Submit a new leave request"
                variant="accent"
              />
              <QuickActionCard
                to="/attendance"
                icon={<CalendarCheck className="w-5 h-5" />}
                title="My Attendance"
                description="View attendance history"
              />
              <QuickActionCard
                to="/payroll"
                icon={<DollarSign className="w-5 h-5" />}
                title="Payroll Details"
                description="View salary information"
              />
            </div>
          </div>
          <RecentActivityCard activities={recentActivities} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
