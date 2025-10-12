// hooks/useMatching.ts

import { useState, useCallback, useRef } from 'react';
import {
  JobCriteria,
  MatchResponse,
  CandidateProfile,
} from '@/pages/Recruitment/types/matching.types';
import { localMatchingService } from '@/pages/Recruitment/Services/localMatchingService';
import { biEncoderService } from '@/pages/Recruitment/Services/biEncoderService';
import { mockCandidates } from '@/pages/Recruitment/data/mockCandidates';
import { createGroundTruthFromResults } from '@/pages/Recruitment/ml/smartGroundTruth';

interface MatchingStatus {
  status: 'idle' | 'calculating' | 'success' | 'error';
  progress: number;
  message: string;
  currentCandidate?: number;
  totalCandidates?: number;
}

export function useMatching() {
  const [status, setStatus] = useState<MatchingStatus>({
    status: 'idle',
    progress: 0,
    message: 'Ready to calculate matches',
  });

  const [results, setResults] = useState<MatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const currentProgress = useRef(0);

  const calculateMatches = useCallback(
    async (jobCriteria: JobCriteria, candidates?: CandidateProfile[]) => {
      // Clear any existing intervals
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      currentProgress.current = 0;

      setStatus({
        status: 'calculating',
        progress: 0,
        message: 'Initializing analysis engine',
      });
      setError(null);

      // Start continuous smooth progress (never stops until we're done)
      progressInterval.current = setInterval(() => {
        currentProgress.current += 0.5; // Increment by 0.5% every 100ms
        
        // Cap at 95% until actual completion
        if (currentProgress.current >= 95) {
          currentProgress.current = 95;
        }

        setStatus(prev => ({
          ...prev,
          progress: Math.floor(currentProgress.current),
        }));
      }, 100);

      try {
        const candidatesToMatch = candidates || mockCandidates;

        // Step 1: Load models
        await new Promise(resolve => setTimeout(resolve, 300));
        setStatus(prev => ({
          ...prev,
          message: 'Loading AI models',
        }));
        
        await biEncoderService.preloadModel();

        // Step 2: Encode job
        await new Promise(resolve => setTimeout(resolve, 200));
        setStatus(prev => ({
          ...prev,
          message: 'Encoding job requirements',
        }));

        // Step 3: Analyze candidates
        await new Promise(resolve => setTimeout(resolve, 200));
        setStatus(prev => ({
          ...prev,
          message: 'Analyzing candidate profiles',
          currentCandidate: 0,
          totalCandidates: candidatesToMatch.length,
        }));

        const startTime = Date.now();
        
        const matchResults = await biEncoderService.calculateMatches(
          jobCriteria,
          candidatesToMatch
        );

        const executionTime = Date.now() - startTime;

        // Step 4: Ranking
        await new Promise(resolve => setTimeout(resolve, 150));
        setStatus(prev => ({
          ...prev,
          message: 'Ranking candidates by match score',
        }));

        // Step 5: Evaluation
        await new Promise(resolve => setTimeout(resolve, 150));
        setStatus(prev => ({
          ...prev,
          message: 'Running evaluation metrics',
        }));

        console.log('\n===== RUNNING EVALUATION =====');
        console.log(`Job Role: ${jobCriteria.role}`);
        console.log(`Total Candidates: ${candidatesToMatch.length}`);

        try {
          const rankedCandidateIds = matchResults.map(r => r.candidateId);
          const groundTruth = createGroundTruthFromResults(rankedCandidateIds, 0.3);

          console.log(`Ground Truth Created:`);
          console.log(`   - Relevant: ${groundTruth.filter(g => g.isRelevant).length}`);
          console.log(`   - Non-Relevant: ${groundTruth.filter(g => !g.isRelevant).length}`);

          const topScores = matchResults.slice(0, 10).map(r => r.overallScore);
          console.log('Top 10 Scores:', topScores.join(', '));

          await biEncoderService.evaluateModel(
            jobCriteria,
            candidatesToMatch,
            groundTruth
          );
        } catch (evalError) {
          console.error('Evaluation failed:', evalError);
        }

        // Step 6: Finalize
        await new Promise(resolve => setTimeout(resolve, 150));
        setStatus(prev => ({
          ...prev,
          message: 'Finalizing results',
        }));

        const response: MatchResponse = {
          success: true,
          jobId: `job_${Date.now()}`,
          timestamp: new Date().toISOString(),
          criteria: jobCriteria,
          results: matchResults,
          totalCandidates: matchResults.length,
          executionTime,
        };

        localMatchingService.saveMatchResults(response);
        setResults(response);

        // Now complete to 100%
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }

        // Quick animation to 100%
        const finalInterval = setInterval(() => {
          currentProgress.current += 2;
          if (currentProgress.current >= 100) {
            currentProgress.current = 100;
            clearInterval(finalInterval);
            
            setStatus({
              status: 'success',
              progress: 100,
              message: `Successfully matched ${matchResults.length} candidates`,
            });
          } else {
            setStatus(prev => ({
              ...prev,
              progress: Math.floor(currentProgress.current),
            }));
          }
        }, 50);

        return response;
      } catch (err: any) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        console.error('Matching error:', err);
        const errorMessage = err.message || 'Failed to calculate matches';
        setError(errorMessage);
        setStatus({
          status: 'error',
          progress: 0,
          message: errorMessage,
        });
        throw err;
      }
    },
    []
  );

  const reset = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    currentProgress.current = 0;
    setStatus({
      status: 'idle',
      progress: 0,
      message: 'Ready to calculate matches',
    });
    setResults(null);
    setError(null);
  }, []);

  return {
    status,
    results,
    error,
    calculateMatches,
    reset,
  };
}