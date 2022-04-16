const { Role } = require('../models')

const findByDefault = async () => Role.findOne({ where: { isDefault: true } })

module.exports = {
  findByDefault
}
