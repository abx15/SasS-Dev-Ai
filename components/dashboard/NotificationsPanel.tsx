'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerticalSwiper } from '../shared/SwiperCarousel';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationsPanel = ({ isOpen, onClose, notifications }: NotificationsPanelProps) => {
  const slides = notifications.map((n) => (
    <div 
      key={n.id} 
      className={cn(
        "p-5 rounded-3xl border border-border transition-all cursor-pointer hover:border-brand-primary/20",
        n.isRead ? "bg-transparent opacity-60" : "bg-white/[0.03]"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-foreground">{n.title}</h4>
        <span className="text-[10px] text-muted-foreground font-medium">{n.time}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
    </div>
  ))

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-[#06060f] shadow-2xl border-l border-border z-[101] p-8"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-3">
                <Bell size={24} className="text-indigo-400" />
                <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
                <X size={24} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Recent Feed</span>
              <button className="flex items-center text-xs font-bold text-indigo-400 hover:underline">
                <CheckCheck size={14} className="mr-2" />
                Mark all read
              </button>
            </div>

            <div className="h-[calc(100vh-250px)]">
              {notifications.length > 0 ? (
                <VerticalSwiper slides={slides} />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Inbox size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">All caught up!</h3>
                  <p className="text-muted-foreground text-sm max-w-[200px]">No new notifications at the moment.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
