import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle2, AlertCircle, TrendingUp, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const ATSChecker = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [fileName, setFileName] = useState("");
  const [atsScore, setAtsScore] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFileName(file.name);
      analyzeResume();
    }
  };

  const analyzeResume = () => {
    setIsAnalyzing(true);
    toast.info("Analyzing your resume...");
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70;
      setAtsScore(score);
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const resetAnalysis = () => {
    setIsAnalyzed(false);
    setFileName("");
    setAtsScore(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const strengths = [
    { title: "Strong Keyword Match", score: 92, description: "Your resume contains 92% of the job-relevant keywords" },
    { title: "Clear Section Headers", score: 95, description: "Well-organized with standard ATS-friendly section headers" },
    { title: "Consistent Formatting", score: 88, description: "Clean, consistent formatting throughout the document" },
    { title: "Quantifiable Achievements", score: 85, description: "Good use of metrics and numbers to demonstrate impact" },
  ];

  const weakpoints = [
    {
      title: "Missing Keywords",
      impact: "High",
      description: "Add keywords: 'Agile', 'Scrum', 'CI/CD' to match job requirements",
      action: "Include these in your experience section",
    },
    {
      title: "Generic Summary",
      impact: "Medium",
      description: "Professional summary lacks role-specific keywords",
      action: "Customize summary for target role",
    },
    {
      title: "Limited Action Verbs",
      impact: "Medium",
      description: "Repetitive use of 'Worked on' and 'Responsible for'",
      action: "Use stronger verbs like 'Led', 'Implemented', 'Optimized'",
    },
  ];

  const improvements = [
    {
      title: "Add Technical Skills Section",
      priority: "High",
      impact: "+15 points",
      description: "Create a dedicated skills section with relevant technologies",
    },
    {
      title: "Include Certifications",
      priority: "High",
      impact: "+12 points",
      description: "List relevant certifications with dates and issuing organizations",
    },
    {
      title: "Optimize File Format",
      priority: "Medium",
      impact: "+8 points",
      description: "Save as .docx instead of .pdf for better ATS compatibility",
    },
    {
      title: "Add LinkedIn Profile",
      priority: "Medium",
      impact: "+5 points",
      description: "Include your LinkedIn URL in the contact information",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">ATS Checker</h1>
        <p className="text-muted-foreground">Analyze your resume and get detailed feedback</p>
      </div>

      {!isAnalyzed ? (
        <Card className="border-2 border-border">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-16 w-16 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Upload Your Resume</h2>
                <p className="text-muted-foreground mb-6">Get instant ATS analysis with strengths and improvements</p>
              </div>
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isAnalyzing}
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Button
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                  disabled={isAnalyzing}
                  type="button"
                  asChild
                >
                  <span>
                    <Upload className="h-5 w-5 mr-2" />
                    {isAnalyzing ? "Analyzing..." : "Choose File"}
                  </span>
                </Button>
              </label>
              <p className="text-sm text-muted-foreground">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-2 border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{fileName}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">ATS Compatibility Score</h2>
                </div>
                <Button onClick={resetAnalysis} variant="outline">
                  Analyze New Resume
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <div className="relative h-40 w-40">
                  <svg className="transform -rotate-90" width="160" height="160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - atsScore / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className={`text-4xl font-bold ${getScoreColor(atsScore)}`}>{atsScore}%</span>
                    <span className="text-sm text-muted-foreground">Score</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Compatibility</span>
                    <span className={`text-sm font-semibold ${getScoreColor(atsScore)}`}>
                      {atsScore >= 80 ? "Excellent" : atsScore >= 60 ? "Good" : "Needs Improvement"}
                    </span>
                  </div>
                  <Progress value={atsScore} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-4">
                    {atsScore >= 80
                      ? "Your resume is well-optimized for ATS systems. Minor improvements can make it even better."
                      : atsScore >= 60
                      ? "Your resume is decent but has room for improvement. Follow the recommendations below."
                      : "Your resume needs significant improvements to pass ATS screening effectively."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="strengths" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="weakpoints">Weak Points</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {strengths.map((strength, index) => (
                  <Card key={index} className="border-2 border-success/30 bg-success/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{strength.title}</h3>
                            <Badge className="bg-success/20 text-success border-success/50">
                              {strength.score}%
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{strength.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="weakpoints" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {weakpoints.map((weak, index) => (
                  <Card key={index} className="border-2 border-warning/30 bg-warning/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="h-6 w-6 text-warning" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{weak.title}</h3>
                            <Badge
                              className={
                                weak.impact === "High"
                                  ? "bg-destructive/20 text-destructive border-destructive/50"
                                  : "bg-warning/20 text-warning border-warning/50"
                              }
                            >
                              {weak.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{weak.description}</p>
                          <div className="flex items-start gap-2 mt-3 p-3 bg-background/50 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Action Item:</p>
                              <p className="text-sm text-muted-foreground">{weak.action}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {improvements.map((improvement, index) => (
                  <Card key={index} className="border-2 border-primary/30 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{improvement.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  improvement.priority === "High"
                                    ? "bg-destructive/20 text-destructive border-destructive/50"
                                    : "bg-warning/20 text-warning border-warning/50"
                                }
                              >
                                {improvement.priority} Priority
                              </Badge>
                              <Badge className="bg-primary/20 text-primary border-primary/50">
                                {improvement.impact}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{improvement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ATSChecker;
