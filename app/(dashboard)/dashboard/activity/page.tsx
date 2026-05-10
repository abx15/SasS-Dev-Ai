'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  Download, 
  User, 
  FileText, 
  Settings, 
  ShieldCheck,
  AlertTriangle,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/hooks/useRole';
import { formatDistanceToNow } from 'date-fns';

const logs = [
  { id: '1', user: 'John Owner', action: 'Update Subscription', entity: 'Billing', time: new Date(), ip: '192.168.1.1', type: 'SUCCESS' },
  { id: '2', user: 'Sarah Admin', action: 'Delete Client', entity: 'TechNova', time: new Date(Date.now() - 3600000), ip: '102.45.1.2', type: 'WARNING' },
  { id: '3', user: 'System', action: 'Failed Login Attempt', entity: 'Admin Panel', time: new Date(Date.now() - 7200000), ip: '45.12.9.0', type: 'DANGER' },
  { id: '4', user: 'Robert Manager', action: 'Create Invoice', entity: '#INV-2024-102', time: new Date(Date.now() - 86400000), ip: '192.168.1.5', type: 'SUCCESS' },
  { id: '5', user: 'AI Assistant', action: 'Generate Report', entity: 'Q2 Audit', time: new Date(Date.now() - 172800000), ip: 'internal', type: 'SUCCESS' },
];

const typeConfig = {
  SUCCESS: { color: 'text-green-500', bg: 'bg-green-500/10', icon: ShieldCheck },
  WARNING: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: AlertTriangle },
  DANGER: { color: 'text-red-500', bg: 'bg-red-500/10', icon: AlertTriangle },
};

export default function ActivityLogsPage() {
  const [activeType, setActiveType] = useState('All');
  const { role: currentRole } = useRole();
  const canExport = ['OWNER', 'ADMIN'].includes(currentRole);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <History className="text-primary" size={24} />
            <h1 className="text-3xl font-black text-foreground">Activity Logs</h1>
          </div>
          <p className="text-muted-foreground font-medium">Audit trail for all workspace actions and security events.</p>
        </div>
        {canExport && (
          <button className="flex items-center space-x-2 bg-muted hover:bg-muted text-muted-foreground hover:text-foreground px-6 py-3 rounded-2xl font-bold border border-border transition-all">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search by action, user or entity..." 
            className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground outline-none focus:border-brand-primary/50 transition-all"
          />
        </div>

        <div className="flex bg-card border border-border rounded-2xl p-1 w-full lg:w-auto overflow-x-auto">
          {['All', 'Success', 'Warning', 'Danger'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeType === type ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-[10px] font-black uppercase tracking-widest border-b border-border">
                <th className="py-6 px-8">Timestamp</th>
                <th className="py-6 px-8">User</th>
                <th className="py-6 px-8">Action</th>
                <th className="py-6 px-8">Entity</th>
                <th className="py-6 px-8">IP Address</th>
                <th className="py-6 px-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const config = typeConfig[log.type as keyof typeof typeConfig];
                return (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors border-b border-border last:border-0">
                    <td className="py-6 px-8">
                       <span className="text-muted-foreground text-xs font-medium">{formatDistanceToNow(log.time)} ago</span>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                           <User size={14} />
                        </div>
                        <span className="text-foreground font-bold text-sm">{log.user}</span>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-foreground font-medium">{log.action}</td>
                    <td className="py-6 px-8">
                       <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                          <FileText size={14} />
                          <span>{log.entity}</span>
                       </div>
                    </td>
                    <td className="py-6 px-8 text-muted-foreground text-xs font-mono">{log.ip}</td>
                    <td className="py-6 px-8 text-right">
                       <span className={cn(
                         "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center",
                         config.bg, config.color
                       )}>
                         <config.icon size={12} className="mr-1.5" />
                         {log.type}
                       </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-6 border-t border-border bg-white/[0.01] flex items-center justify-between">
           <p className="text-xs text-muted-foreground">Showing 1 to 5 of 240 events</p>
           <div className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-xs font-bold hover:bg-muted transition-all disabled:opacity-30">Previous</button>
              <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/20 transition-all shadow-lg shadow-primary/20">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
