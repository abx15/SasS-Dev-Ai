'use client'
import { useState } from 'react'
import { 
  Search, Bell, Moon, Sun, 
  ChevronRight, Command, HelpCircle,
  Menu, X
} from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Derive breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  return (
    <header className="h-20 border-b border-sidebar-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30">
      
      {/* Left: Breadcrumbs & Search */}
      <div className="flex items-center gap-8 flex-1">
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Home</span>
          {pathSegments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className={`capitalize ${i === pathSegments.length - 1 ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                {seg.replace(/-/g, ' ')}
              </span>
            </div>
          ))}
        </div>

        <div className="relative max-w-md w-full hidden md:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search across BizFlow..."
            className="w-full pl-11 pr-12 py-2.5 bg-muted/50 border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-bold text-muted-foreground">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-all relative">
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-background" />
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 glass-card shadow-2xl p-4 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm">Notifications</h4>
                  <button className="text-[10px] font-bold text-primary hover:underline">Mark all read</button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Invoice Paid", msg: "TechCorp paid $9,440", time: "2m ago", color: "bg-emerald-500" },
                    { title: "System Update", msg: "New AI model deployed", time: "1h ago", color: "bg-indigo-500" },
                    { title: "Churn Alert", msg: "Apex Digital is at risk", time: "3h ago", color: "bg-rose-500" },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <div className={`w-2 h-2 mt-1.5 rounded-full ${n.color}`} />
                      <div>
                        <p className="text-xs font-bold text-foreground">{n.title}</p>
                        <p className="text-[10px] text-muted-foreground">{n.msg}</p>
                        <p className="text-[10px] text-muted-foreground/50 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors border-t border-border pt-4">
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-border mx-2" />
        
        <ThemeToggle />
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2.5 hover:bg-muted rounded-xl text-muted-foreground"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  )
}
