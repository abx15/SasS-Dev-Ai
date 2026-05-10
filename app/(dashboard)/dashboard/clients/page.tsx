'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  LayoutGrid, 
  List, 
  MoreVertical,
  Mail,
  Phone,
  Building2
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

const clients = [
  { id: '1', name: 'Alex Rivera', company: 'TechNova Solutions', email: 'alex@technova.com', status: 'ACTIVE', revenue: '$12,450', avatar: 'AR' },
  { id: '2', name: 'Sarah Chen', company: 'Sarah\'s Design Studio', email: 'sarah@design.io', status: 'LEAD', revenue: '$0', avatar: 'SC' },
  { id: '3', name: 'James Wilson', company: 'Wilson Global', email: 'james@wilson.com', status: 'ACTIVE', revenue: '$45,200', avatar: 'JW' },
  { id: '4', name: 'Elena Gomez', company: 'EcoStyle', email: 'elena@ecostyle.com', status: 'INACTIVE', revenue: '$8,900', avatar: 'EG' },
];

export default function ClientsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { role: currentRole } = useRole();

  const canAddClient = ['OWNER', 'ADMIN', 'MANAGER'].includes(currentRole);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-2">Clients</h1>
          <p className="text-muted-foreground font-medium">Manage your relationships and track client value.</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
             <LottieLoader url="https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json" className="w-full h-full" />
          </div>
          {canAddClient && (
            <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-6 py-3 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg shadow-primary/20">
              <Plus size={20} className="mr-2" />
              Add New Client
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search clients, companies..." 
            className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground outline-none focus:border-brand-primary/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex bg-card border border-border rounded-2xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2 rounded-xl transition-all", viewMode === 'grid' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2 rounded-xl transition-all", viewMode === 'list' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <List size={20} />
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-card border border-border rounded-2xl px-4 py-3 text-muted-foreground font-bold hover:text-foreground transition-all">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {clients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-[2.5rem] bg-card border border-border hover:border-brand-primary/30 transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    client.status === 'ACTIVE' ? "bg-green-500/10 text-green-500" :
                    client.status === 'LEAD' ? "bg-accent/10 text-accent" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {client.status}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-brand-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-primary">{client.avatar}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{client.name}</h3>
                  <p className="text-muted-foreground text-sm font-medium mb-6">{client.company}</p>

                  <div className="w-full space-y-3 mb-8">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground text-xs">
                      <Mail size={14} />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground text-xs">
                      <Building2 size={14} />
                      <span>{client.revenue} Total Value</span>
                    </div>
                  </div>

                  <button className="w-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all text-muted-foreground font-bold py-3 rounded-2xl border border-border">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* List View (Placeholder) */}
      {viewMode === 'list' && (
        <div className="bg-card rounded-[2.5rem] border border-border p-8">
           <table className="w-full text-left">
             <thead>
               <tr className="text-muted-foreground text-xs font-black uppercase tracking-widest border-b border-border">
                 <th className="pb-6 px-4">Client</th>
                 <th className="pb-6 px-4">Company</th>
                 <th className="pb-6 px-4">Status</th>
                 <th className="pb-6 px-4">Revenue</th>
                 <th className="pb-6 px-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {clients.map((client) => (
                 <tr key={client.id} className="hover:bg-white/[0.02] transition-colors border-b border-border">
                   <td className="py-6 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {client.avatar}
                        </div>
                        <span className="text-foreground font-bold">{client.name}</span>
                      </div>
                   </td>
                   <td className="py-6 px-4 text-muted-foreground">{client.company}</td>
                   <td className="py-6 px-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        client.status === 'ACTIVE' ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                      )}>
                        {client.status}
                      </span>
                   </td>
                   <td className="py-6 px-4 text-foreground font-bold">{client.revenue}</td>
                   <td className="py-6 px-4 text-right">
                      <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground transition-colors">
                        <MoreVertical size={20} />
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
