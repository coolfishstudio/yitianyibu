/**
 * 数据模型
 */
import mongoose from '../../util/db'

const Schema = mongoose.Schema

const TagsSchema = new Schema({
    name     : { type: String, required: true },
    weight   : { type: Number, default: 0 },
    removed  : { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'tags'
})

// 数据格式校验
TagsSchema.static('validateAndFormatError', (tag, callback) => {
    return tag.validate((error) => {
        callback(error)
    })
})
// 根据id查找
TagsSchema.static('getByID', (tagID, callback) => {
    return this.findById(tagID, (error, tag) => {
        if (error && error.name === 'CastError' && error.kind === 'ObjectId') {
            return callback('数据没有', null)
        }
        if (error) {
            return callback(error, null)
        }
        callback(null, tag)
    })
})
// 查找全部
TagsSchema.static('findAll', (queryOptions, callback) => {
    const query = this.find({ removed: false }).sort({ weight: -1 })
    if (typeof queryOptions === 'function') {
        callback = queryOptions
        queryOptions = {}
    }
    if (queryOptions.limit !== undefined) {
        query.limit(queryOptions.limit)
    }
    if (queryOptions.offset !== undefined) {
        query.skip(queryOptions.offset)
    }
    query.exec(callback)
})
// 全部数量
TagsSchema.static('countAll', (callback) => {
    return this.count({ removed: false }, callback)
})
// 保存
TagsSchema.pre('save', (next) => {
    this.updatedAt = Date.now()
    next()
})
// 处理_id
TagsSchema.set('toJSON', { getters: true, virtuals: true, versionKey: false })
if (!TagsSchema.options.toJSON) {
    TagsSchema.options.toJSON = {}
}
/* eslint-disable */
TagsSchema.options.toJSON.transform = (doc, ret, options) => {
    delete ret._id
}
/* eslint-enable */
const Tags = mongoose.model('Tags', TagsSchema)

export const schema = TagsSchema
export default Tags
