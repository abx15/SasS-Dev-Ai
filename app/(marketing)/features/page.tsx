'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Cpu, 
  Zap, 
  Users, 
  Globe, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const detailedFeatures = [
  {
    title: 'AI-Powered Business Insights',
    tag: 'Intelligence',
    desc: 'Our advanced machine learning models analyze your business data in real-time to provide actionable insights. Predict revenue trends, identify churn risks, and optimize your operations with a single click.',
    benefits: ['Revenue forecasting', 'Churn prediction', 'Spending optimization', 'Daily AI summaries'],
    icon: <Cpu size={40} className="text-brand-primary" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    color: 'brand-primary',
  },
  {
    title: 'Automated Invoice Management',
    tag: 'Efficiency',
    desc: 'Say goodbye to manual billing. Create professional invoices, set up recurring payments, and let our system handle the follow-ups. Integrate with Stripe to get paid faster and keep your cash flow healthy.',
    benefits: ['One-click invoicing', 'Recurring billing', 'Automatic late reminders', 'Stripe integration'],
    icon: <Zap size={40} className="text-brand-accent" />,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    color: 'brand-accent',
  },
  {
    title: 'Collaborative Team Workspace',
    tag: 'Collaboration',
    desc: 'Empower your team with shared dashboards and role-based permissions. Track activity across the organization and maintain a single source of truth for all your business data.',
    benefits: ['Role-based access', 'Activity logs', 'Shared analytics', 'Team invitations'],
    icon: <Users size={40} className="text-white" />,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    color: 'white',
  },
];

export default function FeaturesPage() {
  return (
    <div className="pt-32 pb-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6"
          >
            Capabilities
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8"
          >
            Built for the <br /> <span className="text-brand-accent">Modern Enterprise</span>
          </motion.h1>
          <p className="text-white/50 text-xl leading-relaxed">
            We've combined powerful management tools with the latest AI technology to create the ultimate business OS.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-40">
          {detailedFeatures.map((f, i) => (
            <div 
              key={f.title}
              className={`flex flex-col lg:items-center gap-16 lg:gap-24 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className={`text-${f.color} mb-6`}>{f.icon}</div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`w-2 h-2 rounded-full bg-${f.color}`} />
                  <span className="text-white/40 font-bold uppercase tracking-widest text-xs">{f.tag}</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">{f.title}</h2>
                <p className="text-white/60 text-lg mb-10 leading-relaxed">{f.desc}</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {f.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center text-white/80 font-medium">
                      <CheckCircle2 size={18} className="text-brand-accent mr-3 shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <Link href="/sign-up">
                  <button className="group flex items-center text-white font-bold hover:text-brand-primary transition-colors">
                    Explore this feature
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>

              {/* Mockup/Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-accent rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="relative bg-brand-card/80 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                    <img 
                      src={f.image} 
                      alt={f.title} 
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-40 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to see it in action?</h2>
          <Link href="/sign-up">
            <button className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform">
              Join BizFlow AI Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
