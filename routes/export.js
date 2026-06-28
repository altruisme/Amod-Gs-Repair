// ── ROUTES : Export (sauvegarde JSON + CSV) ──
const express = require('express');
const router  = express.Router();
const { lire } = require('./db');

// GET /api/export/backup → télécharger tout en JSON
router.get('/backup', (req, res) => {
  const data = {
    fiches  : lire('fiches.json')   || [],
    finances: lire('finances.json') || [],
    config  : lire('config.json')   || {}
  };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="AMOD_SAVE.json"');
  res.send(JSON.stringify(data, null, 2));
});

// GET /api/export/csv → exporter les finances en CSV
router.get('/csv', (req, res) => {
  const finances = lire('finances.json') || [];
  let csv = 'Date,Type,Nom,Motif,Montant\n';
  finances.forEach(f => {
    const date = new Date(f.date).toLocaleDateString('fr-FR');
    csv += `${date},${f.type},${f.nom},"${f.motif}",${f.montant}\n`;
  });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="AMOD_FINANCES.csv"');
  res.send('\uFEFF' + csv); // BOM UTF-8 pour Excel
});

// POST /api/export/import → importer un fichier JSON de sauvegarde
router.post('/import', (req, res) => {
  try {
    const { fiches, finances, config } = req.body;
    const { ecrire } = require('./db');
    if (fiches)   ecrire('fiches.json',   fiches);
    if (finances) ecrire('finances.json', finances);
    if (config)   ecrire('config.json',   config);
    res.json({ ok: true, message: 'Import réussi' });
  } catch (err) {
    res.status(400).json({ erreur: 'Fichier invalide : ' + err.message });
  }
});

module.exports = router;
