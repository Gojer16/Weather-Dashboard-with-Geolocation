import React from 'react'
import { motion } from 'motion/react'

const Card = ({ weather, units = 'metric' }) => {
  if (!weather) return null

  const isImperial = units === 'imperial'
  const tempUnit = isImperial ? '°F' : '°C'
  const speedUnit = isImperial ? 'mph' : 'km/h'

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
      
      {/* Left side: Main weather info */}
      <motion.div
        className="md:col-span-2 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* City + description */}
        <div className="flex items-center gap-4">
          {weather.icon && (
            <motion.img
              alt={weather.description || 'weather icon'}
              src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
              className="w-28 h-28"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
          )}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-slate-600 capitalize text-lg mt-1">
              {weather.description}
            </p>
          </div>
        </div>

        {/* Temperature */}
        <motion.div 
          className="text-6xl md:text-7xl font-extrabold text-slate-900 mt-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {Math.round(weather.temp)}{tempUnit}
        </motion.div>
        
        <p className="text-slate-800 mt-2 text-md">
          Feels like {Math.round(weather.feelsLike)}{tempUnit}
        </p>
      </motion.div>

      {/* Right side: Weather details */}
      <motion.div
        className="md:col-span-3 grid grid-cols-2 sm:grid-cols-2 gap-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {[
          {
            label: 'Humidity',
            value: `${weather.humidity}%`,
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
            ),
            color: 'text-blue-400',
          },
          {
            label: 'Wind',
            value: `${Math.round(weather.wind)} ${speedUnit}`,
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            ),
            color: 'text-cyan-400',
          },
          {
            label: 'Pressure',
            value: `${weather.pressure} hPa`,
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707
                M6.343 6.343l-.707-.707m12.728 0l-.707.707
                M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            ),
            color: 'text-amber-400',
          },
          {
            label: 'Visibility',
            value: `${(weather.visibility / 1000).toFixed(1)} km`,
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 
                5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
            ),
            color: 'text-purple-400',
          },
        ].map(({ label, value, icon, color }, idx) => (
          <motion.div
            key={idx}
            className="bg-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center 
              hover:bg-white/30 hover:shadow-md transition-all duration-300 border border-white/10 cursor-pointer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${color} mb-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {icon}
            </svg>
            <span className="text-slate-600 text-sm">{label}</span>
            <span className="text-slate-900 font-bold text-lg mt-1">{value}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Card
