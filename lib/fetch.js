const RAPID_API_KEY = 'f933836991mshc786942246e77ddp12b619jsn986c369bdfdd'

export const YAHOO_FINANCE_HOST = 'apidojo-yahoo-finance-v1.p.rapidapi.com'
export const YAHOO_FINANCE_API_URL = `https://${YAHOO_FINANCE_HOST}`

export const WORDS_API_HOST = 'wordsapiv1.p.rapidapi.com'
export const WORDS_API_KEY = `14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2`

export const insightFetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': YAHOO_FINANCE_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  }).then((r) => r.json())

export const wordsFetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': WORDS_API_HOST,
      'x-rapidapi-key': WORDS_API_KEY,
      useQueryString: true,
    },
  }).then((r) => r.json())
