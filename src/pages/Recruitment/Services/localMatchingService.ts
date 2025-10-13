// src/services/localMatchingService.ts

import { JobCriteria, CandidateProfile, MatchResult, MatchResponse } from '@/pages/Recruitment/types/matching.types';
import { mockCandidates } from '@/pages/Recruitment/data/mockCandidates';

// Simple TF-IDF-like scoring without external APIs
class LocalMatchingService {
  
  // Calculate skill match
  private calculateSkillMatch(requiredSkills: string[], candidateSkills: string[]): {
    score: number;
    matched: string[];
    missing: string[];
  } {
    const normalizedRequired = requiredSkills.map(s => s.toLowerCase().trim());
    const normalizedCandidate = candidateSkills.map(s => s.toLowerCase().trim());

    const matched: string[] = [];
    const missing: string[] = [];

    normalizedRequired.forEach(reqSkill => {
      const found = normalizedCandidate.some(candSkill => {
        // Exact match or fuzzy match
        return candSkill === reqSkill || 
               candSkill.includes(reqSkill) || 
               reqSkill.includes(candSkill) ||
               this.areSimilarSkills(reqSkill, candSkill);
      });

      if (found) {
        // Find original case skill name
        const originalSkill = requiredSkills.find(s => s.toLowerCase().trim() === reqSkill);
        matched.push(originalSkill || reqSkill);
      } else {
        const originalSkill = requiredSkills.find(s => s.toLowerCase().trim() === reqSkill);
        missing.push(originalSkill || reqSkill);
      }
    });

    const score = normalizedRequired.length > 0 
      ? (matched.length / normalizedRequired.length) * 100 
      : 0;

    return { score: Math.round(score), matched, missing };
  }

  // Simple skill similarity check
  private areSimilarSkills(skill1: string, skill2: string): boolean {
    const similarityMap: { [key: string]: string[] } = {
      'react': ['reactjs', 'react.js', 'react js'],
      'node': ['nodejs', 'node.js', 'node js', 'express', 'expressjs'],
      'javascript': ['js', 'es6', 'ecmascript'],
      'typescript': ['ts'],
      'python': ['python3', 'py'],
      'mongodb': ['mongo', 'nosql'],
      'postgresql': ['postgres', 'psql'],
      'mysql': ['sql'],
      'aws': ['amazon web services', 'cloud'],
      'docker': ['containerization'],
      'kubernetes': ['k8s'],
    };

    for (const [key, variants] of Object.entries(similarityMap)) {
      if ((key === skill1 && variants.includes(skill2)) ||
          (key === skill2 && variants.includes(skill1)) ||
          (variants.includes(skill1) && variants.includes(skill2))) {
        return true;
      }
    }

    return false;
  }

  // Calculate experience match
  private calculateExperienceMatch(required: number, candidate: number): number {
    if (required === 0) return 100;
    if (candidate >= required) return 100;
    
    // Partial credit for close matches
    const ratio = candidate / required;
    return Math.round(Math.min(ratio * 100, 100));
  }

  // Calculate project relevance using keyword matching
  private calculateProjectRelevance(
    jobDescription: string,
    requiredSkills: string[],
    projects: CandidateProfile['projects']
  ): number {
    if (projects.length === 0) return 0;

    const jobKeywords = [
      ...jobDescription.toLowerCase().split(/\s+/),
      ...requiredSkills.map(s => s.toLowerCase())
    ].filter(word => word.length > 3); // Ignore short words

    let totalRelevance = 0;

    projects.forEach(project => {
      const projectText = `${project.title} ${project.description} ${project.technologies.join(' ')}`
        .toLowerCase();

      const matchedKeywords = jobKeywords.filter(keyword => 
        projectText.includes(keyword)
      );

      const relevance = (matchedKeywords.length / jobKeywords.length) * 100;
      totalRelevance += relevance;
    });

    // Average across all projects
    const avgRelevance = totalRelevance / projects.length;
    return Math.min(Math.round(avgRelevance), 100);
  }

