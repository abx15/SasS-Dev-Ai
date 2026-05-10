import Link from "next/link";
import { Check } from "lucide-react";
import { STRIPE_PLANS } from "@/lib/stripe";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const PLAN_KEYS = ["STARTER", "PRO", "ENTERPRISE"] as const;

export function Pricing() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {PLAN_KEYS.map((key, index) => {
            const plan = STRIPE_PLANS[key];
            const isPro = key === "PRO";

            return (
              <div
                key={key}
                className={cn(
                  "relative rounded-2xl border p-8 transition-all",
                  isPro
                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-lg"
                )}
              >
                {isPro && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={cn(
                    "block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all",
                    isPro
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "border border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent"
                  )}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
        </div>

        {/* Free tier note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          All plans include a{" "}
          <span className="font-medium text-foreground">14-day free trial</span>. No credit card required.
        </p>
      </div>
    </section>
  );
}
