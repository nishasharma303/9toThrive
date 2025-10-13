// src/services/candidateService.ts

import { api } from './api';
import { CandidateProfile } from '@/pages/Recruitment/types/matching.types';

export class CandidateService {
  static async getCandidates(filters?: {
    college?: string;
    branch?: string;
    minCgpa?: number;
  }): Promise<CandidateProfile[]> {
    const queryParams = new URLSearchParams(filters as any).toString();
    return api.get<CandidateProfile[]>(
      `/candidates${queryParams ? `?${queryParams}` : ''}`
    );
  }

  static async getCandidateById(id: string): Promise<CandidateProfile> {
    return api.get<CandidateProfile>(`/candidates/${id}`);
  }

  static async getAppliedCandidates(jobId: string): Promise<CandidateProfile[]> {
    return api.get<CandidateProfile[]>(`/candidates/applied/${jobId}`);
  }
}