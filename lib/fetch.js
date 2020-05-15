const RAPID_API_KEY = '14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2'

export const YAHOO_FINANCE_HOST = 'apidojo-yahoo-finance-v1.p.rapidapi.com'
export const YAHOO_FINANCE_API_URL = `https://${YAHOO_FINANCE_HOST}`

export const DARK_SKY_HOST = 'dark-sky.p.rapidapi.com'
export const DARK_SKY_API_URL = `https://${DARK_SKY_HOST}`

export const insightFetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': YAHOO_FINANCE_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  }).then((r) => r.json())

export const weatherFetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': DARK_SKY_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  }).then((r) => r.json())
