import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children};
    </div>
  )// we can remove () from return if the one line statement is there;
}

export default Container
