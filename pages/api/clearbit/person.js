const clearbit = require('clearbit')('sk_a520f1fc2331b745b7ffe5cccb8116d9')

export default function handler(req, res) {
  const { email } = req.query

  clearbit.Person.find({ email, stream: true })
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(clearbit.Person.QueuedError, function (err) {
      // Lookup is queued - try again later
      console.log(err)
      res.status(202).json({ error: 'queueing' })
    })
    .catch(clearbit.Person.NotFoundError, function (err) {
      // Person could not be found
      console.log(err)
      res.status(400).json({ error: 'not foun' })
    })
    .catch(function (err) {
      console.error(err)
    })
}
