import React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted/20', className)}
      {...props}
    />
  );
};

export const SkeletonCard = () => (
  <div className="p-6 rounded-3xl bg-brand-card/50 border border-white/5 space-y-4">
    <div className="flex justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-4 w-20" />
  </div>
);

export const SkeletonChart = () => (
  <div className="p-8 rounded-3xl bg-brand-card/50 border border-white/5 h-[350px] flex items-end space-x-2">
    {[...Array(12)].map((_, i) => (
      <Skeleton 
        key={i} 
        className="flex-1" 
        style={{ height: `${Math.random() * 80 + 20}%` }} 
      />
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 py-3 border-b border-white/5">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-3 w-[20%]" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);
