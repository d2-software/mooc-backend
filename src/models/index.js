const Sequelize = require('sequelize')
const db = require('../config/db')

const User = require('./user')
const Role = require('./role')

const models = {
  User: User.init(db, Sequelize),
  Role: Role.init(db, Sequelize)
}

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models))

module.exports = {
  ...models,
  db
}
