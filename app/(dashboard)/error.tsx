'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-card/20 rounded-[3rem] border border-border backdrop-blur-xl">
      <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20">
        <AlertCircle size={40} className="text-red-500" />
      </div>

      <h2 className="text-3xl font-black text-foreground mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground text-lg max-w-md mb-12 font-medium">
        We encountered an unexpected error while loading your data. Our team has been notified.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/20 text-primary-foreground px-8 py-4 rounded-2xl font-bold transition-all shadow-lg"
        >
          <RotateCcw size={20} />
          <span>Try Again</span>
        </button>
        <Link 
          href="/"
          className="flex items-center justify-center space-x-2 bg-muted hover:bg-muted text-foreground px-8 py-4 rounded-2xl font-bold border border-border transition-all"
        >
          <Home size={20} />
          <span>Go Home</span>
        </Link>
      </div>

      <div className="mt-12 p-4 bg-black/40 rounded-2xl border border-border max-w-xl overflow-hidden">
        <p className="text-[10px] font-mono text-red-400/60 truncate">
          {error.message || 'Unknown system error'}
        </p>
      </div>
    </div>
  );
}
