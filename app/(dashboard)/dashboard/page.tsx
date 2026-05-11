'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Users, FileText, Zap, 
  ArrowUpRight, ArrowDownRight, Sparkles,
  Plus, Calendar, Search, Bell, ChevronRight
} from 'lucide-react'
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'
import { VerticalSwiper } from '@/components/shared/swipers/VerticalSwiper'
import { toast } from 'sonner'

const chartData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
]

const recentActivity = [
  { text: "Invoice #INV-1020 created", time: "2m ago", color: "bg-indigo-500" },
  { text: "New client 'TechCorp' added", time: "15m ago", color: "bg-emerald-500" },
  { text: "AI Report generated successfully", time: "1h ago", color: "bg-violet-500" },
  { text: "Subscription plan upgraded to Pro", time: "3h ago", color: "bg-amber-500" },
  { text: "Member 'Sarah' joined the team", time: "5h ago", color: "bg-cyan-500" },
]

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 skeleton h-80 rounded-2xl" />
          <div className="skeleton h-80 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-1">Good morning, Arun 👋</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Monday, November 11, 2024
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => toast.info('New Invoice')} className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-xl transition-colors border border-border text-sm font-medium">
            <Plus className="w-4 h-4" /> New Invoice
          </button>
          <button onClick={() => toast.info('Add Client')} className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-xl transition-colors border border-border text-sm font-medium">
            <Plus className="w-4 h-4" /> Add Client
          </button>
          <button onClick={() => toast.info('Generating AI Report')} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-sm font-bold">
            <Sparkles className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$48,291', change: '+12.5%', trend: 'up', icon: BarChart3, color: 'text-indigo-500' },
          { label: 'Active Users', value: '1,249', change: '+8.1%', trend: 'up', icon: Users, color: 'text-emerald-500' },
          { label: 'Total Sales', value: '384', change: '+5.2%', trend: 'up', icon: FileText, color: 'text-violet-500' },
          { label: 'Conversion Rate', value: '3.24%', change: '+0.3%', trend: 'up', icon: Zap, color: 'text-cyan-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 group cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-muted group-hover:bg-accent transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-foreground">Revenue Overview</h3>
            <select className="bg-muted border border-border rounded-lg px-2 py-1 text-xs focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insights Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 glass-card p-6 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-primary/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">AI Insights</h3>
            </div>
            <button className="text-xs font-semibold text-primary hover:underline">Refresh</button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Growth Opportunity", text: "Revenue from 'SaaS' category is up 24% this week.", icon: Zap, color: "text-amber-500" },
              { title: "Churn Alert", text: "3 high-value clients haven't logged in for 10 days.", icon: AlertCircle, color: "text-rose-500" },
              { title: "Smart Suggestion", text: "Optimize Q4 tax by reconciling invoices now.", icon: FileText, color: "text-indigo-500" },
            ].map((insight, i) => (
              <div key={i} className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg bg-muted`}>
                    <insight.icon className={`w-3.5 h-3.5 ${insight.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground mb-0.5">{insight.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Swiper */}
        <div className="lg:col-span-6 glass-card p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-foreground mb-6">Recent Activity</h3>
          <VerticalSwiper 
            height="220px"
            slides={recentActivity.map((act, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${act.color}`} />
                  <span className="text-sm text-foreground">{act.text}</span>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase">{act.time}</span>
              </div>
            ))}
          />
        </div>

        {/* Top Clients Mini-table */}
        <div className="lg:col-span-6 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Top Clients</h3>
            <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-4">
            {[
              { name: "TechCorp Solutions", revenue: "$12,400", status: "Active" },
              { name: "Apex Digital Agency", revenue: "$8,200", status: "Active" },
              { name: "NexaScale Inc", revenue: "$6,500", status: "Away" },
              { name: "CloudBase Systems", revenue: "$4,100", status: "Active" },
            ].map((client, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 text-xs font-bold">
                    {client.name[0]}
                  </div>
                  <span className="text-sm font-medium text-foreground">{client.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{client.revenue}</p>
                  <span className="text-[10px] text-muted-foreground">{client.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Add simple AlertCircle icon mock if lucide-react doesn't export it under that name or if needed
const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)
