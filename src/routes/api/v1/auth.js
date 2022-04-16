const Router = require('express-promise-router')
const authRegisterController = require('../../../controllers/auth/register')
const authLoginController = require('../../../controllers/auth/login')
const userRegisterValidator = require('../../../middlewares/validators/userRegister')

const router = Router()

router.post('/register', userRegisterValidator, authRegisterController)
router.post('/login', userRegisterValidator, authLoginController)

module.exports = router
