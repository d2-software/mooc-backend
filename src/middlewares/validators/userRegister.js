const { validate, Joi } = require('express-validation')
const { validatorsOptions } = require('../../config')

module.exports = validate({
    body: Joi.object({
      username: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },
  validatorsOptions.options, validatorsOptions.joiOptions)
