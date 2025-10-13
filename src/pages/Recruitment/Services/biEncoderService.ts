// Services/biEncoderService.ts

import { biEncoder } from '../ml/biEncoder';
import { BIENCODER_CONFIG } from '../ml/config';
import { evaluationMetrics, EvaluationResult, GroundTruth } from '../ml/evaluationMetrics';
import { JobCriteria, MatchResult, CandidateProfile } from '../types/matching.types';

export class BiEncoderService {
  
  /**
   * Main matching function with hybrid scoring
   */
  async calculateMatches(
    jobCriteria: JobCriteria,
    candidates: CandidateProfile[]
  ): Promise<MatchResult[]> {
    
    // 1. Encode job description
    const jobText = this.buildJobText(jobCriteria);
    const jobEmbedding = await biEncoder.encodeJob(jobText);
    
    // 2. Encode all candidates
    const candidateTexts = candidates.map(c => this.buildCandidateText(c));
    const candidateEmbeddings = await biEncoder.encodeCandidates(candidateTexts);
    
    // 3. Calculate cosine similarities
    const similarities = biEncoder.batchCosineSimilarity(
      jobEmbedding,
      candidateEmbeddings
    );
    
    // 4. Calculate hybrid scores for each candidate
    const matchResults: MatchResult[] = await Promise.all(
      candidates.map(async (candidate, index) => {
        return this.calculateHybridScore(
          candidate,
          jobCriteria,
          similarities[index],
          index + 1
        );
      })
    );
    
    // 5. Sort by overall score
    matchResults.sort((a, b) => b.overallScore - a.overallScore);
    
    // 6. Update ranks
    matchResults.forEach((result, index) => {
      result.rank = index + 1;
    });
    
    return matchResults;
  }

  /**
   * Hybrid scoring: Uses USER'S custom weights, not hardcoded config
   */
  private async calculateHybridScore(
    candidate: CandidateProfile,
    jobCriteria: JobCriteria,
    semanticSimilarity: number,
    rank: number
  ): Promise<MatchResult> {
    
    // Use user's custom weights from jobCriteria
    const userWeights = jobCriteria.weights;
    
    // Normalize to 0-1 scale
    const totalWeight = userWeights.skillMatch + userWeights.experience + userWeights.projectQuality;
    const normalizedWeights = {
      skillMatch: userWeights.skillMatch / totalWeight,
      experience: userWeights.experience / totalWeight,
      projectQuality: userWeights.projectQuality / totalWeight,
    };
    
    // 1. Semantic similarity score (from bi-encoder)
    const semanticScore = semanticSimilarity * 100;
    
    // 2. Exact skill match score
    const skillMatch = this.calculateSkillMatch(
      jobCriteria.skills,
      candidate.skills || []
    );
    
    // 3. Experience match score
    const experienceScore = this.calculateExperienceScore(
      jobCriteria.experience,
      candidate.experience || 0
    );
    
    // 4. Project relevance score
    const projectScore = await this.calculateProjectRelevance(
      jobCriteria,
      candidate
    );
    
    // 5. Blend semantic into skill score (since they're related)
    // This gives better overall accuracy
    const blendedSkillScore = (skillMatch.score * 0.7) + (semanticScore * 0.3);
    
    // 6. Calculate final score using USER'S weights
    const overallScore = Math.round(
      blendedSkillScore * normalizedWeights.skillMatch +
      experienceScore * normalizedWeights.experience +
      projectScore * normalizedWeights.projectQuality
    );

    // Debug for top 3 candidates
    if (rank <= 3) {
      console.log(`\nScore Breakdown - Candidate ${candidate.id} (${candidate.name}):`);
      console.log(`   Semantic Similarity:  ${semanticScore.toFixed(1)}%`);
      console.log(`   Exact Skill Match:    ${skillMatch.score}% (${skillMatch.matched.length}/${jobCriteria.skills.length})`);
      console.log(`   Blended Skills:       ${blendedSkillScore.toFixed(1)}% × ${(normalizedWeights.skillMatch * 100).toFixed(0)}% = ${(blendedSkillScore * normalizedWeights.skillMatch).toFixed(1)}`);
      console.log(`   Experience Match:     ${experienceScore}% × ${(normalizedWeights.experience * 100).toFixed(0)}% = ${(experienceScore * normalizedWeights.experience).toFixed(1)}`);
      console.log(`   Project Relevance:    ${projectScore}% × ${(normalizedWeights.projectQuality * 100).toFixed(0)}% = ${(projectScore * normalizedWeights.projectQuality).toFixed(1)}`);
      console.log(`   ─────────────────────────────────────────`);
      console.log(`   OVERALL SCORE:        ${overallScore}%`);
      console.log(`   Matched Skills:       ${skillMatch.matched.join(', ') || 'None'}`);
      console.log(`   Missing Skills:       ${skillMatch.missing.join(', ') || 'None'}`);
    }
    
    // 7. Generate insights based on actual scores
    const aiInsights = this.generateInsights(
      semanticSimilarity,
      overallScore,
      skillMatch,
      jobCriteria.skills.length
    );
    
    return {
      candidateId: String(candidate.id),
      candidate,
      overallScore: Math.min(overallScore, 100),
      matchedSkills: skillMatch.matched,
      missingSkills: skillMatch.missing,
      status: 'new',
      rank,
      breakdown: {
        skillScore: skillMatch.score,
        experienceScore,
        projectScore,
      },
      semanticSimilarity: Math.round(semanticScore),
      aiInsights,
    };
  }

