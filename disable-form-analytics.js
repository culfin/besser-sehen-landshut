#!/usr/bin/env node

/**
 * Temporäre Anpassungen für GitHub Pages:
 * 1. Kontaktformular durch Hinweis ersetzen
 * 2. Analytics entfernen
 */

const fs = require('fs').promises;

const FORM_REPLACEMENT = `
                            <div class="alert alert-info appear-animation" data-appear-animation="fadeIn" data-appear-animation-delay="100">
                                <h4 class="font-weight-bold mb-3">📧 Kontaktieren Sie uns direkt</h4>
                                <p class="mb-3">Unser Kontaktformular wird gerade überarbeitet. In der Zwischenzeit erreichen Sie uns am schnellsten über:</p>

                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <div class="p-3 bg-light border-radius">
                                            <i class="fas fa-phone text-primary text-4"></i>
                                            <h5 class="font-weight-bold mt-2 mb-1">Telefon</h5>
                                            <a href="tel:+4987114228020" class="text-dark font-weight-semibold">0871 - 142 280 20</a>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="p-3 bg-light border-radius">
                                            <i class="fab fa-whatsapp text-success text-4"></i>
                                            <h5 class="font-weight-bold mt-2 mb-1">WhatsApp</h5>
                                            <a href="https://wa.me/4917632514105" target="_blank" class="text-dark font-weight-semibold">Nachricht schicken</a>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="p-3 bg-light border-radius">
                                            <i class="fas fa-envelope text-primary text-4"></i>
                                            <h5 class="font-weight-bold mt-2 mb-1">E-Mail</h5>
                                            <a href="mailto:hallo@bessersehen.la" class="text-dark font-weight-semibold">hallo@bessersehen.la</a>
                                        </div>
                                    </div>
                                </div>

                                <p class="mb-0 text-2"><small>💡 <strong>Tipp:</strong> Für Terminvereinbarungen nutzen Sie gerne WhatsApp oder rufen Sie uns direkt an.</small></p>
                            </div>
`;

async function disableFormAndAnalytics() {
  console.log('🔧 Temporäre Anpassungen für GitHub Pages...\n');

  // 1. Kontaktformular ersetzen
  const kontaktPath = './public/kontakt.html';
  let kontakt = await fs.readFile(kontaktPath, 'utf-8');

  // Ersetze gesamtes Formular (von <h3>Kontaktformular bis </form>)
  kontakt = kontakt.replace(
    /<h3 class="text-color-primary font-weight-bolder text-capitalize mb-3">Kontaktformular<\/h3>[\s\S]*?<\/form>/,
    FORM_REPLACEMENT
  );

  await fs.writeFile(kontaktPath, kontakt, 'utf-8');
  console.log('✓ Kontaktformular deaktiviert (kontakt.html)');

  // 2. Analytics aus allen HTML-Dateien entfernen
  const files = await fs.readdir('./public');
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  let analyticsCount = 0;
  for (const file of htmlFiles) {
    const filePath = `./public/${file}`;
    let content = await fs.readFile(filePath, 'utf-8');

    // Entferne GA4 Code
    const before = content;
    content = content.replace(/<!-- Google tag[\s\S]*?gtag\('config', 'G-[^']+'\);[\s\S]*?<\/script>/g, '');

    // Entferne reCAPTCHA
    content = content.replace(/<script id="google-recaptcha-v3"[\s\S]*?<\/script>/g, '');

    if (before !== content) {
      await fs.writeFile(filePath, content, 'utf-8');
      analyticsCount++;
    }
  }

  console.log(`✓ Analytics entfernt (${analyticsCount} Dateien)`);
  console.log(`✓ reCAPTCHA entfernt\n`);

  console.log('📝 Zusammenfassung:');
  console.log('   ✅ Kontaktformular → Direkte Kontaktmöglichkeiten');
  console.log('   ✅ Google Analytics entfernt');
  console.log('   ✅ reCAPTCHA entfernt');
  console.log('\n🚀 Website ist bereit für GitHub Pages!');
}

disableFormAndAnalytics().catch(console.error);
