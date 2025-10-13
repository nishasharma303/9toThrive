// Services/localMatchingService.ts

import { MatchResponse, MatchResult } from '../types/matching.types';
import { mockCandidates } from '../data/mockCandidates';

class LocalMatchingService {
  private readonly STORAGE_KEY_PREFIX = 'match_results_';
  private readonly MAX_STORED_RESULTS = 5;
  private readonly MAX_SIZE_KB = 1024;

  /**
   * Get match results by job ID (main method used by component)
   */
  getMatchResults(jobId: string): MatchResponse | null {
    return this.getResultsByJobId(jobId);
  }

  /**
   * Update candidate status
   */
  updateCandidateStatus(
    jobId: string, 
    candidateId: string, 
    status: MatchResult['status']
  ): void {
    try {
      const results = this.getResultsByJobId(jobId);
      if (!results) {
        throw new Error('Results not found for job ID: ' + jobId);
      }

      // Update the status
      const updatedResults = {
        ...results,
        results: results.results.map(r => 
          r.candidateId === candidateId 
            ? { ...r, status } 
            : r
        )
      };

      // Save back (minimal version)
      this.saveMatchResults(updatedResults);
    } catch (error) {
      console.error('Failed to update candidate status:', error);
      throw error;
    }
  }

  /**
   * Get latest match results
   */
  getLatestResults(): MatchResponse | null {
    try {
      const allResults = this.getAllResults();
      
      if (allResults.length === 0) {
        return null;
      }

      // Return most recent result with reconstructed data
      return this.reconstructFullResponse(allResults[0]);
    } catch (error) {
      console.error('Failed to get latest results:', error);
      return null;
    }
  }

  /**
   * Save match results (minimal data only to avoid quota issues)
   */
  saveMatchResults(response: MatchResponse): void {
    try {
      const jobId = response.jobId;
      const key = `${this.STORAGE_KEY_PREFIX}${jobId}`;

      // Create minimal version without full candidate objects
      const minimalResponse = {
        jobId: response.jobId,
        timestamp: response.timestamp,
        criteria: {
          role: response.criteria.role,
          company: response.criteria.company,
          skills: response.criteria.skills,
          experience: response.criteria.experience,
        },
        results: response.results.map(r => ({
          candidateId: r.candidateId,
          overallScore: r.overallScore,
          rank: r.rank,
          matchedSkills: r.matchedSkills || [],
          missingSkills: r.missingSkills || [],
          breakdown: r.breakdown || {
            skillScore: 0,
            experienceScore: 0,
            projectScore: 0,
          },
          semanticSimilarity: r.semanticSimilarity,
          aiInsights: r.aiInsights,
          status: r.status || 'new',
        })),
        totalCandidates: response.totalCandidates,
        executionTime: response.executionTime,
      };

      const serialized = JSON.stringify(minimalResponse);
      const sizeKB = new Blob([serialized]).size / 1024;

      if (sizeKB > this.MAX_SIZE_KB) {
        console.warn(`Match results too large (${sizeKB.toFixed(0)}KB), truncating...`);
        // Try saving with fewer results
        minimalResponse.results = minimalResponse.results.slice(0, 50);
        const truncated = JSON.stringify(minimalResponse);
        localStorage.setItem(key, truncated);
      } else {
        localStorage.setItem(key, serialized);
      }
      
      // Cleanup old results
      this.cleanupOldResults();
      
      console.log(`Match results saved: ${jobId} (${sizeKB.toFixed(0)}KB)`);
    } catch (error: any) {
      if (error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded, clearing old results');
        this.cleanupOldResults(true);
        
        // Try one more time with ultra-minimal data
        try {
          const key = `${this.STORAGE_KEY_PREFIX}${response.jobId}`;
          const ultraMinimal = {
            jobId: response.jobId,
            timestamp: response.timestamp,
            criteria: response.criteria,
            results: response.results.slice(0, 20).map(r => ({
              candidateId: r.candidateId,
              overallScore: r.overallScore,
              rank: r.rank,
              status: r.status || 'new',
            })),
            totalCandidates: response.totalCandidates,
            executionTime: response.executionTime,
          };
          localStorage.setItem(key, JSON.stringify(ultraMinimal));
          console.log('Saved ultra-minimal version');
        } catch (retryError) {
          console.error('Failed to save even minimal results');
        }
      } else {
        console.error('Failed to save match results:', error);
      }
    }
  }

