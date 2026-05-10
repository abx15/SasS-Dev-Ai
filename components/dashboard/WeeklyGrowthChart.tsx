"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const MOCK_DATA = [
  { week: "W1", growth: 8.2 },
  { week: "W2", growth: 12.5 },
  { week: "W3", growth: 9.8 },
  { week: "W4", growth: 18.3 },
];

export function WeeklyGrowthChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Weekly Growth</h3>
        <p className="text-sm text-muted-foreground">Revenue growth % per week</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={MOCK_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip
            contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
            formatter={(v: unknown) => [`${v}%`, "Growth"]}
          />
          <Bar dataKey="growth" name="Growth" fill="hsl(220, 80%, 60%)" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
