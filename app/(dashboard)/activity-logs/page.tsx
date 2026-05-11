'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  History, Search, Filter, Download, 
  FileText, Users, UserPlus, CreditCard,
  AlertCircle, Globe, Terminal, Calendar
} from 'lucide-react'
import { toast } from 'sonner'

const activities = [
  { id: 1, user: 'Arun Kumar', action: 'created Invoice', target: '#INV-1020', type: 'invoice', time: '2 hours ago', ip: '192.168.1.1' },
  { id: 2, user: 'Sarah Konnor', action: 'invited member', target: 'mike@bizflow.ai', type: 'user', time: '5 hours ago', ip: '192.168.1.5' },
  { id: 3, user: 'System', action: 'automated report', target: 'Q3 Analytics', type: 'report', time: '1 day ago', ip: '127.0.0.1' },
  { id: 4, user: 'Arun Kumar', action: 'updated organization', target: 'Settings', type: 'settings', time: '2 days ago', ip: '192.168.1.1' },
  { id: 5, user: 'Alex Rivera', action: 'failed login', target: 'Security', type: 'error', time: '3 days ago', ip: '104.12.5.42' },
]

export default function ActivityLogsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-48" />
        <div className="skeleton h-[600px] rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
          <p className="text-muted-foreground">Track all actions performed in your organization</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-lg transition-colors border border-border">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export CSV</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by user, action, or target..."
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>All Actions</option>
            <option>Invoices</option>
            <option>Team</option>
            <option>System</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm hover:bg-accent">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="relative p-6">
          {/* Vertical line for timeline */}
          <div className="absolute left-10 top-0 bottom-0 w-px bg-border hidden md:block" />
          
          <div className="space-y-8 relative">
            {activities.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row md:items-start gap-4"
              >
                {/* Icon Circle */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                  act.type === 'invoice' ? 'bg-cyan-500 text-white' :
                  act.type === 'user' ? 'bg-indigo-500 text-white' :
                  act.type === 'report' ? 'bg-violet-500 text-white' :
                  act.type === 'error' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {act.type === 'invoice' ? <FileText className="w-4 h-4" /> :
                   act.type === 'user' ? <UserPlus className="w-4 h-4" /> :
                   act.type === 'report' ? <Zap className="w-4 h-4" /> :
                   act.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                </div>
                
                {/* Content */}
                <div className="flex-1 glass-card p-4 hover:border-primary/20 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-bold text-foreground">{act.user}</span>
                      <span className="text-muted-foreground mx-1">{act.action}</span>
                      <span className="font-semibold text-primary">{act.target}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {act.ip}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{act.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
