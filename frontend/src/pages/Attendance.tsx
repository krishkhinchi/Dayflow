import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CheckInOutCard from "@/components/attendance/CheckInOutCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  date: string;
  employee?: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  extraHours: string;
}

const Attendance = () => {
  const { toast } = useToast();
  const { userRole, userName } = useAuth();
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | undefined>();
  const [currentDate] = useState("22 October 2026");
  const [viewMode, setViewMode] = useState<"Day" | "Week">("Day");

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
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

  // Admin view data - shows all employees
  const adminAttendanceData: AttendanceRecord[] = [
    { date: "Day", employee: "[Employee1]", checkIn: "10:00", checkOut: "14:00", workHours: "04:00", extraHours: "01:00" },
    { date: "[Employee2]", checkIn: "10:00", checkOut: "14:00", workHours: "04:00", extraHours: "01:00" },
  ];

  // Employee view data - shows own attendance
  const employeeAttendanceData: AttendanceRecord[] = [
    { date: "28/10/2026", checkIn: "10:00", checkOut: "14:00", workHours: "04:00", extraHours: "01:00" },
    { date: "29/10/2026", checkIn: "10:00", checkOut: "14:00", workHours: "04:00", extraHours: "01:00" },
  ];

  const employeeStats = {
    daysPresent: 18,
    leavesUsed: 2,
    totalWorkingDays: 22,
  };

  if (userRole === "admin") {
    return (
      <DashboardLayout userRole="admin" userName={userName || "Admin"}>
        <div className="space-y-6">
          {/* Header with title and search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Attendance</h1>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10" />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Select defaultValue="date">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date v</SelectItem>
              </SelectContent>
            </Select>

            <Button variant={viewMode === "Day" ? "default" : "outline"} onClick={() => setViewMode("Day")}>
              Day
            </Button>
          </div>

          {/* Date Display */}
          <div className="text-sm text-muted-foreground">{currentDate}</div>

          {/* Attendance Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Day</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check In</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check Out</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Work Hours</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Extra Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminAttendanceData.map((record, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                      >
                        <td className="p-4 text-foreground">{record.employee || record.date}</td>
                        <td className="p-4 text-foreground">{record.checkIn}</td>
                        <td className="p-4 text-foreground">{record.checkOut}</td>
                        <td className="p-4 text-foreground">{record.workHours}</td>
                        <td className="p-4 text-foreground">{record.extraHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Employee View
  return (
    <DashboardLayout userRole="employee" userName={userName || "Employee"}>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-xl font-semibold text-foreground">Attendance</h1>

        {/* Stats and Navigation Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Select defaultValue="oct">
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oct">Oct v</SelectItem>
              <SelectItem value="nov">Nov</SelectItem>
              <SelectItem value="dec">Dec</SelectItem>
            </SelectContent>
          </Select>

          {/* Stats */}
          <div className="flex items-center gap-6 ml-auto">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Count of days present</p>
              <p className="text-lg font-semibold text-foreground">{employeeStats.daysPresent}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Leaves used</p>
              <p className="text-lg font-semibold text-foreground">{employeeStats.leavesUsed}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Total working days</p>
              <p className="text-lg font-semibold text-foreground">{employeeStats.totalWorkingDays}</p>
            </div>
          </div>
        </div>

        {/* Date Display */}
        <div className="text-sm text-muted-foreground">{currentDate}</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attendance Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check In</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check Out</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Work Hours</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Extra Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeAttendanceData.map((record, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                        >
                          <td className="p-4 text-foreground">{record.date}</td>
                          <td className="p-4 text-foreground">{record.checkIn}</td>
                          <td className="p-4 text-foreground">{record.checkOut}</td>
                          <td className="p-4 text-foreground">{record.workHours}</td>
                          <td className="p-4 text-foreground">{record.extraHours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Check In/Out Card */}
          <div>
            <CheckInOutCard
              isCheckedIn={isCheckedIn}
              checkInTime={checkInTime}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
