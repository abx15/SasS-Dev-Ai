import 'dotenv/config'
import { db } from '../lib/db'
import { 
  users, 
  organizations, 
  clients, 
  invoices, 
  analytics, 
  notifications, 
  activityLogs, 
  aiReports 
} from './schema'
import { eq } from 'drizzle-orm'

async function main() {
  console.log('🌱 Seeding database (Drizzle)...')

  // 1. Create Organization
  const orgResult = await db.insert(organizations)
    .values({
      id: crypto.randomUUID(),
      name: 'BizFlow Demo Corp',
      slug: 'bizflow-demo',
      plan: 'PRO',
      maxUsers: 20,
      maxClients: 500,
    })
    .onConflictDoUpdate({
      target: organizations.slug,
      set: { name: 'BizFlow Demo Corp' }
    })
    .returning();
  
  const org = orgResult[0];

  // 2. Create Users
  const userList = [
    {
      id: crypto.randomUUID(),
      clerkId: 'demo_admin_001',
      email: 'admin@bizflow.demo',
      name: 'Admin User',
      role: 'OWNER' as const,
      organizationId: org.id,
      isActive: true,
    },
    {
      id: crypto.randomUUID(),
      clerkId: 'demo_manager_001',
      email: 'manager@bizflow.demo',
      name: 'Sarah Manager',
      role: 'MANAGER' as const,
      organizationId: org.id,
      isActive: true,
    },
    {
      id: crypto.randomUUID(),
      clerkId: 'demo_member_001',
      email: 'member@bizflow.demo',
      name: 'Alex Member',
      role: 'MEMBER' as const,
      organizationId: org.id,
      isActive: true,
    },
    {
      id: crypto.randomUUID(),
      clerkId: 'demo_viewer_001',
      email: 'viewer@bizflow.demo',
      name: 'Vince Viewer',
      role: 'VIEWER' as const,
      organizationId: org.id,
      isActive: true,
    },
  ]

  const seededUsers = await Promise.all(
    userList.map(u => db.insert(users)
      .values(u)
      .onConflictDoUpdate({
        target: users.email,
        set: { name: u.name }
      })
      .returning()
    )
  ).then(res => res.map(r => r[0]));

  // 3. Create 15 Clients
  const clientData = [
    { name: 'TechCorp Solutions', email: 'contact@techcorp.io', company: 'TechCorp Solutions', status: 'ACTIVE' as const, totalRevenue: 48000 },
    { name: 'Apex Digital', email: 'hello@apexdigital.com', company: 'Apex Digital', status: 'ACTIVE' as const, totalRevenue: 32000 },
    { name: 'NexaScale Inc', email: 'info@nexascale.com', company: 'NexaScale Inc', status: 'ACTIVE' as const, totalRevenue: 28500 },
    { name: 'CloudBase Systems', email: 'team@cloudbase.io', company: 'CloudBase Systems', status: 'ACTIVE' as const, totalRevenue: 19200 },
    { name: 'Velocity Corp', email: 'ops@velocitycorp.com', company: 'Velocity Corp', status: 'LEAD' as const, totalRevenue: 0 },
    { name: 'StartupXYZ', email: 'founder@startupxyz.com', company: 'StartupXYZ', status: 'ACTIVE' as const, totalRevenue: 12800 },
    { name: 'DevStudio Pro', email: 'dev@devstudio.pro', company: 'DevStudio Pro', status: 'INACTIVE' as const, totalRevenue: 8400 },
    { name: 'DataFlow Analytics', email: 'data@dataflow.ai', company: 'DataFlow Analytics', status: 'ACTIVE' as const, totalRevenue: 22400 },
    { name: 'SaaSify Inc', email: 'hello@saasify.io', company: 'SaaSify Inc', status: 'ACTIVE' as const, totalRevenue: 36000 },
    { name: 'GrowthLab', email: 'growth@growthlab.co', company: 'GrowthLab', status: 'LEAD' as const, totalRevenue: 0 },
    { name: 'PivotTech', email: 'info@pivottech.dev', company: 'PivotTech', status: 'CHURNED' as const, totalRevenue: 6200 },
    { name: 'FutureSoft', email: 'contact@futuresoft.ai', company: 'FutureSoft', status: 'ACTIVE' as const, totalRevenue: 41600 },
    { name: 'Momentum Digital', email: 'hi@momentumdigital.co', company: 'Momentum Digital', status: 'ACTIVE' as const, totalRevenue: 18900 },
    { name: 'ScaleOps', email: 'ops@scaleops.io', company: 'ScaleOps', status: 'ACTIVE' as const, totalRevenue: 29300 },
    { name: 'InnovateCo', email: 'team@innovateco.com', company: 'InnovateCo', status: 'LEAD' as const, totalRevenue: 0 },
  ]

  const seededClients = await Promise.all(
    clientData.map(c => db.insert(clients)
      .values({
        ...c as any,
        id: crypto.randomUUID(),
        organizationId: org.id,
        assignedToId: seededUsers[0].id
      })
      .onConflictDoUpdate({
        target: [clients.organizationId, clients.email],
        set: { name: c.name }
      })
      .returning()
    )
  ).then(res => res.map(r => r[0]));

  // 4. Create 20 Invoices
  const invoiceStatuses = ['PAID', 'PAID', 'PAID', 'SENT', 'OVERDUE', 'DRAFT']
  for (let i = 1; i <= 20; i++) {
    const amount = Math.floor(Math.random() * 8000) + 1000
    const tax = amount * 0.18
    const total = amount + tax
    const status = invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)]
    const client = seededClients[Math.floor(Math.random() * seededClients.length)]

    await db.insert(invoices)
      .values({
        id: crypto.randomUUID(),
        invoiceNumber: `INV-${String(1000 + i).padStart(4, '0')}`,
        clientId: client.id,
        organizationId: org.id,
        status: status as any,
        amount,
        tax,
        discount: 0,
        totalAmount: total,
        currency: 'USD',
        issueDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
        paidAt: status === 'PAID' ? new Date() : null,
        items: [
          { description: 'Software Development Services', quantity: 1, unitPrice: amount * 0.6, total: amount * 0.6 },
          { description: 'Consulting & Strategy', quantity: 1, unitPrice: amount * 0.4, total: amount * 0.4 },
        ],
      })
      .onConflictDoNothing();
  }

  // 5. Create Analytics (last 90 days)
  for (let i = 89; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const baseRevenue = 3000 + Math.random() * 2000
    const trend = (90 - i) / 90 // upward trend

    await db.insert(analytics).values({
      id: crypto.randomUUID(),
      organizationId: org.id,
      date,
      revenue: baseRevenue * (1 + trend * 0.5),
      newUsers: Math.floor(Math.random() * 15) + 2,
      activeUsers: Math.floor(Math.random() * 80) + 40,
      newClients: Math.floor(Math.random() * 3),
      invoicesSent: Math.floor(Math.random() * 5),
      invoicesPaid: Math.floor(Math.random() * 3),
      conversionRate: 2.5 + Math.random() * 2,
      churnRate: 0.5 + Math.random() * 1,
      trafficData: {
        organic: Math.floor(Math.random() * 400) + 200,
        direct: Math.floor(Math.random() * 200) + 100,
        social: Math.floor(Math.random() * 150) + 50,
        referral: Math.floor(Math.random() * 100) + 30,
      }
    });
  }

  // 6. Notifications
  const notifData = [
    { title: '💰 Payment Received', message: 'TechCorp Solutions paid Invoice #INV-1018 - $9,440', type: 'SUCCESS' as const },
    { title: '⚠️ Invoice Overdue', message: 'Invoice #INV-1015 for Apex Digital is 7 days overdue', type: 'WARNING' as const },
  ]

  for (const n of notifData) {
    await db.insert(notifications).values({
      id: crypto.randomUUID(),
      userId: seededUsers[0].id,
      organizationId: org.id,
      type: n.type,
      title: n.title,
      message: n.message,
    });
  }

  console.log('✅ Drizzle Seed complete!')
}

main().catch(console.error);
