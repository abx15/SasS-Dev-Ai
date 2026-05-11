import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "BizFlow AI – AI-Powered Business Management",
    template: "%s | BizFlow AI",
  },
  description:
    "BizFlow AI is a production-grade SaaS platform that supercharges your business with AI-powered analytics, invoicing, team management, and automated insights.",
  keywords: ["business management", "AI SaaS", "analytics", "invoicing", "team management"],
  authors: [{ name: "BizFlow AI Team" }],
  creator: "BizFlow AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "BizFlow AI",
    title: "BizFlow AI – AI-Powered Business Management",
    description: "Supercharge your business with AI-driven insights and automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizFlow AI",
    description: "AI-Powered Business Management SaaS",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <QueryProvider>
              {children}
              <Toaster position="bottom-right" richColors />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
