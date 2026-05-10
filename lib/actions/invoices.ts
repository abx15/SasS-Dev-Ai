'use server';

import { db } from '@/lib/db';
import { invoices } from '@/db/schema';
import { eq, and, sql, count as drizzleCount } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { invoiceSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createInvoice(organizationId: string, data: any) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const validatedData = invoiceSchema.parse(data);
  
  const counts = await db.select({ value: drizzleCount() })
    .from(invoices)
    .where(eq(invoices.organizationId, organizationId));
  
  const count = counts[0].value;
  const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
  
  const totalAmount = validatedData.amount + (validatedData.tax || 0) - (validatedData.discount || 0);

  const invoice = await db.insert(invoices)
    .values({
      id: crypto.randomUUID(),
      ...validatedData,
      organizationId,
      invoiceNumber,
      totalAmount,
    })
    .returning();

  revalidatePath('/dashboard/invoices');
  return invoice[0];
}

export async function updateInvoice(id: string, data: any) {
  const invoice = await db.update(invoices)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, id))
    .returning();
  
  revalidatePath('/dashboard/invoices');
  return invoice[0];
}

export async function deleteInvoice(id: string) {
  await db.delete(invoices).where(eq(invoices.id, id));
  revalidatePath('/dashboard/invoices');
}

export async function sendInvoice(id: string) {
  // Mock sending email
  console.log(`Sending invoice ${id} to client email...`);
  await db.update(invoices)
    .set({ status: 'SENT', updatedAt: new Date() })
    .where(eq(invoices.id, id));
  
  revalidatePath('/dashboard/invoices');
}
