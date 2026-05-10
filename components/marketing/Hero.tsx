"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const HERO_BADGES = [
  { icon: Sparkles, text: "AI-Powered Insights" },
  { icon: TrendingUp, text: "Real-Time Analytics" },
  { icon: Shield, text: "Enterprise Security" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
        >
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">Powered by GPT-4o</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Run Your Business
          <br />
          <span className="text-gradient">With AI Precision</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          BizFlow AI gives modern teams an AI-powered command center — from
          invoicing and client management to real-time analytics and automated
          business reports.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            Start for Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/50 px-6 py-3 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-background"
          >
            View Features
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {HERO_BADGES.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
