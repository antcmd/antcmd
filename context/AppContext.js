import { useState, createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [showPages, setShowPages] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <AppContext.Provider
      value={{
        showPages,
        setShowPages,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider as default, AppContext }
