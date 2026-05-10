'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import { 
  Users, 
  Target, 
  Globe, 
  Zap, 
  Heart, 
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={true} className={className} />;
};

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-bold mb-8 uppercase tracking-widest">
              ✦ Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight mb-8">
              We're Building the <br />
              <GradientText>Future of Business</GradientText>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-10 max-w-xl">
              BizFlow AI started with a simple mission: to give every business owner the tools of a Fortune 500 company through the power of Artificial Intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 rounded-full bg-primary font-bold text-lg">
                Join Our Team
              </Button>
              <Button variant="ghost" size="lg" className="h-14 px-8 rounded-full font-bold text-lg border border-border">
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full -z-10" />
            <div className="rounded-[3rem] border border-border bg-card/50 backdrop-blur-3xl p-8 aspect-square flex items-center justify-center overflow-hidden shadow-2xl">
              <LottieLoader url="https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json" className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-accent/20 py-32 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">Our <GradientText>Core Values</GradientText></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">These are the principles that guide everything we do at BizFlow AI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="text-indigo-500" />, title: 'Innovation', desc: 'We constantly push the boundaries of what AI can do for business management.' },
              { icon: <Target className="text-violet-500" />, title: 'Accuracy', desc: 'Our AI models are trained on high-quality data to ensure precise insights.' },
              { icon: <Globe className="text-cyan-500" />, title: 'Accessibility', desc: 'We believe powerful business tools should be available to everyone, everywhere.' },
              { icon: <Users className="text-indigo-500" />, title: 'Community', desc: 'We build for our users and with our users, fostering a thriving ecosystem.' },
              { icon: <Heart className="text-violet-500" />, title: 'Integrity', desc: 'Trust is our foundation. Your data is always secure and private.' },
              { icon: <Sparkles className="text-cyan-500" />, title: 'Excellence', desc: 'We strive for perfection in every line of code and every pixel designed.' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-16">The <GradientText>Dream Team</GradientText></h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Alex Rivers', role: 'CEO & Founder', avatar: 'AR' },
              { name: 'Sarah Chen', role: 'CTO', avatar: 'SC' },
              { name: 'Marcus Bell', role: 'Head of AI', avatar: 'MB' },
              { name: 'Priya Joshi', role: 'Product Design', avatar: 'PJ' },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-1 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-3xl font-black text-foreground">
                    {member.avatar}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-widest">{member.role}</p>
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg bg-accent hover:bg-indigo-500/10 hover:text-indigo-500 transition-all">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-accent hover:bg-indigo-500/10 hover:text-indigo-500 transition-all">
                    <Linkedin size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-accent hover:bg-indigo-500/10 hover:text-indigo-500 transition-all">
                    <Github size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="pb-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-[3rem] overflow-hidden bg-foreground p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent)] pointer-events-none" />
            <h2 className="text-4xl md:text-7xl font-black text-background mb-8 leading-tight">Ready to join the <br /> AI revolution?</h2>
            <Link href="/sign-up">
              <Button size="lg" className="h-16 px-12 rounded-full bg-background text-foreground hover:bg-background/90 font-bold text-xl shadow-2xl transition-all hover:scale-105">
                Get Started Now <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
