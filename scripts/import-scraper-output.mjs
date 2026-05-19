#!/usr/bin/env node
/**
 * Replace data/incidents.json with the latest scraper output.
 *
 * Usage:
 *   node scripts/import-scraper-output.mjs path/to/scraper-output.json
 */
import { copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/import-scraper-output.mjs <scraper-output.json>');
  process.exit(1);
}

const target = resolve(__dirname, '..', 'data', 'incidents.json');
await copyFile(resolve(src), target);
console.log(`Copied ${src} -> ${target}`);
