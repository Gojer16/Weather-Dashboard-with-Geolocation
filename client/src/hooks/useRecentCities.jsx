import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'recent_cities_v1'

const useRecentCities = (limit = 5) => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCities(JSON.parse(raw))
    } catch {}
  }, [])

  const save = useCallback((list) => {
    setCities(list)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch {}
  }, [])

  const addCity = useCallback((name) => {
    if (!name) return
    const trimmed = name.trim()
    if (!trimmed) return
    const next = [trimmed, ...cities.filter(c => c.toLowerCase() !== trimmed.toLowerCase())].slice(0, limit)
    save(next)
  }, [cities, limit, save])

  const removeCity = useCallback((name) => {
    save(cities.filter(c => c.toLowerCase() !== name.toLowerCase()))
  }, [cities, save])

  const clear = useCallback(() => save([]), [save])

  return { cities, addCity, removeCity, clear }
}

export default useRecentCities


