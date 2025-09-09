import { useEffect, useState } from 'react'
import axios from 'axios'

const groupByDay = (list) => {
  const map = new Map()
  list.forEach(item => {
    const date = new Date(item.dt * 1000)
    const key = date.toISOString().slice(0,10)
    const arr = map.get(key) || []
    arr.push(item)
    map.set(key, arr)
  })
  return Array.from(map.entries()).map(([date, items]) => ({ date, items }))
}

const summarizeDay = (day, units) => {
  const temps = day.items.map(x => x.main.temp)
  const min = Math.round(Math.min(...temps))
  const max = Math.round(Math.max(...temps))
  const sample = day.items[Math.floor(day.items.length/2)] || day.items[0]
  const icon = sample.weather?.[0]?.icon
  const description = sample.weather?.[0]?.description
  return { date: day.date, min, max, icon, description, units }
}

const useForecast = ({ coords, city, units = 'metric', enabled = true }) => {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled) return
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    if (!API_KEY) return

    const url = city
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
      : (coords?.lat != null && coords?.lng != null)
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=${units}`
        : null
    if (!url) return

    const fetcher = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get(url)
        const grouped = groupByDay(data.list)
        const summaries = grouped.slice(0,5).map(day => summarizeDay(day, units))
        setDays(summaries)
      } catch (e) {
        if (e?.response?.status === 404) {
          setDays([])
          setError('City not found. Try another search.')
        } else if (e?.response?.status === 401) {
          setError('Invalid API key. Check VITE_WEATHER_API_KEY.')
        } else {
          setError(e.response?.data?.message || e.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetcher()
  }, [coords?.lat, coords?.lng, city, units, enabled])

  return { days, loading, error }
}

export default useForecast