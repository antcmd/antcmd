import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
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

const App = ({ Component, pageProps }) => {
  const { route } = useRouter()
  const hideLayout = route === '/json' || route === '/json1'

  useEffect(() => {
    console.log('check auth')
  }, [])

  if (hideLayout) return <Component {...pageProps} />

  // <link rel="stylesheet" href="https://use.typekit.net/vmv7xvk.css" />
  return (
    <Providers>
      <Head>
        <meta charSet="utf-8" />
        <title>editor2</title>
        <meta content="editor2" property="og:title" />
        <meta content="editor2" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link
          href="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/css/twrite.webflow.286611a1d.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Varela+Round:400"
          media="all"
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '#hero,.tk-proxima-nova,body{font-family:"proxima-nova",sans-serif;}',
          }}
        />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/86cd00/00000000000000003b9aec1f/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3) format("woff2"),url(https://use.typekit.net/af/86cd00/00000000000000003b9aec1f/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3) format("woff"),url(https://use.typekit.net/af/86cd00/00000000000000003b9aec1f/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3) format("opentype");font-weight:700;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/05ec1c/00000000000000003b9aec29/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3) format("woff2"),url(https://use.typekit.net/af/05ec1c/00000000000000003b9aec29/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3) format("woff"),url(https://use.typekit.net/af/05ec1c/00000000000000003b9aec29/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3) format("opentype");font-weight:600;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/702309/00000000000000003b9aec27/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format("woff2"),url(https://use.typekit.net/af/702309/00000000000000003b9aec27/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format("woff"),url(https://use.typekit.net/af/702309/00000000000000003b9aec27/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format("opentype");font-weight:400;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/c46c3a/00000000000000003b9aec23/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) format("woff2"),url(https://use.typekit.net/af/c46c3a/00000000000000003b9aec23/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) format("woff"),url(https://use.typekit.net/af/c46c3a/00000000000000003b9aec23/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) format("opentype");font-weight:300;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/d9ceed/00000000000000003b9aec25/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3) format("woff2"),url(https://use.typekit.net/af/d9ceed/00000000000000003b9aec25/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3) format("woff"),url(https://use.typekit.net/af/d9ceed/00000000000000003b9aec25/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3) format("opentype");font-weight:500;font-style:normal;}',
          }}
        />
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <title>antcmd 🐜</title>
        <link
          rel="icon"
          href="/icons/web2.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://use.typekit.net/ldj0mpd.js"
          type="text/javascript"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default App
