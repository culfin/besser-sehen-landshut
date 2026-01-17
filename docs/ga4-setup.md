# Google Analytics 4 (GA4) Setup

## ⚠️ WICHTIG: Universal Analytics ist tot!

Seit **1. Juli 2023** verarbeitet Universal Analytics (UA) keine Daten mehr. Die alte Property `UA-185735048-1` funktioniert nicht mehr.

## 🚀 GA4 Measurement ID ersetzen

### Schritt 1: GA4 Property erstellen

1. Gehe zu https://analytics.google.com
2. **Admin** (unten links) → **Property erstellen**
3. Property-Name: "Besser Sehen Landshut"
4. Zeitzone: Deutschland
5. Währung: Euro (EUR)
6. **Weiter** → Branche: Gesundheit & Wellness
7. **Erstellen**

### Schritt 2: Measurement ID finden

1. In der neuen Property: **Admin** → **Datenströme**
2. **Web-Datenstream erstellen**
3. Website-URL: `https://bessersehen.la` (oder GitHub Pages URL)
4. Stream-Name: "Besser Sehen Website"
5. **Stream erstellen**
6. Kopiere die **Measurement ID** (Format: `G-XXXXXXXXXX`)

### Schritt 3: ID in Code ersetzen

Ersetze in allen HTML-Dateien:

```html
<!-- Ersetze dies: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Mit deiner echten Measurement ID: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ');
</script>
```

**Alle Dateien mit GA4-Code:**
- public/index.html
- public/team.html
- public/kontakt.html
- public/leistungen.html
- public/leistungen-kontaktlinsen.html
- public/leistungen-nachtlinsen.html
- public/leistungen-beratung-kurzsichtigkeit.html
- public/leistungen-visuelle-reha.html
- public/impressum.html
- public/datenschutz.html

### Schritt 4: Automatisch ersetzen

```bash
# Find & Replace in allen HTML-Dateien
find public -name "*.html" -type f -exec sed -i '' 's/G-XXXXXXXXXX/G-DEINE_ECHTE_ID/g' {} \;

# Committen
git add .
git commit -m "Add real GA4 Measurement ID"
git push
```

## ✅ Test nach Deployment

1. Website öffnen (nach GA4-Update)
2. Chrome DevTools → Network Tab
3. Filter: "collect"
4. Seite neu laden
5. Request an `google-analytics.com/g/collect` sollte erscheinen
6. Parameter `tid=G-DEINE_ID` prüfen

**Oder:**

1. Google Analytics öffnen
2. **Echtzeit-Bericht**
3. Eigene Website besuchen
4. Dein Besuch sollte in ~10 Sekunden erscheinen

## 📊 Was GA4 trackt

**Automatisch:**
- Seitenaufrufe (pageviews)
- Scrolls
- Outbound Clicks
- Site Search
- Video Engagement

**Empfohlene Custom Events:**
- Kontaktformular-Absendung
- WhatsApp-Klick
- Telefon-Klick
- Terminanfrage

## 🔒 Datenschutz

GA4 muss in der **Datenschutzerklärung** erwähnt werden:

```markdown
## Google Analytics

Diese Website nutzt Google Analytics 4, einen Webanalysedienst von Google LLC.
Erfasste Daten werden anonymisiert und zur Verbesserung der Website-Nutzung verwendet.

Sie können der Datenerfassung widersprechen durch:
- Browser Do-Not-Track Einstellung
- Google Analytics Opt-Out Browser-Add-On

Mehr Infos: https://policies.google.com/privacy
```

**Optional:** Cookie-Banner hinzufügen (z.B. Cookiebot, Usercentrics)

## 🎯 Alternative: Plausible Analytics (DSGVO-freundlich)

Falls GA4 zu komplex oder datenschutz-kritisch:

- **Plausible.io:** €9/Monat, DSGVO-konform, kein Cookie-Banner nötig
- **Simple Analytics:** €19/Monat, sehr simpel
- **Matomo:** Self-hosted, kostenlos, volle Kontrolle

Für kleine Websites oft die bessere Wahl!
