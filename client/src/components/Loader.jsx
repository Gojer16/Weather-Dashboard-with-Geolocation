import React from 'react'
import { motion } from 'motion/react'

const Loader = ({ label = 'Loading...' }) => {
  const dots = [0, 0.2, 0.4] // stagger delays

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated dots */}
      <motion.div 
        className="flex space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {dots.map((delay, i) => (
          <motion.div
            key={i}
            className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Label */}
      <motion.p
        className="mt-6 text-slate-100 text-base font-medium tracking-wide"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {label}
      </motion.p>
    </div>
  )
}

export default Loader
