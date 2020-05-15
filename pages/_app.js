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
  const hideLayout = route === '/nav'

  useEffect(() => {
    console.log('check auth')
  }, [])

  if (hideLayout) return <Component {...pageProps} />

  return (
    <Providers>
      <Head>
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
        <link rel="stylesheet" href="https://use.typekit.net/vmv7xvk.css" />
        <script src="https://tonejs.github.io/examples/js/tonejs-ui.js" />
        <script src="https://tonejs.github.io/build/Tone.js" />
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-bundle.js" />

        <style
          id="/src/styles.css:-css"
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '/* PianoDarkTheme */\n\n.PianoDarkTheme .ReactPiano__Key--accidental {\n  background: #025d7d;\n  border: 1px solid #888;\n}\n.PianoDarkTheme .ReactPiano__Key--natural {\n  background: #013243;\n  border: 1px solid #888;\n  margin-right: 0;\n}\n.PianoDarkTheme .ReactPiano__Key--active.ReactPiano__Key--accidental {\n  background: #0396ca;\n}\n.PianoDarkTheme .ReactPiano__Key--active.ReactPiano__Key--natural {\n  background: #0396ca;\n}\n',
          }}
        />

        <style
          id="/node_modules/react-piano/dist/styles.css:-css"
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '.ReactPiano__Keyboard {\n  /* Used for absolute positioning of .ReactPiano__Key--accidental elements */\n  position: relative;\n  /* Used to lay out .ReactPiano__Key--natural elements */\n  display: flex;\n}\n\n.ReactPiano__Key {\n  /* Used for flexbox layout of the child .ReactPiano__NoteLabelContainer elements */\n  display: flex;\n}\n\n/*\n * Styles of accidental notes (flat or sharp)\n */\n.ReactPiano__Key--accidental {\n  background: #555;\n  border: 1px solid #fff;\n  border-top: 1px solid transparent;\n  border-radius: 0 0 4px 4px;\n  cursor: pointer;\n  height: 66%;\n  /* Overlay on top of natural keys */\n  z-index: 1;\n  /* Use absolute positioning along with inline styles specified in JS to put keys in correct locations. */\n  position: absolute;\n  top: 0;\n}\n\n/*\n * Styles of natural notes (white keys)\n */\n.ReactPiano__Key--natural {\n  background: #f6f5f3;\n  border: 1px solid #888;\n  border-radius: 0 0 6px 6px;\n  cursor: pointer;\n  z-index: 0;\n  /*\n   * Uses flexbox with margin instead of absolute positioning to have more consistent margin rendering.\n   * This causes inline styles to be ignored.\n   */\n  flex: 1;\n  margin-right: 1px;\n}\n\n.ReactPiano__Key--natural:last-child {\n  /* Don\'t render extra margin on the last natural note */\n  margin-right: 0;\n}\n\n/*\n * Styles of "active" or pressed-down keys\n */\n.ReactPiano__Key--active {\n  background: #3ac8da;\n}\n\n.ReactPiano__Key--active.ReactPiano__Key--accidental {\n  border: 1px solid #fff;\n  border-top: 1px solid #3ac8da;\n  /* Slight height reduction for "pushed-down" effect */\n  height: 65%;\n}\n\n.ReactPiano__Key--active.ReactPiano__Key--natural {\n  border: 1px solid #3ac8da;\n  /* Slight height reduction for "pushed-down" effect */\n  height: 98%;\n}\n\n/*\n * Styles for disabled state\n */\n.ReactPiano__Key--disabled.ReactPiano__Key {\n  cursor: progress;\n}\n\n.ReactPiano__Key--disabled.ReactPiano__Key--accidental {\n  background: #ddd;\n  border: 1px solid #999;\n}\n\n.ReactPiano__Key--disabled.ReactPiano__Key--natural {\n  background: #eee;\n  border: 1px solid #aaa;\n}\n\n/*\n * Styles for the note label inside a piano key\n */\n.ReactPiano__NoteLabelContainer {\n  flex: 1;\n  /* Align children .ReactPiano__NoteLabel to the bottom of the key */\n  align-self: flex-end;\n}\n\n.ReactPiano__NoteLabel {\n  font-size: 12px;\n  text-align: center;\n  text-transform: capitalize;\n  /* Disable text selection */\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.ReactPiano__NoteLabel--accidental {\n  color: #f8e8d5;\n  margin-bottom: 3px;\n}\n\n.ReactPiano__NoteLabel--natural {\n  color: #888;\n  margin-bottom: 3px;\n}\n\n.ReactPiano__NoteLabel--natural.ReactPiano__NoteLabel--active {\n  color: #f8e8d5;\n}\n',
          }}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default App
