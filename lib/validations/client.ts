// Zod validation schema for Client creation/update
import { z } from "zod";

export const clientSchema = z.object({
  organizationId: z.string().cuid(),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PROSPECT", "CHURNED"]).default("ACTIVE"),
  notes: z.string().max(2000).optional(),
});

export const updateClientSchema = clientSchema.partial().required({ organizationId: true });

export type ClientInput = z.infer<typeof clientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
