const groupSchema = require('../models/group.model')
const userSchema = require('../models/users.model')
const lessonSchema = require('../models/lessons.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandle = require('../middlewares/async')

// Router: /groups
// Method: POST
// Description: Add new group
exports.newGroup = asyncHandle(async (req, res, next) => {
    const { title, direction } = req.body

    const findGroup = await groupSchema.findOne({ title, direction })
    if (findGroup) return next(new ErrorResponse('Group with this title and direction already created', 400))

    await groupSchema.create({ title, direction })
    res.status(201).json({
        success: true,
        message: 'Group successfully created.'
    })
})

// Router: /groups
// Method: GET
// Description: Get all groups
exports.getGroups = asyncHandle(async (req, res, next) => {
    const data = await groupSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /groups/:id
// Method: GET
// Description: Get group by id and all users by groupId
exports.oneGroup = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const findGroup = await groupSchema.findById(id)
    if (!findGroup) return next(new ErrorResponse('Group not found.', 404));

    const users = await userSchema.find({ groupId: findGroup._id })
    res.status(200).json({
        success: true,
        group: findGroup,
        users
    })
})

// Router: /groups/:id
// Method: DELETE
// Description: Delete group by id
exports.deleteGroup = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const deletedGroup = await groupSchema.findByIdAndDelete(id)
    if (!deletedGroup) return next(new ErrorResponse('Group not found.', 404));

    await userSchema.updateMany({ groupId: id }, { groupId: null })
    await lessonSchema.deleteMany({ groupId: id })
    res.status(200).json({
        success: true,
        message: 'Group successfully deleted.'
    })
})

// Router: /groups/:id
// Method: PATCH
// Description: Update group by id
exports.updateGroup = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const { title, direction } = req.body
    const updatedGroup = await groupSchema.findByIdAndUpdate(id, { title, direction })
    if (!updatedGroup) return next(new ErrorResponse('Group not found.', 404));
    res.status(200).json({
        success: true,
        message: 'Group successfully updated.'
    })
})

// Router: /groups/:id/status
// Method: PATCH
// Description: Update status of group: ['pending', 'active', 'completed']
exports.updateGroupStatus = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body
    const updatedGroup = await groupSchema.findByIdAndUpdate(id, { status })
    if (!updatedGroup) return next(new ErrorResponse('Group not found', 404));
    res.status(200).json({
        success: true,
        message: 'Status of group successfully updated.'
    })
})