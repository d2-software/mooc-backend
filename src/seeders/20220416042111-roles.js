'use strict'
const rolesData = require('./fixtures/roles')

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('roles', rolesData)
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('roles', null)
  }
}
