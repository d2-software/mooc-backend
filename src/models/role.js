const { Sequelize, Model } = require('sequelize')

class Role extends Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        priority: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        isDefault: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Role'
      },
    )
  }
}

module.exports = Role

