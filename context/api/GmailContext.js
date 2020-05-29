import Head from 'next/head'
import base64url from 'base64url'
import { useState, useEffect, createContext } from 'react'

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
        },
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
      getMessages()
    } else {
      setSignedIn(false)
    }
  }

  const initClient = async () => {
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

          // Handle the initial sign-in state.
          watchSignin(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        function (error) {
          console.log(error)
        },
      )
  }

  const onClientLoad = () => {
    console.log('load')
    console.log('load')
    console.log('load')
    console.log('load')
    // Load the API client and auth2 library
    gapi.load('client:auth2', initClient)
  }

  return (
    <GmailContext.Provider
      value={{
        isSignedIn,
        onClientLoad,
        signIn,
        signOut,
        watchSignin,
        messages,
        getMessages,
        getMessage,
        sendMessage,
      }}
    >
      <Head>
        <script
          async
          defer
          src="https://apis.google.com/js/api.js"
          onLoad={onClientLoad}
          onReadyStateChange={function () {
            console.log(this)
          }}
        />
      </Head>
      {children}
    </GmailContext.Provider>
  )
}

export { GmailProvider as default, GmailContext }
