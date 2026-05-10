"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const MOCK_DATA = [
  { date: "Mon", activeUsers: 420, newUsers: 45, sessions: 680 },
  { date: "Tue", activeUsers: 380, newUsers: 38, sessions: 590 },
  { date: "Wed", activeUsers: 510, newUsers: 62, sessions: 810 },
  { date: "Thu", activeUsers: 490, newUsers: 55, sessions: 780 },
  { date: "Fri", activeUsers: 560, newUsers: 70, sessions: 920 },
  { date: "Sat", activeUsers: 310, newUsers: 28, sessions: 490 },
  { date: "Sun", activeUsers: 290, newUsers: 22, sessions: 450 },
];

export function UserActivityChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">User Activity</h3>
        <p className="text-sm text-muted-foreground">Active users & sessions this week</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={MOCK_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Line type="monotone" dataKey="activeUsers" name="Active Users" stroke="hsl(220, 80%, 60%)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="sessions"    name="Sessions"     stroke="hsl(280, 70%, 60%)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
