'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Search, Filter, MoreVertical, Mail, 
  Phone, Building2, ExternalLink, Trash2, Edit 
} from 'lucide-react'
import { toast } from 'sonner'

const clients = [
  { id: 1, name: 'Sarah Konnor', company: 'TechCorp', email: 'sarah@techcorp.com', status: 'ACTIVE', revenue: '$12,400', color: 'bg-indigo-500' },
  { id: 2, name: 'Marcus Jensen', company: 'Apex Digital', email: 'marcus@apex.io', status: 'ACTIVE', revenue: '$8,200', color: 'bg-cyan-500' },
  { id: 3, name: 'Priya Mishra', company: 'NexaScale', email: 'priya@nexascale.com', status: 'LEAD', revenue: '$0', color: 'bg-violet-500' },
  { id: 4, name: 'Alex Rivera', company: 'CloudBase', email: 'alex@cloudbase.co', status: 'INACTIVE', revenue: '$4,500', color: 'bg-orange-500' },
  { id: 5, name: 'Jordan Taylor', company: 'Velocity', email: 'jordan@velocity.com', status: 'CHURNED', revenue: '$2,100', color: 'bg-rose-500' },
]

export default function ClientsPage() {
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="skeleton h-10 w-48" />
          <div className="skeleton h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your relationships and deals</p>
        </div>
        <button 
          onClick={() => toast.info('Add Client modal coming soon!')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Client</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients, companies, emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Lead</option>
            <option>Inactive</option>
            <option>Churned</option>
          </select>
          <div className="flex bg-muted p-1 rounded-lg">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-1.5 rounded-md transition-all ${view === 'table' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {clients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${client.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {client.name[0]}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-rose-500/10 rounded-lg text-muted-foreground hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{client.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Building2 className="w-3 h-3" />
                  {client.company}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    {client.email}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    client.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' :
                    client.status === 'LEAD' ? 'bg-blue-500/10 text-blue-500' :
                    client.status === 'INACTIVE' ? 'bg-gray-500/10 text-gray-500' :
                    'bg-rose-500/10 text-rose-500'
                  }`}>
                    {client.status}
                  </span>
                  <span className="text-sm font-bold text-foreground">{client.revenue}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="table"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card overflow-hidden"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Company</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Revenue</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${client.color} flex items-center justify-center text-white text-xs font-bold`}>{client.name[0]}</div>
                        <div><p className="text-sm font-medium text-foreground">{client.name}</p><p className="text-xs text-muted-foreground">{client.email}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{client.company}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        client.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' :
                        client.status === 'LEAD' ? 'bg-blue-500/10 text-blue-500' :
                        client.status === 'INACTIVE' ? 'bg-gray-500/10 text-gray-500' :
                        'bg-rose-500/10 text-rose-500'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground">{client.revenue}</td>
                    <td className="px-6 py-4 text-right"><button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><MoreVertical className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
