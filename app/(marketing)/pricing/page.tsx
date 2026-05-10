'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Rocket, Building2 } from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';

const plans = [
  {
    name: 'Starter',
    id: 'STARTER',
    price: { monthly: 29, yearly: 24 },
    desc: 'Perfect for small teams and startups.',
    icon: <Rocket size={28} className="text-brand-primary" />,
    features: [
      'Up to 5 team members',
      '50 clients management',
      '50 invoices per month',
      'Basic AI insights',
      'Standard support',
      'Community access',
    ],
    notIncluded: ['Custom AI reports', 'Multi-org support', 'API access'],
  },
  {
    name: 'Pro',
    id: 'PRO',
    price: { monthly: 79, yearly: 64 },
    desc: 'Advanced tools for growing businesses.',
    icon: <Crown size={28} className="text-brand-accent" />,
    featured: true,
    features: [
      'Up to 20 team members',
      '500 clients management',
      'Unlimited invoices',
      'Advanced AI insights',
      'Full AI business reports',
      'Priority support',
      'Stripe integration',
    ],
    notIncluded: ['Custom contract', 'Dedicated manager'],
  },
  {
    name: 'Enterprise',
    id: 'ENTERPRISE',
    price: { monthly: 199, yearly: 159 },
    desc: 'Custom solutions for large scale ops.',
    icon: <Building2 size={28} className="text-white" />,
    features: [
      'Unlimited team members',
      'Unlimited clients',
      'Unlimited invoices',
      'Custom AI modeling',
      'White-label options',
      '24/7 Dedicated support',
      'Custom API access',
      'SLA guarantee',
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-32 pb-20 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white mb-6"
          >
            Transparent Pricing for <br />
            <span className="text-brand-primary">Every Stage of Growth</span>
          </motion.h1>
          <p className="text-white/60 text-lg mb-10">
            Choose the plan that fits your business needs. Scale up or down as you grow.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-white/40'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 bg-brand-primary/20 rounded-full relative p-1 transition-colors"
            >
              <motion.div 
                animate={{ x: isYearly ? 32 : 0 }}
                className="w-6 h-6 bg-brand-primary rounded-full"
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-white/40'}`}>
              Yearly <span className="bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full text-[10px] ml-2">20% OFF</span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[2.5rem] bg-brand-card/50 border ${
                plan.featured ? 'border-brand-primary shadow-[0_0_40px_rgba(99,102,241,0.2)] scale-105 z-10' : 'border-white/5'
              } flex flex-col justify-between`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-white/5 rounded-2xl">
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm mb-8">{plan.desc}</p>
                
                <div className="flex items-baseline space-x-1 mb-8">
                  <span className="text-5xl font-black text-white">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-white/40 font-medium">/month</span>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center text-white/80 text-sm">
                      <div className="w-5 h-5 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-center text-white/30 text-sm">
                      <div className="w-5 h-5 bg-white/5 text-white/20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <X size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <SignUpButton mode="modal">
                <button className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
                  plan.featured 
                    ? 'bg-brand-primary text-white shadow-xl hover:bg-brand-primary/90' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}>
                  Choose {plan.name}
                </button>
              </SignUpButton>
            </motion.div>
          ))}
        </div>

        {/* Comparison Footnote */}
        <div className="mt-20 text-center">
          <p className="text-white/40 text-sm">
            All plans include: 256-bit SSL encryption, automated daily backups, and 99.9% uptime guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
