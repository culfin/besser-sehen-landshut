# Hetzner-Server Setup - Self-Hosted Analytics & Kontaktformular

**Datum:** 2026-01-17
**Phase:** Schritt 2 (nach GitHub Pages Launch)
**Ziel:** Komplettes Self-Hosting auf Hetzner VPS

---

## Kontext

**Aktueller Stand:**
- ✅ Website läuft auf GitHub Pages (statisch)
- ❌ Kein Analytics
- ❌ Kontaktformular deaktiviert (direkter Kontakt via Telefon/WhatsApp)

**Hetzner-Server:**
- VPS bei Hetzner vorhanden
- Volle Root-Rechte (SSH-Zugang)
- Linux (Ubuntu/Debian empfohlen)

**Ziel nach Migration:**
- ✅ Matomo Analytics (self-hosted, DSGVO-konform)
- ✅ Kontaktformular mit Node.js Backend
- ✅ Cloudflare Turnstile (spam-frei, privacy-friendly)
- ✅ Nginx Webserver + Let's Encrypt SSL
- ✅ Komplette Kontrolle, keine externen Services

---

## Architektur-Entscheidungen

### Tech-Stack

**Webserver:** Nginx
- ✅ Schnell, stabil, bewährt
- ✅ Reverse Proxy für Node.js
- ✅ Statische Files perfekt optimiert
- ✅ Let's Encrypt Integration

**Analytics:** Matomo (self-hosted)
- ✅ 100% DSGVO-konform
- ✅ Keine Cookies nötig (konfigurierbar)
- ✅ Eigene Datenbank (volle Kontrolle)
- ✅ GA4-ähnliches Dashboard

**Backend:** Node.js + Express
- ✅ Lightweight für Kontaktformular
- ✅ Einfach zu warten
- ✅ Async I/O perfekt für Mails

**Spam-Schutz:** Cloudflare Turnstile
- ✅ Privacy-friendly (keine Cookies)
- ✅ Kostenlos
- ✅ Unsichtbar für User
- ✅ Sehr effektiv

**Mail:** Nodemailer + SMTP
- ✅ Eigener SMTP (z.B. Hetzner Mail)
- ✅ Oder externes SMTP (SendGrid free tier)

---

## System-Design

### Server-Architektur

```
Internet
    │
    ↓
Cloudflare (DNS + DDoS Protection)
    │
    ↓
Nginx (:80, :443)
    │
    ├─→ Static Files (/var/www/bessersehen.la/)
    │   ├─ index.html
    │   ├─ bilder/
    │   └─ css/js/vendor/
    │
    ├─→ Matomo Analytics (Reverse Proxy)
    │   localhost:8080 → /matomo/
    │
    └─→ Node.js Backend (Reverse Proxy)
        localhost:3000 → /api/
        └─ POST /api/contact → Kontaktformular
```

### Ordnerstruktur

```
/var/www/bessersehen.la/
├── public/              # Statische Website
│   ├── index.html
│   ├── bilder/
│   ├── css/
│   └── js/
├── matomo/              # Matomo Installation
│   ├── index.php
│   └── ...
└── api/                 # Node.js Backend
    ├── server.js
    ├── package.json
    └── .env
```

---

## Phase 1: Server-Basis-Setup

### 1.1 Server vorbereiten

```bash
# SSH einloggen
ssh root@YOUR_SERVER_IP

# System updaten
apt update && apt upgrade -y

# Firewall konfigurieren
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable

# Swap hinzufügen (falls < 2GB RAM)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### 1.2 Benötigte Software installieren

```bash
# Nginx installieren
apt install nginx -y

# Node.js installieren (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y

# MariaDB für Matomo
apt install mariadb-server -y
mysql_secure_installation

# Certbot (Let's Encrypt)
apt install certbot python3-certbot-nginx -y

# PHP für Matomo
apt install php-fpm php-mysql php-xml php-mbstring php-gd php-curl -y
```

---

## Phase 2: Matomo Analytics Setup

### 2.1 Matomo installieren

```bash
# Matomo herunterladen
cd /var/www/bessersehen.la
wget https://builds.matomo.org/matomo-latest.zip
unzip matomo-latest.zip
rm matomo-latest.zip

# Berechtigungen setzen
chown -R www-data:www-data matomo/
```

### 2.2 Datenbank erstellen

```bash
mysql -u root -p

CREATE DATABASE matomo_db;
CREATE USER 'matomo_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON matomo_db.* TO 'matomo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2.3 Nginx für Matomo konfigurieren

```nginx
# /etc/nginx/sites-available/bessersehen.la

server {
    listen 80;
    server_name bessersehen.la www.bessersehen.la;

    # Matomo Analytics
    location /matomo/ {
        alias /var/www/bessersehen.la/matomo/;
        index index.php;
        try_files $uri $uri/ /matomo/index.php?$args;

        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $request_filename;
            include fastcgi_params;
        }
    }

    # Statische Website
    location / {
        root /var/www/bessersehen.la/public;
        try_files $uri $uri/ =404;
    }
}
```

### 2.4 Matomo Web-Setup durchführen

1. Browser: `http://bessersehen.la/matomo/`
2. Installation durchlaufen
3. Tracking-Code kopieren
4. In HTML einfügen (alle Seiten)

**Tracking-Code:**
```html
<!-- Matomo -->
<script>
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//bessersehen.la/matomo/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo -->
```

---

## Phase 3: Kontaktformular Backend

### 3.1 Node.js Backend erstellen

```bash
mkdir -p /var/www/bessersehen.la/api
cd /var/www/bessersehen.la/api
```

