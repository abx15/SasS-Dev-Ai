import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  color?: 'primary' | 'accent' | 'success' | 'warning';
  className?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  prefix = '', 
  suffix = '',
  color = 'primary',
  className 
}: StatsCardProps) {
  const isPositive = change >= 0;
  
  const colors = {
    primary: 'from-indigo-500/20 to-purple-500/5 text-indigo-400',
    accent: 'from-cyan-500/20 to-blue-500/5 text-cyan-400',
    success: 'from-emerald-500/20 to-teal-500/5 text-emerald-400',
    warning: 'from-amber-500/20 to-orange-500/5 text-amber-400',
  };

  return (
    <div className={cn(
      "relative overflow-hidden group p-7 rounded-[2rem] bg-brand-card/40 backdrop-blur-2xl border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:bg-brand-card/60 hover:border-white/10 shadow-2xl shadow-black/20",
      className
    )}>
      {/* Background Gradient Blob */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full bg-gradient-to-br",
        color === 'primary' ? 'from-indigo-500' : 
        color === 'accent' ? 'from-cyan-500' :
        color === 'success' ? 'from-emerald-500' : 'from-amber-500'
      )} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className={cn(
            "p-3.5 rounded-2xl bg-gradient-to-br transition-all duration-500 group-hover:rotate-6",
            colors[color]
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider",
            isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          )}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </div>
        </div>

        <h3 className="text-sm font-bold text-white/40 tracking-wide uppercase mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white tracking-tight">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </span>
        </div>
        
        <p className="mt-4 text-xs font-medium text-white/20 group-hover:text-white/40 transition-colors">
          vs. previous period
        </p>
      </div>
    </div>
  );
}
