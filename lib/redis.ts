import { Redis } from '@upstash/redis';

const isRedisConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Redis client instance using Upstash.
 * Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in .env.
 */
export const redis = isRedisConfigured 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Cache key constants for consistent naming across the app.
 */
export const CACHE_KEYS = {
  ANALYTICS_SUMMARY: (orgId: string) => `analytics:summary:${orgId}`,
  CLIENT_STATS: (orgId: string) => `client:stats:${orgId}`,
  AI_INSIGHTS: (orgId: string) => `ai:insights:${orgId}`,
  TEAM_MEMBERS: (orgId: string) => `team:members:${orgId}`,
  USER_NOTIFICATIONS: (userId: string) => `notifications:user:${userId}`,
};

/**
 * Generic fetcher with cache support.
 */
export async function getCachedData<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch (error) {
    console.error(`[Redis] Error getting key ${key}:`, error);
    return null;
  }
}

/**
 * Set data in cache with an optional TTL in seconds.
 */
export async function setCachedData<T>(
  key: string,
  data: T,
  ttl: number = 3600 // Default 1 hour
): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, data, { ex: ttl });
  } catch (error) {
    console.error(`[Redis] Error setting key ${key}:`, error);
  }
}

/**
 * Delete a specific cache key.
 */
export async function invalidateCache(key: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`[Redis] Error deleting key ${key}:`, error);
  }
}
