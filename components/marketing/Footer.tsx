import React from 'react';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Zap className="text-white fill-white" size={18} />
              </div>
              <span className="text-xl font-bold text-foreground">BizFlow AI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering businesses with AI-driven insights and automated management tools. Scaling your vision with intelligence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="/features" className="hover:text-brand-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-brand-primary transition-colors">Live Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-brand-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-border mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} BizFlow AI. All rights reserved. Built with Next.js & AI.
          </p>
          <div className="flex items-center space-x-6 text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-foreground transition-colors"><Github size={20} /></Link>
            <Link href="#" className="hover:text-foreground transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
