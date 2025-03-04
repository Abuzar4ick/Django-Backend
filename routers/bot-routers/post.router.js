const { Router } = require('express')
const router = Router()
const {
    getPosts
} = require('../../controllers/bot-controllers/post.controller')
const { verifyTelegramKey } = require('../../middlewares/authorization')

router.get('/posts', verifyTelegramKey, getPosts)

module.exports = router