  /**
   * Reconstruct full response with candidate objects from mockCandidates
   */
  private reconstructFullResponse(stored: any): MatchResponse {
    try {
      // Check if it already has full candidate objects
      if (stored.results?.[0]?.candidate?.name) {
        return stored;
      }

      // Reconstruct with full candidate data from mockCandidates
      const reconstructed = {
        ...stored,
        results: (stored.results || []).map((r: any) => {
          // Find the full candidate data
          const candidate = mockCandidates.find(
            c => String(c.id) === String(r.candidateId)
          );

          if (!candidate) {
            // Create a fallback candidate object if not found
            console.warn(`Candidate not found in mockCandidates: ${r.candidateId}`);
            return {
              candidateId: r.candidateId,
              candidate: {
                id: r.candidateId,
                name: `Candidate ${r.candidateId}`,
                email: `candidate${r.candidateId}@email.com`,
                college: 'Unknown College',
                branch: 'Unknown Branch',
                cgpa: 0,
                skills: r.matchedSkills || [],
                experience: 0,
                projects: [],
                phssScore: r.overallScore || 0,
              },
              overallScore: r.overallScore || 0,
              rank: r.rank || 999,
              matchedSkills: r.matchedSkills || [],
              missingSkills: r.missingSkills || [],
              breakdown: r.breakdown || {
                skillScore: 0,
                experienceScore: 0,
                projectScore: 0,
              },
              semanticSimilarity: r.semanticSimilarity,
              aiInsights: r.aiInsights,
              status: r.status || 'new',
            };
          }

          // Return with full candidate object
          return {
            candidateId: r.candidateId,
            candidate: candidate,
            overallScore: r.overallScore || 0,
            rank: r.rank || 999,
            matchedSkills: r.matchedSkills || [],
            missingSkills: r.missingSkills || [],
            breakdown: r.breakdown || {
              skillScore: 0,
              experienceScore: 0,
              projectScore: 0,
            },
            semanticSimilarity: r.semanticSimilarity,
            aiInsights: r.aiInsights,
            status: r.status || 'new',
          };
        })
      };

      return reconstructed;
    } catch (error) {
      console.error('Failed to reconstruct response:', error);
      // Return stored as-is if reconstruction fails
      return stored;
    }
  }

  /**
   * Get all saved results (sorted by timestamp, newest first)
   */
  getAllResults(): any[] {
    try {
      const allKeys = Object.keys(localStorage);
      const matchKeys = allKeys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX));

      return matchKeys
        .map(key => {
          try {
            const stored = JSON.parse(localStorage.getItem(key) || '{}');
            return stored;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => {
          const timeA = new Date(a.timestamp || 0).getTime();
          const timeB = new Date(b.timestamp || 0).getTime();
          return timeB - timeA;
        });
    } catch (error) {
      console.error('Failed to load results:', error);
      return [];
    }
  }

  /**
   * Get results by job ID
   */
  getResultsByJobId(jobId: string): MatchResponse | null {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${jobId}`;
      const stored = localStorage.getItem(key);
      
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      return this.reconstructFullResponse(parsed);
    } catch (error) {
      console.error(`Failed to get results for job ${jobId}:`, error);
      return null;
    }
  }

  /**
   * Cleanup old results
   */
  private cleanupOldResults(aggressive: boolean = false): void {
    try {
      const allKeys = Object.keys(localStorage);
      const matchKeys = allKeys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX));

      if (matchKeys.length === 0) return;

      // Sort by timestamp (newest first)
      const sorted = matchKeys
        .map(key => {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            return { key, timestamp: new Date(data.timestamp || 0).getTime() };
          } catch {
            return { key, timestamp: 0 };
          }
        })
        .sort((a, b) => b.timestamp - a.timestamp);

      // Keep only recent results
      const keepCount = aggressive ? 1 : this.MAX_STORED_RESULTS;
      const toDelete = sorted.slice(keepCount);

      toDelete.forEach(item => {
        try {
          localStorage.removeItem(item.key);
          console.log(`Removed old result: ${item.key}`);
        } catch (error) {
          console.error(`Failed to remove ${item.key}`);
        }
      });

      if (aggressive) {
        // Also clear embedding cache
        localStorage.removeItem('sbert_embedding_cache');
        console.log('Cleared embedding cache');
      }
    } catch (error) {
      console.error('Failed to cleanup old results:', error);
    }
  }

  /**
   * Clear all results
   */
  clearAllResults(): void {
    try {
      const allKeys = Object.keys(localStorage);
      const matchKeys = allKeys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX));
      
      matchKeys.forEach(key => localStorage.removeItem(key));
      localStorage.removeItem('sbert_embedding_cache');
      
      console.log(`Cleared ${matchKeys.length} match results and cache`);
    } catch (error) {
      console.error('Failed to clear results:', error);
    }
  }

  /**
   * Get storage stats
   */
  getStorageStats(): { usedKB: number; totalKB: number; percentUsed: number } {
    let totalSize = 0;
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += (localStorage[key].length + key.length) * 2;
      }
    }

    const usedKB = totalSize / 1024;
    const totalKB = 5120; // 5MB typical limit
    const percentUsed = (usedKB / totalKB) * 100;

    return { 
      usedKB: Math.round(usedKB), 
      totalKB, 
      percentUsed: Math.round(percentUsed) 
    };
  }
}

export const localMatchingService = new LocalMatchingService();