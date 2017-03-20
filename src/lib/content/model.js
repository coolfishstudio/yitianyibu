import mongoose from '../../util/db'

const Schema = mongoose.Schema

const ContentSchema = new Schema({
    title      : { type: String, default: '' },
    html       : { type: String, default: '' },
    markdown   : { type: String, default: '' },
    images     : { type: Array, default: null },
    tag        : { type: Array, default: null },
    category   : { type: Array, default: null },
    status     : { type: String, default: 'published' },
    featured   : { type: Boolean, default: false },
    hits       : { type: Number, default: 0 },
    removed    : { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : { type: Date, default: Date.now }
}, {
    collection: 'content'
})

export default mongoose.model('Content', ContentSchema)
