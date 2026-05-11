'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Building, Bell, Shield, 
  Key, Trash2, Save, Upload, 
  CheckCircle2, AlertTriangle, Smartphone,
  Globe, Laptop, Clock
} from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Organization', icon: Building },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'API Keys', icon: Key },
    { name: 'Danger Zone', icon: Trash2 },
  ]

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-10 rounded-lg" />)}
        </div>
        <div className="flex-1 skeleton h-96 rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activeTab === tab.name 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="glass-card p-8"
            >
              {activeTab === 'Profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-border">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">AK</div>
                      <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Your Avatar</h3>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Full Name</label>
                      <input type="text" defaultValue="Arun Kumar" className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Email Address</label>
                      <input type="email" defaultValue="arun@bizflow.ai" disabled className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm opacity-60" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Timezone</label>
                      <select className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>UTC +5:30 (India)</option>
                        <option>UTC -8:00 (PST)</option>
                        <option>UTC +0:00 (GMT)</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border flex justify-end">
                    <button onClick={() => toast.success('Profile saved!')} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Organization' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Organization Name</label>
                    <input type="text" defaultValue="BizFlow AI Corp" className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Org Slug</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">app.bizflow.ai/</span>
                      <input type="text" defaultValue="bizflow" disabled className="flex-1 px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Industry</label>
                      <select className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Company Size</label>
                      <select className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border flex justify-end">
                    <button onClick={() => toast.success('Organization updated!')} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                      <Save className="w-4 h-4" /> Save Organization
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Danger Zone' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-5 h-5 text-rose-500" />
                      <h3 className="font-bold text-rose-500">Warning: Critical Actions</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">These actions are irreversible. Please proceed with caution.</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <div>
                          <p className="text-sm font-bold text-foreground">Export All Data</p>
                          <p className="text-xs text-muted-foreground">Download all your data in JSON format.</p>
                        </div>
                        <button className="px-4 py-2 bg-muted hover:bg-accent text-foreground text-xs font-bold rounded-lg transition-colors border border-border">Export</button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/20 bg-card">
                        <div>
                          <p className="text-sm font-bold text-rose-500">Delete Organization</p>
                          <p className="text-xs text-muted-foreground">Permanently delete everything.</p>
                        </div>
                        <button className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
