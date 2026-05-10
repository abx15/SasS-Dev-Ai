'use client';

import React from 'react';
import { 
  UsersRound, 
  Plus, 
  Mail, 
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
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

const teamMembers = [
  { id: '1', name: 'John Owner', role: 'OWNER', email: 'john@bizflow.ai', status: 'ACTIVE', lastActive: 'Online', avatar: 'JO' },
  { id: '2', name: 'Sarah Miller', role: 'ADMIN', email: 'sarah@bizflow.ai', status: 'ACTIVE', lastActive: '2m ago', avatar: 'SM' },
  { id: '3', name: 'Robert Fox', role: 'MANAGER', email: 'robert@bizflow.ai', status: 'ACTIVE', lastActive: '1h ago', avatar: 'RF' },
  { id: '4', name: 'Emily Davis', role: 'VIEWER', email: 'emily@bizflow.ai', status: 'PENDING', lastActive: 'Never', avatar: 'ED' },
];

const roleConfig = {
  OWNER: { icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  ADMIN: { icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/20', border: 'border-brand-primary/20' },
  MANAGER: { icon: Shield, color: 'text-accent', bg: 'bg-accent/10', border: 'border-brand-accent/20' },
  MEMBER: { icon: UsersRound, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  VIEWER: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' },
};

export default function TeamPage() {
  const { user, role: currentRole } = useRole();
  const canInvite = ['OWNER', 'ADMIN'].includes(currentRole);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-2">Team Management</h1>
          <p className="text-muted-foreground font-medium">Manage permissions and collaborate with your team.</p>
        </div>
        {canInvite && (
          <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-6 py-3 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg">
            <Plus size={20} className="mr-2" />
            Invite Member
          </button>
        )}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member, i) => {
          const config = roleConfig[member.role as keyof typeof roleConfig];
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-[2.5rem] bg-card border border-border hover:border-border transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-lg font-black text-primary border border-brand-primary/20">
                  {member.avatar}
                </div>
                {canInvite && (
                  <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical size={20} />
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <div className="flex items-center text-muted-foreground text-xs">
                  <Mail size={14} className="mr-2" />
                  {member.email}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                <div className={cn(
                  "flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  config.bg, config.color, config.border
                )}>
                  <config.icon size={12} className="mr-1.5" />
                  {member.role}
                </div>
                <div className="flex items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mr-2",
                    member.status === 'ACTIVE' ? "bg-green-500" : "bg-orange-500"
                  )} />
                  {member.lastActive}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Invite Card Placeholder */}
        {canInvite && (
          <button className="p-6 rounded-[2.5rem] border-2 border-dashed border-border hover:border-brand-primary/30 hover:bg-primary/20 transition-all group flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <LottieLoader url="https://cdn.jsdelivr.net/gh/LottieFiles/lottie-player@master/demo/data.json" className="w-full h-full" />
            </div>
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors relative z-10">
              <Plus size={24} className="text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors relative z-10">Invite New Member</span>
          </button>
        )}
      </div>
    </div>
  );
}
