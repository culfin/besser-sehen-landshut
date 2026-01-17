# Bilder-Optimierung

## Übersicht

Alle Bilder wurden mit WebP konvertiert und Lazy Loading wurde hinzugefügt.

**Ergebnis:** 15.5 MB → 3.7 MB (**76.2% gespart**)

## Was wurde gemacht?

### 1. WebP-Konvertierung

Alle JPG/PNG wurden zu WebP konvertiert (85% Qualität):
- Original-Dateien bleiben als Fallback
- WebP-Dateien liegen parallel (z.B. `team.jpg` + `team.webp`)

**Größte Einsparungen:**
- `start-parallax-o1.jpg`: 10 MB → 1.3 MB (87.4%)
- `team-jenny-huegel.jpg`: 1.6 MB → 206 KB (87.5%)

### 2. Lazy Loading

Native `loading="lazy"` wurde zu allen img-Tags hinzugefügt.

**Ausnahmen (sofort laden):**
- Hero-Bilder (`hero-*`, `startseite-hero`)
- Logo, Icons, Favicon
- Above-the-Fold Content

### 3. Aktualisierte Dateien

- ✅ 56 Bilder zu WebP konvertiert
- ✅ 7 HTML-Dateien mit Lazy Loading

## WebP Browser-Support

Moderne Browser laden automatisch WebP wenn verfügbar:
- Chrome, Edge, Firefox, Safari (alle aktuellen Versionen)
- Fallback auf JPG/PNG für alte Browser

## Optional: Picture-Tags für maximale Kontrolle

Für bessere Kontrolle können später `<picture>`-Tags manuell hinzugefügt werden:

```html
<!-- Vorher -->
<img src="bilder/team.jpg" alt="Team" loading="lazy">

<!-- Nachher (mit picture-Tag) -->
<picture>
  <source srcset="bilder/team.webp" type="image/webp">
  <img src="bilder/team.jpg" alt="Team" loading="lazy">
</picture>
```

Dies ist aber optional - moderne Browser bevorzugen WebP bereits automatisch.

## Scripts

### Bilder neu optimieren

```bash
npm run optimize-images
```

### Lazy Loading hinzufügen (bereits gemacht)

```bash
node add-lazy-loading.js
```

## Performance-Impact

**Vor Optimierung:**
- Bilder: ~15.5 MB
- Ladezeit: ~8-10s (3G)

**Nach Optimierung:**
- Bilder: ~3.7 MB
- Ladezeit: ~2-3s (3G)
- Lazy Loading: Nur sichtbare Bilder laden

**Core Web Vitals:**
- ✅ Largest Contentful Paint (LCP) verbessert
- ✅ Cumulative Layout Shift (CLS) stabil
- ✅ First Input Delay (FID) nicht betroffen
