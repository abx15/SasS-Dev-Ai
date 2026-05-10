'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  FileText,
  User,
  Zap,
  MessageSquare,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRole } from '@/hooks/useRole';

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

const suggestedPrompts = [
  "Analyze my revenue trends for Q2",
  "Which clients are at risk of churning?",
  "Generate a Q4 growth projection report",
  "Suggest pricing optimization strategies",
];

export default function AIAssistantPage() {
  const { role: currentRole, isLoading } = useRole();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your BizFlow AI assistant. How can I help you optimize your business today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) return null;

  const hasAccess = ['OWNER', 'ADMIN', 'MANAGER'].includes(currentRole);

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mb-8 border border-brand-primary/20">
          <Bot className="text-primary" size={48} />
        </div>
        <h2 className="text-4xl font-black text-foreground mb-4">Elite AI restricted</h2>
        <p className="text-muted-foreground max-w-md text-lg font-medium">The Predictive AI Engine is a premium feature available to Workspace Strategists and Owners.</p>
        <button className="mt-10 bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/20 transition-all shadow-2xl shadow-primary/30">
          Contact Admin to Upgrade
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Based on your recent data, your revenue in Q2 has shown a steady 15% increase. However, your churn rate among 'Starter' plan users has ticked up by 2%. I recommend reaching out to these clients with a personalized engagement campaign.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex gap-8 animate-fade-in">
      {/* Conversation History Sidebar */}
      <div className="hidden xl:flex flex-col w-80 bg-card border border-border rounded-[2.5rem] p-6">
        <div className="flex items-center space-x-3 mb-8">
          <MessageSquare className="text-primary" size={20} />
          <h2 className="text-lg font-bold text-foreground">History</h2>
        </div>
        <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide">
          {['Revenue Analysis', 'Client Churn Report', 'Pricing Strategy', 'May Summary'].map((h) => (
            <div key={h} className="p-4 rounded-2xl bg-white/[0.02] border border-border hover:border-brand-primary/30 cursor-pointer transition-all group">
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground truncate">{h}</p>
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1 block">2 days ago</span>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
          <LottieLoader url="https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json" className="w-40 h-40" />
        </div>
        <button className="mt-6 w-full py-4 rounded-2xl bg-muted border border-border text-foreground font-bold text-sm hover:bg-muted transition-all flex items-center justify-center">
          <Plus size={16} className="mr-2" />
          New Conversation
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-card border border-border rounded-[2.5rem] overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Bot className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">BizFlow AI Assistant</h2>
              <div className="flex items-center text-[10px] text-accent font-black uppercase tracking-widest">
                <Zap size={10} className="mr-1 fill-brand-accent" />
                Powered by GPT-4o
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2.5 hover:bg-muted rounded-xl text-muted-foreground transition-colors" title="Clear Chat">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-start space-x-4 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                m.role === 'assistant' ? "bg-primary/20 border-brand-primary/20 text-primary" : "bg-muted border-border text-primary-foreground"
              )}>
                {m.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={cn(
                "p-6 rounded-[2rem] text-sm leading-relaxed",
                m.role === 'assistant' ? "bg-white/[0.03] text-muted-foreground border border-border" : "bg-primary text-primary-foreground font-medium"
              )}>
                {m.content}
                {m.role === 'assistant' && (
                  <div className="mt-6 pt-4 border-t border-border flex items-center space-x-4">
                    <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      <Copy size={12} className="mr-1.5" />
                      Copy
                    </button>
                    <button className="flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      <FileText size={12} className="mr-1.5" />
                      Save to Reports
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-brand-primary/20 flex items-center justify-center">
                <Bot className="text-primary animate-pulse" size={20} />
              </div>
              <div className="flex space-x-1.5 p-4 bg-white/[0.03] rounded-2xl border border-border">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts & Input */}
        <div className="p-8 pt-0">
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestedPrompts.map((p) => (
              <button 
                key={p} 
                onClick={() => setInput(p)}
                className="px-4 py-2 rounded-xl bg-muted border border-border text-[11px] font-bold text-muted-foreground hover:border-brand-primary/50 hover:text-foreground transition-all"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Ask anything about your business..." 
              className="w-full bg-white/[0.03] border border-border rounded-3xl py-5 pl-6 pr-16 text-foreground outline-none focus:border-brand-primary/50 transition-all placeholder:text-muted-foreground"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-primary/20"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase font-black tracking-[0.2em]">BizFlow AI can make mistakes. Verify important financial data.</p>
        </div>
      </div>
    </div>
  );
}
