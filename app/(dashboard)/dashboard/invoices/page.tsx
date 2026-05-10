'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Send, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRole } from '@/hooks/useRole';

const tabs = ['All', 'Paid', 'Sent', 'Draft', 'Overdue'];

const invoices = [
  { id: '1', number: 'INV-2024-001', client: 'TechNova Solutions', amount: '$1,200.00', status: 'PAID', date: '2024-05-01', due: '2024-05-15' },
  { id: '2', number: 'INV-2024-002', client: 'Sarah\'s Design', amount: '$850.00', status: 'SENT', date: '2024-05-08', due: '2024-05-22' },
  { id: '3', number: 'INV-2024-003', client: 'Wilson Global', amount: '$4,500.00', status: 'OVERDUE', date: '2024-04-15', due: '2024-04-29' },
  { id: '4', number: 'INV-2024-004', client: 'EcoStyle', amount: '$2,100.00', status: 'DRAFT', date: '2024-05-10', due: '2024-05-24' },
];

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const { role: currentRole } = useRole();

  const canManageInvoices = ['OWNER', 'ADMIN'].includes(currentRole);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-2">Invoices</h1>
          <p className="text-muted-foreground font-medium">Create and track your billing operations.</p>
        </div>
        {canManageInvoices && (
          <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-6 py-3 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg">
            <Plus size={20} className="mr-2" />
            Create Invoice
          </button>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Outstanding', value: '$12,450.00', color: 'text-primary', icon: FileText },
          { label: 'Paid This Month', value: '$8,200.00', color: 'text-green-500', icon: CheckCircle2 },
          { label: 'Overdue Total', value: '$4,500.00', color: 'text-red-500', icon: AlertCircle },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-[2rem] bg-card border border-border">
            <div className="flex items-center space-x-3 mb-4">
              <stat.icon className={cn("shrink-0", stat.color)} size={18} />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-black text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex bg-card border border-border rounded-2xl p-1 w-full lg:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search invoice #..." 
            className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground outline-none focus:border-brand-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-xs font-black uppercase tracking-widest border-b border-border">
                <th className="py-6 px-8">Invoice #</th>
                <th className="py-6 px-8">Client</th>
                <th className="py-6 px-8">Amount</th>
                <th className="py-6 px-8">Status</th>
                <th className="py-6 px-8">Due Date</th>
                <th className="py-6 px-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 px-8 font-bold text-foreground">{inv.number}</td>
                  <td className="py-6 px-8 text-muted-foreground font-medium">{inv.client}</td>
                  <td className="py-6 px-8 text-foreground font-black">{inv.amount}</td>
                  <td className="py-6 px-8">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center w-fit",
                      inv.status === 'PAID' ? "bg-green-500/10 text-green-500" :
                      inv.status === 'SENT' ? "bg-primary/20 text-primary" :
                      inv.status === 'OVERDUE' ? "bg-red-500/10 text-red-500" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {inv.status === 'PAID' && <CheckCircle2 size={10} className="mr-1.5" />}
                      {inv.status === 'SENT' && <Send size={10} className="mr-1.5" />}
                      {inv.status === 'OVERDUE' && <Clock size={10} className="mr-1.5" />}
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-muted-foreground text-sm">{inv.due}</td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors" title="Download PDF">
                        <Download size={18} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-primary transition-colors" title="Send Email">
                        <Send size={18} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
