import { headers } from 'next/headers';
import { stripe, getPlanByPriceId } from '@/lib/stripe';
import { db } from '@/lib/db';
import { organizations, subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.organizationId) {
      return new Response('Organization ID missing in metadata', { status: 400 });
    }

    const orgId = session.metadata.organizationId;
    const plan = getPlanByPriceId(subscription.items.data[0].price.id);

    await db.update(organizations)
      .set({
        plan: plan || 'FREE',
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: 'ACTIVE',
        subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
      })
      .where(eq(organizations.id, orgId));

    await db.insert(subscriptions)
      .values({
        id: crypto.randomUUID(),
        organizationId: orgId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: session.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        status: 'ACTIVE',
        plan: plan || 'FREE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      })
      .onConflictDoUpdate({
        target: subscriptions.organizationId,
        set: {
          stripeSubscriptionId: subscription.id,
          status: 'ACTIVE',
          plan: plan || 'FREE',
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        }
      });
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const plan = getPlanByPriceId(subscription.items.data[0].price.id);

    await db.update(organizations)
      .set({
        plan: plan || 'FREE',
        subscriptionStatus: subscription.status.toUpperCase() as any,
        subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
      })
      .where(eq(organizations.stripeSubscriptionId, subscription.id));

    await db.update(subscriptions)
      .set({
        status: subscription.status.toUpperCase() as any,
        plan: plan || 'FREE',
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;

    await db.update(organizations)
      .set({
        plan: 'FREE',
        subscriptionStatus: 'CANCELED',
      })
      .where(eq(organizations.stripeSubscriptionId, subscription.id));

    await db.update(subscriptions)
      .set({
        status: 'CANCELED',
        plan: 'FREE',
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
  }

  return new Response(null, { status: 200 });
}
