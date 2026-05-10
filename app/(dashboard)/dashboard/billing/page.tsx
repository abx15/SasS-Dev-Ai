"use client";

import React from "react";
import {
  CreditCard,
  Check,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  History,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRole } from "@/hooks/useRole";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$29",
    features: ["5 Users", "50 Clients", "50 Invoices", "AI Basic Insights"],
  },
  {
    name: "Pro",
    price: "$79",
    features: [
      "20 Users",
      "500 Clients",
      "Unlimited Invoices",
      "AI Advanced Analytics",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    features: [
      "Unlimited Users",
      "Unlimited Clients",
      "Unlimited Invoices",
      "Dedicated AI Training",
      "White-label Reports",
    ],
  },
];

export default function BillingPage() {
  const { role: currentRole, isLoading } = useRole();

  if (isLoading) return null;

  const hasAccess = ["OWNER", "ADMIN"].includes(currentRole);

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <CreditCard className="text-muted-foreground/20 mb-6" size={80} />
        <h2 className="text-3xl font-black text-foreground mb-4">Access Restricted</h2>
        <p className="text-muted-foreground max-w-md">Billing and subscription management is only available to Workspace Owners and Admins.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground mb-2">Plans & Billing</h1>
        <p className="text-muted-foreground font-medium">
          Manage your subscription and usage limits.
        </p>
      </div>

      {/* Current Plan Hero */}
      <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-brand-dark to-brand-dark border border-brand-primary/20 relative overflow-hidden">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="text-foreground fill-white" size={20} />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                Current Active Plan
              </span>
            </div>
            <h2 className="text-5xl font-black text-foreground mb-6">Pro Agency</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md">
              You are currently on the Pro plan. Your next billing date is{" "}
              <span className="text-foreground font-bold">June 10, 2024</span> for{" "}
              <span className="text-foreground font-bold">$79.00</span>.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-primary/20 text-primary-foreground px-8 py-4 rounded-2xl font-bold transition-all flex items-center shadow-lg shadow-primary/20">
                Manage Subscription
                <ArrowUpRight size={18} className="ml-2" />
              </button>
              <button className="bg-muted hover:bg-muted text-muted-foreground hover:text-foreground px-8 py-4 rounded-2xl font-bold transition-all border border-border">
                View Invoices
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {[
              {
                label: "User Seats",
                value: 8,
                max: 20,
                color: "brand-primary",
              },
              {
                label: "Client Management",
                value: 342,
                max: 500,
                color: "brand-accent",
              },
              {
                label: "AI Report Tokens",
                value: 12,
                max: 50,
                color: "green-500",
              },
            ].map((usage) => (
              <div key={usage.label}>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    {usage.label}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {usage.value} / {usage.max}
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(usage.value / usage.max) * 100}%` }}
                    className={cn(
                      "h-full rounded-full bg-current",
                      `text-${usage.color}`,
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
      </div>

      {/* Plan Selection */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground text-center">
          Need more power? Upgrade your plan.
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "p-8 rounded-[2.5rem] bg-card border flex flex-col h-full transition-all relative overflow-hidden",
                plan.popular
                  ? "border-brand-primary ring-1 ring-brand-primary shadow-2xl"
                  : "border-border",
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-bl-2xl">
                  Most Popular
                </div>
              )}
              <h4 className="text-xl font-bold text-foreground mb-2">{plan.name}</h4>
              <div className="flex items-baseline space-x-1 mb-8">
                <span className="text-4xl font-black text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  /month
                </span>
              </div>
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start space-x-3 text-sm text-muted-foreground"
                  >
                    <Check
                      size={16}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted",
                )}
              >
                {plan.name === "Pro"
                  ? "Current Plan"
                  : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <History className="text-muted-foreground" size={20} />
          <h3 className="text-xl font-bold text-foreground">Billing History</h3>
        </div>
        <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-[10px] font-black uppercase tracking-widest border-b border-border">
                <th className="py-6 px-8">Date</th>
                <th className="py-6 px-8">Description</th>
                <th className="py-6 px-8">Amount</th>
                <th className="py-6 px-8">Status</th>
                <th className="py-6 px-8 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "May 10, 2024",
                  desc: "Pro Agency Plan - Monthly",
                  amount: "$79.00",
                  status: "PAID",
                },
                {
                  date: "Apr 10, 2024",
                  desc: "Pro Agency Plan - Monthly",
                  amount: "$79.00",
                  status: "PAID",
                },
                {
                  date: "Mar 10, 2024",
                  desc: "Pro Agency Plan - Monthly",
                  amount: "$79.00",
                  status: "PAID",
                },
              ].map((inv, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/[0.02] transition-colors border-b border-border last:border-0"
                >
                  <td className="py-6 px-8 text-muted-foreground font-medium">
                    {inv.date}
                  </td>
                  <td className="py-6 px-8 text-foreground font-bold">{inv.desc}</td>
                  <td className="py-6 px-8 text-foreground font-black">
                    {inv.amount}
                  </td>
                  <td className="py-6 px-8">
                    <span className="flex items-center text-[10px] font-black text-green-500 uppercase tracking-widest">
                      <ShieldCheck size={12} className="mr-1.5" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
