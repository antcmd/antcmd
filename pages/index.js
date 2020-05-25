import { useState, useEffect, useRef } from 'react'
import { useEscapeToClose } from 'hooks'

import QuillDropdown from 'components/QuillDropdown'
import SynonymDropdown from 'components/SynonymDropdown'

import Pages from 'components/Layout/Pages'

const Editor = () => {
  const [value, setValue] = useState('')
  const textareaRef = useRef()

  const [lastWord, setLastWord] = useState('')
  const [lastSentence, setLastSentence] = useState('')

  const [showPages, setShowPages] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [showQuillDropdown, setShowQuillDropdown] = useState(false)
  const [showSynonymDropdown, setShowSynonymDropdown] = useState(false)

  useEscapeToClose(() => {
    setShowPages(false)
    textareaRef.current.focus()
  })

  useEffect(() => {
    if (process.browser) {
      const savedValue = window.localStorage.getItem('content')
      if (savedValue) {
        setValue(savedValue)
      }
    }
  }, [])

  const getLastSentence = (content) => {
    const thisDotIndex = content.lastIndexOf('.')
    const lastDotIndex = content.lastIndexOf('.', thisDotIndex - 1)

    const chunk = content.substring(
      lastDotIndex !== -1 ? lastDotIndex + 2 : 0,
      thisDotIndex,
    )

    return chunk
  }

  const getLastWord = (content) => {
    const lastSpaceIndex = content.lastIndexOf(' ')

    const chunk = content.substring(
      lastSpaceIndex !== -1 ? lastSpaceIndex + 1 : 0,
      content.length - 2,
    )

    return chunk
  }

  const onChange = ({ target: { value: nextValue } }) => {
    let newValue = nextValue

    // Paraphrize sentence
    if (newValue.endsWith(`./s`)) {
      setLastSentence(getLastSentence(newValue))
      setShowQuillDropdown(true)
      newValue = nextValue.slice(0, -2)
    } else if (showQuillDropdown) {
      setShowQuillDropdown(false)
    }

    // Synonym
    if (!newValue.endsWith(`./s`) && newValue.endsWith('/s')) {
      setShowSynonymDropdown(true)
      setLastWord(getLastWord(newValue))
      newValue = nextValue.slice(0, -2)
    } else if (showSynonymDropdown) {
      setShowSynonymDropdown(false)
    }

    // Dark
    if (newValue.endsWith(`/dark`)) {
      setDarkMode(true)
      newValue = nextValue.slice(0, -5)
    }

    // Light
    if (newValue.endsWith(`/light`)) {
      setDarkMode(false)
      newValue = nextValue.slice(0, -6)
    }

    // Pages
    if (newValue.endsWith(`/pages`)) {
      setShowPages(true)
      newValue = nextValue.slice(0, -6)
    }

    setValue(newValue)
    if (process.browser) {
      window.localStorage.setItem('content', newValue)
    }
  }

  return (
    <>
      <div>
        <div
          className={`div-block-861-copy ${darkMode ? 'darkmode' : 'light'}`}
          style={{ background: darkMode ? '#0e0d0e' : '#fff' }}
        >
          <div className="form-block w-form" style={{ position: 'relative' }}>
            <textarea
              value={value}
              onChange={onChange}
              className="text-field-2 w-input"
              placeholder="1. Ordinary World"
              style={{
                height: '80vh',
                resize: 'none',
                color: darkMode ? '#c0ffab' : '#191a22',
              }}
              autoFocus
              ref={textareaRef}
            />
            {showQuillDropdown && (
              <QuillDropdown
                lastSentence={lastSentence}
                onPickSentence={(newSentence) => {
                  setValue((prevValue) =>
                    prevValue.replace(lastSentence, newSentence),
                  )
                  setShowQuillDropdown(false)
                  textareaRef.current.focus()
                }}
                onClose={() => setShowQuillDropdown(false)}
              />
            )}
            {showSynonymDropdown && (
              <SynonymDropdown
                lastWord={lastWord}
                onPickWord={(newWord) => {
                  setValue((prevValue) => prevValue.replace(lastWord, newWord))
                  setShowSynonymDropdown(false)
                  textareaRef.current.focus()
                }}
                onClose={() => setShowSynonymDropdown(false)}
              />
            )}
          </div>
        </div>
      </div>
      {showPages && <Pages close={() => setShowPages(false)} />}
    </>
  )
}

export default Editor
