'use server';

import { db } from '@/lib/db';
import { analytics } from '@/db/schema';
import { eq, and, gte, asc, desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function getAnalyticsSummary(organizationId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const summary = await db.query.analytics.findFirst({
    where: eq(analytics.organizationId, organizationId),
    orderBy: [desc(analytics.date)],
  });

  return summary;
}

export async function getRevenueData(organizationId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const data = await db.select({
    date: analytics.date,
    revenue: analytics.revenue,
  })
  .from(analytics)
  .where(
    and(
      eq(analytics.organizationId, organizationId),
      gte(analytics.date, startDate)
    )
  )
  .orderBy(asc(analytics.date));

  return data;
}

export async function getUserGrowthData(organizationId: string) {
  const data = await db.select({
    date: analytics.date,
    newUsers: analytics.newUsers,
    activeUsers: analytics.activeUsers,
  })
  .from(analytics)
  .where(eq(analytics.organizationId, organizationId))
  .orderBy(asc(analytics.date));

  return data;
}
