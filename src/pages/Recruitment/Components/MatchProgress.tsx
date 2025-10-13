// src/components/Recruitment/MatchProgress.tsx

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Sparkles } from "lucide-react";
import { MatchStatus } from "@/pages/Recruitment/types/matching.types";

interface MatchProgressProps {
  status: MatchStatus;
}

export function MatchProgress({ status }: MatchProgressProps) {
  return (
    <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">
                AI Matching in Progress
              </h3>
              <p className="text-sm text-muted-foreground">{status.message}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {status.progress}%
            </div>
            {status.currentCandidate && status.totalCandidates && (
              <div className="text-xs text-muted-foreground">
                {status.currentCandidate} / {status.totalCandidates} candidates
              </div>
            )}
          </div>
        </div>

        <Progress value={status.progress} className="h-2" />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3" />
          <span>
            Using semantic analysis and skill matching algorithms...
          </span>
        </div>
      </div>
    </Card>
  );
}