const asyncHandle = require('../../middlewares/async')
const postSchema = require('../../models/post.model')

// Router: /posts
// Method: GET
// Description: Get all posts
exports.getPosts = asyncHandle(async (req, res, next) => {
    const data = await postSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})