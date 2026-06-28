// ── ROUTES : Fiches de réparation ──
const express = require('express');
const router  = express.Router();
const { lire, ecrire } = require('./db');

// GET  /api/fiches        → liste toutes les fiches
router.get('/', (req, res) => {
  res.json(lire('fiches.json') || []);
});

// GET  /api/fiches/:code  → une seule fiche
router.get('/:code', (req, res) => {
  const fiches = lire('fiches.json') || [];
  const f = fiches.find(x => x.code === req.params.code);
  if (!f) return res.status(404).json({ erreur: 'Fiche introuvable' });
  res.json(f);
});

// POST /api/fiches        → créer une nouvelle fiche
router.post('/', (req, res) => {
  const fiches = lire('fiches.json') || [];
  const f = {
    code    : 'AM-' + Date.now().toString().slice(-6),
    nom     : (req.body.nom     || '').toUpperCase(),
    tel     : req.body.tel     || '',
    gmail   : req.body.gmail   || '',
    model   : (req.body.model  || '').toUpperCase(),
    fault   : req.body.fault   || '---',
    lock    : req.body.lock    || 'AUCUN',
    total   : parseFloat(req.body.total)  || 0,
    paye    : parseFloat(req.body.paye)   || 0,
    depot   : req.body.depot   || '',
    retrait : req.body.retrait || '',
    garantie: req.body.garantie || 'AUCUNE GARANTIE',
    date    : new Date().toISOString()
  };

  // Valider les champs obligatoires
  if (!f.nom || !f.model) {
    return res.status(400).json({ erreur: 'Nom et Modèle sont obligatoires' });
  }

  fiches.unshift(f);
  ecrire('fiches.json', fiches);

  // Enregistrer l'avance dans les finances si > 0
  if (f.paye > 0) {
    const finances = lire('finances.json') || [];
    finances.unshift({
      type    : 'Entrée',
      subtype : 'Entrée',
      montant : f.paye,
      nom     : f.nom,
      motif   : 'AVANCE ' + f.code,
      date    : new Date().toISOString()
    });
    ecrire('finances.json', finances);
  }

  res.status(201).json(f);
});

// PUT  /api/fiches/:code  → modifier une fiche
router.put('/:code', (req, res) => {
  const fiches = lire('fiches.json') || [];
  const idx = fiches.findIndex(x => x.code === req.params.code);
  if (idx < 0) return res.status(404).json({ erreur: 'Fiche introuvable' });

  fiches[idx] = {
    ...fiches[idx],
    nom     : (req.body.nom    || fiches[idx].nom).toUpperCase(),
    tel     : req.body.tel     ?? fiches[idx].tel,
    gmail   : req.body.gmail   ?? fiches[idx].gmail,
    model   : (req.body.model  || fiches[idx].model).toUpperCase(),
    fault   : req.body.fault   ?? fiches[idx].fault,
    lock    : req.body.lock    ?? fiches[idx].lock,
    total   : parseFloat(req.body.total)  ?? fiches[idx].total,
    paye    : parseFloat(req.body.paye)   ?? fiches[idx].paye,
    depot   : req.body.depot   ?? fiches[idx].depot,
    retrait : req.body.retrait ?? fiches[idx].retrait,
    garantie: req.body.garantie ?? fiches[idx].garantie,
  };

  ecrire('fiches.json', fiches);
  res.json(fiches[idx]);
});

// DELETE /api/fiches/:code → supprimer
router.delete('/:code', (req, res) => {
  let fiches = lire('fiches.json') || [];
  const avant = fiches.length;
  fiches = fiches.filter(x => x.code !== req.params.code);
  if (fiches.length === avant) return res.status(404).json({ erreur: 'Fiche introuvable' });
  ecrire('fiches.json', fiches);
  res.json({ ok: true });
});

module.exports = router;
