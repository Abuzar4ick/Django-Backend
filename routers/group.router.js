const { Router } = require('express')
const router = Router()
const {
    newGroup,
    getGroups,
    oneGroup,
    deleteGroup,
    updateGroup,
    updateGroupStatus,
    updateUsers
} = require('../controllers/group.controller')
const { verifyAdminToken } = require('../middlewares/authorization')
const { body, param, validationResult } = require('express-validator')

router.post('/groups', verifyAdminToken, [
    body('title')
        .isLength({ min: 1 }).withMessage('The group title must contain at least one letter'),
    body('direction')
        .notEmpty().withMessage('Direction cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], newGroup)

router.get('/groups', verifyAdminToken, getGroups)
router.get('/groups/:id', [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], oneGroup)

router.delete('/groups/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], deleteGroup)

router.patch('/groups/:id', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('title')
        .isLength({ min: 1 }).withMessage('The group title must contain at least one letter'),
    body('direction')
        .notEmpty().withMessage('Direction cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], updateGroup)

router.patch('/groups/:id/status', verifyAdminToken, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('status')
        .isIn(['pending', 'active', 'completed'])
        .withMessage('Invalid status, allowed values: pending, active, completed'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], updateGroupStatus)

router.patch('/groups/:id/users', verifyAdminToken, [
    body('users')
        .isArray({ min: 1 }).withMessage('Users must be an array with at least one user ID'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }
        next()
    }
], updateUsers)

module.exports = router