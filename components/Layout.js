import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
  const { route } = useRouter()

  return (
    <div
      className={
        route === '/p/[id]' || route === '/create' ? 'wida alk' : 'body-5 g'
      }
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>twrite</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="layout">{children}</div>
      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
      <style jsx global>
        {`
          * {
            font-family: 'Proxima Nova', sans-serif;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
