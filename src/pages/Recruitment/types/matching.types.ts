
export interface JobCriteria {
  id?: string;
  company: string;
  role: string;
  experience: number;
  location: string;
  description?: string;
  skills: string[];
  weights: {
    skillMatch: number;
    experience: number;
    projectQuality: number;
  };
  createdAt?: Date;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  cgpa: number;
  skills: string[];
  experience: number;
  projects: Project[];
  resume?: string;
  phssScore?: number;
  avatar?: string;
  bio?: string; // ⭐ ADD THIS for better SBERT matching
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  duration?: string;
  link?: string;
}

export interface MatchResult {
  candidateId: string;
  candidate: CandidateProfile;
  overallScore: number;
  breakdown: {
    skillScore: number;
    experienceScore: number;
    projectScore: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  aiInsights?: string;
  rank?: number;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  semanticSimilarity?: number; // ⭐ NEW: 0-100 score from SBERT
}

export interface MatchRequest {
  jobCriteria: JobCriteria;
  candidateIds?: string[];
}

export interface MatchResponse {
  success?: boolean;
  jobId: string;
  results: MatchResult[];
  totalCandidates: number;
  executionTime: number;
  timestamp: string | Date;
  criteria?: JobCriteria; // ⭐ ADD THIS
}

export interface MatchStatus {
  status: 'idle' | 'calculating' | 'success' | 'error';
  progress: number;
  message: string;
  currentCandidate?: number;
  totalCandidates?: number;
}