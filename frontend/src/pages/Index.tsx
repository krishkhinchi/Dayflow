import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  CalendarCheck, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  BarChart3,
  Zap
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Employee Management",
      description: "Complete employee profiles with documents, job details, and salary information.",
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Attendance Tracking",
      description: "Real-time check-in/out with daily and weekly attendance views.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Leave Management",
      description: "Streamlined leave requests with instant approval workflows.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Role-Based Access",
      description: "Secure access control for admins, HR officers, and employees.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Payroll Visibility",
      description: "Clear salary structures and payment history for transparency.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Approvals",
      description: "Quick approval workflows that keep your team moving forward.",
    },
  ];

  const benefits = [
    "Reduce manual HR processes by 80%",
    "Real-time attendance insights",
    "Secure employee data management",
    "Mobile-friendly interface",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <Zap className="w-4 h-4" />
              <span>Streamline your HR operations</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Every workday,{" "}
              <span className="text-gradient-hero">perfectly aligned</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
              Dayflow is the modern HRMS that simplifies employee management, attendance tracking, 
              and leave approvals — all in one beautiful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 animate-fade-up" style={{ animationDelay: "400ms" }}>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative animate-fade-up" style={{ animationDelay: "500ms" }}>
            <div className="absolute inset-0 gradient-hero opacity-10 blur-3xl rounded-full" />
            <div className="relative bg-card rounded-2xl shadow-floating border border-border overflow-hidden">
              <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-secondary rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg gradient-hero mb-4" />
                  <div className="h-4 bg-muted rounded w-24 mb-2" />
                  <div className="h-8 bg-muted rounded w-16" />
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg gradient-accent mb-4" />
                  <div className="h-4 bg-muted rounded w-20 mb-2" />
                  <div className="h-8 bg-muted rounded w-12" />
                </div>
                <div className="bg-secondary rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-success mb-4" />
                  <div className="h-4 bg-muted rounded w-28 mb-2" />
                  <div className="h-8 bg-muted rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to manage HR
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your human resource operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-transparent hover:border-primary/20 group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="gradient-hero rounded-3xl p-12 text-center shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to transform your HR?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of companies using Dayflow to streamline their HR operations.
            </p>
            <Link to="/auth?mode=signup">
              <Button variant="accent" size="xl">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Dayflow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Dayflow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
