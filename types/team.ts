// Team TypeScript types

export type TeamRole = "OWNER" | "ADMIN" | "MANAGER" | "MEMBER" | "VIEWER";

export interface TeamMember {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: TeamRole;
  joinedAt: string;
  lastActiveAt?: string;
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: TeamRole;
  invitedBy: string;
  expiresAt: string;
  status: "PENDING" | "ACCEPTED" | "EXPIRED";
}

export const ROLE_PERMISSIONS: Record<TeamRole, string[]> = {
  OWNER:  ["*"],
  ADMIN:  ["manage_team", "manage_clients", "manage_invoices", "view_analytics", "manage_billing"],
  MANAGER: ["manage_clients", "manage_invoices", "view_analytics", "view_team"],
  MEMBER: ["manage_clients", "view_analytics"],
  VIEWER: ["view_analytics"],
};

export const ROLE_BADGE_COLORS: Record<TeamRole, string> = {
  OWNER:  "bg-purple-500/10 text-purple-500",
  ADMIN:  "bg-blue-500/10 text-blue-500",
  MANAGER: "bg-amber-500/10 text-amber-500",
  MEMBER: "bg-green-500/10 text-green-500",
  VIEWER: "bg-gray-500/10 text-gray-500",
};
