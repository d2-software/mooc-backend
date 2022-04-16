const userServices = require('../../services/user')
const roleServices = require('../../services/role')

module.exports = async (req, res, _next) => {
  const { body } = req

  const userData = body

  if (!userData?.roleUuid) {
    const defaultRole = await roleServices.findByDefault()
    userData.roleUuid = defaultRole?.uuid
  }

  await userServices.create(userData)

  res.status(201).send()
}
