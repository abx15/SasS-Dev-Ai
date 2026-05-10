import { auth } from '@clerk/nextjs/server';
import { stripe, PLANS, PlanType } from '@/lib/stripe';
import { db } from '@/lib/db';
import { organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const { planId, organizationId } = await req.json();

    const plan = planId as PlanType;
    const planConfig = PLANS[plan];

    if (!planConfig || !planConfig.priceId) {
      return new NextResponse('Invalid plan', { status: 400 });
    }

    const organization = await db.query.organizations.findFirst({
      where: eq(organizations.id, organizationId),
    });

    if (!organization) {
      return new NextResponse('Organization not found', { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: {
        organizationId,
        clerkId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_CHECKOUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
