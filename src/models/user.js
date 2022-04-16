const { hash, verify } = require('argon2')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        roleUuid: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'User',
        hooks: {
          async beforeCreate (attributes) {
            attributes.set(
              'password',
              await hash(attributes.get('password', { plain: true })),
            )
          },
          async beforeUpdate (instance) {
            if (instance.changed() && instance.changed().indexOf('password') !== -1) {
              instance.set(
                'password',
                await hash(instance.get('password', { plain: true })),
              )
            }
          },
        },
        defaultScope: {
          include: [
            {
              all: true,
              nested: true,
            },
          ],
        },
      },
    )
  }

  async validPassword (password) {
    return verify(this.password, password)
  }

  toJSON () {
    const values = { ...this.get() }

    delete values.password
    return values
  }
}

module.exports = User

