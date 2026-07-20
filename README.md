# Plisk 3D

## Objectif du projet

Plisk 3D est une application e-commerce full-stack sur le thème de l'impression 3D. L'objectif pédagogique est de démontrer la maîtrise des mécanismes fondamentaux d'une application web moderne : authentification sécurisée, opérations CRUD, logique métier — il ne s'agit pas d'un produit destiné à la production, mais d'un livrable de formation.

## Stack technique

- **Frontend** : Vue.js 3 (Composition API, `<script setup>`), Vue Router, Pinia, Axios
- **Backend** : Node.js, Express.js, JWT (`jsonwebtoken`), `bcrypt`, `cookie-parser`, `cors`, `dotenv`, `mysql2`
- **Documentation API** : Swagger (`swagger-jsdoc` + `swagger-ui-express`), exposée sur `/api-docs`
- **Base de données** : MySQL (via phpMyAdmin / WAMP)
- **Outils de développement** : VS Code, Vite, ESLint

## Architecture

Le projet est séparé en deux parties indépendantes :

```
/back     → API Express.js + connexion MySQL
/front    → Application Vue.js (Vite)
```

Chaque partie tourne dans son propre terminal et communique via des requêtes HTTP (Axios / fetch côté front).

## Installation et lancement

### Backend

```bash
cd back
npm install
```

Créer un fichier `.env` à la racine de `back` avec les variables suivantes :

```
PORT=3000
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=...
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
FRONT_URL=http://localhost:5173
```

```bash
npm run dev
```

L'API est servie sur `http://localhost:3000` et sa documentation Swagger sur `http://localhost:3000/api-docs`.

### Frontend

```bash
cd front
npm install
```

Créer un fichier `.env` à la racine de `front` avec la variable `VITE_API_URL` pointant vers l'URL du backend (ex : `http://localhost:3000`).

```bash
npm run dev
```

## Fonctionnalités

- [x] Catalogue produits : liste des produits récupérée depuis l'API
- [x] Authentification : architecture à double token (access token JWT courte durée + refresh token en base de données)
- [x] Création de compte (inscription) reliée à l'API
- [x] Formulaire de connexion (Vue.js) relié à l'API
- [x] Gestion des erreurs (identifiants invalides vs erreur réseau)
- [x] Redirection automatique après connexion réussie
- [x] Documentation de l'API via Swagger
- [x] Refresh token stocké en cookie `httpOnly` (arbitrage tranché, ne transite plus dans le corps JSON)
- [x] Store Pinia (`front/src/stores/auth.js`) pour centraliser l'état d'authentification (`login`, `refresh`, `isLoggedIn`)
- [x] Persistance de la connexion au rechargement de page (appel de `auth.refresh()` au montage de `App.vue`)
- [x] Déconnexion (`POST /api/auth/logout`) : révoque le refresh token en base et vide le cookie `httpOnly`
- [x] Client Axios centralisé (`front/src/services/api.js`) : ajoute automatiquement le token en en-tête et gère le rafraîchissement + rejeu de la requête sur un 401
- [x] Routes protégées côté front (guard `router.beforeEach` sur `meta.requiresAuth`, ex : `/basket`)
- [ ] Page de détail produit au clic
- [ ] Middleware d'authentification backend (`back/src/middlewares/authMiddleware.js`) : créé mais pas encore branché sur les routes
- [ ] CRUD administrateur pour les produits
- [ ] Panier (page actuellement un simple placeholder, à construire avec Pinia + persistance)
- [ ] Récapitulatif de commande
- [ ] Paiement en mode test (Stripe)
- [ ] Gestion des rôles utilisateurs
- [ ] Déploiement

## Base de données

Tables présentes dans `back/src/bdd/bdd.sql` :
- `users` : informations utilisateurs et identifiants
- `refresh_token` : stockage des tokens de rafraîchissement associés aux utilisateurs

> ⚠️ La table `products`, utilisée par l'API (`GET /api/products`), n'est pas encore présente dans `bdd.sql` et doit être créée manuellement.

## Auteur

Yann Popov