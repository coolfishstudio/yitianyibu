/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Tag from './model'

const addTag = async (options = {}) => {
    const result = await Tag.create(Object.assign({}, options))
    return result
}
const getTagById = async (tagId) => {
    const result = await Tag.findById(tagId)
    return result
}
const findTags = async (options = {}) => {
    let obj = Object.assign({ removed: false }, options)
    const result = await Tag.find(obj).sort({ weight: -1 })
    return result
}
const updateTagById = async (tagId, options = {}) => {
    let analyse = await Tag.findById(tagId)
    if (!analyse) {
        return null
    }
    analyse.name = options.name
    analyse.weight = options.weight
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}
const removeTagById = async (tagId) => {
    let analyse = await Tag.findById(tagId)
    if (!analyse) {
        return null
    }
    analyse.removed = true
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}

export default {
    addTag,
    getTagById,
    findTags,
    updateTagById,
    removeTagById
}
