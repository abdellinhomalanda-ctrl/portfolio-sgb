import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from 'react-router'
import useApi from './useApi'
import './style.css'

function Donnees({ chemin, children }) {
  const { chargement, erreur, data } = useApi(chemin)
  if (chargement) return <p role="status">Chargement…</p>
  if (erreur) return <p role="alert">Impossible de charger les données. {erreur}</p>
  return children(data)
}

function Cartes({ projets }) {
  return <div className="grille">{projets.map((projet) => (
    <article className="carte" key={projet.slug}>
      <p className="tags">{projet.tags.join(' · ')}</p>
      <h2><Link to={`/projets/${projet.slug}`}>{projet.titre}</Link></h2>
      <p>{projet.resume}</p>
    </article>
  ))}</div>
}

function Accueil() {
  return <>
    <Donnees chemin="/api/profil">{(profil) => (
      <section className="hero">
        <p className="tags">{profil.nom}</p>
        <h1>{profil.titre}</h1>
        <p>{profil.accroche}</p>
        <Link className="action" to="/projets">Voir mes projets</Link>
      </section>
    )}</Donnees>
    <section>
      <h2>Projets sélectionnés</h2>
      <Donnees chemin="/api/projets">{(projets) => <Cartes projets={projets.slice(0, 3)} />}</Donnees>
    </section>
  </>
}

function Catalogue({ projets }) {
  const [theme, setTheme] = useState('')
  const [recherche, setRecherche] = useState('')
  const tags = [...new Set(projets.flatMap((projet) => projet.tags))].sort()
  const requete = recherche.trim().toLocaleLowerCase('fr')
  const visibles = projets.filter(({ titre, tags, resume }) =>
    (!theme || tags.includes(theme)) &&
    [titre, resume, ...tags].join(' ').toLocaleLowerCase('fr').includes(requete)
  )

  return <>
    <div className="filtres">
      <label>Thème <select value={theme} onChange={(event) => setTheme(event.target.value)}>
        <option value="">Tous les thèmes</option>
        {tags.map((tag) => <option key={tag}>{tag}</option>)}
      </select></label>
      <label>Recherche <input type="search" value={recherche} onChange={(event) => setRecherche(event.target.value)} /></label>
    </div>
    <p role="status">{visibles.length} projet(s)</p>
    <Cartes projets={visibles} />
  </>
}

function Detail() {
  const { slug } = useParams()
  return <>
    <Link to="/projets">← Retour aux projets</Link>
    <Donnees chemin={`/api/projets/${encodeURIComponent(slug)}`}>{(projet) => (
      <article className="detail">
        <p className="tags">{projet.tags.join(' · ')}</p>
        <h1>{projet.titre}</h1>
        <p>{projet.resume}</p>
        <h2>Contexte</h2>
        <p>{projet.contexte}</p>
        <h2>Mon travail</h2>
        <ul>{projet.realisations.map((element) => <li key={element}>{element}</li>)}</ul>
      </article>
    )}</Donnees>
  </>
}

function Competences() {
  return <>
    <h1>Compétences</h1>
    <Donnees chemin="/api/competences">{(groupes) => (
      <div className="grille">{groupes.map(({ titre, elements }) => (
        <section className="carte" key={titre}>
          <h2>{titre}</h2>
          <ul>{elements.map((element) => <li key={element}>{element}</li>)}</ul>
        </section>
      ))}</div>
    )}</Donnees>
  </>
}

function Parcours() {
  return <>
    <h1>Parcours</h1>
    <Donnees chemin="/api/parcours">{(etapes) => (
      <ol className="frise">{etapes.map(({ titre, detail }) => (
        <li key={titre}><h2>{titre}</h2><p>{detail}</p></li>
      ))}</ol>
    )}</Donnees>
  </>
}

function App() {
  return <>
    <header>
      <Link className="marque" to="/">Abdel Malanda</Link>
      <nav aria-label="Navigation principale">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/projets">Projets</NavLink>
        <NavLink to="/competences">Compétences</NavLink>
        <NavLink to="/parcours">Parcours</NavLink>
      </nav>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/projets" element={<><h1>Projets</h1><Donnees chemin="/api/projets">{(projets) => <Catalogue projets={projets} />}</Donnees></>} />
        <Route path="/projets/:slug" element={<Detail />} />
        <Route path="/competences" element={<Competences />} />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="*" element={<><h1>Page introuvable</h1><Link to="/">Retour à l’accueil</Link></>} />
      </Routes>
    </main>
    <footer>Abdel Malanda · Portfolio SGB</footer>
  </>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
