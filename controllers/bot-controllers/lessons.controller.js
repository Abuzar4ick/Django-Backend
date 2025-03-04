const lessonSchema = require('../../models/lessons.model')
const asyncHandle = require('../../middlewares/async')

// Router: /free/lessons
// Method: GET
// Description: Get all free lessons, for students who doesn't have a group
exports.getFreeLessons = asyncHandle(async (req, res, next) => {
    const data = await lessonSchema.find({ groupId: null })
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /lessons
// Method: GET
// Description: Get all lessons, for students who have a group
exports.getLessons = asyncHandle(async (req, res, next) => {
    const data = await lessonSchema.find({ groupId: { $ne: null } })
    res.status(200).json({
        success: true,
        data
    })
})