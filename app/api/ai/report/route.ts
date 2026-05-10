import { auth } from '@clerk/nextjs/server';
import { generateReport } from '@/lib/openai';
import { db } from '@/lib/db';
import { aiReports, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new NextResponse('Unauthorized', { status: 401 });

    const { organizationId, type, analyticsData, title } = await req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId)
    });
    if (!user) return new NextResponse('User not found', { status: 404 });

    const reportId = crypto.randomUUID();

    await db.insert(aiReports).values({
      id: reportId,
      organizationId,
      createdById: user.id,
      title,
      type: type as any,
      prompt: `Generate a ${type} report based on provided data.`,
      status: 'GENERATING',
    });

    generateReport(type, analyticsData).then(async (result) => {
      await db.update(aiReports)
        .set({
          content: result.content,
          status: 'READY',
          insights: result.usage as any,
        })
        .where(eq(aiReports.id, reportId));
    }).catch(async (err) => {
      console.error('AI Generation failed:', err);
      await db.update(aiReports)
        .set({ status: 'FAILED' })
        .where(eq(aiReports.id, reportId));
    });

    return NextResponse.json({ reportId });
  } catch (error) {
    console.error('[AI_REPORT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
