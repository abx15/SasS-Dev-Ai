'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SkeletonTable } from '../shared/Skeletons';
import { VerticalSwiper } from '../shared/SwiperCarousel';

interface Activity {
  id: string;
  action: string;
  user: { name: string; avatar?: string };
  entity: string;
  time: Date;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

interface RecentActivityTableProps {
  activities: Activity[];
  loading?: boolean;
  className?: string;
}

const RecentActivityTable = ({ activities, loading = false, className }: RecentActivityTableProps) => {
  if (loading) return <div className={cn("p-8 rounded-[2.5rem] bg-card border border-border", className)}><SkeletonTable /></div>;

  const slides = activities.map((activity) => (
    <div key={activity.id} className="p-4 bg-white/[0.02] border border-border rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
          {activity.user.name.charAt(0)}
        </div>
        <div>
          <p className="text-foreground text-sm font-bold">{activity.action}</p>
          <p className="text-gray-500 text-xs">{activity.user.name} • {activity.entity}</p>
        </div>
      </div>
      <span className={cn(
        "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
        activity.status === 'SUCCESS' ? "bg-green-500/10 text-green-500" :
        activity.status === 'PENDING' ? "bg-orange-500/10 text-orange-500" :
        "bg-red-500/10 text-red-500"
      )}>
        {activity.status}
      </span>
    </div>
  ))

  return (
    <div className={cn("p-8 rounded-[2.5rem] bg-muted backdrop-blur-xl border border-border", className)}>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-foreground">Live Activity</h3>
        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      
      <VerticalSwiper slides={slides} />
    </div>
  );
};

export default RecentActivityTable;
