const { Router } = require('express')
const router = Router()
const {
    getUsers,
    deleteUser,
    oneUser,
    updateUser
} = require('../controllers/user.controller')
const { verifyAdminToken } = require('../middlewares/authorization')
const { body, param, validationResult } = require('express-validator')

router.get('/users', verifyAdminToken, getUsers)
router.delete('/users/:id', verifyAdminToken, [
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
router.get('/users/:id', verifyAdminToken, [
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
router.patch('/users/:id', verifyAdminToken, [
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