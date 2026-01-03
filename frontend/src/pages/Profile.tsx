import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit,
  X,
  Plus,
  Shield,
  Lock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { userRole, userName } = useAuth();
  const isViewOnly = searchParams.get("mode") === "view";
  const isAdmin = userRole === "admin";
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: userName || "User",
    loginId: "OIJODO20220001",
    email: "john.employee@company.com",
    phone: "+1 (555) 123-4567",
    company: "Odoo India",
    department: "Engineering",
    position: "Senior Developer",
    manager: "Sarah Admin",
    location: "New York, USA",
    dateOfBirth: "January 15, 1990",
    mailingAddress: "123 Main Street, New York, NY 10001",
    nationality: "United States",
    permanentRoad: "456 Oak Avenue",
    zipCode: "10001",
    gender: "Male",
    maritalStatus: "Single",
    dateOfJoining: "January 15, 2022",
    empCode: "EMP-001",
    // Bank Details
    bankName: "Chase Bank",
    accountNumber: "****4567",
    bankAcc: "1234567890",
    // Salary Info
    monthlyWage: 50000,
    yearlyWage: 600000,
    workingDaysPerWeek: 5,
    breakTime: 1,
  });

  const [skills] = useState(["React", "TypeScript", "Node.js", "Python"]);
  const [certifications] = useState(["AWS Certified", "Google Cloud Professional"]);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  // Calculate salary components
  const calculateSalaryComponents = () => {
    const wage = profileData.monthlyWage;
    const basic = wage * 0.50; // 50% of wage
    const hra = basic * 0.50; // 50% of basic
    const standardAllowance = 4966;
    const performanceBonus = wage * 0.10; // 10% of wage
    const leaveTravelAllowance = wage * 0.0833; // 8.33% of wage
    const fixedAllowance = wage - (basic + hra + standardAllowance + performanceBonus + leaveTravelAllowance);
    
    // Deductions
    const pfEmployee = basic * 0.12; // 12% of basic
    const pfEmployer = basic * 0.12; // 12% employer contribution
    const professionalTax = 200;
    
    return {
      basic: { amount: basic, percentage: 50 },
      hra: { amount: hra, percentage: (hra / wage) * 100 },
      standardAllowance: { amount: standardAllowance, percentage: (standardAllowance / wage) * 100 },
      performanceBonus: { amount: performanceBonus, percentage: 10 },
      leaveTravelAllowance: { amount: leaveTravelAllowance, percentage: 8.33 },
      fixedAllowance: { amount: Math.max(0, fixedAllowance), percentage: (Math.max(0, fixedAllowance) / wage) * 100 },
      pfEmployee: { amount: pfEmployee, percentage: 12 },
      pfEmployer: { amount: pfEmployer, percentage: 12 },
      professionalTax: { amount: professionalTax },
    };
  };

  const salaryComponents = calculateSalaryComponents();

  return (
    <DashboardLayout userRole={isAdmin ? "admin" : "employee"} userName={userName || "User"}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">My Profile</h1>
          {!isViewOnly && (
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
              size="sm"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          )}
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side - Avatar and basic info */}
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {(userName || "U").split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{userName || profileData.name}</h2>
                  <p className="text-sm text-muted-foreground">Login ID: {profileData.loginId}</p>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                </div>
              </div>
              
              {/* Right side - Company info */}
              <div className="md:ml-auto grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Company:</span>
                  <span className="ml-2 text-foreground">{profileData.company}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <span className="ml-2 text-foreground">{profileData.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Position:</span>
                  <span className="ml-2 text-foreground">{profileData.position}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Manager:</span>
                  <span className="ml-2 text-foreground">{profileData.manager}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2 text-foreground">{profileData.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="resume" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="private">Private Info</TabsTrigger>
            <TabsTrigger value="salary">Salary Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write something about yourself..."
                    className="min-h-[120px]"
                    disabled={!isEditing}
                    defaultValue="Lorem ipsum is simply dummy text of the printing and typesetting industry."
                  />
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-foreground mb-2">What I love about my job</h4>
                    <Textarea
                      placeholder="What do you love about your job..."
                      className="min-h-[100px]"
                      disabled={!isEditing}
                      defaultValue="Building innovative solutions and working with a great team."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Certifications */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-3 py-1 border border-dashed border-border rounded-full text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center gap-1">
                          <Plus className="w-3 h-3" />
                          Add Skill
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-foreground">{cert}</span>
                        </div>
                      ))}
                      {isEditing && (
                        <button className="w-full p-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1">
                          <Plus className="w-3 h-3" />
                          Add Certification
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Private Info Tab */}
          <TabsContent value="private">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Date of Birth</Label>
                      <p className="text-foreground">{profileData.dateOfBirth}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Gender</Label>
                      <p className="text-foreground">{profileData.gender}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Marital Status</Label>
                      <p className="text-foreground">{profileData.maritalStatus}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Nationality</Label>
                      <p className="text-foreground">{profileData.nationality}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Date of Joining</Label>
                      <p className="text-foreground">{profileData.dateOfJoining}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Emp Code</Label>
                      <p className="text-foreground">{profileData.empCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground text-xs">Bank Name</Label>
                      <p className="text-foreground">{profileData.bankName}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Account Number</Label>
                      <p className="text-foreground">{profileData.accountNumber}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Mailing Address</Label>
                      <p className="text-foreground">{profileData.mailingAddress}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">ZIP Code</Label>
                      <p className="text-foreground">{profileData.zipCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Salary Info Tab */}
          <TabsContent value="salary">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Salary Information</CardTitle>
                <CardDescription>Your salary breakdown and components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Wage Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Wage</Label>
                    <p className="text-2xl font-bold text-foreground">${profileData.monthlyWage.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Yearly Wage</Label>
                    <p className="text-2xl font-bold text-foreground">${profileData.yearlyWage.toLocaleString()}</p>
                  </div>
                </div>

                {/* Salary Structure */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-medium text-foreground mb-4">Salary Structure</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Basic ({salaryComponents.basic.percentage}%)</span>
                      <span className="font-medium text-foreground">${salaryComponents.basic.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">HRA</span>
                      <span className="font-medium text-foreground">${salaryComponents.hra.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground">Performance Bonus</span>
                      <span className="font-medium text-foreground">${salaryComponents.performanceBonus.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div>
                    <p className="font-medium text-foreground">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end">
            <Button onClick={handleSave} variant="hero">
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
