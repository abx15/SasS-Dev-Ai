import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { notifications, users } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new NextResponse('Unauthorized', { status: 401 });

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId)
    });
    if (!user) return new NextResponse('User not found', { status: 404 });

    const notificationsList = await db.query.notifications.findMany({
      where: and(eq(notifications.userId, user.id), eq(notifications.isRead, false)),
      orderBy: [desc(notifications.createdAt)],
      limit: 20,
    });

    return NextResponse.json(notificationsList);
  } catch (error) {
    console.error('[NOTIFICATIONS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new NextResponse('Unauthorized', { status: 401 });

    const { notificationId } = await req.json();

    await db.update(notifications)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(notifications.id, notificationId));

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('[NOTIFICATIONS_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return new NextResponse('Unauthorized', { status: 401 });

    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId)
    });
    if (!user) return new NextResponse('User not found', { status: 404 });

    await db.delete(notifications)
      .where(eq(notifications.userId, user.id));

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('[NOTIFICATIONS_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
