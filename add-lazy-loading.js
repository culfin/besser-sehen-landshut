#!/usr/bin/env node

/**
 * Fügt loading="lazy" zu allen img-Tags hinzu (außer hero/above-fold)
 */

const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = './public';
const SKIP_LAZY = [
  'startseite-hero',
  'hero-',
  'logo-',
  'icon-',
  'favicon',
  'apple-touch-icon'
];

async function addLazyLoading(htmlPath) {
  let content = await fs.readFile(htmlPath, 'utf-8');
  let modified = false;

  // Finde alle img-Tags ohne loading-Attribut
  content = content.replace(/<img([^>]*?)src="bilder\/([^"]+)"([^>]*?)>/gi, (match, before, imgSrc, after) => {
    // Skip wenn bereits loading= vorhanden
    if (match.includes('loading=')) {
      return match;
    }

    // Skip Above-the-Fold Bilder
    const shouldSkipLazy = SKIP_LAZY.some(skip => imgSrc.includes(skip));

    if (shouldSkipLazy) {
      return match;
    }

    modified = true;
    return `<img${before}src="bilder/${imgSrc}"${after} loading="lazy">`;
  });

  if (modified) {
    await fs.writeFile(htmlPath, content, 'utf-8');
    return true;
  }

  return false;
}

async function main() {
  console.log('⚡ Füge Lazy Loading hinzu...\n');

  const files = await fs.readdir(PUBLIC_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  let count = 0;
  for (const file of htmlFiles) {
    const htmlPath = path.join(PUBLIC_DIR, file);
    const modified = await addLazyLoading(htmlPath);

    if (modified) {
      count++;
      console.log(`✓ ${file}`);
    }
  }

  console.log(`\n✅ ${count} Dateien aktualisiert`);
}

main().catch(console.error);
