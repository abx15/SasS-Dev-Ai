'use server';

import { db } from '@/lib/db';
import { teamMembers, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function inviteTeamMember(organizationId: string, email: string, role: any) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error('Unauthorized');

  const currentUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId)
  });

  if (!currentUser || (currentUser.role !== 'OWNER' && currentUser.role !== 'ADMIN')) {
    throw new Error('Forbidden');
  }

  const invitedUser = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  const member = await db.insert(teamMembers)
    .values({
      id: crypto.randomUUID(),
      organizationId,
      userId: invitedUser?.id || 'pending_user_placeholder', 
      role,
      status: 'PENDING',
      invitedById: currentUser.id,
    })
    .returning();

  revalidatePath('/dashboard/team');
  return member[0];
}

export async function updateMemberRole(memberId: string, role: any) {
  const member = await db.update(teamMembers)
    .set({ role })
    .where(eq(teamMembers.id, memberId))
    .returning();
  
  revalidatePath('/dashboard/team');
  return member[0];
}

export async function removeMember(memberId: string) {
  await db.delete(teamMembers).where(eq(teamMembers.id, memberId));
  revalidatePath('/dashboard/team');
}
