export const YAHOO_API_URL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com'

export const rapidApiFetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': '14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2',
    },
  }).then((r) => r.json())
