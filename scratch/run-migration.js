require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  await client.connect();
  console.log('🚀 Running migration...');
  
  const sqlPath = path.join(__dirname, '..', 'drizzle', '0000_unknown_ser_duncan.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  // Split by statement-breakpoint
  const statements = sql.split('--> statement-breakpoint');
  
  for (let statement of statements) {
    statement = statement.trim();
    if (!statement) continue;
    
    try {
      await client.query(statement);
      console.log('✅ Executed statement');
    } catch (err) {
      console.error('❌ Error executing statement:', err.message);
      console.error('Statement:', statement);
      // Don't stop on errors, some might be "already exists" if push partially worked
    }
  }

  await client.end();
  console.log('🏁 Migration complete!');
}

main().catch(console.error);
