#!/usr/bin/env node
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile() && /\.png$/i.test(entry.name)) {
      yield fullPath;
    }
  }
}

async function convert() {
  const pngFiles = [];
  for await (const file of walk(PUBLIC_DIR)) {
    pngFiles.push(file);
  }

  for (const pngPath of pngFiles) {
    const webpPath = pngPath.replace(/\.png$/i, ".webp");
    try {
      await sharp(pngPath).webp({ quality: 85 }).toFile(webpPath);
      console.log(`✓ ${pngPath.replace(PUBLIC_DIR, "")} → .webp`);
    } catch (err) {
      console.error(`✗ ${pngPath}:`, err.message);
    }
  }
}

convert();
