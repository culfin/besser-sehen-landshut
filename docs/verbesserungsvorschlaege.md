# Verbesserungsvorschläge - Besser Sehen Landshut

**Stand:** 2026-01-17 (nach Launch)

---

## 🔴 Kritisch (sofort beheben)

### 1. ✅ Analytics-Code entfernt
**Problem:** Alter UA-Analytics Code war noch vorhanden (funktioniert nicht mehr seit Juli 2023)
**Lösung:** ✅ Gerade behoben
**Impact:** Datenschutz, keine unnötigen Requests

---

## 🟡 Hoch (Quick Wins - heute/morgen)

### 2. Revolution Slider optimieren/ersetzen

**Problem:**
- Revolution Slider = 22 MB (!!!)
- Größter Performance-Killer
- Laden dauert auf 3G ~15 Sekunden

**Lösungen:**
**A) Einfach:** Slider durch statisches Hero-Bild ersetzen
- Aufwand: 30 Minuten
- Performance-Gewinn: ~15 MB gespart
- Nachteil: Kein Slider mehr

**B) Modern:** Zu modernem Slider wechseln (Swiper.js)
- Aufwand: 2-3 Stunden
- Bundle: ~50 KB statt 22 MB
- Smoothe Animationen
- Touch-Support

**Empfehlung:** B - Lohnt sich massiv!

---

### 3. Open Graph URLs korrigieren

**Problem:**
- URLs zeigen auf `https://bessersehen.la/` (noch nicht aktiv)
- WhatsApp/Facebook Preview funktioniert nicht

**Fix:**
```html
<!-- Aktuell: -->
<meta property="og:url" content="https://bessersehen.la/">
<meta property="og:image" content="https://bessersehen.la/bilder/startseite-hero.jpg">

<!-- Sollte sein: -->
<meta property="og:url" content="https://culfin.github.io/besser-sehen-landshut/">
<meta property="og:image" content="https://culfin.github.io/besser-sehen-landshut/bilder/startseite-hero.jpg">
```

**Aufwand:** 5 Minuten
**Impact:** Social Media Sharing funktioniert

---

### 4. Email-Obfuscation vereinfachen

**Problem:**
- 20 Zeilen JavaScript nur um E-Mail zu verschleiern
- 2026 nicht mehr nötig (Spam-Filter sind besser)
- Kompliziert zu warten

**Fix:**
```html
<!-- Aktuell: 20 Zeilen obfuscated JS -->

<!-- Besser: -->
<a href="mailto:hallo@bessersehen.la">hallo@bessersehen.la</a>

<!-- Oder mit leichter Obfuscation: -->
<a href="mailto:hallo&#64;bessersehen.la">hallo&#64;bessersehen.la</a>
```

**Aufwand:** 10 Minuten
**Impact:** Einfacher Code, gleiche Funktion

---

### 5. Strukturierte Daten (Schema.org)

**Problem:**
- Google versteht nicht, dass ihr ein lokales Geschäft seid
- Keine Rich Snippets in Suchergebnissen

