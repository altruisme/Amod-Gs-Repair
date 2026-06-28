// ── ROUTES : Configuration (header, footer, logo) ──
const express = require('express');
const router  = express.Router();
const { lire, ecrire } = require('./db');

// GET /api/config
router.get('/', (req, res) => {
  res.json(lire('config.json'));
});

// PUT /api/config
router.put('/', (req, res) => {
  const config = lire('config.json');
  const updated = {
    header: req.body.header ?? config.header,
    footer: req.body.footer ?? config.footer,
    logo  : req.body.logo   ?? config.logo
  };
  ecrire('config.json', updated);
  res.json(updated);
});

module.exports = router;
