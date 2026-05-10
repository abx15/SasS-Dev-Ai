// @ts-nocheck
import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Create Organization
  const org = await prisma.organization.upsert({
    where: { slug: 'bizflow-demo' },
    update: {},
    create: {
      name: 'BizFlow Demo Corp',
      slug: 'bizflow-demo',
      plan: 'PRO',
      maxUsers: 20,
      maxClients: 500,
    }
  })

  // 2. Create Users (use your actual Clerk user ID for first user)
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@bizflow.demo' },
      update: {},
      create: {
        clerkId: 'demo_admin_001',
        email: 'admin@bizflow.demo',
        name: 'Admin User',
        role: 'OWNER',
        organizationId: org.id,
        isActive: true,
      }
    }),
    prisma.user.upsert({
      where: { email: 'manager@bizflow.demo' },
      update: {},
      create: {
        clerkId: 'demo_manager_001',
        email: 'manager@bizflow.demo',
        name: 'Sarah Manager',
        role: 'MANAGER',
        organizationId: org.id,
        isActive: true,
      }
    }),
    prisma.user.upsert({
      where: { email: 'member@bizflow.demo' },
      update: {},
      create: {
        clerkId: 'demo_member_001',
        email: 'member@bizflow.demo',
        name: 'Alex Member',
        role: 'MEMBER',
        organizationId: org.id,
        isActive: true,
      }
    }),
  ])

  // 3. Create 15 Clients
  const clientData = [
    { name: 'TechCorp Solutions', email: 'contact@techcorp.io', company: 'TechCorp Solutions', status: 'ACTIVE', totalRevenue: 48000 },
    { name: 'Apex Digital', email: 'hello@apexdigital.com', company: 'Apex Digital', status: 'ACTIVE', totalRevenue: 32000 },
    { name: 'NexaScale Inc', email: 'info@nexascale.com', company: 'NexaScale Inc', status: 'ACTIVE', totalRevenue: 28500 },
    { name: 'CloudBase Systems', email: 'team@cloudbase.io', company: 'CloudBase Systems', status: 'ACTIVE', totalRevenue: 19200 },
    { name: 'Velocity Corp', email: 'ops@velocitycorp.com', company: 'Velocity Corp', status: 'LEAD', totalRevenue: 0 },
    { name: 'StartupXYZ', email: 'founder@startupxyz.com', company: 'StartupXYZ', status: 'ACTIVE', totalRevenue: 12800 },
    { name: 'DevStudio Pro', email: 'dev@devstudio.pro', company: 'DevStudio Pro', status: 'INACTIVE', totalRevenue: 8400 },
    { name: 'DataFlow Analytics', email: 'data@dataflow.ai', company: 'DataFlow Analytics', status: 'ACTIVE', totalRevenue: 22400 },
    { name: 'SaaSify Inc', email: 'hello@saasify.io', company: 'SaaSify Inc', status: 'ACTIVE', totalRevenue: 36000 },
    { name: 'GrowthLab', email: 'growth@growthlab.co', company: 'GrowthLab', status: 'LEAD', totalRevenue: 0 },
    { name: 'PivotTech', email: 'info@pivottech.dev', company: 'PivotTech', status: 'CHURNED', totalRevenue: 6200 },
    { name: 'FutureSoft', email: 'contact@futuresoft.ai', company: 'FutureSoft', status: 'ACTIVE', totalRevenue: 41600 },
    { name: 'Momentum Digital', email: 'hi@momentumdigital.co', company: 'Momentum Digital', status: 'ACTIVE', totalRevenue: 18900 },
    { name: 'ScaleOps', email: 'ops@scaleops.io', company: 'ScaleOps', status: 'ACTIVE', totalRevenue: 29300 },
    { name: 'InnovateCo', email: 'team@innovateco.com', company: 'InnovateCo', status: 'LEAD', totalRevenue: 0 },
  ]

  const clients = await Promise.all(
    clientData.map(c => prisma.client.upsert({
      where: { organizationId_email: { organizationId: org.id, email: c.email } },
      update: {},
      create: { ...c as any, organizationId: org.id, assignedToId: users[0].id }
    }))
  )

  // 4. Create 20 Invoices
  const invoiceStatuses = ['PAID', 'PAID', 'PAID', 'SENT', 'OVERDUE', 'DRAFT']
  for (let i = 1; i <= 20; i++) {
    const amount = Math.floor(Math.random() * 8000) + 1000
    const tax = amount * 0.18
    const total = amount + tax
    const status = invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)]
    const client = clients[Math.floor(Math.random() * clients.length)]

    await prisma.invoice.upsert({
      where: { organizationId_invoiceNumber: { organizationId: org.id, invoiceNumber: `INV-${String(1000 + i).padStart(4, '0')}` } },
      update: {},
      create: {
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
      }
    })
  }

  // 5. Create Analytics (last 90 days)
  for (let i = 89; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const baseRevenue = 3000 + Math.random() * 2000
    const trend = (90 - i) / 90 // upward trend

    await prisma.analytics.create({
      data: {
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
      }
    })
  }

  // 6. Create Notifications
  const notifications = [
    { title: '💰 Payment Received', message: 'TechCorp Solutions paid Invoice #INV-1018 - $9,440', type: 'SUCCESS' },
    { title: '⚠️ Invoice Overdue', message: 'Invoice #INV-1015 for Apex Digital is 7 days overdue', type: 'WARNING' },
    { title: '🤖 AI Report Ready', message: 'Your Q4 Revenue Analysis report has been generated', type: 'INFO' },
    { title: '👤 New Team Member', message: 'Alex Member joined your organization', type: 'SUCCESS' },
    { title: '📊 Monthly Report', message: 'October analytics report is ready to view', type: 'INFO' },
    { title: '❌ Payment Failed', message: 'Subscription renewal payment failed - update billing', type: 'ERROR' },
  ]

  for (const n of notifications) {
    await prisma.notification.create({
      data: {
        userId: users[0].id,
        organizationId: org.id,
        type: n.type as any,
        title: n.title,
        message: n.message,
        isRead: false,
      }
    })
  }

  // 7. Create Activity Logs
  const activities = [
    { action: 'invoice.created', entity: 'Invoice', entityId: 'INV-1020' },
    { action: 'client.updated', entity: 'Client', entityId: 'techcorp' },
    { action: 'team.invited', entity: 'User', entityId: 'alex@example.com' },
    { action: 'report.generated', entity: 'AIReport', entityId: 'report-001' },
    { action: 'invoice.paid', entity: 'Invoice', entityId: 'INV-1018' },
    { action: 'settings.updated', entity: 'Organization', entityId: org.id },
  ]

  for (const a of activities) {
    await prisma.activityLog.create({
      data: {
        organizationId: org.id,
        userId: users[0].id,
        action: a.action,
        entity: a.entity,
        entityId: a.entityId,
        metadata: { timestamp: new Date().toISOString() },
      }
    })
  }

  // 8. Create AI Reports
  await prisma.aIReport.createMany({
    data: [
      {
        organizationId: org.id,
        createdById: users[0].id,
        title: 'Q4 Revenue Analysis',
        type: 'REVENUE',
        prompt: 'Analyze Q4 revenue trends',
        content: 'Revenue increased 34% YoY. Top clients: TechCorp, SaaSify. Recommendation: Focus on enterprise tier upsell.',
        status: 'READY',
        insights: { growth: '34%', topClient: 'TechCorp', recommendation: 'Enterprise upsell' }
      },
      {
        organizationId: org.id,
        createdById: users[0].id,
        title: 'User Growth Report - October',
        type: 'GROWTH',
        prompt: 'Analyze user growth patterns',
        content: 'User base grew 28% MoM. Highest acquisition from organic search (42%). Churn rate decreased to 1.2%.',
        status: 'READY',
        insights: { growth: '28%', topChannel: 'Organic', churn: '1.2%' }
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`   📊 Organization: ${org.name}`)
  console.log(`   👥 Users: ${users.length}`)
  console.log(`   🤝 Clients: ${clients.length}`)
  console.log(`   📄 Invoices: 20`)
  console.log(`   📈 Analytics: 90 days`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