**Fix:** JSON-LD hinzufügen
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Besser Sehen Landshut",
  "image": "https://culfin.github.io/besser-sehen-landshut/bilder/startseite-hero.jpg",
  "@id": "https://bessersehen.la",
  "url": "https://bessersehen.la",
  "telephone": "+4987114228020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Veldener Str. 16",
    "addressLocality": "Landshut",
    "postalCode": "84036",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.5239261,
    "longitude": 12.1449762
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/bessersehenlandshut/"
  ]
}
</script>
```

**Aufwand:** 15 Minuten
**Impact:**
- Google Maps Integration
- Rich Snippets (Sterne-Bewertungen, Öffnungszeiten)
- Bessere lokale SEO

---

## 🟢 Mittel (nächste Woche)

### 6. Testimonials / Kundenbewertungen

**Problem:**
- Keine Social Proof auf der Website
- Neue Kunden brauchen Vertrauen

**Lösung:**
- Google Bewertungen einbinden
- Oder: 3-5 Kunden-Zitate mit Foto
- Placement: Startseite nach "Leistungen"

**Aufwand:** 2-3 Stunden (Content sammeln + Design)
**Impact:** Conversion-Rate +15-30%

---

### 7. FAQ-Sektion

**Häufige Fragen:**
- "Wie viel kostet eine Kontaktlinsen-Anpassung?"
- "Wie lange dauert ein Termin?"
- "Übernimmt die Krankenkasse die Kosten?"
- "Wie funktionieren Nachtlinsen?"

**Aufwand:** 3-4 Stunden (Content schreiben)
**Impact:**
- SEO (Long-tail Keywords)
- Weniger Telefonanrufe mit Standard-Fragen
- Bessere User-Experience

---

### 8. Call-to-Action optimieren

**Problem:**
- Kein klarer CTA auf Startseite
- User wissen nicht, was der nächste Schritt ist

**Fix:**
- Prominent: "Jetzt Termin vereinbaren" Button
- WhatsApp-Link prominent (grüner Button)
- Above-the-fold Placement

**Aufwand:** 1 Stunde
**Impact:** Mehr Terminanfragen

---

### 9. Leistungen mit Preisen

**Problem:**
- Keine Preis-Transparenz
- Kunden müssen anrufen für Info

**Lösung:**
- Preisspannen angeben (z.B. "Ab €X")
- Oder: "Kostenlose Erstberatung"
- Baut Vertrauen auf

**Aufwand:** 1 Stunde (Preise recherchieren + einpflegen)
**Impact:** Qualifizierte Anfragen steigen

---

### 10. Blog / News-Sektion

**Themen:**
- "5 Mythen über Kontaktlinsen"
- "Nachtlinsen: Erfahrungsbericht"
- "Myopie bei Kindern: Was Eltern wissen sollten"

**Aufwand:** 4-6 Stunden pro Artikel
**Impact:**
- SEO (mehr organischer Traffic)
- Positionierung als Experten
- Content für Social Media

---

## 🔵 Niedrig (später, nice-to-have)

### 11. Online-Terminbuchung

**Aktuell:** Nur Telefon/WhatsApp
**Später:** Calendly, Doctolib, oder eigenes System

**Aufwand:** 2-3 Stunden (Calendly) oder 2 Tage (eigenes System)
**Impact:** Convenience für Kunden

---

### 12. Newsletter-Anmeldung

**Nutzen:**
- Bestandskunden-Bindung
- Recalls für Kontaktlinsen-Nachbestellung
- News über neue Leistungen

**Aufwand:** 3-4 Stunden (Mailchimp Integration)
**Impact:** Wiederkehrende Kunden

---

### 13. Video-Content

**Ideen:**
- "So läuft eine Kontaktlinsen-Anpassung ab"
- "Nachtlinsen einsetzen - Tutorial"
- Team-Vorstellung

**Aufwand:** 1 Tag Produktion + Schnitt
**Impact:**
- Sehr hohe Engagement-Rate
- YouTube-SEO
- Vertrauen aufbauen

---

## 🛠️ Technische Verbesserungen

### 14. Preload kritischer Ressourcen

**Aktuell:** Fonts laden asynchron (flackern)
**Fix:**
```html
<link rel="preload" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" as="style">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

**Aufwand:** 5 Minuten
**Impact:** Schnelleres Rendering, kein Font-Flackern

---

### 15. CSS/JS minifizieren & kombinieren

**Aktuell:**
- 10+ CSS-Dateien
- 15+ JS-Dateien
- Viele HTTP-Requests

**Fix:** Build-Process mit Vite/Webpack
**Aufwand:** 4-6 Stunden
**Impact:** ~30% schnelleres Laden

---

### 16. Service Worker für Offline-Support

**Nutzen:**
- Website lädt auch ohne Internet (gecached)
- PWA-fähig

**Aufwand:** 3-4 Stunden
**Impact:** Bessere UX, PWA-Vorteile

---

## 📊 Priorisierung nach Impact/Aufwand

### Heute/Morgen (Quick Wins):
1. ✅ Analytics entfernt (erledigt)
2. Open Graph URLs korrigieren (5 Min)
3. Email-Obfuscation vereinfachen (10 Min)
4. Strukturierte Daten (15 Min)
5. Preload Fonts (5 Min)

**Total:** ~35 Minuten, großer Impact

### Diese Woche:
6. Revolution Slider ersetzen (2-3h) - MASSIV für Performance
7. Testimonials (2-3h)
8. Call-to-Action optimieren (1h)
9. FAQ-Sektion (3-4h)

**Total:** ~10 Stunden, große Verbesserungen

### Nächste 2 Wochen (parallel zu Hetzner):
10. Blog/News starten (1 Artikel)
11. Preise transparent machen
12. Terminbuchung evaluieren

---

## 🎯 Meine Top 3 Empfehlungen

**1. Revolution Slider rauswerfen** (heute/morgen)
→ 22 MB → ~50 KB, Ladezeit halbiert

**2. Strukturierte Daten + Open Graph** (heute)
→ SEO + Social Media funktioniert

**3. Testimonials + FAQ** (diese Woche)
→ Vertrauen + weniger Support-Aufwand

---

## Soll ich eins davon direkt umsetzen?

Welche Verbesserung ist dir am wichtigsten? Ich kann sofort starten!
