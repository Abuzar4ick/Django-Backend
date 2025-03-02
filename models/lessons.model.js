const { Schema, model } = require('mongoose')

const lessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
    direction: {
        type: String,
        enum: ['Frontend', 'Backend', 'Design', 'Python'],
        required: true
    }
})

module.exports = model('Lesson', lessonSchema)