// Describe Your Ex in One Word — make.fun entry.
// The entry is exactly one word: "Placeholder".
// It writes that word, and nothing else, to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Placeholder";

// The brief's gate: exactly one word, 1 to 111 characters, not only
// whitespace, no punctuation tricks. Fail loudly instead of shipping a
// file the gate would refuse.
if (!/^[A-Za-z]+$/.test(ENTRY)) {
  throw new Error("entry must be exactly one alphabetic word");
}
if (ENTRY.split(/\s+/).filter(Boolean).length !== 1) {
  throw new Error("entry must be exactly one word");
}
if (ENTRY.length < 1 || ENTRY.length > 111) {
  throw new Error(`entry must be 1-111 characters, got ${ENTRY.length}`);
}

// Honour MAKEFUN_OUTPUT_DIR, then OUTPUT_DIR, then /output.
// Never delete the output directory; only create it and write the file.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");

// Read the file back and prove it holds exactly the entry, byte for byte,
// so a silent write failure can never ship a wrong or empty file.
const written = readFileSync(entryPath, "utf8");
if (written !== ENTRY) {
  throw new Error(
    `entry.txt mismatch: wrote ${ENTRY.length} chars, read back ${written.length}`,
  );
}
