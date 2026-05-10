import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");
  return userId;
}

export async function getOrCreateDbUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthenticated");

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

  // Find user
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id)
  });

  if (existingUser) {
    // Update user if needed
    const updatedUser = await db.update(users)
      .set({ 
        name, 
        avatarUrl: clerkUser.imageUrl,
        updatedAt: new Date()
      })
      .where(eq(users.clerkId, clerkUser.id))
      .returning();
    return updatedUser[0];
  }

  // Create user
  const newUser = await db.insert(users)
    .values({
      id: crypto.randomUUID(),
      clerkId: clerkUser.id,
      email,
      name,
      avatarUrl: clerkUser.imageUrl,
    })
    .returning();
  
  return newUser[0];
}
