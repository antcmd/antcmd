import { useState, useEffect } from 'react'

export default ({ lastWord, onPickWord }) => {
  const [synonyms, setSynonyms] = useState([])

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
      style={{ width: 330, maxHeight: 500, overflow: 'auto' }}
    >
      <div className="div-block-827 nou gac">
        <div className="text-block-199 allcaps">Synonyms</div>
      </div>
      <div className="open2-copy-copy">
        {synonyms.length === 0 ? (
          <div className="avablock fla" data-ix="new-interaction-21">
            <div className="div-block-886">
              <div className="text-block-209">Loading...</div>
            </div>
          </div>
        ) : (
          synonyms.map((synonym) => (
            <div
              className="avablock fla"
              data-ix="new-interaction-21"
              onClick={() => onPickWord(synonym)}
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
