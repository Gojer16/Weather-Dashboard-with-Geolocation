'use client'
import React from 'react'
import { motion } from 'framer-motion'
import UnitToggle from './UnitToggle'
import SearchBar from './SearchBar'
import Loader from './Loader'
import ErrorBanner from './ErrorBanner'
import Card from './Card'
import Forecast from './Forecast'
import RecentCities from './RecentCities'

const Dashboard = ({
  enabled,
  onEnableLocation,
  units,
  onUnitsChange,
  queryCity,
  onSearch,
  showLoading,
  errorMessage,
  weather,
  lastUpdated,
  onRefresh,
  forecastDays,
  recentCities,
  onSelectRecent,
  onRemoveRecent,
  onClearRecents,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.header
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Weather Dashboard
        </h1>
        <p className="text-slate-200/90 text-lg">
          Real-time weather updates at your fingertips
        </p>
      </motion.header>

      {/* Controls */}
      <motion.div
        className="sticky top-4 z-20 bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <div className="w-full md:w-auto">
            <SearchBar onSubmit={onSearch} />
          </div>
          <UnitToggle units={units} onChange={onUnitsChange} />
        </div>

        {!enabled && (
          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <button
              className="px-6 py-3 rounded-xl font-medium text-base bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all"
              onClick={onEnableLocation}
            >
              📍 Use My Location
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Loading */}
      {showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader label="Loading weather data..." />
        </motion.div>
      )}

      {/* Error */}
      {!showLoading && errorMessage && (
        <motion.div
          className="card p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ErrorBanner message={errorMessage} />
          <p className="text-slate-600 text-sm mt-4">
            💡 Tip: check your spelling or try another city.
          </p>
        </motion.div>
      )}

      {/* Weather content */}
      {weather && !showLoading && (
        <div className="space-y-10">
          {/* Current weather */}
          <motion.div
            className="card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card weather={weather} units={units} />
            {lastUpdated && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-7 pt-7 border-t border-slate-200/60">
                <p className="text-slate-800 text-sm">
                  Last updated:{" "}
                  <span className="font-medium text-slate-700">
                    {new Date(lastUpdated).toLocaleTimeString()}
                  </span>
                </p>
              <motion.button
                  onClick={onRefresh}
                  aria-label="Refresh data"
                  className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
                </svg>
                <span>Refresh</span>
              </motion.button>

              </div>
            )}
          </motion.div>

          {/* Forecast */}
          {forecastDays?.length > 0 && (
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-6">
                5-Day Forecast
              </h3>
              <Forecast days={forecastDays} units={units} />
            </motion.div>
          )}

          {/* Recent searches */}
          {recentCities?.length > 0 && (
            <motion.div
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RecentCities
                cities={recentCities}
                onSelect={onSelectRecent}
                onRemove={onRemoveRecent}
                onClear={onClearRecents}
              />
            </motion.div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!weather && !showLoading && !errorMessage && (
        <motion.div
          className="text-center text-slate-300 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg">Start by searching for a city 🌍</p>
        </motion.div>
      )}
    </div>
  )
}

export default Dashboard
