import { useState, useEffect, createContext } from 'react'
import base64url from 'base64url'

const gapi = process.browser ? window.gapi : {}

const GMAIL_CLIENT_ID =
  '335114584327-5mpvdtadhh8hp8lbhg1s9eg4i9e8ak34.apps.googleusercontent.com'
const GMAIL_API_KEY = 'AIzaSyDCFU-HCEyIojyN6mWdtvzopAch58YSWc8'
const SCOPES =
  'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.addons.current.message.action'
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
]

const GmailContext = createContext()

const GmailProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [isInitialised, setInitialised] = useState(false)
  const [isSignedIn, setSignedIn] = useState(null)

  const signIn = () => gapi.auth2.getAuthInstance().signIn()
  const signOut = () => gapi.auth2.getAuthInstance().signOut()

  const sendMessage = (message, email) =>
    gapi.client.gmail.users.messages
      .send({
        userId: 'me',
        resource: {
          raw: base64url(
            `From: John Doe <jdoe@machine.example>
To: John Doe <${email}>
Subject: Saying Hello
Date: Fri, 21 Nov 1997 09:55:06 -0600
Message-ID: <1234@local.machine.example>

${message}`,
          ),
          // 'RnJvbTogSm9obiBEb2UgPGpkb2VAbWFjaGluZS5leGFtcGxlPiAKVG86IE1hcnkgU21pdGggPG1hcnlAZXhhbXBsZS5uZXQ+IApTdWJqZWN0OiBTYXlpbmcgSGVsbG8gCkRhdGU6IEZyaSwgMjEgTm92IDE5OTcgMDk6NTU6MDYgLTA2MDAgCk1lc3NhZ2UtSUQ6IDwxMjM0QGxvY2FsLm1hY2hpbmUuZXhhbXBsZT4KClRoaXMgaXMgYSBtZXNzYWdlIGp1c3QgdG8gc2F5IGhlbGxvLiBTbywgIkhlbGxvIi4=',
        },
        // raw: btoa(`
        //     From: John Doe <jdoe@machine.example>
        //     To: Mary Smith <ignatif@gmail.com>
        //     Subject: Saying Hello
        //     Date: Fri, 21 Nov 1997 09:55:06 -0600
        //     Message-ID: <1234@local.machine.example>

        //     This is a message just to say hello. So, "Hello".
        //   `),
      })
      .then((r) => console.log(r))

  const formatMessage = (gmailObj) => ({
    id: gmailObj.id,
    subject: gmailObj.payload.headers.find((h) => h.name === 'Subject').value,
    from: gmailObj.payload.headers.find((h) => h.name === 'From').value,
    date: gmailObj.payload.headers.find((h) => h.name === 'Date').value,
    body: gmailObj.snippet,
  })

  const getMessage = async (id) => {
    console.log(id)
    if (messages.length > 0) {
      return messages.find((m) => m.id === id)
    }

    return gapi.client.gmail.users.messages
      .get({
        userId: 'me',
        id,
      })
      .then(({ result }) => formatMessage(result))
  }

  const getMessages = () =>
    gapi.client.gmail.users.messages
      .list({
        userId: 'me',
        maxResults: 10,
        labelIds: ['INBOX'],
      })
      .then(
        ({ result: { messages: m = [] } = {} }) => m,
        (err) => console.error('Execute error', err),
      )
      .then((m) =>
        m.map((message) =>
          gapi.client.gmail.users.messages
            .get({
              userId: 'me',
              id: message.id,
            })
            .then(({ result }) =>
              setMessages((oldMessages) => [
                ...oldMessages,
                formatMessage(result),
              ]),
            ),
        ),
      )

  const watchSignin = (isSigned) => {
    if (isSigned) {
      setSignedIn(true)
    } else {
      setSignedIn(false)
    }
  }

  const initClient = async (callback) => {
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    console.log('initClient')
    await gapi.client
      .init({
        apiKey: GMAIL_API_KEY,
        clientId: GMAIL_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        () => {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(watchSignin)
          setInitialised(true)
          if (callback) callback()

          // Handle the initial sign-in state.
          watchSignin(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        function (error) {
          console.log(error)
        },
      )
  }

  useEffect(() => {
    if (process.browser && window.gapi) {
      window.gapi.load('client:auth2', initClient)
    }
  }, [process.browser])

  return (
    <GmailContext.Provider
      value={{
        isSignedIn,
        isInitialised,
        signIn,
        signOut,
        watchSignin,
        messages,
        getMessages,
        getMessage,
        sendMessage,
      }}
    >
      {children}
    </GmailContext.Provider>
  )
}

export { GmailProvider as default, GmailContext }
