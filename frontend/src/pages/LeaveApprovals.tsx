import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLeaveRequests, LeaveRequest } from "@/hooks/useLeaveRequests";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeaveStatusBadge from "@/components/leave/LeaveStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Check, 
  X, 
  Clock,
  Umbrella,
  Stethoscope,
  MessageSquare,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";

const LeaveApprovals = () => {
  const { userName } = useAuth();
  const { leaveRequests, loading, updateLeaveStatus } = useLeaveRequests();
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [comment, setComment] = useState("");
  const [processing, setProcessing] = useState(false);

  const pendingRequests = leaveRequests.filter(r => r.status === "pending");
  const processedRequests = leaveRequests.filter(r => r.status !== "pending");

  const approvedThisMonth = leaveRequests.filter(r => {
    if (r.status !== "approved" || !r.reviewed_at) return false;
    const reviewDate = parseISO(r.reviewed_at);
    const now = new Date();
    return reviewDate.getMonth() === now.getMonth() && reviewDate.getFullYear() === now.getFullYear();
  }).length;

  const rejectedThisMonth = leaveRequests.filter(r => {
    if (r.status !== "rejected" || !r.reviewed_at) return false;
    const reviewDate = parseISO(r.reviewed_at);
    const now = new Date();
    return reviewDate.getMonth() === now.getMonth() && reviewDate.getFullYear() === now.getFullYear();
  }).length;

  const handleApprove = async (request: LeaveRequest) => {
    setProcessing(true);
    const result = await updateLeaveStatus(request.id, "approved", comment);
    setProcessing(false);
    if (result.success) {
      setSelectedRequest(null);
      setComment("");
    }
  };

  const handleReject = async (request: LeaveRequest) => {
    setProcessing(true);
    const result = await updateLeaveStatus(request.id, "rejected", comment);
    setProcessing(false);
    if (result.success) {
      setSelectedRequest(null);
      setComment("");
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case "paid":
        return <Umbrella className="w-4 h-4" />;
      case "sick":
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const RequestCard = ({ request, showActions = true }: { request: LeaveRequest; showActions?: boolean }) => (
    <div className="flex flex-col md:flex-row gap-4 p-5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="bg-primary text-primary-foreground font-medium">
            {getInitials(request.employee_name || "U")}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{request.employee_name || "Unknown"}</h3>
            <span className="text-sm text-muted-foreground">{request.employee_email}</span>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
            <div className="flex items-center gap-1.5 text-primary">
              {getLeaveTypeIcon(request.leave_type)}
              <span className="capitalize font-medium">{request.leave_type} Leave</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(request.start_date)} - {formatDate(request.end_date)}</span>
              <span className="text-foreground font-medium">({request.days} days)</span>
            </div>
          </div>
          
          {request.reason && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{request.reason}</p>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">Applied on {formatDate(request.created_at)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:flex-col md:items-end justify-between md:justify-center">
        <LeaveStatusBadge status={request.status} />
        {showActions && request.status === "pending" && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setSelectedRequest(request)}
              className="gap-1"
            >
              <MessageSquare className="w-4 h-4" />
              Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout userRole="admin" userName={userName || "Admin"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Approvals</h1>
          <p className="text-muted-foreground">Review and manage employee leave requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-l-4 border-l-warning">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-3xl font-bold text-foreground">{pendingRequests.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>
          <Card className="p-5 border-l-4 border-l-success">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved This Month</p>
                <p className="text-3xl font-bold text-foreground">{approvedThisMonth}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
          <Card className="p-5 border-l-4 border-l-destructive">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected This Month</p>
                <p className="text-3xl font-bold text-foreground">{rejectedThisMonth}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Requests Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {pendingRequests.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-warning/20 text-warning text-xs font-medium">
                  {pendingRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Requests awaiting your approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending requests
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processed">
            <Card>
              <CardHeader>
                <CardTitle>Processed Requests</CardTitle>
                <CardDescription>Previously approved or rejected requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : processedRequests.length > 0 ? (
                  processedRequests.map((request) => (
                    <RequestCard key={request.id} request={request} showActions={false} />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No processed requests yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Review Leave Request</DialogTitle>
            <DialogDescription>
              Review and respond to this leave request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(selectedRequest.employee_name || "U")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{selectedRequest.employee_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.employee_email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Leave Type</p>
                  <p className="font-medium text-foreground capitalize">{selectedRequest.leave_type} Leave</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium text-foreground">{selectedRequest.days} day(s)</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Dates</p>
                  <p className="font-medium text-foreground">
                    {formatDate(selectedRequest.start_date)} - {formatDate(selectedRequest.end_date)}
                  </p>
                </div>
                {selectedRequest.reason && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Reason</p>
                    <p className="font-medium text-foreground">{selectedRequest.reason}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Add Comment (Optional)</label>
                <Textarea
                  placeholder="Add a note or reason for your decision..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => handleReject(selectedRequest)}
                  disabled={processing}
                  className="gap-2"
                >
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                  Reject
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => handleApprove(selectedRequest)}
                  disabled={processing}
                  className="gap-2"
                >
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LeaveApprovals;
