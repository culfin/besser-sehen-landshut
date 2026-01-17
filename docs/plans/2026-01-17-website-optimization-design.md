# Website-Optimierung & GitHub Deployment - Design

**Datum:** 2026-01-17
**Projekt:** Besser Sehen Landshut Website
**Ziel:** Legacy-Website optimieren und über GitHub Pages deployen

## Kontext

Aktuelle Website im `legacy/` Ordner:
- Statische HTML-Website mit Porto Template
- Bootstrap, jQuery, Owl Carousel, etc.
- ~10 HTML-Seiten (index, team, leistungen, kontakt, etc.)
- ~50+ Bilder (JPG/PNG, nicht optimiert)
- Viele ungenutzte vendor-Dateien

## Anforderungen

**Must-Have:**
- Website auf GitHub Pages Test-Domain deployen
- Performance optimieren (Bilder, CSS/JS)
- Keine Breaking Changes (URLs, Funktionalität)

**Nice-to-Have:**
- GA4 statt veraltetes Universal Analytics
- Accessibility-Verbesserungen
- SEO-Optimierung

**Später:**
- Migration auf eigenen Server
- Termin-Buchung Plugin (externes Tool wie Calendly)

## Entscheidungen

**Tech-Stack:** Legacy behalten (kein Rewrite)
- ✅ Schnellster Weg zum Ziel
- ✅ Kein Risiko durch komplette Neu-Entwicklung
- ✅ Bestehendes Design bleibt erhalten

**Deployment:** GitHub Pages
- ✅ Kostenlos
- ✅ HTTPS automatisch
- ✅ Einfache CI/CD mit GitHub Actions
- ✅ Test-Domain für Review vor eigenem Server

**Termin-Buchung:** Externes Plugin später
- ✅ Kein Backend nötig
- ✅ Statisch bleibt statisch
- ✅ Flexibel (Calendly, Doctolib, etc.)

## Design

### Phase 1: Analyse & Cleanup

**Ziel:** Ungenutzte Dependencies entfernen

**Aufgaben:**
1. Analysiere genutzte CSS-Dateien pro HTML-Seite
2. Identifiziere ungenutzte vendor-Dateien
3. Erstelle Abhängigkeits-Liste (behalten vs. entfernen)
4. Entferne tote Dateien
5. Dokumentiere kritische Dependencies

**Kritische Dependencies (geschätzt):**
- Bootstrap CSS/JS (Grid, Components)
- Porto Theme (theme.css, theme-elements.css)
- Owl Carousel (Slider)
- Magnific Popup (Lightbox)
- Font Awesome (Icons)
- Revolution Slider (rs-plugin)

**Zu entfernen (geschätzt):**
- Demo-CSS (~30 Dateien in css/demos/)
- Ungenutzte Vendor-Plugins
- Alte/duplizierte Versionen

**Erwartetes Ergebnis:**
- Bundle-Size: ~500 KB → ~150 KB
- Weniger HTTP-Requests
- Schnellere Ladezeiten

### Phase 2: Bilder-Optimierung

**Ziel:** Moderne Bildformate und Lazy Loading

**Aufgaben:**
1. Inventar aller Bilder erstellen
2. Batch-Konvertierung JPG/PNG → WebP
3. Fallback für alte Browser (picture-Tag)
4. Responsive Images (srcset)
5. Lazy Loading implementieren
6. Hero-Images preloaden

**Technische Umsetzung:**
```html
<!-- Vorher -->
<img src="bilder/team-andreas-polzer.jpg" alt="Andreas Polzer">

<!-- Nachher -->
<picture>
  <source srcset="bilder/team-andreas-polzer.webp" type="image/webp">
  <img src="bilder/team-andreas-polzer.jpg"
       alt="Andreas Polzer"
       loading="lazy">
</picture>
```

**Tools:**
- sharp (Node.js) für Batch-Konvertierung
- Oder: Squoosh/ImageOptim manuell

