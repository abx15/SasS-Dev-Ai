'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, CheckCircle2, Zap, Calendar, 
  Download, ArrowUpRight, ShieldCheck, Info 
} from 'lucide-react'
import { toast } from 'sonner'

export default function BillingPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-48 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="skeleton h-64 rounded-2xl" />
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subscription & Billing</h1>
          <p className="text-muted-foreground">Manage your plan and billing information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 glass-card p-8 flex flex-col md:flex-row justify-between gap-6 bg-gradient-to-br from-primary/5 to-transparent"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold tracking-wider">PRO PLAN</span>
              <span className="text-xs text-muted-foreground">Billed monthly</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-2">$79<span className="text-lg font-normal text-muted-foreground">/mo</span></h2>
            <p className="text-sm text-muted-foreground mb-6">Your next billing date is December 11, 2024</p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                Manage Subscription <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-2.5 bg-muted hover:bg-accent text-foreground font-semibold rounded-xl transition-colors border border-border">
                Switch to Yearly (Save 20%)
              </button>
            </div>
          </div>
          <div className="md:w-64 space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Usage Meters</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">Team Members</span>
                    <span className="text-muted-foreground">8 / 20</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[40%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">AI Reports</span>
                    <span className="text-muted-foreground">12 / 50</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-[24%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground">Payment Method</h3>
            <button className="text-xs font-semibold text-primary hover:underline">Update</button>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center gap-4 mb-6">
            <div className="w-12 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-[10px] text-white font-bold italic">VISA</span>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">•••• •••• •••• 4242</p>
              <p className="text-[10px] text-muted-foreground">Expires 12/26</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg border border-border">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Payments secured by Stripe
          </div>
        </motion.div>
      </div>

      {/* Billing History */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Billing History</h2>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Nov 11, 2024', desc: 'Pro Plan Monthly', amount: '$79.00', status: 'PAID' },
                { date: 'Oct 11, 2024', desc: 'Pro Plan Monthly', amount: '$79.00', status: 'PAID' },
                { date: 'Sep 11, 2024', desc: 'Pro Plan Monthly', amount: '$79.00', status: 'PAID' },
              ].map((inv, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{inv.date}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{inv.desc}</td>
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-500">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
