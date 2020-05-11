import { useState, createContext } from 'react'

const EditorContext = createContext()

const EditorProvider = ({ children }) => {
  const [content, setContent] = useState(true)

  return (
    <EditorContext.Provider
      value={{
        content,
        setContent,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export { EditorProvider as default, EditorContext }
