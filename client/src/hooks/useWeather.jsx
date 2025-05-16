import { useState, useEffect } from "react";
import axios from "axios";
import  parseWeatherData  from "../utils/parseWeatherData";

export function useWeather(location) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${API_KEY}&units=metric`;

        const { data } = await axios.get(url); 

        const parsed = parseWeatherData(data);
        setWeather(parsed); 

      } 
      catch (error) {
        setApiError(error.response?.data?.message || error.message);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weather, loading, apiError };
}

export default useWeather;
