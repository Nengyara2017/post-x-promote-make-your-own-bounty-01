// main.ts — the entrypoint for this repository.
//
// This entry is a single post on X that quotes make.fun's
// make-your-own-bounty announcement. The post itself is the entry;
// this program does nothing but hand its address to the harness,
// by copying POST.json from the repository into the output directory.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const target = join(outDir, "POST.json");

try {
  if (!existsSync(source)) {
    throw new Error(`POST.json not found in bot directory: ${source}`);
  }
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
  console.log(`POST.json copied to ${target}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`main.ts failed: ${message}`);
  process.exit(1);
}
