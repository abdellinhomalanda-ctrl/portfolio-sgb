# Portfolio SGB — Abdel Malanda

Portfolio de Master 2 Smart & Green Building. React et Vite pour l’interface, React Router pour la navigation et Express pour l’API JSON.

[Voir le portfolio en ligne](https://abdel-malanda-portfolio-sgb.yummyessay3.chatgpt.site)

## Démarrer dans VS Code

1. Cloner : `git clone https://github.com/abdellinhomalanda-ctrl/portfolio-sgb.git`
2. Ouvrir le dossier `portfolio-sgb` dans VS Code (ou `code portfolio-sgb` si la commande est disponible).
3. Dans le terminal intégré, avec Node.js 22.12+ : `npm ci`, puis `npm run dev`.
4. Ouvrir http://localhost:5173. L’API répond sur http://localhost:3000/api/projets.

La tâche VS Code « Démarrer le portfolio » lance aussi les deux serveurs après installation des dépendances.

## Structure

- `backend/data/` contient le profil, les projets, les compétences et le parcours.
- `backend/tests.http` contient des requêtes HTTP d’exemple.
- `frontend/src/` contient les pages, les composants et le hook de chargement.

`npm run build` compile le frontend dans `frontend/dist`.

## Travaux pratiques et oral

- Séances 1 et 2 : `node tp1/analyse.js` affiche le bulletin de promotion.
- Séance 5 : illustrations techniques, recherche, thème clair/sombre.
- Séance 6 : [trame de présentation](docs/ORAL.md).

## Déployer sur Vercel

Importer ce dépôt depuis le tableau de bord Vercel, garder la racine du dépôt et lancer le déploiement. Le fichier `vercel.json` définit la compilation de React et le routage. L’entrée `api/[...route].js` exporte l’application Express.
