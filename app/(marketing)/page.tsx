'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ArrowRight, 
  Play, 
  BarChart3, 
  Cpu, 
  Zap, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Star,
  Globe,
  Slack,
  Github,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { CoverflowSwiper, CubeSwiper } from '@/components/shared/SwiperCarousel'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 ${className}`}>
    {children}
  </div>
)

const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 ${className}`}>
    {children}
  </span>
)

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

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Animated Particles & Lottie Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
          <LottieLoader url="https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json" className="w-full h-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-black uppercase tracking-widest mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          ✦ Trusted by 10,000+ businesses worldwide
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-[7.5rem] font-black text-foreground leading-[0.9] tracking-tighter mb-8"
        >
          Scale Smarter <br />
          <GradientText>With AI Flows</GradientText>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          BizFlow AI is the all-in-one intelligence layer for modern agencies. 
          Automate, analyze, and accelerate with precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
        >
          <Link href="/sign-up">
            <Button size="lg" className="h-16 px-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-105">
              Launch Platform <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="h-16 px-10 rounded-full text-foreground font-black text-xl border border-white/10 backdrop-blur-xl hover:bg-white/5">
            Watch Reality <Play className="ml-2 h-6 w-6 fill-current" />
          </Button>
        </motion.div>

        {/* Dashboard Preview with Lottie */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
          className="relative max-w-6xl mx-auto group"
        >
          <div className="absolute -inset-10 bg-indigo-500/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-card/40 backdrop-blur-3xl p-4 shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
             <div className="rounded-[1.5rem] bg-background/50 overflow-hidden aspect-[16/9] flex items-center justify-center">
                <LottieLoader 
                  url="https://cdn.jsdelivr.net/gh/airbnb/lottie-web@master/demo/ad_v2/data.json" 
                  className="w-4/5 h-4/5" 
                />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={statsRef} className="py-20 border-y border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="stat-item">
            <div className="text-3xl md:text-5xl font-black text-foreground mb-2">$2.4M+</div>
            <div className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Revenue Tracked</div>
          </div>
          <div className="stat-item">
            <div className="text-3xl md:text-5xl font-black text-foreground mb-2">10,000+</div>
            <div className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="text-3xl md:text-5xl font-black text-foreground mb-2">50,000+</div>
            <div className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Invoices Generated</div>
          </div>
          <div className="stat-item">
            <div className="text-3xl md:text-5xl font-black text-foreground mb-2">98.7%</div>
            <div className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Features = () => {
  const featureList = [
    { title: 'Revenue Analytics', desc: 'Real-time revenue tracking with AI predictions', icon: <BarChart3 className="text-indigo-500" /> },
    { title: 'AI Reports', desc: 'Generate comprehensive reports in seconds', icon: <Cpu className="text-violet-500" /> },
    { title: 'Invoice System', desc: 'Create, send, and track invoices effortlessly', icon: <Zap className="text-cyan-500" /> },
    { title: 'CRM & Clients', desc: 'Manage all client relationships in one place', icon: <Users className="text-indigo-500" /> },
    { title: 'Role-Based Access', desc: 'Granular permissions for your entire team', icon: <ShieldCheck className="text-violet-500" /> },
    { title: 'Subscription Billing', desc: 'Seamless Stripe integration built-in', icon: <CreditCard className="text-cyan-500" /> },
  ]

  const slides = featureList.map((f, i) => (
    <GlassCard key={i} className="h-full hover:shadow-lg transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {f.icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-4">{f.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
    </GlassCard>
  ))

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">Built for <GradientText>Scale</GradientText></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to manage and grow your business with the power of artificial intelligence.</p>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {slides}
        </div>
        <div className="md:hidden">
          <CoverflowSwiper slides={slides} />
        </div>
      </div>
    </section>
  )
}

const DashboardSection = () => {
  const slides = [
    <div className="p-8 rounded-3xl bg-card border border-border h-[400px]">
       <div className="flex justify-between mb-8">
         <div className="h-4 w-32 bg-muted rounded" />
         <div className="h-4 w-20 bg-muted rounded" />
       </div>
       <div className="space-y-4">
         <div className="h-8 w-full bg-primary/10 rounded border border-primary/20" />
         <div className="h-8 w-full bg-accent rounded" />
         <div className="h-8 w-full bg-accent rounded" />
       </div>
    </div>,
    <div className="p-8 rounded-3xl bg-card border border-border h-[400px]">
       <div className="grid grid-cols-2 gap-4 h-full">
         <div className="rounded-2xl bg-primary/10 border border-primary/20" />
         <div className="rounded-2xl bg-accent" />
       </div>
    </div>,
    <div className="p-8 rounded-3xl bg-card border border-border h-[400px]">
       <div className="h-full w-full rounded-2xl bg-gradient-to-br from-primary/10 to-transparent" />
    </div>
  ]

  return (
    <section className="py-32 bg-accent/20">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">See Everything <br /> <GradientText>at a Glance</GradientText></h2>
          <div className="space-y-6 mb-10">
            {[
              "Real-time revenue monitoring",
              "AI-driven growth forecasting",
              "Team productivity insights",
              "Automated financial reporting"
            ].map(item => (
              <div key={item} className="flex items-center gap-4 text-muted-foreground font-medium">
                <div className="h-6 w-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                {item}
              </div>
            ))}
          </div>
          <Link href="/sign-up">
            <Button size="lg" className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-lg">
              Start Free Trial
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl -z-10" />
          <div className="bg-background border border-border rounded-[2rem] p-2 overflow-hidden shadow-2xl">
            <div className="bg-card border-b border-border p-4 flex gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500/50" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
              <div className="h-2 w-2 rounded-full bg-green-500/50" />
            </div>
            <CubeSwiper slides={slides} />
          </div>
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const testimonialList = [
    { name: 'Sarah K.', role: 'CEO TechFlow', text: 'BizFlow transformed how we manage our $2M business.', avatar: 'SK' },
    { name: 'Marcus J.', role: 'Founder Apex Digital', text: 'The AI insights alone saved us 20 hours per week.', avatar: 'MJ' },
    { name: 'Priya M.', role: 'COO NexaScale', text: 'Best SaaS investment we\'ve made. ROI in 2 weeks.', avatar: 'PM' },
    { name: 'Alex R.', role: 'CFO CloudBase', text: 'The invoice system is incredibly smooth.', avatar: 'AR' },
    { name: 'Jordan T.', role: 'MD Velocity Corp', text: 'Our team productivity increased 40% after switching.', avatar: 'JT' },
  ]

  const slides = testimonialList.map((t, i) => (
    <GlassCard key={i} className="w-[320px] flex flex-col justify-between h-[300px]">
      <div>
        <div className="flex gap-1 mb-4">
          {[1,2,3,4,5].map(j => <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-500" />)}
        </div>
        <p className="text-muted-foreground italic mb-6">"{t.text}"</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary">
          {t.avatar}
        </div>
        <div>
          <div className="text-foreground font-bold text-sm">{t.name}</div>
          <div className="text-muted-foreground text-xs">{t.role}</div>
        </div>
      </div>
    </GlassCard>
  ))

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">Client <GradientText>Success</GradientText></h2>
        </div>
        <CoverflowSwiper slides={slides} />
      </div>
    </section>
  )
}

const Pricing = () => {
  return (
    <section className="py-32 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">Simple <GradientText>Pricing</GradientText></h2>
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-accent border border-border">
            <button className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow">Monthly</button>
            <button className="px-6 py-2 rounded-full text-muted-foreground font-bold text-sm hover:text-foreground transition-colors">Yearly <span className="text-primary ml-1">Save 20%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard className="hover:scale-105 transition-transform bg-card">
            <div className="text-xl font-bold text-foreground mb-2">Starter</div>
            <div className="text-4xl font-black text-foreground mb-6">$29<span className="text-lg font-medium text-muted-foreground">/mo</span></div>
            <ul className="space-y-4 mb-10 text-muted-foreground text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 5 users</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 50 clients</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 50 invoices</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Basic analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Email support</li>
            </ul>
            <Link href="/sign-up">
              <Button className="w-full h-12 rounded-xl bg-accent border border-border hover:bg-accent/80 text-foreground font-bold">Get Started</Button>
            </Link>
          </GlassCard>

          <GlassCard className="border-primary/50 relative hover:scale-105 transition-transform shadow-lg shadow-primary/20 bg-card">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">Most Popular</div>
            <div className="text-xl font-bold text-foreground mb-2">Pro</div>
            <div className="text-4xl font-black text-foreground mb-6">$79<span className="text-lg font-medium text-muted-foreground">/mo</span></div>
            <ul className="space-y-4 mb-10 text-muted-foreground text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 20 users</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 500 clients</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Unlimited invoices</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> AI reports</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Priority support</li>
            </ul>
            <Link href="/sign-up">
              <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow">Get Started</Button>
            </Link>
          </GlassCard>

          <GlassCard className="hover:scale-105 transition-transform bg-card">
            <div className="text-xl font-bold text-foreground mb-2">Enterprise</div>
            <div className="text-4xl font-black text-foreground mb-6">$199<span className="text-lg font-medium text-muted-foreground">/mo</span></div>
            <ul className="space-y-4 mb-10 text-muted-foreground text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Unlimited everything</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Custom AI</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Dedicated support</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> SLA</li>
            </ul>
            <Link href="/sign-up">
              <Button className="w-full h-12 rounded-xl bg-accent border border-border hover:bg-accent/80 text-foreground font-bold">Contact Sales</Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

const MarqueeLogos = () => {
  return (
    <section className="py-20 bg-background overflow-hidden border-y border-border">
      <div className="container mx-auto px-4 mb-12 text-center">
        <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">Works with your favorite tools</p>
      </div>
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[
          { name: 'Stripe', icon: <CreditCard className="h-6 w-6" /> },
          { name: 'OpenAI', icon: <Cpu className="h-6 w-6" /> },
          { name: 'Slack', icon: <Slack className="h-6 w-6" /> },
          { name: 'Google', icon: <Globe className="h-6 w-6" /> },
          { name: 'GitHub', icon: <Github className="h-6 w-6" /> },
          { name: 'Notion', icon: <Mail className="h-6 w-6" /> },
          { name: 'Salesforce', icon: <Users className="h-6 w-6" /> },
          { name: 'HubSpot', icon: <Users className="h-6 w-6" /> },
        ].map((logo, i) => (
          <div key={i} className="flex items-center gap-3 text-muted-foreground font-bold text-2xl">
            {logo.icon} {logo.name}
          </div>
        ))}
        {[
          { name: 'Stripe', icon: <CreditCard className="h-6 w-6" /> },
          { name: 'OpenAI', icon: <Cpu className="h-6 w-6" /> },
          { name: 'Slack', icon: <Slack className="h-6 w-6" /> },
          { name: 'Google', icon: <Globe className="h-6 w-6" /> },
          { name: 'GitHub', icon: <Github className="h-6 w-6" /> },
          { name: 'Notion', icon: <Mail className="h-6 w-6" /> },
          { name: 'Salesforce', icon: <Users className="h-6 w-6" /> },
          { name: 'HubSpot', icon: <Users className="h-6 w-6" /> },
        ].map((logo, i) => (
          <div key={i+10} className="flex items-center gap-3 text-muted-foreground font-bold text-2xl">
            {logo.icon} {logo.name}
          </div>
        ))}
      </div>
    </section>
  )
}

const FinalCTA = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-500/10 via-primary/5 to-cyan-500/10 border border-border p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8">Ready to transform <br /> your business?</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join the future of business management today. Experience the power of AI-driven insights and automation.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link href="/sign-up">
              <Button size="lg" className="h-16 px-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl shadow-lg transition-all hover:scale-105">
                Get Started Free
              </Button>
            </Link>
            <p className="text-muted-foreground text-sm font-medium">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      <StatsBar />
      <Features />
      <DashboardSection />
      <Testimonials />
      <Pricing />
      <MarqueeLogos />
      <FinalCTA />
    </main>
  )
}
