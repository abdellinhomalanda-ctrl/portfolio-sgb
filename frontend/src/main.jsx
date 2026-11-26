import { useEffect, useState } from 'react'
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

function Visuel({ projet }) {
  return (
    <div className="visuel" data-ton={projet.ton}>
      <img className="scene" src={projet.scene} alt={projet.descriptionScene} width="512" height="512" loading="lazy" />
      {projet.typeVisuel === 'logo' && (
        <img className="logo-projet" src={projet.visuel} alt={projet.illustration} loading="lazy" />
      )}
    </div>
  )
}

function Cartes({ projets }) {
  return <div className="grille">{projets.map((projet) => (
    <article className="carte" key={projet.slug} data-ton={projet.ton}>
      <Visuel projet={projet} />
      <div className="contenu-carte">
        <p className="tags">{projet.domaine}</p>
        <h3><Link to={`/projets/${projet.slug}`}>{projet.titre}</Link></h3>
        <p>{projet.resume}</p>
      </div>
    </article>
  ))}</div>
}

function Accueil() {
  return <>
    <Donnees chemin="/api/profil">{(profil) => (
      <section className="hero">
        <div>
          <p className="tags">Smart & Green Building</p>
          <h1>{profil.nom}</h1>
          <h2>{profil.titre}</h2>
          <p>{profil.accroche}</p>
          <div className="actions">
            <Link className="action" to="/projets">Explorer mes projets</Link>
            <Link className="action secondaire" to="/parcours">Voir mon parcours</Link>
          </div>
        </div>
        <div className="hero-monogramme" aria-hidden="true"><span>AM</span></div>
      </section>
    )}</Donnees>
    <Donnees chemin="/api/projets">{(projets) => <>
      <section className="selection">
        <h2>Projets techniques</h2>
        <Cartes projets={projets.filter(({ groupe }) => groupe === 'Technique')} />
      </section>
      <section className="selection">
        <h2>Projets entrepreneuriaux</h2>
        <Cartes projets={projets.filter(({ groupe }) => groupe === 'Entrepreneuriat')} />
      </section>
    </>}</Donnees>
  </>
}

function Catalogue({ projets }) {
  const [theme, setTheme] = useState('')
  const [groupe, setGroupe] = useState('')
  const [recherche, setRecherche] = useState('')
  const tags = [...new Set(projets.flatMap((projet) => projet.tags))].sort()
  const requete = recherche.trim().toLocaleLowerCase('fr')
  const visibles = projets.filter(({ titre, tags, resume, groupe: categorie }) =>
    (!groupe || groupe === categorie) &&
    (!theme || tags.includes(theme)) &&
    [titre, resume, ...tags].join(' ').toLocaleLowerCase('fr').includes(requete)
  )

  return <>
    <div className="filtres">
      <label>Catégorie <select value={groupe} onChange={(event) => setGroupe(event.target.value)}>
        <option value="">Toutes les catégories</option>
        <option>Technique</option>
        <option>Entrepreneuriat</option>
      </select></label>
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
        <p className="tags">{projet.domaine}</p>
        <h1>{projet.titre}</h1>
        <p>{projet.resume}</p>
        <figure className="scene-detail">
          <Visuel projet={projet} />
          <figcaption>Illustration 3D générée pour présenter le projet.</figcaption>
        </figure>
        <h2>Contexte</h2>
        <p>{projet.contexte}</p>
        <h2>Mon travail</h2>
        <ul>{projet.realisations.map((element) => <li key={element}>{element}</li>)}</ul>
        {projet.typeVisuel === 'schema' && <>
          <h2>Schéma technique</h2>
          <img className="schema-projet" src={projet.visuel} alt={projet.illustration} width="640" height="320" loading="lazy" />
        </>}
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
  const [theme, setTheme] = useState(() => {
    try {
      const memorise = localStorage.getItem('portfolio-theme')
      if (memorise === 'clair' || memorise === 'sombre') return memorise
    } catch {}
    return matchMedia('(prefers-color-scheme: light)').matches ? 'clair' : 'sombre'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-theme', theme) } catch {}
  }, [theme])

  return <>
    <header>
      <Link className="marque" to="/"><span aria-hidden="true">AM</span> Abdel Malanda</Link>
      <nav aria-label="Navigation principale">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/projets">Projets</NavLink>
        <NavLink to="/competences">Compétences</NavLink>
        <NavLink to="/parcours">Parcours</NavLink>
      </nav>
      <button className="theme" type="button" onClick={() => setTheme(theme === 'clair' ? 'sombre' : 'clair')}>Mode {theme === 'clair' ? 'sombre' : 'clair'}</button>
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
    <footer><span>Abdel Malanda · Portfolio</span><a href="https://github.com/abdellinhomalanda-ctrl">GitHub</a></footer>
  </>
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
