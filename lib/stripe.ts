import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia' as any,
  typescript: true,
});

export type PlanType = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';

export interface PlanConfig {
  name: string;
  price: number;
  priceId: string | null;
  maxUsers: number | 'unlimited';
  maxClients: number | 'unlimited';
  maxInvoices: number | 'unlimited';
}

/**
 * Plan configurations including pricing and usage limits.
 * Replace priceIds with your actual Stripe Price IDs in .env.
 */
export const PLANS: Record<PlanType, PlanConfig> = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: null,
    maxUsers: 2,
    maxClients: 10,
    maxInvoices: 5,
  },
  STARTER: {
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_PRICE_ID_STARTER || 'price_starter_id',
    maxUsers: 5,
    maxClients: 50,
    maxInvoices: 50,
  },
  PRO: {
    name: 'Pro',
    price: 79,
    priceId: process.env.STRIPE_PRICE_ID_PRO || 'price_pro_id',
    maxUsers: 20,
    maxClients: 500,
    maxInvoices: 'unlimited',
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 199,
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || 'price_enterprise_id',
    maxUsers: 'unlimited',
    maxClients: 'unlimited',
    maxInvoices: 'unlimited',
  },
};

/**
 * Helper to get plan details by price ID.
 */
export function getPlanByPriceId(priceId: string): PlanType | null {
  for (const [plan, config] of Object.entries(PLANS)) {
    if (config.priceId === priceId) return plan as PlanType;
  }
  return null;
}
