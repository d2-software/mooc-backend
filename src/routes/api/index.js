const Router = require('express-promise-router')
const statusRouter = require('./v1/status')
const authRouter = require('./v1/auth')
const errorHandlerController = require('../../controllers/error/error')

const API_BASE = '/api'
const API_VERSION = 'v1'

const BASE_URL = `${ API_BASE }/${ API_VERSION }`

const router = Router()

router.use(`${ BASE_URL }/status`, statusRouter)
router.use(`${ BASE_URL }/auth`, authRouter)

router.use(errorHandlerController)

module.exports = router
