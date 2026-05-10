import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

/**
 * General purpose rate limiter (100 requests per minute).
 * Used for standard API routes like clients, invoices, and team management.
 */
export const generalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:general',
});

/**
 * Strict rate limiter for AI-related routes (10 requests per minute).
 * Used to prevent abuse of expensive LLM calls.
 */
export const aiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
  prefix: 'ratelimit:ai',
});

/**
 * Helper to get the identifier for rate limiting (typically user ID or IP).
 */
export function getRateLimitIdentifier(req: Request, userId?: string | null): string {
  if (userId) return userId;
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0] : 'anonymous';
}
