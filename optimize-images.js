#!/usr/bin/env node

/**
 * Bilder-Optimierung für Besser Sehen Landshut
 *
 * Konvertiert alle JPG/PNG zu WebP mit 85% Qualität
 * Behält Originale als Fallback
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = './public/bilder';
const WEBP_QUALITY = 85;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return null;
  }

  const baseName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  const webpPath = path.join(dirName, `${baseName}.webp`);

  try {
    const input = await sharp(filePath);
    const metadata = await input.metadata();

    // WebP konvertieren
    await input
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    const originalSize = (await fs.stat(filePath)).size;
    const webpSize = (await fs.stat(webpPath)).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${baseName}${ext}`);
    console.log(`  ${(originalSize / 1024).toFixed(0)} KB → ${(webpSize / 1024).toFixed(0)} KB (${savings}% kleiner)`);

    return {
      original: filePath,
      webp: webpPath,
      originalSize,
      webpSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`✗ Fehler bei ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Starte Bilder-Optimierung...\n');

  const files = await fs.readdir(INPUT_DIR);
  const imagePaths = files
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .map(f => path.join(INPUT_DIR, f));

  console.log(`Gefunden: ${imagePaths.length} Bilder\n`);

  const results = [];
  for (const imagePath of imagePaths) {
    const result = await optimizeImage(imagePath);
    if (result) results.push(result);
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalSavings = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);

  console.log('\n📊 Zusammenfassung:');
  console.log(`   Bilder optimiert: ${results.length}`);
  console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   WebP: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   ✅ Gespart: ${totalSavings}%`);
}

main().catch(console.error);
