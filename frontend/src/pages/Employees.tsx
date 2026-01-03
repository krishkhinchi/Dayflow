import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Plane,
  Settings
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "present" | "on-leave" | "absent";
  avatar?: string;
}

const Employees = () => {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const employees: Employee[] = [
    { id: "EMP-001", name: "John Employee", email: "john@company.com", phone: "+1 555-0101", department: "Engineering", position: "Senior Developer", status: "present" },
    { id: "EMP-002", name: "Sarah Johnson", email: "sarah@company.com", phone: "+1 555-0102", department: "Design", position: "UI/UX Designer", status: "present" },
    { id: "EMP-003", name: "Michael Chen", email: "michael@company.com", phone: "+1 555-0103", department: "Engineering", position: "Backend Developer", status: "on-leave" },
    { id: "EMP-004", name: "Emily Davis", email: "emily@company.com", phone: "+1 555-0104", department: "Marketing", position: "Marketing Manager", status: "present" },
    { id: "EMP-005", name: "David Wilson", email: "david@company.com", phone: "+1 555-0105", department: "Sales", position: "Sales Lead", status: "present" },
    { id: "EMP-006", name: "Lisa Anderson", email: "lisa@company.com", phone: "+1 555-0106", department: "HR", position: "HR Specialist", status: "absent" },
    { id: "EMP-007", name: "Robert Brown", email: "robert@company.com", phone: "+1 555-0107", department: "Engineering", position: "DevOps Engineer", status: "present" },
    { id: "EMP-008", name: "Jennifer White", email: "jennifer@company.com", phone: "+1 555-0108", department: "Finance", position: "Accountant", status: "present" },
  ];

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "present":
        return (
          <div className="w-3 h-3 rounded-full bg-success" title="Present" />
        );
      case "on-leave":
        return (
          <div className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center" title="On Leave">
            <Plane className="w-3 h-3 text-info" />
          </div>
        );
      case "absent":
        return (
          <div className="w-3 h-3 rounded-full bg-warning" title="Absent" />
        );
      default:
        return null;
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmployeeClick = (employeeId: string) => {
    // Navigate to profile page in view-only mode
    navigate(`/profile?id=${employeeId}&mode=view`);
  };

  return (
    <DashboardLayout userRole="admin" userName={userName || "Admin"}>
      <div className="space-y-6">
        {/* Header with NEW button and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            NEW
          </Button>
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredEmployees.map((employee) => (
            <Card 
              key={employee.id} 
              className="hover:shadow-elevated transition-all duration-300 cursor-pointer group"
              onClick={() => handleEmployeeClick(employee.id)}
            >
              <CardContent className="p-4 relative">
                {/* Status Indicator in top-right corner */}
                <div className="absolute top-3 right-3">
                  {getStatusIndicator(employee.status)}
                </div>

                {/* Employee Avatar and Info */}
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-3">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                      {employee.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {employee.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{employee.id}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settings Link */}
        <div className="pt-4 border-t border-border">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