  // Generate AI-like insights
  private generateInsights(
    candidate: CandidateProfile,
    skillMatch: { score: number; matched: string[]; missing: string[] },
    overallScore: number
  ): string {
    if (overallScore >= 90) {
      return `Exceptional candidate with ${skillMatch.matched.length} matching skills. Strong project portfolio demonstrates hands-on experience with ${skillMatch.matched.slice(0, 3).join(', ')}.`;
    } else if (overallScore >= 80) {
      return `Strong match with solid technical background. ${skillMatch.matched.length} relevant skills. ${skillMatch.missing.length > 0 ? `Would benefit from exposure to ${skillMatch.missing.slice(0, 2).join(', ')}.` : 'Well-rounded skill set.'}`;
    } else if (overallScore >= 70) {
      return `Good potential candidate. Has core competencies in ${skillMatch.matched.slice(0, 2).join(', ')}. Missing skills: ${skillMatch.missing.slice(0, 2).join(', ')} - can be trained.`;
    } else if (overallScore >= 60) {
      return `Moderate fit. Some relevant experience but significant skill gaps in ${skillMatch.missing.slice(0, 3).join(', ')}. Consider for junior roles.`;
    } else {
      return `Limited alignment with requirements. Major skill gaps identified. May require extensive training.`;
    }
  }

  // Main matching function
  async calculateMatches(
    jobCriteria: JobCriteria,
    candidates: CandidateProfile[] = mockCandidates
  ): Promise<MatchResponse> {
    const startTime = Date.now();

    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    const results: MatchResult[] = candidates.map(candidate => {
      // 1. Calculate skill match
      const skillMatch = this.calculateSkillMatch(
        jobCriteria.skills,
        candidate.skills
      );

      // 2. Calculate experience match
      const experienceScore = this.calculateExperienceMatch(
        jobCriteria.experience,
        candidate.experience
      );

      // 3. Calculate project relevance
      const projectScore = this.calculateProjectRelevance(
        jobCriteria.description || '',
        jobCriteria.skills,
        candidate.projects
      );

      // 4. Calculate weighted overall score
      const weights = jobCriteria.weights;
      const overallScore = Math.round(
        (skillMatch.score * weights.skillMatch / 100) +
        (experienceScore * weights.experience / 100) +
        (projectScore * weights.projectQuality / 100)
      );

      // 5. Generate insights
      const aiInsights = this.generateInsights(candidate, skillMatch, overallScore);

      return {
        candidateId: candidate.id,
        candidate,
        overallScore,
        breakdown: {
          skillScore: skillMatch.score,
          experienceScore,
          projectScore,
        },
        matchedSkills: skillMatch.matched,
        missingSkills: skillMatch.missing,
        aiInsights,
        status: 'new' as const,
      };
    });

    // Sort by overall score (descending)
    results.sort((a, b) => b.overallScore - a.overallScore);

    // Add ranks
    results.forEach((result, index) => {
      result.rank = index + 1;
    });

    const executionTime = Date.now() - startTime;
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const response: MatchResponse = {
      success: true,
      jobId,
      results,
      totalCandidates: results.length,
      executionTime,
      timestamp: new Date(),
    };

    // Save to localStorage for persistence across page navigation
    localStorage.setItem(`match_results_${jobId}`, JSON.stringify(response));
    localStorage.setItem('latest_match_job_id', jobId);

    return response;
  }

  // Get saved results
  getMatchResults(jobId: string): MatchResponse | null {
    const saved = localStorage.getItem(`match_results_${jobId}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  }

  // Get latest results
  getLatestResults(): MatchResponse | null {
    const jobId = localStorage.getItem('latest_match_job_id');
    if (jobId) {
      return this.getMatchResults(jobId);
    }
    return null;
  }

  // Update candidate status
  updateCandidateStatus(jobId: string, candidateId: string, status: MatchResult['status']): void {
    const results = this.getMatchResults(jobId);
    if (results) {
      const candidate = results.results.find(r => r.candidateId === candidateId);
      if (candidate) {
        candidate.status = status;
        localStorage.setItem(`match_results_${jobId}`, JSON.stringify(results));
      }
    }
  }
}

export const localMatchingService = new LocalMatchingService();