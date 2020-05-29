import { useState, useEffect, useContext, useRef } from 'react'
import { useEscapeToClose } from 'hooks'
import { AppContext, EditorContext, HunterContext, GmailContext } from 'context'
import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
import TextareaAutosize from 'react-textarea-autosize'
// import getCaretCoordinates from 'textarea-caret'

import CommandsDropdown from 'components/CommandsDropdown'
import QuillDropdown from 'components/QuillDropdown'
import SynonymDropdown from 'components/SynonymDropdown'

const insertAt = (str, sub, pos) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`

export default () => {
  // App
  const { value: darkMode, toggle: toggleDarkMode } = useDarkMode(false)

  // Editor
  const {
    content: value,
    setContent: setValue,
    getLastWord,
    getLastSentence,
    getEmail,
  } = useContext(EditorContext)
  const textareaRef = useRef()

  const [lastWord, setLastWord] = useState('')
  const [lastSentence, setLastSentence] = useState('')

  const [showCommandsDropdown, setShowCommandsDropdown] = useState(false)
  const [showQuillDropdown, setShowQuillDropdown] = useState(false)
  const [showSynonymDropdown, setShowSynonymDropdown] = useState(false)

  const saveContent = (newContent) => {
    setValue(newContent)
    if (process.browser) {
      window.localStorage.setItem('content', newContent)
    }
  }

  useEscapeToClose(() => textareaRef.current.focus())

  // Hunter API
  const { emails, getEmails } = useContext(HunterContext)

  useEffect(() => {
    if (emails && emails.length > 0) {
      setValue((oldValue) =>
        oldValue.concat(`: ${emails.map((email) => email.value).join(', ')}`),
      )
    }
  }, [emails])

  // Gmail API
  const { signIn, signOut, getMessages, messages, sendMessage } = useContext(
    GmailContext,
  )

  const onChange = ({ target: { value: nextValue } }) => {
    let newValue = nextValue

    // List commands
    if (newValue.endsWith(`cmd/s`)) {
      setShowCommandsDropdown(true)
      saveContent(nextValue.slice(0, -5))
      return
    } else if (showQuillDropdown) {
      setShowQuillDropdown(false)
    }

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
      toggleDarkMode()
      newValue = nextValue.slice(0, -5)
    }

    // Light
    if (newValue.endsWith(`/light`)) {
      toggleDarkMode()
      newValue = nextValue.slice(0, -6)
    }

    // Hunter
    if (newValue.endsWith(`/hunt`)) {
      getEmails(getLastWord(newValue))
      newValue = nextValue.slice(0, -5)
    }

    // Gmail
    if (newValue.endsWith(`/gmail`)) {
      signIn()
      newValue = nextValue.slice(0, -6)
    }

    if (newValue.endsWith(`/gmail-logout`)) {
      signOut()
      newValue = nextValue.slice(0, -13)
    }

    if (newValue.endsWith(`/inbox`)) {
      getMessages()
      newValue = nextValue.slice(0, -7)
    }

    if (newValue.endsWith(`/e`)) {
      const { email, body, emailStartPos, emailEndPos } = getEmail(newValue)
      newValue = nextValue.slice(0, -5)
      newValue = insertAt(newValue, ':', emailEndPos)
      newValue = insertAt(newValue, 'March 27, 2020 You > ', emailStartPos)
      sendMessage(body, email)
    }

    saveContent(newValue)
  }

  return (
    <>
      <div>
        <div
          className={`div-block-861-copy ${darkMode ? 'darkmode' : 'light'}`}
          style={{ background: darkMode ? '#0e0d0e' : '#fff' }}
        >
          <div className="form-block w-form" style={{ position: 'relative' }}>
            <TextareaAutosize
              value={value}
              onChange={onChange}
              className="text-field-2 w-input"
              placeholder="Type cmd/s"
              onInput={() => {
                // var caret = getCaretCoordinates(textareaRef, textareaRef.current.selectionEnd);
                // console.log('(top, left, height) = (%s, %s, %s)', caret.top, caret.left, caret.height);
              }}
              minRows={8}
              style={{
                resize: 'none',
                color: darkMode ? '#c0ffab' : '#191a22',
              }}
              autoFocus
              ref={textareaRef}
            />
            {messages &&
              messages.map((message) => (
                <Link
                  href="/email/[id]"
                  as={`/email/${message.id}`}
                  key={message.id}
                >
                  <a className="email-link">{message.subject}</a>
                </Link>
              ))}
            {showCommandsDropdown && (
              <CommandsDropdown
                onClose={() => setShowCommandsDropdown(false)}
                onPickCommand={(cmd) => {
                  setValue((prevValue) => `${prevValue}${cmd}`)
                  setShowCommandsDropdown(false)
                  textareaRef.current.focus()
                }}
              />
            )}
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
    </>
  )
}
