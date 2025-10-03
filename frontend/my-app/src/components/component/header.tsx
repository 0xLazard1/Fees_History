import React from 'react'

function Header() {
  return (
    <header className='bg-gray-200 shadow-md top-0 z-50'>
      <div className='flex justify-between items-center px-6 py-4 max-w-6xl mx-auto'>

        <div className='text-3xl font-bold'>Logo</div>
        
        <div className='absolute left-1/2 -translate-x-1/2 text-3xl font-bold'>
          Titre
        </div>
        
        <div className='w-20'></div>
      </div>
    </header>
  )
}

export default Header