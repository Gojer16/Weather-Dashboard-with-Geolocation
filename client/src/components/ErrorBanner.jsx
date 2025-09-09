import React from 'react'
import { motion } from 'motion/react'

const ErrorBanner = ({ message }) => {
  if (!message) return null
  
  return (
    <motion.div 
      className="bg-red-100 border border-red-200 rounded-xl p-5 flex items-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <h3 className="font-semibold text-red-800 text-lg">Error</h3>
        <p className="text-red-700 text-base mt-1">{message}</p>
      </div>
    </motion.div>
  )
}

export default ErrorBanner


