// Global shared types for BizFlow AI

export type TrendDirection = "up" | "down" | "neutral";

export interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: TrendDirection;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
}

export interface PageHeaderAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export type PlanTier = "FREE" | "STARTER" | "PRO" | "ENTERPRISE";
