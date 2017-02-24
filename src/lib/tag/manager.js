/* eslint-disable */
import 'babel-polyfill'
/* eslint-enable */
import Tag from './model'

const addTag = async (options = {}) => {
    const addResult = await Tag.create(Object.assign({}, options))
    return Promise.resolve({
        success: !!addResult,
        message: '',
        result : addResult || null
    })
}
const getTag = async (tagID) => {
    const getResult = await Tag.findById(tagID)
    return Promise.resolve({
        success: !!getResult,
        message: '',
        result : getResult.tags || null
    })
}
const findTag = async (options = {}) => {
    const findResult = await Tag.find(Object.assign({}, options))
    return findResult
}
export default {
    addTag,
    getTag,
    findTag
}
