const UnauthorizedException = require('../../exceptions/unauthorizedException')
const ForbiddenException = require('../../exceptions/forbiddenException')
const userServices = require('../../services/user')
const tokenUtils = require('../../utils/token')

module.exports = async (req, res, _next) => {
  const { username, password } = req.body

  const user = await userServices.findByUsername(username)

  if (!user) {
    throw new UnauthorizedException()
  }

  const isValidPassword = await user.validPassword(password)

  if (!isValidPassword) {
    throw new ForbiddenException()
  }

  const token = tokenUtils.generateToken(user.username)

  res.status(200).send({
    user,
    token
  })
}
