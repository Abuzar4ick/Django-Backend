const asyncHandle = require('../../middlewares/async')
const userSchema = require('../../models/users.model')
const ErrorResponse = require('../../utils/errorResponse')

// Router: Get all users
// Method: GET
// Description: Get all users
exports.getUsers = asyncHandle(async (req, res, next) => {
    const data = await userSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /user/register
// Method: POST
// Description: User register
exports.userRegister = asyncHandle(async (req, res, next) => {
    const { first_name, last_name, phone_number, direction, groupId, telegram_id } = req.body

    const findUser = await userSchema.findOne({ phone_number })
    const findByTelegram = await userSchema.findOne({ telegram_id })
    if (findUser || findByTelegram) return next(new ErrorResponse('User already exist.', 400));

    await userSchema.create({
        first_name,
        last_name,
        phone_number,
        direction,
        groupId,
        telegram_id
    })
    res.status(201).json({
        success: true,
        message: 'User successfully created.'
    })
})

// Router: /users/:telegramId
// Method: DELETE
// Description: Delete user by telegram id
exports.deleteUser = asyncHandle(async (req, res, next) => {
    const { telegramId } = req.body

    const deletedUser = await userSchema.findOneAndDelete({ telegram_id: telegramId })
    if (!deletedUser) return next(new ErrorResponse('User with this ID not found', 404));

    res.status(200).json({
        success: true,
        message: "User deleted successfully."
    })
})