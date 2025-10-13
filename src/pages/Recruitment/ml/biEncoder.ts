import { pipeline } from '@xenova/transformers';
import { BIENCODER_CONFIG } from './config';
import { embeddingCache } from './embeddingCache';

/**
 * Bi-Encoder: Separate encoders for jobs and candidates
 * Optimized for asymmetric semantic search
 */
class BiEncoder {
  private jobEncoder: any = null;
  private candidateEncoder: any = null;
  private isLoading = false;

  async loadEncoders(): Promise<void> {
    if (this.jobEncoder && this.candidateEncoder) return;
    
    if (this.isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.loadEncoders();
    }

    this.isLoading = true;

    try {
      console.log('🔄 Loading Bi-Encoders...');

      // Load both encoders (same model for now, can be different)
      [this.jobEncoder, this.candidateEncoder] = await Promise.all([
        pipeline('feature-extraction', BIENCODER_CONFIG.jobEncoder),
        pipeline('feature-extraction', BIENCODER_CONFIG.candidateEncoder),
      ]);

      console.log('✅ Bi-Encoders loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load Bi-Encoders:', error);
      throw new Error('Failed to initialize Bi-Encoders');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Encode job description
   */
  async encodeJob(jobText: string): Promise<number[]> {
    const cacheKey = `job_${jobText}`;
    const cached = embeddingCache.get(cacheKey);
    if (cached) return cached;

    await this.loadEncoders();

    try {
      const output = await this.jobEncoder(jobText, {
        pooling: 'mean',
        normalize: true,
      });

      const embedding = Array.from(output.data as Float32Array);
      embeddingCache.set(cacheKey, embedding);
      return embedding;
    } catch (error) {
      console.error('Failed to encode job:', error);
      throw error;
    }
  }

  /**
   * Encode candidate profile
   */
  
// ml/biEncoder.ts (UPDATE encodeCandidate method)

/**
 * Encode candidate profile
 */
async encodeCandidate(candidateText: string): Promise<number[]> {
  // Don't cache if it's a project description (too many unique values)
  const shouldCache = !candidateText.includes('Project') && 
                      !candidateText.toLowerCase().includes('project:') &&
                      candidateText.length < 500; // Don't cache long texts

  if (shouldCache) {
    const cacheKey = `candidate_${candidateText.substring(0, 100)}`; // Shorter keys
    const cached = embeddingCache.get(cacheKey);
    if (cached) return cached;
  }

  await this.loadEncoders();

  try {
    const output = await this.candidateEncoder(candidateText, {
      pooling: 'mean',
      normalize: true,
    });

    const embedding = Array.from(output.data as Float32Array);
    
    if (shouldCache) {
      const cacheKey = `candidate_${candidateText.substring(0, 100)}`;
      embeddingCache.set(cacheKey, embedding);
    }
    
    return embedding;
  } catch (error) {
    console.error('Failed to encode candidate:', error);
    throw error;
  }
}

async encodeCandidates(candidateTexts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  
  for (const text of candidateTexts) {
    const embedding = await this.encodeCandidate(text);
    embeddings.push(embedding);
  }
  
  return embeddings;
}

  /**
   * Calculate cosine similarity between job and candidate embeddings
   */
  cosineSimilarity(jobEmbedding: number[], candidateEmbedding: number[]): number {
    if (jobEmbedding.length !== candidateEmbedding.length) {
      throw new Error('Embedding dimensions must match');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < jobEmbedding.length; i++) {
      dotProduct += jobEmbedding[i] * candidateEmbedding[i];
      normA += jobEmbedding[i] * jobEmbedding[i];
      normB += candidateEmbedding[i] * candidateEmbedding[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (normA * normB);
  }

  /**
   * Batch cosine similarity calculation
   */
  batchCosineSimilarity(
    jobEmbedding: number[],
    candidateEmbeddings: number[][]
  ): number[] {
    return candidateEmbeddings.map(candidateEmb =>
      this.cosineSimilarity(jobEmbedding, candidateEmb)
    );
  }

  isLoaded(): boolean {
    return this.jobEncoder !== null && this.candidateEncoder !== null;
  }
}

export const biEncoder = new BiEncoder();