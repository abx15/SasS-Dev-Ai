'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserPlus, MoreVertical, Shield, 
  Mail, Clock, Trash2, ShieldCheck
} from 'lucide-react'
import { toast } from 'sonner'

const team = [
  { name: 'Arun Kumar', email: 'arun@bizflow.ai', role: 'OWNER', status: 'Active', color: 'bg-indigo-500' },
  { name: 'Sarah Konnor', email: 'sarah@bizflow.ai', role: 'ADMIN', status: 'Active', color: 'bg-violet-500' },
  { name: 'Mike Johnson', email: 'mike@bizflow.ai', role: 'MANAGER', status: 'Away', color: 'bg-blue-500' },
  { name: 'Alex Rivera', email: 'alex@bizflow.ai', role: 'MEMBER', status: 'Active', color: 'bg-emerald-500' },
  { name: 'Jane Doe', email: 'jane@bizflow.ai', role: 'VIEWER', status: 'Offline', color: 'bg-gray-500' },
]

export default function TeamPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members and their roles</p>
        </div>
        <button 
          onClick={() => toast.info('Invite Member modal coming soon!')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <UserPlus className="w-4 h-4" />
          <span className="text-sm font-medium">Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${member.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-none mb-1">{member.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      member.status === 'Active' ? 'bg-emerald-500' :
                      member.status === 'Away' ? 'bg-amber-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-xs text-muted-foreground">{member.status}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>
              <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 ${
                  member.role === 'OWNER' ? 'text-indigo-500' :
                  member.role === 'ADMIN' ? 'text-violet-500' :
                  member.role === 'MANAGER' ? 'text-blue-500' :
                  member.role === 'MEMBER' ? 'text-emerald-500' : 'text-gray-500'
                }`} />
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-muted text-foreground`}>
                  {member.role}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last active 2h ago
              </span>
              <button className="text-xs font-semibold text-rose-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Pending Invitations</h2>
        <div className="glass-card overflow-hidden">
          <div className="p-4 text-center text-muted-foreground text-sm italic">
            No pending invitations
          </div>
        </div>
      </div>
    </div>
  )
}
