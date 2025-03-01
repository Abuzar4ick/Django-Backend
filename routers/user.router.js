const { Router } = require('express')
const router = Router()
const {
    userRegister,
    getUsers,
    deleteUser,
    oneUser,
    updateUser
} = require('../controllers/user.controller')
const adminAuth = require('../middlewares/adminAuth')
const { body, param, validationResult } = require('express-validator')

router.post('/user/register', adminAuth, [
    body('first_name')
        .notEmpty().withMessage('First name is required'),
    body('last_name')
        .notEmpty().withMessage('Last name is required'),
    body('phone_number')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number'),
    body('direction')
        .notEmpty().withMessage('Direction is required'),
    body('telegram_id')
        .notEmpty().withMessage('Telegram id is required')
        .optional().isNumeric().withMessage('Telegram ID must be numeric'),
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
], userRegister)
router.get('/users', adminAuth, getUsers)
router.delete('/users/:id', adminAuth, [
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
], deleteUser)
router.get('/users/:id', adminAuth, [
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
], oneUser)
router.patch('/users/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('groupId')
        .notEmpty().withMessage('Group id is required')
        .isMongoId().withMessage('Invalid group ID'),
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
], updateUser)

module.exports = router