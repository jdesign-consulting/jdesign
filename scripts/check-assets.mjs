// Fails if any local file referenced from the site's HTML or CSS is missing.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, extname } from "node:path";

const root = resolve(process.argv[2] ?? "site");
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if ([".html", ".css"].includes(extname(p))) files.push(p);
  }
};
walk(root);

const patterns = [/\b(?:href|src)="([^"]+)"/g, /url\(["']?([^"')]+)["']?\)/g];
let missing = 0;
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const re of patterns) {
    for (const [, ref] of text.matchAll(re)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(ref)) continue; // external, data:, mailto:, anchors
      const target = resolve(dirname(file), ref.split(/[?#]/)[0]);
      if (!existsSync(target)) {
        console.error(`Missing: ${ref} (referenced in ${file.slice(root.length + 1)})`);
        missing++;
      }
    }
  }
}
console.log(`Checked ${files.length} files: ${missing ? missing + " missing reference(s)" : "all local references resolve"}`);
process.exit(missing ? 1 : 0);
