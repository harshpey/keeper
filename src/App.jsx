import React, { useState } from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    <div className='bg-stone-900 flex min-h-screen place-content-center'>
      <Todo/>
    </div>
  )
}

export default App
