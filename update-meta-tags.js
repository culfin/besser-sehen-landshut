#!/usr/bin/env node

/**
 * Update Meta-Tags für SEO und Social Media
 * - GA4 statt Universal Analytics
 * - Open Graph Tags
 * - Twitter Cards
 * - Verbesserte Descriptions
 */

const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = './public';

// GA4 Tracking Code (bitte mit echter GA4 Measurement ID ersetzen)
const GA4_CODE = `<!-- Google tag (gtag.js) - Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`;

const PAGES = {
  'index.html': {
    title: 'Besser Sehen Landshut - Kontaktlinsen-Spezialist in Niederbayern',
    description: 'Ihr Experte für spezielle Kontaktlinsen, Myopie-Management, Nachtlinsen und visuelle Rehabilitation in Landshut. Teil des augenmedizinischen Versorgungszentrums.',
    keywords: 'Kontaktlinsen Landshut, Nachtlinsen, Myopie Management, Orthokeratologie, Spezialkontaktlinsen Niederbayern'
  },
  'team.html': {
    title: 'Unser Team - Besser Sehen Landshut',
    description: 'Lernen Sie unser erfahrenes Team kennen. Wir sind Ihre Ansprechpartner für individuelle Kontaktlinsen-Lösungen in Landshut.',
    keywords: 'Kontaktlinsen Team Landshut, Augenoptik Team, Optometrie Experten'
  },
  'kontakt.html': {
    title: 'Kontakt & Terminvereinbarung - Besser Sehen Landshut',
    description: 'Kontaktieren Sie uns für einen Termin. Tel: 0871-14228020, WhatsApp, E-Mail. Wir nehmen uns Zeit für Ihre Sehbedürfnisse.',
    keywords: 'Kontaktlinsen Termin Landshut, Augenoptiker Kontakt, Terminvereinbarung'
  },
  'leistungen.html': {
    title: 'Unsere Leistungen - Besser Sehen Landshut',
    description: 'Kontaktlinsen-Anpassung, Nachtlinsen, Myopie-Management, Visuelle Rehabilitation. Modernste Untersuchungsgeräte und individuelle Lösungen.',
    keywords: 'Kontaktlinsen Anpassung, Nachtlinsen Landshut, Myopie Management, Visuelle Rehabilitation'
  },
  'leistungen-kontaktlinsen.html': {
    title: 'Kontaktlinsen-Anpassung - Besser Sehen Landshut',
    description: 'Individuelle Kontaktlinsen-Anpassung mit modernster Technik. Tages-, Monats-, Gleitsichtlinsen, weiche und harte Linsen.',
    keywords: 'Kontaktlinsen Anpassung Landshut, 3D Vermessung, individuelle Kontaktlinsen'
  },
  'leistungen-nachtlinsen.html': {
    title: 'Nachtlinsen / Orthokeratologie - Besser Sehen Landshut',
    description: 'Tagsüber scharf sehen ohne Sehhilfe. Nachtlinsen (Orthokeratologie) für Myopie-Korrektur während des Schlafs.',
    keywords: 'Nachtlinsen Landshut, Orthokeratologie, Myopie Korrektur'
  },
  'leistungen-beratung-kurzsichtigkeit.html': {
    title: 'Myopie-Management / Kurzsichtigkeit - Besser Sehen Landshut',
    description: 'Myopie-Management für Kinder und Jugendliche. Verlangsamung der Kurzsichtigkeit mit speziellen Kontaktlinsen.',
    keywords: 'Myopie Management Landshut, Kurzsichtigkeit Kinder, Myopie Kontrolle'
  },
  'leistungen-visuelle-reha.html': {
    title: 'Visuelle Rehabilitation - Besser Sehen Landshut',
    description: 'Individuelle Lösungen bei Sehbehinderungen. Spezialbrillen, Lupen, elektronische Lesegeräte. Beratung vor Ort.',
    keywords: 'Visuelle Rehabilitation Landshut, Sehbehinderung Hilfsmittel, Low Vision'
  }
};

async function updateMetaTags(htmlPath, pageConfig) {
  let content = await fs.readFile(htmlPath, 'utf-8');
  const filename = path.basename(htmlPath);

  const config = pageConfig || PAGES[filename] || PAGES['index.html'];

  // 1. Entferne veraltetes Universal Analytics
  content = content.replace(/<!-- Global site tag[\s\S]*?UA-\d+-\d+[\s\S]*?<\/script>/gi, '');

  // 2. Füge GA4 hinzu (falls noch nicht vorhanden)
  if (!content.includes('G-XXXXXXXXXX') && !content.includes('<!-- Google tag')) {
    content = content.replace('<!-- Head Libs -->', `${GA4_CODE}\n\n\t\t<!-- Head Libs -->`);
  }

  // 3. Update Title
  content = content.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);

  // 4. Update Description
  content = content.replace(
    /<meta name="description" content=".*?">/i,
    `<meta name="description" content="${config.description}">`
  );

  // 5. Update Keywords
  content = content.replace(
    /<meta name="keywords" content=".*?">/i,
    `<meta name="keywords" content="${config.keywords}">`
  );

  // 6. Entferne oder update Author
  content = content.replace(
    /<meta name="author" content="rocktician.com">/i,
    '<meta name="author" content="Besser Sehen Landshut">'
  );

  // 7. Füge Open Graph Tags hinzu (falls noch nicht vorhanden)
  if (!content.includes('og:title')) {
    const ogTags = `
\t\t<!-- Open Graph / Facebook -->
\t\t<meta property="og:type" content="website">
\t\t<meta property="og:url" content="https://bessersehen.la/">
\t\t<meta property="og:title" content="${config.title}">
\t\t<meta property="og:description" content="${config.description}">
\t\t<meta property="og:image" content="https://bessersehen.la/bilder/startseite-hero.jpg">
\t\t<meta property="og:locale" content="de_DE">

\t\t<!-- Twitter Card -->
\t\t<meta name="twitter:card" content="summary_large_image">
\t\t<meta name="twitter:title" content="${config.title}">
\t\t<meta name="twitter:description" content="${config.description}">
\t\t<meta name="twitter:image" content="https://bessersehen.la/bilder/startseite-hero.jpg">
`;
    content = content.replace('<!-- Mobile Metas -->', `${ogTags}\n\t\t<!-- Mobile Metas -->`);
  }

  await fs.writeFile(htmlPath, content, 'utf-8');
  return true;
}

async function main() {
  console.log('📝 Aktualisiere Meta-Tags...\n');

  const files = await fs.readdir(PUBLIC_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  let count = 0;
  for (const file of htmlFiles) {
    const htmlPath = path.join(PUBLIC_DIR, file);
    await updateMetaTags(htmlPath, PAGES[file]);
    count++;
    console.log(`✓ ${file}`);
  }

  console.log(`\n✅ ${count} Dateien aktualisiert`);
  console.log('\n⚠️  WICHTIG: Ersetze G-XXXXXXXXXX mit deiner echten GA4 Measurement ID!');
}

main().catch(console.error);
