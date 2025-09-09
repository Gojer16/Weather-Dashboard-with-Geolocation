import React, { useState } from 'react'
import TextInput from './TextInput'
import PrimaryButton from './PrimaryButton'

const SearchBar = ({ onSubmit, placeholder = 'Search for a city...' }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit?.(value.trim())
    }
  }

  const handleClear = () => setValue('')

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto" 
      role="search" 
      aria-label="City search"
    >
      <div className="flex items-stretch gap-4 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-sm transition focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-400">
        
        {/* Hidden label for a11y */}
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>

        {/* Input */}
        <div className="relative flex-1">
          <TextInput
            id="city-search"
            className="w-full text-base rounded-lg pl-4  pr-10"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          {/* Clear button (only visible if text exists) */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Submit button */}
        <PrimaryButton 
          type="submit" 
          className="px-5 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </PrimaryButton>
      </div>
    </form>
  )
}

export default SearchBar
