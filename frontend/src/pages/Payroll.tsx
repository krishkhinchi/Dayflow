import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Download, 
  TrendingUp, 
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const Payroll = () => {
  const { userRole, userName } = useAuth();

  const salaryBreakdown = {
    baseSalary: 7083.33,
    allowances: 500,
    bonus: 0,
    deductions: {
      tax: 850,
      insurance: 200,
      retirement: 425,
    },
    netSalary: 6108.33,
  };

  const paymentHistory = [
    { month: "December 2024", amount: "$6,108.33", status: "Pending", date: "Dec 31, 2024" },
    { month: "November 2024", amount: "$6,108.33", status: "Paid", date: "Nov 30, 2024" },
    { month: "October 2024", amount: "$6,958.33", status: "Paid", date: "Oct 31, 2024" },
    { month: "September 2024", amount: "$6,108.33", status: "Paid", date: "Sep 30, 2024" },
    { month: "August 2024", amount: "$6,108.33", status: "Paid", date: "Aug 31, 2024" },
  ];

  if (userRole === "admin") {
    return (
      <DashboardLayout userRole="admin" userName={userName || "Admin"}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Payroll Management</h1>
              <p className="text-muted-foreground">Manage employee salaries and payments</p>
            </div>
            <Button variant="hero">
              <FileText className="w-4 h-4 mr-2" />
              Generate Payroll
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Payroll</p>
                  <p className="text-2xl font-bold text-foreground">$284,500</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+5.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Salary</p>
                  <p className="text-2xl font-bold text-foreground">$6,250</p>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">$42,000</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bonuses</p>
                  <p className="text-2xl font-bold text-foreground">$15,000</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Payroll */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll Activity</CardTitle>
              <CardDescription>Latest salary payments and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Base Salary</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Bonus</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Net Pay</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "John Employee", base: "$7,083", bonus: "$0", net: "$6,108", status: "Pending" },
                      { name: "Sarah Johnson", base: "$6,500", bonus: "$500", net: "$6,050", status: "Paid" },
                      { name: "Michael Chen", base: "$8,000", bonus: "$0", net: "$6,900", status: "Paid" },
                      { name: "Emily Davis", base: "$7,500", bonus: "$1,000", net: "$7,350", status: "Paid" },
                    ].map((emp, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/50">
                        <td className="p-4 font-medium text-foreground">{emp.name}</td>
                        <td className="p-4 text-foreground">{emp.base}</td>
                        <td className="p-4 text-success">{emp.bonus}</td>
                        <td className="p-4 font-semibold text-foreground">{emp.net}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            emp.status === "Paid" 
                              ? "bg-success/10 text-success" 
                              : "bg-warning/10 text-warning"
                          }`}>
                            {emp.status}
                          </span>
                        </td>
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

  return (
    <DashboardLayout userRole="employee" userName={userName || "Employee"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payroll Details</h1>
          <p className="text-muted-foreground">View your salary and payment history</p>
        </div>

        {/* Salary Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>December 2024 Salary Breakdown</CardTitle>
                <CardDescription>Your current month's salary details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Earnings */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    Earnings
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Base Salary</span>
                      <span className="font-medium text-foreground">${salaryBreakdown.baseSalary.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Allowances</span>
                      <span className="font-medium text-foreground">${salaryBreakdown.allowances.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Bonus</span>
                      <span className="font-medium text-foreground">${salaryBreakdown.bonus.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                    Deductions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Income Tax</span>
                      <span className="font-medium text-destructive">-${salaryBreakdown.deductions.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Health Insurance</span>
                      <span className="font-medium text-destructive">-${salaryBreakdown.deductions.insurance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Retirement (401k)</span>
                      <span className="font-medium text-destructive">-${salaryBreakdown.deductions.retirement.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="p-5 rounded-xl gradient-hero text-primary-foreground">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-primary-foreground/80">Net Salary</p>
                      <p className="text-3xl font-bold">${salaryBreakdown.netSalary.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-10 h-10 opacity-50" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Annual Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Summary</CardTitle>
              <CardDescription>Year 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-success">$73,298.00</p>
              </div>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-2xl font-bold text-destructive">$17,700.00</p>
              </div>
              <div className="p-4 rounded-xl gradient-accent">
                <p className="text-sm text-accent-foreground/80">Net Received</p>
                <p className="text-2xl font-bold text-accent-foreground">$55,598.00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent salary payments</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{payment.month}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-foreground">{payment.amount}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "Paid" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {payment.status}
                    </span>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
