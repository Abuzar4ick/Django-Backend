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
const adminAuth = require('../middlewares/adminAuth')
const { body, param, validationResult } = require('express-validator')

router.post('/lessons', adminAuth, [
    body("title").notEmpty().withMessage("Title is required"),
    body("link").isURL().withMessage("Valid link is required"),
    body("id").optional().custom((value) => {
        if (value !== null && !/^[0-9a-fA-F]{24}$/.test(value)) {
            throw new Error("Invalid group ID");
        }
        return true;
    }),
    body("direction")
        .if((value, { req }) => !req.body.id)
        .notEmpty()
        .withMessage("Direction is required when groupId is null"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], newLesson)

router.get('/lessons', adminAuth, getLessons)
router.get('/lessons/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
], oneLesson)
router.patch('/lessons/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('title')
        .isLength({ min: 1 }).withMessage('The class title must contain at least one letter'),
    body('link')
        .isURL().withMessage('Uncorrect url format'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
],  updateLesson)
router.delete('/lessons/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
], deleteLesson)
router.get('/free/lessons', adminAuth, getFreeLessons)

module.exports = router