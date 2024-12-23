import React from 'react'

interface props {
  children: React.ReactNode
}

const ErrorMessage = ({children}:props) => {
  return (
    <p className='bg-red-50 text-red-500 text-center uppercase font-bold p-3'>
      {children}
    </p>
  )
}

export default ErrorMessage