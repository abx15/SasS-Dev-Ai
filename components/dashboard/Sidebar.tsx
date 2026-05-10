'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  UsersRound, 
  Bot, 
  ClipboardList, 
  ActivitySquare, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import { useRole } from '@/hooks/useRole';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER'] },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics', roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER'] },
  { name: 'Clients', icon: Users, href: '/dashboard/clients', roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER'] },
  { name: 'Invoices', icon: FileText, href: '/dashboard/invoices', roles: ['OWNER', 'ADMIN', 'MANAGER'] },
  { name: 'Team', icon: UsersRound, href: '/dashboard/team', roles: ['OWNER', 'ADMIN', 'MANAGER'] },
  { name: 'AI Assistant', icon: Bot, href: '/dashboard/ai', roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER'] },
  { name: 'Reports', icon: ClipboardList, href: '/dashboard/reports', roles: ['OWNER', 'ADMIN', 'MANAGER'] },
  { name: 'Activity', icon: ActivitySquare, href: '/dashboard/activity', roles: ['OWNER', 'ADMIN'] },
  { name: 'Billing', icon: CreditCard, href: '/dashboard/billing', roles: ['OWNER', 'ADMIN'] },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings', roles: ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER'] },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, role: currentRole } = useRole();

  const filteredNavItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-card border-r border-border flex flex-col relative z-50 overflow-hidden"
    >
      {/* Header / Logo */}
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="text-primary-foreground fill-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground leading-none">BizFlow</h1>
                <span className="text-[10px] text-primary font-black uppercase tracking-widest">PRO PLAN</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mx-auto"
            >
              <Zap className="text-primary-foreground fill-primary-foreground" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 py-6 overflow-y-auto scrollbar-hide">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  'group flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all relative overflow-hidden',
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" 
                  />
                )}
                <item.icon size={22} className={cn(isActive ? 'text-primary' : 'group-hover:text-foreground')} />
                {!isCollapsed && <span className="font-semibold text-sm">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-border bg-card">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserButton afterSignOutUrl="/" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground truncate max-w-[120px]">
                  {user?.firstName} {user?.lastName || 'User'}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{currentRole}</span>
              </div>
            </div>
            <SignOutButton>
              <button className="text-muted-foreground hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            </SignOutButton>
          </div>
        ) : (
          <div className="flex justify-center">
             <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground border-2 border-background z-[60] shadow-lg transition-transform hover:scale-110"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
