const { Router } = require('express')
const router = Router()
const {
    getGroups
} = require('../../controllers/bot-controllers/groups.controller')
const { verifyTelegramKey } = require('../../middlewares/authorization')

router.get('/groups', verifyTelegramKey, getGroups)

module.exports = router