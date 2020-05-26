const clearbit = require('clearbit')(
  '{key: sk_a520f1fc2331b745b7ffe5cccb8116d9}',
)

export default function handler(req, res) {
  clearbit.Enrichment.find({ email: 'alex@clearbit.com', stream: true })
    .then(({ person, company }) => {
      console.log(person)
      console.log(company)
      console.log('Name: ', person && person.name.fullName)
    })
    .catch(function (err) {
      console.error(err)
    })
  res.status(200).json({ people: 'people' })
}
