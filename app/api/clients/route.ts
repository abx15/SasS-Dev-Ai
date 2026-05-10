import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { clients } from '@/db/schema';
import { eq, and, or, ilike, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { clientSchema } from '@/lib/validations';
import { generalRateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const identifier = getRateLimitIdentifier(req, userId);
    const { success } = await generalRateLimit.limit(identifier);
    if (!success) return new NextResponse('Too many requests', { status: 429 });

    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status');

    if (!orgId) return new NextResponse('Org ID required', { status: 400 });

    let whereClause = eq(clients.organizationId, orgId);

    if (query) {
      whereClause = and(whereClause, or(
        ilike(clients.name, `%${query}%`),
        ilike(clients.company, `%${query}%`)
      )) as any;
    }

    if (status) {
      whereClause = and(whereClause, eq(clients.status, status as any)) as any;
    }

    const clientsList = await db.select()
      .from(clients)
      .where(whereClause)
      .orderBy(desc(clients.createdAt));

    return NextResponse.json(clientsList);
  } catch (error) {
    console.error('[CLIENTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const data = clientSchema.parse(body);
    const { organizationId } = body;

    const client = await db.insert(clients)
      .values({
        id: crypto.randomUUID(),
        ...data,
        organizationId,
      })
      .returning();

    return NextResponse.json(client[0]);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
