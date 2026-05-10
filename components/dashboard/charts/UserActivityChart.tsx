'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

interface UserActivityChartProps {
  data: any[];
  className?: string;
}

const UserActivityChart = ({ data, className }: UserActivityChartProps) => {
  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border", className)}>
      <h3 className="text-xl font-bold text-foreground mb-8">User Engagement</h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111118', border: '1px solid #ffffff10', borderRadius: '16px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Line 
              type="monotone" 
              dataKey="active" 
              name="Active Users"
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#111118' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="new" 
              name="New Signups"
              stroke="#06b6d4" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#111118' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserActivityChart;
