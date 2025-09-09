import React from 'react'
import { motion, AnimatePresence } from 'motion/react'

const RecentCities = ({ cities, onSelect, onRemove, onClear }) => {
  return (
    <div className="w-full">
      <div className="flex items-center  justify-between mb-6 pb-3 border-b border-slate-200 px-1.5">
        <h3 className="text-xl font-semibold text-slate-800">Recent Searches</h3>
        {cities?.length > 0 && (
        <motion.button 
          onClick={onClear}
          aria-label="Clear all recent cities"
          className="btn bg-slate-100 hover:bg-[#764ba2] hover:text-white flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-800 transition-all duration-300 shadow-sm"
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
        />
        </svg>
        <span>Clear All</span>
        </motion.button>
        )}

      </div>

      {cities?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {cities.map((c, index) => (
              <motion.div 
                key={c}
                className="badge-outline flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-slate-200 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.button 
                  className="hover:text-slate-800 transition-colors text-sm font-medium"
                  onClick={() => onSelect?.(c)}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Search for ${c}`}
                >
                  {c}
                </motion.button>
                <motion.button 
                  className="btn-ghost p-1 rounded-full hover:bg-red-500/20"
                  onClick={() => onRemove?.(c)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Remove ${c} from recent cities`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-slate-500 text-sm italic px-1.5">No recent searches yet.</p>
      )}
    </div>
  )
}

export default RecentCities
