const Router = require('express-promise-router')
const authRegisterController = require('../../../controllers/auth/register')
const userRegisterValidator = require('../../../middlewares/validators/userRegister')

const router = Router()

router.post('/register', userRegisterValidator, authRegisterController)

module.exports = router
