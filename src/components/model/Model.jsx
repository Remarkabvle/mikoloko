import React from 'react'
import "./Model.css"

const Model = ({children, close, width=400}) => {
  return (
    <>
        <div onClick={()=> close(false)} className="overlay">
        </div>
        <div style={{width}} className="model">
            {children}
        </div>
    </>
  )
}

export default Model