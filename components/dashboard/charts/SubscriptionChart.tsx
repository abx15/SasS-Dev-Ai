'use client';

import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { cn } from '@/lib/utils';

const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899'];

const SubscriptionChart = ({ data, className }: { data: any[], className?: string }) => {
  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border", className)}>
      <h3 className="text-xl font-bold text-foreground mb-8">Plan Distribution</h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ backgroundColor: '#111118', border: '1px solid #ffffff10', borderRadius: '16px' }}
            />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionChart;
