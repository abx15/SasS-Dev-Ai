// Client TypeScript types

export type ClientStatus = "ACTIVE" | "INACTIVE" | "PROSPECT" | "CHURNED";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: ClientStatus;
  totalRevenue: number;
  notes?: string;
  invoiceCount?: number;
  lastActivityAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const CLIENT_STATUS_COLORS: Record<ClientStatus, string> = {
  ACTIVE:   "bg-green-500/10 text-green-500",
  INACTIVE: "bg-gray-500/10 text-gray-500",
  PROSPECT: "bg-blue-500/10 text-blue-500",
  CHURNED:  "bg-red-500/10 text-red-500",
};
