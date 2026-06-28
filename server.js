// ══════════════════════════════════════════════════
//  A.MO.D GESTION V24 — Serveur Express
//  Démarrage : node server.js  (ou npm start)
//  Accès     : http://localhost:3000
// ══════════════════════════════════════════════════

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const ficheRoutes   = require('./routes/fiches');
const financeRoutes = require('./routes/finances');
const configRoutes  = require('./routes/config');
const exportRoutes  = require('./routes/export');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Créer le dossier data s'il n'existe pas ──
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// Initialiser les fichiers JSON si absents
const FILES = {
  'fiches.json'  : [],
  'finances.json': [],
  'config.json'  : {
    header: '',
    footer: '',
    logo  : ''
  }
};
Object.entries(FILES).forEach(([file, def]) => {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, JSON.stringify(def, null, 2));
});

// ── Middlewares ──
app.use(cors());
app.use(express.json({ limit: '10mb' }));      // pour les logos base64
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes API ──
app.use('/api/fiches',   ficheRoutes);
app.use('/api/finances', financeRoutes);
app.use('/api/config',   configRoutes);
app.use('/api/export',   exportRoutes);

// ── Route santé ──
app.get('/api/ping', (req, res) => res.json({ ok: true, version: 'V24' }));

// ── Toutes les autres routes → index.html ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  ✅  A.MO.D GESTION V24 démarré');
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log('  📁  Données stockées dans /data/');
  console.log('');
});
