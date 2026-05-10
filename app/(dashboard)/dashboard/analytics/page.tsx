'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  Target,
  Zap,
  Filter
} from 'lucide-react';
import RevenueChart from '@/components/dashboard/charts/RevenueChart';
import UserActivityChart from '@/components/dashboard/charts/UserActivityChart';
import TrafficChart from '@/components/dashboard/charts/TrafficChart';
import WeeklyGrowthChart from '@/components/dashboard/charts/WeeklyGrowthChart';
import SubscriptionChart from '@/components/dashboard/charts/SubscriptionChart';
import { cn } from '@/lib/utils';
import { useRole } from '@/hooks/useRole';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const LottieLoader = ({ url, className }: { url: string, className?: string }) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error loading lottie:", err));
  }, [url]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={true} className={className} />;
};

const timeRanges = ['7d', '30d', '90d', '12m', 'Custom'];

export default function AnalyticsPage() {
  const [activeRange, setActiveRange] = useState('30d');
  const { role: currentRole } = useRole();

  const isFullAccess = ['OWNER', 'ADMIN', 'MANAGER'].includes(currentRole);

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-2 text-glow-primary">Analytics Engine</h1>
          <p className="text-muted-foreground font-medium">Deep-dive into your business performance metrics.</p>
        </div>
        {isFullAccess && (
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-muted hover:bg-muted text-muted-foreground hover:text-foreground px-5 py-3 rounded-2xl font-bold border border-border transition-all">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 bg-primary hover:bg-primary/20 text-primary-foreground px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all group">
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              <span>AI Audit</span>
            </button>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-card p-4 rounded-3xl border border-border">
        <div className="flex bg-muted rounded-2xl p-1 w-full lg:w-auto">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={cn(
                "flex-1 lg:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                activeRange === range ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4 w-full lg:w-auto">
           <div className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-xl text-muted-foreground border border-border cursor-pointer hover:text-foreground">
              <Calendar size={16} />
              <span className="text-xs font-bold">May 1, 2024 - May 31, 2024</span>
           </div>
           <button className="p-2.5 bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors border border-border">
              <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Top Metrics Grid - Only for Full Access */}
      {isFullAccess ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'MRR Growth', value: '+14.2%', icon: TrendingUp, color: 'text-primary' },
            { label: 'Avg LTV', value: '$2,840', icon: Target, color: 'text-accent' },
            { label: 'Burn Rate', value: '$4.2k', icon: Zap, color: 'text-orange-500' },
            { label: 'ROI Index', value: '4.8x', icon: ArrowUpRight, color: 'text-green-500' },
          ].map((metric) => (
            <div key={metric.label} className="p-6 rounded-[2.5rem] bg-card border border-border flex items-center space-x-4">
              <div className={cn("p-3 rounded-2xl bg-muted", metric.color)}>
                <metric.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-xl font-black text-foreground">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-[2.5rem] bg-card border border-border text-center">
          <p className="text-muted-foreground font-medium italic">Basic metrics overview provided for {currentRole} role.</p>
        </div>
      )}

      {/* Main Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <RevenueChart 
          className="lg:col-span-2" 
          data={[
            { month: 'Jan', revenue: 45000 },
            { month: 'Feb', revenue: 52000 },
            { month: 'Mar', revenue: 48000 },
            { month: 'Apr', revenue: 61000 },
            { month: 'May', revenue: 75000 },
          ]} 
        />
        <WeeklyGrowthChart percentage={78} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <UserActivityChart data={[]} />
        <TrafficChart data={[
          { source: 'Organic', value: 4500 },
          { source: 'Direct', value: 3200 },
          { source: 'Social', value: 2800 },
          { source: 'Referral', value: 1500 },
        ]} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <SubscriptionChart 
          className="lg:col-span-1"
          data={[
            { name: 'Starter', value: 40 },
            { name: 'Pro', value: 35 },
            { name: 'Enterprise', value: 25 },
          ]} 
        />
        {isFullAccess ? (
          <div className="lg:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-border flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-3xl font-black text-foreground mb-4">Predictive Analysis</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                Based on your current trajectory, your organization is projected to reach <span className="text-primary font-bold">$1M ARR</span> by December 2024. 
                Optimizing your 'Starter' to 'Pro' conversion could accelerate this by 45 days.
              </p>
              <button className="w-fit bg-muted hover:bg-muted text-foreground font-bold px-8 py-4 rounded-2xl transition-all border border-border">
                  Run Simulation
              </button>
            </div>
            <div className="w-48 h-48 opacity-40 grayscale">
                <LottieLoader url="https://cdn.jsdelivr.net/gh/airbnb/lottie-web@master/demo/ad_v2/data.json" className="w-full h-full" />
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 p-10 rounded-[3rem] bg-card border border-border flex items-center justify-center text-center">
             <div className="max-w-md">
               <Zap className="text-primary mx-auto mb-4" size={40} />
               <h3 className="text-2xl font-black text-foreground mb-2">Upgrade for Predictions</h3>
               <p className="text-muted-foreground text-sm">Predictive analysis and simulations are available for Management roles.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
