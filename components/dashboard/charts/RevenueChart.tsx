'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/lib/utils';

interface RevenueChartProps {
  data: any[];
  className?: string;
}

const RevenueChart = ({ data, className }: RevenueChartProps) => {
  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border", className)}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-foreground">Revenue Performance</h3>
          <p className="text-sm text-muted-foreground">Overview of your monthly growth</p>
        </div>
        <select className="bg-muted border border-border rounded-xl px-4 py-2 text-xs font-bold text-foreground outline-none">
          <option>Last 12 Months</option>
          <option>Last 6 Months</option>
        </select>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff40', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff40', fontSize: 12 }} 
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#111118', 
                border: '1px solid #ffffff10', 
                borderRadius: '16px',
                color: '#fff'
              }}
              itemStyle={{ color: '#6366f1' }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
