import { useState, createContext } from 'react'

const EditorContext = createContext()

const initialValue = [
  {
    type: 'title',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
]

const EditorProvider = ({ children }) => {
  const [content, setContent] = useState(initialValue)

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