**Erwartetes Ergebnis:**
- Bildgröße: ~10-20 MB → ~2-4 MB
- 70-80% weniger Traffic
- Bessere Core Web Vitals (LCP)

### Phase 3: GitHub Deployment Setup

**Ziel:** Automatisches Deployment auf Test-Domain

**Repository-Struktur:**
```
besser-sehen-landshut/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy
├── legacy/                     # Original (später archivieren)
├── public/                     # Optimierte Version
│   ├── index.html
│   ├── bilder/
│   ├── css/
│   ├── js/
│   └── vendor/
├── docs/
│   └── plans/
└── README.md
```

**GitHub Actions Workflow:**
1. Trigger: Push auf main branch
2. Build: Bilder optimieren, CSS/JS minifyen
3. Deploy: Zu GitHub Pages
4. Live in ~2 Minuten

**Domain:**
- Test: `culfin.github.io/besser-sehen-landshut`
- Später: Eigener Server (bessersehen.la?)

**Aufgaben:**
1. .gitignore erstellen
2. GitHub Actions Workflow schreiben
3. GitHub Pages aktivieren
4. Test-Deployment durchführen

### Phase 4: Code-Updates & Maintenance

**Ziel:** Legacy-Code zukunftssicher machen

**Updates:**
1. **Google Analytics:** UA → GA4
   - UA ist seit Juli 2023 tot
   - GA4 Tag einbauen

2. **Meta-Tags optimieren:**
   - Open Graph (Facebook/WhatsApp Preview)
   - Twitter Cards
   - SEO-Meta-Description verbessern

3. **Accessibility:**
   - Alt-Texte prüfen
   - ARIA-Labels wo nötig
   - Kontrast-Ratio prüfen
   - Keyboard-Navigation testen

4. **Code-Cleanup:**
   - HTML validieren (W3C)
   - Konsistente Einrückung
   - Kommentare auf Deutsch
   - Tote Code-Snippets entfernen

**Nicht brechen:**
- ✅ Bestehende URLs (SEO!)
- ✅ Kontaktformular (falls vorhanden)
- ✅ WhatsApp/Facebook-Links
- ✅ Telefon/E-Mail Links

## Timeline

**Geschätzte Dauer:** 1-2 Tage

1. Phase 1 (Cleanup): 2-3 Stunden
2. Phase 2 (Bilder): 2-3 Stunden
3. Phase 3 (Deployment): 1-2 Stunden
4. Phase 4 (Updates): 2-3 Stunden

## Erfolgskriterien

**Performance:**
- ✅ Lighthouse Score > 90 (Desktop)
- ✅ Lighthouse Score > 80 (Mobile)
- ✅ First Contentful Paint < 2s
- ✅ Largest Contentful Paint < 2.5s

**Funktionalität:**
- ✅ Alle Seiten funktionieren
- ✅ Keine 404-Errors
- ✅ Formulare funktionieren
- ✅ Responsive auf allen Geräten

**Deployment:**
- ✅ GitHub Pages läuft
- ✅ HTTPS aktiv
- ✅ Auto-Deploy bei Änderungen

## Spätere Erweiterungen

**Phase 5 (Optional):**
- Migration auf eigenen Server
- Termin-Buchung Plugin einbauen (Calendly/Doctolib)
- Content-Updates (Text, Bilder)
- Performance-Monitoring (Plausible Analytics?)

## Risiken & Mitigation

**Risiko:** Funktionalität geht verloren
- **Mitigation:** Schrittweise testen, Git für Rollback

**Risiko:** Bilder-Qualität leidet
- **Mitigation:** Manuelle Prüfung, WebP mit hoher Qualität

**Risiko:** Deployment schlägt fehl
- **Mitigation:** Lokal testen vor GitHub Push

## Offene Fragen

- [ ] Aktuelle Domain: bessersehen.la oder andere?
- [ ] Gibt es ein Kontaktformular-Backend?
- [ ] Tracking außer GA (Facebook Pixel, etc.)?
