const { Router } = require('express')
const router = Router()
const {
    newPost,
    getPosts,
    onePost,
    deletePost,
    updatePost
} = require('../controllers/post.controller')
const { verifyAdminToken } = require('../middlewares/authorization')
const { body, param, validationResult } = require('express-validator')
// Multer
const { storage } = require('../storage/storage')
const multer = require('multer')
const upload = multer({ storage })

router.post('/posts', verifyAdminToken, upload.single('image'), [
    body('text')
        .notEmpty().withMessage('Text of post is required'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        next()
    }
], newPost)

router.get('/posts', verifyAdminToken, getPosts)
router.get('/posts/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], onePost)

router.delete('/posts/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], deletePost)

router.patch('/posts/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('text')
        .notEmpty().withMessage('Text of post is required'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], updatePost)

module.exports = router