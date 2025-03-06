const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    image: {
        type: String,
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('Post', postSchema)