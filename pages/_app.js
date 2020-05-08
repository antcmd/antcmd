import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import 'public/css/webflow.css'
import 'public/css/twrite.webflow.css'
import 'public/css/custom.css'

function MyApp({ Component, pageProps }) {
  const { route } = useRouter()
  const hideLayout = route === '/nav'

  useEffect(() => {
    console.log('check auth')
  }, [])

  if (hideLayout) return <Component {...pageProps} />

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
