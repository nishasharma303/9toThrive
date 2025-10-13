// src/services/matchingService.ts

import { api } from './api';
import {
  MatchRequest,
  MatchResponse,
  MatchResult,
  JobCriteria,
} from '@/pages/Recruitment/types/matching.types';

export class MatchingService {
  static async calculateMatches(
    request: MatchRequest
  ): Promise<MatchResponse> {
    return api.post<MatchResponse>('/matching/calculate', request);
  }

  static async saveJobCriteria(criteria: JobCriteria): Promise<{ id: string }> {
    return api.post('/matching/job-criteria', criteria);
  }

  static async getMatchResults(jobId: string): Promise<MatchResponse> {
    return api.get<MatchResponse>(`/matching/results/${jobId}`);
  }

  static async updateCandidateStatus(
    matchId: string,
    status: MatchResult['status']
  ): Promise<void> {
    return api.put(`/matching/status/${matchId}`, { status });
  }

  static async exportResults(jobId: string): Promise<Blob> {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/matching/export/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }
}