const dotenv = require('dotenv')

const { parsed: environmentConfig } = dotenv.config({ path: './.env', debug: process.env.NODE_ENV === 'development' })

module.exports = {
  developmentMode: process.env.NODE_ENV === 'development',
  database: {
    type: environmentConfig?.DB_TYPE ?? '',
    host: environmentConfig?.DB_HOST ?? '',
    port: +environmentConfig?.DB_PORT ?? '',
    user: environmentConfig?.DB_USER ?? '',
    pass: environmentConfig?.DB_PASS ?? '',
    name: environmentConfig?.DB_NAME ?? '',
  }
}
