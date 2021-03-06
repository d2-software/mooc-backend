const dotenv = require('dotenv')
const { join } = require('path')
const { readFileSync } = require('fs')

const environment = process.env.NODE_ENV
const envPath = environment === 'development' ? './.env' : `./.env.${ environment }`

const { parsed: environmentConfig } = dotenv.config({ path: envPath, debug: process.env.NODE_ENV === 'development' })

module.exports = {
  developmentMode: process.env.NODE_ENV === 'development',
  testMode: process.env.NODE_ENV === 'test',
  database: {
    type: environmentConfig?.DB_TYPE ?? '',
    host: environmentConfig?.DB_HOST ?? '',
    port: +environmentConfig?.DB_PORT ?? '',
    user: environmentConfig?.DB_USER ?? '',
    pass: environmentConfig?.DB_PASS ?? '',
    name: environmentConfig?.DB_NAME ?? '',
  },
  validatorsOptions: {
    options: {
      context: true,
      statusCode: 422,
      keyByField: true
    },
    joiOptions: {
      convert: true,
      allowUnknown: false
    }
  },
  tokenOptions: {
    expiresIn: 3600,
    algorithm: 'RS512',
    keys: {
      private: readFileSync(join(__dirname, 'keys', 'jwt.key')),
      public: readFileSync(join(__dirname, 'keys', 'jwt.key.pub'))
    }
  }
}
