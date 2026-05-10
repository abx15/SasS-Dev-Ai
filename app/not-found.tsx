'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { Button } from '@/components/ui/button';

const LottieLoader = ({ url, className }: { url: string, className?: string }) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(url)  
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error loading lottie:", err));
  }, [url]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={true} className={className} />;
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        <div className="w-64 h-64 md:w-80 md:h-80 mb-8">
          <LottieLoader url="https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json" className="w-full h-full" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-4">
          Oops! <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">404</span>
        </h1>
        
        <p className="text-muted-foreground text-xl md:text-2xl mb-12 font-medium leading-relaxed">
          The page you're looking for has drifted into another dimension. 
          Let's get you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl shadow-xl shadow-indigo-500/20 w-full sm:w-auto">
              <Home size={24} className="mr-3" />
              Return Home
            </Button>
          </Link>
          <Button 
            variant="outline"
            size="lg" 
            onClick={() => window.history.back()}
            className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-black text-xl backdrop-blur-xl w-full sm:w-auto"
          >
            <ArrowLeft size={24} className="mr-3" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
    </div>
  );
}
