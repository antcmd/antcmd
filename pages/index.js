import { useState, useEffect, useRef } from 'react'

import QuillDropdown from 'components/QuillDropdown'
import SynonymDropdown from 'components/SynonymDropdown'

const Editor = () => {
  const [value, setValue] = useState('')
  const [lastWord, setLastWord] = useState('')
  const [lastSentence, setLastSentence] = useState('')
  const [showQuillDropdown, setShowQuillDropdown] = useState(false)
  const [showSynonymDropdown, setShowSynonymDropdown] = useState(false)
  const textareaRef = useRef()

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

  const onChange = ({ target: { value: newValue } }) => {
    if (newValue.endsWith(`./s`)) {
      setLastSentence(getLastSentence(newValue))
      setShowQuillDropdown(true)
    } else {
      setShowQuillDropdown(false)
    }

    if (!newValue.endsWith(`./s`) && newValue.endsWith('/s')) {
      setShowSynonymDropdown(true)
      setLastWord(getLastWord(newValue))
    } else {
      setShowSynonymDropdown(false)
    }

    setValue(newValue)
    if (process.browser) {
      window.localStorage.setItem('content', newValue)
    }
  }

  return (
    <div>
      <div className="div-block-861-copy">
        <div className="form-block w-form" style={{ position: 'relative' }}>
          <textarea
            value={value}
            onChange={onChange}
            className="text-field-2 w-input"
            placeholder="1. Ordinary World"
            style={{ height: '80vh' }}
            autoFocus
            ref={textareaRef}
          />
          {showQuillDropdown && (
            <QuillDropdown
              lastSentence={lastSentence}
              onPickSentence={(newSentence) => {
                setValue((oldValue) =>
                  oldValue.replace(lastSentence, newSentence).slice(0, -2),
                )
                setShowQuillDropdown(false)
              }}
            />
          )}
          {showSynonymDropdown && (
            <SynonymDropdown
              lastWord={lastWord}
              onPickWord={(newWord) => {
                setValue((oldValue) =>
                  oldValue.replace(lastWord, newWord).slice(0, -2),
                )
                setShowSynonymDropdown(false)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Editor