  /**
   * Calculate exact skill matches
   */
  private calculateSkillMatch(
    requiredSkills: string[],
    candidateSkills: string[]
  ): { score: number; matched: string[]; missing: string[] } {
    const matched: string[] = [];
    const missing: string[] = [];
    
    const normalizedRequired = requiredSkills.map(s => s.toLowerCase().trim());
    const normalizedCandidate = candidateSkills.map(s => s.toLowerCase().trim());
    
    normalizedRequired.forEach((reqSkill, idx) => {
      const found = normalizedCandidate.some(candSkill => 
        this.areSkillsSimilar(reqSkill, candSkill)
      );
      
      if (found) {
        matched.push(requiredSkills[idx]);
      } else {
        missing.push(requiredSkills[idx]);
      }
    });
    
    const score = normalizedRequired.length > 0
      ? (matched.length / normalizedRequired.length) * 100
      : 0;
    
    return { score: Math.round(score), matched, missing };
  }

  private areSkillsSimilar(skill1: string, skill2: string): boolean {
    const s1 = skill1.replace(/[.\s-]/g, '').toLowerCase();
    const s2 = skill2.replace(/[.\s-]/g, '').toLowerCase();
    return s1.includes(s2) || s2.includes(s1);
  }

  /**
   * Calculate experience match
   */
  private calculateExperienceScore(required: number, actual: number): number {
    if (required === 0) return 100;
    const ratio = actual / required;
    
    if (ratio >= 1) return 100;
    if (ratio >= 0.75) return 90;
    if (ratio >= 0.5) return 75;
    if (ratio >= 0.25) return 50;
    return 25;
  }

  /**
   * Calculate project relevance using bi-encoder
   */
  private async calculateProjectRelevance(
    jobCriteria: JobCriteria,
    candidate: CandidateProfile
  ): Promise<number> {
    if (!candidate.projects || candidate.projects.length === 0) {
      return 30;
    }
    
    const jobContext = `${jobCriteria.role} ${jobCriteria.skills.join(' ')}`;
    const jobEmb = await biEncoder.encodeJob(jobContext);
    
    let totalRelevance = 0;
    
    for (const project of candidate.projects) {
      const projectText = `${project.title} ${project.description} ${project.technologies?.join(' ') || ''}`;
      const projectEmb = await biEncoder.encodeCandidate(projectText);
      const similarity = biEncoder.cosineSimilarity(jobEmb, projectEmb);
      totalRelevance += similarity;
    }
    
    const avgRelevance = totalRelevance / candidate.projects.length;
    const projectBonus = Math.min(candidate.projects.length / 3, 1);
    
    return Math.round((avgRelevance * 0.7 + projectBonus * 0.3) * 100);
  }

