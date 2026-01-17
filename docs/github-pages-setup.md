# GitHub Pages Setup

## 🚀 Deployment aktivieren

### Schritt 1: Repository auf GitHub pushen

```bash
# Aktuellen Stand committen
git add .
git commit -m "Add GitHub Pages deployment"

# GitHub Remote hinzufügen (falls noch nicht geschehen)
git remote add origin https://github.com/culfin/besser-sehen-landshut.git

# Code pushen
git push -u origin main
```

### Schritt 2: GitHub Pages aktivieren

1. Gehe zu GitHub Repository: `https://github.com/culfin/besser-sehen-landshut`
2. Klicke auf **Settings** (oben rechts)
3. Im linken Menü: **Pages**
4. Bei "Source": Wähle **GitHub Actions**
5. Speichern

### Schritt 3: Erster Deployment

Der erste Deployment startet automatisch nach dem Push:

1. Gehe zu **Actions** Tab
2. Sieh zu wie "Deploy to GitHub Pages" läuft
3. Nach ~2 Minuten ist die Website live
4. URL: `https://culfin.github.io/besser-sehen-landshut`

## 🔧 Workflow-Details

Der GitHub Actions Workflow (`deploy.yml`) macht:

1. ✅ Checkout des Codes
2. ✅ GitHub Pages konfigurieren
3. ✅ `public/` Ordner als Artifact hochladen
4. ✅ Zu GitHub Pages deployen

**Trigger:**
- Push auf `main` branch
- Manuell via Actions Tab

## ✅ Test-Checklist

Nach dem Deployment testen:

- [ ] Startseite lädt
- [ ] Alle Unterseiten funktionieren
- [ ] Bilder werden geladen (WebP + Fallback)
- [ ] Navigation funktioniert
- [ ] Kontaktformular funktioniert
- [ ] Responsive Design auf Mobile
- [ ] Keine 404-Errors in Console

## 🌐 Custom Domain (später)

### Für eigenen Server

1. DNS-Eintrag erstellen:
   ```
   A Record: @ → GitHub Pages IP
   CNAME: www → culfin.github.io
   ```

2. In GitHub Settings > Pages:
   - Custom domain: `bessersehen.la`
   - Enforce HTTPS aktivieren

3. Warten auf DNS-Propagierung (~24h)

### Für andere Hosting-Optionen

Das `public/` Verzeichnis kann auf jeden Webserver deployed werden:

- FTP/SFTP Upload
- Rsync
- Netlify/Vercel (Drag & Drop)
- Eigener Apache/Nginx Server

## 🔍 Troubleshooting

### Workflow schlägt fehl

1. Prüfe GitHub Actions Logs
2. Permissions korrekt? (Settings > Actions > Workflow permissions)
3. Branch heißt `main` (nicht `master`)?

### 404 auf GitHub Pages

1. GitHub Pages aktiviert? (Settings > Pages)
2. Source auf "GitHub Actions" gesetzt?
3. Workflow erfolgreich gelaufen? (Actions Tab)

### Bilder laden nicht

1. Pfade korrekt? (`bilder/` nicht `/bilder/`)
2. WebP-Dateien vorhanden?
3. Browser-Cache leeren

## 📊 Performance-Monitoring (optional)

Nach Deployment Performance messen:

- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest.org

**Ziel:**
- Lighthouse Score > 90 (Desktop)
- Lighthouse Score > 80 (Mobile)
- LCP < 2.5s
