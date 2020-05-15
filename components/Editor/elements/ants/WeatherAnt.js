import useSWR from 'swr'
import { weatherFetcher, DARK_SKY_API_URL } from 'lib/fetch'

export default ({ attributes, children }) => {
  fetch(
    'https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D?lang=en&units=auto',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'dark-sky.p.rapidapi.com',
        'x-rapidapi-key': '14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2',
      },
    },
  )
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  return (
    <div {...attributes} className="app1">
      {children}
      <div className="div-block-878 up _2 sha">
        <div>WE</div>
      </div>
      <div className="text-block-211 morep">
        <strong className="bold-text-20">6:00 am 12°C.</strong> Partly cloudy
        with a chance of a shower in the morning, light rain developing in the
        afternoon. POP 70%. Rain: 1-3 mm...
      </div>
    </div>
  )
}
