import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: "paid" | "sick" | "unpaid";
  start_date: string;
  end_date: string;
  days: number;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  admin_comment: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  employee_name?: string;
  employee_email?: string;
}

export interface LeaveBalance {
  paid_days: number;
  sick_days: number;
  unpaid_days: number;
}

export const useLeaveRequests = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance>({ paid_days: 24, sick_days: 7, unpaid_days: 0 });
  const [loading, setLoading] = useState(true);

  const fetchLeaveRequests = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from("leave_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (userRole === "employee") {
        query = query.eq("user_id", user.id);
      }

      const { data: requestsData, error: requestsError } = await query;
      if (requestsError) throw requestsError;

      const userIds = [...new Set((requestsData || []).map(r => r.user_id))];
      
      let profilesMap: Record<string, { full_name: string | null; email: string | null }> = {};
      
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", userIds);
        
        if (profilesData) {
          profilesMap = profilesData.reduce((acc, p) => {
            acc[p.id] = { full_name: p.full_name, email: p.email };
            return acc;
          }, {} as Record<string, { full_name: string | null; email: string | null }>);
        }
      }

      const formattedData: LeaveRequest[] = (requestsData || []).map((item: any) => ({
        ...item,
        employee_name: profilesMap[item.user_id]?.full_name || "Unknown",
        employee_email: profilesMap[item.user_id]?.email || "",
      }));

      setLeaveRequests(formattedData);
    } catch (error: any) {
      console.error("Error fetching leave requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leave requests",
        variant: "destructive",
      });
    }
  };

  const fetchLeaveBalance = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("leave_balances")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setLeaveBalance({
          paid_days: data.paid_days,
          sick_days: data.sick_days,
          unpaid_days: data.unpaid_days,
        });
      }
    } catch (error: any) {
      console.error("Error fetching leave balance:", error);
    }
  };

  const createLeaveRequest = async (request: {
    leave_type: "paid" | "sick" | "unpaid";
    start_date: string;
    end_date: string;
    days: number;
    reason?: string;
  }) => {
    if (!user) return { success: false };

    try {
      const { error } = await supabase.from("leave_requests").insert({
        user_id: user.id,
        leave_type: request.leave_type,
        start_date: request.start_date,
        end_date: request.end_date,
        days: request.days,
        reason: request.reason || null,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "Your time off request has been sent for approval.",
      });

      return { success: true };
    } catch (error: any) {
      console.error("Error creating leave request:", error);
      toast({
        title: "Error",
        description: "Failed to submit leave request",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const updateLeaveStatus = async (
    requestId: string,
    status: "approved" | "rejected",
    comment?: string
  ) => {
    if (!user || userRole !== "admin") return { success: false };

    try {
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status,
          admin_comment: comment || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: status === "approved" ? "Leave Approved" : "Leave Rejected",
        description: `The leave request has been ${status}.`,
        variant: status === "rejected" ? "destructive" : "default",
      });

      return { success: true };
    } catch (error: any) {
      console.error("Error updating leave request:", error);
      toast({
        title: "Error",
        description: "Failed to update leave request",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchLeaveRequests(), fetchLeaveBalance()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user, userRole]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("leave-requests-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leave_requests",
        },
        (payload) => {
          console.log("Leave request change received:", payload);
          fetchLeaveRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, userRole]);

  return {
    leaveRequests,
    leaveBalance,
    loading,
    createLeaveRequest,
    updateLeaveStatus,
    refetch: fetchLeaveRequests,
  };
};
