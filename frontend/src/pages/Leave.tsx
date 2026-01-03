import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";

const Leave = () => {
  const { userName } = useAuth();
  const { leaveRequests, leaveBalance, loading, createLeaveRequest } = useLeaveRequests();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [newLeave, setNewLeave] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const days = differenceInDays(parseISO(end), parseISO(start)) + 1;
    return days > 0 ? days : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.type || !newLeave.startDate || !newLeave.endDate) return;

    setSubmitting(true);
    const days = calculateDays(newLeave.startDate, newLeave.endDate);
    
    const result = await createLeaveRequest({
      leave_type: newLeave.type as "paid" | "sick" | "unpaid",
      start_date: newLeave.startDate,
      end_date: newLeave.endDate,
      days,
      reason: newLeave.reason,
    });

    setSubmitting(false);
    if (result.success) {
      setIsDialogOpen(false);
      setNewLeave({ type: "", startDate: "", endDate: "", reason: "" });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return dateString;
    }
  };

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case "paid": return "Paid Time Off";
      case "sick": return "Sick Leave";
      case "unpaid": return "Unpaid Leave";
      default: return type;
    }
  };

  return (
    <DashboardLayout userRole="employee" userName={userName || "Employee"}>
      <div className="space-y-6">
        <Tabs defaultValue="timeoff" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="timeoff" className="bg-info/20 data-[state=active]:bg-info data-[state=active]:text-info-foreground">
                Time Off
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="timeoff" className="space-y-6">
            {/* NEW Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" className="gap-2">
                  <Plus className="w-4 h-4" />
                  NEW
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Time Off Request</DialogTitle>
                  <DialogDescription>
                    Submit a new time off request
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Input value={userName || "Employee"} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Time Off Type *</Label>
                    <Select value={newLeave.type} onValueChange={(value) => setNewLeave({ ...newLeave, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time off type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid Time Off ({leaveBalance.paid_days} days available)</SelectItem>
                        <SelectItem value="sick">Sick Leave ({leaveBalance.sick_days} days available)</SelectItem>
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date Range *</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="date"
                        value={newLeave.startDate}
                        onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                        required
                      />
                      <span className="text-muted-foreground">To</span>
                      <Input
                        type="date"
                        value={newLeave.endDate}
                        onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                        min={newLeave.startDate}
                        required
                      />
                    </div>
                    {newLeave.startDate && newLeave.endDate && (
                      <p className="text-sm text-muted-foreground">
                        Duration: {calculateDays(newLeave.startDate, newLeave.endDate)} day(s)
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Reason (Optional)</Label>
                    <Textarea
                      placeholder="Enter reason for time off..."
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-start gap-3 pt-4">
                    <Button type="submit" variant="hero" disabled={submitting || !newLeave.type || !newLeave.startDate || !newLeave.endDate}>
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Leave Balance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-5">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Paid Time Off</h3>
                <p className="text-2xl font-bold text-foreground">{leaveBalance.paid_days} Days</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </Card>
              <Card className="p-5">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Sick Leave</h3>
                <p className="text-2xl font-bold text-foreground">{leaveBalance.sick_days} Days</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </Card>
              <Card className="p-5">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Unpaid Leave</h3>
                <p className="text-2xl font-bold text-foreground">Unlimited</p>
                <p className="text-xs text-muted-foreground">As needed</p>
              </Card>
            </div>

            {/* Leave Requests Table */}
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Start Date</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">End Date</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Days</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Admin Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveRequests.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-muted-foreground">
                              No leave requests yet. Click "NEW" to create one.
                            </td>
                          </tr>
                        ) : (
                          leaveRequests.map((request) => (
                            <tr 
                              key={request.id} 
                              className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                            >
                              <td className="p-4 text-foreground">{formatDate(request.start_date)}</td>
                              <td className="p-4 text-foreground">{formatDate(request.end_date)}</td>
                              <td className="p-4 text-foreground">{request.days}</td>
                              <td className="p-4">
                                <span className="text-info font-medium">
                                  {getLeaveTypeLabel(request.leave_type)}
                                </span>
                              </td>
                              <td className="p-4">
                                {request.status === "pending" && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
                                    Pending
                                  </span>
                                )}
                                {request.status === "approved" && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                                    Approved
                                  </span>
                                )}
                                {request.status === "rejected" && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                                    Rejected
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-muted-foreground text-sm max-w-[200px] truncate">
                                {request.admin_comment || "-"}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Leave;
