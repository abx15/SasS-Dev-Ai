require('dotenv/config');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function updateDb() {
  await sql`UPDATE users SET email = 'admin@bizflowai.com', clerk_id = 'user_3DX7DhUafjMuloPcJQObK2Cgowa' WHERE email = 'admin@bizflow.demo'`;
  await sql`UPDATE users SET email = 'manager@bizflowai.com', clerk_id = 'user_3DX7DfwGCKa5rvLqGSEpi94W4LO' WHERE email = 'manager@bizflow.demo'`;
  await sql`UPDATE users SET email = 'member@bizflowai.com', clerk_id = 'user_3DX7DqqhV6KIXV6C1l8SOJRQhm5' WHERE email = 'member@bizflow.demo'`;
  console.log('Database updated successfully!');
}

updateDb().catch(console.error);
