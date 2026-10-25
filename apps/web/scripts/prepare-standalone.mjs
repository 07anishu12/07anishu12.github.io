import fs from "node:fs";
import path from "node:path";
const destination = ".next/standalone/apps/web";
if (fs.existsSync(destination)) {
  fs.cpSync("public", path.join(destination, "public"), { recursive: true });
  fs.cpSync(".next/static", path.join(destination, ".next/static"), {
    recursive: true,
  });
}

const rootNext = path.resolve("../..", ".next");
try {
  if (!fs.existsSync(rootNext)) {
    fs.symlinkSync(path.resolve(".next"), rootNext, "junction");
  }
} catch {
  // Ignore fallback if linking fails
}
