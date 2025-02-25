const userSchema = require('../models/users.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandle = require('../middlewares/async')

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

// Router: /users
// Method: GET
// Description: Get all users
exports.getUsers = asyncHandle(async (req, res, next) => {
    const data = await userSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /users
// Method: DELETE
// Description: Delete user by id
exports.deleteUser = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const deletedUser = await userSchema.findByIdAndDelete(id)
    if (!deletedUser) return next(new ErrorResponse('User not found', 404));
    res.status(200).json({
        success: true,
        message: 'User deleted successfully.'
    })
})

// Router: /users/:id
// Method: GET
// Description: Get user by id
exports.oneUser = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const data = await userSchema.findById(id)
    if (!data) return next(new ErrorResponse('User not found', 404));
    res.status(200).json({
        success: true,
        data
    })
})