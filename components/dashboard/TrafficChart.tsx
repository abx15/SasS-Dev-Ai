"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const MOCK_DATA = [
  { name: "Organic", value: 40, color: "hsl(220, 80%, 60%)" },
  { name: "Direct",  value: 25, color: "hsl(280, 70%, 60%)" },
  { name: "Referral",value: 20, color: "hsl(142, 72%, 50%)" },
  { name: "Social",  value: 15, color: "hsl(38, 90%, 56%)" },
];

export function TrafficChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Traffic Sources</h3>
        <p className="text-sm text-muted-foreground">Where visitors are coming from</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={MOCK_DATA}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {MOCK_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: unknown) => [`${value}%`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
