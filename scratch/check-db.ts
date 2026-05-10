import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local manually
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

import { prisma } from "../lib/prisma";

async function main() {
  const orgs = await prisma.organization.findMany();
  console.log("Existing organizations:", orgs);
}

main().catch(console.error);
