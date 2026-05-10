// Analytics-specific TypeScript types

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface UserActivityDataPoint {
  date: string;
  activeUsers: number;
  newUsers: number;
  sessions: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyGrowthDataPoint {
  week: string;
  growth: number;
}

export interface SubscriptionBreakdown {
  plan: string;
  count: number;
  revenue: number;
  color: string;
}

export interface AnalyticsDashboard {
  totalRevenue: number;
  revenueChange: number;
  activeClients: number;
  clientsChange: number;
  openInvoices: number;
  paidInvoices: number;
  monthlyGrowth: number;
  revenueByMonth: RevenueDataPoint[];
  userActivity: UserActivityDataPoint[];
  trafficSources: TrafficSource[];
  subscriptionBreakdown: SubscriptionBreakdown[];
}
