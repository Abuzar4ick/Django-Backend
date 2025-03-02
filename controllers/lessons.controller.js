const lessonSchema = require('../models/lessons.model')
const groupSchema = require('../models/group.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandle = require('../middlewares/async')

// Router: /lessons
// Method: POST
// Description: Add new lesson
exports.newLesson = asyncHandle(async (req, res, next) => {
    const { title, link, id, direction: bodyDirection } = req.body

    let groupId = null
    let direction = bodyDirection

    if (id) {
        const findGroup = await groupSchema.findById(id)
        if (!findGroup) return next(new ErrorResponse('Group not found', 404))

        direction = findGroup.direction
        groupId = id
    }

    await lessonSchema.create({ title, link, groupId, direction })
    res.status(201).json({
        success: true,
        message: "Lesson successfully created."
    })
})

// Router: /lessons
// Method: GET
// Description: Get all lessons
exports.getLessons = asyncHandle(async (req, res, next) => {
    const data = await lessonSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /lessons/:id
// Method: GET
// Description: Get lesson by id
exports.oneLesson = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const findLesson = await lessonSchema.findById(id)
    if (!findLesson) return next(new ErrorResponse('Lesson not found', 404));
    res.status(200).json({
        success: true,
        data: findLesson
    })
})

// Router: /lessons/:id
// Method: PATCH
// Description: Update lesson
exports.updateLesson = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const { title, link } = req.body

    const updatedLesson = await lessonSchema.findByIdAndUpdate(id, { title, link })
    if (!updatedLesson) return next(new ErrorResponse('Lesson not found', 404));
    res.status(200).json({
        success: true,
        message: 'Lesson updated successfully.'
    })
})

// Router: /lessons/:id
// Method: DELETE
// Description: Delete lesson
exports.deleteLesson = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const deletedLesson = await lessonSchema.findByIdAndDelete(id)
    if (!deletedLesson) return next(new ErrorResponse('Lesson not found', 404));

    res.status(200).json({
        success: true,
        message: 'Lesson deleted successfully.'
    })
})

// Router: /free/lessons
// Method: GET
// Description: Get userId: null users
exports.getFreeLessons = asyncHandle(async (req, res, next) => {
    const data = await lessonSchema.find({ groupId: null })
    res.status(200).json({
        success: true,
        data
    })
})