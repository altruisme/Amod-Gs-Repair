// ── Utilitaire lecture/écriture JSON ──
const fs   = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data');

function lire(fichier) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA, fichier), 'utf8'));
  } catch {
    return null;
  }
}

function ecrire(fichier, data) {
  fs.writeFileSync(path.join(DATA, fichier), JSON.stringify(data, null, 2));
}

module.exports = { lire, ecrire };
