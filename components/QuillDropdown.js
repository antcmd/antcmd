import { useState, useEffect } from 'react'

export default ({ lastSentence, onPickSentence }) => {
  const [paraphrases, setParaphrases] = useState([])

  useEffect(() => {
    fetch('https://quillbot.p.rapidapi.com/paraphrase', {
      method: 'POST',
      headers: {
        'x-rapidapi-host': 'quillbot.p.rapidapi.com',
        'x-rapidapi-key': '14b00a912dmshc29f3d5dd244910p17f6a9jsnecfe9e250ed2',
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        text: lastSentence,
        numParaphrases: 4,
        coupon: 'IJg98DCuPqGuit7BrGXKaWsoqOUz0DYV',
        includeSegs: false,
        strength: 3,
        autoflip: 0.45,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((r) => {
        setParaphrases(r[0].paraphrases)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="div-block-895" style={{ width: 330 }}>
      <div className="div-block-827 nou gac">
        <div className="text-block-199 allcaps">Quillbot</div>
      </div>
      <div className="open2-copy-copy">
        {paraphrases.length === 0 ? (
          <div className="avablock fla" data-ix="new-interaction-21">
            <div className="div-block-886">
              <div className="text-block-209">Loading...</div>
            </div>
          </div>
        ) : (
          paraphrases.map((paraphrase) => (
            <div
              className="avablock fla"
              data-ix="new-interaction-21"
              onClick={() => onPickSentence(paraphrase.alt)}
            >
              <div className="div-block-886">
                <div className="text-block-209">{paraphrase.alt}</div>
                <div className="div-block-887">
                  <div className="text-block-211">Standard</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
