'use strict'
const User = require('../models/user')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', User.getSchema(Sequelize.DataTypes))
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users')
  }
}
