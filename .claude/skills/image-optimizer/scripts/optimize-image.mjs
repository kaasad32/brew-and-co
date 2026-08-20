#!/usr/bin/env node
// Downloads an image from a URL, resizes it, converts it to WebP, and
// writes it into the project's public/ folder. See ../SKILL.md for usage.

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function printUsageAndExit() {
  console.error(
    "Usage: node optimize-image.mjs <url> <outputName> [--width=1600] [--quality=78] [--out-dir=public/images]"
  );
  process.exit(1);
}

function parseArgs(argv) {
  const [url, outputName, ...rest] = argv;
  if (!url || !outputName) printUsageAndExit();

  const options = { width: 1600, quality: 78, outDir: "public/images" };
  for (const arg of rest) {
    const match = /^--([a-z-]+)=(.+)$/.exec(arg);
    if (!match) {
      console.error(`Unrecognized option: ${arg}`);
      printUsageAndExit();
    }
    const [, key, value] = match;
    if (key === "width") options.width = Number(value);
    else if (key === "quality") options.quality = Number(value);
    else if (key === "out-dir") options.outDir = value;
    else {
      console.error(`Unknown option: --${key}`);
      printUsageAndExit();
    }
  }

  if (!Number.isFinite(options.width) || options.width <= 0) {
    console.error(`--width must be a positive number, got: ${options.width}`);
    process.exit(1);
  }
  if (!Number.isFinite(options.quality) || options.quality < 0 || options.quality > 100) {
    console.error(`--quality must be between 0 and 100, got: ${options.quality}`);
    process.exit(1);
  }

  return { url, outputName, ...options };
}

async function main() {
  const { url, outputName, width, quality, outDir } = parseArgs(process.argv.slice(2));

  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.error(`Could not reach ${url}: ${err.message}`);
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`Request failed: ${response.status} ${response.statusText} (${url})`);
    process.exit(1);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    console.error(
      `Expected an image response but got content-type "${contentType || "unknown"}" from ${url}`
    );
    process.exit(1);
  }

  const inputBuffer = Buffer.from(await response.arrayBuffer());

  const resolvedOutDir = path.resolve(process.cwd(), outDir);
  await mkdir(resolvedOutDir, { recursive: true });
  const outputPath = path.join(resolvedOutDir, `${outputName}.webp`);

  let outputBuffer;
  try {
    outputBuffer = await sharp(inputBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
  } catch (err) {
    console.error(`Could not process the downloaded file as an image: ${err.message}`);
    process.exit(1);
  }

  await writeFile(outputPath, outputBuffer);

  const { width: finalWidth, height: finalHeight } = await sharp(outputBuffer).metadata();
  const sizeKb = (outputBuffer.byteLength / 1024).toFixed(1);
  const relativePath = path.relative(process.cwd(), outputPath).replace(/\\/g, "/");
  console.log(`Wrote ${relativePath} (${finalWidth}x${finalHeight}, ${sizeKb} KB)`);
}

main();
