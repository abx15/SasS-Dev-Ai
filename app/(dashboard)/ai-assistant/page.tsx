'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, Send, User, Sparkles, 
  Plus, Search, Copy, Download,
  BarChart2, Users, FileText, Zap
} from 'lucide-react'
import { toast } from 'sonner'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    { icon: BarChart2, text: "Analyze my revenue trends", color: "text-indigo-500 bg-indigo-500/10" },
    { icon: Users, text: "Which clients might churn?", color: "text-rose-500 bg-rose-500/10" },
    { icon: FileText, text: "Generate Q4 growth report", color: "text-emerald-500 bg-emerald-500/10" },
    { icon: Zap, text: "Optimize team structure", color: "text-amber-500 bg-amber-500/10" },
  ]

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Mock AI response
    setTimeout(() => {
      const aiMsg = { role: 'ai', content: "I've analyzed your current business metrics. Your revenue is up 12% this month, but client retention in the 'SaaS' category has dipped slightly. I recommend setting up automated follow-ups for clients who haven't logged in for over 14 days." }
      setMessages(prev => [...prev, aiMsg])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col glass-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">BizFlow AI Assistant</h2>
            <p className="text-[10px] text-emerald-500 font-medium">Online & Ready to help</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Download className="w-4 h-4" /></button>
          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><Plus className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 animate-bounce">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">How can I help you today?</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-10">Ask me anything about your revenue, clients, or team performance.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s.text)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-left group"
                >
                  <div className={`p-2 rounded-lg ${s.color}`}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-muted text-foreground'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-muted border border-border text-foreground'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted p-4 rounded-2xl flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-muted/10">
        <div className="relative max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Type your message..."
            className="w-full pl-6 pr-16 py-4 bg-background border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-14 overflow-hidden"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
