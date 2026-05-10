'use client';

import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Eye, 
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRole } from '@/hooks/useRole';
import { cn } from '@/lib/utils';

const reports = [
  { id: '1', title: 'Monthly Revenue Growth Analysis', type: 'ANALYTICS', date: 'May 10, 2024', status: 'READY' },
  { id: '2', title: 'Q1 Financial Performance Overview', type: 'FINANCIAL', date: 'May 05, 2024', status: 'READY' },
  { id: '3', title: 'Client Churn & Retention Strategy', type: 'INSIGHTS', date: 'Apr 28, 2024', status: 'READY' },
  { id: '4', title: 'Infrastructure Optimization Audit', type: 'SYSTEM', date: 'Apr 15, 2024', status: 'GENERATING' },
];

export default function ReportsPage() {
  const { role: currentRole } = useRole();
  const canGenerate = ['OWNER', 'ADMIN', 'MANAGER'].includes(currentRole);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-2">AI Reports</h1>
          <p className="text-muted-foreground font-medium">Deep-dive insights generated from your business data.</p>
        </div>
        {canGenerate && (
          <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-6 py-3 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg">
            <Sparkles size={20} className="mr-2" />
            Generate New Report
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground outline-none focus:border-brand-primary/50 transition-all"
          />
        </div>
        <button className="flex items-center space-x-2 bg-card border border-border rounded-2xl px-4 py-3 text-muted-foreground font-bold hover:text-foreground transition-all w-full md:w-auto">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="p-8 rounded-[2.5rem] bg-card border border-border hover:border-brand-primary/20 transition-all group relative overflow-hidden flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-brand-primary/20">
                <FileText className="text-primary" size={24} />
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                report.status === 'READY' ? "bg-green-500/10 text-green-500" : "bg-accent/10 text-accent animate-pulse"
              )}>
                {report.status}
              </span>
            </div>

            <div className="flex-1">
              <div className="text-[10px] text-accent font-black uppercase tracking-widest mb-2">
                {report.type}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                {report.title}
              </h3>
              <p className="text-muted-foreground text-xs font-medium">Generated on {report.date}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <button 
                disabled={report.status !== 'READY'}
                className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-muted text-muted-foreground font-bold text-xs hover:bg-muted hover:text-foreground transition-all disabled:opacity-30"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
              <button 
                disabled={report.status !== 'READY'}
                className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-muted text-muted-foreground font-bold text-xs hover:bg-muted hover:text-foreground transition-all disabled:opacity-30"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        ))}

        {/* Create Card */}
        <button className="p-8 rounded-[2.5rem] border-2 border-dashed border-border hover:border-brand-primary/30 hover:bg-primary/20 transition-all group flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Plus size={28} className="text-muted-foreground group-hover:text-primary" />
          </div>
          <h4 className="text-lg font-bold text-foreground mb-2">New Analysis</h4>
          <p className="text-xs text-muted-foreground max-w-[180px]">Run a custom AI audit on your business performance.</p>
        </button>
      </div>
    </div>
  );
}
