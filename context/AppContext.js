import { useState, createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [showPages, setShowPages] = useState(false)

  return (
    <AppContext.Provider
      value={{
        showPages,
        setShowPages,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider as default, AppContext }
