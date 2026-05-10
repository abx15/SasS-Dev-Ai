import {
  BarChart3,
  Bot,
  FileText,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Globe,
} from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Business Assistant",
    description: "Ask anything about your business. Get instant AI-powered answers and actionable recommendations.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards with revenue trends, user activity, traffic sources, and growth metrics.",
  },
  {
    icon: FileText,
    title: "Smart Invoicing",
    description: "Create, send, and track invoices automatically. Get paid faster with smart payment reminders.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Invite team members, assign roles, and maintain a full activity audit trail.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption, role-based access control, and SOC 2-ready infrastructure.",
  },
  {
    icon: TrendingUp,
    title: "AI Reports",
    description: "Generate comprehensive business reports on demand with AI-powered narrative insights.",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Invoice and track revenue in any currency with automatic exchange rate handling.",
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description: "Automate repetitive tasks — from follow-up emails to report generation.",
  },
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything Your Business Needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From day-to-day operations to strategic AI insights — all in one platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
