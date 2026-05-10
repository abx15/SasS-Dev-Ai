import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

// ─── TailwindCSS class merger ─────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Currency formatting ──────────────────────────────────────────────────────
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ─── Number formatting ────────────────────────────────────────────────────────
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(date: Date | string, fmt = "MMM d, yyyy"): string {
  return format(new Date(date), fmt);
}

export function timeAgo(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// ─── Invoice number generator ─────────────────────────────────────────────────
export function generateInvoiceNumber(sequence: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(4, "0");
  return `INV-${year}-${padded}`;
}

// ─── Sleep (for testing/throttling) ──────────────────────────────────────────
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ─── Truncate string ──────────────────────────────────────────────────────────
export function truncate(str: string, maxLength = 50): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
}

// ─── Percentage change ────────────────────────────────────────────────────────
export function percentageChange(current: number, previous: number): string {
  if (previous === 0) return "+∞%";
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
}
