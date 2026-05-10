"use client";

import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

const MOCK_DATA = [
  { name: "Enterprise", value: 85, fill: "hsl(280, 70%, 60%)" },
  { name: "Pro",        value: 65, fill: "hsl(220, 80%, 60%)" },
  { name: "Starter",    value: 45, fill: "hsl(142, 72%, 50%)" },
  { name: "Free",       value: 25, fill: "hsl(38, 90%, 56%)" },
];

export function SubscriptionChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Subscriptions</h3>
        <p className="text-sm text-muted-foreground">Distribution by plan</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="80%"
          data={MOCK_DATA}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar dataKey="value" cornerRadius={4} />
          <Legend iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
