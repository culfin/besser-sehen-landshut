# 🚀 Launch-Checkliste: GitHub Pages

## Aktueller Stand

✅ Website optimiert (76% kleinere Bilder)
✅ CSS/JS bereinigt (7 MB gespart)
✅ Kontaktformular temporär durch direkte Kontakte ersetzt
✅ Analytics entfernt (kommt später mit Matomo)
✅ GitHub Actions Workflow konfiguriert

**Bereit für Launch!**

---

## Schritt 1: GitHub Repository erstellen

### 1.1 Auf github.com

1. Gehe zu https://github.com/new
2. Repository Name: `besser-sehen-landshut`
3. Visibility: **Private** (oder Public, eure Wahl)
4. **NICHT** "Initialize with README" anklicken
5. **Create repository**

### 1.2 Code pushen

```bash
cd /Users/culfin/Documents/GitHub/besser-sehen-landshut

# Remote hinzufügen (ersetze USERNAME)
git remote add origin https://github.com/USERNAME/besser-sehen-landshut.git

# Pushen
git push -u origin main
```

**Falls Username/Password gefragt wird:**
- Username: dein GitHub Username
- Password: **Personal Access Token** (nicht Passwort!)
  - Erstellen auf: https://github.com/settings/tokens
  - Scopes: `repo`, `workflow`

---

## Schritt 2: GitHub Pages aktivieren

1. Gehe zu Repository → **Settings**
2. Linkes Menü → **Pages**
3. Bei "Source": Wähle **GitHub Actions**
4. Speichern

**Das war's!** Der Workflow startet automatisch.

---

## Schritt 3: Deployment verfolgen

1. Gehe zu Repository → **Actions** Tab
2. Du siehst "Deploy to GitHub Pages" laufen
3. Warte ~2-3 Minuten
4. ✅ Grüner Haken = Erfolgreich deployed

**Website-URL:** `https://USERNAME.github.io/besser-sehen-landshut`

---

## Schritt 4: Testen

Öffne die Website und prüfe:

- [ ] Startseite lädt
- [ ] Navigation funktioniert (Team, Kontakt, Leistungen)
- [ ] Bilder werden angezeigt
- [ ] Kontakt-Seite zeigt Telefon/WhatsApp/E-Mail
- [ ] Keine 404-Errors in Browser Console (F12)
- [ ] Mobile-Ansicht funktioniert (Responsive)
- [ ] Google Maps auf Kontakt-Seite lädt

---

## Schritt 5: Performance testen

**Google PageSpeed Insights:**

1. Gehe zu https://pagespeed.web.dev/
2. URL eingeben: `https://USERNAME.github.io/besser-sehen-landshut`
3. Analyse starten

**Erwartete Scores:**
- Desktop: > 90
- Mobile: > 80

**Falls schlechter:**
- Meist Revolution Slider (~22 MB)
- Kann später optimiert werden

---

## Troubleshooting

### Workflow schlägt fehl

**Problem:** "Permission denied" oder "403"

**Lösung:**
1. Settings → Actions → General
2. Workflow permissions: **Read and write permissions**
3. Speichern und Workflow neu starten

---

### 404 Fehler auf GitHub Pages

**Problem:** Website zeigt "404 - File not found"

**Lösung:**
1. Prüfe Settings → Pages ist aktiviert
2. Source ist "GitHub Actions" (nicht "Deploy from branch")
3. Warte 5 Minuten (DNS-Propagierung)
4. Cache löschen (Ctrl+F5)

---

### Bilder laden nicht

**Problem:** Einige Bilder zeigen nicht

**Lösung:**
1. Browser DevTools (F12) → Console
2. Prüfe Fehlermeldungen
3. Meist: Pfade falsch (z.B. `/bilder/` statt `bilder/`)
4. Falls WebP nicht unterstützt: Alte Browser (sehr selten)

---

## Nach Launch: Updates deployen

**So einfach wie:**

```bash
# Änderungen machen
git add .
git commit -m "Update XYZ"
git push

# Fertig! GitHub Actions deployed automatisch
```

**Deployment dauert:** ~2 Minuten

---

## Nächste Schritte

### Sofort:
- ✅ Launch auf GitHub Pages
- ✅ Team informieren
- ✅ URL teilen

### Diese Woche:
- Facebook/WhatsApp Status posten
- Kunden informieren

### In 1-2 Wochen (Schritt 2):
- Hetzner-Server aufsetzen (siehe `docs/plans/2026-01-17-hetzner-server-design.md`)
- Matomo Analytics
- Kontaktformular mit Backend
- DNS von GitHub Pages → Hetzner umstellen

---

## Support & Fragen

**Dokumentation:**
- `README.md` - Projekt-Übersicht
- `docs/github-pages-setup.md` - Detaillierte Setup-Anleitung
- `docs/plans/2026-01-17-hetzner-server-design.md` - Hetzner-Setup für später

**Bei Problemen:**
1. Prüfe GitHub Actions Logs (Actions Tab)
2. Browser Console (F12) für Frontend-Errors
3. Dokumentation nochmal durchlesen

---

## ✅ Launch Checklist

- [ ] GitHub Repository erstellt
- [ ] Code gepushed
- [ ] GitHub Pages aktiviert (Settings → Pages → GitHub Actions)
- [ ] Workflow erfolgreich (grüner Haken)
- [ ] Website lädt (USERNAME.github.io/besser-sehen-landshut)
- [ ] Alle Seiten getestet
- [ ] Mobile-Ansicht geprüft
- [ ] Performance > 80 (PageSpeed)
- [ ] Team informiert

**Wenn alles ✅ ist: Herzlichen Glückwunsch! 🎉**

Eure Website ist live und optimiert. In 1-2 Wochen setzen wir Schritt 2 um (Hetzner-Server mit Matomo + Kontaktformular).
