const { Router } = require('express')
const router = Router()
const {
    getUsers,
    userRegister,
    deleteUser
} = require('../../controllers/bot-controllers/users.controller')
const { verifyTelegramKey } = require('../../middlewares/authorization')
const { body, validationResult } = require('express-validator')

router.get('/users', verifyTelegramKey, getUsers)
router.post('/user/register', verifyTelegramKey, [
    body('first_name')
            .notEmpty().withMessage('First name is required'),
        body('last_name')
            .notEmpty().withMessage('Last name is required'),
        body('phone_number')
            .notEmpty().withMessage('Phone number is required')
            .matches(/^\+998\d{9}$/).withMessage('Invalid Uzbekistan phone number'),
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

router.delete('/users/:telegramId', verifyTelegramKey, deleteUser)

module.exports = router