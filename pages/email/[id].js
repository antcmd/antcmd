import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useEscapeToClose } from 'hooks'
import { GmailContext } from 'context'
import TextareaAutosize from 'react-textarea-autosize'

const darkMode = false

export default () => {
  const {
    back,
    query: { id },
  } = useRouter()

  const [value, setValue] = useState('')

  const [message, setMessage] = useState(undefined)
  const { isSignedIn, isInitialised, getMessage } = useContext(GmailContext)

  useEffect(() => {
    if (isSignedIn && isInitialised) {
      getMessage(id).then((m) => setMessage(m))
    }
  }, [isSignedIn, isInitialised])

  useEscapeToClose(back)

  if (!message) return null
  const bracketStart = message.from.indexOf('<')
  const bracketEnd = message.from.indexOf('>')
  const email = message.from.substring(bracketStart + 1, bracketEnd)
  const name = message.from.substring(0, bracketStart - 1)

  return (
    <>
      <div>
        <div
          className={`div-block-861-copy ${darkMode ? 'darkmode' : 'light'}`}
          style={{ background: darkMode ? '#0e0d0e' : '#fff' }}
        >
          <div className="form-block w-form" style={{ position: 'relative' }}>
            <div
              style={{
                fontSize: '21px',
                lineHeight: '30px',
                marginBottom: 40,
              }}
            >
              {`From ${name}`}
              <a className="email-from">({email})</a>{' '}
            </div>
            <div className="text-field-2 w-input" style={{ height: '100%' }}>
              {message.body}
            </div>
            <TextareaAutosize
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-field-2 w-input"
              placeholder="Reply"
              minRows={8}
              style={{
                width: 665,
                resize: 'none',
                color: darkMode ? '#c0ffab' : '#191a22',
              }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </>
  )
}
