import './App.css'
import { useState, useEffect } from "react";
import  useGeolocation  from "./hooks/useGeolocation";
import  useWeather  from "./hooks/useWeather";
import { GrMapLocation } from "react-icons/gr";
import { motion } from "motion/react"

function App() {
  const [enabled, setEnabled] = useState(false); 
  const { location, error: geoError, loading: geoLoading } = useGeolocation(enabled);
  const { weather, loading: weatherLoading, apiError } = useWeather(enabled ? location:null);

  const isLoading = enabled && (geoLoading || weatherLoading)
  if (isLoading) return <p className='flex justify-center py-[30%] gap-4'><span className="loading loading-spinner text-primary"></span>Waiting...</p>
  if (geoError || apiError) return <p>Error: {geoError || apiError}</p>;

  return (
    <>
    <div className=''>
      <motion.div />
        <h1 className='text-[2.5rem] text-white font-bold '>Get the Current Weather Wherever You Are.</h1>
        <p className='text-[1.5rem] text-white font-semibold'>Fast. Simple. Accurate.</p>
        <motion.div />
        {!enabled && (
        <button 
        onClick={() => setEnabled(true)}
        className="btn bg-gradient-to-r from-purple-600 to-indigo-600 active:scale-95 hover:scale-110 transition-transform duration-300  border-none shadow-md  text-white rounded gap-2 items-center ">  <GrMapLocation /> Get My Weather</button>
        )} 
    </div>

      {isLoading && <p>Loading...</p>}
      {geoError && <p>Error: {geoError}</p>}
      {apiError && <p>Error: {apiError}</p>}


      <div className=' flex justify-center text-center'>  
      {weather && (
        <div className="px-8 py-4">
          <h2>Weather in {weather.city}, {weather.country}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Feels Like: {weather.feelsLike}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} km/h</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
      </div>
    </>
  )
}

export default App
