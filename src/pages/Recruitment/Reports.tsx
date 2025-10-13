import { PageHeader } from "@/components/layout/PageHeaderRec";
import { StatCard } from "@/components/Recruitment/Card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Clock, Award, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { title: "Avg. Time to Shortlist", value: "3.2 Days", icon: Clock, trend: { value: 25, isPositive: false } },
  { title: "Hidden Talent Discovery", value: "34%", icon: Award, description: "SVI Metric" },
  { title: "Total Hired", value: 127, icon: Users, trend: { value: 18, isPositive: true } },
];

const topRoles = [
  { role: "Frontend Dev", hired: 24 },
  { role: "Data Scientist", hired: 18 },
  { role: "Backend Eng", hired: 22 },
  { role: "UI/UX Designer", hired: 15 },
  { role: "Product Manager", hired: 12 },
];

const skillGapData = [
  { skill: "React", demand: 85, supply: 72 },
  { skill: "Python", demand: 90, supply: 88 },
  { skill: "Java", demand: 75, supply: 65 },
  { skill: "ML/AI", demand: 95, supply: 62 },
  { skill: "DevOps", demand: 70, supply: 58 },
  { skill: "Cloud", demand: 88, supply: 70 },
];

export default function Reports() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Reports"
        description="AI insights and comprehensive hiring trends"
        actions={
          <>
            <Button variant="outline" className="mr-2">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Roles */}
        <Card className="p-6 md:p-8 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6">
            Top Performing Roles
          </h3>
          <div className="w-full h-[300px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRoles} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="role" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="hired" fill="#e25c28" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Gap Analysis */}
        <Card className="p-6 md:p-8 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6">
            Skill Gap Analysis
          </h3>
          <div className="w-full h-[300px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillGapData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar
                  name="Market Demand"
                  dataKey="demand"
                  stroke="#e25c28"
                  fill="#e25c28"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Candidate Supply"
                  dataKey="supply"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
