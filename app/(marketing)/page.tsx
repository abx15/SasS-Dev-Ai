'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CoverflowSwiper } from '@/components/shared/swipers/CoverflowSwiper'
import { CubeSwiper } from '@/components/shared/swipers/CubeSwiper'
import Link from 'next/link'
import {
  BarChart3, Bot, FileText, Users, Shield, CreditCard,
  ArrowRight, Play, CheckCircle2, TrendingUp, Zap, Star,
  ChevronRight, Globe, Lock, Activity
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

gsap.registerPlugin(ScrollTrigger)

// Sample chart data
const chartData = [
  { month: 'Jan', revenue: 18000 },
  { month: 'Feb', revenue: 22000 },
  { month: 'Mar', revenue: 19500 },
  { month: 'Apr', revenue: 28000 },
  { month: 'May', revenue: 32000 },
  { month: 'Jun', revenue: 38000 },
  { month: 'Jul', revenue: 42000 },
  { month: 'Aug', revenue: 39000 },
  { month: 'Sep', revenue: 48000 },
  { month: 'Oct', revenue: 52000 },
  { month: 'Nov', revenue: 58000 },
  { month: 'Dec', revenue: 64000 },
]

// Features data
const features = [
  { icon: BarChart3, title: 'Revenue Analytics', desc: 'Real-time revenue tracking with AI-powered predictions and trend analysis', color: 'from-indigo-500 to-violet-500' },
  { icon: Bot, title: 'AI Reports', desc: 'Generate comprehensive business reports in seconds using GPT-4', color: 'from-violet-500 to-purple-500' },
  { icon: FileText, title: 'Invoice System', desc: 'Create, send, and auto-track invoices with Stripe payment integration', color: 'from-cyan-500 to-blue-500' },
  { icon: Users, title: 'CRM & Clients', desc: 'Manage all client relationships, deals, and communications in one place', color: 'from-emerald-500 to-teal-500' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Granular permissions system — Owner, Admin, Manager, Member, Viewer', color: 'from-orange-500 to-amber-500' },
  { icon: CreditCard, title: 'Subscription Billing', desc: 'Seamless Stripe billing with plan management and usage tracking', color: 'from-pink-500 to-rose-500' },
]

// Testimonials
const testimonials = [
  { name: 'Sarah K.', role: 'CEO', company: 'TechCorp Solutions', text: 'BizFlow transformed how we manage our $2M business. The AI insights alone saved us 20 hours per week.', rating: 5, initials: 'SK', color: 'from-indigo-500 to-violet-500' },
  { name: 'Marcus J.', role: 'Founder', company: 'Apex Digital', text: 'The invoice system is incredibly smooth. We get paid 40% faster now with automated reminders.', rating: 5, initials: 'MJ', color: 'from-cyan-500 to-blue-500' },
  { name: 'Priya M.', role: 'COO', company: 'NexaScale Inc', text: 'Best SaaS investment we have made. ROI in 2 weeks. The team management features are unmatched.', rating: 5, initials: 'PM', color: 'from-emerald-500 to-teal-500' },
  { name: 'Alex R.', role: 'CFO', company: 'CloudBase', text: 'Revenue analytics with AI predictions gave us a clear roadmap for Q4. Incredible product.', rating: 5, initials: 'AR', color: 'from-orange-500 to-amber-500' },
  { name: 'Jordan T.', role: 'MD', company: 'Velocity Corp', text: 'Our team productivity increased 40% after switching. The dashboard is beautiful and intuitive.', rating: 5, initials: 'JT', color: 'from-pink-500 to-rose-500' },
]

// Stats
const stats = [
  { value: 2.4, suffix: 'M+', label: 'Revenue Tracked', prefix: '$' },
  { value: 10, suffix: 'K+', label: 'Active Businesses' },
  { value: 50, suffix: 'K+', label: 'Invoices Generated' },
  { value: 98.7, suffix: '%', label: 'Satisfaction Rate' },
]

// Integrations
const integrations = ['Stripe', 'OpenAI', 'Slack', 'Google', 'GitHub', 'Notion', 'Salesforce', 'HubSpot', 'Zapier', 'Twilio']

function CountUp({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!inView || !ref.current) return
    let start = 0
    const duration = 2000
    const step = (end / duration) * 16
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      if (ref.current) ref.current.textContent = `${prefix}${start.toFixed(start < 10 ? 1 : 0)}${suffix}`
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, prefix, suffix])
  
  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default function LandingPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    // GSAP hero entrance
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
      gsap.from('.hero-title', { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' })
      gsap.from('.hero-ctas', { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' })
      gsap.from('.hero-preview', { y: 60, opacity: 0, duration: 1.2, delay: 0.8, ease: 'power3.out' })
      
      // Features stagger on scroll
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
      })
      
      // Stats counter section
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: '.stats-bar', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen bg-background overflow-hidden">
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-500/15 dark:bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          AI-Powered Business Management Platform
          <ChevronRight className="w-4 h-4" />
        </div>
        
        {/* Headline */}
        <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight max-w-5xl mb-6 text-foreground">
          Manage Your Business<br />
          <span className="gradient-text">With AI Intelligence</span>
        </h1>
        
        {/* Subheading */}
        <p className="hero-sub text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          All-in-one platform for modern businesses. Revenue analytics, team management, invoicing, CRM, and AI-powered insights — all in one beautiful dashboard.
        </p>
        
        {/* Trust badges */}
        <div className="hero-ctas flex flex-wrap items-center justify-center gap-6 mb-10">
          {[
            { icon: Lock, text: '256-bit SSL' },
            { icon: Shield, text: 'SOC2 Compliant' },
            { icon: Activity, text: '99.9% Uptime' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-emerald-500" />
              {text}
            </div>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/sign-up">
            <motion.button
              className="px-8 py-4 rounded-xl font-semibold text-white animated-gradient shadow-lg shadow-indigo-500/25 flex items-center gap-2 text-base"
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <motion.button
            className="px-8 py-4 rounded-xl font-semibold border border-border bg-card text-foreground flex items-center gap-2 text-base hover:bg-accent transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Play className="w-3 h-3 text-primary fill-primary" />
            </div>
            Watch Demo
          </motion.button>
        </div>
        
        {/* Dashboard Preview Mockup */}
        <motion.div
          className="hero-preview relative w-full max-w-5xl mx-auto"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative rounded-2xl border border-border/50 bg-card shadow-2xl shadow-black/20 overflow-hidden glow-card">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 h-6 rounded bg-background/80 flex items-center px-3">
                <span className="text-xs text-muted-foreground">app.bizflow.ai/dashboard</span>
              </div>
            </div>
            {/* Fake dashboard */}
            <div className="p-6 bg-background">
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Revenue', value: '$48,291', change: '+12.5%', color: 'text-indigo-500' },
                  { label: 'Users', value: '1,249', change: '+8.1%', color: 'text-emerald-500' },
                  { label: 'Sales', value: '384', change: '+5.2%', color: 'text-violet-500' },
                  { label: 'Conversion', value: '3.24%', change: '+0.3%', color: 'text-cyan-500' },
                ].map(stat => (
                  <div key={stat.label} className="glass-card p-4 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className={`text-xs font-medium ${stat.color}`}>{stat.change} ↑</p>
                  </div>
                ))}
              </div>
              {/* Chart area */}
              <div className="glass-card p-4 rounded-xl h-48">
                <p className="text-sm font-medium text-foreground mb-2">Revenue Overview</p>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#heroGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Glow beneath */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-indigo-500/20 blur-2xl rounded-full" />
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="stats-bar py-16 border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <p className="text-4xl font-bold text-foreground">
                <CountUp end={stat.value} prefix={stat.prefix ?? ''} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground text-sm mb-4">
            <Zap className="w-3 h-3" /> Everything you need
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for <span className="gradient-text">Modern Business</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature designed to save time, reduce friction, and grow your revenue.
          </p>
        </div>
        
        {/* Desktop grid */}
        <div className="features-grid hidden md:grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card glass-card p-6 rounded-2xl group cursor-default"
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Coverflow Swiper */}
        <div className="md:hidden">
          <CoverflowSwiper
            slides={features.map((f, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          />
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW with CubeSwiper ─── */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground text-sm mb-6">
              <BarChart3 className="w-3 h-3" /> Live Dashboard
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              See Everything <span className="gradient-text">at a Glance</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Your entire business on one screen. Real-time metrics, AI insights, and actionable analytics — all beautifully organized.
            </p>
            {['Revenue tracking with AI predictions', 'Team performance analytics', 'Client health scoring', 'Automated invoice reminders'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-foreground text-sm">{item}</span>
              </div>
            ))}
            <Link href="/sign-up">
              <motion.button
                className="mt-8 px-6 py-3 rounded-xl font-semibold text-white animated-gradient flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
          
          {/* CubeSwiper showing 3 dashboard views */}
          <div className="max-w-sm mx-auto w-full">
            <CubeSwiper
              slides={[
                /* Slide 1: Revenue View */
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-indigo-500" /> Revenue Analytics</p>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.slice(-6)}>
                        <defs><linearGradient id="cubeGrad1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                        <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#cubeGrad1)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-2">$64,000</p>
                  <p className="text-sm text-emerald-500">↑ 34% this month</p>
                </div>,
                /* Slide 2: Team View */
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-violet-500" /> Team Overview</p>
                  {[{ name: 'Sarah K.', role: 'Manager', tasks: 12, color: 'from-indigo-500 to-violet-500' }, { name: 'Alex R.', role: 'Developer', tasks: 8, color: 'from-cyan-500 to-blue-500' }, { name: 'Mike J.', role: 'Designer', tasks: 6, color: 'from-emerald-500 to-teal-500' }].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold`}>{m.name[0]}</div>
                      <div className="flex-1"><p className="text-sm font-medium text-foreground">{m.name}</p><p className="text-xs text-muted-foreground">{m.role}</p></div>
                      <span className="text-xs text-muted-foreground">{m.tasks} tasks</span>
                    </div>
                  ))}
                </div>,
                /* Slide 3: Invoice View */
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-cyan-500" /> Recent Invoices</p>
                  {[{ id: 'INV-1020', client: 'TechCorp', amount: '$9,440', status: 'PAID', color: 'text-emerald-500 bg-emerald-500/10' }, { id: 'INV-1019', client: 'Apex Digital', amount: '$5,200', status: 'SENT', color: 'text-blue-500 bg-blue-500/10' }, { id: 'INV-1018', client: 'NexaScale', amount: '$3,800', status: 'OVERDUE', color: 'text-red-500 bg-red-500/10' }].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between mb-3">
                      <div><p className="text-sm font-medium text-foreground">{inv.id}</p><p className="text-xs text-muted-foreground">{inv.client}</p></div>
                      <div className="text-right"><p className="text-sm font-semibold text-foreground">{inv.amount}</p><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${inv.color}`}>{inv.status}</span></div>
                    </div>
                  ))}
                </div>
              ]}
            />
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS with CoverflowSwiper ─── */}
      <section className="py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Loved by <span className="gradient-text">10,000+ Businesses</span></h2>
          <p className="text-muted-foreground">Don't take our word for it. Here's what our customers say.</p>
        </div>
        <CoverflowSwiper
          slides={testimonials.map((t, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl h-full flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-foreground text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>{t.initials}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        />
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, <span className="gradient-text">Transparent Pricing</span></h2>
            <p className="text-muted-foreground">Start free, scale as you grow. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 29, desc: 'Perfect for small teams', features: ['5 team members', '50 clients', '50 invoices/mo', 'Basic analytics', 'Email support', 'API access'], color: 'from-slate-500 to-gray-500', popular: false },
              { name: 'Pro', price: 79, desc: 'Most popular for growing businesses', features: ['20 team members', '500 clients', 'Unlimited invoices', 'AI Reports & Insights', 'Priority support', 'Advanced analytics', 'Custom integrations', 'Webhook support'], color: 'from-indigo-500 to-violet-500', popular: true },
              { name: 'Enterprise', price: 199, desc: 'For large organizations', features: ['Unlimited members', 'Unlimited clients', 'Unlimited everything', 'Dedicated AI model', 'SLA guarantee', 'Custom onboarding', 'SSO & SAML', '24/7 phone support'], color: 'from-violet-500 to-purple-600', popular: false },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`glass-card p-8 rounded-2xl relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
                whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white animated-gradient">
                    MOST POPULAR
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} mb-4`} />
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
                <Link href="/sign-up">
                  <motion.button
                    className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'text-white animated-gradient' : 'border border-border text-foreground hover:bg-accent'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started Free
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS MARQUEE ─── */}
      <section className="py-16 border-y border-border overflow-hidden">
        <p className="text-center text-muted-foreground text-sm mb-8">Works seamlessly with your favorite tools</p>
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite]" style={{ width: 'max-content' }}>
          {[...integrations, ...integrations].map((name, i) => (
            <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-medium text-sm whitespace-nowrap">
              <Globe className="w-4 h-4 text-primary" />
              {name}
            </div>
          ))}
        </div>
      </section>
      
      {/* ─── FINAL CTA ─── */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-5" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Ready to <span className="gradient-text">Transform</span><br />Your Business?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">Join 10,000+ businesses already using BizFlow AI to grow faster.</p>
          <Link href="/sign-up">
            <motion.button
              className="px-10 py-5 rounded-2xl font-bold text-white text-lg animated-gradient shadow-2xl shadow-indigo-500/30 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Start For Free Today <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <p className="text-muted-foreground text-sm mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>
    </div>
  )
}
