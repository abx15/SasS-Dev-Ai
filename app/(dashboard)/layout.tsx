import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - Persistent on desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header - Persistent at top */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide bg-background">
          <div className="p-8 pb-16 mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

        {/* Subtle background glow */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="fixed bottom-0 left-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full -z-10" />
      </div>
    </div>
  );
}
