import React, { useState } from "react"
import Context from "./Context"

function Provider({children}: {children: React.ReactNode}) {
  const [login, setLogin] = useState(false)
  
  return (
    <Context.Provider value={{login, setLogin}}>
      {children}
    </Context.Provider>

  )
}

export default Provider
