import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { invoices, clients } from '@/db/schema';
import { eq, desc, count as drizzleCount } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { invoiceSchema } from '@/lib/validations';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');

    if (!orgId) return new NextResponse('Org ID required', { status: 400 });

    const invoicesList = await db.query.invoices.findMany({
      where: eq(invoices.organizationId, orgId),
      with: { client: true },
      orderBy: [desc(invoices.createdAt)],
    });

    return NextResponse.json(invoicesList);
  } catch (error) {
    console.error('[INVOICES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const validatedData = invoiceSchema.parse(body);
    const { organizationId } = body;

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
        status: 'DRAFT',
      })
      .returning();

    return NextResponse.json(invoice[0]);
  } catch (error: any) {
    console.error('[INVOICES_POST]', error);
    return new NextResponse(error.message, { status: 400 });
  }
}
