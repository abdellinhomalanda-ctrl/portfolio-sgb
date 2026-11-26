import { useEffect, useState } from 'react'

const apiUrl = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '')

export default function useApi(chemin) {
  const [resultat, setResultat] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    async function charger() {
      try {
        const reponse = await fetch(apiUrl + chemin, { signal: controller.signal })
        const data = await reponse.json()
        if (!reponse.ok) throw new Error(data.erreur ?? `Erreur HTTP ${reponse.status}`)
        if (!controller.signal.aborted) setResultat({ chemin, data })
      } catch (erreur) {
        if (!controller.signal.aborted) setResultat({ chemin, erreur: erreur.message })
      }
    }
    charger()
    return () => controller.abort()
  }, [chemin])

  return resultat?.chemin === chemin ? resultat : { chargement: true }
}
