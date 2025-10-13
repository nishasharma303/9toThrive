import { PageHeader } from "@/components/layout/PageHeaderRec";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/Recruitment/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, UserCheck, TrendingUp, Clock, Plus, FileText } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const stats = [
  { title: "Active Job Posts", value: 24, icon: Briefcase, trend: { value: 12, isPositive: true } },
  { title: "Total Applicants", value: 1847, icon: Users, trend: { value: 8, isPositive: true } },
  { title: "Shortlisted Candidates", value: 342, icon: UserCheck, trend: { value: 15, isPositive: true } },
  { title: "Avg. Match Accuracy", value: "87%", icon: TrendingUp, description: "AI Match Score" },
  { title: "Time-to-Hire", value: "14 Days", icon: Clock, trend: { value: 3, isPositive: false } },
];

const candidateSourceData = [
  { name: "Job Boards", value: 35, color: "#e25c28" },
  { name: "College Networks", value: 28, color: "#f49d6e" },
  { name: "Referrals", value: 20, color: "#3b82f6" },
  { name: "Direct Apply", value: 17, color: "#8b5cf6" },
];

const monthlyApplications = [
  { month: "Jan", applications: 120 },
  { month: "Feb", applications: 145 },
  { month: "Mar", applications: 178 },
  { month: "Apr", applications: 210 },
  { month: "May", applications: 198 },
  { month: "Jun", applications: 234 },
];

export default function DashboardRec() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your recruitment pipeline and key metrics"
        actions={
          <>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Job
            </Button>
          </>
        }
      />

      <div className="flex justify-end mb-4">
        <Link to="/">
          <Button variant="ghost">Back to Home</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Candidate Source Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={candidateSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {candidateSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Applications Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="applications" fill="#e25c28" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}