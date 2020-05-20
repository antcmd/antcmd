import useSWR from 'swr'
import { wordsFetcher } from 'lib/fetch'

export default ({ selectedIndex }) => {
  const toFetch = true
  const { data: { rhymes: { all: rhymes = [] } = {} } = {} } = useSWR(
    () => toFetch && 'https://wordsapiv1.p.rapidapi.com/words/ant/rhymes',
    wordsFetcher,
  )

  return (
    <>
      <div className="open2-copy-copy">
        <div className="div-block-827 nou gac">
          <div className="text-block-199 allcaps">Rhymes</div>
        </div>
      </div>
      {rhymes.map((rhyme, i) => {
        const isSelected = i === selectedIndex

        return (
          <div
            data-ix="new-interaction-21"
            className={`avablock fla ${isSelected ? 'sck' : ''}`}
          >
            <div className="div-block-886">
              <div className="text-block-209">{rhyme}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}
