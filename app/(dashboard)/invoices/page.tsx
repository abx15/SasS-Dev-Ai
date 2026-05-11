'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Search, FileText, Download, 
  Send, Eye, MoreVertical, CheckCircle2,
  Clock, AlertCircle, Trash2
} from 'lucide-react'
import { toast } from 'sonner'

const invoices = [
  { id: 'INV-1020', client: 'TechCorp', amount: '$9,440', status: 'PAID', date: '2024-11-01', due: '2024-11-15' },
  { id: 'INV-1019', client: 'Apex Digital', amount: '$5,200', status: 'SENT', date: '2024-11-05', due: '2024-11-20' },
  { id: 'INV-1018', client: 'NexaScale', amount: '$3,800', status: 'OVERDUE', date: '2024-10-25', due: '2024-11-08' },
  { id: 'INV-1017', client: 'CloudBase', amount: '$2,100', status: 'DRAFT', date: '2024-11-10', due: '2024-11-25' },
]

export default function InvoicesPage() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const tabs = ['All', 'Draft', 'Sent', 'Paid', 'Overdue']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
        <div className="skeleton h-10 w-96" />
        <div className="skeleton h-[400px] rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Manage your billing and payments</p>
        </div>
        <button 
          onClick={() => toast.info('Create Invoice modal coming soon!')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Create Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoiced', value: '$48,291', icon: FileText, color: 'text-indigo-500' },
          { label: 'Total Paid', value: '$32,150', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Pending', value: '$12,400', icon: Clock, color: 'text-blue-500' },
          { label: 'Overdue', value: '$3,741', icon: AlertCircle, color: 'text-rose-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab 
                ? 'bg-primary text-white' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card overflow-hidden"
      >
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Invoice #</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Client</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{inv.id}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-foreground">{inv.client}</p>
                  <p className="text-xs text-muted-foreground">Due: {inv.due}</p>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-foreground">{inv.amount}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' :
                    inv.status === 'SENT' ? 'bg-blue-500/10 text-blue-500' :
                    inv.status === 'DRAFT' ? 'bg-gray-500/10 text-gray-500' :
                    'bg-rose-500/10 text-rose-500'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Download className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
