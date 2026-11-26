# Oral — Portfolio Smart & Green Building

## Déroulé proposé · environ 3 minutes

1. **Introduction (25 s).** « Je suis Abdel Malanda, en Master Smart & Green Building et technicien courant faible en alternance. Ce portfolio présente trois projets qui relient sûreté électronique, IoT et automatisation. »
2. **Projet principal (40 s).** Ouvrir la fiche de l’entrepôt. « Mon rapport présente une étude de vidéoprotection d’un entrepôt de 10 000 m². J’y documente le choix de caméras 4K avec infrarouge et les liaisons IP et 4G pour la télésurveillance. »
3. **Démonstration (45 s).** Ouvrir Projets, filtrer sur IoT, ouvrir Smart Mailbox, revenir à l’accueil, puis montrer le changement de thème.
4. **Architecture (45 s).** « React affiche les pages et React Router relie les écrans. En local, Vite relaie les requêtes vers Express. Le frontend récupère du JSON avec fetch et gère le chargement et les erreurs. Une fiche utilise l’identifiant dans l’URL. »
5. **Conclusion (25 s).** Montrer le dépôt GitHub et le lien public. « J’ai utilisé Git pour suivre les étapes du projet. J’ai privilégié des schémas vectoriels légers et rendu les pages utilisables sur mobile. »

## Questions probables

- **Que fait `/api/projets?tag=IoT` ?** L’API retourne les projets dont la liste de thèmes contient IoT. Dans la page Projets, les filtres s’appliquent directement à la liste déjà chargée.
- **Et si la fiche n’existe pas ?** L’API renvoie un HTTP 404 et l’interface affiche un message d’erreur.
- **À quoi sert une pull request ?** À relire les changements d’une branche avant leur intégration dans main.
- **Où est hébergé le backend ?** L’API locale tourne sur Express. Le lien public actuel utilise un Worker avec les mêmes données. La configuration Vercel prévoit une fonction Express si le dépôt y est importé.
