'use strict'

module.exports = {
  async up (queryInterface, { DataTypes, UUIDV4 }) {
    await queryInterface.createTable('roles', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING
      },
      is_default: {
        type: DataTypes.BOOLEAN
      },
      priority: {
        type: DataTypes.INTEGER
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('roles')
  }
}
