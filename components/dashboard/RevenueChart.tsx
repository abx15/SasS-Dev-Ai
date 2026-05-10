"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

// Placeholder data — replace with real API data via useAnalytics hook
const MOCK_DATA = [
  { month: "Jan", revenue: 31000, expenses: 18000, profit: 13000 },
  { month: "Feb", revenue: 28000, expenses: 16500, profit: 11500 },
  { month: "Mar", revenue: 35000, expenses: 19000, profit: 16000 },
  { month: "Apr", revenue: 40000, expenses: 21000, profit: 19000 },
  { month: "May", revenue: 38000, expenses: 20000, profit: 18000 },
  { month: "Jun", revenue: 45000, expenses: 22000, profit: 23000 },
  { month: "Jul", revenue: 48000, expenses: 23000, profit: 25000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Revenue Overview</h3>
        <p className="text-sm text-muted-foreground">Revenue, expenses & profit</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={MOCK_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(220, 80%, 60%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(220, 80%, 60%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="profit-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 72%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(142, 72%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(220, 80%, 60%)" fill="url(#revenue-gradient)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="profit"  name="Profit"  stroke="hsl(142, 72%, 50%)" fill="url(#profit-gradient)"   strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
