import { PageHeader } from "@/components/layout/PageHeaderRec";
import { DataTable } from "@/components/Recruitment/Table";
import { FilterBar } from "@/components/Recruitment/Bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  Eye,
  UserPlus,
  X,
  Download,
  RefreshCw,
  TrendingUp,
  Award,
  Info,
  Filter,
  FileText,
  Clock,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { localMatchingService } from "@/pages/Recruitment/Services/localMatchingService";
import { MatchResult, MatchResponse } from "@/pages/Recruitment/types/matching.types";
import { useToast } from "@/hooks/use-toast";
import { mockCandidates } from "@/pages/Recruitment/data/mockCandidates";

export default function CandidateMatching() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [matchData, setMatchData] = useState<MatchResponse | null>(null);
  const [filteredResults, setFilteredResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    college: "all",
    matchFit: "all",
    status: "all",
    search: "",
  });

  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (jobId) {
      loadMatchResults(jobId);
    } else {
      // Try to load latest results if no jobId
      const latestResults = localMatchingService.getLatestResults();
      if (latestResults) {
        setMatchData(latestResults);
        setFilteredResults(latestResults.results);
        toast({
          title: "Loaded Latest Results",
          description: "Showing your most recent match calculation",
        });
      } else {
        // No saved results — show all mock candidates as default view
        const allAsResults = mockCandidates.map((c, idx) => ({
          candidateId: String(c.id),
          candidate: c,
          overallScore: c.phssScore || 0,
          matchedSkills: c.skills || [],
          missingSkills: [],
          status: 'new' as const,
          rank: idx + 1,
          breakdown: {
            skillScore: c.phssScore || 0,
            experienceScore: Math.min(100, (c.experience || 0) * 10),
            projectScore: 50,
          },
        }));

        setFilteredResults(allAsResults as MatchResult[]);
        toast({
          title: "Showing All Candidates",
          description: "No previous match calculations found — displaying full candidate list",
        });
      }
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (matchData) {
      applyFilters();
    }
  }, [filters, matchData]);

  // Merge accepted candidates saved from QuickHire into the filtered results
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("acceptedCandidates") || "[]");
      if (stored && Array.isArray(stored) && stored.length > 0) {
        // map to minimal MatchResult objects
        const acceptedDetails: MatchResult[] = stored
          .map((id: number | string) => {
            const c = mockCandidates.find((m) => Number(m.id) === Number(id));
            if (!c) return null;
            const res: any = {
              candidateId: String(c.id),
              candidate: c,
              overallScore: c.phssScore || 0,
              matchedSkills: c.skills || [],
              missingSkills: [],
              status: "shortlisted",
              rank: null,
              breakdown: {
                skillScore: c.phssScore || 0,
                experienceScore: Math.min(100, (c.experience || 0) * 10),
                projectScore: 50,
              },
            } as MatchResult;
            return res;
          })
          .filter(Boolean) as MatchResult[];

        if (acceptedDetails.length > 0) {
          setFilteredResults((prev) => {
            // dedupe by candidateId
            const ids = new Set(prev.map((r) => r.candidateId));
            const toAdd = acceptedDetails.filter((r) => !ids.has(r.candidateId));
            return [...toAdd, ...prev];
          });
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const loadMatchResults = async (jobId: string) => {
    setLoading(true);
    try {
      const response = localMatchingService.getMatchResults(jobId);
      if (response) {
        setMatchData(response);
        setFilteredResults(response.results);
        toast({
          title: "Results Loaded",
          description: `Showing matches for Job ID: ${jobId}`,
        });
      } else {
        toast({
          title: "Results Not Found",
          description: "No matching results found for this job ID",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to Load Results",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (!matchData) return;

    let results = [...matchData.results];

    // College filter
    if (filters.college !== "all") {
      results = results.filter((r) =>
        r.candidate.college.toLowerCase().includes(filters.college.toLowerCase())
      );
    }

    // Match fit filter with new thresholds
    if (filters.matchFit !== "all") {
      const ranges = {
        high: [80, 100], // 80%+
        good: [70, 79],  // 70–79%
        fair: [60, 69],  // 60–69%
        low: [0, 59],    // below 60%
      };
      const [min, max] = ranges[filters.matchFit as keyof typeof ranges];
      results = results.filter(
        (r) => r.overallScore >= min && r.overallScore <= max
      );
    }

    // Status filter
    if (filters.status !== "all") {
      results = results.filter((r) => r.status === filters.status);
    }

    // Search filter
    if (filters.search.trim()) {
      const search = filters.search.toLowerCase();
      results = results.filter(
        (r) =>
          r.candidate.name.toLowerCase().includes(search) ||
          r.candidate.email.toLowerCase().includes(search) ||
          r.candidate.college.toLowerCase().includes(search) ||
          r.matchedSkills.some((s) => s.toLowerCase().includes(search)) ||
          r.missingSkills.some((s) => s.toLowerCase().includes(search))
      );
    }

    setFilteredResults(results);
  };

  const handleStatusUpdate = (
    candidateId: string,
    newStatus: MatchResult["status"]
  ) => {
    if (!matchData) return;

    try {
      localMatchingService.updateCandidateStatus(
        matchData.jobId,
        candidateId,
        newStatus
      );

      // Update local state
      setMatchData((prev) => {
        if (!prev) return prev;
        const updatedResults = prev.results.map((r) =>
          r.candidateId === candidateId ? { ...r, status: newStatus } : r
        );
        return {
          ...prev,
          results: updatedResults,
        };
      });

      toast({
        title: "Status Updated",
        description: `Candidate marked as ${newStatus}`,
      });

      // Re-apply filters after state update
      setTimeout(() => applyFilters(), 0);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleBulkAction = (action: MatchResult["status"]) => {
    if (!matchData) return;

    const topCandidates = filteredResults
      .filter((r) => r.overallScore >= 80)
      .slice(0, 5);

    if (topCandidates.length === 0) {
      toast({
        title: "No Candidates Found",
        description: "No candidates with 80%+ match score",
        variant: "destructive",
      });
      return;
    }

    topCandidates.forEach((candidate) => {
      handleStatusUpdate(candidate.candidateId, action);
    });

    toast({
      title: "Bulk Action Complete",
      description: `${topCandidates.length} candidate(s) marked as ${action}`,
    });
  };

  // Export only rejected candidates with all details + reason (AI insights)
  const handleExport = () => {
    if (!matchData) return;

    try {
      const rejectedResults = filteredResults.filter(
        (r) => r.status === "rejected"
      );

      if (rejectedResults.length === 0) {
        toast({
          title: "No Rejected Candidates",
          description: "There are no rejected candidates to export",
          variant: "destructive",
        });
        return;
      }

      const headers = [
        "Rank",
        "Name",
        "Email",
        "College",
        "Branch",
        "CGPA",
        "Overall Score",
        "Skill Score",
        "Experience Score",
        "Project Score",
        "Matched Skills",
        "Missing Skills",
        "Experience (Years)",
        "Number of Projects",
        "Status",
        "Reason", // AI insights / reason
      ];

      const rows = rejectedResults.map((result) => [
        result.rank || "-",
        result.candidate.name,
        result.candidate.email,
        result.candidate.college,
        result.candidate.branch || "-",
        result.candidate.cgpa?.toFixed(2) || "-",
        `${result.overallScore}%`,
        `${result.breakdown.skillScore}%`,
        `${result.breakdown.experienceScore}%`,
        `${result.breakdown.projectScore}%`,
        result.matchedSkills.join("; "),
        result.missingSkills.join("; "),
        result.candidate.experience || 0,
        result.candidate.projects?.length || 0,
        result.status,
        result.aiInsights || "-", // reason
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      const bom = "\uFEFF";
      const blob = new Blob([bom + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `candidates-rejected-${matchData.jobId}-${new Date()
        .toISOString()
        .split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Exported ${rejectedResults.length} rejected candidate(s) to CSV`,
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Updated score-to-color mapping:
  // >=80 green, >=70 blue, >=60 amber, else red
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-blue-600 dark:text-blue-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  // ✅ FIX: Get initials for professional avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ✅ FIX: Get color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-teal-600",
      "bg-orange-600",
      "bg-cyan-600",
      "bg-rose-600",
      "bg-violet-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const columns = [
    {
      header: "Rank",
      accessor: "rank",
      cell: (value: number) => (
        <div className="flex items-center gap-2">
          {value <= 3 && (
            <Award
              className={`w-4 h-4 ${
                value === 1
                  ? "text-yellow-500"
                  : value === 2
                  ? "text-gray-400"
                  : "text-amber-600"
              }`}
            />
          )}
          <span className="font-semibold">#{value}</span>
        </div>
      ),
    },
    {
      header: "Candidate",
      accessor: "candidate",
      cell: (candidate: MatchResult["candidate"]) => (
        <div className="flex items-center gap-3">
          {/* ✅ FIX: Professional initials avatar instead of cartoon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${getAvatarColor(
              candidate.name
            )}`}
          >
            {getInitials(candidate.name)}
          </div>
          <div>
            <div className="font-semibold text-foreground">
              {candidate.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {candidate.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "College & Branch",
      accessor: "candidate.college",
      cell: (_value: string, row: MatchResult) => (
        <div>
          <div className="font-medium text-sm">{row.candidate.college}</div>
          <div className="text-xs text-muted-foreground">
            {row.candidate.branch || "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Match Score",
      accessor: "overallScore",
      cell: (value: number, row: MatchResult) => (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Progress value={value} className="w-24 h-2" />
            <span className={`text-sm font-bold ${getScoreColor(value)}`}>
              {value}%
            </span>
          </div>
          <div className="flex gap-1 text-xs text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="cursor-help">
                    S:{row.breakdown.skillScore}%
                  </span>
                </TooltipTrigger>
                <TooltipContent>Skill Match Score</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="cursor-help">
                    E:{row.breakdown.experienceScore}%
                  </span>
                </TooltipTrigger>
                <TooltipContent>Experience Score</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="cursor-help">
                    P:{row.breakdown.projectScore}%
                  </span>
                </TooltipTrigger>
                <TooltipContent>Project Score</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ),
    },
    {
      header: "Skills Match",
      accessor: "matchedSkills",
      cell: (skills: string[], row: MatchResult) => (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="outline" className="text-xs cursor-help">
                      +{skills.length - 3}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {skills.slice(3).map((skill) => (
                        <div key={skill}>{skill}</div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {row.missingSkills.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="outline"
                    className="text-xs text-amber-600 border-amber-600 cursor-help"
                  >
                    Missing: {row.missingSkills.length}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <div className="font-semibold">Missing Skills:</div>
                    {row.missingSkills.map((skill) => (
                      <div key={skill}>• {skill}</div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      ),
    },
    {
      header: "CGPA",
      accessor: "candidate.cgpa",
      cell: (_value: number, row: MatchResult) => {
        const cgpa = row.candidate.cgpa;
        
        if (cgpa === undefined || cgpa === null || isNaN(cgpa)) {
          return (
            <Badge variant="outline" className="text-muted-foreground">
              N/A
            </Badge>
          );
        }
        
        return (
          <Badge variant={cgpa >= 8 ? "default" : "secondary"}>
            {cgpa.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: string, row: MatchResult) => {
        return (
          <Select
            value={value}
            onValueChange={(newValue) =>
              handleStatusUpdate(
                row.candidateId,
                newValue as MatchResult["status"]
              )
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  New
                </div>
              </SelectItem>
              <SelectItem value="reviewed">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  Reviewed
                </div>
              </SelectItem>
              <SelectItem value="shortlisted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Shortlisted
                </div>
              </SelectItem>
              <SelectItem value="rejected">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  Rejected
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Actions",
      accessor: "candidateId",
      cell: (id: string, row: MatchResult) => (
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ FIX: Prevent event bubbling
                    navigate(`/recruitment/candidate/${id}`);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Full Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ FIX: Prevent event bubbling
                    handleStatusUpdate(id, "shortlisted");
                  }}
                  disabled={row.status === "shortlisted"}
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Shortlist Candidate</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ FIX: Prevent event bubbling
                    handleStatusUpdate(id, "rejected");
                  }}
                  disabled={row.status === "rejected"}
                >
                  <X className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject Candidate</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading match results...</p>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="p-6 md:p-8">
        <Card className="p-12 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Match Data Available</h3>
          <p className="text-muted-foreground mb-4">
            Calculate matches first to see candidate rankings and insights
          </p>
          <Button
            onClick={() => navigate("/recruitment/match-calculator")}
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Go to Match Calculator
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader
        title="AI Candidate Matching Results"
        description={`Analyzed ${matchData.totalCandidates} candidates in ${matchData.executionTime}ms`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Rejected CSV
            </Button>
            {/* ✅ FIX: Corrected navigation path if needed */}
            <Button
              onClick={() => navigate("/Recruitment/calculator")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              New Calculation
            </Button>
          </div>
        }
      />

      {/* Job Info Alert */}
      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">Job ID:</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                {matchData.jobId}
              </code>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                {new Date(matchData.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Summary Cards with new thresholds */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-sm text-muted-foreground">Total Candidates</div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {matchData.totalCandidates}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Analyzed & Ranked
          </p>
        </Card>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-sm text-muted-foreground">
            Good (80%+)
          </div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {matchData.results.filter((r) => r.overallScore >= 80).length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Strong candidates
          </p>
        </Card>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-sm text-muted-foreground">
            Decent (70–79%)
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {
              matchData.results.filter(
                (r) => r.overallScore >= 70 && r.overallScore < 80
              ).length
            }
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Considerable fit
          </p>
        </Card>
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-sm text-muted-foreground">Shortlisted</div>
          <div className="text-2xl font-bold text-primary mt-1">
            {matchData.results.filter((r) => r.status === "shortlisted").length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ready for interview
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Quick Actions</div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("shortlisted")}
            >
              <UserPlus className="w-3 h-3 mr-2" />
              Shortlist Top 5
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("reviewed")}
            >
              <Eye className="w-3 h-3 mr-2" />
              Mark Top 5 as Reviewed
            </Button>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <FilterBar>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Select
          value={filters.college}
          onValueChange={(v) => setFilters({ ...filters, college: v })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="College" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Colleges</SelectItem>
            <SelectItem value="iit">IIT</SelectItem>
            <SelectItem value="nit">NIT</SelectItem>
            <SelectItem value="iiit">IIIT</SelectItem>
            <SelectItem value="bits">BITS</SelectItem>
            <SelectItem value="vit">VIT</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.matchFit}
          onValueChange={(v) => setFilters({ ...filters, matchFit: v })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Match Fit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Matches</SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                80%+ (Excellent)
              </div>
            </SelectItem>
            <SelectItem value="good">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                70–79% (Good)
              </div>
            </SelectItem>
            <SelectItem value="fair">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                60–69% (Fair)
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Below 60%
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(v) => setFilters({ ...filters, status: v })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by name, email, or skill..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-[250px]"
        />

        {(filters.college !== "all" ||
          filters.matchFit !== "all" ||
          filters.status !== "all" ||
          filters.search) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters({
                college: "all",
                matchFit: "all",
                status: "all",
                search: "",
              })
            }
          >
            <X className="w-3 h-3 mr-2" />
            Clear Filters
          </Button>
        )}

        <div className="ml-auto text-sm text-muted-foreground">
          Showing {filteredResults.length} of {matchData.results.length}
        </div>
      </FilterBar>

      {/* Results Table */}
      <DataTable columns={columns} data={filteredResults} />

      {filteredResults.length === 0 && matchData.results.length > 0 && (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">No Candidates Match Filters</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters to see more results
          </p>
          <Button
            variant="outline"
            onClick={() =>
              setFilters({
                college: "all",
                matchFit: "all",
                status: "all",
                search: "",
              })
            }
          >
            Clear All Filters
          </Button>
        </Card>
      )}
    </div>
  );
}