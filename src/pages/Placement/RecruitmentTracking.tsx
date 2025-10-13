import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Users, Trash2 } from "lucide-react";
import { AddRecruitmentDialog } from "@/components/Placement/AddRecruitmentDialog";

interface CompanyRound {
  id: string;
  company_name: string;
  job_role: string;
  current_stage: string;
  stages: any[];
  total_applicants: number;
  students_qualified: any[];
}

const STAGES = [
  "Application Screening",
  "First OA",
  "HR Interview",
  "Offer Letter"
];

export default function RecruitmentTracking() {
  const [rounds, setRounds] = useState<CompanyRound[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRounds();

    const channel = supabase
      .channel('rounds-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'company_rounds' }, () => {
        fetchRounds();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRounds = async () => {
    try {
      const { data, error } = await supabase
        .from('company_rounds')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRounds((data || []) as CompanyRound[]);
    } catch (error: any) {
      toast.error(`Failed to fetch recruitment rounds: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRoundAdded = async (newRound: any) => {
    try {
      const { error } = await supabase.from('company_rounds').insert({
        company_name: newRound.company_name,
        job_role: newRound.job_role,
        total_applicants: newRound.total_applicants,
        current_stage: 'Application Screening',
        stages: [],
        students_qualified: []
      });

      if (error) throw error;
      toast.success("Recruitment round added successfully!");
      fetchRounds();
    } catch (error: any) {
      toast.error(`Failed to add round: ${error.message}`);
    }
  };

  const handleStageUpdate = async (roundId: string, newStage: string) => {
    try {
      const { error } = await supabase
        .from('company_rounds')
        .update({ current_stage: newStage })
        .eq('id', roundId);

      if (error) throw error;
      toast.success("Stage updated successfully");
      fetchRounds();
    } catch (error: any) {
      toast.error(`Failed to update stage: ${error.message}`);
    }
  };

  const handleDeleteRound = async (roundId: string) => {
    try {
      const { error } = await supabase
        .from('company_rounds')
        .delete()
        .eq('id', roundId);

      if (error) throw error;
      toast.success("Round deleted successfully!");
      fetchRounds();
    } catch (error: any) {
      toast.error(`Failed to delete round: ${error.message}`);
    }
  };

  const getStageIndex = (stage: string) => STAGES.indexOf(stage);
  const getProgressPercentage = (stage: string) => 
    ((getStageIndex(stage) + 1) / STAGES.length) * 100;

  return (
    <div className="p-8">
      <PageHeader
        title="Recruitment Tracking"
        description="Track company recruitment rounds and stages"
        actions={<AddRecruitmentDialog onRoundAdded={handleRoundAdded} />}
      />

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : rounds.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No recruitment rounds in progress</p>
          </Card>
        ) : (
          rounds.map((round) => (
            <Card key={round.id} className="p-6 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => handleDeleteRound(round.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>

              <div className="flex justify-between items-start mb-4 pr-12">
                <div>
                  <h3 className="text-xl font-semibold">{round.company_name}</h3>
                  <p className="text-muted-foreground">{round.job_role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
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
                  const currentIndex = getStageIndex(round.current_stage);
                  const isActive = index === currentIndex;
                  const isCompleted = index < currentIndex;
                  
                  return (
                    <div key={stage} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                      <Checkbox
                        checked={isCompleted || isActive}
                        onCheckedChange={() => handleStageUpdate(round.id, stage)}
                        className="h-5 w-5"
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {stage}
                        </p>
                      </div>
                      <Badge variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}>
                        {isActive ? "In Progress" : isCompleted ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              {round.students_qualified.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">
                    Qualified Students: {round.students_qualified.length}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {round.students_qualified.slice(0, 5).map((student: any, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {student.name || `Student ${idx + 1}`}
                      </Badge>
                    ))}
                    {round.students_qualified.length > 5 && (
                      <Badge variant="outline">
                        +{round.students_qualified.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
