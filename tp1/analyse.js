import { etudiants } from './etudiants.js'

const moyenneDe = (...valeurs) => valeurs.reduce((somme, note) => somme + note, 0) / valeurs.length
const moyenne = (notes) => moyenneDe(...notes.map(({ valeur }) => valeur))
const mention = (note) => {
  if (note >= 16) return 'Très bien'
  if (note >= 14) return 'Bien'
  if (note >= 12) return 'Assez bien'
  if (note >= 10) return 'Passable'
  return 'Ajourné'
}

const resultats = etudiants.map((etudiant) => {
  const note = moyenne(etudiant.notes)
  return { ...etudiant, moyenne: note, mention: mention(note) }
})

for (const { prenom, nom, moyenne: note, mention: resultat } of resultats) {
  console.log(`${prenom} ${nom.toUpperCase()} : ${note}/20 (${resultat})`)
}

const admis = resultats.filter(({ moyenne: note }) => note >= 10)
const major = resultats.reduce((meilleur, etudiant) => etudiant.moyenne > meilleur.moyenne ? etudiant : meilleur)
const effectifs = resultats.reduce((groupes, { formation }) => {
  groupes[formation] = (groupes[formation] ?? 0) + 1
  return groupes
}, {})

console.log(`Moyenne de la promotion : ${moyenneDe(...resultats.map(({ moyenne: note }) => note)).toFixed(2)}/20`)
console.log(`Admis : ${admis.length}/${resultats.length}`)
console.log(`Major : ${major.prenom} ${major.nom} (${major.moyenne}/20)`)
console.log('Effectifs par formation :', effectifs)
