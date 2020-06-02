import { useState, useEffect, createContext } from 'react'

const EditorContext = createContext()

const EditorProvider = ({ children }) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (process.browser) {
      const savedContent = window.localStorage.getItem('content')
      if (savedContent) {
        setContent(savedContent)
      }
    }
  }, [])

  const getLastSentence = (text) => {
    const thisDotIndex = text.lastIndexOf('.')
    const lastDotIndex = text.lastIndexOf('.', thisDotIndex - 1)

    const chunk = text.substring(
      lastDotIndex !== -1 ? lastDotIndex + 2 : 0,
      thisDotIndex,
    )

    return chunk
  }

  const getLastWord = (text) => {
    const lastSpaceIndex = text.lastIndexOf(' ')
    const lastNewLine = text.lastIndexOf('\n')

    let start
    if (lastSpaceIndex > lastNewLine) {
      start = lastSpaceIndex
    } else {
      start = lastNewLine
    }

    const chunk = text.substring(start !== -1 ? start + 1 : 0, text.length)

    console.log(chunk)

    return chunk
  }

  const getEmail = (text) => {
    const lastAtSymbol = text.lastIndexOf('@')
    const beforeEmailPos = text.lastIndexOf('\n', lastAtSymbol)
    const afterEmailPos = text.indexOf(' ', lastAtSymbol)
    const email = text.substring(beforeEmailPos, afterEmailPos)
    const body = text.substring(afterEmailPos + 1, text.length - 5)

    return {
      email,
      body,
      emailStartPos: beforeEmailPos > -1 ? beforeEmailPos + 1 : 0,
      emailEndPos: afterEmailPos,
    }
  }

  return (
    <EditorContext.Provider
      value={{
        content,
        setContent,
        getLastWord,
        getLastSentence,
        getEmail,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export { EditorProvider as default, EditorContext }
