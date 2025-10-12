import { pipeline, env } from '@xenova/transformers';
import { SBERT_CONFIG, EMBEDDING_DIMENSIONS } from './config';
import { embeddingCache } from './embeddingCache';

// Disable local model loading if needed
env.allowLocalModels = false;

class SBERTModel {
  private model: any = null;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;

  async loadModel(): Promise<void> {
    if (this.model) return;
    
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    this.isLoading = true;
    this.loadPromise = this._loadModel();
    
    try {
      await this.loadPromise;
    } finally {
      this.isLoading = false;
      this.loadPromise = null;
    }
  }

  private async _loadModel(): Promise<void> {
    try {
      console.log('🤖 Loading SBERT model:', SBERT_CONFIG.modelName);
      
      this.model = await pipeline(
        'feature-extraction',
        SBERT_CONFIG.modelName
      );
      
      console.log('✅ SBERT model loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load SBERT model:', error);
      throw new Error('Failed to initialize SBERT model');
    }
  }

  async getEmbedding(text: string): Promise<number[]> {
    // Check cache first
    const cached = embeddingCache.get(text);
    if (cached) {
      return cached;
    }

    // Ensure model is loaded
    if (!this.model) {
      await this.loadModel();
    }

    try {
      // Clean and prepare text
      const cleanText = this.preprocessText(text);
      
      // Generate embedding
      const output = await this.model(cleanText, {
        pooling: 'mean',
        normalize: SBERT_CONFIG.normalize,
      });

      // Convert to array
      const embedding = Array.from(output.data as Float32Array);

      // Cache the result
      embeddingCache.set(text, embedding);

      return embedding;
    } catch (error) {
      console.error('Failed to generate embedding:', error);
      throw error;
    }
  }

  async getBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];
    
    for (const text of texts) {
      const embedding = await this.getEmbedding(text);
      embeddings.push(embedding);
    }
    
    return embeddings;
  }

  private preprocessText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, SBERT_CONFIG.maxLength);
  }

  cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) {
      throw new Error('Vectors must have same length');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    norm1 = Math.sqrt(norm1);
    norm2 = Math.sqrt(norm2);

    if (norm1 === 0 || norm2 === 0) return 0;

    return dotProduct / (norm1 * norm2);
  }

  async calculateSimilarity(text1: string, text2: string): Promise<number> {
    const [emb1, emb2] = await Promise.all([
      this.getEmbedding(text1),
      this.getEmbedding(text2),
    ]);

    return this.cosineSimilarity(emb1, emb2);
  }

  getSimilarityCategory(score: number): string {
    const { thresholds } = SBERT_CONFIG;
    
    if (score >= thresholds.excellent) return 'excellent';
    if (score >= thresholds.good) return 'good';
    if (score >= thresholds.fair) return 'fair';
    return 'poor';
  }

  isModelLoaded(): boolean {
    return this.model !== null;
  }

  async preload(): Promise<void> {
    await this.loadModel();
  }
}

export const sbertModel = new SBERTModel();