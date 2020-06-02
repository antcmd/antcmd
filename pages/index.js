import { useState, useEffect, useContext, useRef } from 'react'
import { useEscapeToClose } from 'hooks'
import { EditorContext, HunterContext, GmailContext } from 'context'
import { MentionsInput, Mention } from 'react-mentions'
import useDarkMode from 'use-dark-mode'
import Link from 'next/link'
// import TextareaAutosize from 'react-textarea-autosize'
// import getCaretCoordinates from 'textarea-caret'

import HelpDropdown from 'components/CommandsDropdown'
import QuillDropdown from 'components/QuillDropdown'
import SynonymDropdown from 'components/SynonymDropdown'

const users = [
  {
    id: 'walter',
    display: 'Walter White',
  },
  {
    id: 'jesse',
    display: 'Jesse Pinkman',
  },
  {
    id: 'gus',
    display: 'Gustavo "Gus" Fring',
  },
  {
    id: 'saul',
    display: 'Saul Goodman',
  },
  {
    id: 'hank',
    display: 'Hank Schrader',
  },
]

const insertAt = (str, sub, pos) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`

export default () => {
  const { value: darkMode, toggle: toggleDarkMode } = useDarkMode(false)
  const [showHelpDropdown, setShowHelpDropdown] = useState(false)

  // Editor
  const textareaRef = useRef()
  const [title, setTitle] = useState('')
  const {
    content: value,
    setContent: setValue,
    getLastWord,
    getLastSentence,
    getEmail,
  } = useContext(EditorContext)

  useEffect(() => {
    if (process.browser) {
      const savedTitle = window.localStorage.getItem('title')
      if (savedTitle) {
        setTitle(savedTitle)
      }
    }
  }, [])

  const saveContent = (newContent) => {
    setValue(newContent)
    if (process.browser) {
      window.localStorage.setItem('content', newContent)
    }
  }

  useEscapeToClose(() => textareaRef.current.focus())
  // Editor

  // Synonyms
  const [lastWord, setLastWord] = useState('')
  const [lastSentence, setLastSentence] = useState('')
  const [showQuillDropdown, setShowQuillDropdown] = useState(false)
  const [showSynonymDropdown, setShowSynonymDropdown] = useState(false)
  // Synonyms

  // Hunter
  const { emails, getEmails } = useContext(HunterContext)
  useEffect(() => {
    if (emails && emails.length > 0) {
      setValue((oldValue) =>
        oldValue.concat(`: ${emails.map((email) => email.value).join(', ')}`),
      )
    }
  }, [emails])
  // Hunter

  // Gmail
  const { signIn, getMessages, messages, sendMessage } = useContext(
    GmailContext,
  )
  // Gmail

  // Crunchbase
  const searchCrunchbase = (domain) =>
    fetch(
      `https://crunchbase-crunchbase-v1.p.rapidapi.com/odm-organizations?domain_name=${domain}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'crunchbase-crunchbase-v1.p.rapidapi.com',
          'x-rapidapi-key':
            '14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2',
        },
      },
    )
      .then((r) => r.json())
      .then(({ data: { items = [] } = {} }) => {
        const item = items[0]
        if (item) {
          setValue((oldValue) =>
            oldValue.concat(
              `: ${item.properties.name} (${item.properties.primary_role}) — ${item.properties.short_description}. Based in ${item.properties.city_name}, ${item.properties.country_code} `,
            ),
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  // Crunchbase

  // Clearbit
  const lookupClearbitCompany = (domain) =>
    fetch(`/api/clearbit/company?domain=${domain}`, {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((company) => {
        setValue((oldValue) =>
          oldValue.concat(
            `: ${company.legalName}. (${company.category.industry}). Alexa global rank: ${company.metrics.alexaGlobalRank}, Alexa US rank: ${company.metrics.alexaUsRank}, Annual revenue: ${company.metrics.annualRevenue}, Estimated annual revenue: ${company.metrics.estimatedAnnualRevenue}. Employees: ${company.metrics.employees}, Market cap: ${company.metrics.marketCap}, Raised: ${company.metrics.raised} `,
          ),
        )
      })
      .catch((err) => {
        console.log(err)
      })
  const lookupClearbitPerson = (email) =>
    fetch(`/api/clearbit/person?email=${email}`, {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((person) => {
        console.log(person)
        setValue((oldValue) =>
          oldValue.concat(
            `: ${person.name.fullName}. Employment: ${person.employment.title} at ${person.employment.name}`,
          ),
        )
      })
      .catch((err) => {
        console.log(err)
      })
  // Clearbit

  const onChange = ({ target: { value: nextValue } }) => {
    let newValue = nextValue

    // Help
    if (newValue.endsWith(`cmd/s`)) {
      setShowHelpDropdown(true)
      saveContent(nextValue.slice(0, -5))
      return
    } else if (showQuillDropdown) {
      setShowQuillDropdown(false)
    }

    // Paraphraze
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
      newValue = nextValue.slice(0, -2)
      setLastWord(getLastWord(newValue))
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
      newValue = nextValue.slice(0, -5)
      getEmails(getLastWord(newValue))
    }

    // Crunchbase
    if (newValue.endsWith(`/crunch`)) {
      newValue = nextValue.slice(0, -7)
      searchCrunchbase(getLastWord(newValue))
    }

    // Gmail
    if (newValue.endsWith(`/gmail`)) {
      signIn()
      newValue = nextValue.slice(0, -6)
    }

    if (newValue.endsWith(`/inbox`)) {
      getMessages()
      newValue = nextValue.slice(0, -6)
    }

    // Gmail send
    if (newValue.endsWith(`/e`)) {
      const { email, body, emailStartPos, emailEndPos } = getEmail(newValue)
      newValue = nextValue.slice(0, -2)
      newValue = insertAt(newValue, ':', emailEndPos)
      newValue = insertAt(newValue, 'March 27, 2020 You > ', emailStartPos)
      sendMessage(body, email)
    }

    // Clearbit
    if (newValue.endsWith(`/clearbit`)) {
      newValue = nextValue.slice(0, -9)
      const word = getLastWord(newValue)
      if (/\S+@\S+\.\S+/.test(word)) {
        lookupClearbitPerson(word)
      } else {
        lookupClearbitCompany(word)
      }
    }

    saveContent(newValue)
  }

  return (
    <div
      className={`div-block-861-copy ${darkMode ? 'darkmode' : 'light'}`}
      style={{
        background: darkMode ? '#0e0d0e' : '#fff',
        height: '100vh',
      }}
    >
      <div className="form-block w-form" style={{ position: 'relative' }}>
        <textarea
          onChange={(e) => {
            setTitle(e.target.value)
            if (process.browser) {
              window.localStorage.setItem('title', e.target.value)
            }
          }}
          value={title}
          placeholder="Title"
          className="text-field w-input"
          style={{
            resize: 'none',
            // lineHeight: '48px',
            maxHeight: '34px',
            overflow: 'hidden',
            fontFamily: 'Inter',
            fontSize: '32px',
            lineHeight: '32px',
            fontWeight: 700,
            margin: '1.7rem 0 1.15rem',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              textareaRef.current.focus()
            }
          }}
        />
        <MentionsInput
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
            minHeight: 2000,
            fontFamily: 'Inter',
            fontSize: '18px',
            lineHeight: '32px',
            fontWeight: 300,
          }}
          autoFocus
          ref={textareaRef}
        >
          <Mention
            trigger="@"
            data={users}
            renderSuggestion={(
              suggestion,
              search,
              highlightedDisplay,
              index,
              focused,
            ) => (
              <div className={`user ${focused ? 'focused' : ''}`}>
                {highlightedDisplay}
              </div>
            )}
          />
        </MentionsInput>
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
        {showHelpDropdown && (
          <HelpDropdown
            onClose={() => setShowHelpDropdown(false)}
            onPickCommand={(cmd) => {
              setValue((prevValue) => `${prevValue}${cmd}`)
              setShowHelpDropdown(false)
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
  )
}
