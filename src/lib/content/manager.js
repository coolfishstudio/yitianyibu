/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Content from './model'

const addContent = async (options = {}) => {
    const result = await Content.create(Object.assign({}, options))
    return result
}
const getContentById = async (contentId) => {
    const result = await Content.findById(contentId)
    return result
}
const findContents = async (options = {}) => {
    let obj = Object.assign({ removed: false }, options)
    const result = await Content.find(obj).sort({ updatedAt: -1 })
    return result
}
const updateContentById = async (contentId, options = {}) => {
    let analyse = await Content.findById(contentId)
    if (!analyse) {
        return null
    }

    analyse.title = options.title
    analyse.html = options.html
    analyse.images = options.images
    analyse.markdown = options.markdown
    analyse.status = options.status
    analyse.featured = options.featured

    if (options.tag) {
        analyse.tag = [ options.tag ]
    }
    if (options.category) {
        analyse.category = [ options.category ]
    }
    if (options.createdAt) {
        analyse.createdAt = (new Date(options.createdAt)).getTime()
    }
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}
const removeContentById = async (contentId) => {
    let analyse = await Content.findById(contentId)
    if (!analyse) {
        return null
    }
    analyse.removed = true
    analyse.updatedAt = Date.now()
    const result = await analyse.save()
    return result
}

export default {
    addContent,
    getContentById,
    findContents,
    updateContentById,
    removeContentById
}
