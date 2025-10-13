import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { FileText, Target, Users, TrendingUp } from "lucide-react";

const Stats = () => {
  const skillsData = [
    { skill: "React.js", proficiency: 85 },
    { skill: "Python", proficiency: 78 },
    { skill: "JavaScript", proficiency: 90 },
    { skill: "Machine Learning", proficiency: 72 },
  ];

  const applicationTimelineData = [
    { month: "Jan", applications: 3 },
    { month: "Feb", applications: 7 },
    { month: "Mar", applications: 5 },
    { month: "Apr", applications: 9 },
  ];

  const topCompanies = [
    { name: "Tech Corp", applications: 3 },
    { name: "Innovate Labs", applications: 2 },
    { name: "Digital Solutions", applications: 2 },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Your Statistics</h1>
        <p className="text-muted-foreground">Detailed insights into your job search</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-2 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Match</p>
                <p className="text-3xl font-bold text-primary">87%</p>
                <p className="text-xs text-muted-foreground mt-1">Across all jobs</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-3xl font-bold text-primary">142</p>
                <p className="text-xs text-success mt-1">+12% from last week</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="text-primary">Skills Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillsData.map((skill) => (
            <div key={skill.skill}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground">{skill.skill}</span>
                <span className="text-primary font-semibold">{skill.proficiency}%</span>
              </div>
              <Progress value={skill.proficiency} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="text-primary">Application Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTimelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="text-primary">Top Companies Interested</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCompanies}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="applications" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
