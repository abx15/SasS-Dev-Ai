'use server';

import { db } from '@/lib/db';
import { clients } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { clientSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createClient(organizationId: string, data: any) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const validatedData = clientSchema.parse(data);

  const client = await db.insert(clients)
    .values({
      id: crypto.randomUUID(),
      ...validatedData,
      organizationId,
    })
    .returning();

  revalidatePath('/dashboard/clients');
  return client[0];
}

export async function updateClient(id: string, data: any) {
  const client = await db.update(clients)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(clients.id, id))
    .returning();
  
  revalidatePath('/dashboard/clients');
  return client[0];
}

export async function deleteClient(id: string) {
  await db.delete(clients).where(eq(clients.id, id));
  revalidatePath('/dashboard/clients');
}

export async function getClientStats(organizationId: string) {
  const stats = await db.select({
    status: clients.status,
    count: sql<number>`count(*)`,
    totalRevenue: sql<number>`sum(${clients.totalRevenue})`,
  })
  .from(clients)
  .where(eq(clients.organizationId, organizationId))
  .groupBy(clients.status);

  return stats;
}
