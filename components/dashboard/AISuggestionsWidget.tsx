'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, TrendingUp, AlertCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Suggestion {
  id: string;
  type: 'insight' | 'action' | 'alert';
  text: string;
  cta?: string;
}

const AISuggestionsWidget = ({ suggestions, loading = false }: { suggestions: Suggestion[], loading?: boolean }) => {
  return (
    <div className="p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border h-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Bot size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">AI Insights</h3>
            <p className="text-[10px] text-accent font-black uppercase tracking-widest">Live Optimization</p>
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-xl transition-all group">
          <RefreshCcw size={18} className={cn("text-muted-foreground group-hover:text-foreground", loading && "animate-spin")} />
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-3xl bg-white/[0.03] border border-border hover:border-brand-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
                s.type === 'insight' ? "bg-primary/20 text-primary" :
                s.type === 'action' ? "bg-accent/10 text-accent" :
                "bg-orange-500/10 text-orange-500"
              )}>
                {s.type === 'insight' ? <TrendingUp size={16} /> :
                 s.type === 'action' ? <Sparkles size={16} /> :
                 <AlertCircle size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-4">{s.text}</p>
                {s.cta && (
                  <button className="flex items-center text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                    {s.cta}
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestionsWidget;
