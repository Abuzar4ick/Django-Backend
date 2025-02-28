const rateLimit = require('express-rate-limit')

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many register attempts, please try again later'
})

module.exports = registerLimiter