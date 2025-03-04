const { Router } = require('express')
const router = Router()
const {
    getFreeLessons,
    getLessons
} = require('../../controllers/bot-controllers/lessons.controller')
const { verifyTelegramKey } = require('../../middlewares/authorization')

router.get('/free/lessons', verifyTelegramKey, getFreeLessons)
router.get('/lessons', verifyTelegramKey, getLessons)

module.exports = router