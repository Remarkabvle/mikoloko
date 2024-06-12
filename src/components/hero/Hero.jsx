import React from 'react'
import useStore from '../../zustand/store'

const Hero = () => {
   let increment = useStore(state => state.inc)
   let incLion = useStore(state => state.incLion)
  return (
    <div>
        <h2>Hero</h2>
        <button onClick={increment}>increment</button>
        <button onClick={() => incLion(1)}>incLion 1</button>
        <button onClick={() => incLion(10)}>incLion 10</button>
        <button onClick={() => incLion(100)}>incLion 100</button>
    </div>
  )
}

export default Hero