const { User } = require('../models')

const findByUsername = async (username) => User.findOne({ where: { username } })

const create = async (userData) => User.create(userData)

module.exports = {
  findByUsername,
  create
}
