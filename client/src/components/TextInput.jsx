import React from 'react'

const TextInput = ({ value, onChange, placeholder, className = '', type = 'text', ...props }) => {
  return (
    <input
      className={`input-bordered px-4 py-3.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default TextInput
