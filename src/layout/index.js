import React from 'react'
import Chat from '../assets/chat-logo.webp'

const AuthLayouts = ({children}) => {
  return (
    <>
    <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
      <img src={Chat} alt='logo' width={'120px'} className='p-2'  />
      <span className='font-mono font-semibold text-lg -ml-4'>Talkera</span>
    </header>
    {children}
    </>
  )
}

export default AuthLayouts
