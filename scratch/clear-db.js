require('dotenv').config();
const { Client } = require('pg');

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  await client.connect();
  console.log('🗑️ Dropping all tables and enums...');
  
  const tables = [
    'activity_logs', 'notifications', 'ai_reports', 
    'analytics', 'team_members', 'invoices', 
    'clients', 'subscriptions', 'users', 'organizations',
    '_prisma_migrations'
  ];

  for (const t of tables) {
    try {
      await client.query(`DROP TABLE IF EXISTS "${t}" CASCADE`);
      console.log(`Dropped table ${t}`);
    } catch (err) {
      console.log(`Failed to drop table ${t}:`, err.message);
    }
  }

  const enums = [
    'user_role', 'subscription_plan', 'subscription_status', 
    'client_status', 'invoice_status', 'member_status', 
    'report_type', 'report_status', 'notification_type'
  ];
  
  for (const e of enums) {
    try {
      await client.query(`DROP TYPE IF EXISTS "${e}" CASCADE`);
      console.log(`Dropped enum ${e}`);
    } catch (err) {
      console.log(`Failed to drop enum ${e}:`, err.message);
    }
  }

  await client.end();
  console.log('✅ Database cleared!');
}

main().catch(console.error);
