import Head from 'next/head'

import ThemeProvider from 'context/ThemeContext'
import AppProvider from 'context/AppContext'
import EditorProvider from 'context/EditorContext'

import 'public/css/webflow.css'
import 'public/css/custom.css'

const Providers = ({ children }) => (
  <ThemeProvider>
    <AppProvider>
      <EditorProvider>{children}</EditorProvider>
    </AppProvider>
  </ThemeProvider>
)

// <link rel="stylesheet" href="https://use.typekit.net/vmv7xvk.css" />
export default ({ Component, pageProps }) => (
  <Providers>
    <Head>
      <meta charSet="utf-8" />
      <title>antcmd.</title>
      <meta content="antcmd." property="og:title" />
      <meta content="antcmd." property="twitter:title" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link
        rel="icon"
        href="/icons/web2.svg"
        sizes="any"
        type="image/svg+xml"
      />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="https://use.typekit.net/ldj0mpd.js" type="text/javascript" />
    </Head>
    <Component {...pageProps} />
  </Providers>
)
