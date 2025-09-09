import React from 'react'
import { motion, AnimatePresence } from 'motion/react'

const Forecast = ({ days, units = 'metric' }) => {
  if (!days?.length) return null
  const tempUnit = units === 'imperial' ? '°F' : '°C'

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      <AnimatePresence>
        {days.map((d, index) => {
          const label =
            index === 0
              ? 'Today'
              : new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })

          return (
            <motion.div
              key={d.date}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Forecast for ${label}: ${d.description}, high ${d.max}${tempUnit}, low ${d.min}${tempUnit}`}
            >
              {/* Day label */}
              <div className="font-semibold text-slate-800 mb-3 text-lg">
                {label}
              </div>

              {/* Weather icon */}
              {d.icon && (
                <motion.img
                  alt={d.description}
                  src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
                  className="mx-auto w-14 h-14"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                />
              )}

              {/* Description */}
              <div className="text-slate-600 capitalize text-sm mt-2 mb-3">
                {d.description}
              </div>

              {/* Temps */}
              <div className="text-slate-800 font-semibold flex justify-center items-baseline gap-1">
                <span className="text-2xl">{Math.round(d.max)}</span>
                <span className="text-slate-500 text-sm">
                  / {Math.round(d.min)}{tempUnit}
                </span>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default Forecast
