import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'LEAD', 'CHURNED']).default('LEAD'),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const invoiceSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  amount: z.number().min(0),
  tax: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  currency: z.string().default('USD'),
  dueDate: z.string().transform((str) => new Date(str)),
  items: z.array(z.object({
    description: z.string(),
    quantity: z.number().min(1),
    rate: z.number().min(0),
    amount: z.number().min(0),
  })).default([]),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

export const teamMemberSchema = z.object({
  email: z.string().email('Invalid email'),
  role: z.enum(['ADMIN', 'MANAGER', 'MEMBER', 'VIEWER']).default('MEMBER'),
  permissions: z.array(z.string()).default([]),
});
