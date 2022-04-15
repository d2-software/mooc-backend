const Router = require('express-promise-router')
const statusRouter = require('./v1/status')

const API_BASE = '/api'
const API_VERSION = 'v1'

const BASE_URL = `${ API_BASE }/${ API_VERSION }`

const router = Router()

router.use(`${ BASE_URL }/status`, statusRouter)

module.exports = router
