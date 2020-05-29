import { useState, createContext } from 'react'
import { HUNTER_API_KEY } from 'constants/api'

const HunterContext = createContext()

const HunterProvider = ({ children }) => {
  const [emails, setEmails] = useState([])

  const getEmails = async (domain) => {
    await fetch(
      `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`,
      { method: 'GET' },
    )
      .then((r) => r.json())
      .then(({ data: { emails: fetchedEmails = [] } = {} }) =>
        setEmails(fetchedEmails),
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  return (
    <HunterContext.Provider
      value={{
        emails,
        getEmails,
        setEmails,
      }}
    >
      {children}
    </HunterContext.Provider>
  )
}

export { HunterProvider as default, HunterContext }
