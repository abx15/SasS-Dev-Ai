'use client';

import React, { useState } from 'react';
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Key, 
  Trash2, 
  Camera, 
  ChevronRight,
  Globe,
  Mail,
  Smartphone,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRole } from '@/hooks/useRole';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'danger', label: 'Danger Zone', icon: Trash2 },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { role: currentRole } = useRole();

  const filteredTabs = tabs.filter(tab => {
    if (['organization', 'danger', 'api'].includes(tab.id)) {
      return ['OWNER', 'ADMIN'].includes(currentRole);
    }
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12 animate-fade-in pb-20">
      {/* Sidebar Tabs */}
      <div className="w-full lg:w-72 shrink-0 space-y-2">
        <h1 className="text-3xl font-black text-foreground mb-8 px-4">Settings</h1>
        {filteredTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all group",
              activeTab === tab.id 
                ? "bg-primary/20 text-primary border border-brand-primary/20" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <tab.icon size={20} className={cn("transition-colors", activeTab === tab.id ? "text-primary" : "group-hover:text-foreground")} />
            <span className="font-bold text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="flex-1 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card border border-border rounded-[3rem] p-10"
          >
            {activeTab === 'profile' && (
              <div className="space-y-10">
                <div className="flex items-center justify-between border-b border-border pb-10">
                  <div className="flex items-center space-x-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-[2rem] bg-primary/20 flex items-center justify-center border-2 border-brand-primary/20 overflow-hidden">
                        <User size={40} className="text-primary" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all border-4 border-brand-dark">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">Personal Profile</h3>
                      <p className="text-muted-foreground text-sm">Update your photo and personal details.</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Full Name</label>
                    <input type="text" defaultValue="John Owner" className="w-full bg-white/[0.03] border border-border rounded-2xl py-4 px-6 text-foreground focus:border-brand-primary/50 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Email Address</label>
                    <input type="email" defaultValue="john@bizflow.ai" className="w-full bg-white/[0.03] border border-border rounded-2xl py-4 px-6 text-muted-foreground cursor-not-allowed outline-none font-medium" disabled />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Job Title</label>
                    <input type="text" placeholder="e.g. CEO" className="w-full bg-white/[0.03] border border-border rounded-2xl py-4 px-6 text-foreground focus:border-brand-primary/50 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/[0.03] border border-border rounded-2xl py-4 px-6 text-foreground focus:border-brand-primary/50 outline-none transition-all font-medium" />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'organization' && (
              <div className="space-y-10">
                <div className="border-b border-border pb-10">
                   <h3 className="text-2xl font-bold text-foreground mb-1">Organization Settings</h3>
                   <p className="text-muted-foreground text-sm">Manage your workspace branding and workspace details.</p>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center space-x-6 p-6 rounded-3xl bg-white/[0.02] border border-border">
                    <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center">
                       <Building size={32} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">Company Logo</h4>
                      <p className="text-muted-foreground text-xs mb-4">Recommended: 400x400px SVG or PNG.</p>
                      <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Upload New</button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Org Name</label>
                      <input type="text" defaultValue="BizFlow AI" className="w-full bg-white/[0.03] border border-border rounded-2xl py-4 px-6 text-foreground focus:border-brand-primary/50 outline-none transition-all font-medium" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Workspace Slug</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">bizflow.ai/</span>
                        <input type="text" defaultValue="my-workspace" className="w-full bg-white/[0.03] border border-border rounded-2xl py-4 pl-28 px-6 text-foreground focus:border-brand-primary/50 outline-none transition-all font-medium" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex justify-end">
                  <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
                    Update Workspace
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'danger' && (
              <div className="space-y-10">
                <div className="border-b border-red-500/20 pb-10">
                   <h3 className="text-2xl font-bold text-red-500 mb-1">Danger Zone</h3>
                   <p className="text-muted-foreground text-sm">Irreversible actions regarding your account and data.</p>
                </div>
                <div className="space-y-6">
                   <div className="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">Delete Organization</h4>
                        <p className="text-muted-foreground text-sm max-w-sm">This will permanently delete your workspace, all clients, invoices, and data.</p>
                      </div>
                      <button className="bg-red-500 hover:bg-red-600 text-foreground px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap">
                        Delete Workspace
                      </button>
                   </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === 'notifications' || activeTab === 'security' || activeTab === 'api') && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                   <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Advanced Config</h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">Detailed {activeTab} settings are being finalized. Check back soon!</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
