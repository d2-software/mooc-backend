const { ValidationError } = require('express-validation')
const ApiException = require('../../exceptions/apiException')

module.exports = async (err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).send({ error: err.details })
  }

  if (err instanceof ApiException) {
    return res.status(err.statusCode).send({ error: err.message })
  }

  console.log(err)

  res.status(500).send({ error: 'Unexpected error' })
}
