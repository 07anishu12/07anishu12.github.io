import { setTimeout } from "node:timers/promises";
import { createPool } from "./leads.js";
import { processOutbox } from "./outbox.js";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const pool = createPool(process.env.DATABASE_URL);
let running = true;
process.once("SIGTERM", () => {
  running = false;
});
process.once("SIGINT", () => {
  running = false;
});
try {
  do {
    try {
      const processed = await processOutbox(pool);
      console.log(JSON.stringify({ event: "outbox.tick", processed }));
    } catch {
      console.error(JSON.stringify({ event: "outbox.failure" }));
      if (process.argv.includes("--once")) process.exitCode = 1;
    }
    if (process.argv.includes("--once")) break;
    if (running) await setTimeout(5000);
  } while (running);
} finally {
  await pool.end();
}
