import React from 'react'

const PrimaryButton = ({ children, type = 'button', onClick, className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-primary px-5 py-3 rounded-lg text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton


