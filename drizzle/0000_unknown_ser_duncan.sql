CREATE TYPE "public"."client_status" AS ENUM('ACTIVE', 'INACTIVE', 'LEAD', 'CHURNED');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."member_status" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('INFO', 'SUCCESS', 'WARNING', 'ERROR');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('GENERATING', 'READY', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('REVENUE', 'GROWTH', 'CHURN', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('FREE', 'STARTER', 'PRO', 'ENTERPRISE');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('ACTIVE', 'INACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text,
	"action" text NOT NULL,
	"entity" text NOT NULL,
	"entity_id" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_reports" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"created_by_id" text NOT NULL,
	"title" text NOT NULL,
	"type" "report_type" NOT NULL,
	"prompt" text NOT NULL,
	"content" text,
	"insights" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"status" "report_status" DEFAULT 'GENERATING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analytics" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"revenue" double precision DEFAULT 0 NOT NULL,
	"new_users" integer DEFAULT 0 NOT NULL,
	"active_users" integer DEFAULT 0 NOT NULL,
	"new_clients" integer DEFAULT 0 NOT NULL,
	"invoices_sent" integer DEFAULT 0 NOT NULL,
	"invoices_paid" integer DEFAULT 0 NOT NULL,
	"conversion_rate" double precision DEFAULT 0 NOT NULL,
	"churn_rate" double precision DEFAULT 0 NOT NULL,
	"traffic_data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"company" text,
	"address" text,
	"city" text,
	"country" text,
	"status" "client_status" DEFAULT 'LEAD' NOT NULL,
	"total_revenue" double precision DEFAULT 0 NOT NULL,
	"total_invoices" integer DEFAULT 0 NOT NULL,
	"assigned_to_id" text,
	"notes" text,
	"tags" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "clients_organization_id_email_unique" UNIQUE("organization_id","email")
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_number" text NOT NULL,
	"organization_id" text NOT NULL,
	"client_id" text NOT NULL,
	"status" "invoice_status" DEFAULT 'DRAFT' NOT NULL,
	"amount" double precision NOT NULL,
	"tax" double precision DEFAULT 0 NOT NULL,
	"discount" double precision DEFAULT 0 NOT NULL,
	"total_amount" double precision NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"issue_date" timestamp DEFAULT now() NOT NULL,
	"due_date" timestamp NOT NULL,
	"paid_at" timestamp,
	"items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"notes" text,
	"terms" text,
	"stripe_payment_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invoices_organization_id_invoice_number_unique" UNIQUE("organization_id","invoice_number")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"type" "notification_type" DEFAULT 'INFO' NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"read_at" timestamp,
	"action_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo_url" text,
	"plan" "subscription_plan" DEFAULT 'FREE' NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"subscription_status" "subscription_status" DEFAULT 'INACTIVE' NOT NULL,
	"subscription_ends_at" timestamp,
	"max_users" integer DEFAULT 1 NOT NULL,
	"max_clients" integer DEFAULT 5 NOT NULL,
	"max_invoices" integer DEFAULT 10 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug"),
	CONSTRAINT "organizations_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "organizations_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"stripe_price_id" text,
	"stripe_customer_id" text,
	"status" "subscription_status" NOT NULL,
	"plan" "subscription_plan" NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_organization_id_unique" UNIQUE("organization_id"),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"role" "user_role" DEFAULT 'MEMBER' NOT NULL,
	"permissions" text[],
	"status" "member_status" DEFAULT 'PENDING' NOT NULL,
	"invited_by_id" text,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"joined_at" timestamp,
	CONSTRAINT "team_members_user_id_organization_id_unique" UNIQUE("user_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"avatar_url" text,
	"role" "user_role" DEFAULT 'MEMBER' NOT NULL,
	"organization_id" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
