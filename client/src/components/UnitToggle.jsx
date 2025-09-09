import React from 'react'

const UnitToggle = ({ units, onChange }) => {
  return (
    <div
      className="inline-flex items-center gap-2 bg-slate-100 rounded-2xl p-2 border border-slate-200"
      role="group"
      aria-label="Temperature unit toggle"
    >
      <button
        className={`min-w-[3.25rem] px-5 py-3 rounded-lg text-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
          units === 'metric' 
            ? 'bg-white text-slate-800 shadow-md' 
            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
        }`}
        type="button"
        aria-pressed={units === 'metric'}
        aria-label="Show temperatures in Celsius"
        onClick={() => onChange('metric')}
      >
        °C
      </button>
      <button
        className={`min-w-[3.25rem] px-5 py-3 rounded-lg text-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
          units === 'imperial' 
            ? 'bg-white text-slate-800 shadow-md' 
            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
        }`}
        type="button"
        aria-pressed={units === 'imperial'}
        aria-label="Show temperatures in Fahrenheit"
        onClick={() => onChange('imperial')}
      >
        °F
      </button>
    </div>
  )
}

export default UnitToggle
