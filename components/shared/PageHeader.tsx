import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "outline";
  }>;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {actions && actions.length > 0 && (
        <div className="flex shrink-0 gap-2">
          {actions.map((action) =>
            action.href ? (
              <a
                key={action.label}
                href={action.href}
                className={cn(
                  "inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  action.variant === "outline"
                    ? "border border-border bg-background hover:bg-accent hover:text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {action.label}
              </a>
            ) : (
              <button
                key={action.label}
                onClick={action.onClick}
                className={cn(
                  "inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  action.variant === "outline"
                    ? "border border-border bg-background hover:bg-accent hover:text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {action.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
