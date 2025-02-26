require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectMongo = require('./config/db')
const error = require('./middlewares/error')
const registerLimiter = require('./middlewares/registerLimiter')
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet({
    contentSecurityPolicy: false
}))

// CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Connect to MongoDB
connectMongo()
app.use('/api',
    require('./routers/lessons.router'),
    require('./routers/group.router'),
    require('./routers/user.router')
)
app.use('/api/register', registerLimiter, require('./routers/register.router'))

app.use(error)

// Listen the server
const PORT = process.env.PORT || 4000
app.listen(PORT, (err) => {
    if (err) console.error(`Server listening error: ${err}`)
        console.log(`Server listening on port ${PORT}`)
})