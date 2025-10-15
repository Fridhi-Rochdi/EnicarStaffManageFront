<<<<<<< HEAD
# 🎫 Enicar Staff Management System

Application web moderne de gestion du personnel pour Enicar, développée avec React et Vite.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Contribuer](#contribuer)

## 🎯 Aperçu

Enicar Staff Management est une application frontend qui permet de gérer efficacement le personnel et les tickets. L'application offre une interface utilisateur moderne et intuitive construite avec React et stylisée avec Tailwind CSS.

## ✨ Fonctionnalités

- 🔐 **Authentification** : Système de connexion sécurisé
- 🏠 **Dashboard** : Page d'accueil avec vue d'ensemble
- 🎫 **Gestion des tickets** : Création et gestion des tickets du personnel
- 📊 **Visualisation des données** : Affichage et formatage des données
- 🖨️ **Impression** : Fonctionnalité d'impression des cartes
- 📱 **Responsive** : Interface adaptative pour tous les écrans
- 🎨 **Interface moderne** : Design épuré avec Tailwind CSS

## 🛠️ Technologies utilisées

### Frontend
- **React 19** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **React Router DOM 7** - Gestion de la navigation et du routing
- **Vite 6** - Outil de build rapide et serveur de développement

### UI & Styling
- **Tailwind CSS 3** - Framework CSS utilitaire
- **Heroicons** - Icônes React
- **Font Awesome 6** - Bibliothèque d'icônes

### State Management & Utilities
- **Zustand 5** - Gestion d'état légère et performante
- **React Select 5** - Composant de sélection personnalisable
- **UUID 11** - Génération d'identifiants uniques

### Développement
- **ESLint 9** - Linter pour la qualité du code
- **PostCSS 8** - Transformation CSS
- **Autoprefixer** - Ajout automatique des préfixes CSS

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** (version 9 ou supérieure) ou **yarn**

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Fridhi-Rochdi/EnicarStaffManageFront.git
   cd EnicarStaffManageFront
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```
   ou avec yarn :
   ```bash
   yarn install
   ```

## 💻 Utilisation

### Mode développement

Lancez le serveur de développement avec hot-reload :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

Créez une version optimisée pour la production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

### Prévisualisation de la production

Prévisualisez le build de production localement :

```bash
npm run preview
```

### Linting

Vérifiez la qualité du code :

```bash
npm run lint
```

## 📁 Structure du projet

```
EnicarStaffManageFront/
├── public/              # Fichiers statiques
├── src/
│   ├── assets/         # Images, logos, etc.
│   ├── components/     # Composants réutilisables
│   │   ├── dateformatter.jsx
│   │   └── printCard.jsx
│   ├── data/           # Données et configurations
│   │   └── data.js
│   ├── layout/         # Composants de mise en page
│   │   ├── navbar.jsx
│   │   ├── primaryLayout.jsx
│   │   └── sidebar.jsx
│   ├── pages/          # Pages de l'application
│   │   ├── addTicketPage.jsx
│   │   ├── landingPage.jsx
│   │   └── login.jsx
│   ├── store/          # Gestion d'état (Zustand)
│   │   ├── asidestore.js
│   │   ├── fakedatastore.js
│   │   └── utils.js
│   ├── index.css       # Styles globaux
│   ├── main.jsx        # Point d'entrée de l'application
│   ├── routes.js       # Configuration des routes
│   └── utils.js        # Fonctions utilitaires
├── eslint.config.js    # Configuration ESLint
├── index.html          # Template HTML
├── package.json        # Dépendances et scripts
├── postcss.config.js   # Configuration PostCSS
├── tailwind.config.js  # Configuration Tailwind CSS
└── vite.config.js      # Configuration Vite
```

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Crée un build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie la qualité du code avec ESLint |

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 👤 Auteur

**Fridhi Rochdi**

- GitHub: [@Fridhi-Rochdi](https://github.com/Fridhi-Rochdi)

## 📄 Licence

Ce projet est destiné à un usage privé pour Enicar.

---

⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub !
=======
# EnicarStaffManageFront
>>>>>>> e0d934bf2bbca9ebb84b9e9a83044e38ad0fe713
