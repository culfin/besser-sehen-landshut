#!/usr/bin/env node

/**
 * Quick Wins - SEO & Performance Optimierungen
 * 1. Open Graph URLs korrigieren
 * 2. Strukturierte Daten (Schema.org) hinzufügen
 * 3. Font Preload hinzufügen
 */

const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = './public';
const GITHUB_URL = 'https://culfin.github.io/besser-sehen-landshut';

// Schema.org Strukturierte Daten
const SCHEMA_ORG = `
\t\t<!-- Strukturierte Daten für Google -->
\t\t<script type="application/ld+json">
\t\t{
\t\t  "@context": "https://schema.org",
\t\t  "@type": "LocalBusiness",
\t\t  "name": "Besser Sehen Landshut",
\t\t  "image": "${GITHUB_URL}/bilder/startseite-hero.jpg",
\t\t  "@id": "https://bessersehen.la",
\t\t  "url": "https://bessersehen.la",
\t\t  "telephone": "+4987114228020",
\t\t  "priceRange": "€€",
\t\t  "address": {
\t\t    "@type": "PostalAddress",
\t\t    "streetAddress": "Veldener Str. 16",
\t\t    "addressLocality": "Landshut",
\t\t    "postalCode": "84036",
\t\t    "addressCountry": "DE"
\t\t  },
\t\t  "geo": {
\t\t    "@type": "GeoCoordinates",
\t\t    "latitude": 48.5239261,
\t\t    "longitude": 12.1449762
\t\t  },
\t\t  "openingHoursSpecification": {
\t\t    "@type": "OpeningHoursSpecification",
\t\t    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
\t\t    "opens": "09:00",
\t\t    "closes": "18:00"
\t\t  },
\t\t  "sameAs": [
\t\t    "https://www.facebook.com/bessersehenlandshut/"
\t\t  ]
\t\t}
\t\t</script>`;

async function processFile(htmlPath) {
  let content = await fs.readFile(htmlPath, 'utf-8');
  const filename = path.basename(htmlPath);
  let modified = false;

  // 1. Open Graph URLs korrigieren
  if (content.includes('https://bessersehen.la/bilder/')) {
    content = content.replace(
      /https:\/\/bessersehen\.la\/bilder\//g,
      `${GITHUB_URL}/bilder/`
    );
    modified = true;
  }

  if (content.includes('https://bessersehen.la/')) {
    content = content.replace(
      /<meta property="og:url" content="https:\/\/bessersehen\.la\/">/,
      `<meta property="og:url" content="${GITHUB_URL}/">`
    );
    modified = true;
  }

  // 2. Strukturierte Daten hinzufügen (nur auf Startseite)
  if (filename === 'index.html' && !content.includes('@type": "LocalBusiness')) {
    content = content.replace(
      '<!-- Head Libs -->',
      `${SCHEMA_ORG}\n\n\t\t<!-- Head Libs -->`
    );
    modified = true;
  }

  // 3. Font Preload hinzufügen
  if (!content.includes('rel="preconnect"')) {
    const preloadFonts = `
\t\t<!-- Font Optimization -->
\t\t<link rel="preconnect" href="https://fonts.googleapis.com">
\t\t<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
`;
    content = content.replace(
      '<!-- Web Fonts  -->',
      `${preloadFonts}\t\t<!-- Web Fonts  -->`
    );
    modified = true;
  }

  if (modified) {
    await fs.writeFile(htmlPath, content, 'utf-8');
    return true;
  }

  return false;
}

async function main() {
  console.log('🚀 Quick Wins werden umgesetzt...\n');

  const files = await fs.readdir(PUBLIC_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  let count = 0;
  for (const file of htmlFiles) {
    const htmlPath = path.join(PUBLIC_DIR, file);
    const modified = await processFile(htmlPath);

    if (modified) {
      count++;
      console.log(`✓ ${file}`);
    }
  }

  console.log(`\n✅ ${count} Dateien optimiert\n`);

  console.log('Änderungen:');
  console.log('  ✅ Open Graph URLs → GitHub Pages URL');
  console.log('  ✅ Schema.org Daten auf Startseite');
  console.log('  ✅ Font Preload hinzugefügt');
}

main().catch(console.error);
