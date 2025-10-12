// ml/embeddingCache.ts

interface CacheEntry {
  embedding: number[];
  timestamp: number;
}

class EmbeddingCache {
  private cache: Map<string, CacheEntry>;
  private maxEntries: number = 100; // Limit to 100 embeddings
  private maxSizeBytes: number = 4 * 1024 * 1024; // 4MB max
  private cacheExpiry: number;

  constructor(expiryMs: number = 7 * 24 * 60 * 60 * 1000) {
    this.cache = new Map();
    this.cacheExpiry = expiryMs;
    this.loadFromStorage();
  }

  private getCacheSize(): number {
    const str = JSON.stringify(Array.from(this.cache.entries()));
    return new Blob([str]).size;
  }

  private evictOldest(): void {
    if (this.cache.size === 0) return;
    
    // Find oldest entry
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    this.cache.forEach((value, key) => {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      this.cache.delete(oldestKey);
      console.log(`Evicted old cache entry: ${oldestKey.substring(0, 50)}...`);
    }
  }

  get(key: string): number[] | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;

    // Check expiry
    if (Date.now() - entry.timestamp > this.cacheExpiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.embedding;
  }

  set(key: string, embedding: number[]): void {
    // Don't cache project embeddings (they're dynamic)
    if (key.includes('project_') || key.includes('Project')) {
      return; // Skip caching
    }

    // Evict if too many entries
    while (this.cache.size >= this.maxEntries) {
      this.evictOldest();
    }

    // Evict if cache too large
    while (this.getCacheSize() > this.maxSizeBytes && this.cache.size > 0) {
      this.evictOldest();
    }

    this.cache.set(key, {
      embedding,
      timestamp: Date.now(),
    });

    // Save to localStorage (with error handling)
    try {
      this.saveToStorage();
    } catch (error) {
      console.warn('Cache full, cleared old entries');
      // Clear half the cache and retry
      const keysToDelete = Array.from(this.cache.keys()).slice(0, Math.floor(this.cache.size / 2));
      keysToDelete.forEach(k => this.cache.delete(k));
      
      try {
        this.saveToStorage();
      } catch (retryError) {
        console.error('Failed to save cache even after cleanup');
      }
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('sbert_embedding_cache');
      if (stored) {
        const entries = JSON.parse(stored);
        this.cache = new Map(entries);
        console.log(`Loaded ${this.cache.size} cached embeddings`);
      }
    } catch (error) {
      console.warn('Failed to load cache from storage, starting fresh');
      this.cache = new Map();
    }
  }

  private saveToStorage(): void {
    try {
      const entries = Array.from(this.cache.entries());
      const serialized = JSON.stringify(entries);
      
      // Check size before saving
      const sizeKB = new Blob([serialized]).size / 1024;
      if (sizeKB > 4096) { // > 4MB
        console.warn(`Cache too large (${sizeKB.toFixed(0)}KB), clearing oldest entries`);
        this.evictOldest();
        return this.saveToStorage(); // Retry
      }
      
      localStorage.setItem('sbert_embedding_cache', serialized);
    } catch (error: any) {
      if (error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded, clearing cache');
        this.clear();
        throw new Error('Cache quota exceeded');
      }
      throw error;
    }
  }

  clear(): void {
    this.cache.clear();
    try {
      localStorage.removeItem('sbert_embedding_cache');
    } catch (error) {
      console.error('Failed to clear cache from storage');
    }
  }

  getStats(): { size: number; entries: number; sizeKB: number } {
    const sizeKB = this.getCacheSize() / 1024;
    return {
      size: this.cache.size,
      entries: this.cache.size,
      sizeKB: Math.round(sizeKB),
    };
  }
}

export const embeddingCache = new EmbeddingCache();