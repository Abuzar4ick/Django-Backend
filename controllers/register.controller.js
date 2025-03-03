const asyncHandle = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// process.env
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET, JWT_EXPIRE } = process.env

// Router: /admin/register
// Method: POST
// Description: Registration for admin
exports.adminRegister = asyncHandle(async (req, res, next) => {
    const { username, password } = req.body
    
    const isMatch = username === ADMIN_USERNAME && await bcrypt.compare(password, ADMIN_PASSWORD)
    if (!isMatch) return next(new ErrorResponse('Incorrect username or password', 400));

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRE })
    res.status(200).json({
        success: true,
        message: 'Congratulations, you are admin',
        token
    })
})