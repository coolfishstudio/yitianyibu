/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Comment from './model'

const addComment = async (options) => {
    const result = await Comment.create(Object.assign({}, options))
    return result
}
const findCommentsByContentId = async (contentId) => {
    let obj = Object.assign({ removed: false }, { contentId })
    const result = await Comment.find(obj).sort({ createdAt: -1 })
    return result
}
const removeCommentById = async (commentId) => {
    let analyse = await Comment.findById(commentId)
    if (!analyse) {
        return null
    }
    analyse.removed = true
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}
const countCommentByContentId = async (contentId) => {
    const result = await Comment.count({ removed: false, contentId })
    return result
}

export default {
    addComment,
    findCommentsByContentId,
    removeCommentById,
    countCommentByContentId
}
