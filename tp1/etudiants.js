const matieres = ['Web', 'BDD', 'Projet', 'Anglais']

// Jeu de données de démonstration. Les séries reproduisent les moyennes du corrigé.
export const etudiants = [
  ['Étudiant', 'A', 'M2 SGB', [15, 14, 16, 13]],
  ['Étudiant', 'B', 'M2 SGB', [11, 10, 12, 9]],
  ['Étudiant', 'C', 'M1 SGB', [17, 16, 18, 15]],
  ['Étudiant', 'D', 'M1 SGB', [9, 8, 10, 8]],
  ['Étudiant', 'E', 'M2 IA', [13, 12, 14, 11]],
  ['Étudiant', 'F', 'M2 IA', [8, 9, 10, 6]],
].map(([prenom, nom, formation, valeurs], index) => ({
  id: `E00${index + 1}`,
  prenom,
  nom,
  formation,
  notes: valeurs.map((valeur, i) => ({ matiere: matieres[i], valeur })),
}))
