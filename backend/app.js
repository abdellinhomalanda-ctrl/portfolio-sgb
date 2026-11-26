import express from 'express'
import profil from './data/profil.json' with { type: 'json' }
import projets from './data/projets.json' with { type: 'json' }
import competences from './data/competences.json' with { type: 'json' }
import parcours from './data/parcours.json' with { type: 'json' }

export const app = express()
const originesAutorisees = (process.env.FRONTEND_URL ?? '')
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))

app.use('/api', (req, res, next) => {
  res.vary('Origin')
  const origine = req.get('Origin')
  if (origine && originesAutorisees.includes(origine)) {
    res.set('Access-Control-Allow-Origin', origine)
  }
  next()
})

app.get('/', (req, res) => res.json({ message: 'API Portfolio SGB opérationnelle' }))
app.get('/api/profil', (req, res) => res.json(profil))
app.get('/api/projets', (req, res) => {
  const { tag } = req.query
  if (tag !== undefined && typeof tag !== 'string') {
    return res.status(400).json({ erreur: 'Indique un seul thème.' })
  }
  res.json(tag ? projets.filter((projet) => projet.tags.includes(tag)) : projets)
})
app.get('/api/projets/:slug', (req, res) => {
  const projet = projets.find(({ slug }) => slug === req.params.slug)
  if (!projet) return res.status(404).json({ erreur: 'Projet introuvable.' })
  res.json(projet)
})
app.get('/api/competences', (req, res) => res.json(competences))
app.get('/api/parcours', (req, res) => res.json(parcours))
app.use((req, res) => res.status(404).json({ erreur: 'Route inconnue.' }))
