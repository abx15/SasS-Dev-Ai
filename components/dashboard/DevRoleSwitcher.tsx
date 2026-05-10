'use client';

import React, { useState } from 'react';
import { Shield, User, UserCheck, ShieldAlert, Clock, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const roles = [
  { label: 'Owner', value: 'OWNER', icon: ShieldAlert, color: 'text-red-500' },
  { label: 'Admin', value: 'ADMIN', icon: UserCheck, color: 'text-primary' },
  { label: 'Manager', value: 'MANAGER', icon: Shield, color: 'text-accent' },
  { label: 'Member', value: 'MEMBER', icon: User, color: 'text-green-500' },
  { label: 'Viewer', value: 'VIEWER', icon: Clock, color: 'text-muted-foreground' },
];

export const DevRoleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // This component is only for development/testing
  if (process.env.NODE_ENV !== 'development') return null;

  const handleRoleChange = async (role: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/auth/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        toast.success(`Role switched to ${role}`);
        window.location.reload(); // Reload to apply changes
      } else {
        toast.error('Failed to switch role');
      }
    } catch (err) {
      toast.error('Error switching role');
    } finally {
      setIsUpdating(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl text-yellow-500 hover:bg-yellow-500/20 transition-all font-black text-[10px] uppercase tracking-widest"
      >
        <Shield size={14} />
        <span>Dev: Switch Role</span>
        <ChevronDown size={14} className={cn("transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2">
          <div className="p-2 space-y-1">
            {roles.map((role) => (
              <button
                key={role.value}
                disabled={isUpdating}
                onClick={() => handleRoleChange(role.value)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left group disabled:opacity-50"
              >
                <role.icon size={16} className={cn(role.color, "group-hover:scale-110 transition-transform")} />
                <span className="text-xs font-bold text-foreground">{role.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
