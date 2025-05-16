import './App.css'
import { useState, useEffect } from "react";
import  useGeolocation  from "./hooks/useGeolocation";
import  useWeather  from "./hooks/useWeather";
import { GrMapLocation } from "react-icons/gr";




function App() {
  const [enabled, setEnabled] = useState(false); 
  const { location, error: geoError, loading: geoLoading } = useGeolocation(enabled);
  const { weather, loading: weatherLoading, apiError } = useWeather(enabled ? location:null);

  const isLoading = enabled && (geoLoading || weatherLoading)
  if (isLoading) return <p>Loading...</p>
  if (geoError || apiError) return <p>Error: {geoError || apiError}</p>;

  return (
    <>
      <h1 className='text-2xl text-red-500 font-bold '>Get the Current Weather Wherever You Are</h1>
      <h2 className='text-xl text-gray-500 font-semibold '>Fast. Simple. Accurate.</h2>

      {!enabled && (
        <button
          onClick={() => setEnabled(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow flex gap-2 items-center "
        >
        <GrMapLocation /> Get My Weather
        </button>
      )}

      {isLoading && <p>Loading...</p>}
      {geoError && <p>Error: {geoError}</p>}
      {apiError && <p>Error: {apiError}</p>}

      {weather && (
        <div className="px-8 py-4">
          <h2>Weather in {weather.city}, {weather.country}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Feels Like: {weather.feelsLike}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} km/h</p>
          <p>Description: {weather.description}</p>
          <p>Icon: {weather.icon}</p>
        </div>
      )}
    </>
  )
}

export default App
