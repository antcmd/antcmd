const clearbit = require('clearbit')('sk_a520f1fc2331b745b7ffe5cccb8116d9')

export default function handler(req, res) {
  const { domain } = req.params

  clearbit.Company.find({ domain })
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(function(err) {
      console.error(err)
    })
}
