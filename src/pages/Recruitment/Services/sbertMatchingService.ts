// Services/sbertMatchingService.ts
import { sbertModel } from '../ml/sbertModel';
import { SBERT_CONFIG } from '../ml/config';
import { JobCriteria, MatchResult, CandidateProfile } from '../types/matching.types';

export class SBERTMatchingService {
  
  async calculateMatches(
    jobCriteria: JobCriteria,
    candidates: CandidateProfile[]
  ): Promise<MatchResult[]> {
    
    const jobDescription = this.buildJobDescription(jobCriteria);
    const jobEmbedding = await sbertModel.getEmbedding(jobDescription);
    
    const matchResults: MatchResult[] = [];
    
    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      
      try {
        const result = await this.matchCandidate(
          candidate,
          jobCriteria,
          jobEmbedding,
          i + 1
        );
        matchResults.push(result);
      } catch (error) {
        console.error(`Error matching candidate ${candidate.id}:`, error);
      }
    }
    
    matchResults.sort((a, b) => b.overallScore - a.overallScore);
    
    matchResults.forEach((result, index) => {
      result.rank = index + 1;
    });
    
    return matchResults;
  }

  private async matchCandidate(
    candidate: CandidateProfile,
    jobCriteria: JobCriteria,
    jobEmbedding: number[],
    rank: number
  ): Promise<MatchResult> {
    
    const candidateProfile = this.buildCandidateProfile(candidate);
    const candidateEmbedding = await sbertModel.getEmbedding(candidateProfile);
    
    const semanticSimilarity = sbertModel.cosineSimilarity(
      jobEmbedding,
      candidateEmbedding
    );
    
    const skillScore = await this.calculateSkillScore(
      jobCriteria.skills,
      candidate.skills || []
    );
    
    const experienceScore = this.calculateExperienceScore(
      jobCriteria.experience,
      candidate.experience || 0
    );
    
    const projectScore = await this.calculateProjectScore(
      jobCriteria,
      candidate
    );
    
    const weights = jobCriteria.weights;
    const overallScore = Math.round(
      (skillScore * weights.skillMatch +
       experienceScore * weights.experience +
       projectScore * weights.projectQuality) / 100
    );
    
    const matchedSkills = this.findMatchedSkills(
      jobCriteria.skills,
      candidate.skills || []
    );
    
    const missingSkills = jobCriteria.skills.filter(
      skill => !matchedSkills.includes(skill)
    );
    
    const aiInsights = this.generateInsights(
      semanticSimilarity,
      overallScore,
      matchedSkills.length,
      jobCriteria.skills.length
    );
    
    return {
      candidateId: String(candidate.id),
      candidate,
      overallScore,
      matchedSkills,
      missingSkills,
      status: 'new',
      rank,
      breakdown: {
        skillScore,
        experienceScore,
        projectScore,
      },
      semanticSimilarity: Math.round(semanticSimilarity * 100),
      aiInsights,
    };
  }

  private buildJobDescription(criteria: JobCriteria): string {
    const parts = [
      `Role: ${criteria.role}`,
      `Company: ${criteria.company}`,
      `Required Skills: ${criteria.skills.join(', ')}`,
      `Experience: ${criteria.experience} years`,
    ];
    
    if (criteria.location) {
      parts.push(`Location: ${criteria.location}`);
    }
    
    if (criteria.description) {
      parts.push(`Description: ${criteria.description}`);
    }
    
    return parts.join('. ');
  }

  private buildCandidateProfile(candidate: CandidateProfile): string {
    const parts = [
      `Name: ${candidate.name}`,
      `College: ${candidate.college}`,
      `Branch: ${candidate.branch || 'N/A'}`,
      `Skills: ${(candidate.skills || []).join(', ')}`,
      `Experience: ${candidate.experience || 0} years`,
    ];
    
    if (candidate.cgpa) {
      parts.push(`CGPA: ${candidate.cgpa}`);
    }
    
    if (candidate.projects && candidate.projects.length > 0) {
      const projectDescriptions = candidate.projects
        .map(p => `${p.title}: ${p.description}`)
        .join('. ');
      parts.push(`Projects: ${projectDescriptions}`);
    }
    
    if (candidate.bio) {
      parts.push(`Bio: ${candidate.bio}`);
    }
    
    return parts.join('. ');
  }

  private async calculateSkillScore(
    requiredSkills: string[],
    candidateSkills: string[]
  ): Promise<number> {
    if (requiredSkills.length === 0) return 100;
    if (candidateSkills.length === 0) return 0;
    
    let totalSimilarity = 0;
    
    for (const reqSkill of requiredSkills) {
      let maxSim = 0;
      
      for (const candSkill of candidateSkills) {
        const similarity = await sbertModel.calculateSimilarity(
          reqSkill.toLowerCase(),
          candSkill.toLowerCase()
        );
        maxSim = Math.max(maxSim, similarity);
      }
      
      totalSimilarity += maxSim;
    }
    
    const avgSimilarity = totalSimilarity / requiredSkills.length;
    return Math.round(avgSimilarity * 100);
  }

  private calculateExperienceScore(
    required: number,
    actual: number
  ): number {
    if (required === 0) return 100;
    
    const ratio = actual / required;
    
    if (ratio >= 1) return 100;
    if (ratio >= 0.75) return 90;
    if (ratio >= 0.5) return 75;
    if (ratio >= 0.25) return 50;
    return 25;
  }

  private async calculateProjectScore(
    jobCriteria: JobCriteria,
    candidate: CandidateProfile
  ): Promise<number> {
    if (!candidate.projects || candidate.projects.length === 0) {
      return 30;
    }
    
    const jobContext = `${jobCriteria.role} ${jobCriteria.skills.join(' ')}`;
    let totalRelevance = 0;
    
    for (const project of candidate.projects) {
      const projectText = `${project.title} ${project.description} ${project.technologies?.join(' ') || ''}`;
      const relevance = await sbertModel.calculateSimilarity(
        jobContext,
        projectText
      );
      totalRelevance += relevance;
    }
    
    const avgRelevance = totalRelevance / candidate.projects.length;
    const projectCount = Math.min(candidate.projects.length / 3, 1);
    
    return Math.round((avgRelevance * 0.7 + projectCount * 0.3) * 100);
  }

  private findMatchedSkills(
    requiredSkills: string[],
    candidateSkills: string[]
  ): string[] {
    const matched: string[] = [];
    
    for (const reqSkill of requiredSkills) {
      const found = candidateSkills.find(candSkill =>
        this.areSkillsSimilar(reqSkill, candSkill)
      );
      if (found) {
        matched.push(reqSkill);
      }
    }
    
    return matched;
  }

  private areSkillsSimilar(skill1: string, skill2: string): boolean {
    const s1 = skill1.toLowerCase().replace(/[.\s-]/g, '');
    const s2 = skill2.toLowerCase().replace(/[.\s-]/g, '');
    
    return s1.includes(s2) || s2.includes(s1);
  }

  private generateInsights(
    semanticSimilarity: number,
    overallScore: number,
    matchedSkills: number,
    totalSkills: number
  ): string {
    const simCategory = sbertModel.getSimilarityCategory(semanticSimilarity);
    const skillMatch = (matchedSkills / totalSkills) * 100;
    
    const insights: string[] = [];
    
    if (simCategory === 'excellent') {
      insights.push('Exceptional profile match with strong semantic alignment');
    } else if (simCategory === 'good') {
      insights.push('Good overall fit with relevant background');
    } else if (simCategory === 'fair') {
      insights.push('Moderate fit with some transferable skills');
    } else {
      insights.push('Limited alignment with job requirements');
    }
    
    if (skillMatch >= 80) {
      insights.push(`Strong skill coverage (${matchedSkills}/${totalSkills} skills matched)`);
    } else if (skillMatch >= 60) {
      insights.push(`Decent skill match (${matchedSkills}/${totalSkills} skills matched)`);
    } else {
      insights.push(`Skill gaps identified (${matchedSkills}/${totalSkills} skills matched)`);
    }
    
    return insights.join('. ');
  }

  async preloadModel(): Promise<void> {
    await sbertModel.preload();
  }
}

export const sbertMatchingService = new SBERTMatchingService();