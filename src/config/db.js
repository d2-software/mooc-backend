const Sequelize = require('sequelize')
const appConfig = require('./index')

const sequelize = new Sequelize(
  appConfig.database.name,
  appConfig.database.user,
  appConfig.database.pass,
  {
    host: appConfig.database.host,
    dialect: appConfig.database.type,
    port: appConfig.database.port,
    logging: appConfig.developmentMode ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    }
  },
  {
    define: {
      freezeTableName: true,
      underscoredAll: true,
      underscored: true,
    }
  }
)

module.exports = sequelize
