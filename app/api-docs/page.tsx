import React from 'react';
import { 
  Terminal, 
  Lock, 
  Zap, 
  BarChart3, 
  Users, 
  FileText,
  MessageSquare,
  History
} from 'lucide-react';

const endpoints = [
  { 
    title: 'Analytics', 
    icon: BarChart3, 
    method: 'GET', 
    path: '/api/analytics', 
    desc: 'Retrieve aggregated business metrics, revenue charts, and user activity summaries.',
    params: ['organizationId', 'days (default: 30)']
  },
  { 
    title: 'AI Insights', 
    icon: Zap, 
    method: 'POST', 
    path: '/api/ai/insights', 
    desc: 'Generate real-time business insights using GPT-4o based on current performance data.',
    params: ['organizationId', 'context']
  },
  { 
    title: 'Clients', 
    icon: Users, 
    method: 'GET/POST', 
    path: '/api/clients', 
    desc: 'Manage customer data, track revenue per client, and handle lead status.',
    params: ['organizationId', 'clientId (optional)']
  },
  { 
    title: 'Invoices', 
    icon: FileText, 
    method: 'GET/POST', 
    path: '/api/invoices', 
    desc: 'Create, retrieve, and update billing documents. Integrated with Stripe.',
    params: ['organizationId', 'invoiceId (optional)']
  },
  { 
    title: 'AI Chat', 
    icon: MessageSquare, 
    method: 'POST', 
    path: '/api/ai/chat', 
    desc: 'Streaming interface for the AI Business Assistant.',
    params: ['message', 'history']
  },
  { 
    title: 'Audit Logs', 
    icon: History, 
    method: 'GET', 
    path: '/api/activity', 
    desc: 'Fetch full audit trail for workspace security and activity monitoring.',
    params: ['organizationId', 'type']
  },
];

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-brand-dark p-8 md:p-20">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-brand-primary">
            <Terminal size={32} />
            <h1 className="text-4xl font-black text-white">Developer API</h1>
          </div>
          <p className="text-white/40 text-lg max-w-2xl font-medium leading-relaxed">
            Integrate BizFlow AI into your existing workflows using our RESTful API. 
            All requests require a valid Bearer token and organization context.
          </p>
          <div className="flex items-center space-x-4">
             <div className="flex items-center bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl text-xs font-bold border border-brand-primary/20">
               <Lock size={14} className="mr-2" />
               v1.0 (Stable)
             </div>
             <div className="text-white/20 text-xs font-mono">
               Base URL: https://api.bizflow-ai.com/v1
             </div>
          </div>
        </div>

        {/* Endpoints List */}
        <div className="grid gap-8">
          {endpoints.map((ep) => (
            <div key={ep.path} className="p-8 rounded-[2.5rem] bg-brand-card/50 border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                    <ep.icon className="text-white/40 group-hover:text-brand-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{ep.title}</h3>
                    <code className="text-xs text-brand-primary font-mono">{ep.method} {ep.path}</code>
                  </div>
                </div>
                <button className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                  View Full Schema
                </button>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {ep.desc}
              </p>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Required Parameters</p>
                <div className="flex flex-wrap gap-2">
                  {ep.params.map(p => (
                    <span key={p} className="px-3 py-1 rounded-lg bg-black/40 text-white/60 text-[10px] font-mono border border-white/5">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication Note */}
        <div className="p-10 rounded-[3rem] bg-gradient-to-br from-brand-primary/20 to-transparent border border-brand-primary/20">
          <h3 className="text-2xl font-bold text-white mb-4">Authentication</h3>
          <p className="text-white/50 leading-relaxed mb-8">
            BizFlow AI uses Clerk for identity management. To authenticate your API requests, 
            pass your Clerk session token in the Authorization header.
          </p>
          <pre className="p-6 bg-black/60 rounded-2xl border border-white/5 overflow-x-auto">
            <code className="text-xs text-brand-primary font-mono">
              Authorization: Bearer clk_session_token_xxx
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
