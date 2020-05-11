import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import Head from 'next/head'

import ThemeProvider from 'context/ThemeContext'
import AppProvider from 'context/AppContext'
import EditorProvider from 'context/EditorContext'

import 'public/css/webflow.css'
import 'public/css/twrite.webflow.css'
import 'public/css/webflow2.css'
import 'public/css/custom.css'

const Providers = ({ children }) => (
  <ThemeProvider>
    <AppProvider>
      <EditorProvider>{children}</EditorProvider>
    </AppProvider>
  </ThemeProvider>
)

const App = ({ Component, pageProps }) => {
  const { route } = useRouter()
  const hideLayout = route === '/nav'

  useEffect(() => {
    console.log('check auth')
  }, [])

  if (hideLayout) return <Component {...pageProps} />

  return (
    <Providers>
      <Head>
        <title>twrite</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://use.typekit.net/vmv7xvk.css" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default App
