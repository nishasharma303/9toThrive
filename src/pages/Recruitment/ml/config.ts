export const SBERT_CONFIG = {
  // Bi-encoder model (optimized for semantic similarity)
  modelName: 'Xenova/all-MiniLM-L6-v2',
  
  // Alternative bi-encoder models:
  // modelName: 'Xenova/all-mpnet-base-v2', // More accurate, slower
  // modelName: 'Xenova/paraphrase-multilingual-MiniLM-L12-v2', // Multilingual
  
  maxLength: 512,
  normalize: true,
  
  // Cosine similarity thresholds (calibrated)
  thresholds: {
    excellent: 0.85,
    good: 0.75,
    fair: 0.65,
    poor: 0.65
  },
  
  enableCache: true,
  cacheExpiry: 7 * 24 * 60 * 60 * 1000,
};

export const BIENCODER_CONFIG = {
  jobEncoder: 'Xenova/all-MiniLM-L6-v2',
  candidateEncoder: 'Xenova/all-MiniLM-L6-v2',
  
  training: {
    batchSize: 16,
    learningRate: 2e-5,
    epochs: 3,
    warmupSteps: 100,
  },
  
  evaluation: {
    enabled: true,
    metrics: ['precision', 'recall', 'f1', 'ndcg', 'map'],
    topK: [1, 5, 10],
  },
  
  // ⭐ Add quality thresholds
  scoreThresholds: {
    excellent: 80,  // Definitely hire
    good: 70,       // Strong candidate
    fair: 60,       // Maybe with training
    poor: 60,       // Don't recommend
  },
  
  hybridWeights: {
    semanticSimilarity: 0.4,
    skillMatch: 0.3,
    experienceMatch: 0.2,
    projectRelevance: 0.1,
  },
};

export const EMBEDDING_DIMENSIONS = 384;