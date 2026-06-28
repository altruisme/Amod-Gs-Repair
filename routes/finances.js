// ── ROUTES : Finances (entrées / sorties) ──
const express = require('express');
const router  = express.Router();
const { lire, ecrire } = require('./db');

// GET /api/finances → liste + solde
router.get('/', (req, res) => {
  const finances = lire('finances.json') || [];
  const solde = finances.reduce((acc, f) => {
    return acc + (f.type === 'Entrée' ? f.montant : -f.montant);
  }, 0);
  res.json({ finances, solde });
});

// POST /api/finances → ajouter une opération
router.post('/', (req, res) => {
  const finances = lire('finances.json') || [];
  const type = req.body.type || 'Dépense';
  const op = {
    type    : type === 'Entrée' ? 'Entrée' : 'Sortie',
    subtype : type,
    montant : parseFloat(req.body.montant) || 0,
    nom     : (req.body.nom   || '').toUpperCase(),
    motif   : req.body.motif  || '',
    date    : new Date().toISOString()
  };
  if (op.montant <= 0 || !op.nom || !op.motif) {
    return res.status(400).json({ erreur: 'Montant, Nom et Motif sont obligatoires' });
  }
  finances.unshift(op);
  ecrire('finances.json', finances);
  res.status(201).json(op);
});

// PUT /api/finances/:idx → modifier
router.put('/:idx', (req, res) => {
  const finances = lire('finances.json') || [];
  const idx = parseInt(req.params.idx);
  if (idx < 0 || idx >= finances.length) return res.status(404).json({ erreur: 'Opération introuvable' });
  const type = req.body.type || finances[idx].subtype;
  finances[idx] = {
    ...finances[idx],
    type    : type === 'Entrée' ? 'Entrée' : 'Sortie',
    subtype : type,
    montant : parseFloat(req.body.montant) ?? finances[idx].montant,
    nom     : (req.body.nom || finances[idx].nom).toUpperCase(),
    motif   : req.body.motif ?? finances[idx].motif,
  };
  ecrire('finances.json', finances);
  res.json(finances[idx]);
});

// DELETE /api/finances/:idx → supprimer
router.delete('/:idx', (req, res) => {
  const finances = lire('finances.json') || [];
  const idx = parseInt(req.params.idx);
  if (idx < 0 || idx >= finances.length) return res.status(404).json({ erreur: 'Opération introuvable' });
  finances.splice(idx, 1);
  ecrire('finances.json', finances);
  res.json({ ok: true });
});

module.exports = router;
