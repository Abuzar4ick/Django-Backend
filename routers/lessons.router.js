const { Router } = require('express')
const router = Router()
const {
    newLesson,
    getLessons,
    updateLesson,
    deleteLesson,
    oneLesson,
    getFreeLessons
} = require('../controllers/lessons.controller')
const { verifyAdminToken } = require('../middlewares/authorization')
const { body, param, validationResult } = require('express-validator')

router.post('/lessons', verifyAdminToken, [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required"),
    body("link")
        .trim()
        .isURL().withMessage("Valid link is required"),
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required"),
    body("id")
        .optional()
        .isMongoId().withMessage("Invalid group ID"),
    
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], newLesson)

router.get('/lessons', verifyAdminToken, getLessons)
router.get('/lessons/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], oneLesson)

router.patch('/lessons/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('title')
        .isLength({ min: 1 }).withMessage('The class title must contain at least one letter'),
    body('link')
        .isURL().withMessage('Uncorrect url format'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
],  updateLesson)

router.delete('/lessons/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], deleteLesson)
router.get('/free/lessons', verifyAdminToken, getFreeLessons)

module.exports = router