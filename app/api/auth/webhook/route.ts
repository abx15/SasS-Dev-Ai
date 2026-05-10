import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users, organizations, teamMembers } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id: clerkId, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ''} ${last_name || ''}`.trim();

    try {
      await db.transaction(async (tx) => {
        const orgId = crypto.randomUUID();
        const userId = crypto.randomUUID();

        await tx.insert(organizations).values({
          id: orgId,
          name: `${name}'s Workspace`,
          slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${clerkId.slice(-4)}`,
          logoUrl: image_url,
        });

        await tx.insert(users).values({
          id: userId,
          clerkId,
          email,
          name,
          avatarUrl: image_url,
          organizationId: orgId,
          role: 'OWNER',
        });

        await tx.insert(teamMembers).values({
          id: crypto.randomUUID(),
          userId: userId,
          organizationId: orgId,
          role: 'OWNER',
          status: 'ACTIVE',
          joinedAt: new Date(),
        });
      });
    } catch (error) {
      console.error('Error creating user/org in DB:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id: clerkId, email_addresses, first_name, last_name, image_url } = evt.data;
    await db.update(users)
      .set({
        email: email_addresses[0]?.email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        avatarUrl: image_url,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkId, clerkId));
  }

  if (eventType === 'user.deleted') {
    const { id: clerkId } = evt.data;
    await db.delete(users).where(eq(users.clerkId, clerkId as string));
  }

  return new Response('', { status: 200 });
}
