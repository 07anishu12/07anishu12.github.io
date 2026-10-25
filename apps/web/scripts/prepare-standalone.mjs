import fs from "node:fs";
import path from "node:path";
const destination = ".next/standalone/apps/web";
if (fs.existsSync(destination)) {
  fs.cpSync("public", path.join(destination, "public"), { recursive: true });
  fs.cpSync(".next/static", path.join(destination, ".next/static"), {
    recursive: true,
  });
}
