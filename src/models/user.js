const { hash, verify } = require('argon2')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
  static getSchema (DataTypes) {
    return {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
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
    }
  }

  static init (sequelize, DataTypes) {
    return super.init(
      self.getSchema(DataTypes),
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'User',
        hooks: {
          beforeCreate (attributes) {
            attributes.set(
              'password',
              hash(attributes.get('password', { plain: true })),
            )
          },
          beforeUpdate (instance) {
            if (instance.changed() && instance.changed().indexOf('password') !== -1) {
              instance.set(
                'password',
                hash(instance.get('password', { plain: true })),
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

  validPassword (password) {
    return verify(password, this.password)
  }

  toJSON () {
    const values = { ...this.get() }

    delete values.password
    return values
  }
}

module.exports = User

