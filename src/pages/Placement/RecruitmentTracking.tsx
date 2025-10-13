import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

interface Job {
  id: string;
  company: string;
  role: string;
  applicants: number;
  status: "active" | "closed" | "draft";
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

interface CompanyRound {
  company_name: string;
  job_role: string;
  total_applicants: number;
  current_stage: string;
  stages: string[];
  jobs: Job[];
}

const STAGES = ["Application Screening", "First OA", "HR Interview", "Offer Letter"];

export default function RecruitmentTracking() {
  const [rounds, setRounds] = useState<CompanyRound[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobsRef = collection(db, "jobs");
    const jobsQuery = query(jobsRef, orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(jobsQuery, async (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Job[];

      // Group jobs by company and role
      const grouped: Record<string, CompanyRound> = {};
      jobsData.forEach((job) => {
        const key = `${job.company}-${job.role}`;
        if (!grouped[key]) {
          grouped[key] = {
            company_name: job.company,
            job_role: job.role,
            total_applicants: job.applicants,
            current_stage: "Application Screening", // default start stage
            stages: STAGES,
            jobs: [job],
          };
        } else {
          grouped[key].total_applicants += job.applicants;
          grouped[key].jobs.push(job);
        }
      });

      setRounds(Object.values(grouped));
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch jobs:", error);
      toast.error("Failed to fetch recruitment rounds");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStageUpdate = (round: CompanyRound, stage: string) => {
    // Update the current stage locally (timeline visualization)
    setRounds((prev) =>
      prev.map((r) =>
        r.company_name === round.company_name && r.job_role === round.job_role
          ? { ...r, current_stage: stage }
          : r
      )
    );
    toast.success(`Stage updated for ${round.company_name} (${round.job_role})`);
  };

  const handleDeleteRound = async (round: CompanyRound) => {
    try {
      // Delete all jobs for this company & role
      for (const job of round.jobs) {
        await deleteDoc(doc(db, "jobs", job.id));
      }
      toast.success(`Deleted ${round.company_name} (${round.job_role}) recruitment round`);
    } catch (error: any) {
      console.error("Failed to delete round:", error);
      toast.error(`Failed to delete round: ${error.message}`);
    }
  };

  const getStageIndex = (stage: string) => STAGES.indexOf(stage);
  const getProgressPercentage = (stage: string) => ((getStageIndex(stage) + 1) / STAGES.length) * 100;

  return (
    <div className="p-8">
      <PageHeader
        title="Recruitment Tracking"
        description="Track company recruitment rounds and stages"
      />

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : rounds.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No recruitment rounds in progress</p>
          </Card>
        ) : (
          rounds.map((round) => {
            const currentIndex = getStageIndex(round.current_stage);

            return (
              <Card key={`${round.company_name}-${round.job_role}`} className="p-6 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => handleDeleteRound(round)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>

                <div className="flex justify-between items-start mb-4 pr-12">
                  <div>
                    <h3 className="text-xl font-semibold">{round.company_name}</h3>
                    <p className="text-muted-foreground">{round.job_role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{round.total_applicants} Applicants</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Current Stage</span>
                    <Badge>{round.current_stage}</Badge>
                  </div>
                  <Progress value={getProgressPercentage(round.current_stage)} className="h-2" />
                </div>

                <div className="space-y-3 mb-4">
                  {STAGES.map((stage, index) => {
                    const isActive = index === currentIndex;
                    const isCompleted = index < currentIndex;

                    return (
                      <div
                        key={stage}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                      >
                        <Checkbox
                          checked={isCompleted || isActive}
                          onCheckedChange={() => handleStageUpdate(round, stage)}
                          className="h-5 w-5"
                        />
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isActive
                                ? "text-primary"
                                : isCompleted
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {stage}
                          </p>
                        </div>
                        <Badge
                          variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}
                        >
                          {isActive ? "In Progress" : isCompleted ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
