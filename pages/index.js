import { useState, useEffect, useRef } from 'react'
import { useEscapeToClose } from 'hooks'

import QuillDropdown from 'components/QuillDropdown'
import SynonymDropdown from 'components/SynonymDropdown'

import Pages from 'components/Pages'
import { HUNTER_API_KEY } from 'constants/api'
// import getCaretCoordinates from 'textarea-caret'

export default () => {
  const [value, setValue] = useState('')
  const textareaRef = useRef()

  const [lastWord, setLastWord] = useState('')
  const [lastSentence, setLastSentence] = useState('')

  const [showPages, setShowPages] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [showQuillDropdown, setShowQuillDropdown] = useState(false)
  const [showSynonymDropdown, setShowSynonymDropdown] = useState(false)

  const [emails, setEmails] = useState([])

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

  useEffect(() => {
    if (process.browser) {
      const darkmode = window.localStorage.getItem('darkmode')
      if (darkmode === 'true') {
        setDarkMode(true)
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

  const getEmails = async (domain) => {
    await fetch(
      `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`,
      { method: 'GET' },
    )
      .then((r) => r.json())
      .then(({ data: { emails: fetchedEmails = [] } = {} }) =>
        setEmails(fetchedEmails),
      )
      .catch((err) => {
        console.log(err)
      })
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
      window.localStorage.setItem('darkmode', true)
      newValue = nextValue.slice(0, -5)
    }

    // Light
    if (newValue.endsWith(`/light`)) {
      setDarkMode(false)
      window.localStorage.setItem('darkmode', false)
      newValue = nextValue.slice(0, -6)
    }

    // Pages
    if (newValue.endsWith(`/pages`)) {
      setShowPages(true)
      newValue = nextValue.slice(0, -6)
    }

    // Hunter
    if (newValue.endsWith(`/hunt`)) {
      getEmails(getLastWord(newValue))
      newValue = nextValue.slice(0, -5)
    }

    // Gmail

    setValue(newValue)
    if (process.browser) {
      window.localStorage.setItem('content', newValue)
    }
  }

  useEffect(() => {
    if (emails.length > 0) {
      setValue((oldValue) =>
        oldValue.concat(`: ${emails.map((email) => email.value).join(', ')}`),
      )
    }
  }, [emails.length])

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
              onInput={(e) => {
                // var caret = getCaretCoordinates(textareaRef, textareaRef.current.selectionEnd);
                // console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
              }}
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
