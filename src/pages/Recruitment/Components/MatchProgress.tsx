// src/components/Recruitment/MatchProgress.tsx

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface MatchProgressProps {
  status: {
    status: 'idle' | 'calculating' | 'success' | 'error';
    message: string;
    progress?: number;
    currentCandidate?: number;
    totalCandidates?: number;
  };
}

export function MatchProgress({ status }: MatchProgressProps) {
  if (status.status !== 'calculating') {
    return null;
  }

  const progress = status.progress || 0;

  return (
    <Card className="p-6 bg-gradient-card shadow-card border-border">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              {status.message}
            </h3>
            {status.currentCandidate !== undefined && status.totalCandidates !== undefined && (
              <p className="text-xs text-muted-foreground mt-1">
                Analyzing candidate {status.currentCandidate} of {status.totalCandidates}
              </p>
            )}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="text-xs text-muted-foreground text-center">
          {progress}% Complete
        </div>
      </div>
    </Card>
  );
}