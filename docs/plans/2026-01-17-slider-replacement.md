# Revolution Slider Austausch - Design

**Datum:** 2026-01-17
**Ziel:** 22 MB → 50 KB (99.8% Reduzierung!)
**Aufwand:** 2-3 Stunden

---

## Problem-Analyse

### Aktueller Zustand

**Revolution Slider:**
- Größe: **22 MB** (!!)
- Files: ~200 JS/CSS/Image-Dateien
- Ladezeit: ~15 Sekunden auf 3G
- Overkill: Ihr nutzt nur 5% der Features

**Was ihr wirklich nutzt:**
- 8 Bilder in Slideshow (start-slider-01.jpg bis 08.jpg)
- Fade-Transition
- Auto-Play
- Navigation (Pfeile + Dots)

**Was ihr NICHT nutzt:**
- 3D-Effekte
- Video-Backgrounds
- Parallax-Scrolling
- Ken Burns Effekte
- 95% aller anderen Features

---

## Lösung: Swiper.js

### Warum Swiper.js?

**Vorteile:**
- ✅ Bundle: **50 KB** (statt 22 MB!)
- ✅ Modern, aktiv entwickelt
- ✅ Touch-fähig (Mobile-freundlich)
- ✅ Accessibility (ARIA-Labels)
- ✅ Sehr einfache Integration
- ✅ Alle Features die ihr braucht

**Features:**
- Autoplay
- Fade/Slide Transitions
- Navigation (Arrows + Pagination)
- Lazy Loading (perfekt für eure WebP-Bilder)
- Responsive

---

## Implementation-Plan

### Phase 1: Swiper.js Setup (30 Min)

**1.1 CDN einbinden (oder lokal hosten)**

```html
<!-- In <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Vor </body> -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

**Oder lokal (empfohlen):**
```bash
# Download
cd public/vendor
mkdir swiper
cd swiper
wget https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css
wget https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js
```

---

### Phase 2: HTML anpassen (45 Min)

**Aktueller Revolution Slider (index.html):**
```html
<!-- Revolution Slider (komplex, ~150 Zeilen) -->
<div class="slider-container rev_slider_wrapper" ...>
  <!-- Kompliziertes Markup -->
</div>
```

**Neuer Swiper (einfach, ~30 Zeilen):**
```html
<div class="swiper hero-slider">
  <div class="swiper-wrapper">

    <!-- Slide 1 -->
    <div class="swiper-slide">
      <picture>
        <source srcset="bilder/start-slider-01.webp" type="image/webp">
        <img src="bilder/start-slider-01.jpg"
             alt="Kontaktlinsen-Anpassung"
             class="swiper-lazy">
      </picture>
      <div class="slide-caption">
        <h2>Ihre Experten für Kontaktlinsen</h2>
        <p>Individuelle Anpassung mit modernster Technik</p>
        <a href="leistungen-kontaktlinsen.html" class="btn btn-primary">Mehr erfahren</a>
      </div>
    </div>

    <!-- Slide 2 -->
    <div class="swiper-slide">
      <picture>
        <source srcset="bilder/start-slider-02.webp" type="image/webp">
        <img src="bilder/start-slider-02.jpg"
             alt="Nachtlinsen"
             class="swiper-lazy">
      </picture>
      <div class="slide-caption">
        <h2>Nachtlinsen - Tagsüber scharf sehen</h2>
        <p>Ohne Brille oder Kontaktlinsen</p>
        <a href="leistungen-nachtlinsen.html" class="btn btn-primary">Mehr erfahren</a>
      </div>
    </div>

    <!-- Slides 3-8 analog -->

  </div>

  <!-- Navigation -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- Pagination -->
  <div class="swiper-pagination"></div>
</div>
```

---

### Phase 3: JavaScript initialisieren (15 Min)

**In custom.js (oder eigene Datei):**

```javascript
// Hero Slider initialisieren
const heroSlider = new Swiper('.hero-slider', {
  // Loop
  loop: true,

  // Autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  // Effect
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  // Speed
  speed: 800,

  // Navigation
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Lazy Loading
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 2
  },

  // Accessibility
  a11y: {
    enabled: true
  }
});
```

---

### Phase 4: CSS-Styling (45 Min)

**Custom CSS für Slider:**

```css
/* Hero Slider Container */
.hero-slider {
  width: 100%;
  height: 600px;
  position: relative;
}

