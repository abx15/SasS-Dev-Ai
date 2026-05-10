import 'dotenv/config'
import { neon } from '@neondatabase/serverless';

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
  const sql = neon(process.env.DATABASE_URL);
  
  console.log('🗑️ Dropping all tables and enums...');
  
  // Drop tables first due to foreign key constraints
  const tables = [
    'activity_logs', 'notifications', 'ai_reports', 
    'analytics', 'team_members', 'invoices', 
    'clients', 'subscriptions', 'users', 'organizations',
    '_prisma_migrations'
  ];

  for (const t of tables) {
    try {
      await sql(`DROP TABLE IF EXISTS "${t}" CASCADE`);
      console.log(`Dropped table ${t}`);
    } catch (err: any) {
      console.log(`Failed to drop table ${t}:`, err.message);
    }
  }

  // Drop enums
  const enums = [
    'user_role', 'subscription_plan', 'subscription_status', 
    'client_status', 'invoice_status', 'member_status', 
    'report_type', 'report_status', 'notification_type'
  ];
  
  for (const e of enums) {
    try {
      await sql(`DROP TYPE IF EXISTS "${e}" CASCADE`);
      console.log(`Dropped enum ${e}`);
    } catch (err: any) {
      console.log(`Failed to drop enum ${e}:`, err.message);
    }
  }

  console.log('✅ Database cleared!');
}

main().catch(console.error);
