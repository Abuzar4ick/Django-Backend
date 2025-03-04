const { Router } = require('express')
const router = Router()
const {
    getPosts
} = require('../../controllers/bot-controllers/post.controller')
const { verifyAdminToken } = require('../../middlewares/authorization')

router.get('/posts', verifyAdminToken, getPosts)

module.exports = router