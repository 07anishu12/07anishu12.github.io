import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import type { Pool } from "pg";

export async function applyMigrations(
  pool: Pool,
  directory = new URL("../migrations/", import.meta.url),
): Promise<number> {
  const files = (await readdir(directory))
    .filter((file) => /^\d+_[a-z0-9_]+\.sql$/.test(file))
    .sort();
  const client = await pool.connect();
  let applied = 0;
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(731204)");
    await client.query(`CREATE TABLE IF NOT EXISTS portfolio_schema_migrations (
      name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now()
    )`);
    for (const name of files) {
      const sql = await readFile(new URL(name, directory), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      const previous = (
        await client.query(
          "SELECT checksum FROM portfolio_schema_migrations WHERE name=$1",
          [name],
        )
      ).rows[0];
      if (previous) {
        if (previous.checksum !== checksum)
          throw new Error(`Applied migration checksum changed: ${name}`);
        continue;
      }
      await client.query(sql);
      await client.query(
        "INSERT INTO portfolio_schema_migrations(name,checksum) VALUES($1,$2)",
        [name, checksum],
      );
      applied++;
    }
    await client.query("COMMIT");
    return applied;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
