'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899'];

const TrafficChart = ({ data, className }: { data: any[], className?: string }) => {
  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border", className)}>
      <h3 className="text-xl font-bold text-foreground mb-8">Traffic Sources</h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="source" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#ffffff05' }}
              contentStyle={{ backgroundColor: '#111118', border: '1px solid #ffffff10', borderRadius: '16px' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;
