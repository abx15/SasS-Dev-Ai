'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Command, Sun, Moon } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DevRoleSwitcher } from './DevRoleSwitcher';

const Header = () => {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Handle cmd+k shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter((p) => p);
    return paths.map((p, i) => (
      <React.Fragment key={p}>
        <span className="text-muted-foreground">/</span>
        <span className={cn(
          "text-sm font-medium capitalize",
          i === paths.length - 1 ? "text-foreground" : "text-muted-foreground"
        )}>
          {p.replace(/-/g, ' ')}
        </span>
      </React.Fragment>
    ));
  };

  return (
    <header className="h-20 bg-background/50 backdrop-blur-md border-b border-border px-8 flex items-center justify-between relative z-40">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground">Pages</span>
        {getBreadcrumbs()}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div 
          className="hidden md:flex items-center space-x-3 bg-muted border border-border px-4 py-2 rounded-2xl text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer group"
          onClick={() => setIsCommandOpen(true)}
        >
          <Search size={18} className="group-hover:text-foreground" />
          <span className="text-sm font-medium pr-8">Search anything...</span>
          <div className="flex items-center space-x-1 bg-background px-2 py-1 rounded-lg border border-border">
            <Command size={12} />
            <span className="text-[10px] font-bold">K</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <div className="p-2.5 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
            <Bell size={20} className="text-muted-foreground group-hover:text-primary" />
          </div>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </div>

        <div className="h-6 w-px bg-border" />

        <DevRoleSwitcher />

        <div className="h-6 w-px bg-border" />

        <ThemeToggle />
      </div>

      {/* Command Palette Mockup (Simplified) */}
      {isCommandOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-2xl rounded-3xl border border-border shadow-2xl p-8">
            <div className="flex items-center space-x-4 mb-8">
              <Search className="text-primary" size={24} />
              <input 
                autoFocus
                placeholder="Type a command or search..." 
                className="bg-transparent border-none outline-none text-xl text-foreground w-full"
                onKeyDown={(e) => e.key === 'Escape' && setIsCommandOpen(false)}
              />
            </div>
            <div className="space-y-4">
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Suggestions</p>
              {['Go to Invoices', 'Create New Client', 'View Reports', 'Profile Settings'].map((s) => (
                <div key={s} className="p-4 bg-muted rounded-2xl hover:bg-primary/10 transition-colors cursor-pointer text-primary-foreground font-medium">
                  {s}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsCommandOpen(false)}
              className="mt-8 text-muted-foreground text-sm font-medium hover:text-foreground"
            >
              Press <kbd className="bg-muted px-2 py-0.5 rounded">ESC</kbd> to close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
