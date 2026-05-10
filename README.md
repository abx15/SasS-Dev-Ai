# 🚀 BizFlow AI — Advanced Business Management Platform

BizFlow AI is a high-fidelity, role-based SaaS platform designed for elite agencies and enterprises. It integrates AI-driven analytics, granular team management, and automated invoicing into a stunning, responsive interface.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070)

## ✨ Features

- **🛡️ Granular RBAC (Role-Based Access Control):** 
  - **OWNER:** Full workspace control, billing, and danger zone access.
  - **ADMIN:** Complete management of team, clients, and analytics.
  - **MANAGER:** Team coordination, report generation, and client tracking.
  - **MEMBER:** Operational access to clients and basic AI tools.
  - **VIEWER:** Read-only access to dashboard and specific metrics.

- **📊 AI-Driven Analytics Engine:**
  - Real-time revenue tracking and growth projections.
  - Interactive charts powered by Recharts (Revenue, User Activity, Traffic).
  - AI Audit tools for predictive business simulations.

- **🤖 Elite AI Assistant:**
  - Specialized GPT-4o powered chat interface for business insights.
  - Context-aware suggestions based on your organization's data.

- **💼 Project & Client Management:**
  - Status tracking (Active, Lead, Churned).
  - Revenue per client analysis and relationship history.

- **🧾 Smart Invoicing System:**
  - Automated invoice generation with professional templates.
  - Status management (Paid, Sent, Overdue, Draft).

- **🎨 Premium Design System:**
  - **Next.js 15+** with App Router architecture.
  - **Tailwind CSS v4** semantic variable system.
  - **Framer Motion** for sleek, glassmorphic animations.
  - **Lottie Animations** for a dynamic, "alive" UI feel.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Drizzle ORM](https://orm.drizzle.team/), [PostgreSQL (Neon)](https://neon.tech/)
- **Auth:** [Clerk](https://clerk.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/), [Lottie](https://lottiefiles.com/)
- **Database:** [Neon DB](https://neon.tech/), [Redis](https://redis.io/) (for caching)

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- PostgreSQL instance (or Neon DB)
- Clerk API Keys

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/bizflow-ai.git

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### 3. Database Setup
```bash
# Push schema to database
npm run db:push

# Seed initial data (Organizations, Clients, Analytics)
npm run db:seed
```

### 4. Running Locally
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 🧪 Development & Testing (Mock Roles)

You can test different roles without changing the database using the `mockRole` query parameter:
- **Owner:** `/dashboard?mockRole=OWNER`
- **Admin:** `/dashboard?mockRole=ADMIN`
- **Manager:** `/dashboard?mockRole=MANAGER`
- **Viewer:** `/dashboard?mockRole=VIEWER`

---

Built with ❤️ by the BizFlow AI Team.
