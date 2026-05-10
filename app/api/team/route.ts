import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { teamMembers, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { teamMemberSchema } from '@/lib/validations';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return new NextResponse('Organization ID required', { status: 400 });
    }

    const members = await db.query.teamMembers.findMany({
      where: eq(teamMembers.organizationId, organizationId),
      with: {
        user: {
          columns: { name: true, email: true, avatarUrl: true },
        },
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('[TEAM_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId: currentClerkId } = await auth();
    if (!currentClerkId) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { email, role, organizationId } = teamMemberSchema.parse(body);

    const currentUser = await db.query.users.findFirst({
      where: eq(users.clerkId, currentClerkId),
    });

    if (!currentUser || (currentUser.role !== 'OWNER' && currentUser.role !== 'ADMIN')) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const invitedUser = await db.query.users.findFirst({ where: eq(users.email, email) });

    const teamMember = await db.insert(teamMembers)
      .values({
        id: crypto.randomUUID(),
        organizationId,
        role,
        status: 'PENDING',
        invitedById: currentUser.id,
        userId: invitedUser?.id || 'placeholder_until_join',
      })
      .returning();

    return NextResponse.json(teamMember[0]);
  } catch (error: any) {
    console.error('[TEAM_POST]', error);
    return new NextResponse(error.message || 'Internal Error', { status: 500 });
  }
}
