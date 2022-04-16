'use strict'

module.exports = {
  async up (queryInterface, { DataTypes }) {
    await queryInterface.addColumn('users', 'role_uuid', {
      type: DataTypes.UUID
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('users', 'role_uuid')
  }
}
