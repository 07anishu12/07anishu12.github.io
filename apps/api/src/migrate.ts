import { createPool } from "./leads.js";
import { applyMigrations } from "./migrations.js";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const pool = createPool(process.env.DATABASE_URL);
try {
  console.log(`Lead schema migrations applied: ${await applyMigrations(pool)}`);
} finally {
  await pool.end();
}
