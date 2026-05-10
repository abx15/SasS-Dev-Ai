'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { 
  BarChart3, 
  Cpu, 
  Zap, 
  Users, 
  ShieldCheck, 
  CreditCard,
  ArrowRight,
  MessageSquare,
  Bot,
  Layers,
  LineChart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CoverflowSwiper } from '@/components/shared/SwiperCarousel';

const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 ${className}`}>
    {children}
  </span>
);

const LottieLoader = ({ url, className }: { url: string, className?: string }) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error loading lottie:", err));
  }, [url]);

  if (!animationData) return <div className={className + " bg-accent/20 animate-pulse rounded-2xl"} />;

  return <Lottie animationData={animationData} loop={true} className={className} />;
};

const ServiceCard = ({ icon, title, desc, lottieUrl }: { icon: React.ReactNode, title: string, desc: string, lottieUrl: string }) => (
  <div className="p-8 rounded-[3rem] bg-card/40 backdrop-blur-3xl border border-white/10 hover:border-primary/50 transition-all group h-[550px] flex flex-col justify-between overflow-hidden relative shadow-2xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/20 transition-all" />
    
    <div>
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{desc}</p>
    </div>

    <div className="flex-1 flex items-center justify-center mb-8">
      <LottieLoader url={lottieUrl} className="w-48 h-48 opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>

    <Link href="/sign-up">
      <Button className="w-full h-14 rounded-2xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-black text-lg transition-all border border-primary/20">
        Scale Now <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>
);

export default function ServicesPage() {
  const services = [
    {
      icon: <Bot size={36} />,
      title: "AI Automation",
      desc: "Full-scale workflow automation using custom AI agents and LLMs.",
      lottieUrl: "https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json"
    },
    {
      icon: <LineChart size={36} />,
      title: "Predictive Analytics",
      desc: "Data-driven forecasting to stay ahead of market shifts.",
      lottieUrl: "https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json"
    },
    {
      icon: <MessageSquare size={36} />,
      title: "Smart CRM",
      desc: "Intelligent client management with automated follow-ups.",
      lottieUrl: "https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json"
    },
    {
      icon: <Layers size={36} />,
      title: "Workflow Optimization",
      desc: "Streamline operations and eliminate bottlenecks with AI.",
      lottieUrl: "https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json"
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "Enterprise Security",
      desc: "Advanced AI-powered threat detection and data safety.",
      lottieUrl: "https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json"
    },
    {
      icon: <Sparkles size={36} />,
      title: "Custom AI Models",
      desc: "Proprietary models trained on your specific business data.",
      lottieUrl: "https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json"
    }
  ];

  const slides = services.map((s, i) => (
    <ServiceCard key={i} {...s} />
  ));

  return (
    <main className="bg-background min-h-screen pt-32 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-black mb-8 uppercase tracking-widest shadow-lg shadow-indigo-500/5"
          >
            ✦ Elite AI Infrastructure
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-black text-foreground leading-[0.9] tracking-tighter mb-10"
          >
            Intelligence <br />
            <GradientText>As A Service</GradientText>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed"
          >
            Stop managing, start scaling. Our AI-first services are built <br className="hidden md:block" /> 
            to transform your agency into a revenue powerhouse.
          </motion.p>
        </div>
      </section>

      {/* Swiper Section */}
      <section className="mb-32">
        <div className="container mx-auto px-4 text-center mb-10">
          <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-xs">Swipe to explore solutions</p>
        </div>
        <div className="max-w-[1400px] mx-auto px-4">
          <CoverflowSwiper slides={slides} />
        </div>
      </section>

      {/* Feature Focus Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <div className="rounded-[3rem] border border-white/10 bg-card/50 backdrop-blur-3xl p-12 shadow-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter">Automate Everything <br /> <GradientText>Scale Anything</GradientText></h2>
              <div className="space-y-6">
                {[
                  "Eliminate manual data entry forever",
                  "Automated lead generation & qualification",
                  "Real-time 24/7 AI customer support",
                  "Smart resource & talent allocation"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-bold text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Zap size={16} fill="currentColor" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square flex items-center justify-center"
          >
            <LottieLoader url="https://assets4.lottiefiles.com/packages/lf20_qp1q7mct.json" className="w-full h-full" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-[4rem] overflow-hidden bg-foreground p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
            <h2 className="text-5xl md:text-8xl font-black text-background mb-10 tracking-tighter leading-none">Ready for the <br /> next level?</h2>
            <Link href="/sign-up">
              <Button size="lg" className="h-20 px-16 rounded-full bg-background text-foreground hover:bg-background/90 font-black text-2xl shadow-2xl transition-all hover:scale-105 hover:shadow-primary/20">
                Get Started Free <ArrowRight className="ml-3 h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
