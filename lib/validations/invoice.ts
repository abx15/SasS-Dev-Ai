// Zod validation schema for Invoice creation/update
import { z } from "zod";

export const lineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  total: z.number().positive(),
});

export const invoiceSchema = z.object({
  organizationId: z.string().cuid(),
  clientId: z.string().cuid(),
  status: z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELED"]).default("DRAFT"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().length(3).default("USD"),
  dueDate: z.string().datetime(),
  lineItems: z.array(lineItemSchema).min(1, "At least one line item required"),
  notes: z.string().max(1000).optional(),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type LineItemInput = z.infer<typeof lineItemSchema>;
