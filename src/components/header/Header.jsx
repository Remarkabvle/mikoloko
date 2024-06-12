import React from 'react'
import useStore from '../../zustand/store'

const Header = () => {
   let bears = useStore(state => state.bears)
   let lions = useStore(state => state.lions)
  return (
    <div>
        <h2>bears {bears}</h2>
        <h2>lions {lions}</h2>
    </div>
  )
}

export default Header