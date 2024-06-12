import React, { useState } from 'react'
import Model from '../model/Model'
import Login from '../login/Login'

const Main = () => {
    const [login, setLogin] = useState(false)
    const [register, setRegsiter] = useState(false)
  return (
    <>
    <button onClick={()=> setLogin(true)}>Login</button>
    <button onClick={()=> setRegsiter(true)}>register</button>
    {
      login ?
      <Model close={setLogin}>
        <Login/>
      </Model>
      :
      <></>
    }
    {
      register ?
      <Model width={700} close={setRegsiter}>
        <form action="">
          <h2>Register</h2>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button>Submit</button>
        </form>
      </Model>
      :
      <></>
    }
  </>
  )
}

export default Main