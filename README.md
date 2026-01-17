# Besser Sehen Landshut - Website

Optimierte Website für Besser Sehen Landshut - Ihr Ansprechpartner für spezielle Kontaktlinsen und Sehbehinderungen in Niederbayern.

## 🚀 Features

- ✅ **Performance-optimiert:** 76% kleinere Bilder (WebP)
- ✅ **Lazy Loading:** Schnellere Ladezeiten
- ✅ **Clean Code:** 7 MB unnötige Dependencies entfernt
- ✅ **GitHub Pages:** Automatisches Deployment
- 🔜 **GA4 Analytics** (in Arbeit)
- 🔜 **SEO-Optimierung** (in Arbeit)

## 📊 Performance

**Vor Optimierung:**
- Bundle: ~57 MB
- Bilder: 15.5 MB
- Ladezeit: ~8-10s (3G)

**Nach Optimierung:**
- Bundle: ~50 MB
- Bilder: 3.7 MB
- Ladezeit: ~2-3s (3G)

## 🏗️ Projektstruktur

```
besser-sehen-landshut/
├── legacy/                 # Original-Website (Backup)
├── public/                 # Optimierte Website (deployed)
│   ├── bilder/            # Bilder (JPG + WebP)
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   ├── vendor/            # Dependencies (bereinigt)
│   └── *.html             # HTML-Seiten
├── docs/                  # Dokumentation
│   ├── plans/             # Design-Dokumente
│   └── image-optimization.md
├── .github/workflows/     # GitHub Actions
└── node_modules/          # Dev Dependencies
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Dependencies installieren
npm install

# Lokaler Dev-Server
npm run dev
# → http://localhost:3000
```

### Bilder neu optimieren

```bash
npm run optimize-images
```

## 🌐 Deployment

### GitHub Pages (Test-Domain)

Automatisches Deployment bei Push auf `main`:

1. Code ändern
2. `git push`
3. GitHub Actions deployed automatisch
4. Live auf: `https://culfin.github.io/besser-sehen-landshut`

### Eigener Server (später)

Details folgen nach Test-Phase.

## 📝 Changelog

### Phase 2 (2026-01-17) - Bilder-Optimierung
- ✅ WebP-Konvertierung: 76% gespart
- ✅ Lazy Loading hinzugefügt
- ✅ Performance massiv verbessert

### Phase 1 (2026-01-17) - Dependencies Cleanup
- ✅ 7 MB unnötige Vendor-Files entfernt
- ✅ CSS/JS Demos entfernt
- ✅ Clean public/ Struktur

## 📄 Lizenz

© 2026 Besser Sehen Landshut. Alle Rechte vorbehalten.

## 📞 Kontakt

- **Web:** https://bessersehen.la
- **Tel:** 0871 - 142 280 20
- **Email:** hallo@bessersehen.la
- **WhatsApp:** +49 176 325 141 05
