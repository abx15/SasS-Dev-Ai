import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new NextResponse('Unauthorized', { status: 401 });

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!user) return new NextResponse('User not found', { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[USER_PROFILE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
