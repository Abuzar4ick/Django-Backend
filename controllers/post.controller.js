const asyncHandle = require('../middlewares/async')
const postSchema = require('../models/post.model')

// Router: /posts
// Method: POST
// Description: Add new post for every students
exports.newPost = asyncHandle(async (req, res, next) => {
    const { text } = req.body
    const image = req.file?.filename

    await postSchema.create({ image, text })
    res.status(201).json({
        success: true,
        message: 'New post successfully created.'
    })
})

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

// Router: /posts/:id
// Method: GET
// Description: Get post by id
exports.onePost = asyncHandle(async (req, res, next) => {
    const { id } = req.params

    const data = await postSchema.findById(id)
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /posts/:id
// Method: DELETE
// Description: Delete post by id
exports.deletePost = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    
    await postSchema.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: 'Post deleted successfully.'
    })
})

// Router: /posts/:id
// Method: PATCH
// Description: Update post by id
exports.updatePost = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const { text } = req.body
    const image = req.file?.filename

    await postSchema.findByIdAndUpdate(id, { text, image })
    res.status(200).json({
        success: true,
        message: 'Post updated successfully.'
    })
})