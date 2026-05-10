'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';

interface Event {
  date: Date;
  type: 'invoice' | 'meeting' | 'report';
}

const CalendarWidget = ({ events = [] }: { events?: Event[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const hasEvent = (day: Date) => events.some(e => isSameDay(e.date, day));

  return (
    <div className="p-8 rounded-[2.5rem] bg-card backdrop-blur-xl border border-border">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-foreground flex items-center">
          <CalendarIcon size={20} className="mr-3 text-primary" />
          Schedule
        </h3>
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-bold text-foreground min-w-[100px] text-center">{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, monthStart);
          const hasDayEvent = hasEvent(day);

          return (
            <div 
              key={i}
              className={cn(
                "aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all relative",
                !isCurrentMonth ? "opacity-20" : "hover:bg-muted",
                isSelected ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <span className="text-xs font-bold">{format(day, 'd')}</span>
              {hasDayEvent && !isSelected && (
                <div className="absolute bottom-2 w-1 h-1 bg-accent rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-border space-y-4">
         <div className="flex items-center justify-between">
           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Upcoming Today</p>
           <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
         </div>
         <div className="p-4 rounded-2xl bg-primary/20 border border-brand-primary/20">
           <h4 className="text-sm font-bold text-foreground mb-1">Invoice Due: #INV-2024-001</h4>
           <p className="text-xs text-muted-foreground">Acme Corp • $12,400.00</p>
         </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
