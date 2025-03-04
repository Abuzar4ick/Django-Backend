const jwt = require("jsonwebtoken")
const ErrorResponse = require("../utils/errorResponse")

const { JWT_SECRET, TELEGRAM_KEY } = process.env

const verifyTelegramKey = (req, res, next) => {
    const telegramKey = req.headers["telegram-key"]
    if (telegramKey === TELEGRAM_KEY) return next()
    next(new ErrorResponse("Invalid Telegram key", 401))
}

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ErrorResponse("No token provided", 401))
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.admin = decoded
        next()
    } catch (err) {
        return next(new ErrorResponse("Invalid token", 401))
    }
}

module.exports = {
    verifyTelegramKey,
    verifyAdminToken
}