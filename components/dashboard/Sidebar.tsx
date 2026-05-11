'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, BarChart3, Users, FileText, 
  Bot, Sparkles, CreditCard, Settings, 
  History, ChevronLeft, ChevronRight, LogOut,
  Zap, Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'

const menuItems = [
  { group: 'OVERVIEW', items: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
  ]},
  { group: 'MANAGEMENT', items: [
    { name: 'Clients', icon: Users, href: '/clients' },
    { name: 'Invoices', icon: FileText, href: '/invoices' },
    { name: 'Team', icon: Users, href: '/team' },
  ]},
  { group: 'AI TOOLS', items: [
    { name: 'AI Assistant', icon: Bot, href: '/ai-assistant' },
    { name: 'Reports', icon: Sparkles, href: '/reports' },
  ]},
  { group: 'ACCOUNT', items: [
    { name: 'Billing', icon: CreditCard, href: '/billing' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Activity Logs', icon: History, href: '/activity-logs' },
  ]},
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="relative h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-all duration-300 ease-in-out"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 mb-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xl font-black tracking-tight text-foreground"
            >
              Biz<span className="text-primary">Flow</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide pb-10">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                {group.group}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <div className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                      isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                    )}>
                      <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.name}</span>
                      )}
                      {isActive && !isCollapsed && (
                        <motion.div layoutId="activeHighlight" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                      )}
                      
                      {/* Tooltip for collapsed mode */}
                      {isCollapsed && (
                        <div className="absolute left-16 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-2">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{user?.fullName || 'User'}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
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
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all shadow-sm"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  )
}
