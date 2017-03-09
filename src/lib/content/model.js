import mongoose from '../../util/db'

const Schema = mongoose.Schema

const ContentSchema = new Schema({
    title      : { type: String, default: '' },
    content    : { type: String, default: '' },
    tag        : { type: Schema.Types.ObjectId, required: true },
    category   : { type: Schema.Types.ObjectId, required: true },
    hits       : { type: Number, default: 0 },
    removed    : { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : { type: Date, default: Date.now }
}, {
    collection: 'content'
})

export default mongoose.model('Content', ContentSchema)
