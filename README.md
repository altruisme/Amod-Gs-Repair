# 📱 A.MO.D GESTION V24 — Application Node.js

Système de gestion complet pour atelier de réparation téléphonique.

---

## 🚀 INSTALLATION (une seule fois)

### 1. Installer Node.js
Télécharger sur https://nodejs.org (version 16 ou plus récente)

### 2. Extraire le ZIP
Dézipper le dossier `amod-app` où vous voulez (Bureau, Disque, etc.)

### 3. Installer les dépendances
Ouvrir un terminal dans le dossier `amod-app` et taper :
```
npm install
```

---

## ▶️ DÉMARRAGE

```
npm start
```

Puis ouvrir Chrome et aller sur : **http://localhost:3000**

---

## 📁 STRUCTURE DU PROJET

```
amod-app/
├── server.js          ← Serveur Express principal
├── package.json       ← Dépendances Node.js
├── routes/
│   ├── db.js          ← Lecture/écriture JSON
│   ├── fiches.js      ← API fiches de réparation
│   ├── finances.js    ← API finances (entrées/sorties)
│   ├── config.js      ← API configuration (logo, textes)
│   └── export.js      ← API export JSON/CSV + import
├── data/              ← 📦 VOS DONNÉES (sauvegardez ce dossier !)
│   ├── fiches.json
│   ├── finances.json
│   └── config.json
└── public/
    └── index.html     ← Interface utilisateur
```

---

## 🌐 API REST disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/fiches | Liste toutes les fiches |
| POST | /api/fiches | Créer une fiche |
| PUT | /api/fiches/:code | Modifier une fiche |
| DELETE | /api/fiches/:code | Supprimer une fiche |
| GET | /api/finances | Liste + solde |
| POST | /api/finances | Ajouter opération |
| PUT | /api/finances/:idx | Modifier opération |
| DELETE | /api/finances/:idx | Supprimer opération |
| GET | /api/config | Lire la configuration |
| PUT | /api/config | Sauvegarder la configuration |
| GET | /api/export/backup | Télécharger sauvegarde JSON |
| GET | /api/export/csv | Télécharger finances CSV |
| POST | /api/export/import | Importer une sauvegarde |

---

## 💾 SAUVEGARDE

Vos données sont dans le dossier **`data/`**.
Pour sauvegarder sur clé USB : copier ce dossier.
Pour restaurer : utiliser le bouton **IMPORT** dans l'application.

---

## 🔧 MODE DÉVELOPPEUR

```
npm run dev
```
(redémarrage automatique à chaque modification)

---

**A.MO.D — Maintenance Téléphonique & Vente**
📍 Togokomé Carrefour | 📞 +228 93 88 94 78
