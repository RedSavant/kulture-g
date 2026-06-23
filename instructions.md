# Instructions pour les agents IA

Ce dépôt contient une application Angular 22 avec SSR, un backend Express local et des données de démonstration stockées dans le projet. Avant de modifier quoi que ce soit, repérer la zone concernée et rester au plus près du comportement existant.

## Vue d’ensemble

- Frontend principal dans `src/`.
- Backend API local dans `backend/`.
- Données utilisateur persistées dans `backend-data/`.
- Fichiers de photo de profil générés côté serveur dans `pfp-data/`.
- Ressources statiques publiques dans `public/`.

## Structure du frontend

- `src/main.ts` bootstrappe l’application côté navigateur.
- `src/main.server.ts` et `src/server.ts` gèrent le rendu serveur.
- `src/app/app.ts` est le composant racine de l’application.
- `src/app/app.routes.ts` définit les routes principales.
- `src/app/app.config.ts` configure le routeur, `HttpClient` et l’hydratation client.
- `src/app/route/welcome/` contient l’écran d’accueil et la création d’utilisateur.
- `src/app/route/app/` contient l’espace applicatif principal après connexion.
- `src/app/route/presentation/` contient l’écran de présentation.
- `src/app/route/app/tabs/` contient les onglets métier: apprentissage, révision et profil.
- `src/app/services/` contient la logique partagée, notamment `user.service.ts` et `theme.service.ts`.

## Flux applicatif

- La route `/` affiche `Welcome`.
- La route `/app` affiche l’espace principal, mais redirige vers `/` si aucun utilisateur n’est connecté.
- La route `/presentation` affiche l’écran de présentation.
- `UserService` gère le token local, le chargement du profil, les points d’expérience, la progression des leçons, la mise à jour du pseudo et la photo de profil.
- Le backend expose les endpoints sous `/api/users` et stocke un fichier JSON par utilisateur.

## Backend local

- `backend/api-server.mjs` est un serveur Express indépendant.
- Il crée, lit, met à jour et supprime des utilisateurs.
- Il gère aussi l’envoi de photo de profil via `multer`.
- Le serveur écoute sur le port `4000` par défaut, ou sur `API_PORT` si la variable est définie.

## Données et assets

- `backend-data/*.json` contient les comptes utilisateurs générés localement.
- `pfp-data/` contient les fichiers image uploadés pour les avatars.
- `public/user/pfp/` contient des avatars publics de référence.
- Ne pas supprimer ces dossiers sans vérifier l’impact sur les tests ou les parcours applicatifs.

## Conventions de travail

- Préférer les composants Angular standalone déjà utilisés dans le projet.
- Garder les modifications minimales et proches de la zone à corriger.
- Conserver les libellés français déjà présents dans l’interface.
- Vérifier les redirections et l’état utilisateur après toute modification liée à l’authentification ou au profil.
- Éviter de réorganiser l’arborescence sans nécessité claire.

## Commandes utiles

- `npm start` ou `ng serve` pour lancer le frontend.
- `npm run api` pour lancer le backend Express.
- `npm test` pour les tests.
- `npm run build` pour compiler l’application.

## Ce qu’il faut regarder en premier

- Si le problème concerne l’accueil ou la création de compte, commencer par `src/app/route/welcome/` et `src/app/services/user.service.ts`.
- Si le problème concerne les onglets, commencer par `src/app/route/app/` et ses sous-dossiers.
- Si le problème concerne les profils ou l’API locale, commencer par `backend/api-server.mjs`.
- Si le problème concerne le bootstrap ou les routes globales, commencer par `src/main.ts`, `src/app/app.config.ts` et `src/app/app.routes.ts`.