  /**
   * Generate realistic AI insights based on actual scores
   */
  private generateInsights(
    semanticSimilarity: number,
    overallScore: number,
    skillMatch: { score: number; matched: string[]; missing: string[] },
    totalSkills: number
  ): string {
    const insights: string[] = [];
    
    // Overall assessment based on score
    if (overallScore >= 85) {
      insights.push('EXCELLENT match - Strongly recommended for immediate interview');
    } else if (overallScore >= 75) {
      insights.push('GOOD match - Recommended for interview');
    } else if (overallScore >= 65) {
      insights.push('FAIR match - Consider with additional training or mentorship');
    } else if (overallScore >= 50) {
      insights.push('WEAK match - Significant skill gaps present');
    } else {
      insights.push('POOR match - Not recommended for this role');
    }
    
    // Skill-specific insights
    const skillMatchPct = (skillMatch.matched.length / totalSkills) * 100;
    if (skillMatchPct === 100) {
      insights.push(`Has all ${totalSkills} required skills`);
    } else if (skillMatchPct >= 75) {
      insights.push(`Has ${skillMatch.matched.length}/${totalSkills} skills - Missing: ${skillMatch.missing.join(', ')}`);
    } else if (skillMatchPct >= 50) {
      insights.push(`Partial skills (${skillMatch.matched.length}/${totalSkills}) - Major gaps: ${skillMatch.missing.join(', ')}`);
    } else {
      insights.push(`Critical skill gaps (${skillMatch.matched.length}/${totalSkills}) - Missing: ${skillMatch.missing.join(', ')}`);
    }
    
    // Semantic context
    if (semanticSimilarity >= 0.75) {
      insights.push('Profile strongly aligns with job requirements');
    } else if (semanticSimilarity >= 0.60) {
      insights.push('Moderate alignment with role expectations');
    } else {
      insights.push('Limited background match for this position');
    }
    
    return insights.join('. ');
  }

  /**
   * Build job text for encoding
   */
  private buildJobText(criteria: JobCriteria): string {
    return `${criteria.role} position at ${criteria.company}. Required skills: ${criteria.skills.join(', ')}. Experience: ${criteria.experience} years. ${criteria.description || ''}`;
  }

  /**
   * Build candidate text for encoding
   */
  private buildCandidateText(candidate: CandidateProfile): string {
    const projects = candidate.projects
      .map(p => `${p.title}: ${p.description}`)
      .join('. ');
    
    return `${candidate.name} from ${candidate.college} (${candidate.branch}). Skills: ${candidate.skills.join(', ')}. Experience: ${candidate.experience} years. CGPA: ${candidate.cgpa}. Projects: ${projects}`;
  }

  /**
   * Evaluate model performance
   */
  async evaluateModel(
    jobCriteria: JobCriteria,
    candidates: CandidateProfile[],
    groundTruth: GroundTruth[]
  ): Promise<EvaluationResult> {
    
    console.log('\n========================================');
    console.log('     MODEL EVALUATION STARTED          ');
    console.log('========================================\n');
    console.log(`Job: ${jobCriteria.role}`);
    console.log(`Candidates: ${candidates.length}`);
    console.log(`Ground Truth: ${groundTruth.filter(g => g.isRelevant).length} relevant, ${groundTruth.filter(g => !g.isRelevant).length} non-relevant\n`);

    // Get predictions
    console.log('Calculating matches...');
    const results = await this.calculateMatches(jobCriteria, candidates);
    const predictions = results.map(r => r.candidateId);
    
    console.log(`Predictions generated: Top 10 candidates ranked\n`);

    // Show top predictions
    console.log('TOP 5 PREDICTIONS:');
    results.slice(0, 5).forEach((r, i) => {
      const groundTruthEntry = groundTruth.find(g => g.candidateId === r.candidateId);
      const isCorrect = groundTruthEntry?.isRelevant;
      const status = isCorrect ? '[MATCH]' : '[MISS]';
      console.log(`${i + 1}. ${status} Candidate ${r.candidateId} - Score: ${r.overallScore}% | Expected: ${isCorrect ? 'Relevant' : 'Not Relevant'}`);
    });
    console.log('');

    // Evaluate
    console.log('Calculating evaluation metrics...\n');
    const evaluation = evaluationMetrics.evaluate(predictions, groundTruth, 10);
    
    // Print results
    evaluationMetrics.printResults(evaluation);
    
    console.log('========================================');
    console.log('     MODEL EVALUATION COMPLETE         ');
    console.log('========================================\n');

    return evaluation;
  }

  async preloadModel(): Promise<void> {
    await biEncoder.loadEncoders();
  }
}

export const biEncoderService = new BiEncoderService();