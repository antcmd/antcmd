import { useState } from 'react'
import useSWR from 'swr'
import { wordsFetcher } from 'lib/fetch'

export default () => {
  const [focusedSynonym, setFocusedSynonym] = useState(undefined)

  const toFetch = true
  const { data } = useSWR(
    () =>
      toFetch && 'https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D/rhymes',
    wordsFetcher,
  )
  console.log(data)

  return <div>rhymes</div>
}
