// Zod validation schema for Team member invitation/update
import { z } from "zod";

export const teamSchema = z.object({
  organizationId: z.string().cuid(),
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]).default("MEMBER"),
  name: z.string().max(100).optional(),
});

export const updateTeamMemberSchema = z.object({
  memberId: z.string().cuid(),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]),
});

export type TeamInviteInput = z.infer<typeof teamSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
