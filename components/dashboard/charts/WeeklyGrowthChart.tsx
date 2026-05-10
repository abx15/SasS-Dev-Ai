'use client';

import React from 'react';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer,
  PolarAngleAxis
} from 'recharts';
import { cn } from '@/lib/utils';

const WeeklyGrowthChart = ({ percentage, className }: { percentage: number, className?: string }) => {
  const data = [{ name: 'Growth', value: percentage, fill: '#6366f1' }];

  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border flex flex-col items-center justify-center", className)}>
      <h3 className="text-lg font-bold text-foreground mb-4 text-center">Weekly Growth</h3>
      
      <div className="h-[200px] w-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="80%" 
            outerRadius="100%" 
            data={data} 
            startAngle={90} 
            endAngle={90 + (360 * percentage / 100)}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: '#ffffff05' }}
              dataKey="value"
              cornerRadius={30}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-foreground">{percentage}%</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Growth</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyGrowthChart;
