require('dotenv/config');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in .env');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function clearUsers() {
  console.log('🧹 Clearing users table...');
  try {
    await sql`TRUNCATE TABLE users CASCADE`;
    console.log('✅ Users table cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing users:', error);
  } finally {
    process.exit(0);
  }
}

clearUsers();
