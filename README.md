# 🎓 ENICarthage Staff Manager - Frontend<<<<<<< HEAD

# 🎫 Enicar Staff Management System

<div align="center">

Application web moderne de gestion du personnel pour Enicar, développée avec React et Vite.

![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)

![Vite](https://img.shields.io/badge/Vite-5.4.10-purple?style=for-the-badge&logo=vite)## 📋 Table des matières

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan?style=for-the-badge&logo=tailwind-css)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)- [Aperçu](#aperçu)

- [Fonctionnalités](#fonctionnalités)

**Interface web moderne et réactive pour la gestion du personnel de l'ENI Carthage**- [Technologies utilisées](#technologies-utilisées)

- [Prérequis](#prérequis)

[Demo](#-aperçu) • [Installation](#-installation) • [Fonctionnalités](#-fonctionnalités)- [Installation](#installation)

- [Utilisation](#utilisation)

</div>- [Structure du projet](#structure-du-projet)

- [Scripts disponibles](#scripts-disponibles)

---- [Contribuer](#contribuer)



## 📋 Table des matières## 🎯 Aperçu



- [À propos](#-à-propos)Enicar Staff Management est une application frontend qui permet de gérer efficacement le personnel et les tickets. L'application offre une interface utilisateur moderne et intuitive construite avec React et stylisée avec Tailwind CSS.

- [Aperçu](#-aperçu)

- [Fonctionnalités](#-fonctionnalités)## ✨ Fonctionnalités

- [Technologies](#-technologies)

- [Prérequis](#-prérequis)- 🔐 **Authentification** : Système de connexion sécurisé

- [Installation](#-installation)- 🏠 **Dashboard** : Page d'accueil avec vue d'ensemble

- [Configuration](#-configuration)- 🎫 **Gestion des tickets** : Création et gestion des tickets du personnel

- [Démarrage](#-démarrage)- 📊 **Visualisation des données** : Affichage et formatage des données

- [Structure du projet](#-structure-du-projet)- 🖨️ **Impression** : Fonctionnalité d'impression des cartes

- [Pages](#-pages)- 📱 **Responsive** : Interface adaptative pour tous les écrans

- 🎨 **Interface moderne** : Design épuré avec Tailwind CSS

---

## 🛠️ Technologies utilisées

## 🎯 À propos

### Frontend

**ENICarthage Staff Manager Frontend** est une application web React moderne développée avec Vite pour gérer les opérations administratives de l'École Nationale d'Ingénieurs de Carthage. L'interface offre une expérience utilisateur fluide et intuitive avec un design professionnel utilisant TailwindCSS et Material Icons.- **React 19** - Bibliothèque JavaScript pour construire l'interface utilisateur

- **React Router DOM 7** - Gestion de la navigation et du routing

### Points clés- **Vite 6** - Outil de build rapide et serveur de développement

- ✅ Interface utilisateur moderne et responsive

- ✅ Dashboard avec statistiques en temps réel (Chart.js)### UI & Styling

- ✅ Gestion complète des tickets avec upload de fichiers- **Tailwind CSS 3** - Framework CSS utilitaire

- ✅ Système d'authentification sécurisé (JWT)- **Heroicons** - Icônes React

- ✅ Gestion des utilisateurs et des rôles- **Font Awesome 6** - Bibliothèque d'icônes

- ✅ Réservations de salles interactives

- ✅ Design Material avec Google Fonts### State Management & Utilities

- **Zustand 5** - Gestion d'état légère et performante

---- **React Select 5** - Composant de sélection personnalisable

- **UUID 11** - Génération d'identifiants uniques

## ✨ Fonctionnalités

### Développement

### 🔐 Authentification & Sécurité- **ESLint 9** - Linter pour la qualité du code

- ✅ Connexion avec JWT- **PostCSS 8** - Transformation CSS

- ✅ Protection des routes par rôle- **Autoprefixer** - Ajout automatique des préfixes CSS

- ✅ Session persistante avec localStorage

- ✅ Déconnexion automatique sur expiration## 📦 Prérequis

- ✅ Error Boundary pour la gestion d'erreurs

Avant de commencer, assurez-vous d'avoir installé :

### 📊 Dashboard Dynamique

- ✅ **Chart.js** avec 3 types de graphiques :- **Node.js** (version 18 ou supérieure)

  - 🍩 **Doughnut Chart** - Distribution des tickets- **npm** (version 9 ou supérieure) ou **yarn**

  - 📊 **Bar Chart** - Statistiques mensuelles

  - 📈 **Line Chart** - Évolution hebdomadaire## 🚀 Installation

- ✅ Cartes de statistiques (Total tickets, En attente, Approuvés)

- ✅ Données en temps réel depuis l'API1. **Cloner le dépôt**

- ✅ Mise à jour automatique   ```bash

   git clone https://github.com/Fridhi-Rochdi/EnicarStaffManageFront.git

### 📄 Gestion des Tickets   cd EnicarStaffManageFront

- ✅ **Table professionnelle** avec tri et pagination   ```

- ✅ **Recherche** en temps réel

- ✅ **Filtrage** par statut2. **Installer les dépendances**

- ✅ **Upload** de fichiers multiples formats   ```bash

- ✅ **Modal de visualisation** avec détails complets   npm install

- ✅ **Téléchargement** et **visualisation** de documents   ```

- ✅ **Badge de statut** colorés   ou avec yarn :

- ✅ **Pagination** Next/Previous (10 items par page)   ```bash

   yarn install

### 👥 Gestion des Utilisateurs   ```

- ✅ Liste complète des utilisateurs

- ✅ Création de nouveaux comptes## 💻 Utilisation

- ✅ Modification des informations

- ✅ Gestion des rôles (ADMIN, STAFF, PROFESSOR)### Mode développement

- ✅ Activation/Désactivation de comptes

Lancez le serveur de développement avec hot-reload :

### 🏢 Réservations de Salles

- ✅ Calendrier des réservations```bash

- ✅ Formulaire de réservation interactifnpm run dev

- ✅ Validation par administrateur```

- ✅ Historique des réservations

L'application sera accessible sur `http://localhost:5173`

---

### Build de production

## 🛠 Technologies

Créez une version optimisée pour la production :

### Core

- **React 18.3.1** - Library UI```bash

- **Vite 5.4.10** - Build tool ultra-rapidenpm run build

- **React Router 6.27.0** - Navigation et routing```



### UI & StylingLes fichiers de production seront générés dans le dossier `dist/`

- **TailwindCSS 3.4.14** - Utility-first CSS

- **PostCSS** - Transformations CSS### Prévisualisation de la production

- **Autoprefixer** - Compatibilité navigateurs

Prévisualisez le build de production localement :

### State Management

- **Zustand 5.0.1** - State management léger```bash

- **Context API** - Gestion d'authentificationnpm run preview

```

### Charts & Visualisation

- **Chart.js 4.4.6** - Bibliothèque de graphiques### Linting

- **react-chartjs-2 5.2.0** - Wrapper React pour Chart.js

Vérifiez la qualité du code :

### Typography & Icons

- **Google Fonts** - Inter (300-900), Poppins (400-800)```bash

- **Material Icons** - Icônes Google Materialnpm run lint

- **Material Symbols** - Icônes outlined```



---## 📁 Structure du projet



## 📦 Prérequis```

EnicarStaffManageFront/

| Logiciel | Version | Téléchargement |├── public/              # Fichiers statiques

|----------|---------|----------------|├── src/

| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |│   ├── assets/         # Images, logos, etc.

| npm | 9+ | Inclus avec Node.js |│   ├── components/     # Composants réutilisables

| Git | Latest | [git-scm.com](https://git-scm.com/) |│   │   ├── dateformatter.jsx

│   │   └── printCard.jsx

### Backend requis│   ├── data/           # Données et configurations

L'application frontend nécessite le backend pour fonctionner :│   │   └── data.js

- [ENICarthage Backend](https://github.com/Fridhi-Rochdi/EnicarStaffManageBack) sur port 8081│   ├── layout/         # Composants de mise en page

│   │   ├── navbar.jsx

---│   │   ├── primaryLayout.jsx

│   │   └── sidebar.jsx

## 🚀 Installation│   ├── pages/          # Pages de l'application

│   │   ├── addTicketPage.jsx

### 1. Cloner le repository│   │   ├── landingPage.jsx

│   │   └── login.jsx

```bash│   ├── store/          # Gestion d'état (Zustand)

git clone https://github.com/Fridhi-Rochdi/EnicarStaffManageFront.git│   │   ├── asidestore.js

cd EnicarStaffManageFront│   │   ├── fakedatastore.js

```│   │   └── utils.js

│   ├── index.css       # Styles globaux

### 2. Installer les dépendances│   ├── main.jsx        # Point d'entrée de l'application

│   ├── routes.js       # Configuration des routes

```bash│   └── utils.js        # Fonctions utilitaires

npm install├── eslint.config.js    # Configuration ESLint

```├── index.html          # Template HTML

├── package.json        # Dépendances et scripts

### 3. Configuration├── postcss.config.js   # Configuration PostCSS

├── tailwind.config.js  # Configuration Tailwind CSS

Créez un fichier `.env` à la racine (optionnel) :└── vite.config.js      # Configuration Vite

```

```env

VITE_API_URL=http://localhost:8081## 📜 Scripts disponibles

VITE_APP_NAME=ENICarthage Staff Manager

```| Script | Description |

|--------|-------------|

---| `npm run dev` | Lance le serveur de développement |

| `npm run build` | Crée un build de production |

## ⚙️ Configuration| `npm run preview` | Prévisualise le build de production |

| `npm run lint` | Vérifie la qualité du code avec ESLint |

### API Backend

## 🤝 Contribuer

L'URL du backend est configurée dans les fichiers :

- `src/api/axios.js` - Configuration AxiosLes contributions sont les bienvenues ! Pour contribuer :

- `src/utils.js` - Utilitaires

1. Forkez le projet

**URL par défaut** : `http://localhost:8081`2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)

3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)

### Routes protégées4. Poussez vers la branche (`git push origin feature/AmazingFeature`)

5. Ouvrez une Pull Request

Les routes sont organisées en deux catégories dans `src/routes.js` :

## 👤 Auteur

**Routes publiques** :

- `/` - Landing page publique**Fridhi Rochdi**

- `/login` - Connexion

- GitHub: [@Fridhi-Rochdi](https://github.com/Fridhi-Rochdi)

**Routes protégées** (nécessitent authentification) :

- `/dashboard` - Dashboard principal## 📄 Licence

- `/landing` - Page tickets

- `/users` - Gestion utilisateurs (ADMIN)Ce projet est destiné à un usage privé pour Enicar.

- `/rooms` - Réservations de salles

- `/exams` - Périodes d'examens---

- `/profile` - Profil utilisateur

⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub !

---=======

# EnicarStaffManageFront

## 🎬 Démarrage>>>>>>> e0d934bf2bbca9ebb84b9e9a83044e38ad0fe713


### Mode Développement

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:5173**

### Build de Production

```bash
# Créer le build
npm run build

# Prévisualiser le build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📁 Structure du projet

```
EnicarStaffManageFront/
├── public/                      # Assets statiques
├── src/
│   ├── api/                     # Configuration API
│   │   └── axios.js            # Instance Axios configurée
│   ├── assets/                 # Images, logos
│   ├── components/             # Composants réutilisables
│   │   ├── ErrorBoundary.jsx  # Gestion d'erreurs
│   │   ├── ProtectedRoute.jsx # Protection de routes
│   │   ├── RoleProtectedRoute.jsx
│   │   ├── dateformatter.jsx  # Formatage de dates
│   │   └── printCard.jsx      # Cartes d'impression
│   ├── context/               # Context API
│   │   └── AuthContext.jsx   # Contexte d'authentification
│   ├── data/                  # Données statiques
│   │   └── data.js           # Données de démonstration
│   ├── layout/               # Layouts de l'app
│   │   ├── navbar.jsx       # Barre de navigation
│   │   ├── sidebar.jsx      # Menu latéral
│   │   ├── primaryLayout.jsx
│   │   └── RootLayout.jsx
│   ├── pages/               # Pages de l'application
│   │   ├── addTicketPage.jsx
│   │   ├── dashboardPage.jsx
│   │   ├── examPeriodsPage.jsx
│   │   ├── landingPage.jsx
│   │   ├── login.jsx
│   │   ├── profilePage.jsx
│   │   ├── publicLandingPage.jsx
│   │   ├── roomReservationsPage.jsx
│   │   └── usersManagementPage.jsx
│   ├── store/              # État global (Zustand)
│   │   ├── asidestore.js
│   │   ├── fakedatastore.js
│   │   └── utils.js
│   ├── index.css          # Styles globaux + TailwindCSS
│   ├── main.jsx           # Point d'entrée
│   ├── routes.js          # Configuration des routes
│   └── utils.js           # Fonctions utilitaires
├── index.html
├── package.json
├── postcss.config.js      # Configuration PostCSS
├── tailwind.config.js     # Configuration TailwindCSS
├── vite.config.js         # Configuration Vite
└── README.md
```

---

## 📄 Pages

### 🏠 Public Landing Page (`/`)
- Page d'accueil publique
- Présentation du système
- Boutons d'action (Se connecter)

### 🔐 Login (`/login`)
- Formulaire de connexion
- Validation JWT
- Redirection selon rôle

### 📊 Dashboard (`/dashboard`)
- **Statistiques** : Cartes avec totaux
- **Graphiques Chart.js** :
  - Doughnut : Distribution des tickets
  - Bar : Statistiques mensuelles
  - Line : Évolution hebdomadaire
- **Actions rapides** : Boutons contextuels
- **Données dynamiques** : API en temps réel

### 📄 Landing Page Tickets (`/landing`)
- **Table professionnelle** avec :
  - Tri par colonnes
  - Pagination (Next/Previous)
  - 10 items par page
- **Recherche** en temps réel
- **Filtrage** par statut
- **Actions** :
  - 👁️ Voir les détails (Modal)
  - ⬇️ Télécharger le document
  - 📄 Voir le document (nouvelle fenêtre)
  - ✏️ Modifier
  - 🗑️ Supprimer
- **Badge de statut** :
  - 🟡 PENDING (Jaune)
  - 🔵 IN_PROGRESS (Bleu)
  - 🟢 APPROVED (Vert)
  - 🔴 REJECTED (Rouge)
  - ✅ COMPLETED (Vert foncé)

### 👥 Users Management (`/users`)
- Liste des utilisateurs
- Création et modification
- Gestion des rôles

### 🏢 Room Reservations (`/rooms`)
- Calendrier des réservations
- Formulaire de réservation
- Validation par administrateur

### 📅 Exam Periods (`/exams`)
- Liste des périodes d'examens
- Création et modification

---

## 🔌 Intégration API

### Configuration Axios

```jsx
// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers seront générés dans `/dist`.

### Variables d'environnement

Configurez ces variables sur votre plateforme :

```
VITE_API_URL=https://api.votre-domaine.com
```

---

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche (`git checkout -b feature/AmazingFeature`)
3. **Commit** (`git commit -m 'Add AmazingFeature'`)
4. **Push** (`git push origin feature/AmazingFeature`)
5. **Pull Request**

---

## 📝 License

MIT License - Voir `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

**Rochdi Fridhi**
- GitHub: [@Fridhi-Rochdi](https://github.com/Fridhi-Rochdi)
- Email: rochdi.fridhi@enicarthage.tn

---

## 🙏 Remerciements

- ENI Carthage
- React Community
- TailwindCSS Team
- Chart.js Contributors

---

<div align="center">

**⭐ Star ce projet si vous l'aimez ! ⭐**

Made with ❤️ by ENI Carthage Students

</div>
