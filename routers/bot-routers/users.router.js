const { Router } = require('express')
const router = Router()
const {
    getUsers,
    userRegister
} = require('../../controllers/bot-controllers/users.controller')
const { verifyTelegramKey } = require('../../middlewares/authorization')

router.get('/users', verifyTelegramKey, getUsers)
router.post('/user/register', verifyTelegramKey, userRegister)

module.exports = router