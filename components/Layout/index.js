import { useState } from 'react'
import Head from 'next/head'
import MenuButton from 'components/Layout/MenuButton'

export default ({ children }) => {
  const [showMenu, setShowMenu] = useState(true)

  return (
    <>
      <Head>
        <title>twrite</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://use.typekit.net/vmv7xvk.css" />
      </Head>
      <MenuButton onClick={() => setShowMenu(!showMenu)} />
      {children}
    </>
  )
}
