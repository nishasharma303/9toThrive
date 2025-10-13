import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Eye } from "lucide-react";
import { useJobs } from "@/contexts/JobContext";

const AppliedJobs = () => {
  const { appliedJobs } = useJobs();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Interview: "bg-accent/20 text-accent border-accent/50",
      Applied: "bg-primary/20 text-primary border-primary/50",
      Rejected: "bg-destructive/20 text-destructive border-destructive/50",
      Shortlisted: "bg-success/20 text-success border-success/50",
    };
    return variants[status] || "bg-muted";
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Applied Jobs</h1>
        <p className="text-muted-foreground">Track all your job applications in one place</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {appliedJobs.map((app, index) => (
            <Card key={index} className="border-2 border-border hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{app.location}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{app.title}</h3>
                    <p className="text-muted-foreground">{app.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusBadge(app.status || "Applied")}>
                      {app.status || "Applied"}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{app.appliedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Match Score:</span>
                    <span className="text-lg font-bold text-primary">{app.match}%</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="applied" className="space-y-4 mt-6">
          {appliedJobs
            .filter((app) => app.status === "Applied")
            .map((app, index) => (
              <Card key={index} className="border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{app.title}</h3>
                  <p className="text-muted-foreground">{app.company}</p>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="interview" className="space-y-4 mt-6">
          {appliedJobs
            .filter((app) => app.status === "Interview")
            .map((app, index) => (
              <Card key={index} className="border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{app.title}</h3>
                  <p className="text-muted-foreground">{app.company}</p>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="shortlisted" className="space-y-4 mt-6">
          {appliedJobs
            .filter((app) => app.status === "Shortlisted")
            .map((app, index) => (
              <Card key={index} className="border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{app.title}</h3>
                  <p className="text-muted-foreground">{app.company}</p>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppliedJobs;
