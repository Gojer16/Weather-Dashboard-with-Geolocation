import './App.css'
import { useEffect, useState } from "react";
import useGeolocation from "./hooks/useGeolocation";
import useWeather from "./hooks/useWeather";
import useForecast from './hooks/useForecast';
import useRecentCities from './hooks/useRecentCities';
import Dashboard from './components/Dashboard';


function App() {
  const [enabled, setEnabled] = useState(false);
  const [units, setUnits] = useState('metric');
  const [queryCity, setQueryCity] = useState('');

  const { location, error: geoError, loading: geoLoading } = useGeolocation(enabled);
  const { weather, loading: weatherLoading, apiError, lastUpdated, refresh } = useWeather({
    coords: enabled && !queryCity ? location : null,
    city: queryCity || null,
    units,
    enabled: enabled || !!queryCity,
  });

  const { days: forecastDays, loading: forecastLoading, error: forecastError } = useForecast({
    coords: enabled && !queryCity ? location : null,
    city: queryCity || null,
    units,
    enabled: enabled || !!queryCity,
  });

  const { cities: recentCities, addCity, removeCity, clear } = useRecentCities(6);

  const isLoading = (enabled || !!queryCity) && (geoLoading || weatherLoading || forecastLoading);
  const showLoading = isLoading && !weather;

  // Initial splash loader on mount for subtle UX
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (city) => {
    setQueryCity(city);
    if (city) addCity(city);
  };

  return (
    <Dashboard
      enabled={enabled}
      onEnableLocation={() => setEnabled(true)}
      units={units}
      onUnitsChange={setUnits}
      queryCity={queryCity}
      onSearch={handleSearch}
      showLoading={showSplash || showLoading}
      errorMessage={geoError || apiError || forecastError}
      weather={weather}
      lastUpdated={lastUpdated}
      onRefresh={refresh}
      forecastDays={forecastDays}
      recentCities={recentCities}
      onSelectRecent={(c) => setQueryCity(c)}
      onRemoveRecent={removeCity}
      onClearRecents={clear}
    />
  )
}

export default App
