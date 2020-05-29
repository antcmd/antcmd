import { useState, useEffect } from 'react'
import useDarkMode from 'use-dark-mode'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { themeDark, themeWhite } from './themes'

export default ({ children }) => {
  const { value: isDarkMode } = useDarkMode(false)
  const theme = isDarkMode ? themeDark : themeWhite

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const body = (
    <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
  )

  // prevents ssr flash for mismatched dark mode
  // https://brianlovin.com/overthought/adding-dark-mode-with-next-js
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
