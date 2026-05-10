'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp,
  Zap,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  LayoutDashboard
} from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import RevenueChart from '@/components/dashboard/charts/RevenueChart';
import AISuggestionsWidget from '@/components/dashboard/AISuggestionsWidget';
import UserActivityChart from '@/components/dashboard/charts/UserActivityChart';
import SubscriptionChart from '@/components/dashboard/charts/SubscriptionChart';
import RecentActivityTable from '@/components/dashboard/RecentActivityTable';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import { SkeletonCard, SkeletonChart } from '@/components/shared/Skeletons';
import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/useRole';
import { cn } from '@/lib/utils';
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

const fetchDashboardData = async () => {
  const res = await fetch('/api/analytics?organizationId=default&days=30');
  if (!res.ok) throw new Error('Failed to fetch dashboard data');
  return res.json();
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  const { user, role: currentRole, isLoading: isRoleLoading } = useRole();
  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
  });

  const isLoading = isRoleLoading || isDataLoading;

  if (isLoading) {
    return (
      <div className="space-y-8 p-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><SkeletonChart /></div>
          <div><SkeletonCard /></div>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    { 
      title: 'Total Revenue', 
      value: data?.summary?.totalRevenue || 124500, 
      change: 12.5, 
      icon: DollarSign, 
      prefix: '$',
      color: 'primary' as const,
      roles: ['OWNER', 'ADMIN', 'MANAGER']
    },
    { 
      title: 'New Clients', 
      value: data?.summary?.totalNewClients || 48, 
      change: 8.2, 
      icon: Users, 
      color: 'accent' as const,
      roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER']
    },
    { 
      title: 'Invoices Paid', 
      value: data?.summary?.totalInvoicesPaid || 156, 
      change: 14.1, 
      icon: BarChart3, 
      color: 'success' as const,
      roles: ['OWNER', 'ADMIN', 'MANAGER']
    },
    { 
      title: 'AI Usage', 
      value: 1284, 
      change: 22.4, 
      icon: Zap, 
      color: 'warning' as const,
      roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER']
    },
  ].filter(stat => stat.roles.includes(currentRole));

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-8 space-y-10 max-w-[1600px] mx-auto"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants} className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600/10 via-background to-cyan-500/10 border border-white/5">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <LayoutDashboard size={200} className="text-indigo-500" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Sparkles size={18} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400/80">Business Overview</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-3">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">{user?.firstName || 'Business Owner'}</span>
            </h1>
            <p className="text-muted-foreground font-medium text-lg max-w-xl">
              Your ecosystem is thriving. You've hit <span className="text-foreground font-bold">92%</span> of your monthly target with <span className="text-emerald-400 font-bold">15%</span> accelerated growth.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-bold h-14 px-8 backdrop-blur-xl transition-all">
              Export Analysis
            </Button>
            <Button className="rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black h-14 px-8 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] flex items-center gap-3 group transition-all">
              <Zap className="h-5 w-5 fill-white" />
              Generate AI Report
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="h-full rounded-[2.5rem] p-1 bg-gradient-to-br from-white/10 to-transparent">
            <RevenueChart 
              data={data?.chartData || []} 
              className="h-full bg-brand-card/80 backdrop-blur-3xl rounded-[2.4rem]"
            />
          </div>
        </motion.div>
        
        {/* AI Sidebar - Hidden for Viewer */}
        {['OWNER', 'ADMIN', 'MANAGER', 'MEMBER'].includes(currentRole) && (
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 p-6 flex items-center justify-center overflow-hidden h-48 relative">
              <div className="absolute inset-0 opacity-20">
                <LottieLoader url="https://cdn.jsdelivr.net/gh/airbnb/lottie-web@master/demo/ad_v2/data.json" className="w-full h-full" />
              </div>
              <div className="relative z-10 text-center">
                <h4 className="text-lg font-bold text-indigo-400 mb-1">AI Engine Active</h4>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Optimizing Workflow...</p>
              </div>
            </div>
            <AISuggestionsWidget 
              suggestions={[
                { id: '1', type: 'insight', text: 'Enterprise clients increased by 20% this week.', cta: 'View Details' },
                { id: '2', type: 'action', text: 'Invoice #1024 is overdue. Send a reminder?', cta: 'Send Now' },
                { id: '3', type: 'alert', text: 'Server cost expected to rise next month.', cta: 'Optimize' },
              ]}
            />
            <CalendarWidget 
              events={[
                { date: new Date(), type: 'invoice' },
                { date: new Date(Date.now() + 86400000), type: 'meeting' },
              ]}
            />
          </motion.div>
        )}
      </div>

      {/* Secondary Data Grid - Restricted for Viewer/Member */}
      {['OWNER', 'ADMIN', 'MANAGER'].includes(currentRole) && (
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <RecentActivityTable 
              activities={[
                { id: '1', action: 'Invoice Paid', user: { name: 'Sarah J.' }, entity: 'Invoice #1024', time: new Date(), status: 'SUCCESS' },
                { id: '2', action: 'New Client Created', user: { name: 'Mike C.' }, entity: 'TechFlow Inc.', time: new Date(Date.now() - 3600000), status: 'SUCCESS' },
                { id: '3', action: 'Subscription Upgrade', user: { name: 'Alex M.' }, entity: 'Pro Plan', time: new Date(Date.now() - 7200000), status: 'SUCCESS' },
                { id: '4', action: 'Payment Failed', user: { name: 'David L.' }, entity: 'Invoice #1021', time: new Date(Date.now() - 86400000), status: 'FAILED' },
                { id: '5', action: 'Report Generated', user: { name: 'AI Bot' }, entity: 'Growth Analysis', time: new Date(Date.now() - 172800000), status: 'SUCCESS' },
              ]}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="rounded-[2.5rem] p-8 bg-brand-card/40 border border-white/5 backdrop-blur-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Users className="text-indigo-400" size={20} />
                User Engagement
              </h3>
              <UserActivityChart 
                data={[
                  { day: 'Mon', active: 400, new: 240 },
                  { day: 'Tue', active: 300, new: 139 },
                  { day: 'Wed', active: 200, new: 980 },
                  { day: 'Thu', active: 278, new: 390 },
                  { day: 'Fri', active: 189, new: 480 },
                  { day: 'Sat', active: 239, new: 380 },
                  { day: 'Sun', active: 349, new: 430 },
                ]} 
              />
            </div>
            <div className="rounded-[2.5rem] p-8 bg-brand-card/40 border border-white/5 backdrop-blur-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-cyan-400" size={20} />
                Growth Distribution
              </h3>
              <SubscriptionChart 
                data={[
                  { name: 'Free', value: 400 },
                  { name: 'Starter', value: 300 },
                  { name: 'Pro', value: 300 },
                  { name: 'Enterprise', value: 200 },
                ]} 
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
