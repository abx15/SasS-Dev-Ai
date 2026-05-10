import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { organizations, analytics } from '@/db/schema';
import { eq, and, gte, asc } from 'drizzle-orm';
import { redis, CACHE_KEYS, getCachedData, setCachedData } from '@/lib/redis';
import { NextResponse } from 'next/server';
import { generalRateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const identifier = getRateLimitIdentifier(req, userId);
    const { success } = await generalRateLimit.limit(identifier);
    if (!success) return new NextResponse('Rate limit exceeded', { status: 429 });

    const { searchParams } = new URL(req.url);
    let organizationId = searchParams.get('organizationId');
    const days = parseInt(searchParams.get('days') || '30');

    if (!organizationId || organizationId === 'default') {
      const demoOrg = await db.query.organizations.findFirst({
        where: eq(organizations.slug, 'bizflow-demo')
      });
      if (demoOrg) organizationId = demoOrg.id;
    }

    if (!organizationId) {
      return new NextResponse('Organization ID required', { status: 400 });
    }

    const cacheKey = `${CACHE_KEYS.ANALYTICS_SUMMARY(organizationId)}:d${days}`;
    const cached = await getCachedData(cacheKey);
    if (cached) return NextResponse.json(cached);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analyticsData = await db.select()
      .from(analytics)
      .where(
        and(
          eq(analytics.organizationId, organizationId),
          gte(analytics.date, startDate)
        )
      )
      .orderBy(asc(analytics.date));

    // Aggregate data
    const summary = analyticsData.reduce(
      (acc, curr) => ({
        totalRevenue: acc.totalRevenue + curr.revenue,
        totalNewClients: acc.totalNewClients + curr.newClients,
        totalInvoicesSent: acc.totalInvoicesSent + curr.invoicesSent,
        totalInvoicesPaid: acc.totalInvoicesPaid + curr.invoicesPaid,
      }),
      { totalRevenue: 0, totalNewClients: 0, totalInvoicesSent: 0, totalInvoicesPaid: 0 }
    );

    const result = {
      summary,
      chartData: analyticsData.map((a) => ({
        date: a.date.toISOString().split('T')[0],
        revenue: a.revenue,
        clients: a.newClients,
      })),
    };

    // Cache for 5 minutes
    await setCachedData(cacheKey, result, 300);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[ANALYTICS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
