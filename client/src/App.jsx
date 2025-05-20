import './App.css'
import { useState, useEffect } from "react";
import  useGeolocation  from "./hooks/useGeolocation";
import  useWeather  from "./hooks/useWeather";
import { GrMapLocation } from "react-icons/gr";

function App() {
  const [enabled, setEnabled] = useState(false); 
  const { location, error: geoError, loading: geoLoading } = useGeolocation(enabled);
  const { weather, loading: weatherLoading, apiError } = useWeather(enabled ? location:null);

  const [theme, setTheme] = useState(() => {
    // Check localStorage for theme preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isLoading = enabled && (geoLoading || weatherLoading)
  if (isLoading) return <p className='flex justify-center py-[30%] gap-4'><span className="loading loading-spinner text-primary"></span>Waiting...</p>
  if (geoError || apiError) return <p>Error: {geoError || apiError}</p>;

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-6 right-8 z-20 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 shadow-md font-semibold hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
      {/* Animated Clouds */}
      <div className="absolute -top-10 -left-32 z-0 animate-cloud-move-1 pointer-events-none">
        <svg width="220" height="100" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 blur-sm">
          <ellipse cx="60" cy="60" rx="60" ry="40" fill="#fff"/>
          <ellipse cx="120" cy="40" rx="50" ry="30" fill="#fff"/>
          <ellipse cx="180" cy="70" rx="40" ry="25" fill="#fff"/>
        </svg>
      </div>
      <div className="absolute top-20 right-0 z-0 animate-cloud-move-2 pointer-events-none">
        <svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 blur-md">
          <ellipse cx="50" cy="50" rx="50" ry="25" fill="#fff"/>
          <ellipse cx="120" cy="30" rx="40" ry="20" fill="#fff"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 animate-cloud-move-3 pointer-events-none">
        <svg width="260" height="90" viewBox="0 0 260 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 blur-lg">
          <ellipse cx="80" cy="60" rx="70" ry="30" fill="#fff"/>
          <ellipse cx="180" cy="40" rx="60" ry="25" fill="#fff"/>
        </svg>
      </div>
      {/* Main Card */}
      <div className="w-full max-w-xl px-8 py-10 mt-10 bg-white/20 dark:bg-gray-900/40 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col items-center border border-white/30 dark:border-gray-700/60 relative z-10 transition-colors duration-500">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white dark:text-gray-100 drop-shadow-lg mb-4 tracking-tight animate-fade-in">Get the Current Weather Wherever You Are</h1>
        <h2 className="text-lg md:text-xl text-white/80 dark:text-gray-300 font-medium mb-8 animate-fade-in delay-100">Fast. Simple. Accurate.</h2>
        {!enabled && (
          <button 
            onClick={() => setEnabled(true)}
            className="flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-lg animate-bounce-in">
            <GrMapLocation className="text-2xl" /> Get My Weather
          </button>
        )}
        {isLoading && <p className="mt-8 text-white/90 text-lg flex items-center gap-3"><span className="loading loading-spinner text-white"></span>Waiting...</p>}
        {(geoError || apiError) && <p className="mt-8 text-red-200 bg-red-500/30 px-4 py-2 rounded-lg font-semibold">Error: {geoError || apiError}</p>}
        {weather && (
          <div className="mt-10 w-full flex justify-center animate-fade-in-up">
            <div className="w-full max-w-md bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl px-10 py-8 border border-white/40 dark:border-gray-700/60 transition-colors duration-500">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 flex flex-col items-center">
                <span className="text-lg text-gray-500 dark:text-gray-300 font-medium mb-1">Weather in</span>
                {weather.city}, {weather.country}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-100 text-lg font-medium">
                <div>Temperature:</div><div>{weather.temp}°C</div>
                <div>Feels Like:</div><div>{weather.feelsLike}°C</div>
                <div>Humidity:</div><div>{weather.humidity}%</div>
                <div>Wind:</div><div>{weather.wind} km/h</div>
                <div>Description:</div><div className="capitalize">{weather.description}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
