const RAPID_API_KEY = 'f933836991mshc786942246e77ddp12b619jsn986c369bdfdd'

export const YAHOO_FINANCE_HOST = 'apidojo-yahoo-finance-v1.p.rapidapi.com'
export const YAHOO_FINANCE_API_URL = `https://${YAHOO_FINANCE_HOST}`

export const insightFetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': YAHOO_FINANCE_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  }).then((r) => r.json())
