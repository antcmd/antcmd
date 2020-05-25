import { useState, useEffect, useCallback } from 'react'
import { useArrowNavigation } from 'hooks'

export default ({ lastWord, onPickWord, onClose }) => {
  const [synonyms, setSynonyms] = useState(undefined)
  const [focusedIndex, setFocusedIndex] = useState(0)

  console.log(`Last world 👉🏾${lastWord}`)

  useArrowNavigation({
    next: useCallback(
      () =>
        setFocusedIndex((prevIndex) =>
          prevIndex >= synonyms.length - 1 ? 0 : prevIndex + 1,
        ),
      [synonyms],
    ),
    prev: useCallback(
      () =>
        setFocusedIndex((prevIndex) =>
          prevIndex <= 0 ? synonyms.length - 1 : prevIndex - 1,
        ),
      [synonyms],
    ),
    enter: () => onPickWord(synonyms[focusedIndex]),
    close: onClose,
  })

  useEffect(() => {
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${lastWord}/synonyms`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': '14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then(({ synonyms: fetchedSynonyms }) => {
        setSynonyms(fetchedSynonyms)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div
      className="div-block-895"
      style={{
        width: 330,
        overflow: 'auto',
        maxHeight: '350px',
        top: '6%',
      }}
    >
      <div className="div-block-827 nou gac">
        <div className="text-block-199 allcaps">Synonyms</div>
      </div>
      <div className="open2-copy-copy">
        {!synonyms ? (
          <div className="avablock fla" data-ix="new-interaction-21">
            <div className="div-block-886">
              <div className="text-block-209">Loading...</div>
            </div>
          </div>
        ) : (
          synonyms.map((synonym, index) => (
            <div
              className={`avablock fla ${
                focusedIndex === index ? 'hover' : ''
              }`}
              data-ix="new-interaction-21"
              onClick={() => onPickWord(synonym)}
              key={synonym}
            >
              <div className="div-block-886">
                <div className="text-block-209">{synonym}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