**package.json:**
```json
{
  "name": "bessersehen-api",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "nodemailer": "^6.9.7",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1"
  }
}
```

**server.js:**
```javascript
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(helmet());
app.use(cors({ origin: 'https://bessersehen.la' }));
app.use(express.json());

// Rate Limiting (max 5 Mails pro Stunde pro IP)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.'
});

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Turnstile Verifikation
async function verifyTurnstile(token) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET,
      response: token
    })
  });
  const data = await response.json();
  return data.success;
}

// Kontaktformular Endpoint
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, email, betreff, message, turnstileToken } = req.body;

    // Validierung
    if (!name || !email || !betreff || !message || !turnstileToken) {
      return res.status(400).json({ error: 'Alle Felder sind Pflichtfelder' });
    }

    // Turnstile prüfen
    const isValid = await verifyTurnstile(turnstileToken);
    if (!isValid) {
      return res.status(403).json({ error: 'Spam-Schutz fehlgeschlagen' });
    }

    // E-Mail senden
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'hallo@bessersehen.la',
      replyTo: email,
      subject: `Kontaktanfrage: ${betreff}`,
      html: `
        <h3>Neue Kontaktanfrage</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${betreff}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ success: true, message: 'Nachricht erfolgreich gesendet' });

  } catch (error) {
    console.error('Fehler:', error);
    res.status(500).json({ error: 'Serverfehler. Bitte versuchen Sie es später erneut.' });
  }
});

app.listen(PORT, 'localhost', () => {
  console.log(`API läuft auf Port ${PORT}`);
});
```

**.env:**
```
SMTP_HOST=mail.your-server.de
SMTP_USER=noreply@bessersehen.la
SMTP_PASS=your_password
SMTP_FROM="Besser Sehen Website <noreply@bessersehen.la>"
TURNSTILE_SECRET=your_cloudflare_turnstile_secret
```

### 3.2 PM2 für Auto-Restart

```bash
npm install -g pm2
pm2 start server.js --name bessersehen-api
pm2 startup
pm2 save
```

### 3.3 Nginx Reverse Proxy

```nginx
# In /etc/nginx/sites-available/bessersehen.la hinzufügen:

location /api/ {
    proxy_pass http://localhost:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

---

## Phase 4: Cloudflare Turnstile Integration

### 4.1 Turnstile Widget erstellen

1. Cloudflare Dashboard → Turnstile
2. Widget erstellen (Invisible)
3. Site Key + Secret Key kopieren

### 4.2 Frontend anpassen

**kontakt.html:**
```html
<!-- Turnstile Script -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<!-- Im Formular -->
<form id="contactForm" action="/api/contact" method="POST">
  <!-- ... bestehende Felder ... -->

  <!-- Turnstile Widget (unsichtbar) -->
  <div class="cf-turnstile"
       data-sitekey="YOUR_SITE_KEY"
       data-callback="onTurnstileSuccess"></div>

  <button type="submit">Abschicken</button>
</form>

<script>
function onTurnstileSuccess(token) {
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      betreff: e.target.betreff.value,
      message: e.target.message.value,
      turnstileToken: token
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Nachricht erfolgreich gesendet!');
        e.target.reset();
      } else {
        alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      alert('Serverfehler. Bitte versuchen Sie es später erneut.');
    }
  });
}
</script>
```

---

## Phase 5: SSL & Deployment

### 5.1 Let's Encrypt SSL

```bash
certbot --nginx -d bessersehen.la -d www.bessersehen.la
```

### 5.2 Auto-Renewal testen

```bash
certbot renew --dry-run
```

### 5.3 Nginx neu starten

```bash
systemctl reload nginx
```

---

## Testing-Checklist

Nach Deployment testen:

- [ ] Website lädt über HTTPS
- [ ] Matomo Analytics funktioniert
- [ ] Echtzeit-Report zeigt eigenen Besuch
- [ ] Kontaktformular sendet E-Mails
- [ ] Turnstile blockiert Spam
- [ ] Rate Limiting funktioniert (max 5/h)
- [ ] Alle Unterseiten laden
- [ ] Mobile-Ansicht funktioniert

---

## Monitoring & Wartung

### Logs überwachen

```bash
# Nginx Logs
tail -f /var/log/nginx/error.log

# Node.js Logs (PM2)
pm2 logs bessersehen-api

# Matomo Logs
tail -f /var/www/bessersehen.la/matomo/tmp/logs/matomo.log
```

### Backup-Strategie

**Täglich:**
- Matomo-Datenbank (mysql dump)
- Website-Files (rsync)

**Script:**
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
mysqldump -u matomo_user -p matomo_db > /backup/matomo-$DATE.sql
rsync -a /var/www/bessersehen.la/ /backup/website-$DATE/
```

---

## Kosten-Übersicht

**Hetzner VPS:** ~€5-10/Monat (je nach Größe)
**Domain:** ~€10/Jahr
**Cloudflare:** Kostenlos
**Turnstile:** Kostenlos
**Let's Encrypt:** Kostenlos

**Total:** ~€6-11/Monat

**Versus:**
- Plausible: €9/Monat (nur Analytics)
- GA4 + Cookie-Banner Tool: €10-30/Monat

**Self-Hosted = Günstiger + volle Kontrolle!**

---

## Nächste Schritte

1. GitHub Pages Launch (sofort)
2. In 1-2 Wochen: Hetzner-Server aufsetzen
3. Matomo + Backend installieren
4. DNS umstellen: GitHub Pages → Hetzner
5. Testen + Live gehen

**Geschätzte Setup-Zeit:** 4-6 Stunden
