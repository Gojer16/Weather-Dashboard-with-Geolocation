import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import parseWeatherData from "../utils/parseWeatherData";

export function useWeather({ coords, city, units = "metric", enabled = true }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortRef = useRef(null);

  const buildUrl = () => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    if (!API_KEY) return null;
    if (city && city.trim().length > 0) {
      return `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=${units}`;
    }
    if (coords?.lat != null && coords?.lng != null) {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=${units}`;
    }
    return null;
  };

  const fetchWeather = useCallback(async () => {
    if (!enabled) return;
    const url = buildUrl();
    if (!url) return;

    try {
      setApiError(null);
      setLoading(true);
      abortRef.current?.abort?.();
      abortRef.current = new AbortController();
      const { data } = await axios.get(url, { signal: abortRef.current.signal });
      const parsed = parseWeatherData(data, units);
      setWeather(parsed);
      setLastUpdated(Date.now());
    } catch (error) {
      if (axios.isCancel?.(error) || error.name === "CanceledError") return;
      if (error?.response?.status === 404) {
        setWeather(null);
        setApiError('City not found. Try another search.');
      } else if (error?.response?.status === 401) {
        setApiError('Invalid API key. Check VITE_WEATHER_API_KEY.');
      } else {
        setApiError(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [coords?.lat, coords?.lng, city, units, enabled]);

  useEffect(() => {
    fetchWeather();
    return () => abortRef.current?.abort?.();
  }, [fetchWeather]);

  return { weather, loading, apiError, lastUpdated, refresh: fetchWeather };
}

export default useWeather;
