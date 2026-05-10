require('dotenv').config();
const { createClerkClient } = require('@clerk/backend');

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const users = [
  {
    emailAddress: ['admin@bizflowai.com'],
    password: 'B!zFlow#Demo2026',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    emailAddress: ['manager@bizflowai.com'],
    password: 'B!zFlow#Demo2026',
    firstName: 'Sarah',
    lastName: 'Manager',
  },
  {
    emailAddress: ['member@bizflowai.com'],
    password: 'B!zFlow#Demo2026',
    firstName: 'Alex',
    lastName: 'Member',
  }
];

async function createUsers() {
  for (const u of users) {
    try {
      console.log(`Creating user ${u.emailAddress[0]}...`);
      const user = await clerkClient.users.createUser(u);
      console.log(`Created! Clerk ID: ${user.id}`);
    } catch (e) {
      console.log(`Failed for ${u.emailAddress[0]}:`);
      console.error(e.errors || e);
    }
  }
}

createUsers();
