const { ValidationError } = require('express-validation')

module.exports = async (err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).send({ error: err.details })
  }

  console.log(err)

  res.status(500).send({ error: 'Unexpected error' })
}
