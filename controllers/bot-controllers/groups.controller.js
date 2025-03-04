const groupSchema = require('../../models/group.model')
const asyncHandle = require('../../middlewares/async')

// Router: /groups
// Method: GET
// Dscription: Get all groups
exports.getGroups = asyncHandle(async (req, res, next) => {
    const data = await groupSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})