// ml/evaluationMetrics.ts

export interface EvaluationResult {
  precision: number;
  recall: number;
  f1Score: number;
  accuracy: number;
  ndcg: number;
  map: number;
  mrr: number;
}

export interface GroundTruth {
  candidateId: string;
  isRelevant: boolean;
  relevanceScore?: number;
}

export class EvaluationMetrics {
  
  /**
   * Calculate Precision@K
   * What percentage of top K results are relevant?
   */
  precisionAtK(
    predictions: string[],
    groundTruth: GroundTruth[],
    k: number
  ): number {
    const topK = predictions.slice(0, k);
    const relevantIds = new Set(
      groundTruth.filter(gt => gt.isRelevant).map(gt => gt.candidateId)
    );

    const relevantInTopK = topK.filter(id => relevantIds.has(id)).length;
    return relevantInTopK / k;
  }

  /**
   * Calculate Recall@K
   * What percentage of all relevant items are in top K?
   */
  recallAtK(
    predictions: string[],
    groundTruth: GroundTruth[],
    k: number
  ): number {
    const topK = predictions.slice(0, k);
    const relevantIds = groundTruth
      .filter(gt => gt.isRelevant)
      .map(gt => gt.candidateId);

    if (relevantIds.length === 0) return 0;

    const relevantInTopK = topK.filter(id => relevantIds.includes(id)).length;
    return relevantInTopK / relevantIds.length;
  }

  /**
   * Calculate F1 Score
   * Harmonic mean of precision and recall
   */
  f1Score(precision: number, recall: number): number {
    if (precision + recall === 0) return 0;
    return (2 * precision * recall) / (precision + recall);
  }

  /**
   * Calculate Accuracy@K
   * Only considers top K predictions
   */
  accuracy(predictions: string[], groundTruth: GroundTruth[], k: number = 10): number {
    const topK = predictions.slice(0, k);
    const relevantIds = new Set(
      groundTruth.filter(gt => gt.isRelevant).map(gt => gt.candidateId)
    );

    let correct = 0;
    for (const pred of topK) {
      if (relevantIds.has(pred)) correct++;
    }

    return correct / topK.length;
  }

  /**
   * Calculate NDCG@K (Normalized Discounted Cumulative Gain)
   * Measures ranking quality with position-based discounting
   */
  ndcgAtK(
    predictions: string[],
    groundTruth: GroundTruth[],
    k: number
  ): number {
    const topK = predictions.slice(0, k);
    const relevanceMap = new Map(
      groundTruth.map(gt => [gt.candidateId, gt.relevanceScore || (gt.isRelevant ? 1 : 0)])
    );

    // DCG: Sum of (relevance / log2(position + 1))
    let dcg = 0;
    topK.forEach((id, index) => {
      const relevance = relevanceMap.get(id) || 0;
      dcg += relevance / Math.log2(index + 2);
    });

    // IDCG: Best possible DCG
    const sortedRelevances = Array.from(relevanceMap.values())
      .sort((a, b) => b - a)
      .slice(0, k);
    
    let idcg = 0;
    sortedRelevances.forEach((relevance, index) => {
      idcg += relevance / Math.log2(index + 2);
    });

    return idcg === 0 ? 0 : dcg / idcg;
  }

  /**
   * Calculate MAP (Mean Average Precision)
   * Average precision across all relevant results
   */
  meanAveragePrecision(
    predictions: string[],
    groundTruth: GroundTruth[]
  ): number {
    const relevantIds = new Set(
      groundTruth.filter(gt => gt.isRelevant).map(gt => gt.candidateId)
    );

    if (relevantIds.size === 0) return 0;

    let sumPrecisions = 0;
    let relevantCount = 0;

    predictions.forEach((id, index) => {
      if (relevantIds.has(id)) {
        relevantCount++;
        const precision = relevantCount / (index + 1);
        sumPrecisions += precision;
      }
    });

    return relevantCount === 0 ? 0 : sumPrecisions / relevantIds.size;
  }

  /**
   * Calculate MRR (Mean Reciprocal Rank)
   * Position of first relevant result
   */
  meanReciprocalRank(
    predictions: string[],
    groundTruth: GroundTruth[]
  ): number {
    const relevantIds = new Set(
      groundTruth.filter(gt => gt.isRelevant).map(gt => gt.candidateId)
    );

    for (let i = 0; i < predictions.length; i++) {
      if (relevantIds.has(predictions[i])) {
        return 1 / (i + 1);
      }
    }

    return 0;
  }

  /**
   * Comprehensive evaluation
   */
  evaluate(
    predictions: string[],
    groundTruth: GroundTruth[],
    k: number = 10
  ): EvaluationResult {
    const precision = this.precisionAtK(predictions, groundTruth, k);
    const recall = this.recallAtK(predictions, groundTruth, k);
    const f1 = this.f1Score(precision, recall);
    const accuracy = this.accuracy(predictions, groundTruth, k);
    const ndcg = this.ndcgAtK(predictions, groundTruth, k);
    const map = this.meanAveragePrecision(predictions, groundTruth);
    const mrr = this.meanReciprocalRank(predictions, groundTruth);

    return {
      precision,
      recall,
      f1Score: f1,
      accuracy,
      ndcg,
      map,
      mrr,
    };
  }

  /**
   * Print evaluation results (clean output, no emojis)
   */
  printResults(results: EvaluationResult): void {
    console.log('\n========================================');
    console.log('         EVALUATION METRICS            ');
    console.log('========================================');
    console.log(`Precision@10:  ${(results.precision * 100).toFixed(2)}%`);
    console.log(`Recall@10:     ${(results.recall * 100).toFixed(2)}%`);
    console.log(`F1 Score:      ${(results.f1Score * 100).toFixed(2)}%`);
    console.log(`Accuracy@10:   ${(results.accuracy * 100).toFixed(2)}%`);
    console.log(`NDCG@10:       ${(results.ndcg * 100).toFixed(2)}%`);
    console.log(`MAP:           ${(results.map * 100).toFixed(2)}%`);
    console.log(`MRR:           ${(results.mrr * 100).toFixed(2)}%`);
    console.log('========================================\n');
  }
}

export const evaluationMetrics = new EvaluationMetrics();