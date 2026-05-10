'use server';

import { db } from '@/lib/db';
import { aiReports, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function generateInsights(organizationId: string, analyticsData: any) {
  // Trigger AI generation via API (Internal call or SDK)
  console.log('Generating insights for org:', organizationId);
}

export async function generateReport(organizationId: string, type: any, analyticsData: any, title: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error('Unauthorized');

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId)
  });
  if (!user) throw new Error('User not found');

  const report = await db.insert(aiReports)
    .values({
      id: crypto.randomUUID(),
      organizationId,
      createdById: user.id,
      title,
      type,
      prompt: `Generate report for ${type}`,
      status: 'GENERATING',
    })
    .returning();

  return report[0].id;
}

export async function getReportStatus(reportId: string) {
  const report = await db.query.aiReports.findFirst({
    where: eq(aiReports.id, reportId),
    columns: { status: true, content: true },
  });

  return report;
}
