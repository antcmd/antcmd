import Head from 'next/head'

import AppProvider from 'context/AppContext'
import EditorProvider from 'context/EditorContext'
import ThemeProvider from 'context/ThemeContext'
import GmailProvider from 'context/api/GmailContext'
import HunterProvider from 'context/api/HunterContext'

import 'public/css/webflow.css'
import 'public/css/custom.css'
import 'public/css/editor.css'

const Providers = ({ children }) => (
  <AppProvider>
    <EditorProvider>
      <HunterProvider>
        <GmailProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </GmailProvider>
      </HunterProvider>
    </EditorProvider>
  </AppProvider>
)

export default ({ Component, pageProps }) => (
  <>
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
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '#hero,.tk-proxima-nova,body{font-family:"proxima-nova",sans-serif;}',
        }}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/86cd00/00000000000000003b9aec1f/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3) format("woff2"),url(https://use.typekit.net/af/86cd00/00000000000000003b9aec1f/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3) format("woff"),url(https://use.typekit.net/af/86cd00/00000000000000003b9aec1f/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3) format("opentype");font-weight:700;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/05ec1c/00000000000000003b9aec29/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3) format("woff2"),url(https://use.typekit.net/af/05ec1c/00000000000000003b9aec29/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3) format("woff"),url(https://use.typekit.net/af/05ec1c/00000000000000003b9aec29/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3) format("opentype");font-weight:600;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/702309/00000000000000003b9aec27/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format("woff2"),url(https://use.typekit.net/af/702309/00000000000000003b9aec27/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format("woff"),url(https://use.typekit.net/af/702309/00000000000000003b9aec27/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format("opentype");font-weight:400;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/c46c3a/00000000000000003b9aec23/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) format("woff2"),url(https://use.typekit.net/af/c46c3a/00000000000000003b9aec23/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) format("woff"),url(https://use.typekit.net/af/c46c3a/00000000000000003b9aec23/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) format("opentype");font-weight:300;font-style:normal;}@font-face{font-family:proxima-nova;src:url(https://use.typekit.net/af/d9ceed/00000000000000003b9aec25/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3) format("woff2"),url(https://use.typekit.net/af/d9ceed/00000000000000003b9aec25/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3) format("woff"),url(https://use.typekit.net/af/d9ceed/00000000000000003b9aec25/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3) format("opentype");font-weight:500;font-style:normal;}',
        }}
      />
    </Head>
    <Providers>
      <Component {...pageProps} />
    </Providers>
  </>
)
