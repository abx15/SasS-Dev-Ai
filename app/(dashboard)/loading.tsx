import { SkeletonCard, SkeletonChart, SkeletonTable } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col gap-2 mb-8">
        <div className="h-10 w-64 bg-muted rounded-xl" />
        <div className="h-4 w-96 bg-muted rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkeletonChart />
        </div>
        <div className="bg-card rounded-[2.5rem] p-8 border border-border space-y-4">
           <div className="h-6 w-32 bg-muted rounded-lg" />
           <div className="space-y-3">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="h-20 bg-muted rounded-2xl" />
             ))}
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      <SkeletonTable rows={8} />
    </div>
  );
}
