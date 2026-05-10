import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new NextResponse('Unauthorized', { status: 401 });

    const { role } = await req.json();
    if (!['OWNER', 'ADMIN', 'MANAGER', 'MEMBER', 'VIEWER'].includes(role)) {
      return new NextResponse('Invalid role', { status: 400 });
    }

    await db.update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.clerkId, clerkId));

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error('[ROLE_UPDATE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
