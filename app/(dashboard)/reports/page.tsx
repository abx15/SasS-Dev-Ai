'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Sparkles, Plus, Search, 
  Eye, Download, MoreVertical, Loader2,
  BarChart, PieChart, TrendingUp, Calendar
} from 'lucide-react'
import { toast } from 'sonner'

const reports = [
  { id: 1, title: 'Q3 Revenue Analysis', type: 'REVENUE', date: '2024-10-15', status: 'READY', color: 'bg-indigo-500' },
  { id: 2, title: 'Client Churn Prediction', type: 'CHURN', date: '2024-11-01', status: 'READY', color: 'bg-rose-500' },
  { id: 3, title: 'Annual Growth Forecast', type: 'GROWTH', date: '2024-11-08', status: 'GENERATING', color: 'bg-violet-500' },
  { id: 4, title: 'Team Productivity Audit', type: 'TEAM', date: '2024-10-28', status: 'READY', color: 'bg-emerald-500' },
]

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Reports</h1>
          <p className="text-muted-foreground">Detailed business intelligence powered by AI</p>
        </div>
        <button 
          onClick={() => toast.info('Generate Report modal coming soon!')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 relative group"
          >
            <div className={`w-10 h-10 rounded-xl ${report.color} flex items-center justify-center text-white mb-4`}>
              {report.type === 'REVENUE' ? <BarChart className="w-5 h-5" /> :
               report.type === 'CHURN' ? <PieChart className="w-5 h-5" /> :
               report.type === 'GROWTH' ? <TrendingUp className="w-5 h-5" /> :
               <FileText className="w-5 h-5" />}
            </div>
            <h3 className="font-bold text-foreground mb-1">{report.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Calendar className="w-3 h-3" />
              {report.date}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              {report.status === 'GENERATING' ? (
                <div className="flex items-center gap-2 text-primary font-medium text-xs">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"><Download className="w-4 h-4" /></button>
                </div>
              )}
              <button className="p-1.5 hover:bg-muted rounded-md text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8">
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Need a custom analysis?</h3>
          <p className="text-muted-foreground max-w-sm mb-6">Our AI can analyze any aspect of your business data to provide custom insights and strategies.</p>
          <button className="px-6 py-2 bg-muted hover:bg-accent text-foreground font-medium rounded-xl transition-colors border border-border">
            Request Custom Report
          </button>
        </div>
      </div>
    </div>
  )
}
