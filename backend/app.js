import express from 'express'
import { readFileSync } from 'node:fs'

const lire = (nom) => JSON.parse(readFileSync(new URL(`./data/${nom}.json`, import.meta.url), 'utf8'))
const profil = lire('profil')
const projets = lire('projets')
const competences = lire('competences')
const parcours = lire('parcours')

export const app = express()
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
