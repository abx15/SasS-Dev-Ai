// Invoice TypeScript types

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELED";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  status: InvoiceStatus;
  amount: number;
  currency: string;
  dueDate: string;
  paidAt: string | null;
  lineItems: LineItem[];
  notes?: string;
  client: {
    id: string;
    name: string;
    email: string;
    company?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceSummary {
  total: number;
  draft: number;
  sent: number;
  paid: number;
  overdue: number;
  totalRevenue: number;
}

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT:    "bg-gray-500/10 text-gray-500",
  SENT:     "bg-blue-500/10 text-blue-500",
  PAID:     "bg-green-500/10 text-green-500",
  OVERDUE:  "bg-red-500/10 text-red-500",
  CANCELED: "bg-orange-500/10 text-orange-500",
};
