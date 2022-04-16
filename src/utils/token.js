const { sign, verify } = require('jsonwebtoken')
const { tokenOptions } = require('../config')

const generateToken = (username) => {
  const payload = { username }
  const options = {
    expiresIn: tokenOptions.expiresIn,
    algorithm: tokenOptions.algorithm
  }

  return sign(payload, tokenOptions.keys.private, options)
}

const verifyToken = (token) => {
  const options = {
    algorithm: tokenOptions.algorithm
  }

  return verify(token, tokenOptions.keys.public, options)
}

module.exports = {
  generateToken,
  verifyToken
}
