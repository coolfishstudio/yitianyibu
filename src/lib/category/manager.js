/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Category from './model'

const addCategory = async (options = {}) => {
    const result = await Category.create(Object.assign({}, options))
    return result
}
const getCategoryById = async (tagId) => {
    const result = await Category.findById(tagId)
    return result
}
const findCategorys = async (options = {}) => {
    let obj = Object.assign({ removed: false }, options)
    const result = await Category.find(obj).sort({ weight: -1 })
    return result
}
const updateCategoryById = async (tagId, options = {}) => {
    let analyse = await Category.findById(tagId)
    if (!analyse) {
        return null
    }
    analyse.name = options.name
    analyse.weight = options.weight
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}
const removeCategoryById = async (tagId) => {
    let analyse = await Category.findById(tagId)
    if (!analyse) {
        return null
    }
    analyse.removed = true
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}

export default {
    addCategory,
    getCategoryById,
    findCategorys,
    updateCategoryById,
    removeCategoryById
}