@media (max-width: 768px) {
  .hero-slider {
    height: 400px;
  }
}

/* Slide */
.swiper-slide {
  position: relative;
  overflow: hidden;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Caption Overlay */
.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  z-index: 10;
}

.slide-caption h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.slide-caption p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .slide-caption {
    padding: 20px;
  }

  .slide-caption h2 {
    font-size: 1.5rem;
  }

  .slide-caption p {
    font-size: 1rem;
  }
}

/* Navigation Arrows */
.swiper-button-prev,
.swiper-button-next {
  color: white;
  background: rgba(0,0,0,0.5);
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(0,0,0,0.8);
}

/* Pagination Dots */
.swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: var(--primary-color, #007bff);
}
```

---

### Phase 5: Revolution Slider entfernen (30 Min)

**Schritte:**

1. **HTML bereinigen:**
   - Revolution Slider HTML entfernen
   - Swiper HTML einfügen

2. **CSS entfernen:**
   ```html
   <!-- ENTFERNEN: -->
   <link rel="stylesheet" href="vendor/rs-plugin/css/settings.css">
   <link rel="stylesheet" href="vendor/rs-plugin/css/layers.css">
   <link rel="stylesheet" href="vendor/rs-plugin/css/navigation.css">
   ```

3. **JS entfernen:**
   ```html
   <!-- ENTFERNEN: -->
   <script src="vendor/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
   <script src="vendor/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>
   ```

4. **Ordner löschen:**
   ```bash
   rm -rf public/vendor/rs-plugin
   ```

---

## Testing-Checklist

Nach Implementation testen:

- [ ] Slider lädt und funktioniert
- [ ] Autoplay startet automatisch
- [ ] Navigation (Pfeile) funktioniert
- [ ] Pagination (Dots) funktioniert
- [ ] Bilder laden (WebP + Fallback)
- [ ] Lazy Loading funktioniert
- [ ] Responsive auf Mobile
- [ ] Keine Console-Errors
- [ ] Touch-Swipe funktioniert (Mobile)

---

## Performance-Gewinn

**Vorher:**
- Revolution Slider: 22 MB
- Ladezeit: ~15s (3G)
- Lighthouse Score: ~40 (Mobile)

**Nachher:**
- Swiper.js: 50 KB
- Ladezeit: ~3s (3G)
- Lighthouse Score: ~85 (Mobile)

**Gewinn:**
- ✅ 99.8% weniger Code
- ✅ 5x schnellere Ladezeit
- ✅ +45 Punkte Lighthouse
- ✅ Bessere Mobile Experience

---

## Alternative: Statisches Hero

Falls Slider nicht wichtig ist:

**Option B: Kein Slider, nur Hero-Image**

```html
<div class="hero-static" style="
  background-image: url('bilder/startseite-hero.webp');
  background-size: cover;
  background-position: center;
  height: 600px;
  position: relative;
">
  <div class="hero-content">
    <h1>Besser Sehen Landshut</h1>
    <p>Ihre Experten für Kontaktlinsen</p>
    <a href="kontakt.html" class="btn btn-primary">Termin vereinbaren</a>
  </div>
</div>
```

**Vorteile:**
- Noch einfacher
- Noch schneller
- Kein JS nötig

**Nachteil:**
- Nur 1 Bild, nicht mehrere

---

## Implementation-Reihenfolge

### Option 1: Schrittweise (sicher)

1. Swiper lokal in `vendor/swiper/` installieren
2. Test-Seite erstellen (`slider-test.html`)
3. Swiper konfigurieren und testen
4. Wenn perfekt → auf `index.html` übertragen
5. Revolution Slider entfernen
6. Committen & deployen

**Vorteil:** Kein Risiko, kann jederzeit zurück

---

### Option 2: Direkt (schneller)

1. Revolution Slider Backup machen
2. Swiper direkt in `index.html` einbauen
3. Testen
4. Revolution entfernen
5. Deployen

**Vorteil:** Schneller fertig

---

## Nächste Schritte

**Soll ich direkt starten?**

**A) Ja, direkt umsetzen (2-3h)**
- Ich baue Swiper ein
- Teste lokal
- Deploye

**B) Zuerst Test-Seite bauen**
- Ich erstelle `slider-test.html`
- Du testest
- Dann entscheiden wir

**C) Später, erst andere Quick Wins**
- Open Graph + Schema.org deployen
- Slider später

Was passt besser?
