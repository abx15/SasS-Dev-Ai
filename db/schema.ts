import { 
  pgTable, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  doublePrecision, 
  jsonb, 
  uniqueIndex,
  primaryKey,
  pgEnum,
  unique
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER']);
export const subscriptionPlanEnum = pgEnum('subscription_plan', ['FREE', 'STARTER', 'PRO', 'ENTERPRISE']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['ACTIVE', 'INACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING']);
export const clientStatusEnum = pgEnum('client_status', ['ACTIVE', 'INACTIVE', 'LEAD', 'CHURNED']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED']);
export const memberStatusEnum = pgEnum('member_status', ['PENDING', 'ACTIVE', 'SUSPENDED']);
export const reportTypeEnum = pgEnum('report_type', ['REVENUE', 'GROWTH', 'CHURN', 'CUSTOM']);
export const reportStatusEnum = pgEnum('report_status', ['GENERATING', 'READY', 'FAILED']);
export const notificationTypeEnum = pgEnum('notification_type', ['INFO', 'SUCCESS', 'WARNING', 'ERROR']);

// Tables
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: userRoleEnum('role').default('MEMBER').notNull(),
  organizationId: text('organization_id'),
  isActive: boolean('is_active').default(true).notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  logoUrl: text('logo_url'),
  plan: subscriptionPlanEnum('plan').default('FREE').notNull(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('INACTIVE').notNull(),
  subscriptionEndsAt: timestamp('subscription_ends_at'),
  maxUsers: integer('max_users').default(1).notNull(),
  maxClients: integer('max_clients').default(5).notNull(),
  maxInvoices: integer('max_invoices').default(10).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const clients = pgTable('clients', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  status: clientStatusEnum('status').default('LEAD').notNull(),
  totalRevenue: doublePrecision('total_revenue').default(0).notNull(),
  totalInvoices: integer('total_invoices').default(0).notNull(),
  assignedToId: text('assigned_to_id'),
  notes: text('notes'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgEmailUnique: unique().on(table.organizationId, table.email),
}));

export const invoices = pgTable('invoices', {
  id: text('id').primaryKey(),
  invoiceNumber: text('invoice_number').notNull(),
  organizationId: text('organization_id').notNull(),
  clientId: text('client_id').notNull(),
  status: invoiceStatusEnum('status').default('DRAFT').notNull(),
  amount: doublePrecision('amount').notNull(),
  tax: doublePrecision('tax').default(0).notNull(),
  discount: doublePrecision('discount').default(0).notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
  currency: text('currency').default('USD').notNull(),
  issueDate: timestamp('issue_date').defaultNow().notNull(),
  dueDate: timestamp('due_date').notNull(),
  paidAt: timestamp('paid_at'),
  items: jsonb('items').default([]).notNull(),
  notes: text('notes'),
  terms: text('terms'),
  stripePaymentId: text('stripe_payment_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgInvoiceNumUnique: unique().on(table.organizationId, table.invoiceNumber),
}));

export const teamMembers = pgTable('team_members', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  organizationId: text('organization_id').notNull(),
  role: userRoleEnum('role').default('MEMBER').notNull(),
  permissions: text('permissions').array(),
  status: memberStatusEnum('status').default('PENDING').notNull(),
  invitedById: text('invited_by_id'),
  invitedAt: timestamp('invited_at').defaultNow().notNull(),
  joinedAt: timestamp('joined_at'),
}, (table) => ({
  userOrgUnique: unique().on(table.userId, table.organizationId),
}));

export const analytics = pgTable('analytics', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  date: timestamp('date').defaultNow().notNull(),
  revenue: doublePrecision('revenue').default(0).notNull(),
  newUsers: integer('new_users').default(0).notNull(),
  activeUsers: integer('active_users').default(0).notNull(),
  newClients: integer('new_clients').default(0).notNull(),
  invoicesSent: integer('invoices_sent').default(0).notNull(),
  invoicesPaid: integer('invoices_paid').default(0).notNull(),
  conversionRate: doublePrecision('conversion_rate').default(0).notNull(),
  churnRate: doublePrecision('churn_rate').default(0).notNull(),
  trafficData: jsonb('traffic_data').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const aiReports = pgTable('ai_reports', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  createdById: text('created_by_id').notNull(),
  title: text('title').notNull(),
  type: reportTypeEnum('type').notNull(),
  prompt: text('prompt').notNull(),
  content: text('content'),
  insights: jsonb('insights').default({}).notNull(),
  status: reportStatusEnum('status').default('GENERATING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  organizationId: text('organization_id').notNull(),
  type: notificationTypeEnum('type').default('INFO').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  readAt: timestamp('read_at'),
  actionUrl: text('action_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  userId: text('user_id'),
  action: text('action').notNull(),
  entity: text('entity').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata').default({}).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').unique().notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').unique().notNull(),
  stripePriceId: text('stripe_price_id'),
  stripeCustomerId: text('stripe_customer_id'),
  status: subscriptionStatusEnum('status').notNull(),
  plan: subscriptionPlanEnum('plan').notNull(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
  teamMemberships: many(teamMembers),
  assignedClients: many(clients, { relationName: 'AssignedTo' }),
  activityLogs: many(activityLogs),
  notifications: many(notifications),
  aiReports: many(aiReports, { relationName: 'CreatedBy' }),
  invitedMembers: many(teamMembers, { relationName: 'InvitedBy' }),
}));

export const organizationsRelations = relations(organizations, ({ many, one }) => ({
  users: many(users),
  members: many(teamMembers),
  clients: many(clients),
  invoices: many(invoices),
  reports: many(aiReports),
  analytics: many(analytics),
  activityLogs: many(activityLogs),
  notifications: many(notifications),
  subscription: one(subscriptions, {
    fields: [organizations.id],
    references: [subscriptions.organizationId],
  }),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [clients.organizationId],
    references: [organizations.id],
  }),
  assignedTo: one(users, {
    fields: [clients.assignedToId],
    references: [users.id],
    relationName: 'AssignedTo',
  }),
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  organization: one(organizations, {
    fields: [invoices.organizationId],
    references: [organizations.id],
  }),
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [teamMembers.organizationId],
    references: [organizations.id],
  }),
  invitedBy: one(users, {
    fields: [teamMembers.invitedById],
    references: [users.id],
    relationName: 'InvitedBy',
  }),
}));

export const aiReportsRelations = relations(aiReports, ({ one }) => ({
  organization: one(organizations, {
    fields: [aiReports.organizationId],
    references: [organizations.id],
  }),
  createdBy: one(users, {
    fields: [aiReports.createdById],
    references: [users.id],
    relationName: 'CreatedBy',
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [notifications.organizationId],
    references: [organizations.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  organization: one(organizations, {
    fields: [subscriptions.organizationId],
    references: [organizations.id],
  }),
}));
