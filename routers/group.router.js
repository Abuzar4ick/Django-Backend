const { Router } = require('express')
const router = Router()
const {
    newGroup,
    getGroups,
    oneGroup,
    deleteGroup,
    updateGroup,
    updateGroupStatus
} = require('../controllers/group.controller')
const adminAuth = require('../middlewares/adminAuth')
const { body, param, validationResult } = require('express-validator')

router.post('/groups', adminAuth, [
    body('title')
        .isLength({ min: 1 }).withMessage('The group title must contain at least one letter'),
    body('direction')
        .notEmpty().withMessage('Direction cannot be empty'),
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
], newGroup)
router.get('/groups', adminAuth, getGroups)
router.get('/groups/:id', [
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
], oneGroup)
router.delete('/groups/:id', adminAuth, [
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
], deleteGroup)
router.patch('/groups/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('title')
        .isLength({ min: 1 }).withMessage('The group title must contain at least one letter'),
    body('direction')
        .notEmpty().withMessage('Direction cannot be empty'),
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
], updateGroup)
router.patch('/groups/:id/status', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('status')
        .isIn(['pending', 'active', 'completed'])
        .withMessage('Invalid status, allowed values: pending, active, completed'),
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
], updateGroupStatus)


module.exports = router